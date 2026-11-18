import unittest
from types import SimpleNamespace
from unittest.mock import Mock, patch

from graphql import GraphQLError
from yt_dlp.utils import DownloadError

from app.core.config import settings
from app.graphql.schema import Mutation
from app.recipes.youtube_import import (
    MAX_TRANSCRIPT_CHARACTERS,
    RecipeDraftData,
    RecipeImportError,
    _download_audio_and_transcribe,
    _fetch_caption_transcript,
    _transcribe_audio_file,
    extract_youtube_recipe,
    parse_youtube_video_id,
)


class FakeLocalLlmClient:
    def __init__(self) -> None:
        draft = RecipeDraftData(
            title="Tomato rice",
            description="A simple rice dish.",
            ingredients=["1 cup rice", "2 tomatoes"],
            instructions=["Cook the rice", "Add tomatoes"],
            prep_time_minutes=25,
            calories=None,
            tags=["quick"],
        )
        self.create_kwargs: dict[str, object] = {}
        self.chat = SimpleNamespace(
            completions=SimpleNamespace(
                create=self._create_completion(draft.model_dump_json())
            )
        )

    def _create_completion(self, content: str):
        async def create(**_: object) -> SimpleNamespace:
            self.create_kwargs.update(_)
            return SimpleNamespace(
                choices=[SimpleNamespace(message=SimpleNamespace(content=content))]
            )

        return create

    async def __aenter__(self) -> "FakeLocalLlmClient":
        return self

    async def __aexit__(self, *_: object) -> None:
        return None


class ParseYouTubeVideoIdTests(unittest.TestCase):
    def test_extracts_ids_from_supported_video_urls(self) -> None:
        urls = [
            "https://www.youtube.com/watch?v=abcdefghijk",
            "https://youtu.be/abcdefghijk",
            "https://www.youtube.com/shorts/abcdefghijk",
            "https://www.youtube-nocookie.com/embed/abcdefghijk",
        ]

        for url in urls:
            with self.subTest(url=url):
                self.assertEqual(parse_youtube_video_id(url), "abcdefghijk")

    def test_rejects_non_youtube_and_malformed_urls(self) -> None:
        urls = [
            "http://www.youtube.com/watch?v=abcdefghijk",
            "https://youtube.com.evil.example/watch?v=abcdefghijk",
            "https://www.youtube.com/channel/abcdefghijk",
            "https://www.youtube.com/watch?v=short",
        ]

        for url in urls:
            with self.subTest(url=url):
                with self.assertRaises(RecipeImportError):
                    parse_youtube_video_id(url)


class RecipeLibraryTests(unittest.IsolatedAsyncioTestCase):
    def test_audio_transcription_uses_local_whisper(self) -> None:
        segments = [
            SimpleNamespace(text=" Cook the rice "),
            SimpleNamespace(text=" Add tomatoes "),
        ]
        whisper_model = Mock()
        whisper_model.transcribe.return_value = (segments, SimpleNamespace())

        with patch(
            "app.recipes.youtube_import._get_local_transcription_model",
            return_value=whisper_model,
        ) as get_model:
            transcript = _transcribe_audio_file("audio.m4a")

        self.assertEqual(transcript, "Cook the rice Add tomatoes")
        get_model.assert_called_once_with("base")
        whisper_model.transcribe.assert_called_once_with("audio.m4a", beam_size=5)

    def test_audio_download_failure_has_specific_error(self) -> None:
        with patch("app.recipes.youtube_import.yt_dlp.YoutubeDL") as youtube_dl:
            youtube_dl.return_value.__enter__.return_value.extract_info.side_effect = (
                DownloadError("blocked")
            )

            with self.assertRaisesRegex(
                RecipeImportError, "YouTube audio could not be downloaded"
            ):
                _download_audio_and_transcribe("abcdefghijk")

    def test_audio_fallback_rejects_videos_over_duration_limit(self) -> None:
        with patch("app.recipes.youtube_import.yt_dlp.YoutubeDL") as youtube_dl:
            ydl = youtube_dl.return_value.__enter__.return_value
            ydl.extract_info.return_value = {"duration": 3 * 60 * 60}

            with self.assertRaisesRegex(RecipeImportError, "too long"):
                _download_audio_and_transcribe("abcdefghijk")

        ydl.process_ie_result.assert_not_called()

    def test_audio_fallback_rejects_oversized_audio_file(self) -> None:
        def fake_download(info: dict, download: bool) -> None:
            outtmpl = youtube_dl.call_args.args[0]["outtmpl"]
            with open(outtmpl.replace("%(ext)s", "m4a"), "wb") as audio:
                audio.write(b"12345")

        with (
            patch("app.recipes.youtube_import.yt_dlp.YoutubeDL") as youtube_dl,
            patch("app.recipes.youtube_import.settings") as limits,
        ):
            limits.youtube_max_duration_seconds = 1800
            limits.youtube_max_audio_bytes = 4
            limits.youtube_audio_fallback_timeout_seconds = 600
            ydl = youtube_dl.return_value.__enter__.return_value
            ydl.extract_info.return_value = {"duration": 60}
            ydl.process_ie_result.side_effect = fake_download

            with self.assertRaisesRegex(RecipeImportError, "too large"):
                _download_audio_and_transcribe("abcdefghijk")

    def test_transcription_stops_after_deadline(self) -> None:
        whisper_model = Mock()
        whisper_model.transcribe.return_value = (
            [SimpleNamespace(text="Cook the rice")],
            SimpleNamespace(),
        )

        with patch(
            "app.recipes.youtube_import._get_local_transcription_model",
            return_value=whisper_model,
        ):
            with self.assertRaisesRegex(RecipeImportError, "took too long"):
                _transcribe_audio_file("audio.m4a", deadline=0)

    def test_caption_fetch_uses_supported_youtube_transcript_api(self) -> None:
        snippets = [SimpleNamespace(text="Cook rice"), SimpleNamespace(text="Add tomatoes")]
        with patch("app.recipes.youtube_import.YouTubeTranscriptApi") as api:
            api.return_value.fetch.return_value = SimpleNamespace(snippets=snippets)

            transcript = _fetch_caption_transcript("abcdefghijk")

        self.assertEqual(transcript, "Cook rice Add tomatoes")
        api.return_value.fetch.assert_called_once_with(
            "abcdefghijk", languages=["en", "bs", "de", "en-US"]
        )

    async def test_youtube_import_builds_recipe_draft_from_captions(self) -> None:
        fake_client = FakeLocalLlmClient()
        with (
            patch(
                "app.recipes.youtube_import._fetch_caption_transcript",
                return_value="Cook rice and add tomatoes.",
            ),
            patch(
                "app.recipes.youtube_import.AsyncOpenAI",
                return_value=fake_client,
            ) as llm_client,
            patch.object(settings, "openai_api_key", "sk-test"),
            patch.object(settings, "recipe_llm_model", "gpt-4o-mini"),
        ):
            video_id, draft = await extract_youtube_recipe(
                "https://youtu.be/abcdefghijk"
            )

        llm_client.assert_called_once_with(api_key="sk-test")
        self.assertEqual(fake_client.create_kwargs["model"], "gpt-4o-mini")
        self.assertEqual(
            fake_client.create_kwargs["response_format"],
            {"type": "json_object"},
        )
        self.assertEqual(video_id, "abcdefghijk")
        self.assertEqual(draft.title, "Tomato rice")
        self.assertEqual(draft.ingredients, ["1 cup rice", "2 tomatoes"])

    async def test_youtube_import_rejects_transcripts_over_limit(self) -> None:
        with (
            patch(
                "app.recipes.youtube_import._fetch_caption_transcript",
                return_value="a" * (MAX_TRANSCRIPT_CHARACTERS + 1),
            ),
            patch("app.recipes.youtube_import.AsyncOpenAI") as llm_client,
            patch.object(settings, "openai_api_key", "sk-test"),
        ):
            with self.assertRaisesRegex(RecipeImportError, "too long"):
                await extract_youtube_recipe("https://youtu.be/abcdefghijk")

        llm_client.assert_not_called()

    async def test_youtube_import_requires_openai_api_key(self) -> None:
        with (
            patch("app.recipes.youtube_import._fetch_caption_transcript") as captions,
            patch.object(settings, "openai_api_key", None),
        ):
            with self.assertRaisesRegex(RecipeImportError, "OPENAI_API_KEY"):
                await extract_youtube_recipe("https://youtu.be/abcdefghijk")

        captions.assert_not_called()

    async def test_extract_mutation_returns_canonical_video_urls(self) -> None:
        info = SimpleNamespace(context=SimpleNamespace(user={"sub": "user-123"}))
        draft = RecipeDraftData(
            title="Tomato rice",
            description="A simple rice dish.",
            ingredients=["1 cup rice"],
            instructions=["Cook the rice"],
            prep_time_minutes=25,
            servings=2,
            calories=None,
            tags=["quick"],
        )

        with patch(
            "app.graphql.schema.extract_youtube_recipe",
            return_value=("abcdefghijk", draft),
        ):
            result = await Mutation().extract_youtube_recipe(
                info, "https://youtu.be/abcdefghijk"
            )

        self.assertEqual(result.source_url, "https://www.youtube.com/watch?v=abcdefghijk")
        self.assertEqual(
            result.image_url, "https://img.youtube.com/vi/abcdefghijk/hqdefault.jpg"
        )
        self.assertEqual(result.servings, 2)

    async def test_extract_mutation_requires_authentication(self) -> None:
        info = SimpleNamespace(context=SimpleNamespace(user=None))

        with self.assertRaises(GraphQLError):
            await Mutation().extract_youtube_recipe(
                info, "https://youtu.be/abcdefghijk"
            )


if __name__ == "__main__":
    unittest.main()

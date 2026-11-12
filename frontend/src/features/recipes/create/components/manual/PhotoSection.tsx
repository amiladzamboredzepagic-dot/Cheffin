import {
  memo,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpFromLine, Camera } from 'lucide-react'
import {
  ManualHiddenFileInput,
  ManualNoteTitle,
  ManualPhotoAction,
  ManualPhotoActions,
  ManualPhotoDrop,
  ManualPhotoPreview,
  ManualRecipePanel,
  ManualSectionHint,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024

interface PhotoSectionProps {
  photo: File | null
  onPhotoChange: (photo: File) => void
}

function PhotoSectionView({ photo, onPhotoChange }: PhotoSectionProps) {
  const { t } = useTranslation()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    },
    [previewUrl],
  )

  const acceptPhoto = (
    selectedPhoto: File | undefined,
    input?: HTMLInputElement,
  ) => {
    if (!selectedPhoto) {
      return
    }

    if (selectedPhoto.size > MAX_PHOTO_SIZE_BYTES) {
      setError(t('recipeCreate.photoTooLarge'))
      if (input) {
        input.value = ''
      }
      return
    }

    if (!['image/jpeg', 'image/png'].includes(selectedPhoto.type)) {
      setError(t('recipeCreate.photoInvalidType'))
      if (input) {
        input.value = ''
      }
      return
    }

    setError('')
    onPhotoChange(selectedPhoto)
    setPreviewUrl(URL.createObjectURL(selectedPhoto))
  }

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    acceptPhoto(event.target.files?.[0], event.target)
  }

  const handlePhotoDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    acceptPhoto(event.dataTransfer.files[0])
  }

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>{t('recipeCreate.photoTitle')}</ManualSectionTitle>

      <ManualSectionHint>{t('recipeCreate.photoHint')}</ManualSectionHint>

      <ManualPhotoDrop
        component="label"
        direction="column"
        align="center"
        justify="center"
        gap={1}
        onDragOver={(event: DragEvent<HTMLLabelElement>) =>
          event.preventDefault()
        }
        onDrop={handlePhotoDrop}
      >
        <ManualHiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          aria-label={t('recipeCreate.choosePhoto')}
          onChange={handlePhotoChange}
        />
        {previewUrl ? (
          <ManualPhotoPreview src={previewUrl} alt={photo?.name ?? ''} />
        ) : (
          <>
            <ArrowUpFromLine size={25} aria-hidden="true" />
            <ManualNoteTitle>{t('recipeCreate.photoDrop')}</ManualNoteTitle>
            <ManualSectionHint>
              {t('recipeCreate.photoFormats')}
            </ManualSectionHint>
          </>
        )}
      </ManualPhotoDrop>
      {photo && <ManualSectionHint>{photo.name}</ManualSectionHint>}

      {error && <ManualSectionHint role="alert">{error}</ManualSectionHint>}

      <ManualHiddenFileInput
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        aria-label={t('recipeCreate.useCamera')}
        onChange={handlePhotoChange}
      />

      <ManualPhotoActions>
        <ManualPhotoAction
          component="button"
          direction="row"
          align="center"
          justify="center"
          gap={0.75}
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {t('recipeCreate.chooseFile')}
        </ManualPhotoAction>
        <ManualPhotoAction
          component="button"
          direction="row"
          align="center"
          justify="center"
          gap={0.75}
          type="button"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera size={14} aria-hidden="true" />
          {t('recipeCreate.useCamera')}
        </ManualPhotoAction>
      </ManualPhotoActions>
    </ManualRecipePanel>
  )
}

export const PhotoSection = memo(PhotoSectionView)

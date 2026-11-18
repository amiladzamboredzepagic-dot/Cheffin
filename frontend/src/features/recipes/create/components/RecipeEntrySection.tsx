import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  type ExtractYoutubeRecipeData,
  type ExtractYoutubeRecipeVariables,
  EXTRACT_YOUTUBE_RECIPE,
  type RecipeDraft,
} from '../../recipes.graphql'
import { useCreateRecipeMutation } from '../hooks/useCreateRecipeMutation'
import { RecipeEntry } from '../RecipeCreatePage.styles'
import { LinkMode } from './LinkMode'
import { RecipeEntryTabs } from './RecipeEntryTabs'
import { ENTRY_MODE, type EntryMode } from './recipeEntryMode'
import { WriteYourOwnRecipe } from './WriteYourOwnRecipe'

interface RecipeEntrySectionProps {
  entryMode: EntryMode
  draft: RecipeDraft | null
  tags: string[]
  selectedCollectionId: string
  onEntryModeChange: (mode: EntryMode) => void
  onDraftChange: (draft: RecipeDraft | null) => void
  onTagsChange: (tags: string[]) => void
  onCollectionChange: (collectionId: string) => void
  onRecipeSaved: () => void
  onFeedback: (message: string, severity: 'error' | 'success') => void
}

export function RecipeEntrySection({
  entryMode,
  draft,
  tags,
  selectedCollectionId,
  onEntryModeChange,
  onDraftChange,
  onTagsChange,
  onCollectionChange,
  onRecipeSaved,
  onFeedback,
}: RecipeEntrySectionProps) {
  const { t } = useTranslation()
  const [recipeUrl, setRecipeUrl] = useState('')
  const [extractRecipe, { loading: isImporting }] = useMutation<
    ExtractYoutubeRecipeData,
    ExtractYoutubeRecipeVariables
  >(EXTRACT_YOUTUBE_RECIPE)
  const { createRecipe, loading: isSaving } = useCreateRecipeMutation()
  const canSave =
    draft !== null &&
    draft.prepTimeMinutes !== null &&
    Number.isSafeInteger(draft.prepTimeMinutes) &&
    draft.prepTimeMinutes > 0 &&
    draft.servings !== null &&
    Number.isSafeInteger(draft.servings) &&
    draft.servings > 0

  const handleImport = async (url: string) => {
    onDraftChange(null)
    onTagsChange([])
    try {
      const { data } = await extractRecipe({ variables: { url } })
      if (!data?.extractYoutubeRecipe) {
        throw new Error(t('recipeCreate.importFailed'))
      }

      const extractedDraft = data.extractYoutubeRecipe
      onDraftChange(extractedDraft)
      onTagsChange(extractedDraft.tags)
      onFeedback(t('recipeCreate.draftReady'), 'success')
    } catch (error) {
      onFeedback(
        error instanceof Error ? error.message : t('recipeCreate.importFailed'),
        'error',
      )
    }
  }

  const handleSave = async () => {
    if (
      !draft ||
      draft.prepTimeMinutes === null ||
      draft.servings === null ||
      !Number.isSafeInteger(draft.prepTimeMinutes) ||
      draft.prepTimeMinutes <= 0 ||
      !Number.isSafeInteger(draft.servings) ||
      draft.servings <= 0
    ) {
      return
    }

    try {
      const { data } = await createRecipe({
        title: draft.title,
        description: draft.description,
        ingredients: draft.ingredients,
        steps: draft.instructions,
        prepTimeMinutes: draft.prepTimeMinutes,
        servings: draft.servings,
        mealType: 'lunch',
        dietaryPreferences: [],
        cuisine: null,
        difficulty: null,
        imageUrl: draft.imageUrl || null,
        photoBase64: null,
        photoContentType: null,
        collectionId: selectedCollectionId || null,
        publish: false,
      })
      if (!data?.createRecipe) {
        throw new Error(t('recipeCreate.saveFailed'))
      }
      onRecipeSaved()
    } catch (error) {
      onFeedback(
        error instanceof Error ? error.message : t('recipeCreate.saveFailed'),
        'error',
      )
    }
  }

  const addTag = (tag: string) => {
    if (tags.includes(tag)) {
      return false
    }

    onTagsChange([...tags, tag])
    return true
  }

  return (
    <RecipeEntry direction="column" align="stretch">
      <RecipeEntryTabs
        entryMode={entryMode}
        onEntryModeChange={onEntryModeChange}
      />

      {entryMode === ENTRY_MODE.IMPORT ? (
        <LinkMode
          recipeUrl={recipeUrl}
          tags={tags}
          selectedCollectionId={selectedCollectionId}
          onCollectionChange={onCollectionChange}
          isImporting={isImporting}
          isSaving={isSaving}
          canSave={canSave}
          onRecipeUrlChange={setRecipeUrl}
          onRemoveTag={(tag) =>
            onTagsChange(tags.filter((currentTag) => currentTag !== tag))
          }
          onAddTag={addTag}
          onImport={handleImport}
          onSave={handleSave}
          onRequestPencilMode={() => onEntryModeChange(ENTRY_MODE.MANUAL)}
        />
      ) : (
        <WriteYourOwnRecipe
          selectedCollectionId={selectedCollectionId}
          onCollectionChange={onCollectionChange}
        />
      )}
    </RecipeEntry>
  )
}

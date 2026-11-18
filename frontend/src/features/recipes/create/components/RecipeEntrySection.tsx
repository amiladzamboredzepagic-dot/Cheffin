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
  onImportingChange: (isImporting: boolean) => void
  selectedCollectionId: string
  onEntryModeChange: (mode: EntryMode) => void
  onDraftChange: (draft: RecipeDraft | null) => void
  onCollectionChange: (collectionId: string) => void
  onRecipeSaved: () => void
  onFeedback: (message: string, severity: 'error' | 'success') => void
}

export function RecipeEntrySection({
  entryMode,
  draft,
  onImportingChange,
  selectedCollectionId,
  onEntryModeChange,
  onDraftChange,
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
    draft.title.trim() !== '' &&
    draft.ingredients.some((ingredient) => ingredient.trim() !== '') &&
    draft.instructions.some((instruction) => instruction.trim() !== '') &&
    draft.prepTimeMinutes !== null &&
    Number.isSafeInteger(draft.prepTimeMinutes) &&
    draft.prepTimeMinutes > 0 &&
    draft.servings !== null &&
    Number.isSafeInteger(draft.servings) &&
    draft.servings > 0
  const canImport = draft === null || canSave

  const handleImport = async (url: string) => {
    onDraftChange(null)
    onImportingChange(true)
    try {
      const { data } = await extractRecipe({ variables: { url } })
      if (!data?.extractYoutubeRecipe) {
        throw new Error(t('recipeCreate.importFailed'))
      }

      const extractedDraft = data.extractYoutubeRecipe
      onDraftChange(extractedDraft)
      onFeedback(t('recipeCreate.draftReady'), 'success')
    } catch (error) {
      onFeedback(
        error instanceof Error ? error.message : t('recipeCreate.importFailed'),
        'error',
      )
    } finally {
      onImportingChange(false)
    }
  }

  const handleSave = async () => {
    if (
      !draft ||
      !canSave ||
      draft.prepTimeMinutes === null ||
      draft.servings === null
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
        mealType: draft.mealType,
        dietaryPreferences: draft.dietaryPreferences,
        cuisine: draft.cuisine,
        difficulty: draft.difficulty,
        imageUrl: draft.imageUrl || null,
        photoBase64: null,
        photoContentType: null,
        collectionId: selectedCollectionId || null,
        publish: false,
      })
      if (!data?.createRecipe) {
        throw new Error(t('recipeCreate.importSaveFailed'))
      }
      onRecipeSaved()
    } catch (error) {
      onFeedback(
        error instanceof Error
          ? error.message
          : t('recipeCreate.importSaveFailed'),
        'error',
      )
    }
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
          selectedCollectionId={selectedCollectionId}
          onCollectionChange={onCollectionChange}
          isImporting={isImporting}
          isSaving={isSaving}
          canSave={canSave}
          canImport={canImport}
          onRecipeUrlChange={setRecipeUrl}
          onImport={handleImport}
          onSave={handleSave}
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

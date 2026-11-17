import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../context/useAuth'
import { useMySavedRecipesQuery } from '../../recipes/hooks/useMySavedRecipesQuery'
import { useRemoveSavedRecipeMutation } from '../../recipes/hooks/useRemoveSavedRecipeMutation'
import { useSavePublicRecipeMutation } from '../../recipes/hooks/useSavePublicRecipeMutation'
import type { PublishedDiscoveryRecipe } from '../discovery.data'

export function useDiscoveryRecipeSaving() {
  const { t } = useTranslation()
  const { isAuthenticated, requireAuthentication } = useAuth()
  const { recipes: savedRecipes } = useMySavedRecipesQuery(!isAuthenticated)
  const { savePublicRecipe, loading: saving } = useSavePublicRecipeMutation()
  const { removeSavedRecipe, loading: removing } =
    useRemoveSavedRecipeMutation()

  const [saveErrorOpen, setSaveErrorOpen] = useState(false)
  const [saveDialogError, setSaveDialogError] = useState('')
  const [recipeToSave, setRecipeToSave] =
    useState<PublishedDiscoveryRecipe | null>(null)
  const savedRecipeIds = new Set(savedRecipes.map((recipe) => recipe.id))

  const handleSaveChange = (recipe: PublishedDiscoveryRecipe) => {
    if (!isAuthenticated) {
      requireAuthentication()
      return
    }

    if (savedRecipeIds.has(recipe.id)) {
      setSaveErrorOpen(false)
      void removeSavedRecipe(recipe.id).catch((error: unknown) => {
        console.error('Failed to remove saved recipe:', error)
        setSaveErrorOpen(true)
      })
      return
    }

    setSaveDialogError('')
    setRecipeToSave(recipe)
  }

  const handleSaveRecipe = async (collectionId: string | null) => {
    if (!recipeToSave) return

    setSaveDialogError('')
    try {
      await savePublicRecipe(recipeToSave.id, collectionId)
      setRecipeToSave(null)
    } catch (error) {
      console.error('Failed to save recipe:', error)
      setSaveDialogError(t('discovery.saveRecipeFailed'))
    }
  }

  return {
    savedRecipeIds,
    saving,
    removing,
    saveErrorOpen,
    saveDialogError,
    recipeToSave,
    handleSaveChange,
    handleSaveRecipe,
    closeSaveDialog: () => setRecipeToSave(null),
    closeSaveError: () => setSaveErrorOpen(false),
  }
}

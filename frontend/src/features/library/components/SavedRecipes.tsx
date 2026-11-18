import { Alert } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import { Loading } from '../../../components/ui/feedback/Loading'
import { useMySavedRecipesQuery } from '../../recipes/hooks/useMySavedRecipesQuery'
import { useRemoveSavedRecipeMutation } from '../../recipes/hooks/useRemoveSavedRecipeMutation'
import { useMyRecipesQuery } from '../hooks/useMyRecipesQuery'
import { RecipeGrid } from '../LibraryPage.styles'
import { SavedPublicRecipeCard } from './SavedPublicRecipeCard'

export function SavedRecipes() {
  const { t } = useTranslation()
  const { recipes, loading, error } = useMySavedRecipesQuery()
  const {
    recipes: myRecipes,
    loading: myRecipesLoading,
    error: myRecipesError,
  } = useMyRecipesQuery()
  const { removeSavedRecipe, loading: removing } =
    useRemoveSavedRecipeMutation()
  const [removeError, setRemoveError] = useState(false)

  const handleRemove = async (recipeId: string) => {
    setRemoveError(false)
    try {
      await removeSavedRecipe(recipeId)
    } catch (error) {
      console.error('Failed to remove saved recipe:', error)
      setRemoveError(true)
    }
  }

  if (loading || myRecipesLoading) {
    return <Loading label={t('library.loadingSavedRecipes')} />
  }
  if (error) {
    return <Alert severity="error">{t('library.savedRecipesError')}</Alert>
  }
  if (myRecipesError || !myRecipes) {
    return <Alert severity="error">{t('library.recipesError')}</Alert>
  }
  if (recipes.length === 0) {
    return (
      <Description>
        {t(
          myRecipes.length === 0
            ? 'library.noRecipes'
            : 'library.noSavedRecipes',
        )}
      </Description>
    )
  }

  return (
    <>
      {removeError && (
        <Alert severity="error">{t('discovery.saveRecipeFailed')}</Alert>
      )}
      <RecipeGrid sx={{ mt: 2 }}>
        {recipes.map((recipe) => (
          <SavedPublicRecipeCard
            key={recipe.id}
            recipe={recipe}
            disabled={removing}
            onRemove={(id) => void handleRemove(id)}
          />
        ))}
      </RecipeGrid>
    </>
  )
}

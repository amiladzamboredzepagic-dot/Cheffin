import { Alert } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { Description } from '../../../components/ui/typography/Description'
import {
  getLibraryRecipeStatusFromPath,
  libraryRecipeStatusPath,
} from '../LibraryRoutes'
import { useMyRecipesQuery } from '../hooks/useMyRecipesQuery'
import { usePublishRecipeMutation } from '../hooks/usePublishRecipeMutation'
import { useMySavedRecipesQuery } from '../../recipes/hooks/useMySavedRecipesQuery'
import { useRemoveSavedRecipeMutation } from '../../recipes/hooks/useRemoveSavedRecipeMutation'
import { MyRecipesFilter } from './MyRecipesFilter'
import { MyRecipesResults } from './MyRecipesResults'
import type { RecipeStatusFilter } from './recipeStatusFilter'

export type { MyRecipe } from '../hooks/useMyRecipesQuery'

interface MyRecipesProps {
  collectionId: string | null
}

export function MyRecipes({ collectionId }: MyRecipesProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const routeFilter = getLibraryRecipeStatusFromPath(pathname)
  const filter = routeFilter
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)
  const [removeSavedError, setRemoveSavedError] = useState(false)

  const { publishRecipe, loading: publishing } = usePublishRecipeMutation()
  const { recipes: allRecipes, loading, error, refetch } = useMyRecipesQuery()
  const {
    recipes: savedRecipes,
    loading: savedLoading,
    error: savedError,
  } = useMySavedRecipesQuery(!collectionId)
  const { removeSavedRecipe, loading: removingSaved } =
    useRemoveSavedRecipeMutation()

  const handleFilterChange = (nextFilter: RecipeStatusFilter) => {
    navigate(libraryRecipeStatusPath(nextFilter, collectionId ?? undefined))
  }

  const handlePublish = async (recipeId: string) => {
    try {
      await publishRecipe(recipeId)
      await refetch()
      setFeedback('success')
    } catch (error) {
      console.error('Failed to publish recipe:', error)
      setFeedback('error')
    }
  }

  const handleRemoveSaved = async (recipeId: string) => {
    setRemoveSavedError(false)
    try {
      await removeSavedRecipe(recipeId)
    } catch (error) {
      console.error('Failed to remove saved recipe:', error)
      setRemoveSavedError(true)
    }
  }

  if (loading) return <Description>{t('library.loadingRecipes')}</Description>
  if (error) return <Alert severity="error">{t('library.recipesError')}</Alert>
  if (!allRecipes) return <Alert severity="error">{t('library.recipesError')}</Alert>

  return (
    <>
      <MyRecipesFilter value={filter} onChange={handleFilterChange} />
      <MyRecipesResults
        allRecipes={allRecipes}
        savedRecipes={savedRecipes}
        collectionId={collectionId}
        filter={filter}
        savedLoading={savedLoading}
        savedError={Boolean(savedError)}
        removeSavedError={removeSavedError}
        publishing={publishing}
        removingSaved={removingSaved}
        onPublish={handlePublish}
        onRemoveSaved={handleRemoveSaved}
      />
      {feedback && (
        <FeedbackSnackbar
          open
          severity={feedback}
          message={t(
            feedback === 'success'
              ? 'library.publishSuccess'
              : 'library.publishFailed',
          )}
          onClose={() => setFeedback(null)}
        />
      )}
    </>
  )
}

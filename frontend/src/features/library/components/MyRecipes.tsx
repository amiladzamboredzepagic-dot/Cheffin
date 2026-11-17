import { Alert, Box } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { Description } from '../../../components/ui/typography/Description'
import {
  getLibraryRecipeStatusFromPath,
  libraryRecipeStatusPath,
} from '../LibraryRoutes'
import { RecipeGrid } from '../LibraryPage.styles'
import { useMyRecipesQuery } from '../hooks/useMyRecipesQuery'
import { usePublishRecipeMutation } from '../hooks/usePublishRecipeMutation'
import { MyRecipeCard } from './MyRecipeCard'
import { MyRecipesFilter } from './MyRecipesFilter'
import {
  RECIPE_STATUS_FILTER,
  type RecipeStatusFilter,
} from './recipeStatusFilter'

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

  const { publishRecipe, loading: publishing } = usePublishRecipeMutation()
  const { recipes: allRecipes, loading, error, refetch } = useMyRecipesQuery()

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

  if (loading) return <Description>{t('library.loadingRecipes')}</Description>
  if (error) return <Alert severity="error">{t('library.recipesError')}</Alert>
  if (!allRecipes) return <Alert severity="error">{t('library.recipesError')}</Alert>
  const collectionRecipes = allRecipes.filter(
    (recipe) => !collectionId || recipe.collectionId === collectionId,
  )
  const recipes = collectionRecipes.filter((recipe) =>
    filter === RECIPE_STATUS_FILTER.ALL
      ? true
      : filter === RECIPE_STATUS_FILTER.DRAFTS
        ? recipe.isPrivate
        : !recipe.isPrivate,
  )

  return (
    <>
      <MyRecipesFilter value={filter} onChange={handleFilterChange} />
      {recipes.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Description>
            {t(
              collectionId && collectionRecipes.length === 0
                ? 'library.noCollectionRecipes'
                : allRecipes.length === 0
                  ? 'library.noRecipes'
                  : 'library.noStatusRecipes',
            )}
          </Description>
        </Box>
      ) : (
        <RecipeGrid sx={{ mt: 2 }}>
          {recipes.map((recipe) => (
            <MyRecipeCard
              key={recipe.id}
              recipe={recipe}
              isInCollection={Boolean(collectionId)}
              publishing={publishing}
              onPublish={handlePublish}
            />
          ))}
        </RecipeGrid>
      )}
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

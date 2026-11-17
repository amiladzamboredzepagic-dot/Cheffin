import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { Alert, Box } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { Description } from '../../../components/ui/typography/Description'
import { RecipeGrid } from '../LibraryPage.styles'
import { usePublishRecipeMutation } from '../hooks/usePublishRecipeMutation'
import { MyRecipeCard } from './MyRecipeCard'
import { MyRecipesFilter } from './MyRecipesFilter'
import {
  RECIPE_STATUS_FILTER,
  type RecipeStatusFilter,
} from './recipeStatusFilter'

export interface MyRecipe {
  id: string
  title: string
  description: string
  prepTimeMinutes: number
  servings: number
  photoContentType: string | null
  photoBase64: string | null
  isPrivate: boolean
}

const MY_RECIPES = gql`
  query MyRecipes {
    myRecipes {
      id
      title
      description
      prepTimeMinutes
      servings
      photoContentType
      photoBase64
      isPrivate
    }
  }
` as TypedDocumentNode<{ myRecipes: MyRecipe[] }>

export function MyRecipes() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<RecipeStatusFilter>(
    RECIPE_STATUS_FILTER.ALL,
  )
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)

  const { publishRecipe, loading: publishing } = usePublishRecipeMutation()
  const { data, loading, error, refetch } = useQuery(MY_RECIPES, {
    fetchPolicy: 'network-only',
  })

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
  if (!data) return <Alert severity="error">{t('library.recipesError')}</Alert>
  const recipes = data.myRecipes.filter((recipe) =>
    filter === RECIPE_STATUS_FILTER.ALL
      ? true
      : filter === RECIPE_STATUS_FILTER.DRAFTS
        ? recipe.isPrivate
        : !recipe.isPrivate,
  )

  return (
    <>
      <MyRecipesFilter value={filter} onChange={setFilter} />
      {recipes.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Description>
            {t(
              data.myRecipes.length === 0
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

import { Alert, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import type { SavedPublicRecipe } from '../../recipes/hooks/useMySavedRecipesQuery'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'
import { RecipeGrid } from '../LibraryPage.styles'
import { MyRecipeCard } from './MyRecipeCard'
import { SavedPublicRecipeCard } from './SavedPublicRecipeCard'
import {
  RECIPE_STATUS_FILTER,
  type RecipeStatusFilter,
} from './recipeStatusFilter'

interface MyRecipesResultsProps {
  allRecipes: MyRecipe[]
  savedRecipes: SavedPublicRecipe[]
  collectionId: string | null
  filter: RecipeStatusFilter
  savedLoading: boolean
  savedError: boolean
  removeSavedError: boolean
  publishing: boolean
  removingSaved: boolean
  onPublish: (recipeId: string) => void
  onRemoveSaved: (recipeId: string) => void
}

export function MyRecipesResults({
  allRecipes,
  savedRecipes,
  collectionId,
  filter,
  savedLoading,
  savedError,
  removeSavedError,
  publishing,
  removingSaved,
  onPublish,
  onRemoveSaved,
}: MyRecipesResultsProps) {
  const { t } = useTranslation()
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
  const savedCollectionRecipes = savedRecipes.filter(
    (recipe) => recipe.collectionId === collectionId,
  )
  const visibleSavedRecipes =
    filter === RECIPE_STATUS_FILTER.DRAFTS ? [] : savedCollectionRecipes

  return (
    <>
      {savedError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('library.savedRecipesError')}
        </Alert>
      )}
      {removeSavedError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('discovery.saveRecipeFailed')}
        </Alert>
      )}
      {recipes.length === 0 && visibleSavedRecipes.length === 0 ? (
        savedLoading && collectionId ? (
          <Box sx={{ mt: 2 }}>
            <Description>{t('library.loadingSavedRecipes')}</Description>
          </Box>
        ) : savedError && collectionId ? null : (
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
        )
      ) : (
        <>
          {recipes.length > 0 && (
            <RecipeGrid sx={{ mt: 2 }}>
              {recipes.map((recipe) => (
                <MyRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isInCollection={Boolean(collectionId)}
                  publishing={publishing}
                  onPublish={onPublish}
                />
              ))}
            </RecipeGrid>
          )}
          {visibleSavedRecipes.length > 0 && (
            <RecipeGrid sx={{ mt: 2 }}>
              {visibleSavedRecipes.map((recipe) => (
                <SavedPublicRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  disabled={removingSaved}
                  onRemove={(id) => void onRemoveSaved(id)}
                />
              ))}
            </RecipeGrid>
          )}
        </>
      )}
    </>
  )
}

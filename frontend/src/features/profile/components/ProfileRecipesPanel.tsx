import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { Description } from '../../../components/ui/typography/Description'
import { Loading } from '../../../components/ui/feedback/Loading'
import { getRecipeAttributeTags } from '../../discovery/recipeTags'
import type { MyRecipe } from '../../library/hooks/useMyRecipesQuery'
import { RecipeGrid } from '../../library/LibraryPage.styles'

interface ProfileRecipesPanelProps {
  recipes: MyRecipe[]
  loading: boolean
  error?: Error
}

export function ProfileRecipesPanel({
  recipes,
  loading,
  error,
}: ProfileRecipesPanelProps) {
  const { t } = useTranslation()

  return (
    <>
      <SectionIntroduction
        eyebrow={t('profile.eyebrow')}
        title={t('profile.publishedRecipes')}
        variant="compact"
      />
      {loading ? (
        <Loading label={t('library.loadingRecipes')} sx={{ mt: 2 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('library.recipesError')}
        </Alert>
      ) : recipes.length === 0 ? (
        <Description>{t('profile.noPublishedRecipes')}</Description>
      ) : (
        <RecipeGrid sx={{ mt: 2 }}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              imageUrl={
                recipe.photoBase64 && recipe.photoContentType
                  ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
                  : ''
              }
              imageAlt={recipe.title}
              tag={
                getRecipeAttributeTags(recipe, (key) => t(key)).join(' · ') ||
                undefined
              }
              metadata={t('library.recipeMetadata', {
                minutes: recipe.prepTimeMinutes,
                count: recipe.servings,
              })}
              context={recipe.description}
              showSaveButton={false}
            />
          ))}
        </RecipeGrid>
      )}
    </>
  )
}

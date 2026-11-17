import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import type { SavedPublicRecipe } from '../../recipes/hooks/useMySavedRecipesQuery'
import { getRecipeAttributeTags } from '../../discovery/recipeTags'

interface SavedPublicRecipeCardProps {
  recipe: SavedPublicRecipe
  disabled?: boolean
  onRemove: (recipeId: string) => void
}

export function SavedPublicRecipeCard({
  recipe,
  disabled = false,
  onRemove,
}: SavedPublicRecipeCardProps) {
  const { t } = useTranslation()

  return (
    <RecipeCard
      title={recipe.title}
      imageUrl={
        recipe.photoBase64 && recipe.photoContentType
          ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
          : ''
      }
      imageAlt={recipe.title}
      metadata={t('library.recipeMetadata', {
        minutes: recipe.prepTimeMinutes,
        count: recipe.servings,
      })}
      context={recipe.description}
      tag={
        getRecipeAttributeTags(
          {
            dietaryPreferences: recipe.dietaryPreferences,
            cuisine: recipe.cuisine,
            difficulty: recipe.difficulty,
          },
          (key) => t(key),
        ).join(' · ') || undefined
      }
      saved
      saveDisabled={disabled}
      onSavedChange={(isSaved) => {
        if (!isSaved) onRemove(recipe.id)
      }}
    />
  )
}

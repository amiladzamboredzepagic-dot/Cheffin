import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { Description } from '../../../components/ui/typography/Description'
import { RecipeGrid } from '../DiscoveryPage.styles'
import type { DiscoveryRecipe } from '../discovery.data'

interface DiscoveryRecipeGridProps {
  recipes: DiscoveryRecipe[]
}

export function DiscoveryRecipeGrid({ recipes }: DiscoveryRecipeGridProps) {
  const { t } = useTranslation()
  const [saved, setSaved] = useState<Set<string>>(() => new Set())

  if (recipes.length === 0) {
    return <Description>{t('discovery.noResults')}</Description>
  }

  return (
    <RecipeGrid>
      {recipes.map((recipe) => {
        const title = t(`discovery.recipes.${recipe.id}.title`)
        return (
          <RecipeCard
            key={recipe.id}
            title={title}
            imageUrl={recipe.imageUrl}
            imageAlt={title}
            context={t(`discovery.recipes.${recipe.id}.description`)}
            tag={`${t(`discovery.meals.${recipe.meal}`)} · ${t(`discovery.diets.${recipe.diets[0]}`)}`}
            metadata={t('discovery.metadata', {
              minutes: recipe.minutes,
              difficulty: t(`discovery.difficulties.${recipe.difficulty}`),
            })}
            rating={recipe.rating}
            saved={saved.has(recipe.id)}
            onSavedChange={(isSaved) =>
              setSaved((current) => {
                const next = new Set(current)
                if (isSaved) next.add(recipe.id)
                else next.delete(recipe.id)
                return next
              })
            }
          />
        )
      })}
    </RecipeGrid>
  )
}

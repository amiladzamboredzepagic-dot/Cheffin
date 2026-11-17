import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { Description } from '../../../components/ui/typography/Description'
import { RecipeGrid } from '../DiscoveryPage.styles'
import {
  DISCOVERY_RECIPE_SOURCE,
  isPublishedRecipe,
  type DiscoveryRecipe,
} from '../discovery.data'
import { getRecipeTagKeys } from '../recipeTags'
import { DiscoveryRecipeDialog } from './DiscoveryRecipeDialog'

interface DiscoveryRecipeGridProps {
  recipes: DiscoveryRecipe[]
}

export function DiscoveryRecipeGrid({ recipes }: DiscoveryRecipeGridProps) {
  const { t } = useTranslation()
  const [saved, setSaved] = useState<Set<string>>(() => new Set())
  const [selectedRecipe, setSelectedRecipe] = useState<DiscoveryRecipe | null>(
    null,
  )

  if (recipes.length === 0) {
    return <Description>{t('discovery.noResults')}</Description>
  }

  return (
    <>
      <RecipeGrid>
        {recipes.map((recipe) => {
          const published = isPublishedRecipe(recipe)
          const title = published
            ? recipe.title
            : t(`discovery.recipes.${recipe.id}.title`)
          const key = `${published ? DISCOVERY_RECIPE_SOURCE.PUBLISHED : DISCOVERY_RECIPE_SOURCE.SAMPLE}:${recipe.id}`
          return (
            <RecipeCard
              key={key}
              title={title}
              imageUrl={recipe.imageUrl}
              imageAlt={title}
              context={
                published
                  ? recipe.description
                  : t(`discovery.recipes.${recipe.id}.description`)
              }
              tag={getRecipeTagKeys(recipe)
                .map((key) => t(key))
                .join(' · ')}
              metadata={
                published
                  ? t('library.recipeMetadata', {
                      minutes: recipe.minutes,
                      count: recipe.servings,
                    })
                  : t('discovery.metadata', {
                      minutes: recipe.minutes,
                      difficulty: t(
                        `discovery.difficulties.${recipe.difficulty}`,
                      ),
                    })
              }
              rating={recipe.rating}
              onOpen={() => setSelectedRecipe(recipe)}
              openLabel={t('discovery.viewRecipeTitle', { title })}
              saved={saved.has(key)}
              onSavedChange={(isSaved) =>
                setSaved((current) => {
                  const next = new Set(current)
                  if (isSaved) next.add(key)
                  else next.delete(key)
                  return next
                })
              }
            />
          )
        })}
      </RecipeGrid>
      <DiscoveryRecipeDialog
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  )
}

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { Description } from '../../../components/ui/typography/Description'
import { RecipeGrid } from '../DiscoveryPage.styles'
import {
  DISCOVERY_RECIPE_SOURCE,
  isPublishedRecipe,
  type DiscoveryRecipe,
} from '../discovery.data'
import { getRecipeTags } from '../recipeTags'
import { useDiscoveryRecipeSaving } from '../hooks/useDiscoveryRecipeSaving'
import { DiscoveryRecipeDialog } from './DiscoveryRecipeDialog'
import { SavePublicRecipeDialog } from './SavePublicRecipeDialog'

interface DiscoveryRecipeGridProps {
  recipes: DiscoveryRecipe[]
}

export function DiscoveryRecipeGrid({ recipes }: DiscoveryRecipeGridProps) {
  const { t } = useTranslation()
  const [selectedRecipe, setSelectedRecipe] = useState<DiscoveryRecipe | null>(
    null,
  )
  const {
    savedRecipeIds,
    saving,
    removing,
    saveErrorOpen,
    saveDialogError,
    recipeToSave,
    handleSaveChange,
    handleSaveRecipe,
    closeSaveDialog,
    closeSaveError,
  } = useDiscoveryRecipeSaving()

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
              tag={getRecipeTags(recipe, (key) => t(key)).join(' · ')}
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
              saved={published && savedRecipeIds.has(recipe.id)}
              showSaveButton={published}
              saveDisabled={saving || removing}
              onSavedChange={
                published ? () => handleSaveChange(recipe) : undefined
              }
            />
          )
        })}
      </RecipeGrid>
      <DiscoveryRecipeDialog
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
      <SavePublicRecipeDialog
        key={recipeToSave?.id ?? 'closed'}
        recipe={recipeToSave}
        loading={saving}
        errorMessage={saveDialogError}
        onClose={closeSaveDialog}
        onSave={handleSaveRecipe}
      />
      <FeedbackSnackbar
        open={saveErrorOpen}
        severity="error"
        message={t('discovery.saveRecipeFailed')}
        onClose={closeSaveError}
      />
    </>
  )
}

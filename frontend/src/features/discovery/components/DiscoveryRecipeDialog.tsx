import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { Flex } from '../../../components/ui/layout/Flex'
import { GenericModal } from '../../../components/ui/modals/GenericModal'
import { isPublishedRecipe, type DiscoveryRecipe } from '../discovery.data'

interface DiscoveryRecipeDialogProps {
  recipe: DiscoveryRecipe | null
  onClose: () => void
}

export function DiscoveryRecipeDialog({
  recipe,
  onClose,
}: DiscoveryRecipeDialogProps) {
  const { t } = useTranslation()
  const published = recipe !== null && isPublishedRecipe(recipe)
  const title = recipe
    ? published
      ? recipe.title
      : t(`discovery.recipes.${recipe.id}.title`)
    : ''
  const description = recipe
    ? published
      ? recipe.description
      : t(`discovery.recipes.${recipe.id}.description`)
    : ''

  return (
    <GenericModal
      open={recipe !== null}
      onClose={onClose}
      title={title}
      description={description}
      closeLabel={t('common.close')}
      content={
        recipe && (
          <Flex direction="column" align="stretch">
            <Typography sx={{ mt: 2 }}>
              {published
                ? t('library.recipeMetadata', {
                    minutes: recipe.minutes,
                    count: recipe.servings,
                  })
                : t('discovery.metadata', {
                    minutes: recipe.minutes,
                    difficulty: t(
                      `discovery.difficulties.${recipe.difficulty}`,
                    ),
                  })}
            </Typography>
            {published ? (
              <>
                <Typography component="h3" variant="h6" sx={{ mt: 2 }}>
                  {t('recipeCreate.ingredientsTitle')}
                </Typography>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                {recipe.steps.length > 0 && (
                  <>
                    <Typography component="h3" variant="h6">
                      {t('discovery.method')}
                    </Typography>
                    <ol>
                      {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </>
                )}
              </>
            ) : (
              <Typography sx={{ mt: 2 }}>
                {t('discovery.sampleDetailsUnavailable')}
              </Typography>
            )}
          </Flex>
        )
      }
      footer={
        <Flex justify="flex-end">
          <ActionButton
            kind="secondary"
            onClick={onClose}
            text={t('discovery.closeRecipe')}
          />
        </Flex>
      }
    />
  )
}

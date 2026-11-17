import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
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
    <Dialog
      open={recipe !== null}
      onClose={onClose}
      aria-labelledby="discovery-recipe-title"
      fullWidth
    >
      {recipe && (
        <>
          <DialogTitle id="discovery-recipe-title">{title}</DialogTitle>
          <DialogContent>
            {description && <Typography>{description}</Typography>}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t('discovery.closeRecipe')}</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

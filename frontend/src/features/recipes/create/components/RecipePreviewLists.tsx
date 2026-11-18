import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import type { RecipeDraft } from '../../recipes.graphql'
import {
  PreviewIngredientRow,
  PreviewListHeading,
  PreviewListPanel,
  PreviewStepRow,
} from '../RecipeCreatePage.styles'

interface RecipePreviewListsProps {
  draft: RecipeDraft | null
}

export function RecipePreviewLists({ draft }: RecipePreviewListsProps) {
  const { t } = useTranslation()

  return (
    <Flex direction={{ xs: 'column', sm: 'row' }} align="stretch" gap={2}>
      <PreviewListPanel>
        <PreviewListHeading variant="h3">
          {t('recipeCreate.ingredients')}
        </PreviewListHeading>
        {draft?.ingredients.length ? (
          <Box component="ul" sx={{ mt: 0, mb: 0, pl: 2.5 }}>
            {draft.ingredients.map((ingredient, index) => (
              <PreviewIngredientRow key={`${index}-${ingredient}`}>
                {ingredient}
              </PreviewIngredientRow>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('recipeCreate.previewEmptyIngredients')}
          </Typography>
        )}
      </PreviewListPanel>
      <PreviewListPanel>
        <PreviewListHeading variant="h3">
          {t('recipeCreate.instructions')}
        </PreviewListHeading>
        {draft?.instructions.length ? (
          <Box component="ol" sx={{ mt: 0, mb: 0, pl: 0, listStyle: 'none' }}>
            {draft.instructions.map((instruction, index) => (
              <PreviewStepRow key={`${index}-${instruction}`}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    color: 'primary.light',
                    backgroundColor: 'background.accent',
                    fontWeight: 'medium',
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.55, pt: 0.25 }}
                >
                  {instruction}
                </Typography>
              </PreviewStepRow>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('recipeCreate.previewEmptyInstructions')}
          </Typography>
        )}
      </PreviewListPanel>
    </Flex>
  )
}

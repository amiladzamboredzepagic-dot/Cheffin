import { Check, CircleCheck, ExternalLink } from 'lucide-react'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import { FormTextField } from '../../../../components/ui/forms/FormTextField'
import type { RecipeDraft } from '../../recipes.graphql'
import {
  PreviewImage,
  PreviewLabel,
  PreviewMetadata,
  PreviewRecipeTitle,
  PreviewReview,
  PreviewStatus,
  RecipePreview,
  RecipeTag,
  ReviewAction,
  ReviewGuidance,
  ReviewHeading,
} from '../RecipeCreatePage.styles'

interface RecipePreviewCardProps {
  draft: RecipeDraft | null
  tags: string[]
  onDraftChange: (draft: RecipeDraft) => void
  onRequestManual: () => void
}

export function RecipePreviewCard({
  draft,
  tags,
  onDraftChange,
  onRequestManual,
}: RecipePreviewCardProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  const updateDraft = (updates: Partial<RecipeDraft>) => {
    if (draft) {
      onDraftChange({ ...draft, ...updates })
    }
  }

  const updateList = (value: string) =>
    value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

  const metadata = draft
    ? [
        draft.prepTimeMinutes !== null
          ? t('recipeCreate.prepTime', { minutes: draft.prepTimeMinutes })
          : null,
        draft.calories !== null
          ? t('recipeCreate.calorieCount', { calories: draft.calories })
          : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : t('recipeCreate.previewMetadata')

  return (
    <RecipePreview direction="column" align="stretch">
      <PreviewStatus direction="row" align="center">
        <CircleCheck size={19} aria-hidden="true" />
        {t('recipeCreate.previewStatus')}
        <PreviewLabel>{t('recipeCreate.previewLabel')}</PreviewLabel>
      </PreviewStatus>
      <PreviewImage
        src={
          draft?.imageUrl ??
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85'
        }
        alt={draft?.title ?? t('recipeCreate.previewImageAlt')}
        loading="lazy"
      />
      <Flex direction="column" align="stretch" gap={1.625}>
        {draft && isEditing ? (
          <>
            <FormTextField
              label={t('recipeCreate.manualTitleLabel')}
              value={draft.title}
              onChange={(event) => updateDraft({ title: event.target.value })}
              required
            />
            <FormTextField
              label={t('recipeCreate.descriptionLabel')}
              value={draft.description}
              onChange={(event) =>
                updateDraft({ description: event.target.value })
              }
              multiline
              minRows={2}
            />
            <FormTextField
              label={t('recipeCreate.prepTimeLabel')}
              type="number"
              value={draft.prepTimeMinutes ?? ''}
              onChange={(event) =>
                updateDraft({
                  prepTimeMinutes:
                    event.target.value === '' ? null : Number(event.target.value),
                })
              }
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
            />
            <FormTextField
              label={t('recipeCreate.servingsLabel')}
              type="number"
              value={draft.servings ?? ''}
              onChange={(event) =>
                updateDraft({
                  servings:
                    event.target.value === '' ? null : Number(event.target.value),
                })
              }
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
            />
          </>
        ) : (
          <>
            <PreviewRecipeTitle>
              {draft?.title ?? t('recipeCreate.previewTitle')}
            </PreviewRecipeTitle>
            {draft && <PreviewMetadata>{draft.description}</PreviewMetadata>}
          </>
        )}
        <Flex direction="row" align="center" gap={0.875}>
          <PreviewMetadata>
            {draft ? (
              <a href={draft.sourceUrl} target="_blank" rel="noreferrer">
                {t('recipeCreate.videoSource')}
              </a>
            ) : (
              t('recipeCreate.previewSource')
            )}
          </PreviewMetadata>
          <ExternalLink
            size={13}
            color="var(--mui-palette-primary-light)"
            aria-hidden="true"
          />
        </Flex>
        {metadata && <PreviewMetadata>{metadata}</PreviewMetadata>}
      </Flex>
      {draft &&
        (isEditing ? (
          <Flex direction="column" align="stretch" gap={1.5}>
            <FormTextField
              label={t('recipeCreate.ingredients')}
              value={draft.ingredients.join('\n')}
              onChange={(event) =>
                updateDraft({ ingredients: updateList(event.target.value) })
              }
              multiline
              minRows={3}
              required
            />
            <FormTextField
              label={t('recipeCreate.instructions')}
              value={draft.instructions.join('\n')}
              onChange={(event) =>
                updateDraft({ instructions: updateList(event.target.value) })
              }
              multiline
              minRows={4}
              required
            />
          </Flex>
        ) : (
          <Flex direction={{ xs: 'column', sm: 'row' }} align="stretch" gap={2}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">
                {t('recipeCreate.ingredients')}
              </Typography>
              <Box component="ul" sx={{ mt: 0.75, mb: 0, pl: 2.5 }}>
                {draft.ingredients.map((ingredient, index) => (
                  <Typography
                    component="li"
                    variant="body2"
                    key={`${index}-${ingredient}`}
                  >
                    {ingredient}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2">
                {t('recipeCreate.instructions')}
              </Typography>
              <Box component="ol" sx={{ mt: 0.75, mb: 0, pl: 2.5 }}>
                {draft.instructions.map((instruction, index) => (
                  <Typography
                    component="li"
                    variant="body2"
                    key={`${index}-${instruction}`}
                  >
                    {instruction}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Flex>
        ))}
      <Flex direction="row" wrap="wrap" gap={1}>
        {tags.map((tag) => (
          <RecipeTag key={tag} direction="row" align="center" gap={0.75}>
            <Check size={13} aria-hidden="true" />
            {t(`recipeCreate.tags.${tag}`, { defaultValue: tag })}
          </RecipeTag>
        ))}
      </Flex>
      <PreviewReview
        direction={{ xs: 'column', sm: 'row' }}
        justify="space-between"
        gap={2}
      >
        <Flex direction="column" align="flex-start" gap={0.875}>
          <ReviewHeading>{t('recipeCreate.reviewHeading')}</ReviewHeading>
          <ReviewGuidance>{t('recipeCreate.reviewGuidance')}</ReviewGuidance>
        </Flex>
        <ReviewAction
          type="button"
          onClick={() =>
            draft ? setIsEditing((editing) => !editing) : onRequestManual()
          }
        >
          {draft && isEditing
            ? t('recipeCreate.doneEditing')
            : t('recipeCreate.reviewAction')}
        </ReviewAction>
      </PreviewReview>
    </RecipePreview>
  )
}

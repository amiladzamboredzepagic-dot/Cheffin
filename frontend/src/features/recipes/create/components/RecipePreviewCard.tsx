import { Check, CircleCheck, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
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
  onRequestManual: () => void
}

export function RecipePreviewCard({ onRequestManual }: RecipePreviewCardProps) {
  const { t } = useTranslation()

  return (
    <RecipePreview direction="column" align="stretch">
      <PreviewStatus direction="row" align="center">
        <CircleCheck size={19} aria-hidden="true" />
        {t('recipeCreate.previewStatus')}
        <PreviewLabel>{t('recipeCreate.previewLabel')}</PreviewLabel>
      </PreviewStatus>
      <PreviewImage
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85"
        alt={t('recipeCreate.previewImageAlt')}
        loading="lazy"
      />
      <Flex direction="column" align="stretch" gap={1.625}>
        <PreviewRecipeTitle>
          {t('recipeCreate.previewTitle')}
        </PreviewRecipeTitle>
        <Flex direction="row" align="center" gap={0.875}>
          <PreviewMetadata>{t('recipeCreate.previewSource')}</PreviewMetadata>
          <ExternalLink
            size={13}
            color="var(--mui-palette-primary-light)"
            aria-hidden="true"
          />
        </Flex>
        <PreviewMetadata>{t('recipeCreate.previewMetadata')}</PreviewMetadata>
      </Flex>
      <Flex direction="row" wrap="wrap" gap={1}>
        {['vegetarian', 'glutenFree', 'highProtein'].map((tag) => (
          <RecipeTag key={tag} direction="row" align="center" gap={0.75}>
            <Check size={13} aria-hidden="true" />
            {t(`recipeCreate.tags.${tag}`)}
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
        <ReviewAction type="button" onClick={onRequestManual}>
          {t('recipeCreate.reviewAction')}
        </ReviewAction>
      </PreviewReview>
    </RecipePreview>
  )
}

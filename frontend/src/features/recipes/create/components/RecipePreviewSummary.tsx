import { ChefHat, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import type { RecipeDraft } from '../../recipes.graphql'
import {
  PreviewImage,
  PreviewImagePlaceholder,
  PreviewMetadata,
  PreviewRecipeTitle,
} from '../RecipeCreatePage.styles'

interface RecipePreviewSummaryProps {
  draft: RecipeDraft | null
  metadata: string
}

export function RecipePreviewSummary({
  draft,
  metadata,
}: RecipePreviewSummaryProps) {
  const { t } = useTranslation()

  return (
    <>
      {draft?.imageUrl ? (
        <PreviewImage
          src={draft.imageUrl}
          alt={draft.title}
          loading="lazy"
        />
      ) : (
        <PreviewImagePlaceholder aria-hidden="true">
          <ChefHat size={56} strokeWidth={1.5} aria-hidden="true" />
        </PreviewImagePlaceholder>
      )}
      <Flex direction="column" align="stretch" gap={1.625}>
        <PreviewRecipeTitle>
          {draft?.title || t('recipeCreate.manualTitleLabel')}
        </PreviewRecipeTitle>
        <PreviewMetadata>
          {draft?.description || t('recipeCreate.shortDescriptionLabel')}
        </PreviewMetadata>
        {draft && (
          <Flex direction="row" align="center" gap={0.875}>
            <PreviewMetadata>
              <a href={draft.sourceUrl} target="_blank" rel="noreferrer">
                {t('recipeCreate.videoSource')}
              </a>
            </PreviewMetadata>
            <ExternalLink
              size={13}
              color="var(--mui-palette-primary-light)"
              aria-hidden="true"
            />
          </Flex>
        )}
        {draft ? (
          metadata && <PreviewMetadata>{metadata}</PreviewMetadata>
        ) : (
          <PreviewMetadata>
            {t('recipeCreate.prepTimeLabel')} ·{' '}
            {t('recipeCreate.servingsLabel')}
          </PreviewMetadata>
        )}
      </Flex>
    </>
  )
}

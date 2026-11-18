import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import type { RecipeDraft } from '../../recipes.graphql'
import {
  PreviewImage,
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
      <PreviewImage
        src={
          draft?.imageUrl ??
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85'
        }
        alt={draft?.title ?? t('recipeCreate.previewImageAlt')}
        loading="lazy"
      />
      <Flex direction="column" align="stretch" gap={1.625}>
        <PreviewRecipeTitle>
          {draft?.title ?? t('recipeCreate.previewTitle')}
        </PreviewRecipeTitle>
        {draft && <PreviewMetadata>{draft.description}</PreviewMetadata>}
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
    </>
  )
}

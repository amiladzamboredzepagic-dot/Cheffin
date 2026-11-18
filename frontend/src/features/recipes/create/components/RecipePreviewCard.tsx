import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../../../components/ui/feedback/Loading'
import { Flex } from '../../../../components/ui/layout/Flex'
import { useRecipeMetadataQuery } from '../../hooks/useRecipeMetadataQuery'
import type { RecipeDraft } from '../../recipes.graphql'
import { RecipePreviewEditor } from './RecipePreviewEditor'
import { RecipePreviewLists } from './RecipePreviewLists'
import { RecipePreviewSummary } from './RecipePreviewSummary'
import {
  PreviewLabel,
  PreviewLoading,
  PreviewReview,
  PreviewStatus,
  RecipePreview,
  ReviewAction,
  ReviewGuidance,
  ReviewHeading,
} from '../RecipeCreatePage.styles'

interface RecipePreviewCardProps {
  draft: RecipeDraft | null
  isImporting: boolean
  onDraftChange: (draft: RecipeDraft) => void
  onRequestManual: () => void
}

export function RecipePreviewCard({
  draft,
  isImporting,
  onDraftChange,
  onRequestManual,
}: RecipePreviewCardProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const {
    dietaryPreferences,
    customDietaryPreferences,
    cuisines,
    customCuisines,
    difficulties,
    loading: metadataLoading,
    error: metadataError,
  } = useRecipeMetadataQuery()

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
  const editorMetadata = {
    dietaryPreferences,
    customDietaryPreferences,
    cuisines,
    customCuisines,
    difficulties,
    loading: metadataLoading,
    error: Boolean(metadataError),
  }

  return (
    <RecipePreview direction="column" align="stretch">
      {isImporting ? (
        <PreviewLoading direction="column" align="stretch" justify="center">
          <Loading label={t('recipeCreate.importing')} size={36} />
        </PreviewLoading>
      ) : (
        <>
          <PreviewStatus direction="row" align="center">
            <CircleCheck size={19} aria-hidden="true" />
            {t('recipeCreate.previewStatus')}
            <PreviewLabel>{t('recipeCreate.previewLabel')}</PreviewLabel>
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
          </PreviewStatus>
          <RecipePreviewSummary draft={draft} metadata={metadata} />
          {draft &&
            (isEditing ? (
              <RecipePreviewEditor
                draft={draft}
                metadata={editorMetadata}
                onDraftChange={onDraftChange}
              />
            ) : (
              <RecipePreviewLists draft={draft} />
            ))}
          <PreviewReview
            direction={{ xs: 'column', sm: 'row' }}
            justify="space-between"
            gap={2}
          >
            <Flex direction="column" align="flex-start" gap={0.875}>
              <ReviewHeading>{t('recipeCreate.reviewHeading')}</ReviewHeading>
              <ReviewGuidance>
                {t('recipeCreate.reviewGuidance')}
              </ReviewGuidance>
            </Flex>
          </PreviewReview>
        </>
      )}
    </RecipePreview>
  )
}

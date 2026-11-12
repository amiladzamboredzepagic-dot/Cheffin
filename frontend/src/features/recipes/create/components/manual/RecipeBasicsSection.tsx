import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormTextField } from '../../../../../components/ui/forms/FormTextField'
import {
  ManualRecipePanel,
  ManualSectionHeading,
  ManualSectionNumber,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

interface RecipeBasicsSectionProps {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

function RecipeBasicsSectionView({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: RecipeBasicsSectionProps) {
  const { t } = useTranslation()

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionHeading direction="row" align="baseline" gap={1.75}>
        <ManualSectionNumber>01</ManualSectionNumber>
        <ManualSectionTitle>{t('recipeCreate.basicsTitle')}</ManualSectionTitle>
      </ManualSectionHeading>

      <FormTextField
        label={t('recipeCreate.manualTitleLabel')}
        placeholder={t('recipeCreate.manualTitlePlaceholder')}
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        required
      />
      <FormTextField
        label={t('recipeCreate.shortDescriptionLabel')}
        placeholder={t('recipeCreate.shortDescriptionPlaceholder')}
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        multiline
        minRows={2}
      />
    </ManualRecipePanel>
  )
}

export const RecipeBasicsSection = memo(RecipeBasicsSectionView)

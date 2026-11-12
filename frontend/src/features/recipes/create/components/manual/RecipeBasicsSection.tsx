import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormTextField } from '../../../../../components/ui/forms/FormTextField'
import {
  ManualRecipePanel,
  ManualSectionHeading,
  ManualSectionNumber,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

export function RecipeBasicsSection() {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <FormTextField
        label={t('recipeCreate.shortDescriptionLabel')}
        placeholder={t('recipeCreate.shortDescriptionPlaceholder')}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        multiline
        minRows={2}
      />
    </ManualRecipePanel>
  )
}

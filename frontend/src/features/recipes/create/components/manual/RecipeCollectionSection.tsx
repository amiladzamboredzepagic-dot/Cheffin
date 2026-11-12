import { useTranslation } from 'react-i18next'
import { ManualRecipePanel, ManualSectionTitle } from '../WriteYourOwnRecipe.styles'
import { RecipeCollectionField } from '../RecipeEntryFields'

export function RecipeCollectionSection() {
  const { t } = useTranslation()

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>
        {t('recipeCreate.organizeTitle')}
      </ManualSectionTitle>
      <RecipeCollectionField />
    </ManualRecipePanel>
  )
}

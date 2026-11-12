import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ManualRecipePanel, ManualSectionTitle } from '../WriteYourOwnRecipe.styles'
import { RecipeCollectionField } from '../RecipeEntryFields'

interface RecipeCollectionSectionProps {
  value: string
  onChange: (collectionId: string) => void
}

function RecipeCollectionSectionView({
  value,
  onChange,
}: RecipeCollectionSectionProps) {
  const { t } = useTranslation()

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>
        {t('recipeCreate.organizeTitle')}
      </ManualSectionTitle>
      <RecipeCollectionField value={value} onChange={onChange} />
    </ManualRecipePanel>
  )
}

export const RecipeCollectionSection = memo(RecipeCollectionSectionView)

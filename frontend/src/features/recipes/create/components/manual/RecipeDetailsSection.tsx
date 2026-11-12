import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { FormTextField } from '../../../../../components/ui/forms/FormTextField'
import type { RecipeMealType } from './recipeDraft'
import {
  ManualDetailsGrid,
  ManualFieldLabel,
  ManualMealTypeButton,
  ManualMealTypes,
  ManualRecipePanel,
  ManualSectionHint,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

const MEAL_TYPES: RecipeMealType[] = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
]

interface RecipeDetailsSectionProps {
  prepTime: string
  servings: string
  mealType: RecipeMealType
  onPrepTimeChange: (value: string) => void
  onServingsChange: (value: string) => void
  onMealTypeChange: (value: RecipeMealType) => void
}

function RecipeDetailsSectionView({
  prepTime,
  servings,
  mealType,
  onPrepTimeChange,
  onServingsChange,
  onMealTypeChange,
}: RecipeDetailsSectionProps) {
  const { t } = useTranslation()

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>{t('recipeCreate.detailsTitle')}</ManualSectionTitle>

      <ManualDetailsGrid>
        <FormTextField
          label={t('recipeCreate.prepTimeLabel')}
          placeholder="20"
          type="number"
          value={prepTime}
          onChange={(event) => onPrepTimeChange(event.target.value)}
          required
          slotProps={{ htmlInput: { min: 1, step: 1 } }}
        />
        <FormTextField
          label={t('recipeCreate.servingsLabel')}
          placeholder="2"
          type="number"
          value={servings}
          onChange={(event) => onServingsChange(event.target.value)}
          required
          slotProps={{ htmlInput: { min: 1, step: 1 } }}
        />
      </ManualDetailsGrid>

      <ManualSectionHint>
        {t('recipeCreate.positiveNumbersHint')}
      </ManualSectionHint>
      <ManualFieldLabel>{t('recipeCreate.mealTypeLabel')}</ManualFieldLabel>

      <ManualMealTypes>
        {MEAL_TYPES.map((type) => (
          <ManualMealTypeButton
            key={type}
            type="button"
            selected={mealType === type}
            aria-pressed={mealType === type}
            onClick={() => onMealTypeChange(type)}
          >
            {mealType === type && <Check size={11} aria-hidden="true" />}
            {t(`recipeCreate.mealTypes.${type}`)}
          </ManualMealTypeButton>
        ))}
      </ManualMealTypes>
    </ManualRecipePanel>
  )
}

export const RecipeDetailsSection = memo(RecipeDetailsSectionView)

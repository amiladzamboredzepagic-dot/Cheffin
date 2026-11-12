import { memo, type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Minus } from 'lucide-react'
import { Flex } from '../../../../../components/ui/layout/Flex'
import { AddListItemButton } from './AddListItemButton'
import {
  ManualFieldLabel,
  ManualIconButton,
  ManualListRow,
  ManualRecipePanel,
  ManualSectionHeading,
  ManualSectionHint,
  ManualSectionNumber,
  ManualSectionTitle,
  ManualTextInput,
} from '../WriteYourOwnRecipe.styles'

interface IngredientsSectionProps {
  ingredients: string[]
  setIngredients: Dispatch<SetStateAction<string[]>>
}

function IngredientsSectionView({
  ingredients,
  setIngredients,
}: IngredientsSectionProps) {
  const { t } = useTranslation()

  const updateIngredient = (index: number, value: string) => {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? value : ingredient,
      ),
    )
  }

  const removeIngredient = (index: number) => {
    setIngredients((current) =>
      current.length > 1
        ? current.filter((_, ingredientIndex) => ingredientIndex !== index)
        : current,
    )
  }

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionHeading direction="row" align="baseline" gap={1.75}>
        <ManualSectionNumber>02</ManualSectionNumber>

        <ManualSectionTitle>
          {t('recipeCreate.ingredientsTitle')}
        </ManualSectionTitle>
      </ManualSectionHeading>

      <ManualSectionHint>{t('recipeCreate.ingredientsHint')}</ManualSectionHint>

      <ManualFieldLabel>
        {t('recipeCreate.ingredientsLabel')} *
      </ManualFieldLabel>

      <Flex direction="column" align="stretch" gap={0.75}>
        {ingredients.map((ingredient, index) => (
          <ManualListRow key={index}>
            <ManualTextInput
              aria-label={t('recipeCreate.ingredientNumber', {
                number: index + 1,
              })}
              placeholder={t('recipeCreate.ingredientPlaceholder')}
              value={ingredient}
              onChange={(event) => updateIngredient(index, event.target.value)}
              required={
                ingredients.every((item) => !item.trim()) && index === 0
              }
            />
            <ManualIconButton
              type="button"
              aria-label={t('recipeCreate.removeIngredient', {
                number: index + 1,
              })}
              onClick={() => removeIngredient(index)}
            >
              <Minus size={15} aria-hidden="true" />
            </ManualIconButton>
          </ManualListRow>
        ))}
      </Flex>

      <AddListItemButton
        label={t('recipeCreate.addIngredient')}
        onClick={() => setIngredients((current) => [...current, ''])}
      />
    </ManualRecipePanel>
  )
}

export const IngredientsSection = memo(IngredientsSectionView)

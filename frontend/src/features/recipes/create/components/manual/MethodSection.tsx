import { memo, type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../../components/ui/layout/Flex'
import { AddListItemButton } from './AddListItemButton'
import {
  ManualFieldLabel,
  ManualRecipePanel,
  ManualSectionHeading,
  ManualSectionHint,
  ManualSectionNumber,
  ManualSectionTitle,
  ManualTextArea,
  ManualTextButton,
} from '../WriteYourOwnRecipe.styles'

interface MethodSectionProps {
  steps: string[]
  setSteps: Dispatch<SetStateAction<string[]>>
}

function MethodSectionView({ steps, setSteps }: MethodSectionProps) {
  const { t } = useTranslation()

  const updateStep = (index: number, value: string) => {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? value : step)),
    )
  }

  const removeStep = (index: number) => {
    setSteps((current) =>
      current.length > 1
        ? current.filter((_, stepIndex) => stepIndex !== index)
        : current,
    )
  }

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionHeading direction="row" align="baseline" gap={1.75}>
        <ManualSectionNumber>03</ManualSectionNumber>

        <ManualSectionTitle>{t('recipeCreate.methodTitle')}</ManualSectionTitle>
      </ManualSectionHeading>

      <ManualSectionHint>{t('recipeCreate.methodHint')}</ManualSectionHint>

      <Flex direction="column" align="stretch" gap={1.25}>
        {steps.map((step, index) => (
          <Flex key={index} direction="column" align="stretch" gap={0.5}>
            <Flex direction="row" align="center" justify="space-between">
              <ManualFieldLabel>
                {t('recipeCreate.stepNumber', { number: index + 1 })}
              </ManualFieldLabel>
              <ManualTextButton type="button" onClick={() => removeStep(index)}>
                {t('recipeCreate.removeStep')}
              </ManualTextButton>
            </Flex>
            <ManualTextArea
              aria-label={t('recipeCreate.stepNumber', {
                number: index + 1,
              })}
              placeholder={t('recipeCreate.stepPlaceholder')}
              value={step}
              onChange={(event) => updateStep(index, event.target.value)}
            />
          </Flex>
        ))}
      </Flex>

      <AddListItemButton
        label={t('recipeCreate.addStep')}
        onClick={() => setSteps((current) => [...current, ''])}
      />
    </ManualRecipePanel>
  )
}

export const MethodSection = memo(MethodSectionView)

import { Alert } from '@mui/material'
import { Check, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../../components/ui/layout/Flex'
import {
  ManualFieldLabel,
  ManualMealTypeButton,
  ManualMealTypes,
  ManualTextButton,
  ManualTextInput,
} from '../WriteYourOwnRecipe.styles'
import { MAX_CUSTOM_PREFERENCE_LENGTH } from '../../hooks/useRecipePreferences'

interface DietaryPreferencesFieldProps {
  dietaryPreferences: string[]
  supportedDietaryPreferences: string[]
  customPreferences: string[]
  customPreferenceInput: string
  addingPreference: boolean
  customPreferenceError: boolean
  onCustomPreferenceInputChange: (value: string) => void
  onAddCustomPreference: () => void
  onTogglePreference: (preference: string) => void
}

export function DietaryPreferencesField({
  dietaryPreferences,
  supportedDietaryPreferences,
  customPreferences,
  customPreferenceInput,
  addingPreference,
  customPreferenceError,
  onCustomPreferenceInputChange,
  onAddCustomPreference,
  onTogglePreference,
}: DietaryPreferencesFieldProps) {
  const { t } = useTranslation()

  return (
    <>
      {customPreferenceError && (
        <Alert severity="error">
          {t('recipeCreate.addPreferenceFailed')}
        </Alert>
      )}
      <ManualFieldLabel>
        {t('recipeCreate.dietaryPreferencesLabel')}
      </ManualFieldLabel>
      <ManualMealTypes
        role="group"
        aria-label={t('recipeCreate.dietaryPreferencesLabel')}
      >
        {supportedDietaryPreferences.map((preference) => {
          const selected = dietaryPreferences.includes(preference)
          return (
            <ManualMealTypeButton
              key={preference}
              type="button"
              selected={selected}
              aria-pressed={selected}
              onClick={() => onTogglePreference(preference)}
            >
              {selected && <Check size={11} aria-hidden="true" />}
              {t(`discovery.diets.${preference}`, {
                defaultValue: preference,
              })}
            </ManualMealTypeButton>
          )
        })}
        {customPreferences.map((preference) => {
          const selected = dietaryPreferences.includes(preference)
          return (
            <ManualMealTypeButton
              key={preference}
              type="button"
              selected={selected}
              aria-pressed={selected}
              onClick={() => onTogglePreference(preference)}
            >
              {selected && <Check size={11} aria-hidden="true" />}
              {preference}
            </ManualMealTypeButton>
          )
        })}
      </ManualMealTypes>

      <Flex align="center" gap={1}>
        <ManualTextInput
          aria-label={t('recipeCreate.customDietaryPreferenceLabel')}
          placeholder={t('recipeCreate.customDietaryPreferencePlaceholder')}
          maxLength={MAX_CUSTOM_PREFERENCE_LENGTH}
          value={customPreferenceInput}
          onChange={(event) => onCustomPreferenceInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              void onAddCustomPreference()
            }
          }}
        />
        <ManualTextButton
          type="button"
          disabled={!customPreferenceInput.trim() || addingPreference}
          onClick={onAddCustomPreference}
        >
          <Plus size={13} aria-hidden="true" />
          {t(
            addingPreference
              ? 'recipeCreate.savingPreference'
              : 'recipeCreate.addPreference',
          )}
        </ManualTextButton>
      </Flex>
    </>
  )
}

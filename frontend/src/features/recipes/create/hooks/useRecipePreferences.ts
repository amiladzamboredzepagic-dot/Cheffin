import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddDietaryPreferenceMutation } from '../../hooks/useRecipeMetadataQuery'

export const MAX_CUSTOM_PREFERENCE_LENGTH = 60

interface UseRecipePreferencesOptions {
  dietaryPreferences: string[]
  supportedDietaryPreferences: string[]
  customDietaryPreferences: string[]
  onDietaryPreferencesChange: (value: string[]) => void
}

export function useRecipePreferences({
  dietaryPreferences,
  supportedDietaryPreferences,
  customDietaryPreferences,
  onDietaryPreferencesChange,
}: UseRecipePreferencesOptions) {
  const { t } = useTranslation()
  const [customPreferenceInput, setCustomPreferenceInput] = useState('')
  const [customPreferenceError, setCustomPreferenceError] = useState(false)
  const { addDietaryPreference, loading: addingPreference } =
    useAddDietaryPreferenceMutation()

  const customPreferencesByName = new Map<string, string>()
  for (const preference of [
    ...dietaryPreferences.filter(
      (value) => !supportedDietaryPreferences.includes(value),
    ),
    ...customDietaryPreferences,
  ]) {
    customPreferencesByName.set(preference.toLocaleLowerCase(), preference)
  }
  const customPreferences = [...customPreferencesByName.values()]

  const toggleDietaryPreference = (preference: string) => {
    onDietaryPreferencesChange(
      dietaryPreferences.includes(preference)
        ? dietaryPreferences.filter((value) => value !== preference)
        : [...dietaryPreferences, preference],
    )
  }

  const addCustomPreference = async () => {
    const enteredPreference = customPreferenceInput.trim()
    if (!enteredPreference) return

    const normalizedInput = enteredPreference.toLocaleLowerCase()
    const knownPreference = supportedDietaryPreferences.find(
      (preference) =>
        preference.toLocaleLowerCase() === normalizedInput ||
        t(`discovery.diets.${preference}`).toLocaleLowerCase() ===
          normalizedInput,
    )
    const existingCustomPreference = customPreferences.find(
      (preference) => preference.toLocaleLowerCase() === normalizedInput,
    )

    try {
      setCustomPreferenceError(false)
      const preference =
        knownPreference ??
        existingCustomPreference ??
        (await addDietaryPreference(enteredPreference))
      if (
        !dietaryPreferences.some(
          (value) =>
            value.toLocaleLowerCase() === preference.toLocaleLowerCase(),
        )
      ) {
        onDietaryPreferencesChange([...dietaryPreferences, preference])
      }
      setCustomPreferenceInput('')
    } catch (error) {
      console.error('Failed to save dietary preference:', error)
      setCustomPreferenceError(true)
    }
  }

  return {
    addingPreference,
    addCustomPreference,
    customPreferenceError,
    customPreferenceInput,
    customPreferences,
    setCustomPreferenceInput,
    toggleDietaryPreference,
  }
}

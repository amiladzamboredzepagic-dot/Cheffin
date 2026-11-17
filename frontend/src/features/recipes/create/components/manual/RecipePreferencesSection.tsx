import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '@mui/material'
import { Description } from '../../../../../components/ui/typography/Description'
import type { RecipeDifficulty } from '../../../recipeMetadata'
import { useRecipePreferences } from '../../hooks/useRecipePreferences'
import { CuisineField } from './CuisineField'
import { DietaryPreferencesField } from './DietaryPreferencesField'
import { DifficultyField } from './DifficultyField'
import {
  ManualRecipePanel,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

interface RecipePreferencesSectionProps {
  dietaryPreferences: string[]
  supportedDietaryPreferences: string[]
  customDietaryPreferences: string[]
  supportedCuisines: string[]
  customCuisines: string[]
  supportedDifficulties: string[]
  metadataLoading: boolean
  metadataError: boolean
  cuisine: string | null
  difficulty: RecipeDifficulty | null
  onDietaryPreferencesChange: (value: string[]) => void
  onCuisineChange: (value: string | null) => void
  onDifficultyChange: (value: RecipeDifficulty | null) => void
}

function RecipePreferencesSectionView({
  dietaryPreferences,
  supportedDietaryPreferences,
  customDietaryPreferences,
  supportedCuisines,
  customCuisines,
  supportedDifficulties,
  metadataLoading,
  metadataError,
  cuisine,
  difficulty,
  onDietaryPreferencesChange,
  onCuisineChange,
  onDifficultyChange,
}: RecipePreferencesSectionProps) {
  const { t } = useTranslation()
  const {
    addingPreference,
    addCustomPreference,
    customPreferenceError,
    customPreferenceInput,
    customPreferences,
    setCustomPreferenceInput,
    toggleDietaryPreference,
  } = useRecipePreferences({
    dietaryPreferences,
    supportedDietaryPreferences,
    customDietaryPreferences,
    onDietaryPreferencesChange,
  })

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>
        {t('recipeCreate.preferencesTitle')}
      </ManualSectionTitle>

      {metadataLoading && (
        <Description>{t('recipeCreate.loadingDietaryPreferences')}</Description>
      )}
      {metadataError && (
        <Alert severity="error">
          {t('recipeCreate.dietaryPreferencesUnavailable')}
        </Alert>
      )}
      <DietaryPreferencesField
        dietaryPreferences={dietaryPreferences}
        supportedDietaryPreferences={supportedDietaryPreferences}
        customPreferences={customPreferences}
        customPreferenceInput={customPreferenceInput}
        addingPreference={addingPreference}
        customPreferenceError={customPreferenceError}
        onCustomPreferenceInputChange={setCustomPreferenceInput}
        onAddCustomPreference={addCustomPreference}
        onTogglePreference={toggleDietaryPreference}
      />
      <CuisineField
        cuisine={cuisine}
        supportedCuisines={supportedCuisines}
        customCuisines={customCuisines}
        onCuisineChange={onCuisineChange}
      />
      <DifficultyField
        difficulty={difficulty}
        supportedDifficulties={supportedDifficulties}
        onDifficultyChange={onDifficultyChange}
      />
    </ManualRecipePanel>
  )
}

export const RecipePreferencesSection = memo(RecipePreferencesSectionView)

import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { CustomSelectMenu } from '../../../../../components/ui/menus/CustomSelectMenu'
import {
  RECIPE_CUISINES,
  RECIPE_DIETARY_PREFERENCES,
  RECIPE_DIFFICULTIES,
  type RecipeCuisine,
  type RecipeDifficulty,
  type RecipeDietaryPreference,
} from '../../../recipeMetadata'
import {
  ManualFieldLabel,
  ManualMealTypeButton,
  ManualMealTypes,
  ManualRecipePanel,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

const CUISINE_OPTIONS = [
  {
    id: '',
    label: 'recipeCreate.notSpecified',
    translationKey: true,
  },
  ...RECIPE_CUISINES.map((cuisine) => ({
    id: cuisine,
    label: `discovery.cuisines.${cuisine}`,
    translationKey: true,
  })),
]

const DIFFICULTY_OPTIONS = [
  {
    id: '',
    label: 'recipeCreate.notSpecified',
    translationKey: true,
  },
  ...RECIPE_DIFFICULTIES.map((difficulty) => ({
    id: difficulty,
    label: `discovery.difficulties.${difficulty}`,
    translationKey: true,
  })),
]

interface RecipePreferencesSectionProps {
  dietaryPreferences: RecipeDietaryPreference[]
  cuisine: RecipeCuisine | null
  difficulty: RecipeDifficulty | null
  onDietaryPreferencesChange: (value: RecipeDietaryPreference[]) => void
  onCuisineChange: (value: RecipeCuisine | null) => void
  onDifficultyChange: (value: RecipeDifficulty | null) => void
}

function RecipePreferencesSectionView({
  dietaryPreferences,
  cuisine,
  difficulty,
  onDietaryPreferencesChange,
  onCuisineChange,
  onDifficultyChange,
}: RecipePreferencesSectionProps) {
  const { t } = useTranslation()

  const toggleDietaryPreference = (preference: RecipeDietaryPreference) => {
    onDietaryPreferencesChange(
      dietaryPreferences.includes(preference)
        ? dietaryPreferences.filter((value) => value !== preference)
        : [...dietaryPreferences, preference],
    )
  }

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>
        {t('recipeCreate.preferencesTitle')}
      </ManualSectionTitle>

      <ManualFieldLabel>
        {t('recipeCreate.dietaryPreferencesLabel')}
      </ManualFieldLabel>
      <ManualMealTypes
        role="group"
        aria-label={t('recipeCreate.dietaryPreferencesLabel')}
      >
        {RECIPE_DIETARY_PREFERENCES.map((preference) => {
          const selected = dietaryPreferences.includes(preference)
          return (
            <ManualMealTypeButton
              key={preference}
              type="button"
              selected={selected}
              aria-pressed={selected}
              onClick={() => toggleDietaryPreference(preference)}
            >
              {selected && <Check size={11} aria-hidden="true" />}
              {t(`discovery.diets.${preference}`)}
            </ManualMealTypeButton>
          )
        })}
      </ManualMealTypes>

      <CustomSelectMenu
        label={t('recipeCreate.cuisineLabel')}
        options={CUISINE_OPTIONS}
        value={cuisine ?? ''}
        onChange={(value) =>
          onCuisineChange(
            RECIPE_CUISINES.find((option) => option === value) ?? null,
          )
        }
        searchable={false}
      />

      <CustomSelectMenu
        label={t('recipeCreate.difficultyLabel')}
        options={DIFFICULTY_OPTIONS}
        value={difficulty ?? ''}
        onChange={(value) =>
          onDifficultyChange(
            RECIPE_DIFFICULTIES.find((option) => option === value) ?? null,
          )
        }
        searchable={false}
      />
    </ManualRecipePanel>
  )
}

export const RecipePreferencesSection = memo(RecipePreferencesSectionView)

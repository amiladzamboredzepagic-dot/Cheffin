import type { Dispatch, SetStateAction } from 'react'
import type { RecipeMealType } from '../../recipeMetadata'
import type { RecipeDraft } from '../../recipes.graphql'
import { IngredientsSection } from './manual/IngredientsSection'
import { MethodSection } from './manual/MethodSection'
import { RecipeBasicsSection } from './manual/RecipeBasicsSection'
import { RecipeDetailsSection } from './manual/RecipeDetailsSection'
import { RecipePreferencesSection } from './manual/RecipePreferencesSection'
import {
  ManualRecipeColumn,
  ManualRecipeGrid,
} from './WriteYourOwnRecipe.styles'

interface RecipePreviewMetadata {
  dietaryPreferences: string[]
  customDietaryPreferences: string[]
  cuisines: string[]
  customCuisines: string[]
  difficulties: string[]
  loading: boolean
  error: boolean
}

interface RecipePreviewEditorProps {
  draft: RecipeDraft
  metadata: RecipePreviewMetadata
  onDraftChange: (draft: RecipeDraft) => void
}

export function RecipePreviewEditor({
  draft,
  metadata,
  onDraftChange,
}: RecipePreviewEditorProps) {
  const updateDraft = (updates: Partial<RecipeDraft>) => {
    onDraftChange({ ...draft, ...updates })
  }

  const setIngredients: Dispatch<SetStateAction<string[]>> = (next) => {
    updateDraft({
      ingredients: typeof next === 'function' ? next(draft.ingredients) : next,
    })
  }

  const setInstructions: Dispatch<SetStateAction<string[]>> = (next) => {
    updateDraft({
      instructions:
        typeof next === 'function' ? next(draft.instructions) : next,
    })
  }

  const updateNumber = (
    field: 'prepTimeMinutes' | 'servings',
    value: string,
  ) => {
    const number = value === '' ? null : Number(value)
    if (field === 'prepTimeMinutes') {
      updateDraft({ prepTimeMinutes: number })
    } else {
      updateDraft({ servings: number })
    }
  }

  return (
    <ManualRecipeGrid>
      <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
        <RecipeBasicsSection
          title={draft.title}
          description={draft.description}
          onTitleChange={(title) => updateDraft({ title })}
          onDescriptionChange={(description) => updateDraft({ description })}
        />
        <IngredientsSection
          ingredients={draft.ingredients}
          setIngredients={setIngredients}
        />
        <MethodSection steps={draft.instructions} setSteps={setInstructions} />
      </ManualRecipeColumn>
      <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
        <RecipeDetailsSection
          prepTime={
            draft.prepTimeMinutes === null ? '' : String(draft.prepTimeMinutes)
          }
          servings={draft.servings === null ? '' : String(draft.servings)}
          mealType={draft.mealType}
          onPrepTimeChange={(value) => updateNumber('prepTimeMinutes', value)}
          onServingsChange={(value) => updateNumber('servings', value)}
          onMealTypeChange={(mealType: RecipeMealType) =>
            updateDraft({ mealType })
          }
        />
        <RecipePreferencesSection
          dietaryPreferences={draft.dietaryPreferences}
          supportedDietaryPreferences={metadata.dietaryPreferences}
          customDietaryPreferences={metadata.customDietaryPreferences}
          supportedCuisines={metadata.cuisines}
          customCuisines={metadata.customCuisines}
          supportedDifficulties={metadata.difficulties}
          metadataLoading={metadata.loading}
          metadataError={metadata.error}
          cuisine={draft.cuisine}
          difficulty={draft.difficulty}
          onDietaryPreferencesChange={(dietaryPreferences) =>
            updateDraft({ dietaryPreferences })
          }
          onCuisineChange={(cuisine) => updateDraft({ cuisine })}
          onDifficultyChange={(difficulty) => updateDraft({ difficulty })}
        />
      </ManualRecipeColumn>
    </ManualRecipeGrid>
  )
}

import type {
  RecipeCuisine,
  RecipeDifficulty,
  RecipeDietaryPreference,
  RecipeMealType,
} from '../../../recipeMetadata'

export type { RecipeMealType } from '../../../recipeMetadata'

export interface ManualRecipeDraft {
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMinutes: string
  servings: string
  mealType: RecipeMealType
  dietaryPreferences: RecipeDietaryPreference[]
  cuisine: RecipeCuisine | null
  difficulty: RecipeDifficulty | null
  photo: File | null
}

import type {
  RecipeDifficulty,
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
  dietaryPreferences: string[]
  cuisine: string | null
  difficulty: RecipeDifficulty | null
  photo: File | null
}

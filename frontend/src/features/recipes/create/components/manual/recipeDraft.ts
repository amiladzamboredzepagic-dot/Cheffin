export type RecipeMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface ManualRecipeDraft {
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMinutes: string
  servings: string
  mealType: RecipeMealType
  photo: File | null
}

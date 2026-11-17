export const RECIPE_MEAL_TYPE = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
  DESSERT: 'dessert',
  DRINK: 'drink',
} as const

export const RECIPE_MEAL_TYPES = [
  RECIPE_MEAL_TYPE.BREAKFAST,
  RECIPE_MEAL_TYPE.LUNCH,
  RECIPE_MEAL_TYPE.DINNER,
  RECIPE_MEAL_TYPE.SNACK,
  RECIPE_MEAL_TYPE.DESSERT,
  RECIPE_MEAL_TYPE.DRINK,
] as const

export type RecipeMealType = (typeof RECIPE_MEAL_TYPES)[number]

export const RECIPE_DIETARY_PREFERENCES = [
  'vegetarian',
  'vegan',
  'glutenFree',
  'dairyFree',
  'highProtein',
] as const

export type RecipeDietaryPreference =
  (typeof RECIPE_DIETARY_PREFERENCES)[number]

export const RECIPE_CUISINES = [
  'italian',
  'mediterranean',
  'asian',
  'mexican',
] as const

export type RecipeCuisine = (typeof RECIPE_CUISINES)[number]

export const RECIPE_DIFFICULTIES = ['easy', 'medium', 'project'] as const

export type RecipeDifficulty = (typeof RECIPE_DIFFICULTIES)[number]

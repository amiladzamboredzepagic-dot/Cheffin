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

export type RecipeCuisine = string

export type RecipeDifficulty = string

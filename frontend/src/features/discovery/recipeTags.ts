import type {
  RecipeCuisine,
  RecipeDifficulty,
  RecipeDietaryPreference,
} from '../recipes/recipeMetadata'
import {
  isPublishedRecipe,
  type DiscoveryRecipe,
} from './discovery.data'

interface RecipeTagAttributes {
  dietaryPreferences: readonly RecipeDietaryPreference[]
  cuisine?: RecipeCuisine | null
  difficulty?: RecipeDifficulty | null
}

export function getRecipeAttributeTagKeys({
  dietaryPreferences,
  cuisine,
  difficulty,
}: RecipeTagAttributes): string[] {
  return [
    ...dietaryPreferences.map(
      (preference) => `discovery.diets.${preference}`,
    ),
    ...(cuisine ? [`discovery.cuisines.${cuisine}`] : []),
    ...(difficulty ? [`discovery.difficulties.${difficulty}`] : []),
  ]
}

export function getRecipeTagKeys(recipe: DiscoveryRecipe): string[] {
  if (!isPublishedRecipe(recipe)) {
    return [
      'discovery.sample',
      `discovery.meals.${recipe.meal}`,
      ...getRecipeAttributeTagKeys({
        dietaryPreferences: recipe.diets.slice(0, 1),
      }),
    ]
  }

  return [
    'discovery.published',
    `discovery.meals.${recipe.meal}`,
    ...getRecipeAttributeTagKeys({
      dietaryPreferences: recipe.diets,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
    }),
  ]
}

import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import type {
  RecipeCuisine,
  RecipeDifficulty,
  RecipeDietaryPreference,
  RecipeMealType,
} from '../recipes/recipeMetadata'
import { RECIPE_MEAL_TYPE } from '../recipes/recipeMetadata'
import {
  DISCOVERY_RECIPE_SOURCE,
  DISCOVERY_RECIPE_SOURCE_KEY,
  type PublishedDiscoveryRecipe,
} from './discovery.data'

interface PublicRecipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMinutes: number
  servings: number
  mealType: RecipeMealType
  dietaryPreferences: RecipeDietaryPreference[]
  cuisine: RecipeCuisine | null
  difficulty: RecipeDifficulty | null
  photoContentType: string | null
  photoBase64: string | null
}

const PUBLIC_RECIPES = gql`
  query PublicRecipes {
    publicRecipes {
      id
      title
      description
      ingredients
      steps
      prepTimeMinutes
      servings
      mealType
      dietaryPreferences
      cuisine
      difficulty
      photoContentType
      photoBase64
    }
  }
` as TypedDocumentNode<{ publicRecipes: PublicRecipe[] }>

export function usePublicRecipes() {
  const { data, loading, error } = useQuery(PUBLIC_RECIPES, {
    fetchPolicy: 'network-only',
  })

  const recipes: PublishedDiscoveryRecipe[] = (data?.publicRecipes ?? []).map(
    (recipe) => ({
      [DISCOVERY_RECIPE_SOURCE_KEY]: DISCOVERY_RECIPE_SOURCE.PUBLISHED,
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      servings: recipe.servings,
      imageUrl:
        recipe.photoBase64 && recipe.photoContentType
          ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
          : '',
      meal:
        recipe.mealType === RECIPE_MEAL_TYPE.SNACK
          ? 'snacks'
          : recipe.mealType === RECIPE_MEAL_TYPE.DESSERT
            ? 'desserts'
            : recipe.mealType === RECIPE_MEAL_TYPE.DRINK
              ? 'drinks'
              : recipe.mealType,
      diets: recipe.dietaryPreferences,
      minutes: recipe.prepTimeMinutes,
      cuisine: recipe.cuisine ?? undefined,
      difficulty: recipe.difficulty ?? undefined,
    }),
  )

  return { recipes, loading, error }
}

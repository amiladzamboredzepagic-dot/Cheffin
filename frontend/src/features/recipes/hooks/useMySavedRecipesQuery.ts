import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import type {
  RecipeDifficulty,
  RecipeMealType,
} from '../recipeMetadata'

export interface SavedPublicRecipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMinutes: number
  servings: number
  mealType: RecipeMealType
  dietaryPreferences: string[]
  cuisine: string | null
  difficulty: RecipeDifficulty | null
  imageUrl: string | null
  photoContentType: string | null
  photoBase64: string | null
  collectionId: string | null
}

interface MySavedRecipesQueryData {
  mySavedRecipes: SavedPublicRecipe[]
}

export const MY_SAVED_RECIPES = gql`
  query MySavedRecipes {
    mySavedRecipes {
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
      imageUrl
      photoContentType
      photoBase64
      collectionId
    }
  }
` as TypedDocumentNode<MySavedRecipesQueryData>

export function useMySavedRecipesQuery(skip = false) {
  const { data, loading, error } = useQuery(MY_SAVED_RECIPES, {
    fetchPolicy: 'network-only',
    skip,
  })

  return {
    recipes: data?.mySavedRecipes ?? [],
    loading,
    error,
  }
}

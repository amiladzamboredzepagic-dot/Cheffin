import { gql } from '@apollo/client'

export interface RecipeDraft {
  title: string
  description: string
  sourceUrl: string
  imageUrl: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number | null
  servings: number | null
  calories: number | null
  tags: string[]
}

export interface SavedRecipe extends RecipeDraft {
  id: string
  collection: string
  createdAt: string
}

export interface ExtractYoutubeRecipeData {
  extractYoutubeRecipe: RecipeDraft
}

export interface ExtractYoutubeRecipeVariables {
  url: string
}

export interface AddRecipeInput {
  title: string
  description: string
  sourceUrl: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number | null
  calories: number | null
  tags: string[]
  collection: string
}

export interface AddRecipeData {
  addRecipe: Pick<SavedRecipe, 'id' | 'title'>
}

export interface AddRecipeVariables {
  recipe: AddRecipeInput
}

export interface MyRecipesData {
  myRecipes: SavedRecipe[]
}

export const EXTRACT_YOUTUBE_RECIPE = gql`
  mutation ExtractYoutubeRecipe($url: String!) {
    extractYoutubeRecipe(url: $url) {
      title
      description
      sourceUrl
      imageUrl
      ingredients
      instructions
      prepTimeMinutes
      servings
      calories
      tags
    }
  }
`

export const ADD_RECIPE = gql`
  mutation AddRecipe($recipe: AddRecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`

export const MY_RECIPES = gql`
  query MyRecipes {
    myRecipes {
      id
      title
      description
      sourceUrl
      imageUrl
      ingredients
      instructions
      prepTimeMinutes
      calories
      tags
      collection
      createdAt
    }
  }
`

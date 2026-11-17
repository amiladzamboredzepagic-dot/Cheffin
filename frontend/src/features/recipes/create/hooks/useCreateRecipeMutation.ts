import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import type {
  RecipeDifficulty,
  RecipeMealType,
} from '../../recipeMetadata'

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
` as TypedDocumentNode<CreateRecipeResponse, CreateRecipeVariables>

export interface CreateRecipeInput {
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
  photoBase64: string | null
  photoContentType: string | null
  collectionId: string | null
  publish: boolean
}

interface CreateRecipeResponse {
  createRecipe: {
    id: string
  }
}

interface CreateRecipeVariables {
  input: CreateRecipeInput
}

export function useCreateRecipeMutation() {
  const [mutate, { loading }] = useMutation(CREATE_RECIPE)

  const createRecipe = (input: CreateRecipeInput) =>
    mutate({ variables: { input } })

  return { createRecipe, loading }
}

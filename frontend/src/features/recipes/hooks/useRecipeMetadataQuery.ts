import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

interface RecipeMetadataResponse {
  recipeMetadata: {
    dietaryPreferences: string[]
    cuisines: string[]
    difficulties: string[]
  }
}

const RECIPE_METADATA = gql`
  query RecipeMetadata {
    recipeMetadata {
      dietaryPreferences
      cuisines
      difficulties
    }
  }
` as TypedDocumentNode<RecipeMetadataResponse>

export function useRecipeMetadataQuery() {
  const { data, loading, error } = useQuery(RECIPE_METADATA)

  return {
    dietaryPreferences: data?.recipeMetadata.dietaryPreferences ?? [],
    cuisines: data?.recipeMetadata.cuisines ?? [],
    difficulties: data?.recipeMetadata.difficulties ?? [],
    loading,
    error,
  }
}

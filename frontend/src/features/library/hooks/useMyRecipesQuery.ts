import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

export interface MyRecipe {
  id: string
  title: string
  description: string
  prepTimeMinutes: number
  servings: number
  photoContentType: string | null
  photoBase64: string | null
  isPrivate: boolean
  collectionId: string | null
}

const MY_RECIPES = gql`
  query MyRecipes {
    myRecipes {
      id
      title
      description
      prepTimeMinutes
      servings
      photoContentType
      photoBase64
      isPrivate
      collectionId
    }
  }
` as TypedDocumentNode<{ myRecipes: MyRecipe[] }>

export function useMyRecipesQuery() {
  const { data, loading, error, refetch } = useQuery(MY_RECIPES, {
    fetchPolicy: 'network-only',
  })

  return {
    recipes: data?.myRecipes,
    loading,
    error,
    refetch,
  }
}

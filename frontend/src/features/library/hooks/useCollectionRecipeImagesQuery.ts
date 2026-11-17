import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

export interface CollectionRecipeImage {
  title: string
  collectionId: string | null
  photoContentType: string | null
  photoBase64: string | null
}

const COLLECTION_RECIPE_IMAGES = gql`
  query CollectionRecipeImages {
    myRecipes {
      title
      collectionId
      photoContentType
      photoBase64
    }
  }
` as TypedDocumentNode<{ myRecipes: CollectionRecipeImage[] }>

export function useCollectionRecipeImagesQuery(skip = false) {
  const { data, error } = useQuery(COLLECTION_RECIPE_IMAGES, {
    fetchPolicy: 'network-only',
    skip,
  })

  return {
    recipes: data?.myRecipes ?? [],
    error,
  }
}

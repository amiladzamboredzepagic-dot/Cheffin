import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

export interface RecipeCollection {
  id: string
  name: string
}

export interface MyCollectionsQueryData {
  myCollections: RecipeCollection[]
}

const MY_COLLECTIONS = gql`
  query MyCollections {
    myCollections {
      id
      name
    }
  }
` as TypedDocumentNode<MyCollectionsQueryData>

export { MY_COLLECTIONS }

export function useMyCollectionsQuery(skip = false) {
  const { data, loading, error } = useQuery(MY_COLLECTIONS, {
    skip,
  })

  return {
    collections: data?.myCollections ?? [],
    loading,
    error,
  }
}

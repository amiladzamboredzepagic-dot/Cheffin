import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import {
  MY_COLLECTIONS,
  type MyCollectionsQueryData,
  type RecipeCollection,
} from './useMyCollectionsQuery'

interface CreateCollectionResponse {
  createCollection: RecipeCollection
}

interface CreateCollectionVariables {
  name: string
}

const CREATE_COLLECTION = gql`
  mutation CreateCollection($name: String!) {
    createCollection(name: $name) {
      id
      name
    }
  }
` as TypedDocumentNode<CreateCollectionResponse, CreateCollectionVariables>

export function useCreateCollectionMutation() {
  const [mutate, { loading }] = useMutation(CREATE_COLLECTION, {
    update(cache, { data }) {
      const createdCollection = data?.createCollection
      if (!createdCollection) return

      cache.updateQuery<MyCollectionsQueryData>(
        { query: MY_COLLECTIONS },
        (current) => {
          if (!current) return current
          if (
            current.myCollections.some(
              (collection) => collection.id === createdCollection.id,
            )
          ) {
            return current
          }

          return {
            myCollections: [...current.myCollections, createdCollection].sort(
              (first, second) => first.name.localeCompare(second.name),
            ),
          }
        },
      )
    },
  })

  const createCollection = async (name: string) => {
    const result = await mutate({ variables: { name } })
    if (!result.data) {
      throw new Error('Collection creation returned no result')
    }
    return result.data.createCollection
  }

  return { createCollection, loading }
}

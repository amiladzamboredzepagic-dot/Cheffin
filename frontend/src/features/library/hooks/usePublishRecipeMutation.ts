import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const PUBLISH_RECIPE = gql`
  mutation PublishRecipe($recipeId: String!) {
    publishRecipe(recipeId: $recipeId)
  }
` as TypedDocumentNode<{ publishRecipe: boolean }, { recipeId: string }>

export function usePublishRecipeMutation() {
  const [mutate, { loading }] = useMutation(PUBLISH_RECIPE)

  const publishRecipe = (recipeId: string) =>
    mutate({ variables: { recipeId } })

  return { publishRecipe, loading }
}

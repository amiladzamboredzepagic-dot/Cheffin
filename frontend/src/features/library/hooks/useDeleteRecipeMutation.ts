import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: String!) {
    deleteRecipe(recipeId: $recipeId)
  }
` as TypedDocumentNode<{ deleteRecipe: boolean }, { recipeId: string }>

export function useDeleteRecipeMutation() {
  const [mutate, { loading }] = useMutation(DELETE_RECIPE, {
    refetchQueries: ['MyRecipes', 'MySavedRecipes', 'CollectionRecipeImages'],
    awaitRefetchQueries: true,
  })

  const deleteRecipe = (recipeId: string) =>
    mutate({ variables: { recipeId } })

  return { deleteRecipe, loading }
}

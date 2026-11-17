import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

interface RemoveSavedRecipeVariables {
  recipeId: string
}

const REMOVE_SAVED_RECIPE = gql`
  mutation RemoveSavedRecipe($recipeId: String!) {
    removeSavedRecipe(recipeId: $recipeId)
  }
` as TypedDocumentNode<
  { removeSavedRecipe: boolean },
  RemoveSavedRecipeVariables
>

export function useRemoveSavedRecipeMutation() {
  const [mutate, { loading }] = useMutation(REMOVE_SAVED_RECIPE, {
    refetchQueries: ['MySavedRecipes', 'CollectionRecipeImages'],
    awaitRefetchQueries: true,
  })

  const removeSavedRecipe = async (recipeId: string) => {
    const result = await mutate({ variables: { recipeId } })
    if (!result.data?.removeSavedRecipe) {
      throw new Error('Recipe removal returned no result')
    }
  }

  return { removeSavedRecipe, loading }
}

import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

interface SavePublicRecipeVariables {
  recipeId: string
  collectionId: string | null
}

const SAVE_PUBLIC_RECIPE = gql`
  mutation SavePublicRecipe($recipeId: String!, $collectionId: String) {
    savePublicRecipe(recipeId: $recipeId, collectionId: $collectionId)
  }
` as TypedDocumentNode<
  { savePublicRecipe: boolean },
  SavePublicRecipeVariables
>

export function useSavePublicRecipeMutation() {
  const [mutate, { loading }] = useMutation(SAVE_PUBLIC_RECIPE, {
    refetchQueries: ['MySavedRecipes', 'CollectionRecipeImages'],
    awaitRefetchQueries: true,
  })

  const savePublicRecipe = async (
    recipeId: string,
    collectionId: string | null,
  ) => {
    const result = await mutate({
      variables: { recipeId, collectionId },
    })
    if (!result.data?.savePublicRecipe) {
      throw new Error('Recipe save returned no result')
    }
  }

  return { savePublicRecipe, loading }
}

import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import type { CreateRecipeInput } from './useCreateRecipeMutation'

type UpdateRecipeInput = Omit<CreateRecipeInput, 'publish'>

interface UpdateRecipeVariables {
  recipeId: string
  input: UpdateRecipeInput
}

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipeId: String!, $input: UpdateRecipeInput!) {
    updateRecipe(recipeId: $recipeId, input: $input)
  }
` as TypedDocumentNode<{ updateRecipe: boolean }, UpdateRecipeVariables>

export function useUpdateRecipeMutation() {
  const [mutate, { loading }] = useMutation(UPDATE_RECIPE, {
    refetchQueries: ['MyRecipes', 'CollectionRecipeImages'],
    awaitRefetchQueries: true,
  })

  const updateRecipe = (recipeId: string, input: UpdateRecipeInput) =>
    mutate({ variables: { recipeId, input } })

  return { updateRecipe, loading }
}

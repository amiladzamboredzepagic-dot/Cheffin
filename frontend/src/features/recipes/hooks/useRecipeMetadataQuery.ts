import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'

interface RecipeMetadataResponse {
  recipeMetadata: {
    dietaryPreferences: string[]
    customDietaryPreferences: string[]
    cuisines: string[]
    customCuisines: string[]
    difficulties: string[]
  }
}

export const RECIPE_METADATA = gql`
  query RecipeMetadata {
    recipeMetadata {
      dietaryPreferences
      customDietaryPreferences
      cuisines
      customCuisines
      difficulties
    }
  }
` as TypedDocumentNode<RecipeMetadataResponse>

export function useRecipeMetadataQuery() {
  const { data, loading, error } = useQuery(RECIPE_METADATA)

  return {
    dietaryPreferences: data?.recipeMetadata.dietaryPreferences ?? [],
    customDietaryPreferences:
      data?.recipeMetadata.customDietaryPreferences ?? [],
    cuisines: data?.recipeMetadata.cuisines ?? [],
    customCuisines: data?.recipeMetadata.customCuisines ?? [],
    difficulties: data?.recipeMetadata.difficulties ?? [],
    loading,
    error,
  }
}

interface AddDietaryPreferenceResponse {
  addDietaryPreference: string
}

interface AddDietaryPreferenceVariables {
  preference: string
}

const ADD_DIETARY_PREFERENCE = gql`
  mutation AddDietaryPreference($preference: String!) {
    addDietaryPreference(preference: $preference)
  }
` as TypedDocumentNode<
  AddDietaryPreferenceResponse,
  AddDietaryPreferenceVariables
>

export function useAddDietaryPreferenceMutation() {
  const [mutate, { loading }] = useMutation(ADD_DIETARY_PREFERENCE, {
    update(cache, { data }) {
      const preference = data?.addDietaryPreference
      if (!preference) return

      cache.updateQuery<RecipeMetadataResponse>(
        { query: RECIPE_METADATA },
        (current) => {
          if (!current) return current
          const preferences =
            current.recipeMetadata.customDietaryPreferences
          if (preferences.includes(preference)) return current

          return {
            recipeMetadata: {
              ...current.recipeMetadata,
              customDietaryPreferences: [...preferences, preference].sort(
                (first, second) => first.localeCompare(second),
              ),
            },
          }
        },
      )
    },
  })

  const addDietaryPreference = async (preference: string) => {
    const result = await mutate({ variables: { preference } })
    if (!result.data) {
      throw new Error('Dietary preference creation returned no result')
    }
    return result.data.addDietaryPreference
  }

  return { addDietaryPreference, loading }
}

interface AddCuisineResponse {
  addCuisine: string
}

interface AddCuisineVariables {
  cuisine: string
}

const ADD_CUISINE = gql`
  mutation AddCuisine($cuisine: String!) {
    addCuisine(cuisine: $cuisine)
  }
` as TypedDocumentNode<AddCuisineResponse, AddCuisineVariables>

export function useAddCuisineMutation() {
  const [mutate, { loading }] = useMutation(ADD_CUISINE, {
    update(cache, { data }) {
      const cuisine = data?.addCuisine
      if (!cuisine) return

      cache.updateQuery<RecipeMetadataResponse>(
        { query: RECIPE_METADATA },
        (current) => {
          if (!current) return current
          const cuisines = current.recipeMetadata.customCuisines
          if (cuisines.includes(cuisine)) return current

          return {
            recipeMetadata: {
              ...current.recipeMetadata,
              customCuisines: [...cuisines, cuisine].sort((a, b) =>
                a.localeCompare(b),
              ),
            },
          }
        },
      )
    },
  })

  const addCuisine = async (cuisine: string) => {
    const result = await mutate({ variables: { cuisine } })
    if (!result.data) {
      throw new Error('Cuisine creation returned no result')
    }
    return result.data.addCuisine
  }

  return { addCuisine, loading }
}

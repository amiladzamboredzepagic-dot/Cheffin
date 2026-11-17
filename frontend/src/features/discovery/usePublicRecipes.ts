import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import type { RecipeMealType } from '../recipes/create/components/manual/recipeDraft'
import {
  DISCOVERY_RECIPE_SOURCE,
  DISCOVERY_RECIPE_SOURCE_KEY,
  type PublishedDiscoveryRecipe,
} from './discovery.data'

interface PublicRecipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMinutes: number
  servings: number
  mealType: RecipeMealType
  photoContentType: string | null
  photoBase64: string | null
}

const PUBLIC_RECIPES = gql`
  query PublicRecipes {
    publicRecipes {
      id
      title
      description
      ingredients
      steps
      prepTimeMinutes
      servings
      mealType
      photoContentType
      photoBase64
    }
  }
` as TypedDocumentNode<{ publicRecipes: PublicRecipe[] }>

export function usePublicRecipes() {
  const { data, loading, error } = useQuery(PUBLIC_RECIPES, {
    fetchPolicy: 'network-only',
  })

  const recipes: PublishedDiscoveryRecipe[] = (data?.publicRecipes ?? []).map(
    (recipe) => ({
      [DISCOVERY_RECIPE_SOURCE_KEY]: DISCOVERY_RECIPE_SOURCE.PUBLISHED,
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      servings: recipe.servings,
      imageUrl:
        recipe.photoBase64 && recipe.photoContentType
          ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
          : '',
      meal: recipe.mealType === 'snack' ? 'snacks' : recipe.mealType,
      diets: [],
      minutes: recipe.prepTimeMinutes,
    }),
  )

  return { recipes, loading, error }
}

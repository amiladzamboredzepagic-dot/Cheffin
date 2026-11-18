import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../../routing/ProtectedRoute'
import { RecipeEditPage } from './RecipeEditPage'

export const RECIPE_EDIT_ROUTE = '/recipe/edit/:recipeId'

export function getRecipeEditPath(recipeId: string): string {
  return `/recipe/edit/${encodeURIComponent(recipeId)}`
}

export function getRecipeEditRouteElements() {
  return (
    <Route
      path={RECIPE_EDIT_ROUTE}
      element={
        <ProtectedRoute>
          <RecipeEditPage />
        </ProtectedRoute>
      }
    />
  )
}

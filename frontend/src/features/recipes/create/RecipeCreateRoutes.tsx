import { Navigate, Outlet, Route } from 'react-router-dom'
import { ProtectedRoute } from '../../routing/ProtectedRoute'
import { RECIPE_CREATE_ROUTES } from './components/recipeEntryMode'
import { RecipeCreateModeRoute } from './RecipeCreateModeRoute'

export function getRecipeCreateRouteElements() {
  return (
    <Route
      path={RECIPE_CREATE_ROUTES.BASE}
      element={
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="import" replace />} />
      <Route path=":entryMode" element={<RecipeCreateModeRoute />} />
    </Route>
  )
}

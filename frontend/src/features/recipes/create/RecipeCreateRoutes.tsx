import { Navigate, Outlet, Route } from 'react-router-dom'
import { ProtectedRoute } from '../../routing/ProtectedRoute'
import { RECIPE_CREATE_ROUTES } from './components/recipeEntryMode'
import { RecipeCreateModeRoute } from './RecipeCreateModeRoute'

interface RecipeCreateRouteElementsProps {
  isAuthenticated: boolean
  onAuthenticationRequired: () => void
}

export function getRecipeCreateRouteElements({
  isAuthenticated,
  onAuthenticationRequired,
}: RecipeCreateRouteElementsProps) {
  return (
    <Route
      path={RECIPE_CREATE_ROUTES.BASE}
      element={
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          onAuthenticationRequired={onAuthenticationRequired}
        >
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="import" replace />} />
      <Route path=":entryMode" element={<RecipeCreateModeRoute />} />
    </Route>
  )
}

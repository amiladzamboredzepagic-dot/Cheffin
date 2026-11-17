import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ENTRY_MODE, getRecipeCreatePath, RECIPE_CREATE_ROUTES } from './components/recipeEntryMode'
import { RecipeCreatePage } from './RecipeCreatePage'

export function RecipeCreateModeRoute() {
  const navigate = useNavigate()
  const { entryMode } = useParams()

  if (entryMode !== ENTRY_MODE.IMPORT && entryMode !== ENTRY_MODE.MANUAL) {
    return <Navigate to={RECIPE_CREATE_ROUTES.IMPORT} replace />
  }

  return (
    <RecipeCreatePage
      entryMode={entryMode}
      onEntryModeChange={(mode) => navigate(getRecipeCreatePath(mode))}
    />
  )
}

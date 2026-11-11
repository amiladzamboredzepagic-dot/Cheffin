import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '../landing/LandingPage'
import { RecipeCreatePage } from '../recipes/create/RecipeCreatePage'
import { ProtectedRoute } from './ProtectedRoute'

interface AppRoutesProps {
  isAuthenticated: boolean
  onAuthenticationRequired: () => void
  onCreateAccount: () => void
  onLogin: () => void
}

export function AppRoutes({
  isAuthenticated,
  onAuthenticationRequired,
  onCreateAccount,
  onLogin,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onCreateAccount={onCreateAccount}
            onLogin={onLogin}
          />
        }
      />
      <Route
        path="/recipe/create"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            onAuthenticationRequired={onAuthenticationRequired}
          >
            <RecipeCreatePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

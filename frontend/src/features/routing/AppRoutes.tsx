import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '../landing/LandingPage'
import { LibraryPage } from '../library/LibraryPage'
import { getLibraryRouteElements } from '../library/LibraryRoutes'
import { RecipeCreatePage } from '../recipes/create/RecipeCreatePage'
import { ProtectedRoute } from './ProtectedRoute'
import { DiscoveryPage } from '../discovery/DiscoveryPage'

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
  const libraryPage = (
    <ProtectedRoute
      isAuthenticated={isAuthenticated}
      onAuthenticationRequired={onAuthenticationRequired}
    >
      <LibraryPage />
    </ProtectedRoute>
  )

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage onCreateAccount={onCreateAccount} onLogin={onLogin} />
        }
      />
      <Route path="/explore" element={<DiscoveryPage />} />
      {getLibraryRouteElements(libraryPage)}
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

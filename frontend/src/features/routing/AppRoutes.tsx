import { Navigate, Routes, Route } from 'react-router-dom'
import { LandingPage } from '../landing/LandingPage'
import { LibraryPage } from '../library/LibraryPage'
import { getLibraryRouteElements } from '../library/LibraryRoutes'
import { getRecipeCreateRouteElements } from '../recipes/create/RecipeCreateRoutes'
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
          <LandingPage
            isAuthenticated={isAuthenticated}
            onCreateAccount={onCreateAccount}
            onLogin={onLogin}
          />
        }
      />
      <Route path="/explore" element={<DiscoveryPage />} />
      {getLibraryRouteElements(libraryPage)}
      {getRecipeCreateRouteElements({
        isAuthenticated,
        onAuthenticationRequired,
      })}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

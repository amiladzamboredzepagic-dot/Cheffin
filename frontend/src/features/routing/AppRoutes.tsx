import { Navigate, Routes, Route } from 'react-router-dom'
import { LandingPage } from '../landing/LandingPage'
import { LibraryPage } from '../library/LibraryPage'
import { getLibraryRouteElements } from '../library/LibraryRoutes'
import { getRecipeCreateRouteElements } from '../recipes/create/RecipeCreateRoutes'
import { getRecipeEditRouteElements } from '../recipes/edit/RecipeEditRoutes'
import { ProtectedRoute } from './ProtectedRoute'
import { DiscoveryPage } from '../discovery/DiscoveryPage'
import { ProfilePage } from '../profile/ProfilePage'
import { AdminPage } from '../admin/AdminPage'
import { AdminRoute } from './AdminRoute'

export function AppRoutes() {
  const libraryPage = (
    <ProtectedRoute>
      <LibraryPage />
    </ProtectedRoute>
  )

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<DiscoveryPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      {getLibraryRouteElements(libraryPage)}
      {getRecipeCreateRouteElements()}
      {getRecipeEditRouteElements()}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

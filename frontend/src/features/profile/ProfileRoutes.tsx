import { Navigate, Route } from 'react-router-dom'
import { ProtectedRoute } from '../routing/ProtectedRoute'
import { ProfilePage } from './ProfilePage'
import type { ProfileTab } from './profile.types'

export const PROFILE_ROUTES = {
  BASE: '/profile',
  RECIPES: '/profile/recipes',
  COLLECTIONS: '/profile/collections',
  SETTINGS: '/profile/settings',
} as const

const routeTabs: Record<string, ProfileTab> = {
  [PROFILE_ROUTES.RECIPES]: 'recipes',
  [PROFILE_ROUTES.COLLECTIONS]: 'collections',
  [PROFILE_ROUTES.SETTINGS]: 'settings',
}

const profileTabRoutes: Record<ProfileTab, string> = {
  recipes: PROFILE_ROUTES.RECIPES,
  collections: PROFILE_ROUTES.COLLECTIONS,
  settings: PROFILE_ROUTES.SETTINGS,
}

export function getProfileTabFromPath(pathname: string): ProfileTab {
  return routeTabs[pathname] ?? 'recipes'
}

export function profileTabPath(tab: ProfileTab): string {
  return profileTabRoutes[tab]
}

export function getProfileRouteElements() {
  const protectedProfilePage = (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )

  return (
    <>
      <Route
        path={PROFILE_ROUTES.BASE}
        element={<Navigate to={PROFILE_ROUTES.RECIPES} replace />}
      />
      {Object.values(PROFILE_ROUTES)
        .filter((path) => path !== PROFILE_ROUTES.BASE)
        .map((path) => (
          <Route key={path} path={path} element={protectedProfilePage} />
        ))}
      <Route
        path={`${PROFILE_ROUTES.BASE}/*`}
        element={<Navigate to={PROFILE_ROUTES.RECIPES} replace />}
      />
    </>
  )
}

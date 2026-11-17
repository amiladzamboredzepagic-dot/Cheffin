import type { ReactNode } from 'react'
import { Route } from 'react-router-dom'
import { LIBRARY_TAB, type LibraryTab } from './components/libraryTab'

export const LIBRARY_ROUTES = {
  BASE: '/library',
  SAVED: '/library/saved',
  COLLECTIONS: '/library/collections',
  MY_RECIPES: '/library/myRecipes',
  COLLECTION: '/library/collections/:collectionId',
} as const

export const LIBRARY_TAB_ROUTES: Record<LibraryTab, string> = {
  [LIBRARY_TAB.SAVED]: LIBRARY_ROUTES.SAVED,
  [LIBRARY_TAB.COLLECTIONS]: LIBRARY_ROUTES.COLLECTIONS,
  [LIBRARY_TAB.RECIPES]: LIBRARY_ROUTES.MY_RECIPES,
}

const routeTabs: Record<string, LibraryTab> = {
  [LIBRARY_ROUTES.SAVED]: LIBRARY_TAB.SAVED,
  [LIBRARY_ROUTES.COLLECTIONS]: LIBRARY_TAB.COLLECTIONS,
  [LIBRARY_ROUTES.MY_RECIPES]: LIBRARY_TAB.RECIPES,
}

export function getLibraryTabFromPath(
  pathname: string,
  isCollectionRoute: boolean,
): LibraryTab {
  return isCollectionRoute
    ? LIBRARY_TAB.RECIPES
    : routeTabs[pathname] ?? LIBRARY_TAB.SAVED
}

export function isLibraryTabPath(pathname: string): boolean {
  return Object.prototype.hasOwnProperty.call(routeTabs, pathname)
}

export function isLibraryBasePath(pathname: string): boolean {
  return pathname === LIBRARY_ROUTES.BASE || pathname === `${LIBRARY_ROUTES.BASE}/`
}

export function libraryCollectionPath(collectionId: string): string {
  return `${LIBRARY_ROUTES.COLLECTIONS}/${collectionId}`
}

export function getLibraryRouteElements(libraryPage: ReactNode) {
  return (
    <>
      <Route path={LIBRARY_ROUTES.BASE} element={libraryPage} />
      <Route path={`${LIBRARY_ROUTES.BASE}/*`} element={libraryPage} />
    </>
  )
}

import type { ReactNode } from 'react'
import { Route } from 'react-router-dom'
import { LIBRARY_TAB, type LibraryTab } from './components/libraryTab'
import {
  RECIPE_STATUS_FILTER,
  type RecipeStatusFilter,
} from './components/recipeStatusFilter'

export const LIBRARY_ROUTES = {
  BASE: '/library',
  SAVED: '/library/saved',
  COLLECTIONS: '/library/collections',
  MY_RECIPES: '/library/my-recipes',
  MY_RECIPES_DRAFTS: '/library/my-recipes/drafts',
  MY_RECIPES_PUBLISHED: '/library/my-recipes/published',
  COLLECTION: '/library/collections/:collectionId',
  COLLECTION_DRAFTS: '/library/collections/:collectionId/drafts',
  COLLECTION_PUBLISHED: '/library/collections/:collectionId/published',
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
  [LIBRARY_ROUTES.MY_RECIPES_DRAFTS]: LIBRARY_TAB.RECIPES,
  [LIBRARY_ROUTES.MY_RECIPES_PUBLISHED]: LIBRARY_TAB.RECIPES,
}

const recipeStatusRoutes: Partial<Record<RecipeStatusFilter, string>> = {
  [RECIPE_STATUS_FILTER.DRAFTS]: LIBRARY_ROUTES.MY_RECIPES_DRAFTS,
  [RECIPE_STATUS_FILTER.PUBLISHED]: LIBRARY_ROUTES.MY_RECIPES_PUBLISHED,
}

const routeRecipeStatuses: Record<string, RecipeStatusFilter> = {
  [LIBRARY_ROUTES.MY_RECIPES_DRAFTS]: RECIPE_STATUS_FILTER.DRAFTS,
  [LIBRARY_ROUTES.MY_RECIPES_PUBLISHED]: RECIPE_STATUS_FILTER.PUBLISHED,
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

export function getLibraryRecipeStatusFromPath(
  pathname: string,
): RecipeStatusFilter {
  const collectionStatus = pathname.match(
    /^\/library\/collections\/[^/]+\/(drafts|published)$/,
  )?.[1]

  if (collectionStatus === RECIPE_STATUS_FILTER.DRAFTS) {
    return RECIPE_STATUS_FILTER.DRAFTS
  }
  if (collectionStatus === RECIPE_STATUS_FILTER.PUBLISHED) {
    return RECIPE_STATUS_FILTER.PUBLISHED
  }
  return routeRecipeStatuses[pathname] ?? RECIPE_STATUS_FILTER.ALL
}

export function libraryRecipeStatusPath(
  status: RecipeStatusFilter,
  collectionId?: string,
): string {
  if (collectionId) {
    const collectionPath = libraryCollectionPath(collectionId)
    if (status === RECIPE_STATUS_FILTER.DRAFTS) {
      return `${collectionPath}/drafts`
    }
    if (status === RECIPE_STATUS_FILTER.PUBLISHED) {
      return `${collectionPath}/published`
    }
    return collectionPath
  }

  return recipeStatusRoutes[status] ?? LIBRARY_ROUTES.MY_RECIPES
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

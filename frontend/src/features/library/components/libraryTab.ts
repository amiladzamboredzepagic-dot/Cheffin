export const LIBRARY_TAB = {
  SAVED: 'saved',
  COLLECTIONS: 'collections',
  RECIPES: 'recipes',
} as const

export type LibraryTab = (typeof LIBRARY_TAB)[keyof typeof LIBRARY_TAB]

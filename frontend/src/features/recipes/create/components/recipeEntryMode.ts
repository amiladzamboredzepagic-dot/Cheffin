export const ENTRY_MODE = {
  IMPORT: 'import',
  MANUAL: 'manual',
} as const

export type EntryMode = (typeof ENTRY_MODE)[keyof typeof ENTRY_MODE]

export const RECIPE_CREATE_ROUTES = {
  BASE: '/recipe/create',
  IMPORT: '/recipe/create/import',
  MANUAL: '/recipe/create/manual',
} as const

export function getRecipeCreatePath(mode: EntryMode): string {
  return mode === ENTRY_MODE.MANUAL
    ? RECIPE_CREATE_ROUTES.MANUAL
    : RECIPE_CREATE_ROUTES.IMPORT
}

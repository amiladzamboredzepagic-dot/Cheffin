export const RECIPE_STATUS_FILTER = {
  ALL: 'all',
  DRAFTS: 'drafts',
  PUBLISHED: 'published',
} as const

export type RecipeStatusFilter =
  (typeof RECIPE_STATUS_FILTER)[keyof typeof RECIPE_STATUS_FILTER]

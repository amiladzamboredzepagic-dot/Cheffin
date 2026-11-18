export interface AdminUserStats {
  id: string
  firstName: string
  lastName: string
  email: string
  recipeCount: number
  publishedRecipeCount: number
  draftRecipeCount: number
  collectionCount: number
}

export interface AdminDashboardStats {
  totalUsers: number
  totalRecipes: number
  publishedRecipes: number
  draftRecipes: number
  totalCollections: number
  totalSavedRecipes: number
  users: AdminUserStats[]
}

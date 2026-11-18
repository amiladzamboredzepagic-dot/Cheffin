import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import type { AdminDashboardStats } from '../admin.types'

const ADMIN_DASHBOARD_STATS = gql`
  query AdminDashboardStats {
    adminDashboardStats {
      totalUsers
      totalRecipes
      publishedRecipes
      draftRecipes
      totalCollections
      totalSavedRecipes
      users {
        id
        firstName
        lastName
        email
        recipeCount
        publishedRecipeCount
        draftRecipeCount
        collectionCount
      }
    }
  }
` as TypedDocumentNode<{ adminDashboardStats: AdminDashboardStats }>

export function useAdminDashboardStats() {
  const { data, loading, error } = useQuery(ADMIN_DASHBOARD_STATS, {
    fetchPolicy: 'network-only',
  })

  return {
    stats: data?.adminDashboardStats,
    loading,
    error,
  }
}

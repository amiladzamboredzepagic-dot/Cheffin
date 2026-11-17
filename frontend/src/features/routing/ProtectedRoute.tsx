import { useEffect, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, requireAuthentication } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      requireAuthentication()
    }
  }, [isAuthenticated, requireAuthentication])

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

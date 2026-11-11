import { useEffect, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  isAuthenticated: boolean
  onAuthenticationRequired: () => void
}

export function ProtectedRoute({
  children,
  isAuthenticated,
  onAuthenticationRequired,
}: ProtectedRouteProps) {
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      onAuthenticationRequired()
    }
  }, [isAuthenticated, onAuthenticationRequired])

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

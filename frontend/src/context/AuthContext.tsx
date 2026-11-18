import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { apolloClient, setAccessTokenGetter } from '../apolloClient'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import { USER_ROLES } from '../constants/roles'
import { Loading } from '../components/ui/feedback/Loading'
import { useTranslation } from 'react-i18next'
import {
  AuthContext,
  AuthRequestError,
  type AuthMode,
  type AuthResponse,
} from './auth-context'

function isAuthResponse(data: unknown): data is AuthResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof data.access_token === 'string' &&
    (!('first_name' in data) || typeof data.first_name === 'string') &&
    (!('last_name' in data) || typeof data.last_name === 'string') &&
    'role' in data &&
    typeof data.role === 'string'
  )
}

async function readAuthResponse(response: Response): Promise<AuthResponse> {
  const data: unknown = await response.json()
  if (!isAuthResponse(data)) {
    throw new Error('Invalid authentication response')
  }
  return data
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  useEffect(() => {
    setAccessTokenGetter(() => accessToken)
  }, [accessToken])

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.auth.refresh, {
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          const data = await readAuthResponse(response)
          await apolloClient.clearStore()
          setAccessToken(data.access_token)
          setFirstName(data.first_name || null)
          setLastName(data.last_name || null)
          setRole(data.role)
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error)
      } finally {
        setLoading(false)
      }
    }

    refreshAccessToken()
  }, [])

  const authenticate = async (
    endpoint: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<AuthResponse> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        ...(firstName !== undefined && lastName !== undefined
          ? { first_name: firstName, last_name: lastName }
          : {}),
      }),
    })

    if (!response.ok) {
      throw new AuthRequestError(response.status)
    }

    const data = await readAuthResponse(response)
    setAccessToken(data.access_token)
    setFirstName(data.first_name || null)
    setLastName(data.last_name || null)
    setRole(data.role)
    return data
  }

  const login = async (email: string, password: string) => {
    setLoginLoading(true)
    try {
      return await authenticate(API_ENDPOINTS.auth.login, email, password)
    } finally {
      setLoginLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    setRegisterLoading(true)
    try {
      return await authenticate(
        API_ENDPOINTS.auth.register,
        email,
        password,
        firstName,
        lastName,
      )
    } finally {
      setRegisterLoading(false)
    }
  }

  const updateProfileNames = async (firstName: string, lastName: string) => {
    if (!accessToken) {
      throw new Error('Cannot update profile names without authentication')
    }

    const response = await fetch(API_ENDPOINTS.auth.profile, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    })

    if (!response.ok) {
      throw new AuthRequestError(response.status)
    }

    const data = await readAuthResponse(response)
    setAccessToken(data.access_token)
    setFirstName(data.first_name || null)
    setLastName(data.last_name || null)
    setRole(data.role)
  }

  const logout = async () => {
    const response = await fetch(API_ENDPOINTS.auth.logout, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new AuthRequestError(response.status)
    }

    await apolloClient.clearStore()
    setAccessToken(null)
    setFirstName(null)
    setLastName(null)
    setRole(null)
  }

  const openLogin = () => {
    setAuthMode('login')
    setAuthModalOpen(true)
  }

  const openSignup = () => {
    setAuthMode('signup')
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => setAuthModalOpen(false)

  const requireAuthentication = useCallback(() => {
    setAuthMode('login')
    setAuthModalOpen(true)
    navigate('/', { replace: true })
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: Boolean(accessToken),
        firstName,
        lastName,
        role,
        isAdmin: role === USER_ROLES.ADMIN,
        login,
        register,
        updateProfileNames,
        loginLoading,
        registerLoading,
        logout,
        loading,
        authModalOpen,
        authMode,
        setAuthMode,
        openLogin,
        openSignup,
        closeAuthModal,
        requireAuthentication,
      }}
    >
      {loading ? (
        <Loading label={t('common.loading')} sx={{ minHeight: '100vh' }} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

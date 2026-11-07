import { useState, useEffect, type ReactNode } from 'react'
import { setAccessTokenGetter } from '../apolloClient'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import {
  AuthContext,
  AuthRequestError,
  type AuthResponse,
} from './auth-context'

function isAuthResponse(data: unknown): data is AuthResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof data.access_token === 'string'
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
  const [accessToken, setAccessToken] = useState<string | null>(null)
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
          setAccessToken(data.access_token)
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
  ): Promise<AuthResponse> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new AuthRequestError(response.status)
    }

    const data = await readAuthResponse(response)
    setAccessToken(data.access_token)
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

  const register = async (email: string, password: string) => {
    setRegisterLoading(true)
    try {
      return await authenticate(API_ENDPOINTS.auth.register, email, password)
    } finally {
      setRegisterLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.auth.logout, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setAccessToken(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        register,
        loginLoading,
        registerLoading,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

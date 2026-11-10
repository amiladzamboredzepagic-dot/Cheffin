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
    typeof data.access_token === 'string' &&
    (!('first_name' in data) || typeof data.first_name === 'string') &&
    (!('last_name' in data) || typeof data.last_name === 'string')
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
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
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
          setFirstName(data.first_name || null)
          setLastName(data.last_name || null)
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

  const logout = async () => {
    const response = await fetch(API_ENDPOINTS.auth.logout, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new AuthRequestError(response.status)
    }

    setAccessToken(null)
    setFirstName(null)
    setLastName(null)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        firstName,
        lastName,
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

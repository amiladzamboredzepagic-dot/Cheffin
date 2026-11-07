import {
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { setAccessTokenGetter } from '../apolloClient'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import { AuthContext, type AuthResponse } from './auth-context'

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

  const login = async (email: string, password: string) => {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await readAuthResponse(response)
    setAccessToken(data.access_token)
    return data
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
    <AuthContext.Provider value={{ accessToken, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

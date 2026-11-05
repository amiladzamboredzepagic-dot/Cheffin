import { createContext } from 'react'

export interface AuthResponse {
  access_token: string
}

export interface AuthContextValue {
  accessToken: string | null
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

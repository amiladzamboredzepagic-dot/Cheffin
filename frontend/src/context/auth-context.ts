import { createContext } from 'react'

export interface AuthResponse {
  access_token: string
}

export interface AuthContextValue {
  accessToken: string | null
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (email: string, password: string) => Promise<AuthResponse>
  loginLoading: boolean
  registerLoading: boolean
  logout: () => Promise<void>
  loading: boolean
}

export class AuthRequestError extends Error {
  readonly status: number

  constructor(status: number) {
    super(`Authentication request failed with status ${status}`)
    this.status = status
  }
}

export const AuthContext = createContext<AuthContextValue | null>(null)

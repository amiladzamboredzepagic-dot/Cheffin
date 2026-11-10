import { createContext } from 'react'

export interface AuthResponse {
  access_token: string
  first_name?: string
  last_name?: string
}

export interface AuthContextValue {
  accessToken: string | null
  firstName: string | null
  lastName: string | null
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<AuthResponse>
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

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8000'
).replace(/\/+$/, '')

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  graphql: `${API_BASE_URL}/graphql`,
} as const

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { SetContextLink } from '@apollo/client/link/context'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
})

type TokenGetter = () => string | null

let getAccessToken: TokenGetter = () => null

export const setAccessTokenGetter = (getter: TokenGetter): void => {
  getAccessToken = getter
}

const authLink = new SetContextLink((prevContext) => {
  const token = getAccessToken()
  const existingHeaders =
    (prevContext as { headers?: Record<string, string> }).headers || {}

  return {
    headers: {
      ...existingHeaders,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

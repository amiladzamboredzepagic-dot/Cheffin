import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { SetContextLink } from '@apollo/client/link/context'
import { API_ENDPOINTS } from './constants/apiEndpoints'

const httpLink = new HttpLink({
  uri: API_ENDPOINTS.graphql,
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

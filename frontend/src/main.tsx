import React from 'react'
import ReactDOM from 'react-dom/client'
import { apolloClient } from './apolloClient'
import App from './App'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { ColorModeProvider } from './theme/ColorModeProvider'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthProvider>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)

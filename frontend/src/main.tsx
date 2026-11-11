import React from 'react'
import ReactDOM from 'react-dom/client'
import { apolloClient } from './apolloClient'
import App from './App'
import { ApolloProvider } from '@apollo/client/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
)

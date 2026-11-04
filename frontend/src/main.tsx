import React from 'react'
import ReactDOM from 'react-dom/client'
import { client } from './apolloClient'
import App from './App'
import { ApolloProvider } from '@apollo/client/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
)

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material/styles'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ColorModeContext } from './color-mode-context'
import { createAppTheme } from './index'

const COLOR_MODE_STORAGE_KEY = 'cheffin-color-mode'

function getInitialMode(): PaletteMode {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) === 'dark'
    ? 'dark'
    : 'light'
}

interface ColorModeProviderProps {
  children: ReactNode
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  useEffect(() => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
  }, [mode])

  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

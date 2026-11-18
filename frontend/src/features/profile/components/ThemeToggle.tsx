import { IconButton, Tooltip } from '@mui/material'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useColorMode } from '../../../theme/useColorMode'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { mode, toggleColorMode } = useColorMode()
  const isDark = mode === 'dark'
  const label = t(
    isDark ? 'common.switchToLightMode' : 'common.switchToDarkMode',
  )

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={toggleColorMode}
        sx={{
          width: 40,
          height: 40,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.input',
          color: 'text.label',
          '&:hover': { backgroundColor: 'background.secondary' },
        }}
      >
        {isDark ? (
          <Sun size={18} aria-hidden="true" />
        ) : (
          <Moon size={18} aria-hidden="true" />
        )}
      </IconButton>
    </Tooltip>
  )
}

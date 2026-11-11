import { Tooltip } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppMenu, AppMenuItem } from '../../../components/ui/menus/AppMenu'
import { LanguageFlag, type LanguageCode } from './LanguageFlag'
import { LanguageToggleButton } from './LanguageToggle.styles'

const LANGUAGES: Array<{
  code: LanguageCode
  name: string
}> = [
  { code: 'en', name: 'English' },
  { code: 'bs', name: 'Bosanski' },
  { code: 'de', name: 'Deutsch' },
]

export function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? i18n.language).split('-')[0]

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)

  const selectedLanguage =
    LANGUAGES.find((option) => option.code === language) ?? LANGUAGES[0]

  return (
    <>
      <Tooltip title={t('common.language')}>
        <LanguageToggleButton
          aria-label={`${t('common.language')}: ${selectedLanguage.name}`}
          aria-controls={menuAnchor ? 'language-menu' : undefined}
          aria-haspopup="menu"
          aria-expanded={Boolean(menuAnchor)}
          onClick={(event) => setMenuAnchor(event.currentTarget)}
        >
          <LanguageFlag language={selectedLanguage.code} />
        </LanguageToggleButton>
      </Tooltip>
      <AppMenu
        id="language-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        ariaLabel={t('common.language')}
        minWidth={48}
      >
        {LANGUAGES.map((option) => (
          <AppMenuItem
            key={option.code}
            role="menuitemradio"
            aria-label={option.name}
            aria-checked={language === option.code}
            selected={language === option.code}
            onClick={() => {
              void i18n.changeLanguage(option.code)
              setMenuAnchor(null)
            }}
          >
            <LanguageFlag language={option.code} />
          </AppMenuItem>
        ))}
      </AppMenu>
    </>
  )
}

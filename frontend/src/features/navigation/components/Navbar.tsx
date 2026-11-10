import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/ActionButton'
import { Flex } from '../../../components/ui/Flex'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import Header from '../../layout/components/Header'
import { LanguageToggle } from './LanguageToggle'

interface NavbarProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function Navbar({ onLogin, onCreateAccount }: NavbarProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Header>
      <Flex gap={1.5}>
        <CheffinLogo />
      </Flex>
      <Flex gap={1}>
        <LanguageToggle />
        <ActionButton
          text={t('auth.login')}
          backgroundColor="transparent"
          textColor={theme.palette.primary.main}
          border="none"
          hoverShadow={false}
          onClick={onLogin}
          sx={{ minWidth: 186, height: 48, px: 1.25 }}
        />
        <ActionButton
          text={t('auth.createAccount')}
          onClick={onCreateAccount}
          sx={{ minWidth: 186, height: 48, px: 1.25 }}
        />
      </Flex>
    </Header>
  )
}

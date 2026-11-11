import { IconButton } from '@mui/material'
import type { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { UserAvatar } from '../../../components/ui/UserAvatar'

interface NavbarAccountButtonProps {
  initials: string
  expanded: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function NavbarAccountButton({
  initials,
  expanded,
  onClick,
}: NavbarAccountButtonProps) {
  const { t } = useTranslation()

  return (
    <IconButton
      aria-label={t('auth.account')}
      aria-haspopup="menu"
      aria-expanded={expanded}
      onClick={onClick}
      sx={{
        width: { xs: 40, sm: 38 },
        height: { xs: 40, sm: 38 },
        p: 0,
        flexShrink: 0,
      }}
    >
      <UserAvatar initials={initials} />
    </IconButton>
  )
}

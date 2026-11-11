import { ArrowRight } from 'lucide-react'
import type { SxProps, Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../components/ui/actions/ActionButton'

interface CreateAccountButtonProps {
  onClick: () => void
  sx?: SxProps<Theme>
}

export function CreateAccountButton({ onClick, sx }: CreateAccountButtonProps) {
  const { t } = useTranslation()

  return (
    <ActionButton
      text={t('auth.createAccount')}
      onClick={onClick}
      endIcon={<ArrowRight size={17} aria-hidden="true" />}
      sx={sx}
    />
  )
}

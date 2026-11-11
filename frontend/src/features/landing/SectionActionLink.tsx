import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { InteractiveLink } from '../../components/ui/links/InteractiveLink'

interface SectionActionLinkProps {
  text: string
  href: string
  marginTop?: number | 'auto'
}

export function SectionActionLink({
  text,
  href,
  marginTop = 3,
}: SectionActionLinkProps) {
  const { t } = useTranslation()

  return (
    <InteractiveLink
      text={t(text)}
      href={href}
      icon={<ArrowForwardIcon fontSize="inherit" aria-hidden="true" />}
      sx={(theme) => ({
        gap: theme.spacing(0.75),
        marginTop:
          marginTop === 'auto' ? marginTop : theme.spacing(marginTop),
        color: theme.palette.primary.light,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.65,
        textDecoration: 'none',
        '&:hover': {
          color: theme.palette.primary.main,
          opacity: 1,
        },
      })}
    />
  )
}

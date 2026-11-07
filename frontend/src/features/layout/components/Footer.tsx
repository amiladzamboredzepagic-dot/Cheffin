import { Flex } from '../../../components/ui/Flex'
import { FooterContainer, BrandMotto, FooterLink } from './Footer.styles'
import { useTranslation } from 'react-i18next'

const FOOTER_LINKS = [
  { labelKey: 'common.privacyPolicy', href: '/privacy' },
  { labelKey: 'common.termsOfService', href: '/terms' },
  { labelKey: 'common.contactUs', href: '/contact' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <FooterContainer component="footer" justify="space-between">
      <BrandMotto>{t('common.motto')}</BrandMotto>

      <Flex gap={2.5}>
        {FOOTER_LINKS.map((link) => (
          <FooterLink key={link.labelKey} href={link.href}>
            {t(link.labelKey)}
          </FooterLink>
        ))}
      </Flex>
    </FooterContainer>
  )
}

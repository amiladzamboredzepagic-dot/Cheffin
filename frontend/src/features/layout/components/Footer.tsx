import { FooterContainer, BrandMotto } from './Footer.styles'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <FooterContainer
      component="footer"
      direction={{ xs: 'column', sm: 'row' }}
      justify="space-between"
    >
      <BrandMotto>{t('common.motto')}</BrandMotto>
    </FooterContainer>
  )
}

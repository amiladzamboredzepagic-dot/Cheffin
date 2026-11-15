import { useTranslation } from 'react-i18next'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { Introduction } from '../DiscoveryPage.styles'

export function DiscoveryIntroduction() {
  const { t } = useTranslation()

  return (
    <Introduction>
      <SectionIntroduction
        eyebrow={t('discovery.eyebrow')}
        title={t('discovery.title')}
        titleId="discovery-heading"
        titleLevel="h1"
        description={t('discovery.description')}
      />
    </Introduction>
  )
}

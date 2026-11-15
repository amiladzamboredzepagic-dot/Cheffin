import { useTranslation } from 'react-i18next'
import { SectionIntroductionTitle } from '../../../components/ui/layout/SectionIntroduction.styles'
import { Description } from '../../../components/ui/typography/Description'
import { PantryCard } from '../DiscoveryPage.styles'

export function DiscoveryPantryCard() {
  const { t } = useTranslation()

  return (
    <PantryCard>
      <SectionIntroductionTitle as="h3" introVariant="compact">
        {t('discovery.lessWaste')}
      </SectionIntroductionTitle>
      <Description>{t('discovery.pantryDescription')}</Description>
      <Description>{t('discovery.pantryUnavailable')}</Description>
    </PantryCard>
  )
}

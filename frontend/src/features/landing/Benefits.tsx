import { useTranslation } from 'react-i18next'
import {
  BenefitsSection,
  BenefitItem,
  BenefitNumber,
  BenefitTitle,
} from './Benefits.styles'

const BENEFITS = [
  { number: '01', titleKey: 'benefits.findFavorite' },
  { number: '02', titleKey: 'benefits.keepTogether' },
  { number: '03', titleKey: 'benefits.planWeek' },
]

export function Benefits() {
  const { t } = useTranslation()

  return (
    <BenefitsSection
      component="section"
      aria-label={t('benefits.sectionLabel')}
      direction="row"
      align="center"
      justify="space-between"
    >
      {BENEFITS.map(({ number, titleKey }) => (
        <BenefitItem key={number} direction="row" align="center" gap={1}>
          <BenefitNumber>{number}</BenefitNumber>
          <BenefitTitle>{t(titleKey)}</BenefitTitle>
        </BenefitItem>
      ))}
    </BenefitsSection>
  )
}

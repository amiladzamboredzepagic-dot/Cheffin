import { useTranslation } from 'react-i18next'
import { SectionIntroductionTitle } from '../../../components/ui/layout/SectionIntroduction.styles'
import { CustomSelectMenu } from '../../../components/ui/menus/CustomSelectMenu'
import { Description } from '../../../components/ui/typography/Description'
import { ResultsHeader } from '../DiscoveryPage.styles'

export type DiscoverySort = 'recommended' | 'quickest' | 'rating'

interface DiscoveryResultsHeaderProps {
  count: number
  sort: DiscoverySort
  onSortChange: (sort: DiscoverySort) => void
}

export function DiscoveryResultsHeader({
  count,
  sort,
  onSortChange,
}: DiscoveryResultsHeaderProps) {
  const { t } = useTranslation()

  return (
    <ResultsHeader>
      <div>
        <SectionIntroductionTitle introVariant="compact" id="discovery-results">
          {t('discovery.meals.all')}
        </SectionIntroductionTitle>
        <Description aria-live="polite">
          {t('discovery.resultCount', { count })}
        </Description>
      </div>

      <CustomSelectMenu
        label={t('discovery.sort')}
        hideLabel
        compact
        searchable={false}
        value={sort}
        options={[
          { id: 'recommended', label: t('discovery.sortRecommended') },
          { id: 'quickest', label: t('discovery.sortQuickest') },
          { id: 'rating', label: t('discovery.sortRating') },
        ]}
        onChange={(value) => {
          if (
            value === 'recommended' ||
            value === 'quickest' ||
            value === 'rating'
          ) {
            onSortChange(value)
          } else {
            console.error('Invalid discovery sort option:', value)
          }
        }}
      />
    </ResultsHeader>
  )
}

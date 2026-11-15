import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionIntroductionTitle } from '../../../components/ui/layout/SectionIntroduction.styles'
import { FilterHeader, FilterPanel, ResetButton } from '../DiscoveryPage.styles'
import {
  cuisines,
  diets,
  difficulties,
  emptyFilters,
  times,
  type DiscoveryFilters,
} from '../discovery.data'

const filterGroups = [
  { key: 'diets', values: diets },
  { key: 'times', values: times },
  { key: 'difficulties', values: difficulties },
  { key: 'cuisines', values: cuisines },
] as const

interface DiscoveryFilterPanelProps {
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

function DiscoveryFilterGroup({
  group,
  filters,
  onFiltersChange,
}: DiscoveryFilterPanelProps & { group: (typeof filterGroups)[number] }) {
  const { t } = useTranslation()

  return (
    <fieldset>
      <legend>{t(`discovery.filterGroups.${group.key}`)}</legend>
      {group.values.map((value) => (
        <label key={value}>
          <input
            type="checkbox"
            checked={filters[group.key].some((item) => item === value)}
            onChange={(event) => {
              const checked = event.target.checked
              onFiltersChange((current) => ({
                ...current,
                [group.key]: checked
                  ? [...current[group.key], value]
                  : current[group.key].filter((item) => item !== value),
              }))
            }}
          />
          {t(`discovery.${group.key}.${value}`)}
        </label>
      ))}
    </fieldset>
  )
}

export function DiscoveryFilterPanel({
  filters,
  onFiltersChange,
}: DiscoveryFilterPanelProps) {
  const { t } = useTranslation()

  return (
    <>
      <FilterHeader>
        <SectionIntroductionTitle introVariant="compact" id="discovery-filters">
          {t('discovery.refine')}
        </SectionIntroductionTitle>
        <ResetButton
          type="button"
          onClick={() => onFiltersChange(emptyFilters())}
        >
          {t('discovery.reset')}
        </ResetButton>
      </FilterHeader>
      <FilterPanel>
        {filterGroups.map((group) => (
          <DiscoveryFilterGroup
            key={group.key}
            group={group}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        ))}
      </FilterPanel>
    </>
  )
}

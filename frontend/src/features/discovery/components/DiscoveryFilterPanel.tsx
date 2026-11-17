import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionIntroductionTitle } from '../../../components/ui/layout/SectionIntroduction.styles'
import { FilterHeader, FilterPanel, ResetButton } from '../DiscoveryPage.styles'
import {
  emptyFilters,
  times,
  type DiscoveryFilters,
} from '../discovery.data'

type FilterGroup = {
  key: keyof DiscoveryFilters
  values: readonly string[]
}

interface DiscoveryFilterPanelProps {
  dietaryPreferences: string[]
  customDietaryPreferences: string[]
  cuisines: string[]
  customCuisines: string[]
  difficulties: string[]
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

interface DiscoveryFilterGroupProps {
  group: FilterGroup
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

function DiscoveryFilterGroup({
  group,
  filters,
  onFiltersChange,
}: DiscoveryFilterGroupProps) {
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
          {t(`discovery.${group.key}.${value}`, { defaultValue: value })}
        </label>
      ))}
    </fieldset>
  )
}

export function DiscoveryFilterPanel({
  dietaryPreferences,
  customDietaryPreferences,
  cuisines,
  customCuisines,
  difficulties,
  filters,
  onFiltersChange,
}: DiscoveryFilterPanelProps) {
  const { t } = useTranslation()
  const filterGroups: FilterGroup[] = [
    {
      key: 'diets',
      values: [...dietaryPreferences, ...customDietaryPreferences],
    },
    { key: 'times', values: times },
    { key: 'difficulties', values: difficulties },
    { key: 'cuisines', values: [...cuisines, ...customCuisines] },
  ]

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

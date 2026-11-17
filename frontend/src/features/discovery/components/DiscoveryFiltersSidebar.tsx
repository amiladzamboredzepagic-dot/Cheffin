import type { Dispatch, SetStateAction } from 'react'
import type { DiscoveryFilters } from '../discovery.data'
import { DiscoveryFilterPanel } from './DiscoveryFilterPanel'

interface DiscoveryFiltersSidebarProps {
  dietaryPreferences: string[]
  customDietaryPreferences: string[]
  cuisines: string[]
  customCuisines: string[]
  difficulties: string[]
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

export function DiscoveryFiltersSidebar({
  dietaryPreferences,
  customDietaryPreferences,
  cuisines,
  customCuisines,
  difficulties,
  filters,
  onFiltersChange,
}: DiscoveryFiltersSidebarProps) {
  return (
    <aside aria-labelledby="discovery-filters">
      <DiscoveryFilterPanel
        dietaryPreferences={dietaryPreferences}
        customDietaryPreferences={customDietaryPreferences}
        cuisines={cuisines}
        customCuisines={customCuisines}
        difficulties={difficulties}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </aside>
  )
}

import type { Dispatch, SetStateAction } from 'react'
import type { DiscoveryFilters } from '../discovery.data'
import { DiscoveryFilterPanel } from './DiscoveryFilterPanel'
import { DiscoveryPantryCard } from './DiscoveryPantryCard'

interface DiscoveryFiltersSidebarProps {
  dietaryPreferences: string[]
  cuisines: string[]
  difficulties: string[]
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

export function DiscoveryFiltersSidebar({
  dietaryPreferences,
  cuisines,
  difficulties,
  filters,
  onFiltersChange,
}: DiscoveryFiltersSidebarProps) {
  return (
    <aside aria-labelledby="discovery-filters">
      <DiscoveryFilterPanel
        dietaryPreferences={dietaryPreferences}
        cuisines={cuisines}
        difficulties={difficulties}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <DiscoveryPantryCard />
    </aside>
  )
}

import type { Dispatch, SetStateAction } from 'react'
import type { DiscoveryFilters } from '../discovery.data'
import { DiscoveryFilterPanel } from './DiscoveryFilterPanel'
import { DiscoveryPantryCard } from './DiscoveryPantryCard'

interface DiscoveryFiltersSidebarProps {
  filters: DiscoveryFilters
  onFiltersChange: Dispatch<SetStateAction<DiscoveryFilters>>
}

export function DiscoveryFiltersSidebar({
  filters,
  onFiltersChange,
}: DiscoveryFiltersSidebarProps) {
  return (
    <aside aria-labelledby="discovery-filters">
      <DiscoveryFilterPanel
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <DiscoveryPantryCard />
    </aside>
  )
}

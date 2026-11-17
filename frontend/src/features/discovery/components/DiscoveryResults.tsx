import { useState } from 'react'
import type { DiscoveryRecipe } from '../discovery.data'
import { DiscoveryRecipeGrid } from './DiscoveryRecipeGrid'
import {
  DiscoveryResultsHeader,
  type DiscoverySort,
} from './DiscoveryResultsHeader'

interface DiscoveryResultsProps {
  recipes: DiscoveryRecipe[]
}

export function DiscoveryResults({ recipes }: DiscoveryResultsProps) {
  const [sort, setSort] = useState<DiscoverySort>('recommended')
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sort === 'quickest') return a.minutes - b.minutes
    if (sort === 'rating') return (b.rating ?? -1) - (a.rating ?? -1)
    return 0
  })

  return (
    <section aria-labelledby="discovery-results">
      <DiscoveryResultsHeader
        count={recipes.length}
        sort={sort}
        onSortChange={setSort}
      />
      <DiscoveryRecipeGrid recipes={sortedRecipes} />
    </section>
  )
}

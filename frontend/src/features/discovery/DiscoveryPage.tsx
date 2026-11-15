import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { Workspace } from '../../components/ui/layout/Workspace'
import { matchesSearch } from '../../utils/search'
import { DiscoveryFiltersSidebar } from './components/DiscoveryFiltersSidebar'
import { DiscoveryIntroduction } from './components/DiscoveryIntroduction'
import { DiscoveryResults } from './components/DiscoveryResults'
import { DiscoverySearch } from './components/DiscoverySearch'
import {
  discoveryRecipes,
  emptyFilters,
  matchesFilters,
  type DiscoveryFilters,
  type DiscoveryMeal,
} from './discovery.data'

export function DiscoveryPage() {
  const { t, i18n } = useTranslation()

  const [query, setQuery] = useState<string>('')
  const [meal, setMeal] = useState<DiscoveryMeal>('all')
  const [filters, setFilters] = useState<DiscoveryFilters>(emptyFilters)

  const recipes = discoveryRecipes.filter((recipe) => {
    const searchable = [
      t(`discovery.recipes.${recipe.id}.title`),
      t(`discovery.recipes.${recipe.id}.description`),
      t(`discovery.recipes.${recipe.id}.ingredients`),
      recipe.cuisine ? t(`discovery.cuisines.${recipe.cuisine}`) : '',
    ].join(' ')
    return (
      (meal === 'all' || recipe.meal === meal) &&
      matchesFilters(recipe, filters) &&
      matchesSearch(searchable, query, i18n.resolvedLanguage)
    )
  })

  return (
    <PageContainer
      aria-labelledby="discovery-heading"
      sx={{ color: 'text.label', backgroundColor: 'background.default' }}
    >
      <DiscoveryIntroduction />
      <DiscoverySearch
        query={query}
        onQueryChange={setQuery}
        meal={meal}
        onMealChange={setMeal}
      />
      <Workspace>
        <DiscoveryFiltersSidebar
          filters={filters}
          onFiltersChange={setFilters}
        />
        <DiscoveryResults recipes={recipes} />
      </Workspace>
    </PageContainer>
  )
}

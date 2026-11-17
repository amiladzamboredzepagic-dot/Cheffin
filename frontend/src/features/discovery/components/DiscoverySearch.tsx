import { useTranslation } from 'react-i18next'
import { SearchField } from '../../../components/ui/forms/SearchField'
import { Description } from '../../../components/ui/typography/Description'
import { Categories, Category } from '../DiscoveryPage.styles'
import { meals, type DiscoveryMeal } from '../discovery.data'

interface DiscoverySearchProps {
  query: string
  onQueryChange: (query: string) => void
  meal: DiscoveryMeal
  onMealChange: (meal: DiscoveryMeal) => void
}

export function DiscoverySearch({
  query,
  onQueryChange,
  meal,
  onMealChange,
}: DiscoverySearchProps) {
  const { t } = useTranslation()

  return (
    <>
      <SearchField
        value={query}
        onChange={onQueryChange}
        placeholder={t('discovery.search')}
        showPantryButton={false}
      />
      <Categories role="group" aria-label={t('discovery.categories')}>
        {(['all', ...meals] as const).map((value) => (
          <Category
            key={value}
            type="button"
            aria-pressed={meal === value}
            onClick={() => onMealChange(value)}
          >
            {t(`discovery.meals.${value}`)}
          </Category>
        ))}
      </Categories>
      <Description>{t('discovery.demoNotice')}</Description>
    </>
  )
}

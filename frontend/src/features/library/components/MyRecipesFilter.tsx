import { useTranslation } from 'react-i18next'
import { SegmentedToggle } from '../../../components/ui/forms/SegmentedToggle'
import {
  RECIPE_STATUS_FILTER,
  type RecipeStatusFilter,
} from './recipeStatusFilter'

interface MyRecipesFilterProps {
  value: RecipeStatusFilter
  onChange: (value: RecipeStatusFilter) => void
}

export function MyRecipesFilter({ value, onChange }: MyRecipesFilterProps) {
  const { t } = useTranslation()

  return (
    <SegmentedToggle
      ariaLabel={t('library.recipeStatusFilter')}
      value={value}
      onChange={onChange}
      options={[
        { value: RECIPE_STATUS_FILTER.ALL, label: t('library.allRecipes') },
        { value: RECIPE_STATUS_FILTER.DRAFTS, label: t('library.drafts') },
        {
          value: RECIPE_STATUS_FILTER.PUBLISHED,
          label: t('library.published'),
        },
      ]}
    />
  )
}

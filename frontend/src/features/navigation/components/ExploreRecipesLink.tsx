import { ArrowRight } from 'lucide-react'
import { InteractiveLink } from '../../../components/ui/links/InteractiveLink'
import { useTranslation } from 'react-i18next'

export function ExploreRecipeLink() {
  const { t } = useTranslation()

  return (
    /* Mockup Link */
    <InteractiveLink
      text={t('navigation.exploreRecipes')}
      href="/explore"
      icon={<ArrowRight size="1em" aria-hidden="true" />}
    />
  )
}

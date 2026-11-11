import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../components/ui/actions/ActionButton'
import { Flex } from '../../components/ui/layout/Flex'
import {
  CaptionLabel,
  Description,
  ExploreButton,
  Eyebrow,
  FeaturedImage,
  Heading,
  HeroActions,
  HeroCopy,
  HeroLayout,
  HeroSection,
  Note,
  RecipeCaption,
  RecipeTime,
  RecipeTitle,
} from './Hero.styles'

interface HeroProps {
  onCreateAccount: () => void
}

export function Hero({ onCreateAccount }: HeroProps) {
  const { t } = useTranslation()

  return (
    <HeroSection aria-labelledby="welcome-heading">
      <HeroLayout>
        <HeroCopy direction="column" align="stretch">
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          <Heading id="welcome-heading">
            {t('hero.headingFirst')}
            <br />
            {t('hero.headingSecond')}
          </Heading>
          <Description>{t('hero.description')}</Description>
          <HeroActions direction="row" wrap="wrap">
            <ActionButton
              text={t('auth.createAccount')}
              onClick={onCreateAccount}
              endIcon={<ArrowRight size={17} aria-hidden="true" />}
              sx={{
                width: { xs: 'auto', sm: 238 },
                height: { xs: 46, sm: 48 },
                px: { xs: 2, sm: 1.25 },
                fontSize: { xs: 12, sm: 14 },
              }}
            />
            <ExploreButton href="#recipes" variant="outlined">
              {t('navigation.exploreRecipes')}
            </ExploreButton>
          </HeroActions>
          <Note>{t('hero.note')}</Note>
        </HeroCopy>

        <FeaturedImage role="img" aria-label={t('hero.imageAlt')}>
          <RecipeCaption direction="row" align="center" justify="space-between">
            <Flex direction="column" align="flex-start" gap={0}>
              <CaptionLabel>{t('hero.recipeLabel')}</CaptionLabel>
              <RecipeTitle>{t('hero.recipeTitle')}</RecipeTitle>
            </Flex>
            <RecipeTime>{t('hero.recipeTime', { minutes: 25 })}</RecipeTime>
          </RecipeCaption>
        </FeaturedImage>
      </HeroLayout>
    </HeroSection>
  )
}

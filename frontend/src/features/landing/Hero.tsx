import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CreateAccountButton } from './CreateAccountButton'
import {
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
} from './Hero.styles'

interface HeroProps {
  onCreateAccount?: () => void
}

export function Hero({ onCreateAccount }: HeroProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const featuredImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const featuredImage = featuredImageRef.current
    if (
      !featuredImage ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let animationFrame: number | null = null
    const updateParallax = () => {
      animationFrame = null
      const { top, height } = featuredImage.getBoundingClientRect()
      const progress =
        (window.innerHeight - top) / (window.innerHeight + height)
      const offset = (progress - 0.5) * 36

      featuredImage.style.setProperty('--hero-parallax-y', `${offset}px`)
    }
    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateParallax)
      }
    }

    updateParallax()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

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
            {onCreateAccount && (
              <CreateAccountButton
                onClick={onCreateAccount}
                sx={{
                  width: { xs: 'auto', sm: 238 },
                  height: { xs: 46, sm: 48 },
                  px: { xs: 2, sm: 1.25 },
                  fontSize: { xs: 12, sm: 14 },
                }}
              />
            )}
            <ExploreButton
              onClick={() => navigate('/explore')}
              variant="outlined"
            >
              {t('navigation.exploreRecipes')}
            </ExploreButton>
          </HeroActions>
          <Note>{t('hero.note')}</Note>
        </HeroCopy>

        <FeaturedImage
          ref={featuredImageRef}
          role="img"
          aria-label={t('hero.imageAlt')}
        />
      </HeroLayout>
    </HeroSection>
  )
}

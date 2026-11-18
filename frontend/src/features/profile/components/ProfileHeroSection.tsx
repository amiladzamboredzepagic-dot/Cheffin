import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { useTranslation } from 'react-i18next'
import { ProfileHero } from '../ProfilePage.styles'

export function ProfileHeroSection() {
  const { t } = useTranslation()

  return (
    <ProfileHero
      direction="column"
      align="flex-start"
      justify="center"
      gap={1}
      aria-labelledby="profile-page-title"
    >
      <SectionIntroduction
        eyebrow={t('profile.eyebrow')}
        title={t('profile.bannerTitle')}
        titleId="profile-page-title"
        titleLevel="h1"
      />
    </ProfileHero>
  )
}

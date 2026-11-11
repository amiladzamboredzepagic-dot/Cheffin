import { useTranslation } from 'react-i18next'
import { SectionActionLink } from './SectionActionLink'
import {
  CommunityCopy,
  CommunityDescription,
  CommunityEyebrow,
  CommunityHeading,
  CommunityName,
  CommunityPanel,
  CommunityPortrait,
  CommunityProfile,
  CommunityProfileDetail,
  CommunitySection,
} from './CommunityInvitation.styles'

export function CommunityInvitation() {
  const { t } = useTranslation()

  return (
    <CommunitySection aria-labelledby="community-heading">
      <CommunityPanel>
        <CommunityCopy direction="column" gap={0}>
          <CommunityEyebrow>
            {t('communityInvitation.eyebrow')}
          </CommunityEyebrow>
          <CommunityHeading id="community-heading">
            {t('communityInvitation.heading')}
          </CommunityHeading>
          <CommunityDescription>
            {t('communityInvitation.description')}
          </CommunityDescription>
          <SectionActionLink
            text="communityInvitation.action"
            href="/community"
            marginTop="auto"
          />
        </CommunityCopy>

        <CommunityProfile direction="column" align="center" gap={0}>
          <CommunityPortrait
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&h=320&q=85"
            alt={t('communityInvitation.portraitAlt')}
          />
          <CommunityName>{t('communityInvitation.profileName')}</CommunityName>
          <CommunityProfileDetail>
            {t('communityInvitation.profileDetail')}
          </CommunityProfileDetail>
        </CommunityProfile>
      </CommunityPanel>
    </CommunitySection>
  )
}

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import {
  CommunityCopy,
  CommunityDescription,
  CommunityEyebrow,
  CommunityHeading,
  CommunityLink,
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
          <CommunityLink href="/community">
            {t('communityInvitation.action')}
            <ArrowForwardIcon fontSize="inherit" aria-hidden="true" />
          </CommunityLink>
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

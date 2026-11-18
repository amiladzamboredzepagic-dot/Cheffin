import { Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { UserAvatar } from '../../../components/ui/UserAvatar'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { Description } from '../../../components/ui/typography/Description'
import { ProfileEditButton, ProfileIdentity, ProfileImagePreview, ProfileName, ProfileRole, ProfileStat, ProfileStatLabel, ProfileStatValue, ProfileStats } from '../ProfilePage.styles'
import type { SavedProfile } from '../profile.types'

interface ProfileIdentityCardProps {
  displayName: string
  firstName: string | null
  lastName: string | null
  profile: SavedProfile
  recipeCount: number
  collectionCount: number
  isOwnProfile: boolean
  isFollowing: boolean
  onEdit: () => void
  onToggleFollow: () => void
}

export function ProfileIdentityCard({
  displayName,
  firstName,
  lastName,
  profile,
  recipeCount,
  collectionCount,
  isOwnProfile,
  isFollowing,
  onEdit,
  onToggleFollow,
}: ProfileIdentityCardProps) {
  const { t } = useTranslation()

  return (
    <ProfileIdentity
      direction="column"
      align="flex-start"
      gap={1.5}
      aria-label={t('profile.accountProfile')}
    >
      <ProfileEditButton
        aria-label={t('profile.editProfile')}
        onClick={onEdit}
      >
        <Pencil size={17} aria-hidden="true" />
      </ProfileEditButton>
      {profile.image ? (
        <ProfileImagePreview
          src={profile.image}
          alt={displayName}
          sx={{ width: 88, height: 88, borderRadius: '50%' }}
        />
      ) : (
        <UserAvatar firstName={firstName} lastName={lastName} size={88} />
      )}
      <div>
        <ProfileName>{displayName}</ProfileName>
        <ProfileRole>{t('profile.homeCook')}</ProfileRole>
        {profile.description && (
          <Description sx={{ mt: 1 }}>{profile.description}</Description>
        )}
        {!isOwnProfile && (
          <ActionButton
            type="button"
            text={isFollowing ? t('profile.following') : t('profile.follow')}
            onClick={onToggleFollow}
            sx={{ mt: 1.5 }}
          />
        )}
      </div>
      <ProfileStats>
        <ProfileStat>
          <ProfileStatValue>{recipeCount}</ProfileStatValue>
          <ProfileStatLabel>{t('profile.recipes')}</ProfileStatLabel>
        </ProfileStat>
        <ProfileStat>
          <ProfileStatValue>{collectionCount}</ProfileStatValue>
          <ProfileStatLabel>{t('profile.collections')}</ProfileStatLabel>
        </ProfileStat>
      </ProfileStats>
    </ProfileIdentity>
  )
}

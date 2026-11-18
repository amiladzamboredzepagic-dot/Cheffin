import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { useAuth } from '../../context/useAuth'
import { useCollectionRecipeImagesQuery } from '../library/hooks/useCollectionRecipeImagesQuery'
import { useMyRecipesQuery } from '../library/hooks/useMyRecipesQuery'
import { libraryCollectionPath } from '../library/LibraryRoutes'
import { useMyCollectionsQuery } from '../recipes/create/hooks/useMyCollectionsQuery'
import { ProfileContent } from './components/ProfileContent'
import { ProfileEditDialog } from './components/ProfileEditDialog'
import { ProfileHeroSection } from './components/ProfileHeroSection'
import { ProfileIdentityCard } from './components/ProfileIdentityCard'
import { ProfileLayout } from './ProfilePage.styles'
import { getProfileTabFromPath, profileTabPath } from './ProfileRoutes'
import type { ProfileEditValues, SavedProfile } from './profile.types'

const PROFILE_STORAGE_KEY = 'cheffin.profile'

interface ProfilePageProps {
  isOwnProfile?: boolean
}

function readSavedProfile(): SavedProfile {
  try {
    const saved = JSON.parse(
      localStorage.getItem(PROFILE_STORAGE_KEY) ?? 'null',
    ) as Partial<SavedProfile> | null
    return {
      description:
        typeof saved?.description === 'string' ? saved.description : '',
      image: typeof saved?.image === 'string' ? saved.image : null,
    }
  } catch {
    return { description: '', image: null }
  }
}

export function ProfilePage({ isOwnProfile = true }: ProfilePageProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { firstName, lastName, updateProfileNames } = useAuth()
  const [savedProfile, setSavedProfile] =
    useState<SavedProfile>(readSavedProfile)
  const [editOpen, setEditOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const activeTab = getProfileTabFromPath(pathname)
  const {
    recipes: allRecipes,
    loading: recipesLoading,
    error: recipesError,
  } = useMyRecipesQuery()
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useMyCollectionsQuery()
  const { recipes: collectionRecipes, error: collectionRecipesError } =
    useCollectionRecipeImagesQuery(
      activeTab !== 'collections' ||
        collectionsLoading ||
        collections.length === 0,
    )

  const displayName =
    [firstName, lastName].filter(Boolean).join(' ') || t('profile.defaultName')
  const publishedRecipes = (allRecipes ?? []).filter(
    (recipe) => !recipe.isPrivate,
  )

  const handleProfileSave = async ({
    firstName: nextFirstName,
    lastName: nextLastName,
    ...profile
  }: ProfileEditValues) => {
    await updateProfileNames(nextFirstName, nextLastName)
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    setSavedProfile(profile)
    setEditOpen(false)
  }

  return (
    <PageContainer aria-labelledby="profile-page-title">
      <ProfileHeroSection />
      <ProfileLayout>
        <ProfileIdentityCard
          displayName={displayName}
          firstName={firstName}
          lastName={lastName}
          profile={savedProfile}
          recipeCount={publishedRecipes.length}
          collectionCount={collections.length}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onEdit={() => setEditOpen(true)}
          onToggleFollow={() => setIsFollowing((following) => !following)}
        />
        <ProfileContent
          activeTab={activeTab}
          isOwnProfile={isOwnProfile}
          onTabChange={(tab) => navigate(profileTabPath(tab))}
          publishedRecipes={publishedRecipes}
          recipesLoading={recipesLoading}
          recipesError={recipesError}
          collections={collections}
          collectionsLoading={collectionsLoading}
          collectionsError={collectionsError}
          collectionRecipes={collectionRecipes}
          collectionRecipesError={collectionRecipesError}
          onCollectionSelect={(collection) =>
            navigate(libraryCollectionPath(collection.id))
          }
        />
      </ProfileLayout>
      {editOpen && (
        <ProfileEditDialog
          open
          profile={savedProfile}
          firstName={firstName}
          lastName={lastName}
          onClose={() => setEditOpen(false)}
          onSave={handleProfileSave}
        />
      )}
    </PageContainer>
  )
}

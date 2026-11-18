import { useTranslation } from 'react-i18next'
import { Tabs } from '../../../components/ui/tabs/Tabs'
import { ProfileTabPanel } from '../ProfilePage.styles'
import type { ProfileTab } from '../profile.types'
import { ProfileCollectionsPanel } from './ProfileCollectionsPanel'
import { ProfileRecipesPanel } from './ProfileRecipesPanel'
import type { MyRecipe } from '../../library/hooks/useMyRecipesQuery'
import type { CollectionRecipeImage } from '../../library/hooks/useCollectionRecipeImagesQuery'
import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'

interface ProfileContentProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
  publishedRecipes: MyRecipe[]
  recipesLoading: boolean
  recipesError?: Error
  collections: RecipeCollection[]
  collectionsLoading: boolean
  collectionsError?: Error
  collectionRecipes: CollectionRecipeImage[]
  collectionRecipesError?: Error
  onCollectionSelect: (collection: RecipeCollection) => void
}

export function ProfileContent({
  activeTab,
  onTabChange,
  publishedRecipes,
  recipesLoading,
  recipesError,
  collections,
  collectionsLoading,
  collectionsError,
  collectionRecipes,
  collectionRecipesError,
  onCollectionSelect,
}: ProfileContentProps) {
  const { t } = useTranslation()
  const tabs = [
    {
      value: 'recipes' as const,
      label: `${t('profile.recipes')} ${publishedRecipes.length}`,
    },
    {
      value: 'collections' as const,
      label: `${t('profile.collections')} ${collections.length}`,
    },
  ]

  return (
    <ProfileTabPanel>
      <Tabs
        value={activeTab}
        options={tabs}
        onChange={onTabChange}
        ariaLabel={t('profile.contentTabs')}
        idPrefix="profile-tab"
        panelId="profile-content"
      />
      <section
        id="profile-content"
        role="tabpanel"
        aria-labelledby={`profile-tab-${activeTab}`}
      >
        {activeTab === 'recipes' ? (
          <ProfileRecipesPanel
            recipes={publishedRecipes}
            loading={recipesLoading}
            error={recipesError}
          />
        ) : (
          <ProfileCollectionsPanel
            collections={collections}
            loading={collectionsLoading}
            error={collectionsError}
            recipes={collectionRecipes}
            recipesError={collectionRecipesError}
            onCollectionSelect={onCollectionSelect}
          />
        )}
      </section>
    </ProfileTabPanel>
  )
}

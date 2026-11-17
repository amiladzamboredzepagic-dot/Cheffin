import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { useTranslation } from 'react-i18next'
import { SearchField } from '../../../components/ui/forms/SearchField'
import { Content } from '../LibraryPage.styles'
import { LibraryCollectionsSection } from './LibraryCollectionsSection'
import { LibraryRecipesSection } from './LibraryRecipesSection'
import { LIBRARY_TAB, type LibraryTab } from './libraryTab'

interface LibraryContentProps {
  tab: LibraryTab
  search: string
  collections: RecipeCollection[]
  loading: boolean
  hasError: boolean
  onSearchChange: (search: string) => void
  selectedCollection: RecipeCollection | null
  onCollectionSelect: (collection: RecipeCollection) => void
  onCollectionClear: () => void
}

export function LibraryContent({
  tab,
  search,
  collections,
  loading,
  hasError,
  onSearchChange,
  selectedCollection,
  onCollectionSelect,
  onCollectionClear,
}: LibraryContentProps) {
  const { t } = useTranslation()

  return (
    <Content
      role="tabpanel"
      id="library-panel"
      aria-labelledby={`library-tab-${tab}`}
    >
      {tab !== LIBRARY_TAB.RECIPES && (
        <>
          <SearchField
            value={search}
            onChange={onSearchChange}
            placeholder={t('library.searchCollections')}
          />
          <LibraryCollectionsSection
            collections={collections}
            search={search}
            loading={loading}
            hasError={hasError}
            onCollectionSelect={onCollectionSelect}
          />
        </>
      )}
      {tab !== LIBRARY_TAB.COLLECTIONS && (
        <LibraryRecipesSection
          tab={tab}
          selectedCollection={selectedCollection}
          onCollectionClear={onCollectionClear}
        />
      )}
    </Content>
  )
}

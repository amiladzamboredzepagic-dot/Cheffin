import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { Content } from '../LibraryPage.styles'
import { LibraryCollectionsSection } from './LibraryCollectionsSection'
import { LibraryRecipesSection } from './LibraryRecipesSection'
import { LibrarySearch } from './LibrarySearch'
import { LIBRARY_TAB, type LibraryTab } from './libraryTab'

interface LibraryContentProps {
  tab: LibraryTab
  search: string
  collections: RecipeCollection[]
  loading: boolean
  hasError: boolean
  onSearchChange: (search: string) => void
}

export function LibraryContent({
  tab,
  search,
  collections,
  loading,
  hasError,
  onSearchChange,
}: LibraryContentProps) {
  return (
    <Content
      role="tabpanel"
      id="library-panel"
      aria-labelledby={`library-tab-${tab}`}
    >
      {tab !== LIBRARY_TAB.RECIPES && (
        <>
          <LibrarySearch search={search} onSearchChange={onSearchChange} />
          <LibraryCollectionsSection
            collections={collections}
            search={search}
            loading={loading}
            hasError={hasError}
          />
        </>
      )}
      {tab !== LIBRARY_TAB.COLLECTIONS && <LibraryRecipesSection tab={tab} />}
    </Content>
  )
}

import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { CreateCollectionDialog } from '../recipes/create/components/CreateCollectionDialog'
import { MY_COLLECTIONS } from '../recipes/create/hooks/useMyCollectionsQuery'
import { LibraryContent } from './components/LibraryContent'
import { LibraryIntroduction } from './components/LibraryIntroduction'
import { LibrarySidebar } from './components/LibrarySidebar'
import { LibraryTabs } from './components/LibraryTabs'
import { LIBRARY_TAB, type LibraryTab } from './components/libraryTab'
import { Workspace } from './LibraryPage.styles'

export function LibraryPage() {
  const { data, loading, error } = useQuery(MY_COLLECTIONS, {
    fetchPolicy: 'network-only',
  })
  const collections = data?.myCollections ?? []

  const [tab, setTab] = useState<LibraryTab>(LIBRARY_TAB.SAVED)
  const [search, setSearch] = useState<string>('')
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  return (
    <PageContainer aria-labelledby="library-title">
      <LibraryIntroduction onCreateCollection={() => setDialogOpen(true)} />
      <LibraryTabs
        tab={tab}
        collectionCount={!loading && !error ? collections.length : null}
        onTabChange={setTab}
      />
      <Workspace>
        <LibrarySidebar />
        <LibraryContent
          tab={tab}
          search={search}
          collections={collections}
          loading={loading}
          hasError={Boolean(error)}
          onSearchChange={setSearch}
        />
      </Workspace>
      <CreateCollectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={() => {
          setSearch('')
          setTab(LIBRARY_TAB.COLLECTIONS)
        }}
      />
    </PageContainer>
  )
}

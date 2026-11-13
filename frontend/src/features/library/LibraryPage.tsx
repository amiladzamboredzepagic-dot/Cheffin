import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { Workspace } from '../../components/ui/layout/Workspace'
import { CreateCollectionDialog } from '../recipes/create/components/CreateCollectionDialog'
import { MY_COLLECTIONS } from '../recipes/create/hooks/useMyCollectionsQuery'
import { LibraryContent } from './components/LibraryContent'
import { LibraryIntroduction } from './components/LibraryIntroduction'
import { LibrarySidebar } from './components/LibrarySidebar'
import { LibraryTabs } from './components/LibraryTabs'
import { LIBRARY_TAB, type LibraryTab } from './components/libraryTab'

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
      <Workspace
        sx={{
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: '236px minmax(0, 1fr)',
          },
          gap: { xs: '24px', md: '36px' },
          marginTop: '32px',
          alignItems: 'stretch',
        }}
      >
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

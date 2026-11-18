import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { Navigate, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { Workspace } from '../../components/ui/layout/Workspace'
import { CreateCollectionDialog } from '../recipes/create/components/CreateCollectionDialog'
import { MY_COLLECTIONS } from '../recipes/create/hooks/useMyCollectionsQuery'
import {
  getLibraryTabFromPath,
  isLibraryBasePath,
  isLibraryTabPath,
  LIBRARY_ROUTES,
  LIBRARY_TAB_ROUTES,
  libraryCollectionPath,
} from './LibraryRoutes'
import { LibraryContent } from './components/LibraryContent'
import { LibraryIntroduction } from './components/LibraryIntroduction'
import { LibrarySidebar } from './components/LibrarySidebar'
import { LibraryTabs } from './components/LibraryTabs'
import { LIBRARY_TAB, type LibraryTab } from './components/libraryTab'

export function LibraryPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const baseCollectionMatch = useMatch(LIBRARY_ROUTES.COLLECTION)
  const draftsCollectionMatch = useMatch(LIBRARY_ROUTES.COLLECTION_DRAFTS)
  const publishedCollectionMatch = useMatch(
    LIBRARY_ROUTES.COLLECTION_PUBLISHED,
  )
  const collectionMatch =
    baseCollectionMatch ?? draftsCollectionMatch ?? publishedCollectionMatch
  const collectionId = collectionMatch?.params.collectionId
  const { data, loading, error, refetch } = useQuery(MY_COLLECTIONS, {
    fetchPolicy: 'network-only',
  })
  const collections = data?.myCollections ?? []

  const [search, setSearch] = useState<string>('')
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const selectedCollection =
    collections.find((collection) => collection.id === collectionId) ?? null
  const isCollectionRoute = collectionMatch !== null
  const activeTab = getLibraryTabFromPath(pathname, isCollectionRoute)
  const isTabRoute = isLibraryTabPath(pathname)
  const isBaseRoute = isLibraryBasePath(pathname)

  const handleTabChange = (nextTab: LibraryTab) => {
    if (
      nextTab === LIBRARY_TAB.COLLECTIONS &&
      activeTab !== LIBRARY_TAB.COLLECTIONS &&
      !loading
    ) {
      void refetch().catch((error: unknown) => {
        console.error('Failed to load collections:', error)
      })
    }

    navigate(LIBRARY_TAB_ROUTES[nextTab])
  }

  if (isBaseRoute) return <Navigate to={LIBRARY_ROUTES.SAVED} replace />
  if (!isTabRoute && !isCollectionRoute) {
    return <Navigate to={LIBRARY_ROUTES.SAVED} replace />
  }
  if (!loading && !error && collectionId && !selectedCollection) {
    return <Navigate to={LIBRARY_ROUTES.COLLECTIONS} replace />
  }

  return (
    <PageContainer aria-labelledby="library-title">
      <LibraryIntroduction onCreateCollection={() => setDialogOpen(true)} />
      <LibraryTabs
        tab={activeTab}
        collectionCount={!loading && !error ? collections.length : null}
        onTabChange={handleTabChange}
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
          tab={activeTab}
          search={search}
          collections={collections}
          loading={loading}
          hasError={Boolean(error)}
          onSearchChange={setSearch}
          selectedCollection={selectedCollection}
          onCollectionSelect={(collection) => {
            navigate(libraryCollectionPath(collection.id))
          }}
          onCollectionClear={() => {
            navigate(LIBRARY_ROUTES.COLLECTIONS)
          }}
        />
      </Workspace>
      <CreateCollectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={() => {
          setSearch('')
          navigate(LIBRARY_ROUTES.COLLECTIONS)
        }}
      />
    </PageContainer>
  )
}

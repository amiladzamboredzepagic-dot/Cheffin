import { Alert, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { SectionTitle } from '../LibraryPage.styles'
import { LibraryCollectionGrid } from './LibraryCollectionGrid'

interface LibraryCollectionsSectionProps {
  collections: RecipeCollection[]
  search: string
  loading: boolean
  hasError: boolean
}

export function LibraryCollectionsSection({
  collections,
  search,
  loading,
  hasError,
}: LibraryCollectionsSectionProps) {
  const { t } = useTranslation()
  const matchingCollections = collections.filter((collection) =>
    collection.name
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase()),
  )

  return (
    <section aria-labelledby="library-collections-heading">
      <SectionTitle id="library-collections-heading">
        {t('library.yourCollections')}
      </SectionTitle>
      {loading ? (
        <Description>{t('library.loadingCollections')}</Description>
      ) : hasError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('library.collectionsError')}
        </Alert>
      ) : matchingCollections.length ? (
        <LibraryCollectionGrid collections={matchingCollections} />
      ) : (
        <Box sx={{ mt: 2 }}>
          <Description>
            {t(search.trim() ? 'library.noMatches' : 'library.noCollections')}
          </Description>
        </Box>
      )}
    </section>
  )
}

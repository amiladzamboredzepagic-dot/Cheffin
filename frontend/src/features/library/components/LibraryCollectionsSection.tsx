import { Alert, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import { Loading } from '../../../components/ui/feedback/Loading'
import { matchesSearch } from '../../../utils/search'
import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { useCollectionRecipeImagesQuery } from '../hooks/useCollectionRecipeImagesQuery'
import { SectionTitle } from '../LibraryPage.styles'
import { LibraryCollectionGrid } from './LibraryCollectionGrid'

interface LibraryCollectionsSectionProps {
  collections: RecipeCollection[]
  search: string
  loading: boolean
  hasError: boolean
  onCollectionSelect: (collection: RecipeCollection) => void
}

export function LibraryCollectionsSection({
  collections,
  search,
  loading,
  hasError,
  onCollectionSelect,
}: LibraryCollectionsSectionProps) {
  const { t } = useTranslation()
  const { recipes, error: recipeImagesError } = useCollectionRecipeImagesQuery(
    loading || collections.length === 0,
  )
  const matchingCollections = collections.filter((collection) =>
    matchesSearch(collection.name, search),
  )

  return (
    <section aria-labelledby="library-collections-heading">
      <SectionTitle id="library-collections-heading">
        {t('library.yourCollections')}
      </SectionTitle>
      {loading ? (
        <Loading label={t('library.loadingCollections')} sx={{ mt: 2 }} />
      ) : hasError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('library.collectionsError')}
        </Alert>
      ) : matchingCollections.length ? (
        <>
          {recipeImagesError && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {t('library.collectionImagesError')}
            </Alert>
          )}
          <LibraryCollectionGrid
            collections={matchingCollections}
            recipes={recipes}
            onCollectionSelect={onCollectionSelect}
          />
        </>
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

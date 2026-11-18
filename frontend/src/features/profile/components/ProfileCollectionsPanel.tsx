import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { Description } from '../../../components/ui/typography/Description'
import { LibraryCollectionGrid } from '../../library/components/LibraryCollectionGrid'
import type { CollectionRecipeImage } from '../../library/hooks/useCollectionRecipeImagesQuery'
import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'

interface ProfileCollectionsPanelProps {
  collections: RecipeCollection[]
  loading: boolean
  error?: Error
  recipes: CollectionRecipeImage[]
  recipesError?: Error
  onCollectionSelect: (collection: RecipeCollection) => void
}

export function ProfileCollectionsPanel({
  collections,
  loading,
  error,
  recipes,
  recipesError,
  onCollectionSelect,
}: ProfileCollectionsPanelProps) {
  const { t } = useTranslation()

  return (
    <>
      <SectionIntroduction
        eyebrow={t('profile.eyebrow')}
        title={t('profile.collections')}
        variant="compact"
      />
      {loading ? (
        <Description>{t('library.loadingCollections')}</Description>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('library.collectionsError')}
        </Alert>
      ) : collections.length === 0 ? (
        <Description>{t('profile.noCollections')}</Description>
      ) : recipesError ? (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {t('library.collectionImagesError')}
        </Alert>
      ) : (
        <LibraryCollectionGrid
          collections={collections}
          recipes={recipes}
          onCollectionSelect={onCollectionSelect}
        />
      )}
    </>
  )
}

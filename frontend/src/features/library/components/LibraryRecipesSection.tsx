import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { SectionTitle } from '../LibraryPage.styles'
import { LibraryCollectionHeader } from './LibraryCollectionHeader'
import { LIBRARY_TAB, type LibraryTab } from './libraryTab'
import { MyRecipes } from './MyRecipes'
import { SavedRecipes } from './SavedRecipes'

interface LibraryRecipesSectionProps {
  tab: LibraryTab
  selectedCollection: RecipeCollection | null
  onCollectionClear: () => void
}

export function LibraryRecipesSection({
  tab,
  selectedCollection,
  onCollectionClear,
}: LibraryRecipesSectionProps) {
  const { t } = useTranslation()

  return (
    <section>
      {selectedCollection ? (
        <LibraryCollectionHeader
          name={selectedCollection.name}
          onBack={onCollectionClear}
        />
      ) : (
        <SectionTitle>
          {t(
            tab === LIBRARY_TAB.SAVED
              ? 'library.savedRecipes'
              : 'library.myRecipes',
          )}
        </SectionTitle>
      )}
      <Box sx={{ mt: 2 }}>
        {selectedCollection || tab === LIBRARY_TAB.RECIPES ? (
          <MyRecipes collectionId={selectedCollection?.id ?? null} />
        ) : (
          <SavedRecipes />
        )}
      </Box>
    </section>
  )
}

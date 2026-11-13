import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import { SectionTitle } from '../LibraryPage.styles'
import { LIBRARY_TAB, type LibraryTab } from './libraryTab'
import { MyRecipes } from './MyRecipes'

interface LibraryRecipesSectionProps {
  tab: Exclude<LibraryTab, typeof LIBRARY_TAB.COLLECTIONS>
}

export function LibraryRecipesSection({ tab }: LibraryRecipesSectionProps) {
  const { t } = useTranslation()

  return (
    <section>
      <SectionTitle>
        {t(
          tab === LIBRARY_TAB.SAVED
            ? 'library.savedRecipes'
            : 'library.myRecipes',
        )}
      </SectionTitle>
      <Box sx={{ mt: 2 }}>
        {tab === LIBRARY_TAB.RECIPES ? (
          <MyRecipes />
        ) : (
          <Description>{t('library.recipesUnavailable')}</Description>
        )}
      </Box>
    </section>
  )
}

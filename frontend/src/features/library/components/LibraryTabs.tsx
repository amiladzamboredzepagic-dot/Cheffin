import { useTranslation } from 'react-i18next'
import { Tabs } from '../../../components/ui/tabs/Tabs'
import { LIBRARY_TAB, type LibraryTab } from './libraryTab'

interface LibraryTabsProps {
  tab: LibraryTab
  collectionCount: number | null
  onTabChange: (tab: LibraryTab) => void
}

export function LibraryTabs({
  tab,
  collectionCount,
  onTabChange,
}: LibraryTabsProps) {
  const { t } = useTranslation()

  const tabs: { value: LibraryTab; label: string }[] = [
    { value: LIBRARY_TAB.SAVED, label: t('library.saved') },
    {
      value: LIBRARY_TAB.COLLECTIONS,
      label: `${t('library.collections')}${collectionCount !== null ? ` ${collectionCount}` : ''}`,
    },
    { value: LIBRARY_TAB.RECIPES, label: t('library.myRecipes') },
  ]

  return (
    <Tabs
      value={tab}
      options={tabs}
      onChange={onTabChange}
      ariaLabel={t('navigation.myLibrary')}
      idPrefix="library-tab"
      panelId="library-panel"
      sx={{ mt: 4 }}
    />
  )
}

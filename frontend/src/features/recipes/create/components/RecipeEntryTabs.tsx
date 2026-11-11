import { Link, PencilLine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EntryTab, EntryTabs } from '../RecipeCreatePage.styles'
import { ENTRY_MODE, type EntryMode } from './recipeEntryMode'

interface RecipeEntryTabsProps {
  entryMode: EntryMode
  onEntryModeChange: (mode: EntryMode) => void
}

export function RecipeEntryTabs({
  entryMode,
  onEntryModeChange,
}: RecipeEntryTabsProps) {
  const { t } = useTranslation()

  return (
    <EntryTabs
      role="tablist"
      aria-label={t('recipeCreate.entryMethod')}
      direction="row"
      gap={0.5}
    >
      <EntryTab
        role="tab"
        aria-selected={entryMode === ENTRY_MODE.IMPORT}
        selected={entryMode === ENTRY_MODE.IMPORT}
        onClick={() => onEntryModeChange(ENTRY_MODE.IMPORT)}
      >
        <Link size={16} aria-hidden="true" />
        {t('recipeCreate.importTab')}
      </EntryTab>

      <EntryTab
        role="tab"
        aria-selected={entryMode === ENTRY_MODE.MANUAL}
        selected={entryMode === ENTRY_MODE.MANUAL}
        onClick={() => onEntryModeChange(ENTRY_MODE.MANUAL)}
      >
        <PencilLine size={16} aria-hidden="true" />
        {t('recipeCreate.manualTab')}
      </EntryTab>
    </EntryTabs>
  )
}

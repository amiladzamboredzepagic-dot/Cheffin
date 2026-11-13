import { Link, PencilLine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tabs } from '../../../../components/ui/tabs/Tabs'
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
    <Tabs
      variant="segmented"
      ariaLabel={t('recipeCreate.entryMethod')}
      value={entryMode}
      onChange={onEntryModeChange}
      options={[
        {
          value: ENTRY_MODE.IMPORT,
          label: (
            <>
              <Link size={16} aria-hidden="true" />
              {t('recipeCreate.importTab')}
            </>
          ),
        },
        {
          value: ENTRY_MODE.MANUAL,
          label: (
            <>
              <PencilLine size={16} aria-hidden="true" />
              {t('recipeCreate.manualTab')}
            </>
          ),
        },
      ]}
    />
  )
}

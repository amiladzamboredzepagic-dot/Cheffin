import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { FormTextField } from './FormTextField'
import { PantryButton, SearchRow } from './SearchField.styles'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  showPantryButton?: boolean
}

export function SearchField({
  value,
  onChange,
  placeholder,
  showPantryButton = false,
}: SearchFieldProps) {
  const { t } = useTranslation()
  const descriptionId = useId()

  return (
    <SearchRow>
      <FormTextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        startAdornment={<Search size={18} aria-hidden="true" />}
        sx={{ maxWidth: 'none', minWidth: 0 }}
        slotProps={{
          htmlInput: { 'aria-label': placeholder },
        }}
      />
      {showPantryButton && (
        <>
          <PantryButton
            type="button"
            disabled
            title={t('discovery.pantryUnavailable')}
            aria-describedby={descriptionId}
          >
            {t('discovery.cookWithPantry')} →
          </PantryButton>
          <span id={descriptionId} hidden>
            {t('discovery.pantryUnavailable')}
          </span>
        </>
      )}
    </SearchRow>
  )
}

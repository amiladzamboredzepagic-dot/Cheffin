import { InputAdornment, TextField } from '@mui/material'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LibrarySearchProps {
  search: string
  onSearchChange: (search: string) => void
}

export function LibrarySearch({ search, onSearchChange }: LibrarySearchProps) {
  const { t } = useTranslation()

  return (
    <TextField
      fullWidth
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder={t('library.searchCollections')}
      sx={{ maxWidth: 'none' }}
      slotProps={{
        htmlInput: { 'aria-label': t('library.searchCollections') },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

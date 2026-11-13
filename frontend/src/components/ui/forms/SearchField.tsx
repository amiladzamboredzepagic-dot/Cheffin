import { Search } from 'lucide-react'
import { FormTextField } from './FormTextField'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: SearchFieldProps) {
  return (
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
  )
}

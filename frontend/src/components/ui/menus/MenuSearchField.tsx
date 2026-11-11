import { FormTextField } from '../forms/FormTextField'

interface MenuSearchFieldProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function MenuSearchField({
  placeholder,
  value,
  onChange,
}: MenuSearchFieldProps) {
  return (
    <FormTextField
      placeholder={placeholder}
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onClick={(event) => event.stopPropagation()}
      sx={(theme) => ({
        width: '100%',
        maxWidth: 'none',
        '& .MuiOutlinedInput-root': {
          boxSizing: 'border-box',
          height: theme.spacing(4.75),
          px: theme.spacing(1.75),
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.spacing(0.75),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
        },
        '& .MuiOutlinedInput-input': {
          ...theme.typography.caption,
          lineHeight: theme.typography.pxToRem(15),
          color: theme.palette.text.placeholder ?? theme.palette.text.secondary,
        },
      })}
    />
  )
}

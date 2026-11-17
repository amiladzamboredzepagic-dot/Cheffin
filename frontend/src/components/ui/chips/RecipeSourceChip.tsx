import { Chip } from '@mui/material'

interface RecipeSourceChipProps {
  label: string
}

export function RecipeSourceChip({ label }: RecipeSourceChipProps) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 24,
        color: 'primary.dark',
        backgroundColor: 'background.planner',
        border: 1,
        borderColor: 'primary.light',
        fontSize: 11,
        fontWeight: 600,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  )
}

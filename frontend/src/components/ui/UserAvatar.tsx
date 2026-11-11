import { AccountCircle } from '@mui/icons-material'
import { Avatar as MuiAvatar, useTheme } from '@mui/material'

interface UserAvatarProps {
  firstName?: string | null
  lastName?: string | null
}

export function UserAvatar({ firstName, lastName }: UserAvatarProps) {
  const theme = useTheme()
  const initials = [firstName, lastName]
    .map((name) => name?.trim().charAt(0))
    .filter(Boolean)
    .join('')
    .toLocaleUpperCase()

  return (
    <MuiAvatar
      sx={{
        width: 38,
        height: 38,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.secondary,
      }}
    >
      {initials || <AccountCircle />}
    </MuiAvatar>
  )
}

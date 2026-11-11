import { AccountCircle } from '@mui/icons-material'
import { Avatar as MuiAvatar, useTheme } from '@mui/material'

interface UserAvatarProps {
  initials: string
}

export function UserAvatar({ initials }: UserAvatarProps) {
  const theme = useTheme()

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

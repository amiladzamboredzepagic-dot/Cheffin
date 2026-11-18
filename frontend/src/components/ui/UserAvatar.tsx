import { AccountCircle } from '@mui/icons-material'
import { Avatar as MuiAvatar, useTheme } from '@mui/material'

interface UserAvatarProps {
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string | null
  size?: number
}

export function UserAvatar({
  firstName,
  lastName,
  imageUrl,
  size = 38,
}: UserAvatarProps) {
  const theme = useTheme()
  const initials = [firstName, lastName]
    .map((name) => name?.trim().charAt(0))
    .filter(Boolean)
    .join('')
    .toLocaleUpperCase()

  return (
    <MuiAvatar
      src={imageUrl ?? undefined}
      alt={imageUrl ? '' : undefined}
      sx={{
        width: size,
        height: size,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.secondary,
        fontSize: size >= 64 ? '1.75rem' : undefined,
      }}
    >
      {initials || <AccountCircle />}
    </MuiAvatar>
  )
}

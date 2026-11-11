import { Divider } from '@mui/material'
import { Plus } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Flex } from '../layout/Flex'

interface SelectMenuCreateActionProps {
  label: string
  onClick?: () => void
}

export function SelectMenuCreateAction({
  label,
  onClick,
}: SelectMenuCreateActionProps) {
  return (
    <>
      <Divider
        aria-hidden="true"
        sx={{
          flexShrink: 0,
          mx: 1.5,
          mt: '10px',
          mb: '8px',
          borderColor: 'divider',
        }}
      />
      <Flex
        component="div"
        align="center"
        gap="10px"
        sx={{
          boxSizing: 'border-box',
          flex: '0 0 44px',
          minHeight: 44,
          mx: 1,
          px: '14px',
          cursor: 'pointer',
          color: (theme) => theme.palette.primary.light,
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '16px',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          event.stopPropagation()
          onClick?.()
        }}
      >
        <Plus size={18} strokeWidth={1.7} />
        {label}
      </Flex>
    </>
  )
}

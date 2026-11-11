import { useTheme } from '@mui/material'
import { NotebookPen } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import {
  ManualAlternativeAction,
  ManualAlternativeRoot,
  ManualAlternativeTitle,
} from './ManualEntryAlternative.styles'

interface ManualEntryAlternativeProps {
  onClick: () => void
}

export function ManualEntryAlternative({
  onClick,
}: ManualEntryAlternativeProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <ManualAlternativeRoot
      direction="row"
      align="center"
      gap={1.875}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      sx={{ cursor: 'pointer' }}
    >
      <NotebookPen
        size={26}
        color={theme.palette.highlight}
        aria-hidden="true"
      />
      <Flex direction="column" align="flex-start" gap={0.875}>
        <ManualAlternativeTitle>
          {t('recipeCreate.manualAlternativeTitle')}
        </ManualAlternativeTitle>
        <ManualAlternativeAction>
          {t('recipeCreate.manualAlternativeAction')}
        </ManualAlternativeAction>
      </Flex>
    </ManualAlternativeRoot>
  )
}

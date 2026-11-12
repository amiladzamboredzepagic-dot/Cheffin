import { useTheme } from '@mui/material'
import { NotebookPen } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import {
  RecipeWritingPromptAction,
  RecipeWritingPromptRoot,
  RecipeWritingPromptTitle,
} from './WriteYourOwnRecipePrompt.styles'

interface WriteYourOwnRecipePromptProps {
  onClick: () => void
}

export function WriteYourOwnRecipePrompt({
  onClick,
}: WriteYourOwnRecipePromptProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <RecipeWritingPromptRoot
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
        <RecipeWritingPromptTitle>
          {t('recipeCreate.manualAlternativeTitle')}
        </RecipeWritingPromptTitle>
        <RecipeWritingPromptAction>
          {t('recipeCreate.manualAlternativeAction')}
        </RecipeWritingPromptAction>
      </Flex>
    </RecipeWritingPromptRoot>
  )
}

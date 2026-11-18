import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { StatusAlert } from '../../../components/ui/feedback/StatusAlert'
import { Flex } from '../../../components/ui/layout/Flex'
import { GenericModal } from '../../../components/ui/modals/GenericModal'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'

interface DeleteMyRecipeDialogProps {
  recipe: MyRecipe | null
  loading: boolean
  error: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteMyRecipeDialog({
  recipe,
  loading,
  error,
  onClose,
  onConfirm,
}: DeleteMyRecipeDialogProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const handleClose = () => {
    if (!loading) onClose()
  }

  return (
    <GenericModal
      open={recipe !== null}
      onClose={handleClose}
      title={t('library.deleteRecipeTitle')}
      description={t('library.deleteRecipePrompt', {
        title: recipe?.title ?? '',
      })}
      closeLabel={t('common.close')}
      content={
        error && (
          <StatusAlert severity="error">
            {t('library.deleteRecipeFailed')}
          </StatusAlert>
        )
      }
      footer={
        <Flex
          direction={{ xs: 'column-reverse', sm: 'row' }}
          align="stretch"
          justify="flex-end"
          gap={1.5}
        >
          <ActionButton
            type="button"
            kind="secondary"
            onClick={handleClose}
            disabled={loading}
            text={t('recipeCreate.cancelCollection')}
          />
          <ActionButton
            onClick={onConfirm}
            disabled={loading || recipe === null}
            backgroundColor={theme.palette.error.main}
            textColor={theme.palette.error.contrastText}
            text={
              loading
                ? t('library.deletingRecipe')
                : t('library.deleteRecipeAction')
            }
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          />
        </Flex>
      }
    />
  )
}

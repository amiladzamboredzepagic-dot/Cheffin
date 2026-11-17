import { FormHelperText } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormDialog } from '../../../../../components/ui/dialogs/FormDialog'
import { FormTextField } from '../../../../../components/ui/forms/FormTextField'

const MAX_CUISINE_LENGTH = 60

interface AddRecipeCuisineDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (cuisine: string) => void
}

export function AddRecipeCuisineDialog({
  open,
  onClose,
  onAdd,
}: AddRecipeCuisineDialogProps) {
  const { t } = useTranslation()
  const [cuisineName, setCuisineName] = useState('')
  const [showRequiredError, setShowRequiredError] = useState(false)

  const closeDialog = () => {
    setCuisineName('')
    setShowRequiredError(false)
    onClose()
  }

  const handleSubmit = () => {
    const cuisine = cuisineName.trim()
    if (!cuisine) {
      setShowRequiredError(true)
      return
    }

    onAdd(cuisine)
    closeDialog()
  }

  return (
    <FormDialog
      open={open}
      title={t('recipeCreate.addCuisineTitle')}
      cancelLabel={t('recipeCreate.cancelCollection')}
      submitLabel={t('recipeCreate.addCuisine')}
      onClose={closeDialog}
      onSubmit={handleSubmit}
    >
      <FormTextField
        autoFocus
        required
        label={t('recipeCreate.cuisineNameLabel')}
        placeholder={t('recipeCreate.cuisineNamePlaceholder')}
        value={cuisineName}
        onChange={(event) => {
          setCuisineName(event.target.value)
          setShowRequiredError(false)
        }}
        slotProps={{
          htmlInput: { maxLength: MAX_CUISINE_LENGTH },
        }}
      />
      {showRequiredError && (
        <FormHelperText error>
          {t('recipeCreate.cuisineNameRequired')}
        </FormHelperText>
      )}
    </FormDialog>
  )
}

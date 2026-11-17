import { FormHelperText } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormDialog } from '../../../../../components/ui/dialogs/FormDialog'
import { FormTextField } from '../../../../../components/ui/forms/FormTextField'
import { useAddCuisineMutation } from '../../../hooks/useRecipeMetadataQuery'

const MAX_CUISINE_LENGTH = 60

interface AddRecipeCuisineDialogProps {
  open: boolean
  onClose: () => void
  supportedCuisines: string[]
  customCuisines: string[]
  onAdd: (cuisine: string) => void
}

export function AddRecipeCuisineDialog({
  open,
  onClose,
  supportedCuisines,
  customCuisines,
  onAdd,
}: AddRecipeCuisineDialogProps) {
  const { t } = useTranslation()
  const [cuisineName, setCuisineName] = useState('')
  const [showRequiredError, setShowRequiredError] = useState(false)
  const [showSaveError, setShowSaveError] = useState(false)
  const { addCuisine, loading } = useAddCuisineMutation()

  const closeDialog = () => {
    setCuisineName('')
    setShowRequiredError(false)
    setShowSaveError(false)
    onClose()
  }

  const handleSubmit = async () => {
    const cuisine = cuisineName.trim()
    if (!cuisine) {
      setShowRequiredError(true)
      return
    }

    const normalizedCuisine = cuisine.toLocaleLowerCase()
    const existingCuisine = supportedCuisines.find(
      (option) =>
        option.toLocaleLowerCase() === normalizedCuisine ||
        t(`discovery.cuisines.${option}`).toLocaleLowerCase() ===
          normalizedCuisine,
    )
    const existingCustomCuisine = customCuisines.find(
      (option) => option.toLocaleLowerCase() === normalizedCuisine,
    )

    try {
      setShowSaveError(false)
      const savedCuisine =
        existingCuisine ??
        existingCustomCuisine ??
        (await addCuisine(cuisine))
      onAdd(savedCuisine)
      closeDialog()
    } catch (error) {
      console.error('Failed to save cuisine:', error)
      setShowSaveError(true)
    }
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
        disabled={loading}
        onChange={(event) => {
          setCuisineName(event.target.value)
          setShowRequiredError(false)
          setShowSaveError(false)
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
      {showSaveError && (
        <FormHelperText error>
          {t('recipeCreate.addCuisineFailed')}
        </FormHelperText>
      )}
    </FormDialog>
  )
}

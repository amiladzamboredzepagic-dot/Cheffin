import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { FormHelperText } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormDialog } from '../../../../components/ui/dialogs/FormDialog'
import { FormTextField } from '../../../../components/ui/forms/FormTextField'
import { useCreateCollectionMutation } from '../hooks/useCreateCollectionMutation'

const MAX_COLLECTION_NAME_LENGTH = 80

interface CreateCollectionDialogProps {
  open: boolean
  onClose: () => void
  onCreated: (collectionId: string) => void
}

export function CreateCollectionDialog({
  open,
  onClose,
  onCreated,
}: CreateCollectionDialogProps) {
  const { t } = useTranslation()
  const { createCollection, loading } = useCreateCollectionMutation()
  const [collectionName, setCollectionName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const closeDialog = () => {
    setCollectionName('')
    setErrorMessage('')
    onClose()
  }

  const handleSubmit = async () => {
    const name = collectionName.trim()
    if (!name) {
      setErrorMessage(t('recipeCreate.collectionNameRequired'))
      return
    }

    try {
      const collection = await createCollection(name)
      onCreated(collection.id)
      closeDialog()
    } catch (error) {
      console.error('Failed to create collection:', error)
      const alreadyExists =
        CombinedGraphQLErrors.is(error) &&
        error.errors.some(
          (graphQLError) =>
            graphQLError.extensions?.code === 'COLLECTION_EXISTS',
        )
      setErrorMessage(
        t(
          alreadyExists
            ? 'recipeCreate.collectionAlreadyExists'
            : 'recipeCreate.collectionCreateFailed',
        ),
      )
    }
  }

  return (
    <FormDialog
      open={open}
      title={t('recipeCreate.createCollectionTitle')}
      cancelLabel={t('recipeCreate.cancelCollection')}
      submitLabel={t('recipeCreate.createCollectionAction')}
      loading={loading}
      onClose={closeDialog}
      onSubmit={handleSubmit}
    >
      <FormTextField
        autoFocus
        required
        label={t('recipeCreate.collectionName')}
        placeholder={t('recipeCreate.collectionNamePlaceholder')}
        value={collectionName}
        onChange={(event) => {
          setCollectionName(event.target.value)
          setErrorMessage('')
        }}
        slotProps={{
          htmlInput: { maxLength: MAX_COLLECTION_NAME_LENGTH },
        }}
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormDialog>
  )
}

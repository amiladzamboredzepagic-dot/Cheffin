import { Alert } from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { FormTextField } from '../../../components/ui/forms/FormTextField'
import { Flex } from '../../../components/ui/layout/Flex'
import { GenericModal } from '../../../components/ui/modals/GenericModal'
import { PhotoSection } from '../../recipes/create/components/manual/PhotoSection'
import type { SavedProfile } from '../profile.types'

interface ProfileEditDialogProps {
  open: boolean
  profile: SavedProfile
  onClose: () => void
  onSave: (profile: SavedProfile) => void
}

export function ProfileEditDialog({
  open,
  profile,
  onClose,
  onSave,
}: ProfileEditDialogProps) {
  const { t } = useTranslation()
  const [description, setDescription] = useState(profile.description)
  const [image, setImage] = useState<string | null>(profile.image)
  const [error, setError] = useState('')

  const handleImageChange = (selectedFile: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
        setError('')
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      onSave({ description: description.trim(), image })
    } catch {
      setError(t('profile.imageSaveError'))
    }
  }

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      eyebrow={t('profile.eyebrow')}
      title={t('profile.editProfile')}
      description={t('profile.editProfileDescription')}
      closeLabel={t('common.close')}
      panelSx={{ height: 'auto', maxHeight: 'calc(100dvh - 32px)' }}
      content={
        <Flex
          component="form"
          onSubmit={handleSubmit}
          direction="column"
          align="stretch"
          gap={1.75}
        >
          <FormTextField
            label={t('profile.descriptionLabel')}
            placeholder={t('profile.descriptionPlaceholder')}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            minRows={3}
            slotProps={{ htmlInput: { maxLength: 300 } }}
          />
          <PhotoSection
            photo={null}
            existingPhotoUrl={image}
            onPhotoChange={handleImageChange}
            copy={{
              title: t('profile.photoTitle'),
              hint: t('profile.photoHint'),
              drop: t('profile.photoDrop'),
              formats: t('profile.photoFormats'),
              choosePhoto: t('profile.choosePhoto'),
              tooLarge: t('profile.photoTooLarge'),
              invalidType: t('profile.photoInvalidType'),
              chooseFile: t('profile.chooseFile'),
              useCamera: t('profile.useCamera'),
            }}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Flex direction="row" align="center" justify="flex-end" gap={1}>
            <ActionButton
              type="button"
              kind="secondary"
              text={t('common.cancel')}
              onClick={onClose}
            />
            <ActionButton type="submit" text={t('profile.saveProfile')} />
          </Flex>
        </Flex>
      }
    />
  )
}

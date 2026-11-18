import { Alert } from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { FormTextField } from '../../../components/ui/forms/FormTextField'
import { Flex } from '../../../components/ui/layout/Flex'
import { GenericModal } from '../../../components/ui/modals/GenericModal'
import { PhotoSection } from '../../recipes/create/components/manual/PhotoSection'
import type { ProfileEditValues, SavedProfile } from '../profile.types'

interface ProfileEditDialogProps {
  open: boolean
  profile: SavedProfile
  firstName: string | null
  lastName: string | null
  onClose: () => void
  onSave: (profile: ProfileEditValues) => Promise<void>
}

export function ProfileEditDialog({
  open,
  profile,
  firstName: initialFirstName,
  lastName: initialLastName,
  onClose,
  onSave,
}: ProfileEditDialogProps) {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState(initialFirstName ?? '')
  const [lastName, setLastName] = useState(initialLastName ?? '')
  const [description, setDescription] = useState(profile.description)
  const [image, setImage] = useState<string | null>(profile.image)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()
    if (!trimmedFirstName || !trimmedLastName) {
      setError(t('auth.missingNames'))
      return
    }

    setSaving(true)
    setError('')
    try {
      await onSave({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        description: description.trim(),
        image,
      })
    } catch (saveError) {
      console.error('Failed to save profile:', saveError)
      setError(t('profile.profileSaveError'))
    } finally {
      setSaving(false)
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
      content={
        <Flex
          id="profile-edit-form"
          component="form"
          onSubmit={handleSubmit}
          direction="column"
          align="stretch"
          gap={1.75}
        >
          <FormTextField
            id="profile-first-name"
            name="first_name"
            type="text"
            required
            label={t('auth.firstName')}
            placeholder={t('auth.firstNamePlaceholder')}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
            slotProps={{ htmlInput: { maxLength: 80 } }}
          />
          <FormTextField
            id="profile-last-name"
            name="last_name"
            type="text"
            required
            label={t('auth.lastName')}
            placeholder={t('auth.lastNamePlaceholder')}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            autoComplete="family-name"
            slotProps={{ htmlInput: { maxLength: 80 } }}
          />
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
        </Flex>
      }
      footer={
        <Flex
          direction={{ xs: 'column-reverse', sm: 'row' }}
          align="stretch"
          justify="flex-end"
          gap={1}
        >
          <ActionButton
            type="button"
            kind="secondary"
            text={t('common.cancel')}
            onClick={onClose}
            disabled={saving}
          />
          <ActionButton
            type="submit"
            form="profile-edit-form"
            text={t('profile.saveProfile')}
            disabled={saving}
          />
        </Flex>
      }
    />
  )
}

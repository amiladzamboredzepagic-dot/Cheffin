import {
  memo,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpFromLine, Camera } from 'lucide-react'
import { PhotoCropper, type PhotoCropCopy } from './PhotoCropper'
import {
  ManualHiddenFileInput,
  ManualNoteTitle,
  ManualPhotoAction,
  ManualPhotoActions,
  ManualPhotoDrop,
  ManualPhotoPreview,
  ManualRecipePanel,
  ManualSectionHint,
  ManualSectionTitle,
} from '../WriteYourOwnRecipe.styles'

const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024

export interface PhotoSectionCopy {
  title: string
  hint: string
  drop: string
  formats: string
  choosePhoto: string
  tooLarge: string
  invalidType: string
  chooseFile: string
  useCamera: string
}

interface PhotoSectionProps {
  photo: File | null
  existingPhotoUrl?: string | null
  onPhotoChange: (photo: File) => void
  copy?: Partial<PhotoSectionCopy>
  cropCopy?: PhotoCropCopy
  inputBackground?: boolean
}

function PhotoSectionView({
  photo,
  existingPhotoUrl,
  onPhotoChange,
  copy,
  cropCopy,
  inputBackground = false,
}: PhotoSectionProps) {
  const { t } = useTranslation()
  const photoCopy: PhotoSectionCopy = {
    title: t('recipeCreate.photoTitle'),
    hint: t('recipeCreate.photoHint'),
    drop: t('recipeCreate.photoDrop'),
    formats: t('recipeCreate.photoFormats'),
    choosePhoto: t('recipeCreate.choosePhoto'),
    tooLarge: t('recipeCreate.photoTooLarge'),
    invalidType: t('recipeCreate.photoInvalidType'),
    chooseFile: t('recipeCreate.chooseFile'),
    useCamera: t('recipeCreate.useCamera'),
    ...copy,
  }

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [cropSource, setCropSource] = useState<{
    file: File
    url: string
  } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const photoPreviewUrl = previewUrl ?? existingPhotoUrl

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    },
    [previewUrl],
  )

  useEffect(
    () => () => {
      if (cropSource) {
        URL.revokeObjectURL(cropSource.url)
      }
    },
    [cropSource],
  )

  const acceptPhoto = (
    selectedPhoto: File | undefined,
    input?: HTMLInputElement,
  ) => {
    if (!selectedPhoto) {
      return
    }

    if (selectedPhoto.size > MAX_PHOTO_SIZE_BYTES) {
      setError(photoCopy.tooLarge)
      if (input) {
        input.value = ''
      }
      return
    }

    if (!['image/jpeg', 'image/png'].includes(selectedPhoto.type)) {
      setError(photoCopy.invalidType)
      if (input) {
        input.value = ''
      }
      return
    }

    setError('')
    if (cropCopy) {
      setCropSource({
        file: selectedPhoto,
        url: URL.createObjectURL(selectedPhoto),
      })
    } else {
      onPhotoChange(selectedPhoto)
      setPreviewUrl(URL.createObjectURL(selectedPhoto))
    }
    if (input) {
      input.value = ''
    }
  }

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    acceptPhoto(event.target.files?.[0], event.target)
  }

  const handlePhotoDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    if (cropSource) {
      return
    }
    acceptPhoto(event.dataTransfer.files[0])
  }

  const handleCroppedPhoto = (croppedPhoto: File) => {
    onPhotoChange(croppedPhoto)
    setPreviewUrl(URL.createObjectURL(croppedPhoto))
    setCropSource(null)
    setError('')
  }

  return (
    <ManualRecipePanel direction="column" align="stretch" gap={1.75}>
      <ManualSectionTitle>{photoCopy.title}</ManualSectionTitle>

      <ManualSectionHint>{photoCopy.hint}</ManualSectionHint>

      <ManualPhotoDrop
        component={cropSource ? 'div' : 'label'}
        direction="column"
        align="center"
        justify="center"
        gap={1}
        sx={(theme) => ({
          cursor: cropSource ? 'default' : 'pointer',
          ...(inputBackground && {
            backgroundColor: theme.palette.background.input,
          }),
        })}
        onDragOver={(event: DragEvent<HTMLElement>) => event.preventDefault()}
        onDrop={handlePhotoDrop}
      >
        <ManualHiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          aria-label={photoCopy.choosePhoto}
          onChange={handlePhotoChange}
        />
        {cropSource && cropCopy ? (
          <PhotoCropper
            sourcePhoto={cropSource.file}
            imageUrl={cropSource.url}
            copy={cropCopy}
            tooLargeMessage={photoCopy.tooLarge}
            maxSizeBytes={MAX_PHOTO_SIZE_BYTES}
            onCancel={() => setCropSource(null)}
            onSave={handleCroppedPhoto}
          />
        ) : photoPreviewUrl ? (
          <ManualPhotoPreview
            src={photoPreviewUrl}
            alt={photo?.name ?? photoCopy.title}
          />
        ) : (
          <>
            <ArrowUpFromLine size={25} aria-hidden="true" />
            <ManualNoteTitle>{photoCopy.drop}</ManualNoteTitle>
            <ManualSectionHint>{photoCopy.formats}</ManualSectionHint>
          </>
        )}
      </ManualPhotoDrop>
      {photo && <ManualSectionHint>{photo.name}</ManualSectionHint>}

      {error && <ManualSectionHint role="alert">{error}</ManualSectionHint>}

      <ManualHiddenFileInput
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        aria-label={photoCopy.useCamera}
        onChange={handlePhotoChange}
      />

      <ManualPhotoActions>
        <ManualPhotoAction
          component="button"
          direction="row"
          align="center"
          justify="center"
          gap={0.75}
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {photoCopy.chooseFile}
        </ManualPhotoAction>
        <ManualPhotoAction
          component="button"
          direction="row"
          align="center"
          justify="center"
          gap={0.75}
          type="button"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera size={14} aria-hidden="true" />
          {photoCopy.useCamera}
        </ManualPhotoAction>
      </ManualPhotoActions>
    </ManualRecipePanel>
  )
}

export const PhotoSection = memo(PhotoSectionView)

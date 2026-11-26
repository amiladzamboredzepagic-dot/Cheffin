import { Slider } from '@mui/material'
import { useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { ActionButton } from '../../../../../components/ui/actions/ActionButton'
import { Flex } from '../../../../../components/ui/layout/Flex'
import {
  ManualPhotoActions,
  ManualPhotoCropper as ManualPhotoCropperFrame,
  ManualSectionHint,
} from '../WriteYourOwnRecipe.styles'

const MAX_CROPPED_PHOTO_DIMENSION = 1024

async function createCroppedPhoto(
  photo: File,
  imageUrl: string,
  area: Area,
): Promise<File> {
  const image = new Image()
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Failed to load photo for cropping'))
    image.src = imageUrl
  })

  const scale = Math.min(
    1,
    MAX_CROPPED_PHOTO_DIMENSION / Math.max(area.width, area.height),
  )
  const width = Math.max(1, Math.round(area.width * scale))
  const height = Math.max(1, Math.round(area.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas is unavailable for photo cropping')
  }

  context.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    width,
    height,
  )

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result)
        else reject(new Error('Failed to encode cropped photo'))
      },
      photo.type,
      0.92,
    )
  })

  return new File([blob], photo.name, {
    type: blob.type || photo.type,
    lastModified: Date.now(),
  })
}

export interface PhotoCropCopy {
  apply: string
  cancel: string
  zoom: string
  failed: string
}

interface PhotoCropperProps {
  sourcePhoto: File
  imageUrl: string
  copy: PhotoCropCopy
  tooLargeMessage: string
  maxSizeBytes: number
  onCancel: () => void
  onSave: (photo: File) => void
}

export function PhotoCropper({
  sourcePhoto,
  imageUrl,
  copy,
  tooLargeMessage,
  maxSizeBytes,
  onCancel,
  onSave,
}: PhotoCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [cropping, setCropping] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      return
    }

    setCropping(true)
    setError('')
    try {
      const croppedPhoto = await createCroppedPhoto(
        sourcePhoto,
        imageUrl,
        croppedAreaPixels,
      )
      if (croppedPhoto.size > maxSizeBytes) {
        setError(tooLargeMessage)
        return
      }

      onSave(croppedPhoto)
    } catch (cropError) {
      console.error('Failed to crop profile photo:', cropError)
      setError(copy.failed)
    } finally {
      setCropping(false)
    }
  }

  return (
    <Flex direction="column" align="stretch" gap={1}>
      <ManualPhotoCropperFrame>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          minZoom={1}
          maxZoom={3}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, area) => setCroppedAreaPixels(area)}
        />
      </ManualPhotoCropperFrame>
      <Flex direction="row" align="center" gap={1} sx={{ width: '100%' }}>
        <ManualSectionHint>{copy.zoom}</ManualSectionHint>
        <Slider
          aria-label={copy.zoom}
          min={1}
          max={3}
          step={0.1}
          size="small"
          value={zoom}
          onChange={(_, value) => {
            if (typeof value === 'number') setZoom(value)
          }}
        />
      </Flex>
      {error && <ManualSectionHint role="alert">{error}</ManualSectionHint>}
      <ManualPhotoActions>
        <ActionButton
          type="button"
          kind="secondary"
          text={copy.cancel}
          onClick={onCancel}
          disabled={cropping}
          sx={{ width: '100%' }}
        />
        <ActionButton
          type="button"
          text={copy.apply}
          onClick={() => void handleSave()}
          disabled={cropping || croppedAreaPixels === null}
          sx={{ width: '100%' }}
        />
      </ManualPhotoActions>
    </Flex>
  )
}

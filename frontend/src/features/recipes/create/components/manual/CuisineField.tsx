import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomSelectMenu } from '../../../../../components/ui/menus/CustomSelectMenu'
import type { RecipeCuisine } from '../../../recipeMetadata'
import { AddRecipeCuisineDialog } from './AddRecipeCuisineDialog'

interface CuisineFieldProps {
  cuisine: RecipeCuisine | null
  supportedCuisines: string[]
  customCuisines: string[]
  onCuisineChange: (value: RecipeCuisine | null) => void
}

export function CuisineField({
  cuisine,
  supportedCuisines,
  customCuisines,
  onCuisineChange,
}: CuisineFieldProps) {
  const { t } = useTranslation()
  const [dialogOpen, setDialogOpen] = useState(false)

  const cuisineOptionsByName = new Map<string, string>()
  for (const option of [
    ...supportedCuisines,
    ...customCuisines,
    ...(cuisine ? [cuisine] : []),
  ]) {
    cuisineOptionsByName.set(option.toLocaleLowerCase(), option)
  }

  const options = [
    {
      id: '',
      label: 'recipeCreate.notSpecified',
      translationKey: true,
    },
    ...[...cuisineOptionsByName.values()].map((option) => ({
      id: option,
      label: supportedCuisines.includes(option)
        ? `discovery.cuisines.${option}`
        : option,
      translationKey: supportedCuisines.includes(option),
    })),
  ]

  return (
    <>
      <CustomSelectMenu
        label={t('recipeCreate.cuisineLabel')}
        options={options}
        value={cuisine ?? ''}
        onChange={(value) => onCuisineChange(value || null)}
        placeholder={t('recipeCreate.findCuisine')}
        searchable
        showCreateOption
        onCreateClick={() => setDialogOpen(true)}
      />
      <AddRecipeCuisineDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        supportedCuisines={supportedCuisines}
        customCuisines={customCuisines}
        onAdd={(value) => {
          onCuisineChange(value)
          setDialogOpen(false)
        }}
      />
    </>
  )
}

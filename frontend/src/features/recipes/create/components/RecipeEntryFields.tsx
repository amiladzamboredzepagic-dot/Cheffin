import { Folder } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomSelectMenu } from '../../../../components/ui/menus/CustomSelectMenu'

const COLLECTIONS = [
  {
    id: 'plantPowered',
    label: 'recipeCreate.collections.plantPowered',
    translationKey: true,
    icon: <Folder size={18} />,
  },
  {
    id: 'weeknightFavorites',
    label: 'recipeCreate.collections.weeknightFavorites',
    translationKey: true,
    icon: <Folder size={18} />,
  },
  {
    id: 'weekendCooking',
    label: 'recipeCreate.collections.weekendCooking',
    translationKey: true,
    icon: <Folder size={18} />,
  },
]

export function RecipeCollectionField() {
  const { t } = useTranslation()
  const [selectedCollection, setSelectedCollection] = useState('plantPowered')

  const handleCreateNew = () => {
    // TODO: Implement create new collection modal
    console.log('Create new collection')
  }

  return (
    <CustomSelectMenu
      label={t('recipeCreate.collectionLabel')}
      options={COLLECTIONS}
      value={selectedCollection}
      onChange={setSelectedCollection}
      placeholder={t('recipeCreate.findCollection')}
      searchable
      showCreateOption
      onCreateClick={handleCreateNew}
      startAdornment={<Folder />}
    />
  )
}

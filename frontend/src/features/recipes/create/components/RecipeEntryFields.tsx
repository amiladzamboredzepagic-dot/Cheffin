import { Folder } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomSelectMenu } from '../../../../components/ui/menus/CustomSelectMenu'

export function RecipeCollectionField() {
  const { t } = useTranslation()
  const [selectedCollection, setSelectedCollection] = useState('')

  const handleCreateNew = () => console.log('Create new collection')

  return (
    <CustomSelectMenu
      label={t('recipeCreate.collectionLabel')}
      options={[]}
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

import { FormHelperText } from '@mui/material'
import { Folder } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../../context/useAuth'
import { CustomSelectMenu } from '../../../../components/ui/menus/CustomSelectMenu'
import { useMyCollectionsQuery } from '../hooks/useMyCollectionsQuery'
import { CreateCollectionDialog } from './CreateCollectionDialog'

interface RecipeCollectionFieldProps {
  value: string
  onChange: (collectionId: string) => void
}

export function RecipeCollectionField({
  value,
  onChange,
}: RecipeCollectionFieldProps) {
  const { t } = useTranslation()
  const { accessToken, loading: authLoading } = useAuth()
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useMyCollectionsQuery(authLoading || !accessToken)
  const [dialogOpen, setDialogOpen] = useState(false)

  const options = collections.map((collection) => ({
    id: collection.id,
    label: collection.name,
  }))

  return (
    <>
      <CustomSelectMenu
        label={t('recipeCreate.collectionLabel')}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={t('recipeCreate.findCollection')}
        searchable
        showCreateOption
        onCreateClick={() => setDialogOpen(true)}
        disabled={
          authLoading ||
          !accessToken ||
          collectionsLoading ||
          Boolean(collectionsError)
        }
        startAdornment={<Folder />}
      />
      {collectionsError && (
        <FormHelperText error>
          {t('recipeCreate.collectionsLoadFailed')}
        </FormHelperText>
      )}
      {!authLoading && !accessToken && (
        <FormHelperText>
          {t('recipeCreate.collectionSignInRequired')}
        </FormHelperText>
      )}

      <CreateCollectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={onChange}
      />
    </>
  )
}

import { Alert } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { GenericModal } from '../../../components/ui/modals/GenericModal'
import { Flex } from '../../../components/ui/layout/Flex'
import { CustomSelectMenu } from '../../../components/ui/menus/CustomSelectMenu'
import { CreateCollectionDialog } from '../../recipes/create/components/CreateCollectionDialog'
import { useMyCollectionsQuery } from '../../recipes/create/hooks/useMyCollectionsQuery'
import type { PublishedDiscoveryRecipe } from '../discovery.data'

const NO_COLLECTION = '__no_collection__'

interface SavePublicRecipeDialogProps {
  recipe: PublishedDiscoveryRecipe | null
  loading: boolean
  errorMessage: string
  onClose: () => void
  onSave: (collectionId: string | null) => Promise<void>
}

export function SavePublicRecipeDialog({
  recipe,
  loading,
  errorMessage,
  onClose,
  onSave,
}: SavePublicRecipeDialogProps) {
  const { t } = useTranslation()
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useMyCollectionsQuery(recipe === null)

  const [collectionId, setCollectionId] = useState(NO_COLLECTION)
  const [createCollectionOpen, setCreateCollectionOpen] = useState(false)

  const options = [
    { id: NO_COLLECTION, label: t('discovery.saveWithoutCollection') },
    ...collections.map((collection) => ({
      id: collection.id,
      label: collection.name,
    })),
  ]

  return (
    <>
      <GenericModal
        open={recipe !== null && !createCollectionOpen}
        onClose={onClose}
        title={t('discovery.saveRecipeTitle')}
        description={t('discovery.saveRecipePrompt', {
          title: recipe?.title ?? '',
        })}
        closeLabel={t('common.close')}
        content={
          <Flex direction="column" align="stretch" gap={2}>
            {collectionsError && (
              <Alert severity="warning">
                {t('recipeCreate.collectionsLoadFailed')}
              </Alert>
            )}
            <CustomSelectMenu
              label={t('discovery.saveRecipeCollection')}
              options={options}
              value={collectionId}
              onChange={setCollectionId}
              placeholder={t('recipeCreate.findCollection')}
              disabled={collectionsLoading || loading}
              showCreateOption={!collectionsError}
              onCreateClick={() => setCreateCollectionOpen(true)}
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Flex>
        }
        footer={
          <Flex direction="column" align="stretch" gap={1.5}>
            <ActionButton
              onClick={() =>
                void onSave(
                  collectionId === NO_COLLECTION ? null : collectionId,
                )
              }
              disabled={loading || collectionsLoading}
              text={
                loading
                  ? t('discovery.savingRecipe')
                  : t('discovery.saveRecipeAction')
              }
              sx={{ width: '100%' }}
            />
            <ActionButton
              type="button"
              kind="secondary"
              onClick={onClose}
              disabled={loading}
              text={t('recipeCreate.cancelCollection')}
              sx={{ width: '100%' }}
            />
          </Flex>
        }
      />
      <CreateCollectionDialog
        open={createCollectionOpen}
        onClose={() => setCreateCollectionOpen(false)}
        onCreated={(createdCollectionId) => {
          setCollectionId(createdCollectionId)
          setCreateCollectionOpen(false)
          void onSave(createdCollectionId)
        }}
      />
    </>
  )
}

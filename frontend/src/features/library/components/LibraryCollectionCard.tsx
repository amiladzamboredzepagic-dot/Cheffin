import { useTranslation } from 'react-i18next'
import {
  CollectionAction,
  CollectionCard,
  CollectionDetails,
  CollectionMetadata,
  CollectionPhoto,
  CollectionTitle,
} from '../LibraryPage.styles'

interface LibraryCollectionCardProps {
  name: string
  recipeCount: number
  imageUrl: string
  imageAlt: string
  onClick: () => void
}

export function LibraryCollectionCard({
  name,
  recipeCount,
  imageUrl,
  imageAlt,
  onClick,
}: LibraryCollectionCardProps) {
  const { t } = useTranslation()

  return (
    <CollectionCard type="button" onClick={onClick}>
      <CollectionPhoto src={imageUrl} alt={imageAlt} loading="lazy" />
      <CollectionDetails>
        <CollectionTitle>{name}</CollectionTitle>
        <CollectionMetadata>
          {t('library.collectionRecipeCount', { count: recipeCount })}
        </CollectionMetadata>
        <CollectionAction className="collection-card-action">
          {t('library.openCollection')}
        </CollectionAction>
      </CollectionDetails>
    </CollectionCard>
  )
}

import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { CollectionGrid } from '../LibraryPage.styles'
import { LibraryCollectionCard } from './LibraryCollectionCard'

interface LibraryCollectionGridProps {
  collections: RecipeCollection[]
  onCollectionSelect: (collection: RecipeCollection) => void
}

export function LibraryCollectionGrid({
  collections,
  onCollectionSelect,
}: LibraryCollectionGridProps) {
  return (
    <CollectionGrid>
      {collections.map((collection) => (
        <LibraryCollectionCard
          key={collection.id}
          name={collection.name}
          onClick={() => onCollectionSelect(collection)}
        />
      ))}
    </CollectionGrid>
  )
}

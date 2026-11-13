import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { CollectionGrid } from '../LibraryPage.styles'
import { LibraryCollectionCard } from './LibraryCollectionCard'

interface LibraryCollectionGridProps {
  collections: RecipeCollection[]
}

export function LibraryCollectionGrid({
  collections,
}: LibraryCollectionGridProps) {
  return (
    <CollectionGrid>
      {collections.map((collection) => (
        <LibraryCollectionCard key={collection.id} name={collection.name} />
      ))}
    </CollectionGrid>
  )
}

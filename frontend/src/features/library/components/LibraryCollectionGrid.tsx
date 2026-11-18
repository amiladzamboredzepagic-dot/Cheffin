import type { RecipeCollection } from '../../recipes/create/hooks/useMyCollectionsQuery'
import { discoveryRecipes } from '../../discovery/discovery.data'
import type { CollectionRecipeImage } from '../hooks/useCollectionRecipeImagesQuery'
import { CollectionGrid } from '../LibraryPage.styles'
import { LibraryCollectionCard } from './LibraryCollectionCard'

const DEFAULT_COLLECTION_IMAGE_URL = discoveryRecipes[1].imageUrl

interface LibraryCollectionGridProps {
  collections: RecipeCollection[]
  recipes: CollectionRecipeImage[]
  onCollectionSelect: (collection: RecipeCollection) => void
}

export function LibraryCollectionGrid({
  collections,
  recipes,
  onCollectionSelect,
}: LibraryCollectionGridProps) {
  return (
    <CollectionGrid>
      {collections.map((collection) => {
        const collectionRecipes = recipes.filter(
          (item) => item.collectionId === collection.id,
        )
        const recipe = collectionRecipes.find(
          (item) =>
            (item.photoBase64 && item.photoContentType) || item.imageUrl,
        )

        return (
          <LibraryCollectionCard
            key={collection.id}
            name={collection.name}
            recipeCount={collectionRecipes.length}
            imageUrl={
              recipe?.photoBase64 && recipe.photoContentType
                ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
                : recipe?.imageUrl ?? DEFAULT_COLLECTION_IMAGE_URL
            }
            imageAlt={recipe?.title ?? ''}
            onClick={() => onCollectionSelect(collection)}
          />
        )
      })}
    </CollectionGrid>
  )
}

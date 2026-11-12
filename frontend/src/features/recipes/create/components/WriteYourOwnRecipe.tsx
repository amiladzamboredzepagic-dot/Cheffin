import {
  ManualRecipeColumn,
  ManualRecipeGrid,
  ManualRecipeLayout,
} from './WriteYourOwnRecipe.styles'
import { IngredientsSection } from './manual/IngredientsSection'
import { MethodSection } from './manual/MethodSection'
import { PhotoSection } from './manual/PhotoSection'
import { RecipeCollectionSection } from './manual/RecipeCollectionSection'
import { RecipeBasicsSection } from './manual/RecipeBasicsSection'
import { RecipeDetailsSection } from './manual/RecipeDetailsSection'

export function WriteYourOwnRecipe() {
  return (
    <ManualRecipeLayout direction="column" align="stretch" gap={2.5}>
      <ManualRecipeGrid>
        <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
          <RecipeBasicsSection />
          <IngredientsSection />
          <MethodSection />
        </ManualRecipeColumn>

        <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
          <PhotoSection />
          <RecipeDetailsSection />
          <RecipeCollectionSection />
        </ManualRecipeColumn>
      </ManualRecipeGrid>
    </ManualRecipeLayout>
  )
}

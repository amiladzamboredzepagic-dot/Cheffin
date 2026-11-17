import {
  isPublishedRecipe,
  type DiscoveryRecipe,
} from './discovery.data'

type Translate = (key: string) => string

interface RecipeTagAttributes {
  dietaryPreferences: readonly string[]
  cuisine?: string | null
  difficulty?: string | null
}

function translateMetadata(value: string, prefix: string, translate: Translate) {
  const key = `${prefix}.${value}`
  const translated = translate(key)
  return translated === key ? value : translated
}

export function getRecipeAttributeTags(
  { dietaryPreferences, cuisine, difficulty }: RecipeTagAttributes,
  translate: Translate,
): string[] {
  return [
    ...dietaryPreferences.map((preference) =>
      translateMetadata(preference, 'discovery.diets', translate),
    ),
    ...(cuisine
      ? [
          translateMetadata(cuisine, 'discovery.cuisines', translate),
        ]
      : []),
    ...(difficulty
      ? [
          translateMetadata(difficulty, 'discovery.difficulties', translate),
        ]
      : []),
  ]
}

export function getRecipeTags(
  recipe: DiscoveryRecipe,
  translate: Translate,
): string[] {
  const published = isPublishedRecipe(recipe)

  return [
    translate(published ? 'discovery.published' : 'discovery.sample'),
    translate(`discovery.meals.${recipe.meal}`),
    ...getRecipeAttributeTags(
      {
        dietaryPreferences: published ? recipe.diets : recipe.diets.slice(0, 1),
        cuisine: published ? recipe.cuisine : undefined,
        difficulty: published ? recipe.difficulty : undefined,
      },
      translate,
    ),
  ]
}


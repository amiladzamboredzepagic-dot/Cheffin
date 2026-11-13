export const meals = [
  'breakfast',
  'lunch',
  'dinner',
  'snacks',
  'desserts',
  'drinks',
] as const
export const diets = [
  'vegetarian',
  'vegan',
  'glutenFree',
  'dairyFree',
  'highProtein',
] as const
export const times = ['under15', 'from15to30', 'from30to60', 'over60'] as const
export const difficulties = ['easy', 'medium', 'project'] as const
export const cuisines = [
  'italian',
  'mediterranean',
  'asian',
  'mexican',
] as const

type Meal = (typeof meals)[number]
type Diet = (typeof diets)[number]
type Time = (typeof times)[number]
type Difficulty = (typeof difficulties)[number]
type Cuisine = (typeof cuisines)[number]

export interface DiscoveryRecipe {
  id: string
  imageUrl: string
  meal: Meal
  diets: readonly Diet[]
  minutes: number
  difficulty: Difficulty
  cuisine?: Cuisine
  rating: number
}

export const discoveryRecipes: DiscoveryRecipe[] = [
  {
    id: 'goddess',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85',
    meal: 'lunch',
    diets: ['vegetarian'],
    minutes: 20,
    difficulty: 'easy',
    rating: 4.9,
  },
  {
    id: 'chickpea',
    imageUrl:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=85',
    meal: 'lunch',
    diets: ['vegan', 'vegetarian', 'dairyFree'],
    minutes: 25,
    difficulty: 'easy',
    cuisine: 'mediterranean',
    rating: 4.8,
  },
  {
    id: 'salmon',
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85',
    meal: 'dinner',
    diets: ['highProtein', 'glutenFree'],
    minutes: 30,
    difficulty: 'easy',
    rating: 4.9,
  },
  {
    id: 'toast',
    imageUrl:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85',
    meal: 'breakfast',
    diets: ['vegetarian', 'highProtein'],
    minutes: 10,
    difficulty: 'easy',
    rating: 4.8,
  },
  {
    id: 'bowl',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    meal: 'lunch',
    diets: ['vegan', 'vegetarian', 'dairyFree'],
    minutes: 35,
    difficulty: 'medium',
    rating: 4.9,
  },
  {
    id: 'berry',
    imageUrl:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
    meal: 'breakfast',
    diets: ['vegetarian'],
    minutes: 10,
    difficulty: 'easy',
    rating: 4.7,
  },
  {
    id: 'vegetables',
    imageUrl:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=85',
    meal: 'dinner',
    diets: ['vegan', 'vegetarian', 'dairyFree', 'glutenFree'],
    minutes: 40,
    difficulty: 'easy',
    rating: 4.8,
  },
  {
    id: 'citrus',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    meal: 'lunch',
    diets: ['vegan', 'vegetarian', 'dairyFree', 'glutenFree'],
    minutes: 18,
    difficulty: 'easy',
    rating: 4.7,
  },
]

export interface DiscoveryFilters {
  diets: Diet[]
  times: Time[]
  difficulties: Difficulty[]
  cuisines: Cuisine[]
}

export const emptyFilters = (): DiscoveryFilters => ({
  diets: [],
  times: [],
  difficulties: [],
  cuisines: [],
})

export function matchesFilters(
  recipe: DiscoveryRecipe,
  filters: DiscoveryFilters,
) {
  const matchesTime = (time: Time) => {
    switch (time) {
      case 'under15':
        return recipe.minutes < 15
      case 'from15to30':
        return recipe.minutes >= 15 && recipe.minutes < 30
      case 'from30to60':
        return recipe.minutes >= 30 && recipe.minutes <= 60
      case 'over60':
        return recipe.minutes > 60
    }
  }

  return (
    (!filters.diets.length ||
      filters.diets.every((diet) => recipe.diets.includes(diet))) &&
    (!filters.times.length || filters.times.some(matchesTime)) &&
    (!filters.difficulties.length ||
      filters.difficulties.includes(recipe.difficulty)) &&
    (!filters.cuisines.length ||
      (recipe.cuisine !== undefined &&
        filters.cuisines.includes(recipe.cuisine)))
  )
}

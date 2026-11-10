import type { RecipeCardProps } from '../../components/RecipeCard'

export const MOCK_RECIPES: RecipeCardProps[] = [
  {
    title: 'Avocado & Soft Egg Sourdough',
    titleKey: 'recipeInspiration.toast.title',
    imageUrl:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Avocado toast topped with eggs and fresh greens',
    imageAltKey: 'recipeInspiration.toast.imageAlt',
    metadata: '20 min · 380 kcal',
    context: 'A bright, satisfying start to your morning.',
    minutes: 10,
    calories: 360,
    tagKey: 'recipeInspiration.toast.tag',
    inspirationOrder: 3,
    videoDuration: '0:45',
    saved: true,
  },
  {
    title: 'Roasted Veggie Nourish Bowl',
    titleKey: 'recipeInspiration.quinoa.title',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Colorful bowl of fresh vegetables and greens',
    imageAltKey: 'recipeInspiration.quinoa.imageAlt',
    metadata: '35 min · 460 kcal',
    context: 'A wholesome bowl packed with seasonal produce.',
    minutes: 25,
    calories: 480,
    tagKey: 'recipeInspiration.quinoa.tag',
    inspirationOrder: 1,
    videoDuration: '1:12',
  },
  {
    title: 'Lemon & herb salmon',
    titleKey: 'recipeInspiration.salmon.title',
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A roasted salmon fillet served with fresh vegetables',
    imageAltKey: 'recipeInspiration.salmon.imageAlt',
    metadata: '30 min · 520 kcal',
    context: 'A simple salmon dinner with fresh herbs and lemon.',
    minutes: 30,
    calories: 520,
    tagKey: 'recipeInspiration.salmon.tag',
    inspirationOrder: 2,
  },
  {
    title: 'Creamy Green Goddess Salad',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Fresh green salad with vegetables',
    metadata: '15 min · 320 kcal',
    context: 'Crisp greens meet a zesty herb dressing.',
  },
  {
    title: 'Berry & Yogurt Breakfast Bowl',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Healthy breakfast with fruit, grains, and yogurt',
    metadata: '10 min · 290 kcal',
    context: 'Creamy, fruity, and ready in just a few minutes.',
    videoDuration: '0:38',
  },
  {
    title: 'Mediterranean Chickpea Salad',
    imageUrl:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Mediterranean-inspired salad with fresh ingredients',
    metadata: '25 min · 410 kcal',
    context: 'A fresh and filling lunch with a little crunch.',
  },
  {
    title: 'Golden Roast Vegetable Plate',
    imageUrl:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Colorful plate of roasted vegetables',
    metadata: '40 min · 430 kcal',
    context: 'Oven-roasted favorites with a savory finish.',
    videoDuration: '1:05',
  },
  {
    title: 'Citrus Avocado Garden Salad',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Fresh garden salad with citrus and avocado',
    metadata: '18 min · 350 kcal',
    context: 'A zippy, feel-good salad for any day of the week.',
  },
]

type InspirationRecipe = RecipeCardProps & {
  inspirationOrder: number
  titleKey: string
  imageAltKey: string
  minutes: number
  calories: number
  tagKey: string
}

export const INSPIRATION_RECIPES: InspirationRecipe[] = MOCK_RECIPES.filter(
  (recipe): recipe is InspirationRecipe =>
    recipe.inspirationOrder !== undefined &&
    recipe.titleKey !== undefined &&
    recipe.imageAltKey !== undefined &&
    recipe.minutes !== undefined &&
    recipe.calories !== undefined &&
    recipe.tagKey !== undefined,
).sort((first, second) => first.inspirationOrder - second.inspirationOrder)

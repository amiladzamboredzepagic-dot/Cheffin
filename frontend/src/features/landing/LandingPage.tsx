import { Benefits } from './Benefits'
import { Hero } from './Hero'
import { PantryIdeas } from './PantryIdeas'
import { RecipeInspiration } from './RecipeInspiration'
import { WeeklyPlan } from './WeeklyPlan'

interface LandingPageProps {
  onCreateAccount: () => void
}

export function LandingPage({ onCreateAccount }: LandingPageProps) {
  return (
    <>
      <Hero onCreateAccount={onCreateAccount} />
      <Benefits />
      <RecipeInspiration />
      <PantryIdeas />
      <WeeklyPlan />
    </>
  )
}

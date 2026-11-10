import { Benefits } from './Benefits'
import { Hero } from './Hero'
import { RecipeInspiration } from './RecipeInspiration'

interface LandingPageProps {
  onCreateAccount: () => void
}

export function LandingPage({ onCreateAccount }: LandingPageProps) {
  return (
    <>
      <Hero onCreateAccount={onCreateAccount} />
      <Benefits />
      <RecipeInspiration />
    </>
  )
}

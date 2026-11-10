import { Benefits } from './Benefits'
import { CommunityInvitation } from './CommunityInvitation'
import { CreateAccount } from './CreateAccount'
import { Hero } from './Hero'
import { PantryIdeas } from './PantryIdeas'
import { RecipeInspiration } from './RecipeInspiration'
import { WeeklyPlan } from './WeeklyPlan'

interface LandingPageProps {
  onCreateAccount: () => void
  onLogin: () => void
}

export function LandingPage({ onCreateAccount, onLogin }: LandingPageProps) {
  return (
    <>
      <Hero onCreateAccount={onCreateAccount} />
      <Benefits />
      <RecipeInspiration />
      <PantryIdeas />
      <WeeklyPlan />
      <CommunityInvitation />
      <CreateAccount onCreateAccount={onCreateAccount} onLogin={onLogin} />
    </>
  )
}

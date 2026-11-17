import { Benefits } from './Benefits'
import { CommunityInvitation } from './CommunityInvitation'
import { CreateAccount } from './CreateAccount'
import { Hero } from './Hero'
import { RecipeInspiration } from './RecipeInspiration'
import { WeeklyPlan } from './WeeklyPlan'

interface LandingPageProps {
  isAuthenticated: boolean
  onCreateAccount: () => void
  onLogin: () => void
}

export function LandingPage({
  isAuthenticated,
  onCreateAccount,
  onLogin,
}: LandingPageProps) {
  return (
    <>
      <Hero
        onCreateAccount={isAuthenticated ? undefined : onCreateAccount}
      />
      <Benefits />
      <RecipeInspiration />
      <WeeklyPlan />
      <CommunityInvitation />
      {!isAuthenticated && (
        <CreateAccount onCreateAccount={onCreateAccount} onLogin={onLogin} />
      )}
    </>
  )
}

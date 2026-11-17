import { Benefits } from './Benefits'
import { CommunityInvitation } from './CommunityInvitation'
import { CreateAccount } from './CreateAccount'
import { Hero } from './Hero'
import { RecipeInspiration } from './RecipeInspiration'
import { WeeklyPlan } from './WeeklyPlan'
import { useAuth } from '../../context/useAuth'

export function LandingPage() {
  const { isAuthenticated, openSignup, openLogin } = useAuth()

  return (
    <>
      <Hero
        onCreateAccount={isAuthenticated ? undefined : openSignup}
      />
      <Benefits />
      <RecipeInspiration />
      <WeeklyPlan />
      <CommunityInvitation />
      {!isAuthenticated && (
        <CreateAccount onCreateAccount={openSignup} onLogin={openLogin} />
      )}
    </>
  )
}

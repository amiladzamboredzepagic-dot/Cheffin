import { Benefits } from './Benefits'
import { Hero } from './Hero'

interface LandingPageProps {
  onCreateAccount: () => void
}

export function LandingPage({ onCreateAccount }: LandingPageProps) {
  return (
    <>
      <Hero onCreateAccount={onCreateAccount} />
      <Benefits />
    </>
  )
}

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { InteractiveLink } from '../../../components/ui/InteractiveLink'

export function ExploreRecipeLink() {
  return (
    /* Mockup Link */
    <InteractiveLink
      text="Explore recipes"
      href="/explore"
      icon={<ArrowForwardIcon fontSize="inherit" />}
    />
  )
}

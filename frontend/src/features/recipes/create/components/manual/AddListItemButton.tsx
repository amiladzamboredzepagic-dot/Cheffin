import { Plus } from 'lucide-react'
import { ManualTextButton } from '../WriteYourOwnRecipe.styles'

interface AddListItemButtonProps {
  label: string
  onClick: () => void
}

export function AddListItemButton({
  label,
  onClick,
}: AddListItemButtonProps) {
  return (
    <ManualTextButton type="button" onClick={onClick}>
      <Plus size={13} aria-hidden="true" />
      {label}
    </ManualTextButton>
  )
}

import { IconButton } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppMenu, AppMenuItem } from '../../../components/ui/menus/AppMenu'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'

interface MyRecipeActionsMenuProps {
  recipe: MyRecipe
  disabled: boolean
  onPublish: (recipeId: string) => void
}

export function MyRecipeActionsMenu({
  recipe,
  disabled,
  onPublish,
}: MyRecipeActionsMenuProps) {
  const { t } = useTranslation()
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)
  const menuId = `recipe-actions-${recipe.id}`
  const menuLabel = t('library.recipeActions', { title: recipe.title })

  return (
    <>
      <IconButton
        aria-label={menuLabel}
        aria-controls={menuAnchor ? menuId : undefined}
        aria-haspopup="menu"
        aria-expanded={Boolean(menuAnchor)}
        disabled={disabled}
        onClick={(event) => setMenuAnchor(event.currentTarget)}
        size="small"
      >
        <MoreHorizontal size={18} aria-hidden="true" />
      </IconButton>
      <AppMenu
        id={menuId}
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        ariaLabel={menuLabel}
      >
        <AppMenuItem
          disabled={disabled}
          aria-label={t('library.publishRecipe', { title: recipe.title })}
          onClick={() => {
            setMenuAnchor(null)
            onPublish(recipe.id)
          }}
        >
          {t('library.publish')}
        </AppMenuItem>
      </AppMenu>
    </>
  )
}

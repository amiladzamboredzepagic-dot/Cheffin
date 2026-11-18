import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import { MoreHorizontal, Pencil, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../components/ui/layout/Flex'
import { AppMenu, AppMenuItem } from '../../../components/ui/menus/AppMenu'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'

interface MyRecipeActionsMenuProps {
  recipe: MyRecipe
  disabled: boolean
  onPublish: (recipeId: string) => void
  onEdit: (recipeId: string) => void
  onDelete: (recipe: MyRecipe) => void
}

export function MyRecipeActionsMenu({
  recipe,
  disabled,
  onPublish,
  onEdit,
  onDelete,
}: MyRecipeActionsMenuProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)
  const menuId = `recipe-actions-${recipe.id}`
  const menuLabel = t('library.recipeActions', { title: recipe.title })
  const itemContent = (icon: ReactNode, label: string) => (
    <Flex
      component="span"
      align="center"
      justify={isMobile ? 'center' : 'flex-start'}
      gap={1.25}
      sx={{ width: '100%' }}
    >
      {icon}
      {!isMobile && <span>{label}</span>}
    </Flex>
  )

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
        minWidth={isMobile ? 64 : 180}
      >
        <AppMenuItem
          disabled={disabled}
          aria-label={t('library.editRecipe', { title: recipe.title })}
          title={t('library.editRecipe', { title: recipe.title })}
          sx={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
          onClick={() => {
            setMenuAnchor(null)
            onEdit(recipe.id)
          }}
        >
          {itemContent(
            <Pencil size={16} aria-hidden="true" />,
            t('library.edit'),
          )}
        </AppMenuItem>
        <AppMenuItem
          disabled={disabled}
          aria-label={t('library.deleteRecipe', { title: recipe.title })}
          title={t('library.deleteRecipe', { title: recipe.title })}
          sx={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
          onClick={() => {
            setMenuAnchor(null)
            onDelete(recipe)
          }}
        >
          {itemContent(
            <Trash2 size={16} aria-hidden="true" />,
            t('library.delete'),
          )}
        </AppMenuItem>
        {recipe.isPrivate && (
          <AppMenuItem
            disabled={disabled}
            aria-label={t('library.publishRecipe', { title: recipe.title })}
            title={t('library.publishRecipe', { title: recipe.title })}
            sx={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
            onClick={() => {
              setMenuAnchor(null)
              onPublish(recipe.id)
            }}
          >
            {itemContent(
              <Send size={16} aria-hidden="true" />,
              t('library.publish'),
            )}
          </AppMenuItem>
        )}
      </AppMenu>
    </>
  )
}

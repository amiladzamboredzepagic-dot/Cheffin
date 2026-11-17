import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { RecipeSourceChip } from '../../../components/ui/chips/RecipeSourceChip'
import { Flex } from '../../../components/ui/layout/Flex'
import { Description } from '../../../components/ui/typography/Description'
import { getRecipeAttributeTagKeys } from '../../discovery/recipeTags'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'
import { MyRecipeActionsMenu } from './MyRecipeActionsMenu'

interface MyRecipeCardProps {
  recipe: MyRecipe
  isInCollection: boolean
  publishing: boolean
  onPublish: (recipeId: string) => void
}

export function MyRecipeCard({
  recipe,
  isInCollection,
  publishing,
  onPublish,
}: MyRecipeCardProps) {
  const { t } = useTranslation()

  return (
    <Box>
      <RecipeCard
        title={recipe.title}
        imageUrl={
          recipe.photoBase64 && recipe.photoContentType
            ? `data:${recipe.photoContentType};base64,${recipe.photoBase64}`
            : ''
        }
        imageAlt={recipe.title}
        tag={
          getRecipeAttributeTagKeys(recipe)
            .map((key) => t(key))
            .join(' · ') || undefined
        }
        metadata={t('library.recipeMetadata', {
          minutes: recipe.prepTimeMinutes,
          count: recipe.servings,
        })}
        context={recipe.description}
        showSaveButton={false}
      />
      <Flex align="center" justify="space-between" gap={1} sx={{ mt: 1 }}>
        <Flex align="center" gap={1}>
          <Description>
            {t(recipe.isPrivate ? 'library.draft' : 'library.published')}
          </Description>
          {isInCollection && (
            <RecipeSourceChip label={t('library.yourRecipe')} />
          )}
        </Flex>
        {recipe.isPrivate && (
          <MyRecipeActionsMenu
            recipe={recipe}
            disabled={publishing}
            onPublish={onPublish}
          />
        )}
      </Flex>
    </Box>
  )
}

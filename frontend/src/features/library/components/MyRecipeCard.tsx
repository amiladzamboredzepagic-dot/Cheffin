import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { Flex } from '../../../components/ui/layout/Flex'
import { Description } from '../../../components/ui/typography/Description'
import type { MyRecipe } from '../hooks/useMyRecipesQuery'

interface MyRecipeCardProps {
  recipe: MyRecipe
  publishing: boolean
  onPublish: (recipeId: string) => void
}

export function MyRecipeCard({
  recipe,
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
        metadata={t('library.recipeMetadata', {
          minutes: recipe.prepTimeMinutes,
          count: recipe.servings,
        })}
        context={recipe.description}
        showSaveButton={false}
      />
      <Flex align="center" justify="space-between" gap={1} sx={{ mt: 1 }}>
        <Description>
          {t(recipe.isPrivate ? 'library.draft' : 'library.published')}
        </Description>
        {recipe.isPrivate && (
          <ActionButton
            text={t('library.publish')}
            aria-label={t('library.publishRecipe', { title: recipe.title })}
            disabled={publishing}
            onClick={() => onPublish(recipe.id)}
          />
        )}
      </Flex>
    </Box>
  )
}

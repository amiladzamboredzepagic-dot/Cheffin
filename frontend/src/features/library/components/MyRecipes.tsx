import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../../components/RecipeCard'
import { Description } from '../../../components/ui/typography/Description'
import { RecipeGrid } from '../LibraryPage.styles'

interface MyRecipe {
  id: string
  title: string
  description: string
  prepTimeMinutes: number
  servings: number
  photoContentType: string | null
  photoBase64: string | null
}

const MY_RECIPES = gql`
  query MyRecipes {
    myRecipes {
      id
      title
      description
      prepTimeMinutes
      servings
      photoContentType
      photoBase64
    }
  }
` as TypedDocumentNode<{ myRecipes: MyRecipe[] }>

export function MyRecipes() {
  const { t } = useTranslation()
  const { data, loading, error } = useQuery(MY_RECIPES, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <Description>{t('library.loadingRecipes')}</Description>
  if (error) return <Alert severity="error">{t('library.recipesError')}</Alert>
  if (!data) return <Alert severity="error">{t('library.recipesError')}</Alert>
  if (data.myRecipes.length === 0)
    return <Description>{t('library.noRecipes')}</Description>

  return (
    <RecipeGrid>
      {data.myRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
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
      ))}
    </RecipeGrid>
  )
}

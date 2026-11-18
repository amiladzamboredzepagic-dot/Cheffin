import { Alert } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../../../components/ui/feedback/Loading'
import { InteractiveLink } from '../../../components/ui/links/InteractiveLink'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { LIBRARY_ROUTES } from '../../library/LibraryRoutes'
import { useMyRecipesQuery } from '../../library/hooks/useMyRecipesQuery'
import { CreateRecipePage as Page } from '../create/RecipeCreatePage.styles'
import { WriteYourOwnRecipe } from '../create/components/WriteYourOwnRecipe'
import type { MyRecipe } from '../../library/hooks/useMyRecipesQuery'

interface RecipeEditPageLocationState {
  returnTo?: unknown
}

interface RecipeEditorProps {
  recipe: MyRecipe
  returnTo: string
}

function RecipeEditor({ recipe, returnTo }: RecipeEditorProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    recipe.collectionId ?? '',
  )

  return (
    <Page aria-labelledby="edit-recipe-heading">
      <InteractiveLink
        text={t('recipeCreate.back')}
        href={returnTo}
        icon={<ArrowLeft size={15} />}
        iconPosition="start"
        sx={{ fontSize: 12, lineHeight: '15px' }}
      />
      <SectionIntroduction
        eyebrow={t('recipeCreate.editEyebrow')}
        title={t('recipeCreate.editPageTitle')}
        titleId="edit-recipe-heading"
        titleLevel="h1"
        description={t('recipeCreate.editPageDescription')}
      />
      <WriteYourOwnRecipe
        initialRecipe={recipe}
        selectedCollectionId={selectedCollectionId}
        onCollectionChange={setSelectedCollectionId}
        onEditComplete={() => navigate(returnTo, { replace: true })}
      />
    </Page>
  )
}

export function RecipeEditPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const { recipeId } = useParams()
  const { recipes, loading, error } = useMyRecipesQuery()
  const state = location.state as RecipeEditPageLocationState | null
  const returnTo =
    typeof state?.returnTo === 'string' &&
    state.returnTo.startsWith(LIBRARY_ROUTES.BASE)
      ? state.returnTo
      : LIBRARY_ROUTES.MY_RECIPES

  if (loading) {
    return <Loading label={t('library.loadingRecipes')} />
  }
  if (error || !recipes) {
    return <Alert severity="error">{t('library.recipesError')}</Alert>
  }

  const recipe = recipes.find((item) => item.id === recipeId)
  if (!recipe) {
    return <Alert severity="error">{t('library.recipeNotFound')}</Alert>
  }

  return <RecipeEditor recipe={recipe} returnTo={returnTo} />
}

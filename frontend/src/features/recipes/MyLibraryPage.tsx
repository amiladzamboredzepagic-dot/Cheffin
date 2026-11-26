import { Box, Typography, styled } from '@mui/material'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../components/RecipeCard'
import { FeedbackSnackbar } from '../../components/ui/feedback/FeedbackSnackbar'
import { Loading } from '../../components/ui/feedback/Loading'
import { StatusAlert } from '../../components/ui/feedback/StatusAlert'
import { SectionIntroduction } from '../../components/ui/layout/SectionIntroduction'
import { Flex } from '../../components/ui/layout/Flex'
import { MY_RECIPES, type MyRecipesData } from './recipes.graphql'

const LibraryPageRoot = styled('main')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 'calc(100vh - 112px)',
  padding: theme.spacing(5, 8, 6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 4, 5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2, 4),
  },
}))

const RecipeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}))

const RecipeDetails = styled('details')(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.input,
  '& summary': {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

interface LibraryLocationState {
  recipeSaved?: boolean
}

export function MyLibraryPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const [savedNoticeOpen, setSavedNoticeOpen] = useState(
    Boolean((location.state as LibraryLocationState | null)?.recipeSaved),
  )
  const { data, loading, error } = useQuery<MyRecipesData>(MY_RECIPES, {
    fetchPolicy: 'network-only',
  })

  return (
    <LibraryPageRoot aria-labelledby="my-library-heading">
      <SectionIntroduction
        eyebrow={t('navigation.myLibrary')}
        title={t('myLibrary.title')}
        titleId="my-library-heading"
        titleLevel="h1"
        description={t('myLibrary.description')}
      />

      {loading && (
        <Flex direction="row" align="center" gap={1} sx={{ mt: 4 }}>
          <Loading label={t('myLibrary.loading')} />
          <Typography>{t('myLibrary.loading')}</Typography>
        </Flex>
      )}
      {error && (
        <StatusAlert severity="error" sx={{ mt: 4 }}>
          {error.message}
        </StatusAlert>
      )}
      {!loading && !error && data?.myRecipes.length === 0 && (
        <Typography sx={{ mt: 4 }}>{t('myLibrary.empty')}</Typography>
      )}
      {!loading && !error && data && data.myRecipes.length > 0 && (
        <RecipeGrid sx={{ mt: 4 }}>
          {data.myRecipes.map((recipe) => {
            const metadata = [
              recipe.prepTimeMinutes !== null
                ? t('recipeCreate.prepTime', {
                    minutes: recipe.prepTimeMinutes,
                  })
                : null,
              recipe.calories !== null
                ? t('recipeCreate.calorieCount', {
                    calories: recipe.calories,
                  })
                : null,
            ]
              .filter(Boolean)
              .join(' · ')

            return (
              <Flex
                key={recipe.id}
                direction="column"
                align="stretch"
                gap={1.5}
              >
                <RecipeCard
                  title={recipe.title}
                  imageUrl={recipe.imageUrl}
                  imageAlt={recipe.title}
                  metadata={metadata}
                  context={recipe.description}
                  tag={recipe.tags[0]}
                  saved
                  showSaveButton={false}
                />
                <RecipeDetails>
                  <summary>{t('myLibrary.viewDetails')}</summary>
                  <Typography variant="subtitle2" sx={{ mt: 1.5 }}>
                    {t('recipeCreate.ingredients')}
                  </Typography>
                  <Box component="ul" sx={{ mt: 0.5, pl: 2.5 }}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <Typography
                        component="li"
                        variant="body2"
                        key={`${index}-${ingredient}`}
                      >
                        {ingredient}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="subtitle2">
                    {t('recipeCreate.instructions')}
                  </Typography>
                  <Box component="ol" sx={{ mt: 0.5, pl: 2.5 }}>
                    {recipe.instructions.map((instruction, index) => (
                      <Typography
                        component="li"
                        variant="body2"
                        key={`${index}-${instruction}`}
                      >
                        {instruction}
                      </Typography>
                    ))}
                  </Box>
                  {recipe.sourceUrl.trim() !== '' && (
                    <Typography
                      component="a"
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="caption"
                    >
                      {t('recipeCreate.videoSource')}
                    </Typography>
                  )}
                </RecipeDetails>
              </Flex>
            )
          })}
        </RecipeGrid>
      )}

      <FeedbackSnackbar
        open={savedNoticeOpen}
        severity="success"
        message={t('myLibrary.saved')}
        onClose={() => setSavedNoticeOpen(false)}
      />
    </LibraryPageRoot>
  )
}

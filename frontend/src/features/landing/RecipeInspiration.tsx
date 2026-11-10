import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Typography, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from '../../components/RecipeCard'
import { Flex } from '../../components/ui/Flex'
import { InteractiveLink } from '../../components/ui/InteractiveLink'
import { INSPIRATION_RECIPES } from '../recipes/recipes.data'

const Section = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 510,
  padding: theme.spacing(6, 8),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    padding: theme.spacing(4, 2.5),
  },
}))

const SectionHeader = styled(Flex)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}))

const SectionEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '1.7px',
  lineHeight: 1.6,
  textTransform: 'uppercase',
}))

const SectionTitle = styled('h2')(({ theme }) => ({
  margin: `${theme.spacing(0.75)} 0 0`,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 35,
  fontWeight: 500,
  lineHeight: 1.18,
  [theme.breakpoints.down('md')]: {
    fontSize: 30,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 27,
  },
}))

const RecipeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(3.5),
  },
}))

export function RecipeInspiration() {
  const { t } = useTranslation()

  return (
    <Section id="recipe-inspiration" aria-labelledby="recipe-inspiration-title">
      <SectionHeader direction="row" align="center" justify="space-between">
        <Box>
          <SectionEyebrow>{t('recipeInspiration.eyebrow')}</SectionEyebrow>
          <SectionTitle id="recipe-inspiration-title">
            {t('recipeInspiration.title')}
          </SectionTitle>
        </Box>
        <InteractiveLink
          text={t('recipeInspiration.exploreAll')}
          href="/explore"
          icon={<ArrowForwardIcon fontSize="inherit" />}
        />
      </SectionHeader>

      <RecipeGrid>
        {INSPIRATION_RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.inspirationOrder}
            title={t(recipe.titleKey)}
            imageUrl={recipe.imageUrl}
            imageAlt={t(recipe.imageAltKey)}
            metadata={t('recipeInspiration.metadata', {
              minutes: recipe.minutes,
              calories: recipe.calories,
            })}
            tag={t(recipe.tagKey)}
            variant="inspiration"
            showSaveButton={false}
          />
        ))}
      </RecipeGrid>
    </Section>
  )
}

import { Box, styled } from '@mui/material'
import { RecipeCard } from '../../components/RecipeCard'
import { MOCK_RECIPES } from './recipes.data'

const Gallery = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6, 2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2),
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: theme.spacing(8),
  },
}))

const RecipeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4, 3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}))

export function RecipeGallery() {
  return (
    <Gallery as="section" aria-labelledby="recipe-gallery-heading">
      <RecipeGrid>
        {MOCK_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.title} {...recipe} />
        ))}
      </RecipeGrid>
    </Gallery>
  )
}

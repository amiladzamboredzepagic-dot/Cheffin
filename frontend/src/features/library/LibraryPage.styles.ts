import { styled } from '@mui/material'

export const Workspace = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '236px minmax(0, 1fr)',
  gap: 36,
  marginTop: 32,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: 24,
  },
}))

export const Sidebar = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 25,
  color: theme.palette.text.label,
}))

export const SidebarCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: 18,
  borderRadius: 14,
  backgroundColor: theme.palette.background.planner,
}))

export const Content = styled('div')({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
})

export const SectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 25,
  fontWeight: 500,
  letterSpacing: '-0.5px',
}))

export const CollectionGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 20,
  marginTop: 17,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}))

export const RecipeGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}))

export const CollectionCard = styled('article')(({ theme }) => ({
  minHeight: 150,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: 20,
  borderRadius: 14,
  backgroundColor: theme.palette.background.secondary,
  color: theme.palette.text.label,
  overflowWrap: 'anywhere',
}))

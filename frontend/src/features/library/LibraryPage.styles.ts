import { styled } from '@mui/material'

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
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 14,
  marginTop: 17,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
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

export const CollectionCard = styled('button')(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 0,
  padding: 0,
  borderRadius: 12,
  backgroundColor: theme.palette.background.input,
  color: theme.palette.text.label,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.secondary,
    '& img': {
      transform: 'scale(1.03)',
    },
  },
  '&:hover .collection-card-action': {
    opacity: 1,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  '&:focus-visible .collection-card-action': {
    opacity: 1,
  },
}))

export const CollectionPhoto = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 132,
  objectFit: 'cover',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.short,
  }),
}))

export const CollectionDetails = styled('span')({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 5,
  padding: '10px 12px 12px',
})

export const CollectionTitle = styled('span')(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.label,
  fontFamily: theme.typography.fontFamilySerif,
  fontSize: 17,
  fontWeight: 400,
  lineHeight: 1.2,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
}))

export const CollectionMetadata = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 11,
  fontWeight: 400,
  lineHeight: '13px',
}))

export const CollectionAction = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 10,
  fontWeight: 600,
  lineHeight: '13px',
  opacity: 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

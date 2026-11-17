import { styled } from '@mui/material'

export const Introduction = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))

export const Categories = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  margin: theme.spacing(2.5, 0, 3),
}))

export const Category = styled('button')(({ theme }) => ({
  padding: '10px 24px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 24,
  backgroundColor: theme.palette.background.input,
  color: theme.palette.primary.light,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  cursor: 'pointer',
  '&[aria-pressed="true"]': {
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}))

export const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  minHeight: 40,
  marginBottom: 10,
  '& h2': {
    margin: 0,
    fontSize: theme.typography.pxToRem(21),
  },
}))

export const FilterHeader = styled(SectionHeader)(({ theme }) => ({
  '& h2': { fontSize: theme.typography.pxToRem(18) },
}))

export const ResetButton = styled('button')(({ theme }) => ({
  padding: 0,
  border: 0,
  background: 'none',
  color: theme.palette.primary.light,
  font: 'inherit',
  fontSize: theme.typography.pxToRem(12),
  cursor: 'pointer',
}))

export const FilterPanel = styled('div')(({ theme }) => ({
  padding: 18,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  backgroundColor: theme.palette.background.input,
  '& fieldset': { border: 0, padding: 0, margin: '0 0 16px' },
  '& fieldset:last-child': { marginBottom: 0 },
  '& fieldset + fieldset': {
    paddingTop: 16,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& legend': {
    padding: 0,
    marginBottom: 12,
    color: theme.palette.highlight,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
  },
  '& label': {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 9,
    fontSize: theme.typography.pxToRem(12),
    cursor: 'pointer',
  },
  '& input': { margin: 0, accentColor: theme.palette.primary.light },
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
    '& fieldset + fieldset': { paddingTop: 0, borderTop: 0 },
  },
}))

export const ResultsHeader = styled(SectionHeader)(({ theme }) => ({
  '& > div:first-of-type': {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 16,
  },
  '& p': { fontSize: theme.typography.pxToRem(12) },
}))

export const RecipeGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 24,
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: { gridTemplateColumns: 'minmax(0, 1fr)' },
}))

import { Box, ButtonBase, Typography, styled } from '@mui/material'
import { Flex } from '../../../../components/ui/layout/Flex'

export const ManualRecipeLayout = styled(Flex)({
  width: '100%',
  '& .MuiFormControl-root': {
    width: '100%',
    maxWidth: 'none',
  },
})

export const ManualRecipeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.25fr) minmax(300px, 0.7fr)',
  alignItems: 'start',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}))

export const ManualRecipeColumn = styled(Flex)({
  minWidth: 0,
})

export const ManualRecipePanel = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  minWidth: 0,
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 15,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))

export const ManualSectionHeading = styled(Flex)({})

export const ManualSectionNumber = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.highlight,
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightMedium,
}))

export const ManualSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: theme.typography.pxToRem(21),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.3,
}))

export const ManualSectionHint = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: 1.5,
}))

export const ManualFieldLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: '15px',
}))

export const ManualListRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 32px',
  alignItems: 'center',
  gap: theme.spacing(0.75),
}))

export const ManualTextArea = styled('textarea')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 58,
  padding: theme.spacing(1.25),
  resize: 'vertical',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 9,
  outline: 'none',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.input,
  font: `400 ${theme.typography.pxToRem(12)}/1.5 ${theme.typography.fontFamily}`,
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '&:focus-visible': {
    borderColor: theme.palette.primary.light,
  },
}))

export const ManualTextInput = styled('input')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  height: 40,
  padding: theme.spacing(0, 1.25),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 9,
  outline: 'none',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.input,
  font: `400 ${theme.typography.pxToRem(12)} ${theme.typography.fontFamily}`,
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '&:focus-visible': {
    borderColor: theme.palette.primary.light,
  },
}))

export const ManualTextButton = styled('button')(({ theme }) => ({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: 0,
  border: 0,
  color: theme.palette.primary.light,
  background: 'none',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightMedium,
  cursor: 'pointer',
}))

export const ManualIconButton = styled(ButtonBase)(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  width: 30,
  height: 30,
  borderRadius: 7,
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.light,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
  },
}))

export const ManualPhotoDrop = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  minHeight: 118,
  padding: theme.spacing(2),
  overflow: 'hidden',
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: 10,
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  cursor: 'pointer',
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: 2,
  },
}))

export const ManualPhotoPreview = styled('img')({
  display: 'block',
  width: '100%',
  maxHeight: 180,
  borderRadius: 8,
  objectFit: 'cover',
})

export const ManualPhotoActions = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(1),
}))

export const ManualPhotoAction = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  minHeight: 38,
  padding: theme.spacing(0.75),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.background.paper,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightMedium,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.light}`,
  },
}))

export const ManualHiddenFileInput = styled('input')({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  clipPath: 'inset(50%)',
})

export const ManualDetailsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing(1.25),
}))

export const ManualMealTypes = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: theme.spacing(0.75),
}))

export const ManualMealTypeButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  minHeight: 35,
  padding: theme.spacing(0.5),
  border: `1px solid ${selected ? theme.palette.primary.light : theme.palette.divider}`,
  borderRadius: 100,
  color: selected ? theme.palette.primary.light : theme.palette.text.secondary,
  backgroundColor: selected
    ? theme.palette.background.planner
    : theme.palette.background.paper,
  fontSize: theme.typography.pxToRem(10),
  lineHeight: 1.2,
}))

export const ManualCookbookNote = styled(Flex)(({ theme }) => ({
  padding: theme.spacing(0.5, 1.75),
}))

export const ManualNoteTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: theme.typography.pxToRem(18),
  lineHeight: 1.3,
}))

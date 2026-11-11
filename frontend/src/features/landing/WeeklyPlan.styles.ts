import { Box, Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'
export {
  SplitSection as WeeklyPlanSection,
  SplitSectionCopy as WeeklyPlanCopy,
  SplitSectionDescription as WeeklyPlanDescription,
  SplitSectionEyebrow as WeeklyPlanEyebrow,
  SplitSectionHeading as WeeklyPlanHeading,
  SplitSectionLink as WeeklyPlanLink,
} from './LandingSplitSection.styles'

export const WeeklyPlanLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 540fr) minmax(0, 640fr)',
  alignItems: 'center',
  gap: 'clamp(32px, 9.167vw, 132px)',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(4),
  },
}))

export const PlannerPreview = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: 358,
  padding: theme.spacing(2.5, 3),
  borderRadius: 18,
  backgroundColor: theme.palette.background.planner,
  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    padding: theme.spacing(2),
    borderRadius: 14,
  },
}))

export const PlannerTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 21,
  fontWeight: 400,
  lineHeight: 1.2,
}))

export const DaysGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: 5,
  width: '100%',
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    gap: 3,
  },
}))

export const DayColumn = styled(Flex)({
  minWidth: 0,
})

export const DayHeader = styled(Flex, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 28,
  padding: '4px 5px',
  borderRadius: 4,
  color: selected
    ? theme.palette.primary.contrastText
    : theme.palette.text.label,
  backgroundColor: selected
    ? theme.palette.primary.light
    : theme.palette.background.secondary,
}))

export const DayName = styled(Typography)({
  fontSize: 5.5,
  fontWeight: 500,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
})

export const DaySelectedLabel = styled(Typography)({
  marginTop: 1,
  fontSize: 3.6,
  fontWeight: 600,
  letterSpacing: '0.36px',
  lineHeight: 1.1,
  textTransform: 'uppercase',
})

export const DayDate = styled(Typography)({
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1,
})

export const MealSlot = styled(Flex, {
  shouldForwardProp: (prop) => prop !== 'planned',
})<{ planned?: boolean }>(({ theme, planned }) => ({
  boxSizing: 'border-box',
  width: '100%',
  height: 79,
  minWidth: 0,
  padding: 5,
  overflow: 'hidden',
  border: `1px solid ${
    planned ? theme.palette.divider : theme.palette.background.mealSlot
  }`,
  borderRadius: 4,
  backgroundColor: planned
    ? theme.palette.background.input
    : theme.palette.background.mealSlot,
  [theme.breakpoints.down('sm')]: {
    height: 72,
    padding: 3,
  },
}))

export const MealType = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 4.1,
  fontWeight: 600,
  letterSpacing: '0.25px',
  lineHeight: 1.2,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
}))

export const MealImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 29,
  objectFit: 'cover',
  borderRadius: 3,
  backgroundColor: theme.palette.background.secondary,
}))

export const MealName = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  color: theme.palette.text.label,
  fontSize: 5.5,
  fontWeight: 600,
  lineHeight: 1.3,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
}))

export const MealMetadata = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  fontSize: 4,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const AddMeal = styled(Flex)(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.secondary,
  fontSize: 4.5,
  lineHeight: 1.2,
}))

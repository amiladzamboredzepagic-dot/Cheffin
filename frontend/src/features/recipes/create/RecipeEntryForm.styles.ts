import { styled } from '@mui/material'
import { Flex } from '../../../components/ui/layout/Flex'

export const RecipeEntryForm = styled(Flex)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(1),
  '& .MuiFormControl-root': {
    width: '100%',
    maxWidth: 'none',
  },
}))

export const FormSectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 23,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: '29px',
}))

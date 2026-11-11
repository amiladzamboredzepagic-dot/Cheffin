import { BookmarkPlus } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../../components/ui/actions/ActionButton'
import { FormTextField } from '../../../../components/ui/forms/FormTextField'
import { RecipeEntryForm } from '../RecipeEntryForm.styles'
import { RecipeCollectionField } from './RecipeEntryFields'

interface PencilModeProps {
  recipeTitle: string
  recipeNotes: string
  onRecipeTitleChange: (value: string) => void
  onRecipeNotesChange: (value: string) => void
  onSubmit: () => void
}

export function PencilMode({
  recipeTitle,
  recipeNotes,
  onRecipeTitleChange,
  onRecipeNotesChange,
  onSubmit,
}: PencilModeProps) {
  const { t } = useTranslation()

  return (
    <RecipeEntryForm
      component="form"
      direction="column"
      align="stretch"
      onSubmit={(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <FormTextField
        label={t('recipeCreate.manualTitleLabel')}
        placeholder={t('recipeCreate.manualTitlePlaceholder')}
        value={recipeTitle}
        onChange={(event) => onRecipeTitleChange(event.target.value)}
        required
      />
      <FormTextField
        label={t('recipeCreate.manualNotesLabel')}
        placeholder={t('recipeCreate.manualNotesPlaceholder')}
        value={recipeNotes}
        onChange={(event) => onRecipeNotesChange(event.target.value)}
        multiline
        minRows={4}
      />
      <RecipeCollectionField />
      <ActionButton
        type="submit"
        text={
          <>
            <BookmarkPlus size={18} aria-hidden="true" />
            {t('recipeCreate.saveAction')}
          </>
        }
        sx={{
          gap: 1,
        }}
      />
    </RecipeEntryForm>
  )
}

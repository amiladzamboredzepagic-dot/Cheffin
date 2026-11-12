import { ArrowDownToLine, BookmarkPlus, Link } from 'lucide-react'
import { useTheme } from '@mui/material'
import type { SubmitEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../../components/ui/actions/ActionButton'
import { Flex } from '../../../../components/ui/layout/Flex'
import { FormDivider } from '../../../../components/ui/forms/FormDivider'
import { FormTextField } from '../../../../components/ui/forms/FormTextField'
import { FormSectionTitle, RecipeEntryForm } from '../RecipeEntryForm.styles'
import { ImportGuidance } from '../RecipeCreatePage.styles'
import { WriteYourOwnRecipePrompt } from './WriteYourOwnRecipePrompt'
import { RecipeCollectionField } from './RecipeEntryFields'
import { RecipeTagsEditor } from './RecipeTagsEditor'

interface LinkModeProps {
  recipeUrl: string
  tags: string[]
  selectedCollectionId: string
  onCollectionChange: (collectionId: string) => void
  onRecipeUrlChange: (value: string) => void
  onRemoveTag: (tag: string) => void
  onAddTag: (tag: string) => boolean
  onShowUnavailable: () => void
  onRequestPencilMode: () => void
}

interface ActionButtonConfig {
  icon: React.ReactNode
  label: string
  type: 'submit' | 'button'
  onClick?: () => void
  backgroundColor?: string
  textColor?: string
  border?: string
  hoverShadow?: boolean
}

function getActionButton(config: ActionButtonConfig) {
  return (
    <ActionButton
      type={config.type}
      onClick={config.onClick}
      text={
        <>
          {config.icon}
          {config.label}
        </>
      }
      backgroundColor={config.backgroundColor}
      textColor={config.textColor}
      border={config.border}
      hoverShadow={config.hoverShadow}
      sx={{
        gap: 1,
      }}
    />
  )
}

export function LinkMode({
  recipeUrl,
  tags,
  selectedCollectionId,
  onCollectionChange,
  onRecipeUrlChange,
  onRemoveTag,
  onAddTag,
  onShowUnavailable,
  onRequestPencilMode,
}: LinkModeProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const importButtonConfig: ActionButtonConfig = {
    icon: <ArrowDownToLine size={18} aria-hidden="true" />,
    label: t('recipeCreate.importAction'),
    type: 'submit',
    backgroundColor: theme.palette.background.input,
    textColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.divider}`,
    hoverShadow: false,
  }

  const saveButtonConfig: ActionButtonConfig = {
    icon: <BookmarkPlus size={18} aria-hidden="true" />,
    label: t('recipeCreate.saveAction'),
    type: 'button',
    onClick: onShowUnavailable,
  }

  return (
    <RecipeEntryForm
      component="form"
      direction="column"
      align="stretch"
      onSubmit={(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        onShowUnavailable()
      }}
    >
      <FormTextField
        label={t('recipeCreate.urlLabel')}
        placeholder={t('recipeCreate.urlPlaceholder')}
        value={recipeUrl}
        onChange={(event) => onRecipeUrlChange(event.target.value)}
        startAdornment={<Link />}
        type="url"
      />
      {getActionButton(importButtonConfig)}
      <ImportGuidance>{t('recipeCreate.importGuidance')}</ImportGuidance>

      <FormDivider />

      <Flex direction="column" align="stretch" gap={2.5}>
        <FormSectionTitle>{t('recipeCreate.organizeTitle')}</FormSectionTitle>
        <RecipeCollectionField
          value={selectedCollectionId}
          onChange={onCollectionChange}
        />
        <RecipeTagsEditor
          tags={tags}
          onRemoveTag={onRemoveTag}
          onAddTag={onAddTag}
        />
      </Flex>

      {getActionButton(saveButtonConfig)}
      <WriteYourOwnRecipePrompt onClick={onRequestPencilMode} />
    </RecipeEntryForm>
  )
}

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

interface LinkModeProps {
  recipeUrl: string
  selectedCollectionId: string
  onCollectionChange: (collectionId: string) => void
  isImporting: boolean
  isSaving: boolean
  canSave: boolean
  canImport: boolean
  onRecipeUrlChange: (value: string) => void
  onImport: (url: string) => void
  onSave: () => void
  onRequestPencilMode: () => void
}

interface ActionButtonConfig {
  icon: React.ReactNode
  label: string
  type: 'submit' | 'button'
  onClick?: () => void
  disabled?: boolean
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
      disabled={config.disabled}
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
  selectedCollectionId,
  onCollectionChange,
  isImporting,
  isSaving,
  canSave,
  canImport,
  onRecipeUrlChange,
  onImport,
  onSave,
  onRequestPencilMode,
}: LinkModeProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const importButtonConfig: ActionButtonConfig = {
    icon: <ArrowDownToLine size={18} aria-hidden="true" />,
    label: isImporting
      ? t('recipeCreate.importing')
      : t('recipeCreate.importAction'),
    type: 'submit',
    backgroundColor: theme.palette.background.input,
    textColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.divider}`,
    hoverShadow: false,
    disabled: isImporting || !canImport,
  }

  const saveButtonConfig: ActionButtonConfig = {
    icon: <BookmarkPlus size={18} aria-hidden="true" />,
    label: isSaving ? t('recipeCreate.saving') : t('recipeCreate.saveAction'),
    type: 'button',
    onClick: onSave,
    disabled: !canSave || isSaving,
  }

  return (
    <RecipeEntryForm
      component="form"
      direction="column"
      align="stretch"
      onSubmit={(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!canImport) return
        onImport(recipeUrl)
      }}
    >
      <FormTextField
        label={t('recipeCreate.urlLabel')}
        placeholder={t('recipeCreate.urlPlaceholder')}
        value={recipeUrl}
        onChange={(event) => onRecipeUrlChange(event.target.value)}
        startAdornment={<Link />}
        type="url"
        required
      />
      {getActionButton(importButtonConfig)}
      <ImportGuidance>{t('recipeCreate.importGuidance')}</ImportGuidance>
      {!canImport && (
        <ImportGuidance>{t('recipeCreate.finishDraftBeforeImport')}</ImportGuidance>
      )}

      <FormDivider />

      <Flex direction="column" align="stretch" gap={2.5}>
        <FormSectionTitle>{t('recipeCreate.organizeTitle')}</FormSectionTitle>
        <RecipeCollectionField
          value={selectedCollectionId}
          onChange={onCollectionChange}
        />
      </Flex>

      {getActionButton(saveButtonConfig)}
      <WriteYourOwnRecipePrompt onClick={onRequestPencilMode} />
    </RecipeEntryForm>
  )
}

import { IconButton } from '@mui/material'
import { Plus, X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../../components/ui/layout/Flex'
import {
  ImportGuidance,
  RecipeTag,
} from '../RecipeCreatePage.styles'

interface RecipeTagsEditorProps {
  tags: string[]
  onRemoveTag: (tag: string) => void
  onAddTag: (tag: string) => boolean
}

export function RecipeTagsEditor({
  tags,
  onRemoveTag,
  onAddTag,
}: RecipeTagsEditorProps) {
  const { t } = useTranslation()
  const [tagInput, setTagInput] = useState('')

  const translatedTag = (tag: string) =>
    t(`recipeCreate.tags.${tag}`, { defaultValue: tag })

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && onAddTag(tag)) {
      setTagInput('')
    }
  }

  const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag()
    }
  }

  return (
    <Flex direction="row" align="center" wrap="wrap" gap={1.25}>
      <ImportGuidance>{t('recipeCreate.tagsLabel')}</ImportGuidance>
      {tags.map((tag) => (
        <RecipeTag key={tag} direction="row" align="center" gap={0.75}>
          <IconButton
            aria-label={t('recipeCreate.removeTag', {
              tag: translatedTag(tag),
            })}
            size="small"
            onClick={() => onRemoveTag(tag)}
            sx={{ p: 0, color: 'inherit' }}
          >
            <X size={13} aria-hidden="true" />
          </IconButton>
          {translatedTag(tag)}
        </RecipeTag>
      ))}
      <Flex direction="row" align="center" gap={0.5}>
        <input
          aria-label={t('recipeCreate.newTagLabel')}
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={handleTagInputKeyDown}
          placeholder={t('recipeCreate.newTagPlaceholder')}
          style={{
            width: 96,
            border: 0,
            outline: 0,
            color: 'inherit',
            background: 'transparent',
            font: 'inherit',
          }}
        />
        <IconButton
          aria-label={t('recipeCreate.addTag')}
          size="small"
          onClick={addTag}
          sx={{ p: 0, color: 'primary.light' }}
        >
          <Plus size={14} aria-hidden="true" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

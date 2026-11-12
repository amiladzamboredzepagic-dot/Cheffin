import { useState } from 'react'
import { RecipeEntry } from '../RecipeCreatePage.styles'
import { LinkMode } from './LinkMode'
import { RecipeEntryTabs } from './RecipeEntryTabs'
import { ENTRY_MODE, type EntryMode } from './recipeEntryMode'
import { WriteYourOwnRecipe } from './WriteYourOwnRecipe'

const INITIAL_TAGS = ['vegetarian', 'quick']

interface RecipeEntrySectionProps {
  entryMode: EntryMode
  onEntryModeChange: (mode: EntryMode) => void
  onShowUnavailable: () => void
}

export function RecipeEntrySection({
  entryMode,
  onEntryModeChange,
  onShowUnavailable,
}: RecipeEntrySectionProps) {
  const [recipeUrl, setRecipeUrl] = useState('')
  const [tags, setTags] = useState(INITIAL_TAGS)

  const addTag = (tag: string) => {
    if (tags.includes(tag)) {
      return false
    }

    setTags((currentTags) => [...currentTags, tag])
    return true
  }

  return (
    <RecipeEntry direction="column" align="stretch">
      <RecipeEntryTabs
        entryMode={entryMode}
        onEntryModeChange={onEntryModeChange}
      />

      {entryMode === ENTRY_MODE.IMPORT ? (
        <LinkMode
          recipeUrl={recipeUrl}
          tags={tags}
          onRecipeUrlChange={setRecipeUrl}
          onRemoveTag={(tag) =>
            setTags((currentTags) =>
              currentTags.filter((currentTag) => currentTag !== tag),
            )
          }
          onAddTag={addTag}
          onShowUnavailable={onShowUnavailable}
          onRequestPencilMode={() => onEntryModeChange(ENTRY_MODE.MANUAL)}
        />
      ) : (
        <WriteYourOwnRecipe />
      )}
    </RecipeEntry>
  )
}

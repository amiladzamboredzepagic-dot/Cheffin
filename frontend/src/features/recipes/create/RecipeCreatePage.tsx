import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { InteractiveLink } from '../../../components/ui/links/InteractiveLink'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import {
  CreateRecipePage as Page,
  RecipeWorkspace,
} from './RecipeCreatePage.styles'
import { RecipeEntrySection } from './components/RecipeEntrySection'
import { ENTRY_MODE, type EntryMode } from './components/recipeEntryMode'
import { RecipePreviewCard } from './components/RecipePreviewCard'
import type { RecipeDraft } from '../recipes.graphql'

const PAGE_INTRO_KEYS: Record<
  EntryMode,
  { eyebrow: string; title: string; description: string }
> = {
  [ENTRY_MODE.IMPORT]: {
    eyebrow: 'recipeCreate.eyebrow',
    title: 'recipeCreate.title',
    description: 'recipeCreate.description',
  },
  [ENTRY_MODE.MANUAL]: {
    eyebrow: 'recipeCreate.manualEyebrow',
    title: 'recipeCreate.manualPageTitle',
    description: 'recipeCreate.manualPageDescription',
  },
}

interface RecipeCreatePageProps {
  entryMode: EntryMode
  onEntryModeChange: (mode: EntryMode) => void
}

export function RecipeCreatePage({
  entryMode,
  onEntryModeChange,
}: RecipeCreatePageProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<{
    message: string
    severity: 'error' | 'info' | 'success'
  } | null>(null)
  const [draft, setDraft] = useState<RecipeDraft | null>(null)
  const [selectedCollectionId, setSelectedCollectionId] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const isManualEntry = entryMode === ENTRY_MODE.MANUAL
  const introKeys = PAGE_INTRO_KEYS[entryMode]

  return (
    <Page aria-labelledby="create-recipe-heading">
      <InteractiveLink
        text={t('recipeCreate.back')}
        href="/"
        icon={<ArrowLeft size={15} />}
        iconPosition="start"
        sx={{
          fontSize: 12,
          lineHeight: '15px',
        }}
      />

      <SectionIntroduction
        eyebrow={t(introKeys.eyebrow)}
        title={t(introKeys.title)}
        titleId="create-recipe-heading"
        titleLevel="h1"
        description={t(introKeys.description)}
      />

      <RecipeWorkspace
        sx={
          isManualEntry ? { gridTemplateColumns: 'minmax(0, 1fr)' } : undefined
        }
      >
        <RecipeEntrySection
          entryMode={entryMode}
          draft={draft}
          onImportingChange={setIsImporting}
          selectedCollectionId={selectedCollectionId}
          onDraftChange={setDraft}
          onCollectionChange={setSelectedCollectionId}
          onEntryModeChange={onEntryModeChange}
          onRecipeSaved={() => navigate('/library/my-recipes')}
          onFeedback={(message, severity) => setFeedback({ message, severity })}
        />
        {!isManualEntry && (
          <RecipePreviewCard
            key={draft?.sourceUrl ?? 'empty-recipe-preview'}
            draft={draft}
            isImporting={isImporting}
            onDraftChange={setDraft}
            onRequestManual={() => onEntryModeChange(ENTRY_MODE.MANUAL)}
          />
        )}
      </RecipeWorkspace>

      <FeedbackSnackbar
        open={feedback !== null}
        severity={feedback?.severity ?? 'info'}
        message={feedback?.message ?? ''}
        onClose={() => setFeedback(null)}
      />
    </Page>
  )
}

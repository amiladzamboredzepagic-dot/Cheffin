import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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

export function RecipeCreatePage() {
  const { t } = useTranslation()

  const [entryMode, setEntryMode] = useState<EntryMode>(ENTRY_MODE.IMPORT)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const isManualEntry = entryMode === ENTRY_MODE.MANUAL
  const introKeys = PAGE_INTRO_KEYS[entryMode]

  return (
    <Page
      component="main"
      direction="column"
      align="stretch"
      gap={4}
      aria-labelledby="create-recipe-heading"
    >
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
          isManualEntry
            ? { gridTemplateColumns: 'minmax(0, 1fr)' }
            : undefined
        }
      >
        <RecipeEntrySection
          entryMode={entryMode}
          onEntryModeChange={setEntryMode}
          onShowUnavailable={() => setFeedbackOpen(true)}
        />
        {!isManualEntry && (
          <RecipePreviewCard
            onRequestManual={() => setEntryMode(ENTRY_MODE.MANUAL)}
          />
        )}
      </RecipeWorkspace>

      <FeedbackSnackbar
        open={feedbackOpen}
        severity="info"
        message={t('recipeCreate.unavailable')}
        onClose={() => setFeedbackOpen(false)}
      />
    </Page>
  )
}

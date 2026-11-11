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

export function RecipeCreatePage() {
  const { t } = useTranslation()

  const [entryMode, setEntryMode] = useState<EntryMode>(ENTRY_MODE.IMPORT)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

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
        eyebrow={t('recipeCreate.eyebrow')}
        title={t('recipeCreate.title')}
        titleId="create-recipe-heading"
        titleLevel="h1"
        description={t('recipeCreate.description')}
      />

      <RecipeWorkspace>
        <RecipeEntrySection
          entryMode={entryMode}
          onEntryModeChange={setEntryMode}
          onShowUnavailable={() => setFeedbackOpen(true)}
        />
        <RecipePreviewCard
          onRequestManual={() => setEntryMode(ENTRY_MODE.MANUAL)}
        />
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

import { FolderPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'

interface LibraryIntroductionProps {
  onCreateCollection: () => void
}

export function LibraryIntroduction({
  onCreateCollection,
}: LibraryIntroductionProps) {
  const { t } = useTranslation()

  return (
    <SectionIntroduction
      eyebrow={t('library.eyebrow')}
      title={t('navigation.myLibrary')}
      titleId="library-title"
      titleLevel="h1"
      description={t('library.description')}
      action={
        <ActionButton
          text={t('library.newCollection')}
          startIcon={<FolderPlus size={18} aria-hidden="true" />}
          onClick={onCreateCollection}
          kind="secondary"
          sx={{
            px: '19px',
            whiteSpace: 'nowrap',
          }}
        />
      }
    />
  )
}

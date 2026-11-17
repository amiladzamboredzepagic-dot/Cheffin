import { useTranslation } from 'react-i18next'
import { Flex } from '../../../components/ui/layout/Flex'
import { InteractiveLink } from '../../../components/ui/links/InteractiveLink'
import { SectionTitle } from '../LibraryPage.styles'

interface LibraryCollectionHeaderProps {
  name: string
  onBack: () => void
}

export function LibraryCollectionHeader({
  name,
  onBack,
}: LibraryCollectionHeaderProps) {
  const { t } = useTranslation()

  return (
    <Flex
      direction={{ xs: 'column-reverse', sm: 'row' }}
      align={{ xs: 'flex-start', sm: 'center' }}
      justify="space-between"
      gap={1}
    >
      <SectionTitle>{name}</SectionTitle>
      <InteractiveLink
        text={t('library.backToCollections')}
        href="#library-collections-heading"
        onClick={onBack}
      />
    </Flex>
  )
}

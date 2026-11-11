import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { SectionIntroduction } from '../../components/ui/SectionIntroduction'
import {
  DetectedIngredients,
  IngredientChip,
  IngredientPreview,
  MatchText,
  PantryCopy,
  PantryLayout,
  PantryLink,
  PantryMatch,
  PantryPhoto,
  PantrySection,
  PreviewEyebrow,
} from './PantryIdeas.styles'

export function PantryIdeas() {
  const { t } = useTranslation()

  return (
    <PantrySection aria-labelledby="pantry-ideas-title">
      <PantryLayout>
        <IngredientPreview>
          <PantryPhoto
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85"
            alt={t('pantryIdeas.imageAlt')}
            loading="lazy"
          />
          <DetectedIngredients direction="column" align="stretch" gap={1}>
            <PreviewEyebrow>{t('pantryIdeas.previewLabel')}</PreviewEyebrow>
            <IngredientChip>
              {t('pantryIdeas.ingredientGroupOne')}
            </IngredientChip>
            <IngredientChip>
              {t('pantryIdeas.ingredientGroupTwo')}
            </IngredientChip>
            <IngredientChip>
              {t('pantryIdeas.ingredientGroupThree')}
            </IngredientChip>
          </DetectedIngredients>
          <PantryMatch direction="row" align="center">
            <MatchText>{t('pantryIdeas.matchMessage')}</MatchText>
          </PantryMatch>
        </IngredientPreview>

        <PantryCopy direction="column" gap={0}>
          <SectionIntroduction
            variant="split"
            eyebrow={t('pantryIdeas.eyebrow')}
            title={
              <>
                {t('pantryIdeas.headingFirst')}
                <br />
                {t('pantryIdeas.headingSecond')}
              </>
            }
            titleId="pantry-ideas-title"
            description={t('pantryIdeas.description')}
          />
          <PantryLink href="/explore">
            {t('pantryIdeas.action')}
            <ArrowForwardIcon fontSize="inherit" aria-hidden="true" />
          </PantryLink>
        </PantryCopy>
      </PantryLayout>
    </PantrySection>
  )
}

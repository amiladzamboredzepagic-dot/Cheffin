import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookmarkCheck, Bookmark, ImageOff, Play } from 'lucide-react'
import {
  CardRoot,
  Media,
  Photograph,
  PhotoPlaceholder,
  RecipeContext,
  RecipeInformation,
  RecipeMetadata,
  RecipeDetails,
  RecipeRating,
  RecipeTag,
  RecipeTitle,
  SaveButton,
  VideoBadge,
} from './RecipeCard.styles'

//Mock up props
export interface RecipeCardProps {
  title: string
  imageUrl: string
  imageAlt: string
  metadata: string
  context?: string
  tag?: string
  rating?: number
  inspirationOrder?: number
  titleKey?: string
  imageAltKey?: string
  minutes?: number
  calories?: number
  tagKey?: string
  videoDuration?: string
  saved?: boolean
  onSavedChange?: (saved: boolean) => void
  variant?: 'default' | 'inspiration'
  showSaveButton?: boolean
}

export function RecipeCard({
  title,
  imageUrl,
  imageAlt,
  metadata,
  context = '',
  tag,
  rating,
  videoDuration,
  saved = false,
  onSavedChange,
  variant = 'default',
  showSaveButton = true,
}: RecipeCardProps) {
  const { t } = useTranslation()
  const [localSaved, setLocalSaved] = useState(saved)

  const isSaved = onSavedChange ? saved : localSaved

  return (
    <CardRoot
      as="article"
      direction="column"
      align="flex-start"
      gap={0}
      className={`recipe-card-${variant}`}
    >
      <Media className="recipe-card-media">
        {imageUrl ? (
          <Photograph src={imageUrl} alt={imageAlt} loading="lazy" />
        ) : (
          <PhotoPlaceholder aria-hidden="true">
            <ImageOff size={32} />
          </PhotoPlaceholder>
        )}
        {showSaveButton && (
          <SaveButton
            aria-label={t(
              isSaved ? 'recipeCard.removeSaved' : 'recipeCard.save',
              { title },
            )}
            aria-pressed={isSaved}
            onClick={() => {
              if (onSavedChange) onSavedChange(!isSaved)
              else setLocalSaved((current) => !current)
            }}
            size="small"
          >
            {isSaved ? (
              <BookmarkCheck size={18} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Bookmark size={18} strokeWidth={1.7} aria-hidden="true" />
            )}
          </SaveButton>
        )}
        {videoDuration && (
          <VideoBadge gap={0.75} align="center">
            <Play size={12} fill="currentColor" aria-hidden="true" />
            <span>{videoDuration}</span>
          </VideoBadge>
        )}
      </Media>
      <RecipeInformation
        direction="column"
        align="flex-start"
        gap={0}
        className="recipe-information"
      >
        {tag && <RecipeTag>{tag}</RecipeTag>}
        <RecipeTitle
          as={variant === 'inspiration' ? 'h3' : 'h2'}
          title={title}
          className="recipe-card-title"
        >
          {title}
        </RecipeTitle>
        {context && <RecipeContext>{context}</RecipeContext>}
        <RecipeDetails>
          <RecipeMetadata>{metadata}</RecipeMetadata>
          {rating !== undefined && <RecipeRating>★ {rating}</RecipeRating>}
        </RecipeDetails>
      </RecipeInformation>
    </CardRoot>
  )
}

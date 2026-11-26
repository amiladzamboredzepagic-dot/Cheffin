import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bookmark, ImageOff, Play, Star } from 'lucide-react'
import {
  CardRoot,
  CardOpenButton,
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
  saveDisabled?: boolean
  onOpen?: () => void
  openLabel?: string
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
  saveDisabled = false,
  onOpen,
  openLabel,
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
      {onOpen && (
        <CardOpenButton
          type="button"
          aria-label={openLabel ?? title}
          aria-haspopup="dialog"
          onClick={onOpen}
        />
      )}
      <Media
        className="recipe-card-media"
        sx={
          onOpen
            ? {
                zIndex: 2,
                pointerEvents: 'none',
                '& button': { pointerEvents: 'auto' },
              }
            : undefined
        }
      >
        {imageUrl ? (
          <Photograph src={imageUrl} alt={imageAlt} loading="lazy" />
        ) : (
          <PhotoPlaceholder>
            <ImageOff size={36} strokeWidth={1.7} aria-hidden="true" />
          </PhotoPlaceholder>
        )}
        {showSaveButton && (
          <SaveButton
            aria-label={t(
              isSaved ? 'recipeCard.removeSaved' : 'recipeCard.save',
              { title },
            )}
            aria-pressed={isSaved}
            disabled={saveDisabled}
            onClick={() => {
              if (onSavedChange) onSavedChange(!isSaved)
              else setLocalSaved((current) => !current)
            }}
            size="small"
          >
            <Bookmark
              size={18}
              strokeWidth={1.7}
              fill={isSaved ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
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
          {rating !== undefined && (
            <RecipeRating>
              <Star size={12} fill="currentColor" aria-hidden="true" /> {rating}
            </RecipeRating>
          )}
        </RecipeDetails>
      </RecipeInformation>
    </CardRoot>
  )
}

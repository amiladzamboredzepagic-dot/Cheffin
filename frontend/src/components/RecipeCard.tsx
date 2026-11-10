import { useState } from 'react'
import { BookmarkCheck, Bookmark, Play } from 'lucide-react'
import {
  CardRoot,
  Media,
  Photograph,
  RecipeContext,
  RecipeInformation,
  RecipeMetadata,
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
  inspirationOrder?: number
  titleKey?: string
  imageAltKey?: string
  minutes?: number
  calories?: number
  tagKey?: string
  videoDuration?: string
  saved?: boolean
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
  videoDuration,
  saved = false,
  variant = 'default',
  showSaveButton = true,
}: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(saved)

  return (
    <CardRoot
      as="article"
      direction="column"
      align="flex-start"
      gap={13 / 8}
      className={`recipe-card-${variant}`}
    >
      <Media className="recipe-card-media">
        <Photograph src={imageUrl} alt={imageAlt} loading="lazy" />
        {showSaveButton && (
          <SaveButton
            aria-label={
              isSaved ? `Remove ${title} from saved recipes` : `Save ${title}`
            }
            aria-pressed={isSaved}
            onClick={() => setIsSaved((current) => !current)}
            size="small"
          >
            {isSaved ? (
              <BookmarkCheck size={17} aria-hidden="true" />
            ) : (
              <Bookmark size={17} aria-hidden="true" />
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
        gap={7 / 8}
        className="recipe-information"
      >
        <RecipeTitle
          as={variant === 'inspiration' ? 'h3' : 'h2'}
          title={title}
          className="recipe-card-title"
        >
          {title}
        </RecipeTitle>
        {variant === 'inspiration' && tag ? (
          <div className="recipe-card-details">
            <RecipeMetadata>{metadata}</RecipeMetadata>
            <RecipeContext className="recipe-card-context">{tag}</RecipeContext>
          </div>
        ) : (
          <>
            <RecipeMetadata>{metadata}</RecipeMetadata>
            <RecipeContext>{context}</RecipeContext>
          </>
        )}
      </RecipeInformation>
    </CardRoot>
  )
}

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
  context: string
  videoDuration?: string
  saved?: boolean
}

export function RecipeCard({
  title,
  imageUrl,
  imageAlt,
  metadata,
  context,
  videoDuration,
  saved = false,
}: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(saved)

  return (
    <CardRoot as="article" direction="column" align="flex-start" gap={13 / 8}>
      <Media>
        <Photograph src={imageUrl} alt={imageAlt} loading="lazy" />
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
        {videoDuration && (
          <VideoBadge gap={0.75} align="center">
            <Play size={12} fill="currentColor" aria-hidden="true" />
            <span>{videoDuration}</span>
          </VideoBadge>
        )}
      </Media>
      <RecipeInformation direction="column" align="flex-start" gap={7 / 8}>
        <RecipeTitle as="h2" title={title}>
          {title}
        </RecipeTitle>
        <RecipeMetadata>{metadata}</RecipeMetadata>
        <RecipeContext>{context}</RecipeContext>
      </RecipeInformation>
    </CardRoot>
  )
}

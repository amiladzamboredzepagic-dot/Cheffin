import { useState, type SubmitEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BookmarkPlus } from 'lucide-react'
import { ActionButton } from '../../../../components/ui/actions/ActionButton'
import { FeedbackSnackbar } from '../../../../components/ui/feedback/FeedbackSnackbar'
import { Flex } from '../../../../components/ui/layout/Flex'
import {
  ManualRecipeColumn,
  ManualRecipeGrid,
  ManualRecipeLayout,
} from './WriteYourOwnRecipe.styles'
import { IngredientsSection } from './manual/IngredientsSection'
import { MethodSection } from './manual/MethodSection'
import { PhotoSection } from './manual/PhotoSection'
import { RecipeCollectionSection } from './manual/RecipeCollectionSection'
import { RecipeBasicsSection } from './manual/RecipeBasicsSection'
import { RecipeDetailsSection } from './manual/RecipeDetailsSection'
import { RecipePreferencesSection } from './manual/RecipePreferencesSection'
import { useRecipeMetadataQuery } from '../../hooks/useRecipeMetadataQuery'
import type {
  RecipeDifficulty,
  RecipeMealType,
} from '../../recipeMetadata'
import { useCreateRecipeMutation } from '../hooks/useCreateRecipeMutation'
import { encodePhoto } from '../utils/encodePhoto'

interface WriteYourOwnRecipeProps {
  selectedCollectionId: string
  onCollectionChange: (collectionId: string) => void
}

const DEFAULT_MEAL_TYPE: RecipeMealType = 'lunch'

const RECIPE_ACTION = {
  SAVE: 'save',
  PUBLISH: 'publish',
} as const

const RECIPE_FEEDBACK = {
  SAVED: 'saved',
  PUBLISHED: 'published',
  ERROR: 'error',
} as const

type RecipeAction = (typeof RECIPE_ACTION)[keyof typeof RECIPE_ACTION]
type RecipeFeedback = (typeof RECIPE_FEEDBACK)[keyof typeof RECIPE_FEEDBACK]

export function WriteYourOwnRecipe({
  selectedCollectionId,
  onCollectionChange,
}: WriteYourOwnRecipeProps) {
  const { t } = useTranslation()
  const { createRecipe, loading } = useCreateRecipeMutation()
  const {
    dietaryPreferences: supportedDietaryPreferences,
    customDietaryPreferences,
    cuisines: supportedCuisines,
    customCuisines,
    difficulties: supportedDifficulties,
    loading: metadataLoading,
    error: metadataError,
  } = useRecipeMetadataQuery()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [steps, setSteps] = useState<string[]>([''])
  const [prepTime, setPrepTime] = useState<string>('')
  const [servings, setServings] = useState<string>('')
  const [mealType, setMealType] = useState<RecipeMealType>(DEFAULT_MEAL_TYPE)
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])
  const [cuisine, setCuisine] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<RecipeDifficulty | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoResetKey, setPhotoResetKey] = useState(0)
  const [feedback, setFeedback] = useState<RecipeFeedback | null>(null)
  const [submitting, setSubmitting] = useState<RecipeAction | null>(null)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setIngredients([''])
    setSteps([''])
    setPrepTime('')
    setServings('')
    setMealType(DEFAULT_MEAL_TYPE)
    setDietaryPreferences([])
    setCuisine(null)
    setDifficulty(null)
    setPhoto(null)
    setPhotoResetKey((current) => current + 1)
    onCollectionChange('')
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const publish =
      event.nativeEvent.submitter instanceof HTMLButtonElement &&
      event.nativeEvent.submitter.value === RECIPE_ACTION.PUBLISH
    setSubmitting(publish ? RECIPE_ACTION.PUBLISH : RECIPE_ACTION.SAVE)
    try {
      await createRecipe({
        title,
        description,
        ingredients,
        steps,
        prepTimeMinutes: Number(prepTime),
        servings: Number(servings),
        mealType,
        dietaryPreferences,
        cuisine,
        difficulty,
        photoBase64: photo ? await encodePhoto(photo) : null,
        photoContentType: photo?.type ?? null,
        collectionId: selectedCollectionId || null,
        publish,
      })
      resetForm()
      setFeedback(publish ? RECIPE_FEEDBACK.PUBLISHED : RECIPE_FEEDBACK.SAVED)
    } catch (error) {
      console.error('Failed to save recipe:', error)
      setFeedback(RECIPE_FEEDBACK.ERROR)
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <>
      <ManualRecipeLayout
        component="form"
        direction="column"
        align="stretch"
        gap={2.5}
        onSubmit={handleSubmit}
      >
        <ManualRecipeGrid>
          <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
            <RecipeBasicsSection
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />
            <IngredientsSection
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            <MethodSection steps={steps} setSteps={setSteps} />
          </ManualRecipeColumn>

          <ManualRecipeColumn direction="column" align="stretch" gap={2.5}>
            <PhotoSection
              key={photoResetKey}
              photo={photo}
              onPhotoChange={setPhoto}
            />
            <RecipeDetailsSection
              prepTime={prepTime}
              servings={servings}
              mealType={mealType}
              onPrepTimeChange={setPrepTime}
              onServingsChange={setServings}
              onMealTypeChange={setMealType}
            />
            <RecipePreferencesSection
              dietaryPreferences={dietaryPreferences}
              supportedDietaryPreferences={supportedDietaryPreferences}
              customDietaryPreferences={customDietaryPreferences}
              supportedCuisines={supportedCuisines}
              customCuisines={customCuisines}
              supportedDifficulties={supportedDifficulties}
              metadataLoading={metadataLoading}
              metadataError={Boolean(metadataError)}
              cuisine={cuisine}
              difficulty={difficulty}
              onDietaryPreferencesChange={setDietaryPreferences}
              onCuisineChange={setCuisine}
              onDifficultyChange={setDifficulty}
            />
            <RecipeCollectionSection
              value={selectedCollectionId}
              onChange={onCollectionChange}
            />
          </ManualRecipeColumn>
        </ManualRecipeGrid>

        <Flex align="stretch" wrap="wrap" gap={2}>
          <ActionButton
            type="submit"
            value={RECIPE_ACTION.SAVE}
            disabled={loading || submitting !== null}
            text={
              <>
                <BookmarkPlus size={18} aria-hidden="true" />
                {t(
                  submitting === RECIPE_ACTION.SAVE
                    ? 'recipeCreate.saving'
                    : 'recipeCreate.saveAction',
                )}
              </>
            }
            sx={{ gap: 1 }}
          />
          <ActionButton
            type="submit"
            value={RECIPE_ACTION.PUBLISH}
            disabled={loading || submitting !== null}
            text={t(
              submitting === RECIPE_ACTION.PUBLISH
                ? 'recipeCreate.publishing'
                : 'recipeCreate.publishAction',
            )}
          />
        </Flex>
      </ManualRecipeLayout>

      {feedback && (
        <FeedbackSnackbar
          open
          severity={feedback === RECIPE_FEEDBACK.ERROR ? 'error' : 'success'}
          message={t(
            feedback === RECIPE_FEEDBACK.PUBLISHED
              ? 'recipeCreate.publishSuccess'
              : feedback === RECIPE_FEEDBACK.SAVED
                ? 'recipeCreate.saveSuccess'
                : 'recipeCreate.saveFailed',
          )}
          onClose={() => setFeedback(null)}
        />
      )}
    </>
  )
}

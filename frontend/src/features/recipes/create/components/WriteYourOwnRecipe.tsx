import { useState, type SubmitEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BookmarkPlus } from 'lucide-react'
import { ActionButton } from '../../../../components/ui/actions/ActionButton'
import { FeedbackSnackbar } from '../../../../components/ui/feedback/FeedbackSnackbar'
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
import type { RecipeMealType } from './manual/recipeDraft'
import { useCreateRecipeMutation } from '../hooks/useCreateRecipeMutation'
import { encodePhoto } from '../utils/encodePhoto'

interface WriteYourOwnRecipeProps {
  selectedCollectionId: string
  onCollectionChange: (collectionId: string) => void
}

export function WriteYourOwnRecipe({
  selectedCollectionId,
  onCollectionChange,
}: WriteYourOwnRecipeProps) {
  const { t } = useTranslation()
  const { createRecipe, loading } = useCreateRecipeMutation()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [steps, setSteps] = useState<string[]>([''])
  const [prepTime, setPrepTime] = useState<string>('')
  const [servings, setServings] = useState<string>('')
  const [mealType, setMealType] = useState<RecipeMealType>('lunch')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoResetKey, setPhotoResetKey] = useState(0)
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setIngredients([''])
    setSteps([''])
    setPrepTime('')
    setServings('')
    setMealType('lunch')
    setPhoto(null)
    setPhotoResetKey((current) => current + 1)
    onCollectionChange('')
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await createRecipe({
        title,
        description,
        ingredients,
        steps,
        prepTimeMinutes: Number(prepTime),
        servings: Number(servings),
        mealType,
        photoBase64: photo ? await encodePhoto(photo) : null,
        photoContentType: photo?.type ?? null,
        collectionId: selectedCollectionId || null,
      })
      resetForm()
      setFeedback('success')
    } catch (error) {
      console.error('Failed to save recipe:', error)
      setFeedback('error')
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
            <RecipeCollectionSection
              value={selectedCollectionId}
              onChange={onCollectionChange}
            />
          </ManualRecipeColumn>
        </ManualRecipeGrid>

        <ActionButton
          type="submit"
          disabled={loading}
          text={
            <>
              <BookmarkPlus size={18} aria-hidden="true" />
              {t(loading ? 'recipeCreate.saving' : 'recipeCreate.saveAction')}
            </>
          }
          sx={{ gap: 1, alignSelf: 'flex-start' }}
        />
      </ManualRecipeLayout>

      {feedback && (
        <FeedbackSnackbar
          open
          severity={feedback}
          message={t(
            feedback === 'success'
              ? 'recipeCreate.saveSuccess'
              : 'recipeCreate.saveFailed',
          )}
          onClose={() => setFeedback(null)}
        />
      )}
    </>
  )
}

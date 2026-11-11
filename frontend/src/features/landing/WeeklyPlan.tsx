import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { SectionIntroduction } from '../../components/ui/layout/SectionIntroduction'
import { Flex } from '../../components/ui/layout/Flex'
import { INSPIRATION_RECIPES } from '../recipes/recipes.data'
import {
  AddMeal,
  DayColumn,
  DayDate,
  DayHeader,
  DayName,
  DaySelectedLabel,
  DaysGrid,
  MealImage,
  MealMetadata,
  MealName,
  MealSlot,
  MealType,
  PlannerPreview,
  PlannerTitle,
  WeeklyPlanCopy,
  WeeklyPlanLayout,
  WeeklyPlanLink,
  WeeklyPlanSection,
} from './WeeklyPlan.styles'

const DAYS = [
  { key: 'mon', date: 12 },
  { key: 'tue', date: 13 },
  { key: 'wed', date: 14 },
  { key: 'thu', date: 15 },
  { key: 'fri', date: 16 },
  { key: 'sat', date: 17 },
  { key: 'sun', date: 18 },
]

const MEALS = [
  { key: 'breakfast', recipeIndex: 2 },
  { key: 'lunch', recipeIndex: 0 },
  { key: 'dinner', recipeIndex: 1 },
]

export function WeeklyPlan() {
  const { t } = useTranslation()

  return (
    <WeeklyPlanSection aria-labelledby="weekly-plan-heading">
      <WeeklyPlanLayout>
        <WeeklyPlanCopy direction="column" gap={0}>
          <SectionIntroduction
            variant="split"
            eyebrow={t('weeklyPlan.eyebrow')}
            title={
              <>
                {t('weeklyPlan.headingFirst')}
                <br />
                {t('weeklyPlan.headingSecond')}
              </>
            }
            titleId="weekly-plan-heading"
            description={t('weeklyPlan.description')}
          />
          <WeeklyPlanLink href="/meal-planner">
            {t('weeklyPlan.action')}
            <ArrowForwardIcon fontSize="inherit" aria-hidden="true" />
          </WeeklyPlanLink>
        </WeeklyPlanCopy>

        <PlannerPreview direction="column" align="stretch">
          <PlannerTitle>{t('weeklyPlan.previewTitle')}</PlannerTitle>
          <DaysGrid aria-label={t('weeklyPlan.previewLabel')}>
            {DAYS.map((day, dayIndex) => (
              <DayColumn key={day.key} direction="column" gap={0.65}>
                <DayHeader
                  direction="row"
                  align="center"
                  justify="space-between"
                  selected={dayIndex === 0}
                >
                  <Flex direction="column" align="flex-start" gap={0}>
                    <DayName>{t(`weeklyPlan.days.${day.key}`)}</DayName>
                    {dayIndex === 0 && (
                      <DaySelectedLabel>
                        {t('weeklyPlan.selectedDay')}
                      </DaySelectedLabel>
                    )}
                  </Flex>
                  <DayDate>{day.date}</DayDate>
                </DayHeader>

                {MEALS.map((meal, mealIndex) => {
                  const planned =
                    dayIndex === 0
                      ? mealIndex > 0
                      : (dayIndex + mealIndex) % 3 !== 0
                  const recipe =
                    INSPIRATION_RECIPES[
                      (meal.recipeIndex + dayIndex) % INSPIRATION_RECIPES.length
                    ]

                  return (
                    <MealSlot
                      key={meal.key}
                      direction="column"
                      align="stretch"
                      gap={0.5}
                      planned={planned}
                    >
                      <MealType>{t(`weeklyPlan.meals.${meal.key}`)}</MealType>
                      {planned ? (
                        <>
                          <MealImage
                            src={recipe.imageUrl}
                            alt=""
                            aria-hidden="true"
                          />
                          <MealName>{t(recipe.titleKey)}</MealName>
                          <MealMetadata>
                            {t('recipeInspiration.metadata', {
                              minutes: recipe.minutes,
                              calories: recipe.calories,
                            })}
                          </MealMetadata>
                        </>
                      ) : (
                        <AddMeal
                          direction="column"
                          align="center"
                          justify="center"
                          gap={0.5}
                        >
                          <AddIcon aria-hidden="true" sx={{ fontSize: 8 }} />
                          {t('weeklyPlan.addMeal')}
                        </AddMeal>
                      )}
                    </MealSlot>
                  )
                })}
              </DayColumn>
            ))}
          </DaysGrid>
        </PlannerPreview>
      </WeeklyPlanLayout>
    </WeeklyPlanSection>
  )
}

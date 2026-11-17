import { useTranslation } from 'react-i18next'
import { CustomSelectMenu } from '../../../../../components/ui/menus/CustomSelectMenu'
import type { RecipeDifficulty } from '../../../recipeMetadata'

interface DifficultyFieldProps {
  difficulty: RecipeDifficulty | null
  supportedDifficulties: string[]
  onDifficultyChange: (value: RecipeDifficulty | null) => void
}

export function DifficultyField({
  difficulty,
  supportedDifficulties,
  onDifficultyChange,
}: DifficultyFieldProps) {
  const { t } = useTranslation()
  const options = [
    {
      id: '',
      label: 'recipeCreate.notSpecified',
      translationKey: true,
    },
    ...supportedDifficulties.map((option) => ({
      id: option,
      label: `discovery.difficulties.${option}`,
      translationKey: true,
    })),
  ]

  return (
    <CustomSelectMenu
      label={t('recipeCreate.difficultyLabel')}
      options={options}
      value={difficulty ?? ''}
      onChange={(value) =>
        onDifficultyChange(
          supportedDifficulties.find((option) => option === value) ?? null,
        )
      }
      searchable={false}
    />
  )
}

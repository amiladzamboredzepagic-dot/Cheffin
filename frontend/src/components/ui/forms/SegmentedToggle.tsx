import { Flex } from '../layout/Flex'
import { SegmentedToggleOption } from './SegmentedToggle.styles'

export interface SegmentedToggleItem<Value extends string> {
  value: Value
  label: string
}

export interface SegmentedToggleProps<Value extends string> {
  value: Value
  options: readonly SegmentedToggleItem<Value>[]
  onChange: (value: Value) => void
  ariaLabel: string
}

export function SegmentedToggle<Value extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: SegmentedToggleProps<Value>) {
  return (
    <Flex
      role="group"
      aria-label={ariaLabel}
      direction="row"
      align="flex-start"
      gap="4px"
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '496px',
        height: '48px',
        padding: '4px',
        backgroundColor: 'background.secondary',
        borderRadius: '10px',
      }}
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <SegmentedToggleOption
            key={option.value}
            aria-pressed={selected}
            selected={selected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </SegmentedToggleOption>
        )
      })}
    </Flex>
  )
}

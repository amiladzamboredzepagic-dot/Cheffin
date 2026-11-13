import type { SxProps, Theme } from '@mui/material'
import { useId, type ReactNode } from 'react'
import { Tab, TabsRoot, type TabsVariant } from './Tabs.styles'

export interface TabOption<Value extends string> {
  value: Value
  label: ReactNode
}

interface TabsProps<Value extends string> {
  value: Value
  options: readonly TabOption<Value>[]
  onChange: (value: Value) => void
  ariaLabel: string
  idPrefix?: string
  panelId?: string
  variant?: TabsVariant
  sx?: SxProps<Theme>
}

export function Tabs<Value extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  idPrefix,
  panelId,
  variant = 'underline',
  sx,
}: TabsProps<Value>) {
  const generatedId = useId()
  const tabIdPrefix = idPrefix ?? generatedId

  return (
    <TabsRoot
      role="tablist"
      aria-label={ariaLabel}
      tabsVariant={variant}
      sx={sx}
    >
      {options.map((option, index) => (
        <Tab
          key={option.value}
          role="tab"
          id={`${tabIdPrefix}-${option.value}`}
          aria-selected={value === option.value}
          aria-controls={panelId}
          selected={value === option.value}
          tabsVariant={variant}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => {
            let nextIndex = index
            if (event.key === 'ArrowRight')
              nextIndex = (index + 1) % options.length
            else if (event.key === 'ArrowLeft')
              nextIndex = (index - 1 + options.length) % options.length
            else if (event.key === 'Home') nextIndex = 0
            else if (event.key === 'End') nextIndex = options.length - 1
            else return
            event.preventDefault()
            onChange(options[nextIndex].value)
            event.currentTarget.parentElement
              ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
              [nextIndex]?.focus()
          }}
        >
          {option.label}
        </Tab>
      ))}
    </TabsRoot>
  )
}

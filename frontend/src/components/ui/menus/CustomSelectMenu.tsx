import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { Flex } from '../layout/Flex'
import { FormTextField } from '../forms/FormTextField'
import { MenuSearchField } from './MenuSearchField'
import { SelectMenuCreateAction } from './SelectMenuCreateAction'
import { SelectMenuOptionRow } from './SelectMenuOptionRow'

export interface CustomSelectMenuOption {
  id: string
  label: string
  icon?: ReactNode
  translationKey?: boolean
}

interface CustomSelectMenuProps {
  options: CustomSelectMenuOption[]
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
  searchable?: boolean
  showCreateOption?: boolean
  onCreateClick?: () => void
  startAdornment?: ReactNode
  disabled?: boolean
}

export function CustomSelectMenu({
  options,
  value,
  onChange,
  label,
  placeholder,
  searchable = true,
  showCreateOption = false,
  onCreateClick,
  startAdornment,
  disabled = false,
}: CustomSelectMenuProps) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)

  const filteredOptions = options.filter((option) => {
    const displayText = option.translationKey ? t(option.label) : option.label
    return displayText.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <FormTextField
      select
      label={label}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.value)
        setOpen(false)
      }}
      startAdornment={startAdornment}
      slotProps={{
        select: {
          IconComponent: ChevronDown,
          open,
          onOpen: () => setOpen(true),
          onClose: () => setOpen(false),
          renderValue: (selectedValue: unknown) => {
            const selectedOption = options.find(
              (option) => option.id === selectedValue,
            )
            if (!selectedOption) return ''

            return selectedOption.translationKey
              ? t(selectedOption.label)
              : selectedOption.label
          },
        },
      }}
    >
      {searchable && (
        <Flex
          component="div"
          direction="column"
          sx={{
            boxSizing: 'border-box',
            flexShrink: 0,
            height: 58,
            px: '11px',
            pt: '11px',
            pb: '9px',
          }}
        >
          <MenuSearchField
            placeholder={placeholder || t('common.search')}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </Flex>
      )}

      {filteredOptions.map((option) => (
        <SelectMenuOptionRow
          key={option.id}
          value={option.id}
          label={option.translationKey ? t(option.label) : option.label}
          icon={option.icon}
          selected={value === option.id}
        />
      ))}

      {showCreateOption && (
        <SelectMenuCreateAction
          label={t('common.createNew')}
          onCreate={() => {
            setOpen(false)
            onCreateClick?.()
          }}
        />
      )}
    </FormTextField>
  )
}

import { ChevronDown } from 'lucide-react'
import type { Theme } from '@mui/material/styles'
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
  hideLabel?: boolean
  compact?: boolean
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
  hideLabel = false,
  compact = false,
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
      label={hideLabel ? undefined : label}
      value={value}
      disabled={disabled}
      sx={
        compact
          ? {
              width: 'auto',
              '& .MuiOutlinedInput-root': {
                height: 36,
                borderRadius: '8px',
                fontSize: '12px',
                color: 'text.label',
              },
              '& .MuiSelect-icon': {
                width: 16,
                height: 16,
                top: 'calc(50% - 8px)',
                right: 10,
              },
            }
          : undefined
      }
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
          SelectDisplayProps: hideLabel ? { 'aria-label': label } : undefined,
          MenuProps: compact
            ? {
                slotProps: {
                  paper: {
                    sx: (theme: Theme) => ({
                      mt: 1,
                      width: 'max-content',
                      maxWidth: 'calc(100vw - 32px)',
                      maxHeight: 'calc(100vh - 32px)',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '10px',
                      backgroundColor: theme.palette.background.input,
                      boxShadow: '0px 10px 28px rgba(41, 62, 48, 0.14)',
                    }),
                  },
                  list: {
                    sx: {
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 220,
                      maxWidth: '100%',
                      gap: '2px',
                      py: '4px',
                    },
                  },
                },
              }
            : undefined,
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

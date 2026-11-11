export const ENTRY_MODE = {
  IMPORT: 'import',
  MANUAL: 'manual',
} as const

export type EntryMode = (typeof ENTRY_MODE)[keyof typeof ENTRY_MODE]

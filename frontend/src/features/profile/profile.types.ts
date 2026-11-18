export type ProfileTab = 'recipes' | 'collections' | 'settings'

export type SavedProfile = {
  description: string
  image: string | null
}

export type ProfileEditValues = SavedProfile & {
  firstName: string
  lastName: string
}

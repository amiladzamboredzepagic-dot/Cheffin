import type { SavedProfile } from './profile.types'

const PROFILE_STORAGE_KEY = 'cheffin.profile'
export const PROFILE_UPDATED_EVENT = 'cheffin:profile-updated'

export function readSavedProfile(): SavedProfile {
  try {
    const saved = JSON.parse(
      localStorage.getItem(PROFILE_STORAGE_KEY) ?? 'null',
    ) as Partial<SavedProfile> | null
    return {
      description:
        typeof saved?.description === 'string' ? saved.description : '',
      image: typeof saved?.image === 'string' ? saved.image : null,
    }
  } catch {
    return { description: '', image: null }
  }
}

export function readSavedProfileImage(): string | null {
  return readSavedProfile().image
}

export function saveProfile(profile: SavedProfile): void {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

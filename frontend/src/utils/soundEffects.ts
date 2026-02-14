/**
 * Sound effects — re-exports from soundManager for backward compatibility.
 */

import { soundManager } from './soundManager'

export { soundManager, playSound, type SoundKey } from './soundManager'

export const SOUND_KEYS = {
  pencilScratch: 'pencilScratch',
  typewriter: 'typewriter',
  searchWhoosh: 'searchWhoosh',
  chime: 'chime',
  tap: 'tap',
} as const

export function setSoundsEnabled(enabled: boolean): void {
  soundManager.setEnabled(enabled)
}

export function areSoundsEnabled(): boolean {
  return soundManager.isEnabled()
}

/**
 * Sound effects for design system interactions.
 * Placeholder: wire to actual audio when sounds are implemented.
 */

export const SOUND_KEYS = {
  pencilScratch: 'pencilScratch',
  typewriter: 'typewriter',
  searchWhoosh: 'searchWhoosh',
  chime: 'chime',
  buttonTap: 'buttonTap',
} as const

let soundsEnabled = true

export function setSoundsEnabled(enabled: boolean) {
  soundsEnabled = enabled
}

export function areSoundsEnabled() {
  return soundsEnabled
}

/**
 * Play a sound effect. Placeholder implementation — no-op until audio files and
 * AudioContext/HTMLAudioElement are wired up.
 */
export function playSound(
  key: keyof typeof SOUND_KEYS,
  volume: number = 0.4
): void {
  if (!soundsEnabled) return
  // TODO: load and play e.g. /sounds/pencil-scratch.mp3
  void key
  void volume
}

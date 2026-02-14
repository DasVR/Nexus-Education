/**
 * Sound effects manager — gentle, kind feedback for key interactions.
 * Throttling, volume control, and localStorage persistence.
 */

export type SoundKey =
  | 'pencilScratch'
  | 'typewriter'
  | 'searchWhoosh'
  | 'chime'
  | 'tap'

interface SoundConfig {
  path: string
  defaultVolume: number
}

const SOUNDS: Record<SoundKey, SoundConfig> = {
  pencilScratch: { path: '/sounds/pencil-scratch.mp3', defaultVolume: 0.4 },
  typewriter: { path: '/sounds/typewriter.mp3', defaultVolume: 0.3 },
  searchWhoosh: { path: '/sounds/search-whoosh.mp3', defaultVolume: 0.35 },
  chime: { path: '/sounds/chime.mp3', defaultVolume: 0.25 },
  tap: { path: '/sounds/tap.mp3', defaultVolume: 0.2 },
}

const STORAGE_KEYS = {
  enabled: 'soundsEnabled',
  volume: 'masterVolume',
} as const

export class SoundManager {
  private enabled = true
  private masterVolume = 1.0
  private audioCache = new Map<SoundKey, HTMLAudioElement>()
  private lastPlayed = new Map<SoundKey, number>()
  private throttleMs = 300

  constructor() {
    if (typeof window === 'undefined') return
    Object.entries(SOUNDS).forEach(([key, config]) => {
      const audio = new Audio(config.path)
      audio.volume = config.defaultVolume * this.masterVolume
      this.audioCache.set(key as SoundKey, audio)
    })

    try {
      const savedEnabled = localStorage.getItem(STORAGE_KEYS.enabled)
      const savedVolume = localStorage.getItem(STORAGE_KEYS.volume)
      if (savedEnabled !== null) this.enabled = savedEnabled === 'true'
      if (savedVolume !== null) this.masterVolume = Math.max(0, Math.min(1, parseFloat(savedVolume)))
    } catch {
      // localStorage may be unavailable
    }
  }

  play(soundKey: SoundKey, volumeOverride?: number): void {
    if (!this.enabled) return
    const now = Date.now()
    const lastTime = this.lastPlayed.get(soundKey) ?? 0
    if (now - lastTime < this.throttleMs) return

    const audio = this.audioCache.get(soundKey)
    if (!audio) return

    const sound = audio.cloneNode() as HTMLAudioElement
    const config = SOUNDS[soundKey]
    const volume = volumeOverride ?? config.defaultVolume
    sound.volume = volume * this.masterVolume

    sound.play().catch((err) => {
      console.warn(`Sound play failed: ${soundKey}`, err)
    })

    this.lastPlayed.set(soundKey, now)
  }

  toggle(): boolean {
    this.enabled = !this.enabled
    try {
      localStorage.setItem(STORAGE_KEYS.enabled, String(this.enabled))
    } catch {}
    return this.enabled
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
    try {
      localStorage.setItem(STORAGE_KEYS.enabled, String(this.enabled))
    } catch {}
  }

  setVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    try {
      localStorage.setItem(STORAGE_KEYS.volume, String(this.masterVolume))
    } catch {}
    this.audioCache.forEach((audio, key) => {
      audio.volume = SOUNDS[key].defaultVolume * this.masterVolume
    })
  }

  isEnabled(): boolean {
    return this.enabled
  }

  getVolume(): number {
    return this.masterVolume
  }
}

export const soundManager = new SoundManager()

export const playSound = (soundKey: SoundKey, volume?: number): void => {
  soundManager.play(soundKey, volume)
}

import { useState } from 'react'
import { soundManager } from '../utils/soundManager'
import type { SoundKey } from '../utils/soundManager'

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(() => soundManager.isEnabled())
  const [volume, setVolume] = useState(() => soundManager.getVolume())

  const toggle = () => {
    const newState = soundManager.toggle()
    setEnabled(newState)
    return newState
  }

  const updateVolume = (newVolume: number) => {
    soundManager.setVolume(newVolume)
    setVolume(soundManager.getVolume())
  }

  return {
    enabled,
    volume,
    toggle,
    updateVolume,
    play: (soundKey: SoundKey, volumeOverride?: number) =>
      soundManager.play(soundKey, volumeOverride),
  }
}

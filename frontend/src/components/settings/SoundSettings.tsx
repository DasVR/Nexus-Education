import { useSoundEffects } from '../../hooks/useSoundEffects'

export function SoundSettings() {
  const { enabled, volume, toggle, updateVolume } = useSoundEffects()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="font-ui text-sm text-text-primary">Sound effects</span>
        <button
          type="button"
          onClick={toggle}
          className={`
            px-3 py-1.5
            font-ui text-xs font-medium
            border border-border-default
            rounded-ds
            transition-fast
            ${enabled ? 'text-accent-primary bg-bg-elevated' : 'text-text-secondary'}
          `}
        >
          {enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {enabled && (
        <div>
          <label htmlFor="sound-volume" className="font-ui text-xs text-text-tertiary block mb-2">
            Volume
          </label>
          <input
            id="sound-volume"
            type="range"
            min="0"
            max="100"
            value={Math.round(volume * 100)}
            onChange={(e) => updateVolume(parseInt(e.target.value, 10) / 100)}
            className="w-full h-2 rounded-full appearance-none bg-bg-elevated accent-accent-primary"
            aria-label="Sound volume"
          />
        </div>
      )}
    </div>
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Warm dark mode palette — design system hex values */
        'bg-primary': '#1a1816',
        'bg-surface': '#2c2725',
        'bg-elevated': '#3d3735',
        'text-primary': '#f5f3f0',
        'text-secondary': '#a8a29e',
        'text-tertiary': '#78716c',
        'text-disabled': '#57534e',
        'accent-primary': '#fb923c',
        'accent-hover': '#f97316',
        'accent-subtle': '#fdba74',
        success: '#84cc16',
        'success-bg': '#3f6212',
        warning: '#fbbf24',
        'warning-bg': '#78350f',
        error: '#f87171',
        'error-bg': '#7f1d1d',
        verified: '#84cc16',
        reliable: '#60a5fa',
        unverified: '#a8a29e',
        'border-subtle': '#3d3735',
        'border-default': '#57534e',
        'border-emphasis': '#78716c',
        /* Legacy compatibility */
        zinc: {
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.75' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
        '4xl': ['2.25rem', { lineHeight: '1.25' }],
      },
      transitionDuration: {
        instant: '100ms',
        fast: '150ms',
        base: '300ms',
        slow: '400ms',
        delightful: '600ms',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.16, 1, 0.3, 1)',   /* Ease-out (default) */
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',   /* Ease-in-out */
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', /* Subtle bounce */
        'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      borderRadius: {
        'ds': '8px',
      },
    },
  },
  plugins: [],
}

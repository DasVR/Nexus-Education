/**
 * Nexus Scholar Design System — Framer Motion variants
 * Gentle, kind animations per design system
 */

export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
}

export const slideInRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
}

export const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerChild = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export const sketchDraw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration: 0.6, ease: 'easeOut' },
    opacity: { duration: 0.2 },
  },
}

export const drawerTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }

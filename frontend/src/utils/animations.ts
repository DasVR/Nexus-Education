/**
 * Nexus Scholar Design System — Framer Motion variants
 * Gentle, kind interactions — soft and purposeful, never jarring
 */

/** Gentle fade-in (default for new content) */
export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

/** Drawer slide (bottom sheet on mobile) */
export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
}

/** Accordion expand */
export const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

/** Stagger children (follow-up buttons) */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
}

/** Pulsing indicator (thinking drawer) */
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

/** Breathing hover (subtle scale) */
export const breathe = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
}

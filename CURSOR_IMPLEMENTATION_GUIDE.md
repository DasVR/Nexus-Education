# Nexus Scholar - Cursor Implementation Guide
**Warm Minimalist Redesign | February 2026**

---

## 🎯 Purpose of This Document

This is your **step-by-step implementation roadmap** for Cursor. Each section is a complete prompt you can paste directly into Cursor Composer to rebuild Nexus Scholar with the warm minimalist aesthetic.

**Reference:** All specifications come from `DESIGN_SYSTEM.md`

---

## 📋 Pre-Flight Checklist

Before starting, ensure you have:
- [ ] `DESIGN_SYSTEM.md` saved in your repo root
- [ ] Current code committed to git (so you can revert if needed)
- [ ] Dependencies installed: `react-markdown`, `remark-math`, `rehype-katex`, `katex`
- [ ] Fonts ready: Plus Jakarta Sans, Crimson Pro, Inter, JetBrains Mono

---

## 🚀 Phase 1: Foundation (Week 1)

### Session 1.1: Color Palette & Tailwind Config

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Update Tailwind configuration with warm dark mode color palette

CONTEXT:
Current colors are too cold (pure black, harsh orange). Need warm, cozy dark mode.

REQUIREMENTS:

1. Update tailwind.config.js:

Add to theme.extend.colors:
```js
colors: {
  // Background layers
  'bg-primary': '#1a1816',      // Deep warm charcoal
  'bg-surface': '#2c2725',      // Elevated cards
  'bg-elevated': '#3d3735',     // Modals, drawers
  
  // Text hierarchy
  'text-primary': '#f5f3f0',    // Main content
  'text-secondary': '#a8a29e',  // Supporting text
  'text-tertiary': '#78716c',   // Subtle labels
  'text-disabled': '#57534e',   // Inactive
  
  // Accents
  'accent-primary': '#fb923c',  // Amber/peach
  'accent-hover': '#f97316',    // Darker amber
  'accent-subtle': '#fdba74',   // Light amber
  
  // Semantic
  'success': '#84cc16',         // Muted sage
  'success-bg': '#3f6212',
  'warning': '#fbbf24',         // Warm gold
  'warning-bg': '#78350f',
  'error': '#f87171',           // Soft coral
  'error-bg': '#7f1d1d',
  
  // Source trust levels
  'verified': '#84cc16',
  'reliable': '#60a5fa',
  'unverified': '#a8a29e',
  
  // Borders
  'border-subtle': '#3d3735',
  'border-default': '#57534e',
  'border-emphasis': '#78716c',
}
```

2. Update global CSS (globals.css or app.css):

```css
:root {
  /* Background layers */
  --bg-primary: #1a1816;
  --bg-surface: #2c2725;
  --bg-elevated: #3d3735;
  
  /* Text */
  --text-primary: #f5f3f0;
  --text-secondary: #a8a29e;
  
  /* Accent */
  --accent-primary: #fb923c;
  
  /* Interactive states */
  --overlay: rgba(0, 0, 0, 0.6);
  --hover-bg: rgba(251, 146, 60, 0.1);
  --active-bg: rgba(251, 146, 60, 0.15);
  --focus-ring: rgba(251, 146, 60, 0.4);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

3. Update main App component:
- Change background from black to bg-primary
- Update all text colors to use new palette
- Replace any orange (#ff6b35 or similar) with accent-primary

DELIVERABLE:
- Updated tailwind.config.js
- Updated globals.css
- List of component files that need color updates
```

**After Cursor responds, review and commit before moving to next session.**

---

### Session 1.2: Typography Setup

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Set up typography system with warm, scholarly fonts

CONTEXT:
Need to move away from pure monospace to a mixed font system that feels warm and readable.

REQUIREMENTS:

1. Add font imports to index.html <head>:

```html
<!-- Display Font: Headers, UI -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Body Font: AI responses, reading content -->
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600&display=swap" rel="stylesheet">

<!-- UI Font: Buttons, labels -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Monospace: Code, math (already have JetBrains Mono?) -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

2. Update tailwind.config.js theme.extend.fontFamily:

```js
fontFamily: {
  display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  body: ['"Crimson Pro"', 'Georgia', 'serif'],
  ui: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
}
```

3. Create typography utility classes in globals.css:

```css
/* Headers - Display Font */
h1, .heading-1 {
  font-family: var(--font-display);
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

h2, .heading-2 {
  font-family: var(--font-display);
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.25;
}

h3, .heading-3 {
  font-family: var(--font-display);
  font-size: 1.25rem; /* 20px */
  font-weight: 500;
  line-height: 1.5;
}

/* Body text - Serif */
.ai-response {
  font-family: var(--font-body);
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;
}

/* UI elements - Sans */
button, .button, .ui-label {
  font-family: var(--font-ui);
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  letter-spacing: 0.01em;
}
```

4. Update component usage:
- Headers: Use font-display
- AI response text: Use font-body class
- Buttons, labels: Use font-ui
- Code blocks: Use font-mono

DELIVERABLE:
- Updated index.html with font imports
- Updated tailwind.config.js with font families
- Updated globals.css with typography classes
- Example of one component updated with new fonts
```

---

### Session 1.3: Animation System

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Set up animation utilities for gentle, kind interactions

CONTEXT:
All animations should feel soft and purposeful, never jarring.

REQUIREMENTS:

1. Add animation tokens to tailwind.config.js theme.extend:

```js
transitionDuration: {
  'instant': '100ms',
  'fast': '150ms',
  'base': '300ms',
  'slow': '400ms',
  'delightful': '600ms',
}

transitionTimingFunction: {
  'gentle': 'cubic-bezier(0.16, 1, 0.3, 1)',      // Ease-out (default)
  'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',        // Ease-in-out
  'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Subtle bounce
}
```

2. Create Framer Motion variants file: src/utils/animations.ts

```typescript
// Gentle fade-in (default for new content)
export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

// Drawer slide (bottom sheet on mobile)
export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

// Accordion expand
export const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

// Stagger children (follow-up buttons)
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

// Pulsing indicator (thinking drawer)
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Breathing hover (subtle scale)
export const breathe = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
};
```

3. Add utility classes to globals.css:

```css
/* Standard transitions */
.transition-gentle {
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-fast {
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover breathing effect */
.hover-breathe {
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-breathe:hover {
  transform: scale(1.02);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

DELIVERABLE:
- Updated tailwind.config.js with animation tokens
- New animations.ts file with Framer Motion variants
- Updated globals.css with transition utilities
```

---

## 🔧 Phase 2: Core Components (Week 2)

### Session 2.1: CommandDeck Redesign

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Redesign CommandDeck component with status bar and visual fuel gauge

CURRENT STATE:
- Simple input at bottom
- Text-only credit display "$0.02 / $5.00"
- No visual status indicators

NEW REQUIREMENTS:

LAYOUT:
┌─────────────────────────────────────────────────────┐
│ MODE: TUTOR         ▓▓▓▓▓▓▓▓░ $4.50 / $5.00        │ ← Status Bar
├─────────────────────────────────────────────────────┤
│ Type your question...                               │ ← Input Area
│                                          [🎤] [📸]  │
└─────────────────────────────────────────────────────┘

COMPONENT STRUCTURE:

```tsx
interface CommandDeckProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  mode: 'tutor' | 'research' | 'writing' | 'study-buddy' | 'deep-dive';
  creditBalance: number;
  creditLimit: number;
}

// Two main sections:
// 1. StatusBar (top)
// 2. InputArea (bottom)
```

STATUS BAR REQUIREMENTS:

1. Layout:
   - Left: "MODE: {currentMode}" in uppercase
   - Right: Fuel gauge + credit amount
   - Border top and bottom (border-default color)
   - Background: bg-primary
   - Padding: px-4 py-2

2. Mode Display:
   - Font: font-ui (Inter)
   - Size: text-xs
   - Color: accent-primary
   - Format: "MODE: TUTOR" (uppercase)

3. Fuel Gauge:
   - 9 total blocks: ▓ (filled) and ░ (empty)
   - Calculation: `Math.floor((balance / limit) * 9)` filled blocks
   - Color states:
     * > 60%: text-secondary (gray)
     * 20-60%: warning (amber)
     * 5-20%: warning with pulse animation
     * < 5%: error with fast pulse
   - Display: `▓▓▓▓▓▓▓▓░ $4.50 / $5.00`

4. Fuel Gauge Component:

```tsx
function FuelGauge({ balance, limit }: { balance: number; limit: number }) {
  const percentage = (balance / limit) * 100;
  const filledBlocks = Math.floor((balance / limit) * 9);
  
  const blocks = Array.from({ length: 9 }, (_, i) => 
    i < filledBlocks ? '▓' : '░'
  ).join('');
  
  const colorClass = 
    percentage > 60 ? 'text-secondary' :
    percentage > 20 ? 'text-warning' :
    percentage > 5 ? 'text-warning animate-pulse' :
    'text-error animate-pulse';
  
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <span className={colorClass}>{blocks}</span>
      <span className={colorClass}>
        ${balance.toFixed(2)} / ${limit.toFixed(2)}
      </span>
    </div>
  );
}
```

INPUT AREA REQUIREMENTS:

1. Auto-resizing textarea:
   - Min height: 1 line
   - Max height: 4 lines (mobile), 8 lines (desktop)
   - Auto-grow as user types
   - Font: font-body (Crimson Pro) for warmth
   - Size: text-base
   - Placeholder: "Type your question..."

2. Action buttons (right side):
   - Voice input: 🎤 icon
   - Image upload: 📸 icon
   - Both disabled if credits < 0.10
   - Tooltips on hover (desktop)

3. Send behavior:
   - Enter to send (Shift+Enter for new line)
   - Button appears when text is entered (fade-in animation)
   - Disabled while AI is generating

4. Styling:
   - Background: transparent (input directly on bg-primary)
   - Border: none on textarea
   - Focus ring: subtle amber glow
   - Padding: px-4 py-3

IMPLEMENTATION NOTES:

- Fixed position at bottom of viewport
- z-index above chat messages
- Mobile: full width, thumb-friendly (44px touch targets)
- Desktop: max-width with centered container
- Use Framer Motion for send button entrance
- Accessibility: proper ARIA labels, keyboard nav

DELIVERABLE:
- Complete CommandDeck.tsx component
- Separate FuelGauge subcomponent
- Updated Zustand store to include mode and credits
- Mobile-responsive (test at 375px width)
```

---

### Session 2.2: ThinkingDrawer Component

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Create ThinkingDrawer component for Tutor mode reasoning

PURPOSE:
In Tutor mode, show the AI's step-by-step reasoning process in a collapsible accordion. This is the "anti-cheat" feature that forces students to engage.

REQUIREMENTS:

COMPONENT PROPS:

```tsx
interface ThinkingDrawerProps {
  reasoning: string;              // Content from <reasoning> tag
  isGenerating: boolean;          // Is AI still responding?
  autoExpand?: boolean;           // Paid tier feature (auto-expand after 3s)
}
```

VISUAL STATES:

1. COLLAPSED (Default):
┌────────────────────────────────────────┐
│ > REASONING PROCESS... ●               │ ← Click to expand
│   [Tap to see how I'm thinking]       │
└────────────────────────────────────────┘

2. EXPANDED:
┌────────────────────────────────────────┐
│ ∨ REASONING PROCESS...                 │ ← Click to collapse
├────────────────────────────────────────┤
│ 1. First, I identified that this is   │
│    an exponential growth problem...   │
│                                        │
│ 2. The key concept the student needs  │
│    to understand is the formula...    │
│                                        │
│ 3. To guide without giving the answer,│
│    I'll ask about initial values...   │
└────────────────────────────────────────┘

BEHAVIOR:

1. Default State: Collapsed
2. Click/Tap: Toggles open/closed
3. Animation: Smooth height expansion (400ms gentle ease)
4. Generating State: Pulsing dot indicator (●) while AI is thinking
5. Auto-expand (Paid tier): After 3 seconds, automatically expands
6. Mobile: Swipe-up gesture also expands
7. Sound: Pencil scratch sound on expand (if sounds enabled)

COMPONENT CODE STRUCTURE:

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { expand, pulse } from '@/utils/animations';

export function ThinkingDrawer({ 
  reasoning, 
  isGenerating, 
  autoExpand = false 
}: ThinkingDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand for paid tier
  useEffect(() => {
    if (autoExpand && reasoning) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [autoExpand, reasoning]);

  // Play sound on expand
  const handleToggle = () => {
    if (!isOpen) {
      // Play pencil scratch sound
      playSound('pencilScratch', 0.4);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 border border-border-default bg-bg-surface rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-bg-elevated transition-gentle"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-accent-primary font-mono"
          >
            &gt;
          </motion.span>
          <span className="font-ui text-xs uppercase tracking-wider text-text-secondary">
            Reasoning Process
          </span>
          {isGenerating && !isOpen && (
            <motion.span
              {...pulse}
              className="text-accent-primary"
            >
              ●
            </motion.span>
          )}
        </div>
        <span className="font-ui text-[10px] text-text-tertiary">
          {isOpen ? 'COLLAPSE' : 'EXPAND'}
        </span>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...expand}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-border-default bg-bg-primary">
              <pre className="font-mono text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
                {reasoning || 'Analyzing your question...'}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

STYLING NOTES:

- Border: 1px solid border-default (#57534e)
- Background: bg-surface when collapsed, bg-primary when expanded
- Text: Monospace font (JetBrains Mono), text-secondary color
- Caret (>): Rotates 90° on expand
- Mobile: Ensure touch target is 44px minimum

INTEGRATION:

Add to message rendering in Chat component:

```tsx
{message.role === 'assistant' && mode === 'tutor' && message.reasoning && (
  <ThinkingDrawer 
    reasoning={message.reasoning}
    isGenerating={isCurrentMessage && isGenerating}
    autoExpand={isPaidTier}
  />
)}
```

DELIVERABLE:
- Complete ThinkingDrawer.tsx component
- Integration example in Chat/Message component
- Sound trigger for expand (placeholder if sounds not implemented yet)
- Mobile swipe-up gesture (bonus, can be added later)
```

---

### Session 2.3: AcademicRenderer with Citations

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Build AcademicRenderer component with LaTeX and interactive citations

PURPOSE:
Render AI responses with beautiful typography, proper math notation, and clickable citation badges.

REQUIREMENTS:

COMPONENT PROPS:

```tsx
interface Citation {
  id: number;
  title: string;
  url: string;
  source: string;
  trustLevel: 'verified' | 'reliable' | 'unverified';
}

interface AcademicRendererProps {
  content: string;              // Markdown + LaTeX content
  citations?: Citation[];        // Array of citation details
  onCitationClick?: (id: number) => void;
}
```

DEPENDENCIES:

```bash
npm install react-markdown remark-math rehype-katex katex
```

Add to index.html:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
```

FEATURES:

1. MARKDOWN RENDERING:
   - Headers: Display font (Plus Jakarta Sans), amber color
   - Body text: Serif font (Crimson Pro), warm spacing
   - Lists: Custom bullet points (amber colored)
   - Bold/Italic: Proper emphasis
   - Links: Amber underline on hover

2. LATEX RENDERING:
   - Inline math: `$E=mc^2$` → beautiful inline formula
   - Block math: `$$\int_0^1 x^2 dx$$` → centered, larger
   - Copy button on hover (desktop)

3. CITATION BADGES:
   - Pattern: `[1]`, `[2]`, `[3]` in text
   - Style: Small amber-bordered chips
   - Behavior: Click opens SourceDrawer
   - Position: Inline where they appear in text

CITATION BADGE COMPONENT:

```tsx
function CitationBadge({ 
  id, 
  onClick 
}: { 
  id: number; 
  onClick: (id: number) => void;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      className="
        inline-flex items-center
        px-1.5 py-0.5 mx-0.5
        font-ui text-[10px] font-medium
        text-accent-primary
        border border-accent-primary/30
        rounded
        hover:border-accent-primary
        hover:bg-hover-bg
        transition-fast
      "
    >
      [{id}]
    </button>
  );
}
```

MAIN COMPONENT STRUCTURE:

```tsx
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export function AcademicRenderer({ 
  content, 
  citations = [],
  onCitationClick 
}: AcademicRendererProps) {
  
  // Process citations in text
  const processChildren = (child: any): any => {
    if (typeof child === 'string') {
      const parts = child.split(/(\[\d+\])/g);
      return parts.map((part, i) => {
        const match = part.match(/\[(\d+)\]/);
        if (match) {
          const citationId = parseInt(match[1]);
          return (
            <CitationBadge 
              key={i} 
              id={citationId} 
              onClick={onCitationClick || (() => {})} 
            />
          );
        }
        return part;
      });
    }
    return child;
  };

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Paragraph with citation processing
          p({ children, ...props }) {
            return (
              <p className="font-body text-lg leading-relaxed mb-4 text-text-primary" {...props}>
                {Array.isArray(children) 
                  ? children.map(processChildren)
                  : processChildren(children)
                }
              </p>
            );
          },
          
          // Headers
          h1: ({ children }) => (
            <h1 className="font-display text-2xl font-bold text-accent-primary mb-3 border-b border-border-subtle pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-xl font-semibold text-accent-primary mb-2">
              {children}
            </h2>
          ),
          
          // Lists
          ul: ({ children }) => (
            <ul className="list-none space-y-2 my-3">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="flex gap-2 font-body text-base text-text-primary">
              <span className="text-accent-primary">•</span>
              <span>{children}</span>
            </li>
          ),
          
          // Code blocks
          code({ inline, className, children, ...props }) {
            return inline ? (
              <code
                className="px-1.5 py-0.5 bg-bg-elevated text-accent-primary rounded text-sm font-mono border border-border-subtle"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-bg-elevated border border-border-default p-4 rounded overflow-x-auto my-4">
                <code className="font-mono text-xs text-text-secondary" {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          
          // Links
          a: ({ children, href }) => (
            <a 
              href={href}
              className="text-accent-primary hover:underline transition-fast"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

STYLING NOTES:

- AI responses should feel warm and readable
- Math formulas should stand out but not be jarring
- Citations should be obviously clickable
- Mobile: Ensure citation badges are 44px touch targets

INTEGRATION:

```tsx
<AcademicRenderer
  content={message.content}
  citations={message.citations}
  onCitationClick={(id) => openSourceDrawer(id)}
/>
```

DELIVERABLE:
- Complete AcademicRenderer.tsx component
- Citation badge styling
- LaTeX rendering working
- Example of usage in Chat component
```

---

### Session 2.4: SourceDrawer Component

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Create SourceDrawer component to show citation details

PURPOSE:
When user clicks a citation badge, show full source details in a drawer.

REQUIREMENTS:

COMPONENT PROPS:

```tsx
interface Citation {
  id: number;
  title: string;
  url: string;
  source: string;
  trustLevel: 'verified' | 'reliable' | 'unverified';
  snippet?: string;  // Preview text
}

interface SourceDrawerProps {
  citation: Citation | null;
  isOpen: boolean;
  onClose: () => void;
}
```

LAYOUT:

Mobile: Bottom sheet (slides up)
Desktop: Right sidebar (slides in from right)

CONTENT STRUCTURE:

┌─────────────────────────────────────┐
│ [1] SOURCE DETAILS            [×]  │ ← Header
├─────────────────────────────────────┤
│                                     │
│ 🟢 Verified Academic Source         │ ← Trust badge
│                                     │
│ Title:                              │
│ "Mitochondrial Function in Cell..." │
│                                     │
│ Source:                             │
│ National Institutes of Health       │
│                                     │
│ URL:                                │
│ nih.gov/articles/PMC12345           │
│ [Open Source] [Copy URL]            │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ Preview:                            │
│ "Mitochondria are membrane-bound   │
│  organelles that generate most..." │
│                                     │
└─────────────────────────────────────┘

TRUST BADGES:

```tsx
function TrustBadge({ level }: { level: 'verified' | 'reliable' | 'unverified' }) {
  const config = {
    verified: {
      icon: '🟢',
      text: 'Verified Academic Source',
      color: 'text-verified'
    },
    reliable: {
      icon: '🔵',
      text: 'Reliable Publication',
      color: 'text-reliable'
    },
    unverified: {
      icon: '⚪',
      text: 'General Web Source',
      color: 'text-unverified'
    }
  };
  
  const { icon, text, color } = config[level];
  
  return (
    <div className={`flex items-center gap-2 font-ui text-sm ${color} mb-4`}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
```

MAIN COMPONENT:

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp } from '@/utils/animations';

export function SourceDrawer({ citation, isOpen, onClose }: SourceDrawerProps) {
  if (!citation) return null;

  const copyURL = () => {
    navigator.clipboard.writeText(citation.url);
    // Show toast: "URL copied!"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-overlay z-40"
          />

          {/* Drawer */}
          <motion.div
            {...slideUp}
            className="
              fixed
              bottom-0 md:top-0 md:bottom-auto
              left-0 md:left-auto
              right-0
              md:w-full md:max-w-md
              bg-bg-surface
              border-t md:border-l md:border-t-0
              border-border-default
              z-50
              overflow-y-auto
              max-h-[80vh] md:max-h-screen
              rounded-t-2xl md:rounded-none
            "
          >
            {/* Header */}
            <div className="sticky top-0 bg-bg-surface border-b border-border-default px-6 py-4 flex items-center justify-between">
              <h3 className="font-ui text-sm font-semibold text-accent-primary">
                SOURCE [{citation.id}]
              </h3>
              <button
                onClick={onClose}
                className="
                  px-3 py-1
                  font-ui text-xs
                  text-text-secondary
                  hover:text-text-primary
                  border border-border-default
                  hover:border-border-emphasis
                  rounded
                  transition-fast
                "
              >
                CLOSE
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <TrustBadge level={citation.trustLevel} />

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1">TITLE</div>
                <div className="font-body text-base text-text-primary">
                  {citation.title}
                </div>
              </div>

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1">SOURCE</div>
                <div className="font-ui text-sm text-text-secondary">
                  {citation.source}
                </div>
              </div>

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1">URL</div>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent-primary hover:underline break-all"
                >
                  {citation.url}
                </a>
                <div className="flex gap-2 mt-2">
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-3 py-1.5
                      font-ui text-xs font-medium
                      text-accent-primary
                      border border-accent-primary/30
                      hover:border-accent-primary
                      hover:bg-hover-bg
                      rounded
                      transition-fast
                    "
                  >
                    Open Source
                  </a>
                  <button
                    onClick={copyURL}
                    className="
                      px-3 py-1.5
                      font-ui text-xs font-medium
                      text-text-secondary
                      border border-border-default
                      hover:border-border-emphasis
                      hover:bg-bg-elevated
                      rounded
                      transition-fast
                    "
                  >
                    Copy URL
                  </button>
                </div>
              </div>

              {citation.snippet && (
                <>
                  <div className="border-t border-border-subtle pt-4" />
                  <div>
                    <div className="font-ui text-xs text-text-tertiary mb-2">PREVIEW</div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      "{citation.snippet}"
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

BEHAVIOR:

- Mobile: Swipe down to close (add touch handlers)
- Desktop: Click backdrop to close
- ESC key to close
- Typewriter sound when opening
- Single citation view (clicking new citation replaces content)

INTEGRATION:

```tsx
const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

<AcademicRenderer
  content={message.content}
  citations={message.citations}
  onCitationClick={(id) => {
    const citation = message.citations?.find(c => c.id === id);
    setSelectedCitation(citation || null);
  }}
/>

<SourceDrawer
  citation={selectedCitation}
  isOpen={selectedCitation !== null}
  onClose={() => setSelectedCitation(null)}
/>
```

DELIVERABLE:
- Complete SourceDrawer.tsx component
- TrustBadge subcomponent
- Mobile bottom sheet behavior
- Desktop sidebar behavior
- Copy URL functionality
```

---

### Session 2.5: FollowUpMatrix Refinement

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Refine FollowUpMatrix component with warm aesthetic and stagger animations

CURRENT STATE:
Follow-up chips exist but need visual polish and better animations.

REQUIREMENTS:

COMPONENT PROPS:

```tsx
interface FollowUpAction {
  icon: string;      // Emoji icon
  label: string;     // Button text
  prompt: string;    // Pre-written prompt to send
}

interface FollowUpMatrixProps {
  onAction: (prompt: string) => void;
  disabled?: boolean;
  mode?: string;     // Different actions per mode
}
```

DEFAULT ACTIONS BY MODE:

```tsx
const FOLLOW_UP_ACTIONS = {
  tutor: [
    { icon: '📝', label: 'QUIZ_ME', prompt: 'Create practice questions on this topic' },
    { icon: '💡', label: 'EXPLAIN_SIMPLER', prompt: 'Explain this in simpler terms' },
    { icon: '📚', label: 'SHOW_EXAMPLE', prompt: 'Give me a concrete example' },
    { icon: '🔍', label: 'CHECK_UNDERSTANDING', prompt: 'Test if I understood this correctly' },
  ],
  research: [
    { icon: '🔗', label: 'FIND_MORE_SOURCES', prompt: 'Find additional sources on this topic' },
    { icon: '📊', label: 'SUMMARIZE', prompt: 'Summarize the key points' },
    { icon: '⚖️', label: 'COMPARE_VIEWS', prompt: 'What are different perspectives on this?' },
    { icon: '📖', label: 'DEEPER_DIVE', prompt: 'Go deeper into this concept' },
  ],
  writing: [
    { icon: '📋', label: 'OUTLINE_THIS', prompt: 'Help me outline this topic' },
    { icon: '✍️', label: 'IMPROVE_THESIS', prompt: 'How can I improve my thesis statement?' },
    { icon: '🎯', label: 'STRENGTHEN_ARGUMENT', prompt: 'How can I make my argument stronger?' },
    { icon: '✅', label: 'CHECK_FLOW', prompt: 'Review the flow and structure' },
  ],
};
```

COMPONENT CODE:

```tsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/utils/animations';

export function FollowUpMatrix({ 
  onAction, 
  disabled = false,
  mode = 'tutor'
}: FollowUpMatrixProps) {
  const actions = FOLLOW_UP_ACTIONS[mode as keyof typeof FOLLOW_UP_ACTIONS] || FOLLOW_UP_ACTIONS.tutor;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2 mt-4"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          variants={staggerItem}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.prompt)}
          disabled={disabled}
          className="
            inline-flex items-center gap-2
            px-3 py-1.5
            font-ui text-xs font-medium
            text-accent-primary
            bg-transparent
            border border-accent-primary/30
            hover:border-accent-primary
            hover:bg-hover-bg
            rounded-lg
            transition-fast
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <span>{action.icon}</span>
          <span>{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
```

STYLING NOTES:

- Icons: Emojis for clarity and warmth
- Labels: Uppercase, Inter font, small size
- Border: Amber, semi-transparent by default
- Hover: Lift 2px, brighten border
- Stagger: 100ms delay between each chip appearing
- Disabled: Reduce opacity, no pointer events

MOBILE CONSIDERATIONS:

- Touch targets: 44px minimum height
- Wrap to multiple rows if needed
- Icons help identify at a glance
- No tooltips on mobile (labels are self-explanatory)

INTEGRATION:

```tsx
{!isGenerating && message.id === lastMessage?.id && (
  <FollowUpMatrix
    onAction={handleSendMessage}
    disabled={isGenerating}
    mode={currentMode}
  />
)}
```

DELIVERABLE:
- Refined FollowUpMatrix.tsx component
- Mode-specific action sets
- Stagger animation working
- Hover lift effect
- Icon + label layout
```

---

## 🎨 Phase 3: Advanced Features (Week 3)

### Session 3.1: Sound Effects System

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Implement sound effects system with volume control and muting

PURPOSE:
Add gentle, kind sound feedback for key interactions (pencil scratch, typewriter, search).

REQUIREMENTS:

SOUND FILES NEEDED:

Place in `public/sounds/`:
- `pencil-scratch.mp3` (0.3s, soft graphite on paper)
- `typewriter.mp3` (0.2s, delicate mechanical click)
- `search-whoosh.mp3` (0.4s, subtle air movement)
- `chime.mp3` (0.5s, very soft bell)
- `tap.mp3` (0.1s, gentle click)

FREE SOURCES:
- Freesound.org
- Zapsplat.com
- Mixkit.co

SOUND MANAGER:

Create `src/utils/soundManager.ts`:

```typescript
type SoundKey = 'pencilScratch' | 'typewriter' | 'searchWhoosh' | 'chime' | 'tap';

interface SoundConfig {
  path: string;
  defaultVolume: number;
}

const SOUNDS: Record<SoundKey, SoundConfig> = {
  pencilScratch: { path: '/sounds/pencil-scratch.mp3', defaultVolume: 0.4 },
  typewriter: { path: '/sounds/typewriter.mp3', defaultVolume: 0.3 },
  searchWhoosh: { path: '/sounds/search-whoosh.mp3', defaultVolume: 0.35 },
  chime: { path: '/sounds/chime.mp3', defaultVolume: 0.25 },
  tap: { path: '/sounds/tap.mp3', defaultVolume: 0.2 },
};

class SoundManager {
  private enabled: boolean = true;
  private masterVolume: number = 1.0;
  private audioCache: Map<SoundKey, HTMLAudioElement> = new Map();
  private lastPlayed: Map<SoundKey, number> = new Map();
  private throttleMs: number = 300; // Don't play same sound more than once per 300ms

  constructor() {
    // Preload sounds
    Object.entries(SOUNDS).forEach(([key, config]) => {
      const audio = new Audio(config.path);
      audio.volume = config.defaultVolume * this.masterVolume;
      this.audioCache.set(key as SoundKey, audio);
    });

    // Load settings from localStorage
    const savedEnabled = localStorage.getItem('soundsEnabled');
    const savedVolume = localStorage.getItem('masterVolume');
    
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }
    if (savedVolume !== null) {
      this.masterVolume = parseFloat(savedVolume);
    }
  }

  play(soundKey: SoundKey, volumeOverride?: number) {
    if (!this.enabled) return;

    // Throttle: Don't play same sound too frequently
    const now = Date.now();
    const lastTime = this.lastPlayed.get(soundKey) || 0;
    if (now - lastTime < this.throttleMs) return;

    const audio = this.audioCache.get(soundKey);
    if (!audio) return;

    // Clone audio to allow overlapping plays
    const sound = audio.cloneNode() as HTMLAudioElement;
    const config = SOUNDS[soundKey];
    const volume = volumeOverride ?? config.defaultVolume;
    sound.volume = volume * this.masterVolume;

    sound.play().catch((err) => {
      console.warn(`Sound play failed: ${soundKey}`, err);
    });

    this.lastPlayed.set(soundKey, now);
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundsEnabled', String(this.enabled));
    return this.enabled;
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('masterVolume', String(this.masterVolume));
    
    // Update all cached audio volumes
    this.audioCache.forEach((audio, key) => {
      audio.volume = SOUNDS[key].defaultVolume * this.masterVolume;
    });
  }

  isEnabled() {
    return this.enabled;
  }

  getVolume() {
    return this.masterVolume;
  }
}

export const soundManager = new SoundManager();

// Convenience function
export const playSound = (soundKey: SoundKey, volume?: number) => {
  soundManager.play(soundKey, volume);
};
```

REACT HOOK:

Create `src/hooks/useSoundEffects.ts`:

```typescript
import { soundManager } from '@/utils/soundManager';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(soundManager.isEnabled());
  const [volume, setVolume] = useState(soundManager.getVolume());

  const toggle = () => {
    const newState = soundManager.toggle();
    setEnabled(newState);
  };

  const updateVolume = (newVolume: number) => {
    soundManager.setVolume(newVolume);
    setVolume(newVolume);
  };

  return {
    enabled,
    volume,
    toggle,
    updateVolume,
    play: soundManager.play.bind(soundManager),
  };
}
```

USAGE IN COMPONENTS:

ThinkingDrawer:
```tsx
import { playSound } from '@/utils/soundManager';

const handleToggle = () => {
  if (!isOpen) {
    playSound('pencilScratch', 0.4);
  }
  setIsOpen(!isOpen);
};
```

Citation appearance:
```tsx
useEffect(() => {
  if (citation) {
    playSound('typewriter', 0.3);
  }
}, [citation]);
```

Search start:
```tsx
const handleSearch = async () => {
  playSound('searchWhoosh', 0.35);
  // ... search logic
};
```

SETTINGS UI:

Add to settings menu:

```tsx
function SoundSettings() {
  const { enabled, volume, toggle, updateVolume } = useSoundEffects();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-ui text-sm text-text-primary">Sound Effects</span>
        <button
          onClick={toggle}
          className={`
            px-3 py-1
            font-ui text-xs font-medium
            ${enabled ? 'text-accent-primary bg-hover-bg' : 'text-text-secondary'}
            border border-border-default
            rounded
            transition-fast
          `}
        >
          {enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {enabled && (
        <div>
          <label className="font-ui text-xs text-text-tertiary">Volume</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => updateVolume(parseInt(e.target.value) / 100)}
            className="w-full mt-2"
          />
        </div>
      )}
    </div>
  );
}
```

DELIVERABLE:
- soundManager.ts utility
- useSoundEffects.ts hook
- Sound files placed in public/sounds/
- Integration examples in ThinkingDrawer, Citations
- Settings UI for muting and volume control
```

---

### Session 3.2: System Prompts Update

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Update AI system prompts to be more strategic and pedagogically effective

CONTEXT:
Current system prompts are probably too generic. Need specific, strategic prompts that force the AI to behave like a proper tutor/researcher.

REQUIREMENTS:

Create `src/config/systemPrompts.ts`:

```typescript
export const SYSTEM_PROMPTS = {
  tutor: `You are a Socratic tutor for high school and university students. Your ONLY goal is to guide them to discover answers themselves.

CRITICAL RULES:
1. NEVER provide direct answers or solutions
2. ALWAYS respond with clarifying questions
3. Break complex problems into smaller steps
4. Praise their thinking process, not just correct answers
5. If they're stuck, provide a hint by asking "What do you know about [concept]?"

RESPONSE STRUCTURE:
Every response must have two parts:

<reasoning>
- What misconception might they have?
- What's the underlying concept they need?
- What question will guide them without giving it away?
- What's my pedagogical strategy here?
</reasoning>

<response>
[Your student-facing guidance - questions, hints, encouragement]
Never include formulas, answers, or step-by-step solutions.
Instead, ask questions that lead them to discover these themselves.
</response>

EXAMPLES:

Student: "What's the answer to 2x + 5 = 15?"

BAD Response: "First, subtract 5 from both sides to get 2x = 10, then divide by 2 to get x = 5."

GOOD Response: "Let's think about this together. What operation is being done to x in this equation? If we want to 'undo' that operation, what would we need to do first? Start with the +5 - how can we get rid of that on the left side?"

TONE: Encouraging, patient, curious. Like a study buddy who's one step ahead.`,

  research: `You are an academic research assistant specializing in source verification and comprehensive information gathering.

MANDATORY REQUIREMENTS:
1. Every factual claim MUST have a citation [1][2][3]
2. Prioritize sources in this order:
   - Peer-reviewed journals (.edu, academic publishers)
   - Government/institutional sources (.gov, .org)
   - Established publications (NYT, Nature, Science)
   - General web (only if no better sources exist)
3. When sources disagree, present BOTH perspectives
4. If you're not confident, say "I found limited reliable sources on this"

CITATION FORMAT:
- Inline: Place [1] at the end of the sentence being supported
- Multiple sources for one claim: [1][2][3]
- Source details in final section

RESPONSE STRUCTURE:

[Your comprehensive answer with inline citations]

---
<sources>
[1] Title | Publisher | URL | verified/reliable/general
[2] ...
</sources>

ANTI-HALLUCINATION CHECKS:
- If asked about recent events (after Jan 2025), explicitly state you may not have current info
- If only one source exists, flag this: "Note: Limited sources available"
- If sources conflict, explain: "There's debate on this topic..."

TONE: Objective, thorough, transparent about limitations.`,

  writing: `You are a writing coach helping students craft academic essays and papers.

YOUR ROLE:
- Help brainstorm and outline
- Suggest improvements to structure
- Refine thesis statements
- Improve clarity and flow

CRITICAL: NEVER write full essays or paragraphs for them.

Instead:
- Provide sentence starters
- Suggest better word choices
- Explain rhetorical strategies
- Give feedback on their drafts

WORKFLOW:

1. Understand their assignment
   "What's the prompt or question you're addressing?"

2. Develop thesis
   "What's your main argument? Try stating it in one sentence."

3. Structure outline
   "What are the key points that support your thesis?"

4. Refine drafts
   "This paragraph is unclear because... Try restructuring it by..."

EXAMPLES:

Student: "Can you write my introduction?"

BAD: [Writes full introduction]

GOOD: "Let's build it together. What's your thesis? Good! Now, how can you grab the reader's attention in your opening sentence? What context do they need before you present your argument?"

TONE: Supportive, constructive, focused on teaching writing skills.`,

  'study-buddy': `You are a Study Buddy AI helping students prepare for exams and master material.

YOUR CAPABILITIES:
1. Generate study guides from topics
2. Create practice problems and quizzes
3. Make flashcards for memorization
4. Simplify complex concepts
5. Test their understanding

WORKFLOW:

When student asks for study materials:

Step 1: Clarify scope
"What specific topics should I cover? Is this for a quiz, midterm, or final?"

Step 2: Generate structured content
Use clear headings, bullet points, examples

Step 3: Include self-test questions
At the end, add 3-5 practice questions with answers in <answers> tag

STUDY GUIDE FORMAT:

# [Topic] Study Guide

## Key Concepts
- Concept 1: Definition
- Concept 2: Definition

## Important Formulas/Rules
[If applicable]

## Common Mistakes to Avoid
- Mistake 1: Why it's wrong
- Mistake 2: Why it's wrong

## Practice Problems
1. [Problem]
2. [Problem]

<answers>
1. [Answer with explanation]
2. [Answer with explanation]
</answers>

TONE: Supportive, organized, clear. Like a peer who's really good at making study materials.`,

  'deep-dive': `You are an expert research assistant for advanced topics and in-depth learning.

CAPABILITIES:
- Multi-source synthesis
- Concept mapping and connections
- Expert-level explanations
- Primary source analysis
- Interdisciplinary connections

APPROACH:

1. Comprehensive Overview
   - Historical context
   - Current understanding
   - Key debates/controversies

2. Deep Analysis
   - Underlying principles
   - Connections to other fields
   - Real-world applications

3. Advanced Resources
   - Suggest academic papers
   - Recommend textbooks
   - Point to expert lectures

4. Visual Thinking
   - Describe concept maps
   - Suggest diagrams
   - Explain relationships visually

RESPONSE STRUCTURE:

[Comprehensive explanation with multiple perspectives]

---
CONNECTIONS:
- Related Topic 1: How it connects
- Related Topic 2: How it connects

FURTHER READING:
[1] Advanced source
[2] Foundational text
[3] Recent research

TONE: Intellectual, thorough, assumes advanced understanding.`,
};
```

INTEGRATION WITH WORKER:

Update your Cloudflare Worker to use these prompts:

```typescript
// In worker/src/index.ts
import { SYSTEM_PROMPTS } from './systemPrompts';

app.post('/api/chat', async (c) => {
  const { message, mode } = await c.req.json();
  
  const systemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.tutor;
  
  const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-thinking-exp:free', // Or your preferred model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      stream: true,
    }),
  });
  
  // ... streaming logic
});
```

PARSING RESPONSES:

Update your streaming parser to extract tags:

```typescript
// Parse <reasoning> and <response> tags
let inReasoningBlock = false;
let inResponseBlock = false;
let reasoningContent = '';
let responseContent = '';

for (const line of lines) {
  if (line.includes('<reasoning>')) {
    inReasoningBlock = true;
    continue;
  }
  if (line.includes('</reasoning>')) {
    inReasoningBlock = false;
    continue;
  }
  if (line.includes('<response>')) {
    inResponseBlock = true;
    continue;
  }
  if (line.includes('</response>')) {
    inResponseBlock = false;
    continue;
  }
  
  if (inReasoningBlock) {
    reasoningContent += line;
    // Send as reasoning type
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'reasoning', 
      text: line 
    })}\n\n`));
  } else if (inResponseBlock) {
    responseContent += line;
    // Send as content type
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'content', 
      text: line 
    })}\n\n`));
  }
}
```

DELIVERABLE:
- systemPrompts.ts file with all 5 modes
- Updated Worker to use prompts
- Response parsing logic for <reasoning> and <response> tags
- Example of improved AI behavior in Tutor mode
```

---

## 🚀 Phase 4: Polish & Optimization (Week 4)

### Session 4.1: Mobile Gestures

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Add swipe gestures for mobile interactions

REQUIREMENTS:

Install dependencies:
```bash
npm install react-use-gesture
```

GESTURES TO IMPLEMENT:

1. ThinkingDrawer: Swipe up to expand
2. SourceDrawer: Swipe down to close
3. Message: Long press to copy

CREATE GESTURE HOOKS:

`src/hooks/useSwipeGesture.ts`:

```typescript
import { useGesture } from '@use-gesture/react';

interface SwipeConfig {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // Minimum distance in px
}

export function useSwipeGesture({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeConfig) {
  const bind = useGesture({
    onDrag: ({ movement: [mx, my], direction: [dx, dy], distance, cancel }) => {
      // Vertical swipe
      if (Math.abs(my) > Math.abs(mx) && distance > threshold) {
        if (dy < 0 && onSwipeUp) {
          onSwipeUp();
          cancel();
        } else if (dy > 0 && onSwipeDown) {
          onSwipeDown();
          cancel();
        }
      }
      
      // Horizontal swipe
      if (Math.abs(mx) > Math.abs(my) && distance > threshold) {
        if (dx < 0 && onSwipeLeft) {
          onSwipeLeft();
          cancel();
        } else if (dx > 0 && onSwipeRight) {
          onSwipeRight();
          cancel();
        }
      }
    },
  });

  return bind;
}
```

USAGE IN THINKING DRAWER:

```tsx
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

export function ThinkingDrawer({ ... }: ThinkingDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const swipeBind = useSwipeGesture({
    onSwipeUp: () => setIsOpen(true),
    onSwipeDown: () => setIsOpen(false),
    threshold: 30,
  });

  return (
    <div {...swipeBind()} className="...">
      {/* Component content */}
    </div>
  );
}
```

USAGE IN SOURCE DRAWER:

```tsx
const swipeBind = useSwipeGesture({
  onSwipeDown: onClose,
  threshold: 50,
});

return (
  <motion.div {...swipeBind()} className="...">
    {/* Drawer content */}
  </motion.div>
);
```

LONG PRESS FOR COPY:

`src/hooks/useLongPress.ts`:

```typescript
import { useCallback, useRef } from 'react';

interface LongPressConfig {
  onLongPress: () => void;
  delay?: number; // ms
}

export function useLongPress({ 
  onLongPress, 
  delay = 500 
}: LongPressConfig) {
  const timerRef = useRef<NodeJS.Timeout>();

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onLongPress();
      // Optional: Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, delay);
  }, [onLongPress, delay]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchMove: cancel,
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
  };
}
```

USAGE IN MESSAGE:

```tsx
const longPressBind = useLongPress({
  onLongPress: () => {
    navigator.clipboard.writeText(message.content);
    // Show toast: "Message copied"
  },
  delay: 500,
});

return (
  <div {...longPressBind} className="...">
    {message.content}
  </div>
);
```

MOBILE-ONLY ACTIVATION:

```tsx
const isMobile = window.innerWidth < 768;

{isMobile && (
  <div {...swipeBind()}>
    {/* Content */}
  </div>
)}
```

DELIVERABLE:
- useSwipeGesture hook
- useLongPress hook
- Integration in ThinkingDrawer
- Integration in SourceDrawer
- Long press copy in messages
```

---

### Session 4.2: Performance Optimization

**Paste this into Cursor Composer:**

```
@DESIGN_SYSTEM.md

TASK: Optimize performance for smooth 60fps animations and fast rendering

CRITICAL AREAS:

1. LAZY LOAD LATEX RENDERING

Only render math formulas when they're in viewport:

```tsx
import { useInView } from 'react-intersection-observer';

function LazyLatex({ formula, inline }: { formula: string; inline?: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px', // Start loading slightly before visible
  });

  return (
    <span ref={ref}>
      {inView ? (
        <Latex formula={formula} inline={inline} />
      ) : (
        <span className="text-text-tertiary">...</span>
      )}
    </span>
  );
}
```

2. VIRTUALIZE LONG MESSAGE LISTS

Install:
```bash
npm install @tanstack/react-virtual
```

Usage:
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function ChatMessages({ messages }: { messages: Message[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Estimate message height
    overscan: 5, // Render 5 extra messages above/below viewport
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Message message={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

3. DEBOUNCE INPUT

```tsx
import { useDebouncedCallback } from 'use-debounce';

const debouncedResize = useDebouncedCallback(
  (value) => {
    // Resize textarea
  },
  100
);
```

4. MEMOIZE EXPENSIVE RENDERS

```tsx
import { memo, useMemo } from 'react';

export const AcademicRenderer = memo(({ content, citations }: Props) => {
  const processedContent = useMemo(() => {
    // Heavy processing
    return parseContent(content);
  }, [content]);

  return <div>{processedContent}</div>;
});
```

5. OPTIMIZE FRAMER MOTION

Use `layout` animations sparingly:

```tsx
// Avoid this (expensive):
<motion.div layout>

// Prefer this (cheaper):
<motion.div
  initial={{ height: 0 }}
  animate={{ height: 'auto' }}
>
```

Use `will-change` for frequently animated elements:

```css
.frequently-animated {
  will-change: transform, opacity;
}
```

6. IMAGE OPTIMIZATION

Lazy load images:
```tsx
<img 
  src={url} 
  loading="lazy"
  decoding="async"
/>
```

7. CODE SPLITTING

Dynamic imports for heavy components:

```tsx
const SourceDrawer = lazy(() => import('./SourceDrawer'));

<Suspense fallback={<div>Loading...</div>}>
  <SourceDrawer ... />
</Suspense>
```

DELIVERABLE:
- Lazy loading for LaTeX
- Virtual scrolling for messages (optional, if >50 messages)
- Memoized AcademicRenderer
- Debounced input resize
- Code splitting for heavy components
- Performance measurements (Chrome DevTools)
```

---

## ✅ Final Checklist

After completing all sessions, verify:

### Visual Design
- [ ] Background is warm charcoal (#1a1816), not cold black
- [ ] Accent color is warm amber (#fb923c), not harsh orange
- [ ] Typography uses mixed fonts (display, body, UI, mono)
- [ ] All animations feel gentle and kind (300-400ms ease-out)

### Components
- [ ] CommandDeck has status bar with mode + fuel gauge
- [ ] Fuel gauge shows visual blocks (▓▓▓░░░)
- [ ] ThinkingDrawer collapses/expands with pencil scratch sound
- [ ] Citations are clickable amber badges
- [ ] SourceDrawer slides in with typewriter sound
- [ ] FollowUpMatrix chips stagger entrance with icons

### Functionality
- [ ] Sounds play at appropriate times (can be muted)
- [ ] System prompts force proper tutor/research behavior
- [ ] AI responses parse <reasoning> and <response> tags
- [ ] Credits update after each message
- [ ] Mobile gestures work (swipe up/down)
- [ ] Long press copies message on mobile

### Performance
- [ ] Animations are smooth (60fps)
- [ ] No jank when scrolling messages
- [ ] LaTeX renders without blocking UI
- [ ] Sounds don't overlap or glitch

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces state changes
- [ ] Focus indicators visible
- [ ] Reduced motion respected
- [ ] Color contrast meets WCAG AA

---

## 🎯 Quick Reference

**Cursor Workflow:**
1. Read DESIGN_SYSTEM.md first
2. Use one session prompt at a time
3. Test output before moving to next session
4. Commit after each successful session

**Key Files to Create:**
- `tailwind.config.js` (updated colors + fonts)
- `src/utils/animations.ts` (Framer Motion variants)
- `src/utils/soundManager.ts` (sound effects)
- `src/config/systemPrompts.ts` (AI behavior)
- `src/components/CommandDeck.tsx`
- `src/components/ThinkingDrawer.tsx`
- `src/components/AcademicRenderer.tsx`
- `src/components/SourceDrawer.tsx`
- `src/components/FollowUpMatrix.tsx`

**Testing Checkpoints:**
- After Session 1.1: Colors look warm
- After Session 2.1: CommandDeck works on mobile
- After Session 2.2: ThinkingDrawer expands smoothly
- After Session 2.3: LaTeX renders beautifully
- After Session 3.2: AI behaves like proper tutor

**If Cursor Gets Confused:**
- Reference @DESIGN_SYSTEM.md explicitly
- Break task into smaller sub-tasks
- Show example of what you want
- Ask it to explain its approach first

---

## 💡 Pro Tips

1. **Start with colors** - Biggest visual impact, easiest to test
2. **Test mobile first** - Catches layout issues early
3. **One component at a time** - Don't overwhelm Cursor
4. **Commit frequently** - Easy rollback if something breaks
5. **Use browser DevTools** - Check animations, measure performance
6. **Get user feedback** - After each phase, show students

**This is your complete implementation roadmap. Paste sessions into Cursor one at a time, test thoroughly, and build the warmest, most educational AI study companion!** 🚀

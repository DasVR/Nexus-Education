# Nexus Scholar Design System
**Version 1.0** | Last Updated: February 13, 2026

---

## 🎯 Design Philosophy

### Core Principles
**Warm Minimalism** - Not cold, not cluttered. Cozy and focused.
- Students should feel supported, not intimidated
- Every element serves learning, nothing is decorative
- Dark mode that feels like a warm study space at night

**Kind Interactions** - Gentle, responsive, never harsh
- Animations that breathe and ease, never snap
- Feedback that guides, never punishes
- Sounds that delight, never annoy

**Mobile-First Excellence** - Built for thumbs, enhanced for desktops
- Single-column layouts, thumb-friendly zones
- Swipe gestures feel natural
- Desktop gets more information density, not complexity

**Trust Through Transparency** - Show the work, cite the sources
- Reasoning process is visible (but collapsible)
- Sources are verifiable and prominent
- Budget/credit usage is honest and clear

---

## 🎨 Color System

### Dark Mode Foundation (Default)

```css
/* Background Layers */
--bg-primary: #1a1816;      /* Deep warm charcoal - main canvas */
--bg-surface: #2c2725;      /* Elevated cards/panels */
--bg-elevated: #3d3735;     /* Modals, drawers, overlays */

/* Text Hierarchy */
--text-primary: #f5f3f0;    /* Main content - soft off-white */
--text-secondary: #a8a29e;  /* Supporting text - warm mid-gray */
--text-tertiary: #78716c;   /* Subtle labels - warm dark-gray */
--text-disabled: #57534e;   /* Inactive elements */

/* Accent Colors */
--accent-primary: #fb923c;  /* Amber/peach - primary actions, links */
--accent-hover: #f97316;    /* Darker amber - hover states */
--accent-subtle: #fdba74;   /* Light amber - backgrounds, highlights */

/* Semantic Colors */
--success: #84cc16;         /* Muted sage - verified sources, success */
--success-bg: #3f6212;      /* Success background */
--warning: #fbbf24;         /* Warm gold - low credits, caution */
--warning-bg: #78350f;      /* Warning background */
--error: #f87171;           /* Soft coral - errors, critical */
--error-bg: #7f1d1d;        /* Error background */

/* Special States */
--verified: #84cc16;        /* Academic/verified sources */
--reliable: #60a5fa;        /* Established sources */
--unverified: #a8a29e;      /* General web sources */

/* Borders & Dividers */
--border-subtle: #3d3735;   /* Barely-there dividers */
--border-default: #57534e;  /* Standard borders */
--border-emphasis: #78716c; /* Highlighted borders */

/* Interactive States */
--overlay: rgba(0, 0, 0, 0.6);        /* Drawer backdrops */
--hover-bg: rgba(251, 146, 60, 0.1);  /* Hover backgrounds */
--active-bg: rgba(251, 146, 60, 0.15); /* Active/pressed */
--focus-ring: rgba(251, 146, 60, 0.4); /* Focus indicators */
```

### Usage Guidelines

**Backgrounds:**
- Main app: `--bg-primary`
- Chat messages, cards: `--bg-surface`
- Modals, drawers, tooltips: `--bg-elevated`

**Text:**
- Headlines, body text: `--text-primary`
- Captions, timestamps: `--text-secondary`
- Labels, metadata: `--text-tertiary`

**Accents:**
- Primary CTA buttons: `--accent-primary`
- Links, citations, interactive elements: `--accent-primary`
- Hover states: `--accent-hover`
- Selected states, highlights: `--accent-subtle`

**Semantic:**
- Success messages, verified badges: `--success`
- Low credit warnings: `--warning`
- Error messages: `--error`

---

## 📐 Typography

### Font Families

```css
/* Primary Fonts */
--font-display: 'Plus Jakarta Sans', -apple-system, system-ui, sans-serif;
--font-body: 'Crimson Pro', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
--font-ui: 'Inter', -apple-system, system-ui, sans-serif;
```

### Type Scale

```css
/* Mobile-First Scale */
--text-xs: 0.75rem;      /* 12px - labels, captions */
--text-sm: 0.875rem;     /* 14px - body small, UI text */
--text-base: 1rem;       /* 16px - body text */
--text-lg: 1.125rem;     /* 18px - emphasized body */
--text-xl: 1.25rem;      /* 20px - small headings */
--text-2xl: 1.5rem;      /* 24px - section headings */
--text-3xl: 1.875rem;    /* 30px - page headings */
--text-4xl: 2.25rem;     /* 36px - hero text (desktop only) */

/* Line Heights */
--leading-tight: 1.25;   /* Headlines */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* AI responses, reading content */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### Typography Usage

**Headers (Display Font - Plus Jakarta Sans)**
```css
h1, .heading-1 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

h2, .heading-2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

h3, .heading-3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}
```

**Body Text (Serif - Crimson Pro)**
```css
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

/* AI Response Text (warm, readable) */
.ai-response {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}
```

**UI Elements (Sans - Inter)**
```css
.ui-label, button, input {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: 0.01em;
}
```

**Code/Math (Mono - JetBrains Mono)**
```css
code, pre, .math-inline {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
```

---

## 🎭 Animation System

### Timing & Easing

```css
/* Duration Tokens */
--duration-instant: 100ms;   /* Hover feedback */
--duration-fast: 150ms;      /* Button clicks, toggles */
--duration-base: 300ms;      /* Standard transitions */
--duration-slow: 400ms;      /* Drawers, modals */
--duration-delightful: 600ms; /* Sketch animations, typewriter */

/* Easing Functions */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Gentle landing (default) */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    /* Smooth both ways */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle bounce (use sparingly) */
```

### Animation Principles

**Gentle & Kind**
- All movements should feel soft, never jarring
- Use `ease-out` as default (things slow down as they arrive)
- Avoid sharp stops - let things gently settle

**Responsive**
- Fast feedback for interactions (150ms hover)
- Medium for content changes (300ms)
- Slow for meaningful reveals (400-600ms)

**Purposeful**
- Every animation should communicate state or guide attention
- Don't animate just for decoration
- If it doesn't help the user, remove it

### Standard Transitions

```css
/* Interactive Elements */
.button, .link, .badge {
  transition: all var(--duration-fast) var(--ease-out);
}

/* Content Reveals */
.drawer, .modal, .accordion {
  transition: all var(--duration-base) var(--ease-out);
}

/* Delightful Moments */
.typewriter-effect, .sketch-animation {
  transition: all var(--duration-delightful) var(--ease-out);
}

/* Hover States (breathing) */
.hover-breathe:hover {
  transform: scale(1.02);
  transition: transform var(--duration-instant) var(--ease-out);
}
```

### Framer Motion Variants

```javascript
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

// Sketch emerging (SVG path animation)
export const sketchDraw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { 
    pathLength: { duration: 0.6, ease: 'easeOut' },
    opacity: { duration: 0.2 }
  }
};
```

---

## 🔊 Sound Design

### Sound Library

```javascript
// Sound file paths
const sounds = {
  // Thinking Drawer
  pencilScratch: '/sounds/pencil-scratch.mp3',  // 0.3s, soft graphite on paper
  
  // Citations & Sources
  typewriter: '/sounds/typewriter.mp3',         // 0.2s, delicate mechanical click
  
  // Web Search
  searchWhoosh: '/sounds/search-whoosh.mp3',    // 0.4s, subtle air movement
  
  // Success States
  chime: '/sounds/chime.mp3',                   // 0.5s, very soft bell (optional)
  
  // Interactions
  buttonTap: '/sounds/tap.mp3',                 // 0.1s, gentle click
};
```

### Sound Triggers

| Event | Sound | Volume | When |
|-------|-------|--------|------|
| ThinkingDrawer expands | `pencilScratch` | 40% | User clicks to reveal reasoning |
| Citation badge appears | `typewriter` | 30% | Each citation rendered (throttled) |
| Web search starts | `searchWhoosh` | 35% | Research mode fetches sources |
| Answer completes | `chime` | 25% | Full response finished (optional) |
| Button click | `buttonTap` | 20% | Any interactive element |

### Sound Guidelines

**Default State:** ON (but respectful)
- Sounds should be subtle, never intrusive
- Students can mute globally in settings
- Volume levels are conservative (20-40%)

**Throttling:**
- Don't play same sound more than once per 300ms
- For typewriter (citations), limit to every 500ms even if multiple appear

**Accessibility:**
- Provide visual alternatives for every sound
- Never rely on sound alone to communicate state
- Include "Reduce Motion & Sound" setting

**Implementation:**
```javascript
// Sound manager with volume control
const playSound = (soundKey, volume = 1) => {
  if (!soundsEnabled) return;
  
  const audio = new Audio(sounds[soundKey]);
  audio.volume = volume * masterVolume; // Respect global setting
  audio.play().catch(() => {}); // Fail silently if blocked
};

// Throttled version for rapid triggers
const throttledTypewriter = throttle(() => {
  playSound('typewriter', 0.3);
}, 500);
```

---

## 📱 Responsive Layout

### Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
```

### Layout Patterns

**Mobile (< 768px)**
- Single column
- Bottom sheets for drawers
- Sticky input at bottom
- Swipe gestures enabled
- Touch targets minimum 44px

**Tablet (768px - 1024px)**
- Single column with wider max-width
- Side drawers (right-side slide)
- More breathing room
- Hybrid touch + mouse

**Desktop (> 1024px)**
- Optional sidebar for modes
- Multiple columns possible
- Hover states more prominent
- Keyboard shortcuts enabled

### Touch Zones (Mobile)

```
┌─────────────────────────┐
│  Status Bar (read-only) │ ← Top 60px: glanceable info
├─────────────────────────┤
│                         │
│   Content Area          │ ← Middle: scrollable, swipeable
│   (chat messages)       │
│                         │
├─────────────────────────┤
│  Input + Actions        │ ← Bottom 120px: thumb zone
└─────────────────────────┘
```

**Thumb-Friendly Zone:**
- Bottom 25% of screen
- Primary actions here (send, mode switch, voice)
- Secondary actions in middle (citations, follow-ups)
- Tertiary in top (settings, menu)

### Swipe Gestures

| Gesture | Action | Component |
|---------|--------|-----------|
| Swipe up on message | Expand ThinkingDrawer | Message |
| Swipe down on drawer | Close drawer | Any drawer |
| Swipe left on citation | Open source | Citation badge |
| Long press on message | Copy text | Message |

---

## 🧩 Component Specifications

### CommandDeck (Bottom Input Area)

**Purpose:** Main input interface with credit tracking

**States:**
- Default: Subtle credit display
- Low Credit (<20%): Warning color (amber)
- Critical (<5%): Urgent pulse animation
- Out of Credit: Disabled with upgrade CTA

**Mobile Layout:**
```
┌─────────────────────────────────────┐
│ 🔥 Credits: ▓▓▓▓▓░░░░ $3.50/$5.00  │ ← Status bar
├─────────────────────────────────────┤
│ Type your question...               │ ← Auto-resize textarea
│                                     │
│ [🎤] [📸]              [Send] ────→ │ ← Action buttons
└─────────────────────────────────────┘
```

**Animations:**
- Input focus: Gentle border glow (300ms)
- Credit bar: Smooth depletion (not jumpy)
- Low credit: Pulse warning icon (2s loop)
- Send button: Appears with fade-in when text entered

**Behavior:**
- Textarea auto-expands (max 4 lines mobile, 8 desktop)
- Enter to send, Shift+Enter for new line
- Voice/Image buttons disabled if out of credit
- Credit display updates after each message

### ThinkingDrawer (Reasoning Accordion)

**Purpose:** Show AI's step-by-step reasoning process (Tutor mode only)

**States:**
- Collapsed (default): Shows "> REASONING PROCESS..." with pulse
- Expanding: Pencil scratch sound + smooth height animation
- Expanded: Full reasoning text visible
- Generating: Pulsing dot indicator

**Mobile Layout (Collapsed):**
```
┌─────────────────────────────────────┐
│ > REASONING PROCESS... ●            │ ← Tap to expand
│   [Tap to see how I'm thinking]    │
└─────────────────────────────────────┘
```

**Mobile Layout (Expanded):**
```
┌─────────────────────────────────────┐
│ ∨ REASONING PROCESS...              │ ← Tap to collapse
├─────────────────────────────────────┤
│ 1. First, I need to identify...    │
│ 2. The key concept here is...      │
│ 3. To guide without giving the     │
│    answer, I'll ask...             │
│                                     │
└─────────────────────────────────────┘
```

**Animations:**
- Pulse indicator: Scale 1 → 1.05 (2s loop) while generating
- Expand: Height auto + opacity (400ms ease-out) + pencil sound
- Collapse: Reverse animation (300ms)
- Caret rotation: 0° → 90° (150ms)

**Behavior:**
- Auto-expands after 5 seconds on PAID tier
- Remains collapsed on FREE tier (requires click)
- Swipe up on mobile = expand
- Content is code-block styled (monospace, muted color)

### AcademicRenderer (Message Display)

**Purpose:** Render AI responses with LaTeX, markdown, and citations

**Features:**
- Full markdown support (headers, lists, emphasis)
- LaTeX math rendering (inline `$x$` and block `$$formula$$`)
- Inline citation badges `[1]` that are clickable
- Code blocks with syntax highlighting

**Citation Badge Design:**
```css
.citation-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  margin: 0 2px;
  font-size: var(--text-xs);
  font-family: var(--font-ui);
  font-weight: var(--weight-medium);
  color: var(--accent-primary);
  background: var(--hover-bg);
  border: 1px solid var(--accent-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.citation-badge:hover {
  background: var(--accent-subtle);
  border-color: var(--accent-hover);
  transform: translateY(-1px);
}
```

**LaTeX Rendering:**
- Use KaTeX for rendering
- Inline math: small, inline with text
- Block math: centered, larger, with padding
- Copy button on hover (desktop)

**Markdown Styling:**
- Headers: Display font (Plus Jakarta Sans), amber color
- Lists: Bullet points with amber bullets
- Emphasis: Italic serif font
- Strong: Semibold weight
- Links: Amber underline on hover

### SourceDrawer (Citation Details)

**Purpose:** Show full details of clicked citation

**Mobile:** Bottom sheet
**Desktop:** Right sidebar

**Content Structure:**
```
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
│  organelles that generate most of  │
│  the chemical energy needed..."    │
│                                     │
└─────────────────────────────────────┘
```

**Trust Badges:**
- 🟢 Verified (green): .edu, .gov, peer-reviewed
- 🔵 Reliable (blue): Established publications
- ⚪ General (gray): Other web sources

**Animations:**
- Mobile: Slide up from bottom (400ms)
- Desktop: Slide in from right (400ms)
- Backdrop: Fade in (200ms)
- Typewriter sound when drawer opens

**Behavior:**
- Clicking another citation replaces content (not new drawer)
- Swipe down (mobile) or click backdrop to close
- "Open Source" opens URL in new tab
- "Copy URL" copies to clipboard with toast confirmation

### FollowUpMatrix (Action Chips)

**Purpose:** Quick actions after AI responds

**Actions:**
- QUIZ_ME → Generate practice questions
- EXPLAIN_SIMPLER → ELI5 version
- SHOW_EXAMPLE → Provide concrete example
- FIND_SOURCES → Deep research mode
- (Custom based on context)

**Layout:**
```
[📝 QUIZ_ME] [💡 EXPLAIN_SIMPLER] [📚 SHOW_EXAMPLE]
```

**Chip Design:**
```css
.action-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--accent-primary);
  background: transparent;
  border: 1px solid var(--accent-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.action-chip:hover {
  background: var(--hover-bg);
  border-color: var(--accent-hover);
  transform: translateY(-2px);
}
```

**Animations:**
- Stagger entrance: Each chip delays by 100ms
- Fade + slide up from y:10
- Hover: Lift 2px with subtle shadow
- Click: Scale down to 0.95 briefly

**Behavior:**
- Appears after AI finishes responding
- Sends pre-prompted message to AI
- Disabled while generating new response
- Context-aware (different actions per mode)

### ModeSelector (Navigation)

**Purpose:** Switch between Tutor, Research, Writing, Study Buddy, Deep Dive

**Mobile:** Bottom navigation or drawer
**Desktop:** Left sidebar

**Mode Indicators:**
```
● TUTOR       (active - filled circle)
○ RESEARCH    (inactive - outline circle)
○ WRITING
○ STUDY BUDDY
○ DEEP DIVE
```

**Design:**
```css
.mode-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
}

.mode-button.active {
  color: var(--accent-primary);
  background: var(--hover-bg);
}

.mode-button:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}
```

**Animations:**
- Mode switch: Smooth transition (300ms)
- Active indicator: Scale pulse once on change
- Content: Cross-fade between modes

**Behavior:**
- Each mode has unique system prompt
- Mode persists in session
- Shows mode-specific UI (ThinkingDrawer in Tutor only)
- Credit usage same across modes

---

## 🎯 Mode Specifications

### Mode 1: Tutor (Socratic Learning)

**System Prompt:**
```
You are an educational tutor focused on guiding students to discover 
answers themselves. NEVER provide direct answers.

For EVERY response:
1. Wrap your reasoning in <reasoning> tags
2. Wrap student-facing guidance in <response> tags

Reasoning should include:
- What concepts are involved
- Pedagogical approach
- How to scaffold the learning

Response should include:
- Clarifying questions
- Hints toward the solution
- Encouragement to try specific steps
- Feedback on their thinking

CRITICAL: Guide, don't solve. Ask questions, don't give answers.
```

**UI Behavior:**
- ThinkingDrawer is ALWAYS present
- Citations for concepts explained
- Follow-ups: QUIZ_ME, EXPLAIN_SIMPLER, SHOW_STEPS

**Free vs Paid:**
- Free: ThinkingDrawer requires click
- Paid: Auto-expands after 3 seconds

### Mode 2: Research (Deep Sourcing)

**System Prompt:**
```
You are a research assistant providing comprehensive, cited information.

Requirements:
- Every claim must have a citation [1][2][3]
- Prioritize academic sources (.edu, peer-reviewed)
- Present multiple perspectives when debate exists
- Include source quality in reasoning

Format citations as: [number] at the end of sentences
Provide source details in <sources> tag:
<sources>
[1] Title | Source | URL | Trust Level
[2] ...
</sources>
```

**UI Behavior:**
- Heavy citation usage
- SourceDrawer prominent
- Trust badges on all sources
- Follow-ups: FIND_MORE_SOURCES, SUMMARIZE, COMPARE_VIEWS

**Free vs Paid:**
- Free: Max 3 sources per query
- Paid: Unlimited sources + deep research

### Mode 3: Writing (Essay Assistant)

**System Prompt:**
```
You are a writing assistant helping students craft academic essays.

Your role:
- Help brainstorm and outline
- Suggest improvements to structure
- Refine thesis statements
- Improve clarity and flow

NEVER write full essays or paragraphs for them.
Instead:
- Provide sentence starters
- Suggest better word choices
- Explain rhetorical strategies
- Give feedback on their drafts
```

**UI Behavior:**
- Minimal citations (unless researching topic)
- Focus on structure and clarity
- Follow-ups: OUTLINE_THIS, IMPROVE_THESIS, CHECK_GRAMMAR

**Free vs Paid:**
- Free: 3 revision rounds per day
- Paid: Unlimited revisions + plagiarism check

### Mode 4: Study Buddy (Exam Prep)

**System Prompt:**
```
You are a study partner helping students prepare for exams.

You can:
- Generate study guides from notes/topics
- Create practice problems and quizzes
- Make flashcards for memorization
- Explain difficult concepts simply
- Test their understanding

Always:
- Ask permission before generating content
- Provide answer keys separately (collapsed by default)
- Adapt difficulty to their responses
- Track topics they struggle with
```

**UI Behavior:**
- Generates structured study materials
- Collapsible answer sections
- Progress tracking (topics mastered)
- Follow-ups: MORE_PRACTICE, HARDER_PROBLEMS, REVIEW_MISTAKES

**Free vs Paid:**
- Free: 1 study guide per day
- Paid: Unlimited + spaced repetition scheduling

### Mode 5: Deep Dive (Advanced Research)

**System Prompt:**
```
You are an expert research assistant for advanced topics.

Capabilities:
- Multi-source synthesis
- Concept mapping and connections
- Expert-level explanations
- Primary source analysis
- Interdisciplinary connections

Provide:
- Comprehensive overviews
- Historical context
- Current debates in the field
- Suggested reading paths
- Visual concept maps (when helpful)
```

**UI Behavior:**
- Extended responses (longer context)
- Visual outputs (diagrams, mind maps)
- Heavy cross-referencing
- Follow-ups: VISUALIZE_THIS, RELATED_TOPICS, EXPERT_VIEW

**Free vs Paid:**
- Free: Not available
- Paid: Full access (premium feature)

---

## 💰 Monetization UX

### Credit System

**Default Allocation:**
- Free tier: $5.00/month (resets monthly)
- Paid tier: Higher limit + quality-of-life features

**Credit Display States:**

```css
/* Healthy: > 60% remaining */
.credit-display.healthy {
  color: var(--text-secondary);
}

/* Moderate: 20-60% remaining */
.credit-display.moderate {
  color: var(--warning);
}

/* Low: 5-20% remaining */
.credit-display.low {
  color: var(--warning);
  animation: pulse 2s infinite;
}

/* Critical: < 5% remaining */
.credit-display.critical {
  color: var(--error);
  animation: pulse 1s infinite;
}
```

**Fuel Gauge Visualization:**
```
▓▓▓▓▓▓▓░░  $4.20/$5.00  (84% - Healthy)
▓▓▓▓░░░░░  $2.10/$5.00  (42% - Moderate)
▓▓░░░░░░░  $0.95/$5.00  (19% - Low, pulsing)
▓░░░░░░░░  $0.20/$5.00  (4% - Critical, pulsing fast)
```

### Upgrade Prompts

**Subtle (Always Visible):**
- Credit display in CommandDeck
- "Upgrade" link in settings

**Moderate (< 20% credits):**
- Gentle banner: "Running low on fuel 🔥 Upgrade for unlimited"
- Amber border on CommandDeck

**Urgent (< 5% credits):**
- Modal after response: "You're almost out! Upgrade to keep learning?"
- Disable voice/image features
- Show what paid tier unlocks

**Out of Credits:**
- Block new messages
- Large CTA: "Refuel Your Learning - Upgrade Now"
- Show when credits reset (countdown)
- Allow viewing past conversations

### Paid Tier Benefits (UX Perspective)

**Quality of Life (Not Paywalls):**
✅ Unlimited credits
✅ ThinkingDrawer auto-expands (no click friction)
✅ Image uploads (homework photos)
✅ Voice mode
✅ Study Buddy mode
✅ Deep Dive mode
✅ Priority response speed
✅ No ads or upgrade prompts

**Pricing Strategy:**
- Free: Generous but limited ($5/month credits)
- Paid: $8-12/month (unlimited learning)
- Student discount: 50% with .edu email

---

## ♿ Accessibility

### Keyboard Navigation

**Essential Shortcuts:**
- `Tab` / `Shift+Tab`: Navigate interactive elements
- `Enter`: Send message / Activate button
- `Esc`: Close drawer / modal
- `Cmd/Ctrl + K`: Focus input
- `Cmd/Ctrl + /`: Open keyboard shortcuts help

**Mode Switching:**
- `Cmd/Ctrl + 1-5`: Switch to mode 1-5
- `Cmd/Ctrl + ↑/↓`: Cycle through modes

### Screen Reader Support

**ARIA Labels:**
```html
<!-- CommandDeck -->
<div role="region" aria-label="Message input">
  <textarea aria-label="Type your question" />
  <button aria-label="Send message" />
</div>

<!-- ThinkingDrawer -->
<button 
  aria-expanded="false"
  aria-controls="reasoning-content"
  aria-label="Show reasoning process"
/>

<!-- Citations -->
<button 
  aria-label="View source 1: National Institutes of Health"
  data-citation-id="1"
/>

<!-- Credit Display -->
<div 
  role="status"
  aria-live="polite"
  aria-label="Credits remaining: $3.50 of $5.00"
/>
```

**Announcements:**
- When AI starts responding: "Assistant is thinking..."
- When AI finishes: "Response complete"
- When credits low: "Warning: Low credits remaining"
- When source drawer opens: "Source details opened"

### Focus Management

**Rules:**
- Focus returns to input after sending message
- Focus moves to drawer when opened
- Focus trapped in modal until closed
- Visible focus ring on all interactive elements

**Focus Ring:**
```css
*:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Reduced Motion

**Respect User Preference:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable decorative animations */
  .pulse, .typewriter-effect, .sketch-animation {
    animation: none !important;
  }
  
  /* Keep functional transitions fast */
  .drawer, .modal {
    transition: opacity 150ms ease-out;
  }
}
```

### Color Contrast

**WCAG AA Compliance (4.5:1 minimum):**
- Text primary on bg primary: 13.2:1 ✅
- Text secondary on bg primary: 7.8:1 ✅
- Accent primary on bg primary: 4.6:1 ✅
- Border default on bg primary: 3.2:1 ⚠️ (decorative only)

**High Contrast Mode (Optional Setting):**
- Increases border weights
- Boosts accent saturation
- Adds more visual separation

---

## 📦 Component Library Structure

### File Organization

```
src/
├── components/
│   ├── CommandDeck/
│   │   ├── CommandDeck.tsx
│   │   ├── CreditDisplay.tsx
│   │   ├── InputArea.tsx
│   │   └── ActionButtons.tsx
│   ├── ThinkingDrawer/
│   │   ├── ThinkingDrawer.tsx
│   │   └── useThinkingDrawer.ts
│   ├── AcademicRenderer/
│   │   ├── AcademicRenderer.tsx
│   │   ├── LatexRenderer.tsx
│   │   ├── CitationBadge.tsx
│   │   └── MarkdownComponents.tsx
│   ├── SourceDrawer/
│   │   ├── SourceDrawer.tsx
│   │   ├── TrustBadge.tsx
│   │   └── SourcePreview.tsx
│   ├── FollowUpMatrix/
│   │   ├── FollowUpMatrix.tsx
│   │   └── ActionChip.tsx
│   └── ModeSelector/
│       ├── ModeSelector.tsx
│       └── ModeButton.tsx
├── hooks/
│   ├── useCreditBalance.ts
│   ├── useSoundEffects.ts
│   ├── useStreamingResponse.ts
│   └── useKeyboardShortcuts.ts
├── styles/
│   ├── tokens.css          (Design tokens)
│   ├── globals.css         (Global styles)
│   └── animations.css      (Animation utilities)
├── utils/
│   ├── soundManager.ts
│   ├── citationParser.ts
│   └── latexHelper.ts
└── store/
    └── useStore.ts         (Zustand state)
```

### Shared Utilities

**Sound Manager:**
```typescript
// soundManager.ts
export const soundManager = {
  enabled: true,
  volume: 0.4,
  
  play(sound: keyof typeof sounds, volume?: number) {
    if (!this.enabled) return;
    // Play sound with throttling
  },
  
  toggle() {
    this.enabled = !this.enabled;
  },
  
  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }
};
```

**Citation Parser:**
```typescript
// citationParser.ts
export function parseCitations(text: string) {
  // Find all [1], [2], etc.
  // Return text with citation markers and citation list
}

export function extractSources(response: string) {
  // Parse <sources> tag from AI response
  // Return structured citation data
}
```

**LaTeX Helper:**
```typescript
// latexHelper.ts
export function isValidLatex(str: string): boolean {
  // Check if string is valid LaTeX
}

export function wrapLatex(str: string): string {
  // Add $$ delimiters if missing
}
```

---

## 🧪 Testing Checklist

### Visual Regression

- [ ] All components render correctly on mobile (375px)
- [ ] All components render correctly on tablet (768px)
- [ ] All components render correctly on desktop (1440px)
- [ ] Dark mode colors are warm (not cold blue-grays)
- [ ] Accent colors are visible but not harsh
- [ ] Typography hierarchy is clear
- [ ] Spacing is consistent (8px grid)

### Interaction Testing

- [ ] CommandDeck input auto-resizes correctly
- [ ] ThinkingDrawer expands/collapses smoothly
- [ ] Citations are clickable and open SourceDrawer
- [ ] SourceDrawer closes on backdrop click
- [ ] Follow-up chips trigger new messages
- [ ] Mode switching updates UI immediately
- [ ] Credit display updates after messages
- [ ] Sounds play at correct volume and timing

### Accessibility Testing

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader announces state changes
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion preference respected
- [ ] All images have alt text
- [ ] Form inputs have labels

### Performance Testing

- [ ] LaTeX rendering doesn't block UI
- [ ] Streaming responses feel real-time
- [ ] Animations don't cause jank (60fps)
- [ ] Sounds don't overlap or glitch
- [ ] Large messages scroll smoothly
- [ ] Image uploads compress before sending
- [ ] KV reads are fast (<100ms)

### Edge Cases

- [ ] Out of credits state displays correctly
- [ ] Very long messages don't break layout
- [ ] Math formulas with special chars render
- [ ] Multiple citations in one sentence work
- [ ] Empty ThinkingDrawer doesn't show
- [ ] Network errors display friendly message
- [ ] Offline state is communicated clearly

---

## 🚀 Implementation Priorities

### Phase 1: Foundation (Week 1)
1. Set up design tokens (CSS variables)
2. Implement color system and dark mode
3. Configure typography (fonts + type scale)
4. Build animation utility classes
5. Test on mobile, tablet, desktop

### Phase 2: Core Components (Week 2)
1. Build CommandDeck with credit display
2. Create ThinkingDrawer with animations
3. Implement AcademicRenderer (markdown + LaTeX)
4. Add SourceDrawer with trust badges
5. Build FollowUpMatrix

### Phase 3: Interactions (Week 3)
1. Add sound effects system
2. Implement swipe gestures (mobile)
3. Add keyboard shortcuts
4. Build mode switching logic
5. Implement credit tracking

### Phase 4: Advanced Features (Week 4)
1. Image upload for homework photos
2. Voice input integration
3. Study Buddy mode (guide generation)
4. Deep Dive mode (visual outputs)
5. Spaced repetition system

### Phase 5: Polish & Optimization (Week 5)
1. Performance optimization
2. Accessibility audit
3. Visual refinement
4. Sound mixing and balance
5. User testing and iteration

---

## 📚 Reference Links

### Design Inspiration
- [Claude.ai](https://claude.ai) - Warm minimalism, citation style
- [Linear](https://linear.app) - Clean interactions, subtle animations
- [Stripe Docs](https://stripe.com/docs) - Readable typography, code styling

### Libraries & Tools
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [KaTeX](https://katex.org) - Fast LaTeX rendering
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Zustand](https://github.com/pmndrs/zustand) - State management

### Typography
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Inter](https://rsms.me/inter/)

### Sound Resources
- [Freesound](https://freesound.org) - Free sound effects
- [Zapsplat](https://www.zapsplat.com) - UI sound effects
- [Mixkit](https://mixkit.co/free-sound-effects/) - Free audio

---

## 🎓 Design Principles Recap

1. **Warm over Cold** - Every design decision should feel cozy, not sterile
2. **Guide over Tell** - Help students learn, don't give answers
3. **Transparent over Hidden** - Show reasoning, cite sources, display costs
4. **Gentle over Jarring** - Animations ease, sounds delight, feedback guides
5. **Mobile over Desktop** - Build for thumbs first, enhance for keyboards
6. **Trust over Speed** - Verify sources, prevent hallucinations, be honest
7. **Students over Profits** - Free tier is generous, paid is quality-of-life

---

**This design system is a living document. Update as you learn from users and iterate on features.**

**Last Updated:** February 13, 2026  
**Version:** 1.0  
**Next Review:** March 2026

import { create } from 'zustand'

export type AppMode = 'tutor' | 'research' | 'writing' | 'council'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  isSpoiler?: boolean
  reasoning?: string
  citations?: Array<{ id: string; title?: string; author?: string; summary?: string; url?: string }>
}

export type SpendingEntry = {
  id: string
  amount: number
  reason: string
  timestamp: number
}

type NexusState = {
  // User economy
  credits: number
  spendingHistory: SpendingEntry[]
  setCredits: (credits: number) => void
  addSpending: (amount: number, reason: string) => void
  deductCredits: (amount: number, reason: string) => void

  // App mode
  currentMode: AppMode
  setCurrentMode: (mode: AppMode) => void

  // UI state
  isSidebarOpen: boolean
  activeCitationId: string | null
  showArtifactMenu: boolean
  systemMessage: string
  attachedFileName: string | null
  setSidebarOpen: (open: boolean) => void
  setActiveCitationId: (id: string | null) => void
  setShowArtifactMenu: (show: boolean) => void
  setSystemMessage: (msg: string) => void
  setAttachedFileName: (name: string | null) => void
  toggleSidebar: () => void

  // Chat history
  messages: ChatMessage[]
  streamingMessageId: string | null
  setMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void
  setStreamingMessageId: (id: string | null) => void
  appendMessage: (msg: ChatMessage) => void
  updateMessage: (id: string, update: Partial<ChatMessage>) => void
  clearMessages: () => void
}

const CREDITS_INITIAL = 500 // cents or units

export const useNexusStore = create<NexusState>((set) => ({
  credits: CREDITS_INITIAL,
  spendingHistory: [],
  setCredits: (credits) => set({ credits }),
  addSpending: (amount, reason) =>
    set((state) => ({
      spendingHistory: [
        ...state.spendingHistory,
        { id: crypto.randomUUID(), amount, reason, timestamp: Date.now() },
      ],
    })),
  deductCredits: (amount, reason) =>
    set((state) => {
      const newCredits = Math.max(0, state.credits - amount)
      return {
        credits: newCredits,
        spendingHistory: [
          ...state.spendingHistory,
          { id: crypto.randomUUID(), amount: -amount, reason, timestamp: Date.now() },
        ],
      }
    }),

  currentMode: 'tutor',
  setCurrentMode: (currentMode) => set({ currentMode }),

  isSidebarOpen: false,
  activeCitationId: null,
  showArtifactMenu: false,
  systemMessage: '',
  attachedFileName: null,
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setActiveCitationId: (activeCitationId) => set({ activeCitationId }),
  setShowArtifactMenu: (showArtifactMenu) => set({ showArtifactMenu }),
  setSystemMessage: (systemMessage) => set({ systemMessage }),
  setAttachedFileName: (attachedFileName) => set({ attachedFileName }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  messages: [],
  streamingMessageId: null,
  setMessages: (arg) =>
    set((state) => ({
      messages: typeof arg === 'function' ? arg(state.messages) : arg,
    })),
  setStreamingMessageId: (streamingMessageId) => set({ streamingMessageId }),
  appendMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  updateMessage: (id, update) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...update } : m
      ),
    })),
  clearMessages: () => set({ messages: [], streamingMessageId: null }),
}))

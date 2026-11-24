import { useEffect, useRef } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatMessageItem } from './ChatMessageItem'
import { QuickPrompts } from './QuickPrompts'
import { ChatInput } from './ChatInput'
import type { ChatMessage, LeadSubmission } from '@/services/ai/types'

interface ChatWindowProps {
  isOpen: boolean
  isThinking: boolean
  messages: ChatMessage[]
  onClose: () => void
  onClear: () => void
  onSend: (text: string) => void
  onLeadSubmit: (lead: LeadSubmission) => void
}

export function ChatWindow({
  isOpen,
  isThinking,
  messages,
  onClose,
  onClear,
  onSend,
  onLeadSubmit,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new message or thinking state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isThinking])

  if (!isOpen) return null

  // Get active suggested prompts from the latest assistant message
  const lastAssistantMessage = [...messages].reverse().find((m) => m.sender === 'assistant')
  const suggestedPrompts = lastAssistantMessage?.suggestedPrompts || []

  return (
    <div
      role="dialog"
      aria-label="Pushp Narayan AI Sales Assistant"
      className="fixed inset-x-2 bottom-2 top-14 z-50 flex flex-col overflow-hidden border border-champagne/60 bg-ivory shadow-[0_20px_50px_-15px_rgba(36,35,33,0.35)] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[580px] sm:w-[400px] sm:top-auto sm:max-h-[calc(100vh-7rem)]"
      style={{ animation: 'luxe-scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both' }}
    >
      <ChatHeader onClose={onClose} onClear={onClear} />

      {/* Messages viewport */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-ivory to-ivory-deep/40"
      >
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            onLeadSubmit={onLeadSubmit}
            onProductClick={onClose}
          />
        ))}

        {/* Typing indicator */}
        {isThinking && (
          <div className="flex items-center gap-2 border border-champagne/30 bg-white px-3 py-2 text-[0.75rem] text-obsidian/70 w-fit rounded-sm shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse delay-150" />
            <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse delay-300" />
            <span className="ml-1 text-[0.6875rem] tracking-wider text-taupe-deep uppercase">
              Consulting Quarry Index…
            </span>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      {!isThinking && suggestedPrompts.length > 0 && (
        <div className="border-t border-champagne/20 bg-ivory px-3 py-1.5">
          <QuickPrompts
            prompts={suggestedPrompts}
            onSelect={onSend}
            disabled={isThinking}
          />
        </div>
      )}

      {/* Input bar */}
      <ChatInput onSend={onSend} disabled={isThinking} />
    </div>
  )
}

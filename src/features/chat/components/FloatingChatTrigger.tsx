import { Sparkles, MessageSquare } from 'lucide-react'

interface FloatingChatTriggerProps {
  isOpen: boolean
  unreadCount: number
  onToggle: () => void
}

export function FloatingChatTrigger({
  isOpen,
  unreadCount,
  onToggle,
}: FloatingChatTriggerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? 'Close AI Sales Assistant' : 'Open AI Sales Assistant'}
      aria-expanded={isOpen}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 border border-champagne/60 bg-gradient-to-r from-obsidian-800 to-obsidian p-1.5 sm:px-3.5 sm:py-2.5 shadow-[0_10px_30px_-5px_rgba(36,35,33,0.4)] backdrop-blur-md transition-all duration-300 hover:border-bronze-light hover:shadow-[0_15px_35px_-5px_rgba(154,107,67,0.4)] hover:-translate-y-0.5 active:translate-y-0"
    >
      {/* Icon cluster */}
      <div className="relative grid h-10 w-10 shrink-0 place-items-center border border-champagne/40 bg-obsidian-700 sm:h-8 sm:w-8">
        <div className="grid h-full w-full place-items-center border border-champagne/20 bg-gradient-to-br from-bronze to-bronze-dark text-ivory">
          <Sparkles size={16} className="text-champagne transition-transform group-hover:rotate-12" />
        </div>

        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 grid h-4 w-4 place-items-center rounded-full bg-bronze text-[0.625rem] font-bold text-ivory ring-2 ring-obsidian">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Label (desktop) */}
      <div className="hidden flex-col items-start leading-tight text-left sm:flex pr-1">
        <span className="text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-ivory group-hover:text-champagne transition-colors">
          Ask AI Consultant
        </span>
        <span className="text-[0.5625rem] font-medium tracking-[0.14em] text-champagne/70 uppercase">
          Rajasthan Stone Expert
        </span>
      </div>

      <MessageSquare
        size={14}
        className="hidden text-champagne/80 sm:block transition-transform group-hover:translate-x-0.5"
      />
    </button>
  )
}

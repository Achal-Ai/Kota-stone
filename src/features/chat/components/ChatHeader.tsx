import { RotateCcw, X, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'

interface ChatHeaderProps {
  onClose: () => void
  onClear: () => void
}

export function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex h-14 items-center justify-between border-b border-champagne/30 bg-obsidian px-4 text-ivory">
      <div className="flex items-center gap-2.5">
        <div className="relative grid h-8 w-8 place-items-center border border-champagne/40 bg-obsidian-800">
          <div className="grid h-full w-full place-items-center border border-champagne/20 bg-gradient-to-br from-bronze to-bronze-dark text-ivory">
            <span className="font-display text-[0.85rem] font-semibold">PN</span>
          </div>
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-obsidian" />
        </div>

        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-[1rem] font-medium text-ivory">
              Stone Assistant
            </span>
            <Sparkles size={11} className="text-champagne" />
          </div>
          <span className="text-[0.5625rem] font-medium tracking-[0.18em] text-champagne uppercase">
            Rajasthan Quarry AI
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Bilingual quick switcher */}
        <button
          type="button"
          onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
          title="Toggle Language"
          className="border border-champagne/40 bg-obsidian-800 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider text-champagne uppercase transition-colors hover:border-champagne hover:text-ivory"
        >
          {locale === 'en' ? 'हिन्दी' : 'EN'}
        </button>

        {/* Reset/clear session */}
        <button
          type="button"
          onClick={onClear}
          title="Clear Conversation"
          aria-label="Clear chat session"
          className="p-1.5 text-ivory/60 transition-colors hover:text-ivory hover:bg-obsidian-700"
        >
          <RotateCcw size={14} />
        </button>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat window"
          className="p-1.5 text-ivory/60 transition-colors hover:text-ivory hover:bg-obsidian-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

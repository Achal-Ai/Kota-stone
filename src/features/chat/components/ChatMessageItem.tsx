import { MessageSquare, ArrowUpRight } from 'lucide-react'
import { whatsappHref } from '@/data/constants/contact'
import { ProductRecommendationCard } from './ProductRecommendationCard'
import { LeadCaptureCard } from './LeadCaptureCard'
import type { ChatMessage, LeadSubmission } from '@/services/ai/types'

interface ChatMessageItemProps {
  message: ChatMessage
  onLeadSubmit: (lead: LeadSubmission) => void
  onProductClick?: () => void
}

export function ChatMessageItem({
  message,
  onLeadSubmit,
  onProductClick,
}: ChatMessageItemProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
      {/* Sender bubble */}
      <div
        className={`max-w-[88%] p-3 text-[0.8125rem] leading-[1.6] ${
          isUser
            ? 'border border-bronze bg-bronze text-ivory rounded-tl-sm rounded-tr-sm rounded-bl-sm'
            : 'border border-champagne/40 bg-white text-obsidian rounded-tl-sm rounded-tr-sm rounded-br-sm shadow-xs'
        }`}
      >
        {/* Render text with basic markdown formatting */}
        <div className="whitespace-pre-wrap space-y-2">
          {message.text.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>
              {paragraph.split('**').map((chunk, cIdx) =>
                cIdx % 2 === 1 ? <strong key={cIdx} className="font-semibold text-obsidian">{chunk}</strong> : chunk,
              )}
            </p>
          ))}
        </div>

        <span
          className={`mt-1 block text-[0.5625rem] tracking-wider uppercase ${
            isUser ? 'text-ivory/70 text-right' : 'text-taupe'
          }`}
        >
          {message.timestamp}
        </span>
      </div>

      {/* Embedded product recommendation cards */}
      {!isUser && message.products && message.products.length > 0 && (
        <div className="mt-1 flex w-full flex-col gap-2.5 max-w-[94%]">
          {message.products.map((product) => (
            <ProductRecommendationCard
              key={product.id}
              product={product}
              onSelect={onProductClick}
            />
          ))}
        </div>
      )}

      {/* Embedded lead capture quotation form */}
      {!isUser && message.showLeadForm && (
        <div className="mt-1 w-full max-w-[94%]">
          <LeadCaptureCard
            prefilledProduct={message.prefilledProduct}
            onSubmit={onLeadSubmit}
          />
        </div>
      )}

      {/* WhatsApp direct sales handoff */}
      {!isUser && message.showWhatsApp && (
        <div className="mt-1">
          <a
            href={whatsappHref({ source: 'ai-assistant' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-emerald-700/50 bg-emerald-800/10 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-emerald-900 transition-colors hover:bg-emerald-800 hover:text-white"
          >
            <MessageSquare size={13} />
            <span>Chat on WhatsApp Directly</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </div>
  )
}

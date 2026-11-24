import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { locale } = useLanguage()
  const isHi = locale === 'hi'
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-champagne/35 bg-white p-2.5"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          isHi
            ? 'प्राकृतिक पत्थर, साइज, या कोटेशन के बारे में पूछें...'
            : 'Ask about stone types, sizes, or quotations...'
        }
        className="flex-1 bg-transparent px-2 text-[0.8125rem] text-obsidian placeholder:text-taupe focus:outline-none disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="grid h-8 w-8 place-items-center border border-bronze bg-bronze text-ivory transition-all duration-200 hover:bg-bronze-dark disabled:opacity-40 disabled:hover:bg-bronze shrink-0"
      >
        <Send size={13} />
      </button>
    </form>
  )
}

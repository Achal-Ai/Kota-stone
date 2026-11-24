import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import type { LeadSubmission } from '@/services/ai/types'

interface LeadCaptureCardProps {
  prefilledProduct?: string
  onSubmit: (lead: LeadSubmission) => void
}

export function LeadCaptureCard({
  prefilledProduct,
  onSubmit,
}: LeadCaptureCardProps) {
  const { locale } = useLanguage()
  const isHi = locale === 'hi'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState(
    prefilledProduct ? `Interested in quotation for ${prefilledProduct}` : '',
  )
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(isHi ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name')
      return
    }
    if (!phone.trim() || phone.length < 8) {
      setError(isHi ? 'कृपया मान्य फ़ोन नंबर दर्ज करें' : 'Please enter a valid phone number')
      return
    }

    setError('')
    setSubmitted(true)
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      productInterest: prefilledProduct,
      message: message.trim() || 'Direct quotation inquiry via AI Assistant',
    })
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 border border-champagne/40 bg-ivory-deep/80 p-3.5 text-obsidian">
        <CheckCircle2 size={18} className="text-bronze shrink-0" />
        <span className="text-[0.75rem] font-medium leading-relaxed">
          {isHi
            ? 'अनुरोध प्राप्त हुआ! हमारी सेल्स टीम आपसे शीघ्र संपर्क करेगी।'
            : 'Inquiry received! Our sales team will get back to you shortly.'}
        </span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 border border-champagne/50 bg-ivory p-3.5 shadow-xs"
    >
      <div className="border-b border-champagne/25 pb-2">
        <span className="eyebrow text-[0.625rem] text-bronze tracking-[0.2em]">
          {isHi ? 'डायरेक्ट कोटेशन फॉर्म' : 'Quotation Request'}
        </span>
        <h5 className="font-display text-[0.95rem] font-medium text-obsidian">
          {isHi ? 'प्रोजेक्ट विनिर्देश साझा करें' : 'Share Project Requirements'}
        </h5>
      </div>

      {error && (
        <span className="text-[0.6875rem] font-medium text-red-700 bg-red-50 p-1.5 border border-red-200">
          {error}
        </span>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isHi ? 'आपका नाम *' : 'Your Name *'}
          required
          className="border border-champagne/60 bg-white px-2.5 py-1.5 text-[0.75rem] text-obsidian placeholder:text-taupe focus:border-bronze focus:outline-none"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={isHi ? 'फ़ोन / व्हाट्सएप *' : 'Phone / WhatsApp *'}
          required
          className="border border-champagne/60 bg-white px-2.5 py-1.5 text-[0.75rem] text-obsidian placeholder:text-taupe focus:border-bronze focus:outline-none"
        />
      </div>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={isHi ? 'शहर / प्रोजेक्ट स्थान (उदा. जयपुर, दिल्ली)' : 'City / Location (e.g. Jaipur, Delhi)'}
        className="border border-champagne/60 bg-white px-2.5 py-1.5 text-[0.75rem] text-obsidian placeholder:text-taupe focus:border-bronze focus:outline-none"
      />

      <textarea
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          isHi
            ? 'अनुमानित क्षेत्रफल (उदा. 2000 sq ft कोटा स्टोन टाइल्स)'
            : 'Estimated area or quantity (e.g. 2,000 sq ft Kota tiles)'
        }
        className="border border-champagne/60 bg-white px-2.5 py-1.5 text-[0.75rem] text-obsidian placeholder:text-taupe focus:border-bronze focus:outline-none resize-none"
      />

      <button
        type="submit"
        className="group mt-1 inline-flex items-center justify-center gap-2 border border-bronze bg-bronze px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-ivory transition-all duration-300 hover:bg-bronze-dark"
      >
        <span>{isHi ? 'कोटेशन का अनुरोध भेजें' : 'Request Quotation'}</span>
        <Send
          size={12}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </form>
  )
}

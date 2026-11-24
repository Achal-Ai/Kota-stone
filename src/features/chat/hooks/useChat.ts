import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { useInquiriesStore } from '@/data/store'
import { aiService } from '@/services/ai/aiService'
import type { ChatMessage, LeadSubmission } from '@/services/ai/types'

const STORAGE_KEY = 'pn_ai_chat_session_v1'

export function useChat() {
  const { locale } = useLanguage()
  const { addInquiry } = useInquiriesStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize or restore conversation
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved) as ChatMessage[]
      }
    } catch {
      // ignore
    }

    const initialWelcome: ChatMessage = {
      id: 'welcome-01',
      sender: 'assistant',
      text:
        locale === 'hi'
          ? 'नमस्ते! मैं पुष्प नारायण स्टोन का AI कंसल्टेंट हूँ। आप राजस्थान के प्राकृतिक पत्थरों — कोटा स्टोन, मकराना मार्बल, ग्रेनाइट, पार्किंग स्टोन और सैंडस्टोन के चुनाव, साइज और तकनीकी विवरण के बारे में पूछ सकते हैं।'
          : 'Welcome to Pushp Narayan Stone. I am your AI Consultant. Ask me anything about our Rajasthan natural stones — Kota Stone, Makrana Marble, Granite, Heavy Parking Stones, or Sandstone Cladding.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts:
        locale === 'hi'
          ? [
              'पूजा कक्ष के लिए सर्वोत्तम मार्बल',
              'घर के लिए कोटा स्टोन टाइल्स',
              'पार्किंग और भारी वाहनों के पत्थर',
              'कोटेशन का अनुरोध करें',
            ]
          : [
              'Marble for Pooja Room / Temple',
              'Kota Stone for home flooring',
              'Heavy-duty Parking & Driveway stones',
              'Request a Quotation',
            ],
    }
    return [initialWelcome]
  })

  // Persist session
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  const toggleChat = () =>
    setIsOpen((prev) => {
      const next = !prev
      if (next) setUnreadCount(0)
      return next
    })
  const closeChat = () => setIsOpen(false)
  const openChat = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  const clearChat = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    const freshWelcome: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'assistant',
      text:
        locale === 'hi'
          ? 'बातचीत रीसेट कर दी गई है। आप राजस्थान के प्राकृतिक पत्थरों के बारे में क्या जानना चाहते हैं?'
          : 'Chat history cleared. What kind of natural stone project can I help you with?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts:
        locale === 'hi'
          ? ['पूजा कक्ष के लिए मार्बल', 'कोटा स्टोन टाइल्स', 'पार्किंग स्टोन', 'कोटेशन अनुरोध']
          : [
              'Marble for Pooja Room',
              'Kota Stone flooring',
              'Driveway Parking stones',
              'Request a Quotation',
            ],
    }
    setMessages([freshWelcome])
  }

  const isSendingRef = useRef(false)

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isSendingRef.current) return

    isSendingRef.current = true
    setIsThinking(true)

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updated = [...messages, userMessage]
    setMessages(updated)

    try {
      const response = await aiService.sendMessage(trimmed, updated, locale)

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: response.products,
        showLeadForm: response.showLeadForm,
        showWhatsApp: response.showWhatsApp,
        prefilledProduct: response.prefilledProduct,
        suggestedPrompts: response.suggestedPrompts,
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (!isOpen) {
        setUnreadCount((c) => c + 1)
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          locale === 'hi'
            ? 'क्षमा करें, प्रतिक्रिया देने में त्रुटि हुई। कृपया पुनः प्रयास करें या हमारी सेल्स टीम से सीधे संपर्क करें।'
            : 'Apologies, I encountered a temporary issue. Please try again or connect directly with our sales team.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsApp: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsThinking(false)
      isSendingRef.current = false
    }
  }

  const submitQuotation = async (lead: LeadSubmission) => {
    setIsThinking(true)

    // Save to global inquiry store so it immediately surfaces in Admin Dashboard
    addInquiry({
      name: lead.name,
      company: lead.city ? `Project: ${lead.city}` : 'Individual Buyer',
      email: lead.email || 'inquiry-via-ai-chat@pushpnarayanstone.com',
      phone: lead.phone,
      subject: lead.productInterest
        ? `AI Chat Lead: ${lead.productInterest}`
        : 'AI Chat Quotation Inquiry',
      message: lead.message,
      productSlug: lead.productInterest ? lead.productInterest.toLowerCase().replace(/\s+/g, '-') : undefined,
      status: 'new',
    })

    // Notify backend layer
    await aiService.submitLead(lead)

    setIsThinking(false)

    // Add confirmation bubble
    const confirmationMessage: ChatMessage = {
      id: `confirm-${Date.now()}`,
      sender: 'assistant',
      text:
        locale === 'hi'
          ? `धन्यवाद ${lead.name}! आपका कोटेशन अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। हमारी राजस्थान डिस्पैच टीम आपसे जल्द ही ${lead.phone} पर संपर्क करेगी।`
          : `Thank you ${lead.name}! Your quotation inquiry has been successfully registered. Our Rajasthan dispatch team will connect with you on ${lead.phone} shortly.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showWhatsApp: true,
    }

    setMessages((prev) => [...prev, confirmationMessage])
  }

  return {
    isOpen,
    isThinking,
    unreadCount,
    messages,
    toggleChat,
    openChat,
    closeChat,
    clearChat,
    sendMessage,
    submitQuotation,
  }
}

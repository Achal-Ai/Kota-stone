import type { Bilingual } from '@/types'

/**
 * AI Sales Assistant Service Types
 */

export interface ProductRecommendation {
  id: string
  slug: string
  name: Bilingual
  categorySlug: string
  categoryName: Bilingual
  image: string
  summary: Bilingual
  thickness: string
  applications: Bilingual[]
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  products?: ProductRecommendation[]
  showLeadForm?: boolean
  showWhatsApp?: boolean
  prefilledProduct?: string
  suggestedPrompts?: string[]
}

export interface AIServiceResponse {
  reply: string
  products?: ProductRecommendation[]
  showLeadForm?: boolean
  showWhatsApp?: boolean
  prefilledProduct?: string
  suggestedPrompts?: string[]
}

export interface LeadSubmission {
  name: string
  phone: string
  email?: string
  city?: string
  productInterest?: string
  message: string
}

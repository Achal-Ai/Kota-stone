import { processUserQuery } from './mockAiEngine'
import type { AIServiceResponse, ChatMessage, LeadSubmission } from './types'

/**
 * AI Service Layer
 *
 * Pluggable architecture:
 * - In dev/frontend-only mode: calls `mockAiEngine`
 * - Once Laravel lands: routes to `POST /api/ai/chat` and `POST /api/ai/leads`
 */

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT as string | undefined

export const aiService = {
  async sendMessage(
    message: string,
    history: ChatMessage[],
    locale: 'en' | 'hi',
  ): Promise<AIServiceResponse> {
    // If backend endpoint is configured in future
    if (AI_ENDPOINT) {
      try {
        const response = await fetch(`${AI_ENDPOINT}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, locale }),
        })
        if (response.ok) {
          return (await response.json()) as AIServiceResponse
        }
      } catch (err) {
        console.warn('AI endpoint unreachable, falling back to knowledge engine', err)
      }
    }

    // Realistic brief natural typing cadence (350ms - 550ms)
    await new Promise((resolve) => setTimeout(resolve, 450))

    return processUserQuery(message, history, locale)
  },

  async submitLead(lead: LeadSubmission): Promise<{ success: boolean; leadId: string }> {
    if (AI_ENDPOINT) {
      try {
        const response = await fetch(`${AI_ENDPOINT}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        })
        if (response.ok) {
          return (await response.json()) as { success: boolean; leadId: string }
        }
      } catch (err) {
        console.warn('AI lead endpoint unreachable', err)
      }
    }

    // Mock response id
    const leadId = `lead-${Date.now().toString(36)}`
    return { success: true, leadId }
  },
}

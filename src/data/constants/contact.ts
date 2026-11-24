/**
 * Single source of truth for business contact details.
 *
 * The supplied business profile lists the phone number and street address as
 * placeholders ("+91-XXXXXXXXXX", "[Add City / Industrial Area, Rajasthan]").
 * We never invent them — `isVerified` flags which values are confirmed so the
 * UI can render honest "available on request" states instead.
 *
 * TODO(backend): replace with `GET /api/settings/contact` once Laravel lands.
 */

export interface ContactConfig {
  companyName: string
  legalNote: string
  email: string
  phoneDisplay: string | null
  whatsappNumber: string | null
  whatsappDisplay: string | null
  addressLines: string[]
  cityRegion: string
  isVerified: boolean
}

export const CONTACT: ContactConfig = {
  companyName: 'Pushp Narayan Stone Supplier',
  legalNote:
    'Complete Natural Stone, Marble & Flooring Solutions — Wholesale & Retail Inquiries Welcome',
  email: 'pushpnarayan@gmail.com',
  phoneDisplay: null,
  whatsappNumber: null,
  whatsappDisplay: null,
  addressLines: [],
  cityRegion: 'Rajasthan, India',
  isVerified: false,
}

/**
 * WhatsApp CTA behaviour.
 *
 * No WhatsApp number has been provided yet, so CTAs route to the inquiry form
 * (pre-filled with the product) rather than a dead wa.me link. Flipping this
 * to a real number in CONTACT above automatically enables native WhatsApp.
 */
export function whatsappHref(prefill?: {
  product?: string
  source?: string
}): string {
  const text = [
    'Hello Pushp Narayan Stone Supplier,',
    prefill?.product ? `I am interested in: ${prefill.product}.` : '',
    'Please share quotation and availability details.',
  ]
    .filter(Boolean)
    .join(' ')

  if (CONTACT.whatsappNumber) {
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  const params = new URLSearchParams()
  if (prefill?.product) params.set('product', prefill.product)
  if (prefill?.source) params.set('source', prefill.source)
  params.set('message', text)
  return `/contact?${params.toString()}#inquiry`
}

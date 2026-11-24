import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CONTACT } from '@/data/constants/contact'
import { useInquiriesStore, useProductsStore } from '@/data/store'
import { SectionHeader } from '@/components/ui'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const { t, tx } = useLanguage()
  usePageMeta('contact.heroEyebrow', 'contact.subtitle')

  const [searchParams] = useSearchParams()
  const { addInquiry } = useInquiriesStore()
  const { products } = useProductsStore()

  const prefilledProduct = searchParams.get('product') || ''
  const prefilledService = searchParams.get('service') || ''
  const prefilledMessage = searchParams.get('message') || ''

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: prefilledService ? `Inquiry regarding: ${prefilledService}` : prefilledProduct ? `Quotation request for ${prefilledProduct}` : '',
    product: prefilledProduct,
    message: prefilledMessage,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Scroll to #inquiry if present in hash
  useEffect(() => {
    if (window.location.hash === '#inquiry') {
      const el = document.getElementById('inquiry')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!formData.name.trim()) {
      errs.name = t('contact.errors.name')
    } else if (formData.name.trim().length < 2) {
      errs.name = t('contact.errors.nameMin')
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t('contact.errors.email')
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = t('contact.errors.phone')
    }

    if (!formData.subject.trim()) {
      errs.subject = t('contact.errors.subject')
    }

    if (!formData.message.trim()) {
      errs.message = t('contact.errors.message')
    } else if (formData.message.trim().length < 15) {
      errs.message = t('contact.errors.messageMin')
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate network latency then write to persistent store
    setTimeout(() => {
      addInquiry({
        name: formData.name,
        company: formData.company || undefined,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        productSlug: formData.product || undefined,
      })
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 400)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      product: '',
      message: '',
    })
    setErrors({})
    setIsSuccess(false)
  }

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* 1. Header */}
      <div className="container-page pb-12 sm:pb-16 border-b border-champagne">
        <SectionHeader
          eyebrow={t('contact.heroEyebrow')}
          titleFirst={t('contact.title1')}
          titleSecond={t('contact.title2')}
          subtitle={t('contact.subtitle')}
        />
      </div>

      {/* 2. Main Content: Info & Form */}
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details & Honest Notes */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="eyebrow text-bronze">{t('contact.infoTitle')}</span>
              <h2 className="display-xs text-obsidian mt-1">{CONTACT.companyName}</h2>
              <p className="text-sm text-obsidian/70 mt-2 leading-relaxed">
                {CONTACT.legalNote}
              </p>
            </div>

            {/* Contact Details List */}
            <div className="flex flex-col gap-6 border-y border-champagne/60 py-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 grid place-items-center bg-ivory-deep/80 text-bronze border border-champagne shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="eyebrow text-[0.625rem] text-taupe">{t('contact.emailTitle')}</span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-display text-lg text-obsidian hover:text-bronze transition-colors mt-0.5"
                  >
                    {CONTACT.email}
                  </a>
                  <span className="text-[0.75rem] text-taupe-deep">
                    Wholesale, export & project inquiries
                  </span>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 grid place-items-center bg-ivory-deep/80 text-bronze border border-champagne shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="eyebrow text-[0.625rem] text-taupe">{t('footer.phone')}</span>
                  <span className="font-display text-lg text-obsidian mt-0.5">
                    {CONTACT.phoneDisplay || t('footer.phonePending')}
                  </span>
                  <span className="text-[0.75rem] text-taupe-deep">
                    {t('contact.whatsappPending')}
                  </span>
                </div>
              </div>

              {/* Address / Location */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 grid place-items-center bg-ivory-deep/80 text-bronze border border-champagne shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="eyebrow text-[0.625rem] text-taupe">{t('contact.addressTitle')}</span>
                  <span className="font-display text-lg text-obsidian mt-0.5">
                    {CONTACT.cityRegion}
                  </span>
                  <span className="text-[0.75rem] text-taupe-deep">
                    {t('footer.addressPending')}
                  </span>
                </div>
              </div>
            </div>

            {/* Honest Business Transparency Disclaimer */}
            <div className="border border-champagne/80 p-5 bg-ivory-deep/40 text-[0.8125rem] text-obsidian/75 leading-relaxed">
              <span className="font-semibold text-obsidian block mb-1">
                Transparency & Privacy Note
              </span>
              {t('contact.infoNote')} Physical stone samples and live video stockyard inspection can be arranged upon receipt of project specifications.
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div id="inquiry" className="lg:col-span-7 border border-champagne bg-ivory-deep/30 p-8 sm:p-10 shadow-xs scroll-mt-36">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 grid place-items-center bg-bronze/10 text-bronze rounded-full border border-bronze/30">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="display-xs text-obsidian">{t('contact.success')}</h3>
                <p className="measure text-sm text-obsidian/70">
                  {t('contact.successNote')}
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-outline btn-sm mt-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                <div>
                  <h3 className="font-display text-2xl text-obsidian">{t('contact.formTitle')}</h3>
                  <p className="text-xs text-taupe-deep mt-1">{t('contact.formSubtitle')}</p>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label htmlFor="name" className="field-label">
                      {t('contact.fields.name')} <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.placeholders.name')}
                      className="field-input"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span className="text-[0.6875rem] text-red-700 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="company" className="field-label">
                      {t('contact.fields.company')}
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('contact.placeholders.company')}
                      className="field-input"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label htmlFor="email" className="field-label">
                      {t('contact.fields.email')} <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.placeholders.email')}
                      className="field-input"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className="text-[0.6875rem] text-red-700 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="phone" className="field-label">
                      {t('contact.fields.phone')} <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact.placeholders.phone')}
                      className="field-input"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <span className="text-[0.6875rem] text-red-700 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Selection & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label htmlFor="product" className="field-label">
                      {t('contact.fields.product')}
                    </label>
                    <select
                      id="product"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="field-input cursor-pointer"
                    >
                      <option value="">{t('contact.placeholders.product')}</option>
                      {products.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {tx(p.name)} ({p.shade})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="subject" className="field-label">
                      {t('contact.fields.subject')} <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t('contact.placeholders.subject')}
                      className="field-input"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <span className="text-[0.6875rem] text-red-700 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="field">
                  <label htmlFor="message" className="field-label">
                    {t('contact.fields.message')} <span className="text-bronze">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.placeholders.message')}
                    className="field-input"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className="text-[0.6875rem] text-red-700 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-solid btn-lg inline-flex items-center gap-2"
                  >
                    <span>{isSubmitting ? t('contact.sending') : t('contact.submit')}</span>
                    {!isSubmitting && <ArrowUpRight size={15} />}
                  </button>
                  <span className="text-[0.6875rem] text-taupe-deep tracking-wider uppercase">
                    Direct Rajasthan Office
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

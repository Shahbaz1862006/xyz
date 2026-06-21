'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(4, 'Subject is too short'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

const fieldClass = [
  'w-full rounded-xl px-4 py-3 text-sm font-poppins',
  'focus:outline-none transition-colors',
  '[background:var(--glass-bg)] [border:1px_solid_var(--glass-border)]',
  '[color:var(--on-surface)] [placeholder:color-var(--on-surface-2)]',
  'focus:[border-color:rgba(11,131,255,0.5)]',
].join(' ')

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeadline
          title="Get in touch."
          subtitle="For support questions, partnership inquiries, or just to say hello — we respond within one business day."
          className="mb-10"
        />

        <GlassCard className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="py-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--usdt-green)' }} />
                <h3 className="font-grifter font-bold text-2xl mb-2" style={{ color: 'var(--on-surface)' }}>
                  Message Sent
                </h3>
                <p className="font-poppins text-sm" style={{ color: 'var(--on-surface-2)' }}>
                  We'll get back to you within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="text-xs font-poppins mb-1.5 block"
                      style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}
                      htmlFor="contact-name"
                    >
                      Name
                    </label>
                    <input
                      {...register('name')}
                      id="contact-name"
                      placeholder="Your name"
                      className={fieldClass}
                      style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--on-surface)' }}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--tron-red)' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-xs font-poppins mb-1.5 block"
                      style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}
                      htmlFor="contact-email"
                    >
                      Email
                    </label>
                    <input
                      {...register('email')}
                      id="contact-email"
                      placeholder="you@example.com"
                      type="email"
                      className={fieldClass}
                      style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--on-surface)' }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--tron-red)' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="text-xs font-poppins mb-1.5 block"
                    style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}
                    htmlFor="contact-subject"
                  >
                    Subject
                  </label>
                  <input
                    {...register('subject')}
                    id="contact-subject"
                    placeholder="How can we help?"
                    className={fieldClass}
                    style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--on-surface)' }}
                  />
                  {errors.subject && (
                    <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--tron-red)' }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="text-xs font-poppins mb-1.5 block"
                    style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}
                    htmlFor="contact-message"
                  >
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="contact-message"
                    placeholder="Describe your question or issue in detail..."
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--on-surface)' }}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--tron-red)' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <GlassButton
                  type="submit"
                  variant="solid"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </GlassButton>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  )
}

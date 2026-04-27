'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { isWaitlistRole, WAITLIST_ROLE_OPTIONS } from '@/lib/waitlist/client'
import type { WaitlistApiResponse, WaitlistRole } from '@/lib/waitlist/types'

interface WaitlistFormProps {
  ctaLabel?: string
}

export default function WaitlistForm({ ctaLabel = 'Request access →' }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<WaitlistRole>('founder')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      })
      const data: WaitlistApiResponse = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('message' in data ? data.message : "You're on the list. We'll be in touch.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage('error' in data ? data.error : 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-7 py-6 rounded-2xl border border-accent/30 bg-accent/5 text-accent text-center"
          >
            <div className="text-2xl mb-2">✓</div>
            <p className="font-semibold m-0">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-2 p-2 rounded-2xl border border-line-2 bg-panel"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@fund.com or you@startup.com"
              aria-label="Email address"
              className="flex-1 min-w-0 bg-transparent border-0 px-3.5 py-3 text-sm outline-none text-txt placeholder:text-ghost"
            />
            <select
              value={role}
              onChange={(e) => {
                if (isWaitlistRole(e.target.value)) {
                  setRole(e.target.value)
                }
              }}
              aria-label="I am a"
              className="bg-transparent border-0 px-3 py-3 text-sm outline-none cursor-pointer text-muted"
            >
              {WAITLIST_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-none px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-[#243B53] hover:bg-[#34a97d] transition-all duration-200 disabled:opacity-60 cursor-pointer border-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_4px_16px_rgba(62,189,147,0.3)]"
            >
              {status === 'loading' ? 'Joining…' : ctaLabel}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-down"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
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
  const [totalJoined, setTotalJoined] = useState<number | null>(null)

  // Fetch initial stats for social proof
  useEffect(() => {
    fetch('/api/waitlist')
      .then((res) => res.json())
      .then((data: WaitlistApiResponse) => {
        if ('waitlist' in data) {
          setTotalJoined(data.waitlist.total)
        }
      })
      .catch(() => {}) // Silently fail, don't break the UI
  }, [])

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
        // Refresh counter
        if (totalJoined !== null) setTotalJoined(prev => (prev || 0) + 1)
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
    <div className="w-full max-w-[500px]">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="px-8 py-10 rounded-2xl border border-accent/30 bg-accent/5 text-center relative overflow-hidden group"
          >
            {/* Celebration background glow */}
            <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(62,189,147,0.1), transparent) pointer-events-none" />
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5 border border-accent/40"
            >
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <h3 className="text-xl font-bold text-txt mb-2">Welcome to the inner circle</h3>
            <p className="text-sub m-0 leading-relaxed">{message}</p>
            
            <motion.button
              onClick={() => setStatus('idle')}
              className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors bg-transparent border-0 cursor-pointer"
            >
              Invite a teammate →
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap md:flex-nowrap gap-2 p-1.5 rounded-2xl border border-line-2 bg-panel shadow-sm hover:border-accent/30 transition-colors duration-300"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@fund.com or you@startup.com"
                aria-label="Email address"
                className="flex-1 min-w-[200px] bg-transparent border-0 px-4 py-3.5 text-[15px] outline-none text-txt placeholder:text-ghost"
              />
              <div className="flex items-center gap-2 pr-1.5">
                <select
                  value={role}
                  onChange={(e) => {
                    if (isWaitlistRole(e.target.value)) {
                      setRole(e.target.value)
                    }
                  }}
                  aria-label="I am a"
                  className="bg-bg-2 border border-line rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-muted hover:text-txt transition-colors"
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
                  className="flex-none px-6 py-3 rounded-xl text-sm font-bold bg-accent text-[#243B53] hover:bg-[#34a97d] transition-all duration-200 disabled:opacity-60 cursor-pointer border-0 hover:shadow-[0_4px_20px_rgba(62,189,147,0.4)] active:scale-[0.97]"
                >
                  {status === 'loading' ? 'Joining…' : ctaLabel}
                </button>
              </div>
            </motion.form>
            
            {totalJoined !== null && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center md:text-left px-2 text-[13px] text-muted font-medium flex items-center gap-2 justify-center md:justify-start"
              >
                <span className="flex -space-x-2 mr-1">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="w-5 h-5 rounded-full border-2 border-panel bg-bg-2 flex items-center justify-center text-[8px] text-ghost">
                      {String.fromCharCode(64 + i)}
                    </span>
                  ))}
                </span>
                Join <span className="text-accent font-bold">{totalJoined.toLocaleString()}</span> others already in the verified network
              </motion.p>
            )}
          </div>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-down font-medium text-center md:text-left"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

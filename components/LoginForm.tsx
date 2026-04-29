'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import type { AuthApiResponse } from '@/lib/auth/types'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data: AuthApiResponse = await res.json()

      if (res.ok && data.success) {
        // Only redirect to a same-origin relative path to prevent open redirects
        const params = new URLSearchParams(window.location.search)
        const from = params.get('from')
        const destination =
          from && from.startsWith('/') && !from.startsWith('//') ? from : '/dashboard'
        window.location.href = destination
      } else {
        setStatus('error')
        setErrorMsg('error' in data ? data.error : 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-line-2 bg-panel text-sm text-txt placeholder:text-ghost outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/15 transition-all duration-150'

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-sub uppercase tracking-wide">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-sub uppercase tracking-wide">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-down px-1"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 w-full py-3 rounded-xl text-sm font-semibold bg-accent text-[#243B53] border border-accent hover:bg-[#34a97d] hover:border-[#34a97d] disabled:opacity-60 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_4px_16px_rgba(62,189,147,0.3)]"
      >
        {status === 'loading' ? 'Signing in…' : 'Sign in →'}
      </button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-accent font-medium hover:underline">
          Create one
        </a>
      </p>
    </motion.form>
  )
}

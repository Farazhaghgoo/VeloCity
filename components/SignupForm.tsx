'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { AUTH_ROLE_OPTIONS, isAuthRole, type AuthRole, type AuthApiResponse } from '@/lib/auth/types'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<AuthRole>('founder')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, company }),
      })
      const data: AuthApiResponse = await res.json()

      if (res.ok && data.success) {
        window.location.href = '/dashboard'
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
        <label className="text-xs font-semibold text-sub uppercase tracking-wide">Full name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Johnson"
          autoComplete="name"
          className={inputClass}
        />
      </div>

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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sub uppercase tracking-wide">I am a</label>
          <select
            value={role}
            onChange={(e) => { if (isAuthRole(e.target.value)) setRole(e.target.value) }}
            className="w-full px-4 py-3 rounded-xl border border-line-2 bg-panel text-sm text-txt outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/15 transition-all duration-150 cursor-pointer"
          >
            {AUTH_ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sub uppercase tracking-wide">Company</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
            autoComplete="organization"
            className={inputClass}
          />
        </div>
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
        {status === 'loading' ? 'Creating account…' : 'Create account →'}
      </button>

      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        <a href="/login" className="text-accent font-medium hover:underline">
          Sign in
        </a>
      </p>
    </motion.form>
  )
}

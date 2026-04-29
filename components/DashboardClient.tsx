'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { PublicUser } from '@/lib/auth/types'

const FOUNDER_STATS = [
  { label: 'Profile views', value: '—', trend: null },
  { label: 'VC matches', value: '—', trend: null },
  { label: 'Requests received', value: '—', trend: null },
  { label: 'Days to term sheet', value: '14', trend: 'Target' },
]

const VC_STATS = [
  { label: 'Deal pipeline', value: '—', trend: null },
  { label: 'Verified founders', value: '—', trend: null },
  { label: 'Due-diligence open', value: '—', trend: null },
  { label: 'Avg. response time', value: '<24h', trend: 'SLA' },
]

function roleLabel(role: PublicUser['role']) {
  return role === 'vc' ? 'VC / Angel Investor' : 'Founder'
}

interface Props {
  user: PublicUser
}

export default function DashboardClient({ user }: Props) {
  const [signing, setSigning] = useState(false)

  const stats = user.role === 'vc' ? VC_STATS : FOUNDER_STATS

  const handleSignOut = async () => {
    setSigning(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      window.location.href = '/'
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 border-b border-line"
        style={{
          background: 'rgba(240,244,248,0.95)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-7 h-[68px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-[15px] text-txt">
            <span
              className="w-[22px] h-[22px] rounded-md flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #243B53, #3EBD93)',
                boxShadow: '0 0 14px rgba(62,189,147,0.25)',
              }}
            >
              VC
            </span>
            <span>
              <span className="text-accent">V</span>elo<span className="text-accent">C</span>ity
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted">{user.email}</span>
            <button
              onClick={handleSignOut}
              disabled={signing}
              className="px-4 py-2 rounded-[10px] text-sm font-medium border border-line-2 text-sub hover:border-accent/40 hover:text-txt bg-transparent transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              {signing ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1200px] mx-auto px-7 py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 uppercase tracking-wide">
              {roleLabel(user.role)}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-txt mb-1">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-muted text-sm">{user.company}</p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-panel rounded-2xl border border-line p-5 card-shadow">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-txt">{stat.value}</p>
              {stat.trend && (
                <p className="text-xs text-accent mt-1 font-medium">{stat.trend}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Role-specific panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {user.role === 'founder' ? (
            <>
              <div className="bg-panel rounded-2xl border border-line p-6 card-shadow">
                <h2 className="text-base font-bold text-txt mb-1">Your pitch profile</h2>
                <p className="text-sm text-muted mb-4">
                  Complete your profile so verified VCs can discover and evaluate your company.
                </p>
                <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
                  <div className="h-2 w-[20%] rounded-full bg-accent" />
                </div>
                <p className="text-xs text-muted mt-2">20% complete — add your data room to unlock matches</p>
              </div>

              <div className="bg-panel rounded-2xl border border-line p-6 card-shadow">
                <h2 className="text-base font-bold text-txt mb-1">Matched VCs</h2>
                <p className="text-sm text-muted mb-4">
                  Once your profile is verified, we&apos;ll surface relevant VC matches based on stage, sector, and check size.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-line-2 text-muted">
                  ⏳ Pending verification
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-panel rounded-2xl border border-line p-6 card-shadow">
                <h2 className="text-base font-bold text-txt mb-1">Deal flow inbox</h2>
                <p className="text-sm text-muted mb-4">
                  Browse verified founder pitches that match your investment thesis, stage, and sector focus.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-line-2 text-muted">
                  ⏳ Completing VC profile
                </span>
              </div>

              <div className="bg-panel rounded-2xl border border-line p-6 card-shadow">
                <h2 className="text-base font-bold text-txt mb-1">Your investment thesis</h2>
                <p className="text-sm text-muted mb-4">
                  Define your check size, stage preference, and sectors so founders with matching profiles are surfaced first.
                </p>
                <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
                  <div className="h-2 w-[10%] rounded-full bg-accent" />
                </div>
                <p className="text-xs text-muted mt-2">10% complete — add your thesis to see deal flow</p>
              </div>
            </>
          )}
        </motion.div>

        {/* Account info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-6 bg-panel rounded-2xl border border-line p-6 card-shadow"
        >
          <h2 className="text-base font-bold text-txt mb-4">Account details</h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">Name</dt>
              <dd className="text-txt font-medium">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">Email</dt>
              <dd className="text-txt font-medium break-all">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">Company</dt>
              <dd className="text-txt font-medium">{user.company}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">Member since</dt>
              <dd className="text-txt font-medium">
                {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </dd>
            </div>
          </dl>
        </motion.div>
      </main>
    </div>
  )
}

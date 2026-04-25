'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BADGES = [
  { icon: '🔒', label: 'SOC 2 Type II', sub: 'In progress · Q3 2026' },
  { icon: '🛡️', label: 'AES-256 Encryption', sub: 'At rest & in transit' },
  { icon: '🔑', label: 'Read-only OAuth', sub: 'Zero write scopes' },
  { icon: '🌍', label: 'GDPR Compliant', sub: 'UK & EU GDPR' },
  { icon: '🔍', label: 'Penetration Tested', sub: 'Quarterly audits' },
]

export default function SecurityStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      ref={ref}
      className="py-5 border-b border-line bg-bg-3 relative overflow-hidden"
      aria-label="Security certifications"
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(62,189,147,0.45) 40%, rgba(37,99,235,0.30) 60%, transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-muted hidden sm:block">
            Security &amp; compliance
          </span>
          <div className="flex flex-wrap gap-2.5">
            {BADGES.map(({ icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line-2 bg-panel"
                title={sub}
              >
                <span className="text-sm leading-none" aria-hidden="true">{icon}</span>
                <span className="text-xs font-semibold text-txt">{label}</span>
                <span className="text-xs text-muted hidden md:block">· {sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

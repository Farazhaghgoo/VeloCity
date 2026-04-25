'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const FAQS = [
  {
    q: 'Is connecting Stripe / QuickBooks safe?',
    a: "Read-only OAuth. We never touch write scopes. Credentials are never stored — only short-lived tokens, encrypted at rest. You can revoke anytime and a tamper-proof snapshot remains for the viewers you already permitted.",
  },
  {
    q: 'How is this different from AngelList or LinkedIn?',
    a: "AngelList monetizes syndicates; LinkedIn monetizes ads. Neither verifies traction data or enforces feedback. We're not a social graph — we're a verification layer.",
  },
  {
    q: 'Do you charge success fees?',
    a: "Only in jurisdictions where it's legal without broker-dealer registration (UK, SG, UAE, most EU). US accounts are SaaS-only.",
  },
  {
    q: 'How do you stop VCs from ghosting?',
    a: "A VC literally cannot view a new deck until outstanding pitches receive a Pass-with-reason or Continue. Response rate is public on every VC profile.",
  },
  {
    q: 'Who verifies the VCs?',
    a: "Institutional: SEC IAPD + fund administrator attestation. Angels: accredited-investor verification + Plaid balance snapshot ≥ 3× declared check size. Every profile carries a tier badge.",
  },
]

interface FAQItemProps {
  q: string
  a: string
  index: number
  isInView: boolean
}

function FAQItem({ q, a, index, isInView }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={[
        'rounded-xl overflow-hidden border transition-colors duration-150 bg-panel',
        open ? 'border-accent/30' : 'border-line',
      ].join(' ')}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center px-5 py-4 font-semibold cursor-pointer bg-transparent border-0 text-base text-txt"
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl ml-4 flex-none leading-none text-accent"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 pb-5 m-0 text-sub">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="py-[110px]">
      <div ref={ref} className="max-w-[820px] mx-auto px-7">
        <div className="mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            FAQ
          </span>
          <h2 className="font-bold text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]">
            Questions we get asked daily.
          </h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {FAQS.map(({ q, a }, i) => (
            <FAQItem key={q} q={q} a={a} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WaitlistForm from './WaitlistForm'

const PARTNER_LOGOS = ['INDEX', 'ATOMICO', 'ACCEL', 'BALDERTON', 'SEQUOIA SEA']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const glow1Ref = useRef<HTMLDivElement>(null)
  const glow2Ref = useRef<HTMLDivElement>(null)
  const dotGridRef = useRef<HTMLDivElement>(null)
  const cardsColRef = useRef<HTMLDivElement>(null)
  const card1Wrapper = useRef<HTMLDivElement>(null)
  const card2Wrapper = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    if (glow1Ref.current) tl.to(glow1Ref.current, { y: -90, ease: 'none' }, 0)
    if (glow2Ref.current) tl.to(glow2Ref.current, { y: -45, ease: 'none' }, 0)
    if (dotGridRef.current) tl.to(dotGridRef.current, { y: -35, ease: 'none' }, 0)
    if (cardsColRef.current) tl.to(cardsColRef.current, { y: -55, ease: 'none' }, 0)

    if (card1Wrapper.current) {
      gsap.to(card1Wrapper.current, { y: -14, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }
    if (card2Wrapper.current) {
      gsap.to(card2Wrapper.current, { y: 10, duration: 2.9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: '90px', paddingBottom: '80px' }}
    >
      {/* Top-right mint glow */}
      <div
        ref={glow1Ref}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          right: '-150px', top: '-150px', width: '800px', height: '800px',
          background: 'radial-gradient(closest-side, rgba(62,189,147,0.10), transparent 70%)',
        }}
      />
      {/* Bottom-left blue glow */}
      <div
        ref={glow2Ref}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          left: '-100px', bottom: '0', width: '600px', height: '600px',
          background: 'radial-gradient(closest-side, rgba(37,99,235,0.07), transparent 70%)',
        }}
      />
      {/* Dot grid — steel dots on ice bg */}
      <div
        ref={dotGridRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(36,59,83,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7 relative">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-line-2 text-muted mb-6 bg-panel"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent"
                style={{ boxShadow: '0 0 8px rgba(62,189,147,0.5)' }}
              />
              Now in private alpha — London &amp; Singapore
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-bold text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.025em] mb-[22px] text-txt"
              style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
            >
              From pitch deck to <em>term sheet</em>
              <br />
              in 14 days.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-[19px] text-sub max-w-[580px] mb-8"
            >
              VeloCity replaces warm intros and cold emails with verified, real-time data. Founders
              connect Stripe, QuickBooks, and Google Analytics — VCs see tamper-proof growth metrics.
              Due diligence drops from 12 weeks to 3.
            </motion.p>

            <motion.div
              id="hero-waitlist"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <WaitlistForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-9"
            >
              <p className="text-xs tracking-[0.08em] mb-3 text-muted">
                Trusted early feedback from partners at
              </p>
              <div className="flex flex-wrap gap-7">
                {PARTNER_LOGOS.map((name) => (
                  <span key={name} className="text-xs font-semibold tracking-[0.22em] text-faint">
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Visual Cards (lg+) with parallax */}
          <motion.div
            ref={cardsColRef}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="hidden lg:flex flex-col gap-5"
            aria-hidden="true"
          >
            {/* Card 1 */}
            <div ref={card1Wrapper}>
              <div
                className="rounded-2xl p-5 border border-line bg-panel"
                style={{
                  boxShadow: '0 20px 60px -20px rgba(36,59,83,0.14), 0 0 40px rgba(62,189,147,0.06)',
                  transform: 'rotate(-2deg)',
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full border border-accent/35 bg-accent/10 text-accent font-medium">
                    ● 94% match
                  </span>
                  <span className="text-xs text-muted">Series A · SaaS · $3–5M</span>
                </div>
                <div className="font-semibold mb-4 text-sm text-txt">
                  Anonymous Founder <span className="text-muted">· until mutual match</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  {[
                    { k: 'MRR', v: '$412k', d: '+18% MoM', up: true },
                    { k: 'NRR', v: '131%', d: 'verified', up: true },
                    { k: 'Burn ×', v: '1.4', d: 'healthy', up: false },
                  ].map(({ k, v, d, up }) => (
                    <div key={k} className="rounded-xl p-2.5 flex flex-col gap-0.5 border border-line bg-bg-2">
                      <span className="text-[11px] uppercase tracking-[0.08em] text-muted">{k}</span>
                      <span className="text-lg font-bold text-txt">{v}</span>
                      <span className={`text-[11px] ${up ? 'text-up' : 'text-muted'}`}>{d}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {['Stripe ✓', 'QuickBooks ✓', 'GA4 ✓'].map((chip) => (
                    <span key={chip} className="text-[11px] px-2 py-1 rounded-full border border-line bg-bg-2 text-muted">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 + pulse ring */}
            <div className="flex items-start gap-4">
              <div ref={card2Wrapper} className="flex-1">
                <div
                  className="rounded-2xl p-4 border border-line bg-panel"
                  style={{
                    boxShadow: '0 12px 32px -12px rgba(36,59,83,0.12)',
                    transform: 'rotate(1.5deg)',
                  }}
                >
                  <div className="text-xs text-muted mb-1.5">Feedback Lock</div>
                  <div className="font-semibold text-sm mb-3 text-txt">Clear 2 pending pitches to unlock new intros</div>
                  <div className="h-1.5 rounded-full overflow-hidden mb-2 border border-line bg-bg-2">
                    <div
                      className="h-full rounded-full"
                      style={{ width: '66%', background: 'linear-gradient(90deg, #3EBD93, #2563EB)' }}
                    />
                  </div>
                  <div className="text-xs text-muted">Response rate · 87%</div>
                </div>
              </div>

              {/* Pulse ring */}
              <div className="relative flex items-center justify-center w-[90px] h-[90px] flex-shrink-0 mt-2">
                <span className="absolute inset-0 rounded-full border border-accent/30 animate-pulse-ring" style={{ animationDelay: '0s' }} aria-hidden="true" />
                <span className="absolute inset-0 rounded-full border border-accent/20 animate-pulse-ring" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
                <div
                  className="relative w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center border border-accent/30 bg-panel"
                  style={{ boxShadow: '0 0 20px rgba(62,189,147,0.18)' }}
                >
                  <span className="text-[18px] font-bold text-accent leading-none">94</span>
                  <span className="text-[9px] text-muted tracking-wide">match</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

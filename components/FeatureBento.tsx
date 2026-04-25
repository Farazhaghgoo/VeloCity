'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

export default function FeatureBento() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!gridRef.current) return

    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.bento-card'))

    gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 })

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.09,
        })
      },
    })

    const statNums = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>('[data-count]')
    )
    statNums.forEach((el) => {
      const target = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''
      const isDecimal = el.dataset.decimal === 'true'
      const obj = { val: 0 }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = (isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix
            },
          })
        },
      })
    })

    const bars = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>('[data-bar-width]')
    )
    bars.forEach((bar) => {
      const targetWidth = bar.dataset.barWidth || '0%'
      gsap.set(bar, { width: 0 })

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.1,
            ease: 'power2.out',
          })
        },
      })
    })
  })

  return (
    <section ref={sectionRef} className="py-[110px] bg-bg-2 border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-7">

        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            Platform
          </span>
          <RevealText
            text="Everything you need. Nothing you don't."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            Purpose-built for institutional-grade deal flow — not adapted from a generic CRM.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-12 gap-4">

          {/* Large card */}
          <div className="bento-card p-7 relative overflow-hidden col-span-12 md:col-span-8">
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
              aria-hidden="true"
              style={{ background: 'radial-gradient(closest-side, rgba(62,189,147,0.10), transparent)' }}
            />
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase mb-3 text-accent">
              Core feature
            </span>
            <h3 className="text-2xl font-bold mb-2">Real-time verified matching</h3>
            <p className="text-sub mb-7 max-w-[460px]">
              Nine-signal AI engine surfaces deals matched to your thesis, stage, and check size — updated every 24 hours from tamper-proof data sources.
            </p>
            <div className="flex gap-8 flex-wrap">
              {[
                { label: 'Avg. match score', value: '94', suffix: '%', color: 'text-accent', decimal: false },
                { label: 'Time to first intro', value: '3.2', suffix: ' days', color: 'text-accent-2', decimal: true },
                { label: 'Verified deals / week', value: '40', suffix: '+', color: 'text-gold', decimal: false },
              ].map(({ label, value, suffix, color, decimal }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className={`text-[30px] font-bold tabular-nums leading-none ${color}`}
                    data-count={value}
                    data-suffix={suffix}
                    data-decimal={decimal ? 'true' : 'false'}
                  >
                    {value}{suffix}
                  </span>
                  <span className="text-xs text-muted mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified data */}
          <div className="bento-card p-6 flex flex-col justify-between col-span-12 md:col-span-4">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-accent-2/25 bg-accent-2/10" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3EBD93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Verified data, not slides</h3>
              <p className="text-sm text-sub m-0">Every metric pulled via read-only OAuth. Tamper-proof. Timestamped. Immutable.</p>
            </div>
            <div className="mt-5 flex gap-1.5 flex-wrap">
              {['Stripe', 'QuickBooks', 'GA4', 'Shopify', 'Xero'].map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border border-line-2 bg-bg-3 text-muted">{s} ✓</span>
              ))}
            </div>
          </div>

          {/* Zero ghosting */}
          <div className="bento-card p-6 flex flex-col justify-between col-span-12 sm:col-span-6 md:col-span-4">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-down/25 bg-down/10" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Zero ghosting</h3>
              <p className="text-sm text-sub m-0">VCs must respond before seeing new deals. Response rate: <strong className="text-txt">100% by design.</strong></p>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-muted mb-1.5">
                <span>Platform avg. response rate</span>
                <span className="text-up font-semibold">87%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-bg-3 border border-line">
                <div className="h-full rounded-full" data-bar-width="87%" style={{ background: 'linear-gradient(90deg, #3EBD93, #2563EB)' }} />
              </div>
            </div>
          </div>

          {/* Global reach */}
          <div className="bento-card p-6 flex flex-col gap-4 col-span-12 sm:col-span-6 md:col-span-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Global reach</h3>
              <p className="text-sm text-sub m-0">Funds across three continents. Founders in 40+ countries.</p>
            </div>
            <div className="flex gap-2">
              {[
                { flag: '🇬🇧', label: 'London', sub: 'Live' },
                { flag: '🇸🇬', label: 'Singapore', sub: 'Live' },
                { flag: '🇺🇸', label: 'US', sub: 'Q3 2026' },
              ].map(({ flag, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border border-line bg-bg-3 flex-1">
                  <span className="text-xl" aria-hidden="true">{flag}</span>
                  <span className="text-xs font-semibold text-txt">{label}</span>
                  <span className="text-[10px] text-muted">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 14 days */}
          <div className="bento-card p-6 flex flex-col gap-5 col-span-12 sm:col-span-6 md:col-span-4">
            <div>
              <h3 className="text-lg font-bold mb-1">14 days average</h3>
              <p className="text-sm text-sub m-0">From first match to signed term sheet. Industry avg: 14 weeks.</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Match', day: 'Day 1', pct: 10 },
                { label: 'Intro sent', day: 'Day 3', pct: 30 },
                { label: 'Due diligence', day: 'Day 7', pct: 60 },
                { label: 'Term sheet', day: 'Day 14', pct: 100 },
              ].map(({ label, day, pct }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[11px] text-muted w-[70px] flex-shrink-0">{label}</span>
                  <div className="flex-1 h-1 rounded-full bg-bg-3 border border-line overflow-hidden">
                    <div className="h-full rounded-full" data-bar-width={`${pct}%`} style={{ background: 'linear-gradient(90deg, #3EBD93, #2563EB)' }} />
                  </div>
                  <span className="text-[11px] text-accent font-semibold w-[42px] text-right flex-shrink-0">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LP analytics */}
          <div className="bento-card p-6 relative overflow-hidden col-span-12 sm:col-span-6 md:col-span-4">
            <div className="absolute top-0 right-0 w-[180px] h-[180px] pointer-events-none" aria-hidden="true"
              style={{ background: 'radial-gradient(closest-side, rgba(240,180,41,0.08), transparent)' }}
            />
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 border border-gold/25 bg-gold/10" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1">LP-grade analytics</h3>
            <p className="text-sm text-sub m-0 mb-4">Real-time portfolio health signals. Quarterly benchmarks. The data LPs actually want.</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/10">
              <span className="text-[11px] font-semibold text-gold">Enterprise tier</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

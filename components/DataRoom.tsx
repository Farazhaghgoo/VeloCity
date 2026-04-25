'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const METRICS = [
  { label: 'Verified MRR', value: '$412,000', up: false },
  { label: 'MoM growth', value: '+18.2%', up: true },
  { label: 'Net revenue retention', value: '131%', up: false },
  { label: 'Gross margin', value: '81%', up: false },
  { label: 'Burn multiple', value: '1.4×', up: false },
]

const TICKS = [
  'Granular access — view / download / timed expiry',
  'Per-viewer watermarking on every page',
  'Signal analytics — who opened what, for how long',
  'Auto-expiring NDAs with full audit trail',
]

export default function DataRoom() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!panelRef.current || !textRef.current) return

    gsap.set(panelRef.current, { opacity: 0, x: -50 })
    gsap.set(textRef.current, { opacity: 0, x: 50 })

    const ticks = Array.from(
      textRef.current.querySelectorAll<HTMLElement>('.tick-item')
    )
    gsap.set(ticks, { opacity: 0, x: 20 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(panelRef.current, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        })
        gsap.to(textRef.current, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        })
        gsap.to(ticks, {
          opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.09, delay: 0.45,
        })
        
        const chartBars = panelRef.current?.querySelectorAll<HTMLElement>('[data-chart-bar]')
        if (chartBars) {
          chartBars.forEach((bar, index) => {
            const targetHeight = bar.getAttribute('data-chart-bar') || '0'
            gsap.to(bar, {
              height: `${targetHeight}%`,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.4 + (index * 0.05)
            })
          })
        }
      },
    })
  })

  return (
    <section ref={sectionRef} className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">

        {/* VDR Panel mockup */}
        <div ref={panelRef} aria-hidden="true">
          <div
            className="rounded-2xl p-6 border border-line-2 bg-panel backdrop-blur-sm"
            style={{ boxShadow: '0 30px 80px -40px rgba(36,59,83,0.12), 0 0 60px rgba(62,189,147,0.08)' }}
          >
            <div className="mb-6 flex items-end gap-1.5 h-24 border-b border-line pb-2" aria-hidden="true">
              {[40, 55, 45, 70, 60, 85, 100].map((height, i) => (
                <div key={i} className="flex-1 bg-accent/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${height}%` }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-accent transition-all duration-700 ease-out" 
                    style={{ height: '0%' }}
                    data-chart-bar={height}
                  />
                </div>
              ))}
            </div>

            {METRICS.map(({ label, value, up }) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 border-b border-dashed border-line last:border-b-0"
              >
                <span className="text-sm text-muted">{label}</span>
                <strong className={`text-base tabular-nums ${up ? 'text-up' : 'text-txt'}`}>{value}</strong>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-line text-xs text-muted">
              Snapshot · immutable · 2026-04-24 09:14 UTC
            </div>
          </div>
        </div>

        {/* Text content */}
        <div ref={textRef}>
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            Virtual data room
          </span>
          <RevealText
            text="The DD room that closes rounds in weeks, not quarters."
            className="font-bold mb-4 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            Per-VC permissions. Watermarking. View analytics. Automatic NDA. Every document carries
            provenance.
          </p>
          <ul className="flex flex-col gap-3 mt-6 p-0 list-none">
            {TICKS.map((tick) => (
              <li key={tick} className="tick-item pl-7 relative text-dim">
                <span
                  className="absolute left-0 top-[7px] w-3.5 h-3.5 rounded-full bg-accent"
                  style={{ boxShadow: '0 0 10px rgba(62,189,147,0.45)' }}
                  aria-hidden="true"
                />
                {tick}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

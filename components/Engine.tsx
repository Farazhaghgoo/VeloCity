'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const SIGNALS = [
  { label: 'Thesis / Sector fit', width: 100, value: '20%', neg: false },
  { label: 'Velocity of growth', width: 90, value: '18%', neg: false },
  { label: 'Check-size fit', width: 75, value: '15%', neg: false },
  { label: 'Stage fit', width: 60, value: '12%', neg: false },
  { label: 'Founder-market fit', width: 60, value: '12%', neg: false },
  { label: 'ESG / impact', width: 40, value: '8%', neg: false },
  { label: 'Geography', width: 40, value: '8%', neg: false },
  { label: 'Historical reciprocity', width: 35, value: '7%', neg: false },
  { label: 'Portfolio conflict (penalty)', width: 50, value: '−10%', neg: true },
]

export default function Engine() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!rowsRef.current) return

    const rows = Array.from(rowsRef.current.querySelectorAll<HTMLElement>('.signal-row'))
    const bars = Array.from(rowsRef.current.querySelectorAll<HTMLElement>('.signal-bar'))

    gsap.set(rows, { opacity: 0, x: -24 })
    bars.forEach((bar) => gsap.set(bar, { width: 0 }))

    ScrollTrigger.create({
      trigger: rowsRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(rows, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 })
        bars.forEach((bar, i) => {
          const targetWidth = bar.dataset.targetWidth || '0%'
          gsap.to(bar, {
            width: targetWidth,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.06 + 0.3,
          })
        })
      },
    })
  })

  return (
    <section ref={sectionRef} id="engine" className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            The matchmaking engine
          </span>
          <RevealText
            text="Nine signals. One score. Zero theatrics."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            Weighted, learned, and re-ranked daily. Thompson sampling balances exploration and
            exploitation.
          </p>
        </div>

        <div ref={rowsRef} className="flex flex-col gap-2.5 max-w-[820px] mx-auto">
          {SIGNALS.map(({ label, width, value, neg }) => (
            <div
              key={label}
              className="signal-row grid grid-cols-[1fr_auto] sm:flex sm:items-center gap-x-4 gap-y-2 px-4 py-3.5 rounded-xl border border-line bg-panel"
            >
              <span className="text-sm text-dim sm:flex-none sm:w-[220px]">{label}</span>
              <div className="col-span-2 sm:col-auto sm:flex-1 h-1.5 rounded-full overflow-hidden border border-line bg-bg-3">
                <div
                  className="signal-bar h-full rounded-full"
                  data-target-width={`${width}%`}
                  style={{
                    background: neg
                      ? 'linear-gradient(90deg, #f87171, #b91c1c)'
                      : 'linear-gradient(90deg, #3EBD93, #2563EB)',
                  }}
                />
              </div>
              <span className={`text-sm font-semibold tabular-nums text-right sm:flex-none sm:w-[50px] ${neg ? 'text-down' : 'text-accent'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

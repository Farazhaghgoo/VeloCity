'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const CARDS = [
  {
    num: '01',
    title: 'Verified data moat',
    body: '24 months of longitudinal time-series across 1,000+ private companies. The dataset LPs will pay for — and the reason VCs can never leave.',
  },
  {
    num: '02',
    title: 'Feedback as a protocol',
    body: 'Not a feature — the only way the product works. Makes VeloCity the most respectful place on earth to fundraise.',
  },
  {
    num: '03',
    title: 'Employee liquidity board',
    body: 'Phase 3: employees of funded startups list equity for expression-of-interest. Turns a funding tool into a wealth ecosystem.',
  },
]

export default function SecretSauce() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    if (!headingRef.current || !cardsContainerRef.current) return

    const cards = Array.from(cardsContainerRef.current.querySelectorAll<HTMLElement>('.sauce-card'))
    gsap.set(headingRef.current, { opacity: 0, x: -40 })
    gsap.set(cards, { opacity: 0, x: 50 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(headingRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
        gsap.to(cards, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', stagger: 0.13, delay: 0.1 })
      },
    })
  })

  return (
    <section ref={sectionRef} className="py-[110px] border-t border-b border-line bg-bg-2 relative overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(62,189,147,0.05), transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start relative">
        <div ref={headingRef}>
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            Secret sauce
          </span>
          <RevealText
            text="Three things that make this un-copyable."
            className="font-bold text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
        </div>

        <div ref={cardsContainerRef} className="flex flex-col gap-3.5">
          {CARDS.map(({ num, title, body }) => (
            <div
              key={num}
              className="sauce-card relative p-6 pl-[70px] rounded-2xl border border-line bg-panel transition-all duration-200 hover:border-accent/30 hover:-translate-y-0.5"
            >
              <div
                className="absolute left-6 top-6 text-[28px] font-bold text-accent"
                style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
              >
                {num}
              </div>
              <h4 className="text-[17px] font-semibold mb-1.5 m-0">{title}</h4>
              <p className="m-0 text-sub">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

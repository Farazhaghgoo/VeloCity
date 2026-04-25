'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const PILLARS = [
  {
    num: '01',
    title: 'Verified Data, Not Pitch Theater',
    body: 'Founders connect Stripe, QBO, Xero, GA4, Shopify. We compute MRR, NRR, burn multiple, cohort retention — hashed and timestamped. VCs see truth, not slides.',
  },
  {
    num: '02',
    title: 'Double-Blind Matching',
    body: 'VCs see anonymized metrics first. Identity revealed only on mutual interest. Eliminates pedigree bias and geographic bias in one move.',
  },
  {
    num: '03',
    title: 'The Feedback Lock',
    body: "A VC can't see a new deck until they've cleared the last one — Pass with 2 sentences, or Continue. Ghosting is structurally impossible.",
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      ScrollTrigger.create({
        trigger: lineRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(lineRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' })
        },
      })
    }

    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.querySelectorAll<HTMLElement>('.how-card'))
      gsap.set(cards, { opacity: 0, y: 60 })

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.16,
          })
        },
      })
    }
  })

  return (
    <section ref={sectionRef} id="how" className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            How it works
          </span>
          <RevealText
            text="Three primitives that kill networking friction."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            No cold decks. No ghosting. No pedigree games. Just signal.
          </p>
        </div>

        {/* Step connector (desktop only) */}
        <div className="hidden md:block relative mb-[-20px] h-0">
          <div
            ref={lineRef}
            className="absolute top-[52px] left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px bg-gradient-to-r from-accent/40 via-accent-2/40 to-accent/40"
            aria-hidden="true"
          />
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {PILLARS.map(({ num, title, body }) => (
            <article
              key={num}
              className="how-card p-7 rounded-2xl border border-line bg-panel flex flex-col gap-2.5 transition-all duration-200 hover:border-accent/30 hover:-translate-y-1"
            >
              <div
                className="text-3xl mb-1 font-bold text-accent"
                style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
              >
                {num}
              </div>
              <h3 className="text-xl font-semibold mb-1 m-0">{title}</h3>
              <p className="m-0 leading-relaxed text-sub">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

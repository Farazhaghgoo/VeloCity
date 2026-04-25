'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const PLANS = [
  {
    tag: 'Founder',
    price: 'Free',
    sub: 'until you close',
    features: ['Verified data integrations', 'Double-blind matching', 'Virtual data room (up to 20 viewers)', 'Founder reputation score'],
    cta: 'Join as Founder',
    highlight: false,
  },
  {
    tag: 'VC · Fund',
    price: '$4,900',
    sub: '/ seat / month',
    features: ['Unlimited verified deal flow', 'Premium sector analytics', 'Thesis-tuned matching', 'Feedback-Lock inbox', 'Portfolio conflict guard'],
    cta: 'Request fund access',
    highlight: true,
  },
  {
    tag: 'LP / Enterprise',
    price: 'Custom',
    sub: 'data & API',
    features: ['Aggregate market benchmarks', 'Fund performance signal', 'Verified dataset API', 'LP-grade quarterly reports'],
    cta: 'Talk to us',
    highlight: false,
  },
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (cardsRef.current) {
      const cards = Array.from(
        cardsRef.current.querySelectorAll<HTMLElement>('.pricing-card')
      )

      gsap.set(cards, { opacity: 0, y: 70, scale: 0.96 })

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const order = [1, 0, 2]
          order.forEach((idx, i) => {
            if (cards[idx]) {
              gsap.to(cards[idx], {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                ease: 'power3.out',
                delay: i * 0.1,
              })
            }
          })
        },
      })
    }
  })

  return (
    <section ref={sectionRef} id="pricing" className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            Pricing
          </span>
          <RevealText
            text="Founders pay nothing until they raise."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            VCs subscribe. LPs buy analytics. Success fees only where regulation permits.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {PLANS.map(({ tag, price, sub, features, cta, highlight }) => (
            <div
              key={tag}
              className={[
                'pricing-card relative p-7 rounded-2xl border flex flex-col gap-5 transition-all duration-200',
                highlight
                  ? 'border-accent/40 shadow-[0_30px_60px_-30px_rgba(62,189,147,0.15)] hover:shadow-[0_40px_80px_-30px_rgba(62,189,147,0.25)] hover:-translate-y-1'
                  : 'border-line bg-panel hover:shadow-[0_20px_40px_-20px_rgba(36,59,83,0.10)] hover:-translate-y-1',
              ].join(' ')}
              style={highlight ? { background: 'linear-gradient(180deg, rgba(62,189,147,0.07), #FFFFFF)' } : {}}
            >
              {highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-accent text-[#243B53] border border-accent/80">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-xs font-semibold tracking-[0.12em] uppercase text-accent">{tag}</div>
              <div>
                <div
                  className="text-[36px] font-bold tracking-[-0.02em] leading-none"
                  style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
                >
                  {price}
                </div>
                <div className="text-sm mt-1 text-muted">{sub}</div>
              </div>
              <ul className="flex flex-col gap-2 list-none p-0 m-0 flex-1">
                {features.map((f) => (
                  <li key={f} className="pl-6 relative text-sm text-dim">
                    <span className="absolute left-0 font-bold text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => scrollTo('#waitlist')}
                  className={[
                    'w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-150 cursor-pointer',
                    highlight
                      ? 'bg-accent text-[#243B53] border-accent hover:bg-[#34a97d] hover:border-[#34a97d]'
                      : 'bg-transparent text-txt border-line-2 hover:border-accent/40',
                  ].join(' ')}
                >
                  {cta}
                </button>
                {highlight && (
                  <p className="text-center text-xs text-muted m-0">No credit card required</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

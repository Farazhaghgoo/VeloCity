'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const PROBLEMS = [
  {
    num: '01',
    title: 'Founders are ghosted',
    items: [
      'Average founder sends 127+ cold emails per round — most ignored',
      '73% of pitches receive zero feedback, ever',
      'Access gates on school pedigree and geography, not business merit',
      'Conference circuits cost $3–15k to attend with no guaranteed ROI',
    ],
  },
  {
    num: '02',
    title: 'VCs drown in noise',
    items: [
      'Tier-1 funds receive 2,500+ unsolicited decks per year',
      'Less than 2% reach a first call — screened by slide design alone',
      'Due diligence averages 12 weeks on unverified, founder-curated data',
      'No structured feedback obligation creates growing reputational risk',
    ],
  },
  {
    num: '03',
    title: 'The market is opaque',
    items: [
      'No verified source of truth for private company growth metrics',
      'Warm intros reward social capital over business fundamentals',
      'Pedigree bias systematically excludes high-growth outliers',
      'LPs have zero real-time visibility into portfolio health',
    ],
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    if (cardsRef.current) {
      const cards = Array.from(
        cardsRef.current.querySelectorAll<HTMLElement>('.problem-card')
      )

      gsap.set(cards, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.14,
          })
        },
      })
    }
  })

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="py-[110px] border-t border-b border-line bg-bg-2 relative overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(239,68,68,0.04), transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7 relative">
        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            The Old Way
          </span>
          <RevealText
            text="The fundraising stack is broken for everyone."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            $140B is deployed annually by VC funds — yet the process for matching capital with
            companies still runs on cold emails, warm handshakes, and blind luck.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {PROBLEMS.map(({ num, title, items }) => (
            <div
              key={num}
              className="problem-card p-7 rounded-2xl border border-line bg-panel flex flex-col gap-3.5 transition-all duration-200 hover:border-red-200 hover:-translate-y-0.5"
            >
              <div
                className="text-[28px] leading-none font-bold text-down"
                style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
              >
                {num}
              </div>
              <h3 className="text-lg font-semibold m-0">{title}</h3>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none">
                {items.map((item) => (
                  <li key={item} className="pl-5 relative text-sm leading-relaxed text-sub">
                    <span className="absolute left-0 font-bold text-down">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

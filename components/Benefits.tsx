'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const FOUNDER_BENEFITS = [
  { title: 'Direct access to 500+ verified funds', body: 'No warm intro required. Your verified data is the introduction.' },
  { title: 'Speed: 14-day average to first term sheet', body: 'Live metrics eliminate the back-and-forth of manual DD requests.' },
  { title: 'Structured feedback — guaranteed', body: 'Every VC must respond with a Pass reason or Continue. Zero ghosting by design.' },
  { title: "VDR analytics — know who's serious", body: 'See which fund partners read which slides and for how long.' },
  { title: 'Free until you close', body: 'Zero platform cost before a round closes. We win when you win.' },
]

const VC_BENEFITS = [
  { title: 'Pre-vetted, verified deal flow only', body: 'Every company passes identity, entity, and traction verification before you see them.' },
  { title: 'Real-time metrics — direct from source', body: 'MRR, NRR, burn multiple, and cohort retention pulled live from Stripe and QuickBooks.' },
  { title: 'Thesis-matched deal flow', body: 'Nine-signal AI engine surfaces only deals matching your sector, stage, and check size.' },
  { title: 'Portfolio conflict guard', body: 'Automatic detection of competitive overlaps before you engage — protecting time and reputation.' },
  { title: '90% reduction in DD time', body: '12 weeks compressed to 3. Verified data rooms replace months of manual diligence requests.' },
]

interface BenefitItemProps {
  title: string
  body: string
  variant: 'green' | 'blue'
}

function BenefitItem({ title, body, variant }: BenefitItemProps) {
  const isGreen = variant === 'green'
  return (
    <li className="benefit-item flex gap-3.5 items-start">
      <span
        className={[
          'flex-none w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold mt-0.5 border',
          isGreen
            ? 'bg-accent/12 border-accent/25 text-accent'
            : 'bg-accent-2/12 border-accent-2/25 text-accent-2',
        ].join(' ')}
        aria-hidden="true"
      >
        →
      </span>
      <div className="flex flex-col gap-0.5">
        <strong className="text-sm font-semibold">{title}</strong>
        <p className="m-0 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </li>
  )
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const founderColRef = useRef<HTMLDivElement>(null)
  const vcColRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!founderColRef.current || !vcColRef.current || !gridRef.current) return

    gsap.set(founderColRef.current, { opacity: 0, x: -40 })
    gsap.set(vcColRef.current, { opacity: 0, x: 40 })

    const founderItems = Array.from(
      founderColRef.current.querySelectorAll<HTMLElement>('.benefit-item')
    )
    const vcItems = Array.from(
      vcColRef.current.querySelectorAll<HTMLElement>('.benefit-item')
    )
    gsap.set([...founderItems, ...vcItems], { opacity: 0, y: 16 })

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(founderColRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
        gsap.to(vcColRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
        gsap.to(founderItems, {
          opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.25,
        })
        gsap.to(vcItems, {
          opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35,
        })
      },
    })
  })

  return (
    <section ref={sectionRef} id="benefits" className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="max-w-[720px] mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
            Built for both sides of the table
          </span>
          <RevealText
            text="One platform. Two unfair advantages."
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="text-[17px] text-sub m-0 mt-4">
            We didn&apos;t bolt a VC dashboard onto a founder tool. VeloCity was architected from
            day one to serve both sides with equal precision.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {/* Founders Column */}
          <div
            ref={founderColRef}
            className="p-8 rounded-2xl border border-accent/20 flex flex-col gap-6"
            style={{ background: 'linear-gradient(180deg, rgba(62,189,147,0.06), #FFFFFF)' }}
          >
            <div className="flex flex-col gap-2.5">
              <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-accent/25 bg-accent/8 text-accent w-fit">
                For Founders
              </span>
              <h3 className="text-[22px] font-bold tracking-tight m-0">Raise on merit, not connections.</h3>
            </div>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {FOUNDER_BENEFITS.map((b) => (
                <BenefitItem key={b.title} {...b} variant="green" />
              ))}
            </ul>
            <button
              onClick={() => scrollTo('#waitlist')}
              className="mt-2 w-full py-3 rounded-xl text-sm font-semibold border border-line-2 text-txt hover:border-muted bg-transparent transition-all duration-150 cursor-pointer"
            >
              Join as Founder →
            </button>
          </div>

          {/* VCs Column */}
          <div
            ref={vcColRef}
            className="p-8 rounded-2xl border border-accent-2/20 flex flex-col gap-6"
            style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.05), #FFFFFF)' }}
          >
            <div className="flex flex-col gap-2.5">
              <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-accent-2/25 bg-accent-2/8 text-accent-2 w-fit">
                For VCs &amp; Angels
              </span>
              <h3 className="text-[22px] font-bold tracking-tight m-0">Source signal, not noise.</h3>
            </div>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {VC_BENEFITS.map((b) => (
                <BenefitItem key={b.title} {...b} variant="blue" />
              ))}
            </ul>
            <button
              onClick={() => scrollTo('#waitlist')}
              className="mt-2 w-full py-3 rounded-xl text-sm font-semibold border border-line-2 text-txt hover:border-muted bg-transparent transition-all duration-150 cursor-pointer"
            >
              Request fund access →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'

const LAYERS = [
  { tag: 'Layer 1', title: 'Identity', body: 'Persona + Middesk. Passport liveness, entity & UBO checks.' },
  { tag: 'Layer 2', title: 'Proof of Funds', body: 'SEC IAPD pull, fund admin attestations, accredited verification, Plaid balance snapshot ≥ 3× check size.' },
  { tag: 'Layer 3', title: 'Verified Traction', body: 'OAuth-only reads from Stripe / QBO / GA4 / Shopify. Tamper-proof snapshots.' },
  { tag: 'Layer 4', title: 'Legal Primitives', body: 'Click-wrap NDAs, watermarked VDR, GDPR + CCPA, SOC 2 Type II (Q3).' },
]

const SECURITY_BADGES = [
  { icon: '🔒', label: 'SOC 2 Type II', sub: 'Q3 2026' },
  { icon: '🛡️', label: 'AES-256', sub: 'Encrypted' },
  { icon: '🔑', label: 'Read-only OAuth', sub: 'Zero write scopes' },
  { icon: '🌍', label: 'GDPR', sub: 'Compliant' },
  { icon: '🔍', label: 'ISO 27001', sub: 'In progress' },
]

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!headingRef.current || !layersRef.current || !badgesRef.current) return

    gsap.set(headingRef.current, { opacity: 0, x: -40 })

    const layers = Array.from(layersRef.current.querySelectorAll<HTMLElement>('.layer-row'))
    gsap.set(layers, { opacity: 0, x: 40 })

    const badges = Array.from(badgesRef.current.querySelectorAll<HTMLElement>('.security-badge'))
    gsap.set(badges, { opacity: 0, y: 20, scale: 0.9 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(headingRef.current, {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        })
        gsap.to(layers, {
          opacity: 1, x: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1, delay: 0.1,
        })
        gsap.to(badges, {
          opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.08, delay: 0.4,
        })
      },
    })
  })

  return (
    <section ref={sectionRef} id="trust" className="py-[110px] border-t border-b border-line bg-bg-2">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">

          <div ref={headingRef}>
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent">
              Trust &amp; verification
            </span>
            <RevealText
              text="A four-layer verification stack."
              className="font-bold mb-4 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
            />
            <p className="text-[17px] text-sub m-0 mt-4">
              The only fundraising platform where every party is cryptographically verified before a
              single message is sent.
            </p>
          </div>

          <div ref={layersRef} className="flex flex-col gap-2.5">
            {LAYERS.map(({ tag, title, body }) => (
              <div
                key={tag}
                className="layer-row flex gap-4 px-4 py-4 rounded-xl border border-line bg-panel"
              >
                <div className="flex-none text-xs tracking-[0.12em] uppercase font-semibold pt-0.5 w-[70px] text-accent">
                  {tag}
                </div>
                <div className="text-dim">
                  <strong className="text-txt">{title}</strong> — {body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security badge strip */}
        <div className="mt-12 pt-8 border-t border-line">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-muted mb-4">
            Security &amp; compliance
          </p>
          <div ref={badgesRef} className="flex flex-wrap gap-2.5">
            {SECURITY_BADGES.map(({ icon, label, sub }) => (
              <div
                key={label}
                className="security-badge flex items-center gap-2 px-3 py-2 rounded-lg border border-line-2 bg-panel"
              >
                <span className="text-sm" aria-hidden="true">{icon}</span>
                <span className="text-xs font-semibold text-txt">{label}</span>
                <span className="text-xs text-muted hidden sm:block">· {sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

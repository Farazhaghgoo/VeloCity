'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const glow1Ref = useRef<HTMLDivElement>(null)
  const glow2Ref = useRef<HTMLDivElement>(null)

  function scrollToWaitlist() {
    document.querySelector('#hero-waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true }

    if (glow1Ref.current && glow2Ref.current && sectionRef.current) {
      gsap.to(glow1Ref.current, {
        x: -30,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      })
      gsap.to(glow2Ref.current, {
        x: 30,
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('[data-word]')
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: { ...trigger },
      })
    }

    gsap.from([subRef.current, btnRef.current], {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.3,
      scrollTrigger: trigger,
    })
  }, { scope: sectionRef })

  const headingWords = 'Stop waiting for warm intros.'.split(' ')

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="py-[110px] border-t border-b border-line text-center relative overflow-hidden"
      style={{
        background: '#F0F4F8',
      }}
    >
      {/* Animated dual glow blobs */}
      <div
        ref={glow1Ref}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          left: '15%',
          top: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(closest-side, rgba(62,189,147,0.13), transparent)',
        }}
      />
      <div
        ref={glow2Ref}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          right: '10%',
          bottom: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(closest-side, rgba(37,99,235,0.09), transparent)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(36,59,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(36,59,83,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="max-w-[680px] mx-auto px-7 relative">
        {/* Word-split heading */}
        <div
          ref={headingRef}
          className="font-bold mb-3 text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.02em] text-txt"
          style={{ fontFamily: 'var(--font-plus-jakarta, var(--font-inter))' }}
          aria-label="Stop waiting for warm intros."
        >
          {headingWords.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                lineHeight: '1.2em',
                marginRight: '0.28em',
                verticalAlign: 'bottom',
              }}
            >
              <span data-word="" style={{ display: 'inline-block' }}>
                {word}
              </span>
            </span>
          ))}
        </div>

        <p ref={subRef} className="mb-8 text-sub text-[17px]">
          50 verified funds. 500 qualified founders. Your metrics are the introduction.
        </p>

        <div ref={btnRef} className="flex flex-col items-center gap-3">
          <button
            onClick={scrollToWaitlist}
            className="px-8 py-4 rounded-xl text-base font-semibold bg-accent text-[#243B53] hover:bg-[#34a97d] transition-all duration-200 cursor-pointer border-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(62,189,147,0.4)]"
            style={{ boxShadow: '0 4px 24px rgba(62,189,147,0.30)' }}
          >
            Request early access →
          </button>
          <span className="text-sm text-muted">No credit card. No commitment. London &amp; Singapore first.</span>
        </div>
      </div>
    </section>
  )
}

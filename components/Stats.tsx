'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface StatConfig {
  display: string
  label: string
  animate: boolean
  from: number
  to: number
  suffix: string
}

const STATS: StatConfig[] = [
  { display: '12→3', label: 'weeks of DD compressed', animate: false, from: 0, to: 0, suffix: '' },
  { display: '100%', label: 'verified revenue data', animate: true, from: 0, to: 100, suffix: '%' },
  { display: '0', label: 'warm intros required', animate: false, from: 0, to: 0, suffix: '' },
  { display: '87%', label: 'average response rate', animate: true, from: 0, to: 87, suffix: '%' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLDivElement | null)[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (glowRef.current && sectionRef.current) {
      gsap.to(glowRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    STATS.forEach((stat, i) => {
      if (!stat.animate) return
      const el = counterRefs.current[i]
      if (!el) return

      const obj = { val: stat.from }

      gsap.to(obj, {
        val: stat.to,
        duration: 2,
        ease: 'power2.out',
        onStart: () => {
          el.textContent = stat.from + stat.suffix
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + stat.suffix
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-b border-line bg-panel relative overflow-hidden glow-line-top">
      {/* Parallax radial glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 120% at 50% 0%, rgba(62,189,147,0.07), transparent)',
        }}
      />

      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 relative"
      >
        {STATS.map(({ display, label, animate }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <div
              ref={(el) => { counterRefs.current[i] = el }}
              className="text-[40px] font-bold mb-1.5 text-accent tracking-[-0.03em] leading-none"
              style={{
                fontFamily: 'var(--font-plus-jakarta, var(--font-inter))',
                textShadow: animate ? '0 0 24px rgba(62,189,147,0.20)' : 'none',
              }}
            >
              {display}
            </div>
            <div className="text-sm text-sub">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

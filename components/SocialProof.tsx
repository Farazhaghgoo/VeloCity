'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PRESS = ['TECHCRUNCH', 'FINANCIAL TIMES', 'SIFTED', 'BLOOMBERG', 'THE INFORMATION']
const FIRMS = ['SEQUOIA', 'INDEX', 'ACCEL', 'BALDERTON', 'ATOMICO', 'NORTHZONE']

const PRESS_LOOP = [...PRESS, ...PRESS]
const FIRMS_LOOP = [...FIRMS, ...FIRMS]

const TESTIMONIALS = [
  {
    quote: '"The first platform that structurally fixes the founder feedback problem. Our response rate went from 40% to 100% — not by choice, by design."',
    author: 'Partner, Top-5 European VC',
    location: 'London',
  },
  {
    quote: '"I raised my seed in 11 days from three investors I could never have cold-emailed. VeloCity is the warm intro for founders without the network."',
    author: 'B2B SaaS Founder',
    location: 'Singapore · $2.4M seed',
  },
  {
    quote: '"Verified Stripe data removed six weeks of back-and-forth. First match to term sheet in 18 days. That\'s never happened for us before."',
    author: 'Principal, Growth Fund',
    location: '$400M AUM',
  },
]

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const pressTrack = useRef<HTMLDivElement>(null)
  const firmsTrack = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (pressTrack.current) {
      gsap.to(pressTrack.current, {
        x: '-50%',
        duration: 22,
        repeat: -1,
        ease: 'none',
      })
    }
    if (firmsTrack.current) {
      gsap.to(firmsTrack.current, {
        x: '-50%',
        duration: 18,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <section id="social-proof" className="py-[110px]">
      <div className="max-w-[1200px] mx-auto px-7">

        {/* Section header */}
        <div ref={ref} className="text-center mb-14 max-w-[720px] mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3.5 text-accent"
          >
            As featured in
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-bold mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em]"
          >
            Trusted by the people who define deal flow.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-[17px] text-sub m-0"
          >
            Early access partners from the funds that set the market standard.
          </motion.p>
        </div>

        {/* Press marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-hidden mb-14"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        >
          <div ref={pressTrack} className="flex gap-14 w-max">
            {PRESS_LOOP.map((name, i) => (
              <span key={`${name}-${i}`} className="text-xs font-bold tracking-[0.2em] text-faint whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {TESTIMONIALS.map(({ quote, author, location }, i) => (
            <motion.blockquote
              key={author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
              className="m-0 p-6 rounded-2xl border border-line bg-panel flex flex-col gap-3.5"
              whileHover={{ borderColor: 'var(--color-line-2)', y: -2, transition: { duration: 0.2 } }}
            >
              <p className="m-0 text-[15px] italic leading-[1.65] text-dim">{quote}</p>
              <cite className="not-italic text-xs text-muted">
                <strong className="block mb-0.5 text-txt">{author}</strong>
                {location}
              </cite>
            </motion.blockquote>
          ))}
        </div>

        {/* VC firm logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs text-muted">Partners from</span>
          <div
            className="overflow-hidden w-full"
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
          >
            <div ref={firmsTrack} className="flex gap-12 w-max">
              {FIRMS_LOOP.map((name, i) => (
                <span key={`${name}-${i}`} className="text-xs font-semibold tracking-[0.22em] text-ghost whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

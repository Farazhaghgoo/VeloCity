'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealTextProps {
  text?: string
  children?: ReactNode
  className?: string
  delay?: number
  distance?: number
}

export default function RevealText({ text = '', className = '', delay = 0, distance = 110 }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll<HTMLElement>('[data-word]')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: distance,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.045,
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [delay, distance])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
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
  )
}

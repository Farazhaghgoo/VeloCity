'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'For founders / VCs', href: '#benefits' },
  { label: 'Trust', href: '#trust' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b border-line transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(240,244,248,0.95)' : 'rgba(240,244,248,0.80)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled
            ? '0 1px 0 0 #D1DCE8, 0 4px 20px rgba(36,59,83,0.06)'
            : '0 1px 0 0 #D1DCE8',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-[15px] text-txt">
            <span
              className="w-[22px] h-[22px] rounded-md flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #243B53, #3EBD93)',
                boxShadow: '0 0 14px rgba(62,189,147,0.25)',
              }}
            >
              VC
            </span>
            <span><span className="text-accent">V</span>elo<span className="text-accent">C</span>ity</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="relative text-sm text-muted hover:text-txt transition-colors duration-150 cursor-pointer bg-transparent border-0 p-0 group"
              >
                <span className="relative">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-250" />
                </span>
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollTo('#waitlist')}
              className="hidden sm:flex items-center justify-center px-4 py-2.5 rounded-[10px] text-sm font-semibold border border-line-2 text-txt hover:border-accent/50 bg-transparent transition-all duration-150 cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => scrollTo('#waitlist')}
              className="hidden sm:flex items-center justify-center px-4 py-2.5 rounded-[10px] text-sm font-semibold bg-accent text-[#243B53] border border-accent hover:bg-[#34a97d] hover:border-[#34a97d] transition-all duration-150 cursor-pointer"
            >
              Request access
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg border border-line bg-transparent cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-5 h-[1.5px] bg-txt rounded-full mx-auto" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} className="block w-5 h-[1.5px] bg-txt rounded-full mx-auto" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-5 h-[1.5px] bg-txt rounded-full mx-auto" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[68px] inset-x-0 z-40 border-b border-line"
            style={{ background: 'rgba(240,244,248,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <nav className="max-w-[1200px] mx-auto px-7 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                  onClick={() => { scrollTo(href); setMenuOpen(false) }}
                  className="w-full text-left px-3 py-3.5 rounded-xl text-[15px] font-medium text-sub hover:text-txt hover:bg-bg-2 transition-colors duration-150 cursor-pointer bg-transparent border-0"
                >
                  {label}
                </motion.button>
              ))}
              <div className="flex gap-2.5 mt-4 pt-4 border-t border-line">
                <button onClick={() => { scrollTo('#waitlist'); setMenuOpen(false) }} className="flex-1 py-3 rounded-xl text-sm font-semibold border border-line-2 text-txt hover:border-accent/50 bg-transparent transition-all duration-150 cursor-pointer">Sign in</button>
                <button onClick={() => { scrollTo('#waitlist'); setMenuOpen(false) }} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-accent text-[#243B53] border border-accent hover:bg-[#34a97d] transition-all duration-150 cursor-pointer">Request access</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

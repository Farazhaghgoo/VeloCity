'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState('Initializing connection...')

  useEffect(() => {
    const duration = 1600
    const intervalTime = 40
    const steps = duration / intervalTime

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (newProgress > 20 && newProgress < 50) setStep('Verifying OAuth data...')
      if (newProgress >= 50 && newProgress < 85) setStep('Running match engine...')
      if (newProgress >= 85) setStep('Deal flow secured.')

      if (currentStep >= steps) {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 300)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-bg-2"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(36,59,83,0.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 100%)',
            }}
          />

          <div className="flex flex-col items-center gap-6 relative z-10 w-[280px]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[13px] font-bold text-white tracking-widest relative"
              style={{
                background: 'linear-gradient(135deg, #243B53, #3EBD93)',
                boxShadow: '0 0 30px rgba(62,189,147,0.4)',
              }}
            >
              VC
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-4px] rounded-[14px] border border-dashed border-accent/40"
              />
            </motion.div>

            <div className="w-full">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.1em]">
                  {step}
                </span>
                <span className="text-xs font-bold text-accent tabular-nums">
                  {progress}%
                </span>
              </div>
              <div className="h-[3px] w-full bg-line rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { CountdownTimer } from './CountdownTimer'

type HeroProps = {
  onBookClick: () => void
  onPackagesClick: () => void
}

function FloatingAnimal({
  className,
  delay,
  children,
}: {
  className: string
  delay: number
  children: ReactNode
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none opacity-[0.04] ${className}`}
      animate={{ y: [0, -18, 0], opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export function Hero({ onBookClick, onPackagesClick }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 islamic-pattern">
      <div className="absolute inset-0 bg-bg/90" />

      <FloatingAnimal className="left-[8%] top-[20%] w-24 h-24" delay={0}>
        <svg viewBox="0 0 80 80" fill="currentColor" className="text-gold w-full h-full">
          <ellipse cx="40" cy="50" rx="28" ry="18" />
          <circle cx="58" cy="32" r="10" />
          <path d="M20 50 Q10 35 18 25" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </FloatingAnimal>
      <FloatingAnimal className="right-[10%] top-[30%] w-32 h-32" delay={2}>
        <svg viewBox="0 0 100 80" fill="currentColor" className="text-gold w-full h-full">
          <rect x="15" y="35" width="55" height="30" rx="8" />
          <circle cx="72" cy="28" r="14" />
          <rect x="5" y="50" width="12" height="25" rx="3" />
          <rect x="68" y="50" width="12" height="25" rx="3" />
        </svg>
      </FloatingAnimal>
      <FloatingAnimal className="left-[15%] bottom-[18%] w-20 h-20" delay={1}>
        <svg viewBox="0 0 70 70" fill="currentColor" className="text-gold w-full h-full">
          <ellipse cx="35" cy="42" rx="22" ry="16" />
          <circle cx="48" cy="26" r="8" />
        </svg>
      </FloatingAnimal>
      <FloatingAnimal className="right-[18%] bottom-[22%] w-28 h-28" delay={3}>
        <svg viewBox="0 0 90 70" fill="currentColor" className="text-gold w-full h-full">
          <ellipse cx="45" cy="45" rx="30" ry="20" />
          <path d="M75 35 L90 25 L88 40 Z" />
          <circle cx="62" cy="22" r="9" />
        </svg>
      </FloatingAnimal>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold"
        >
          Eid Ul Adha 2026 · Pakistan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Book Your Kasai
          <br />
          <span className="text-gold">Before Eid</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 text-xl text-muted sm:text-2xl"
          dir="rtl"
        >
          گھر بیٹھے قربانی کا انتظام کریں
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          Verified, On-Time, Fixed Price — No Last Minute Stress
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10 w-full"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={onBookClick}
            className="rounded-full bg-gold px-8 py-4 text-base font-bold text-bg transition-all hover:bg-gold-light hover:shadow-lg gold-glow"
          >
            Book Your Kasai
          </button>
          <button
            type="button"
            onClick={onPackagesClick}
            className="rounded-full border border-border px-8 py-4 text-base font-semibold text-text transition-all hover:border-gold/50 hover:text-gold"
          >
            View Packages
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-8 text-xs text-muted"
        >
          Whole animal bookings only — no Hissa / share-based Qurbani
        </motion.p>
      </div>
    </section>
  )
}

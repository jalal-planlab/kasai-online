import { motion } from 'framer-motion'
import { CountdownTimer } from './CountdownTimer'
import { HeroBackground } from './hero/HeroBackground'

type HeroProps = {
  onBookClick: () => void
  onPackagesClick: () => void
}

const headlineWords = ['Book', 'Your', 'Kasai']

export function Hero({ onBookClick, onPackagesClick }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 islamic-pattern">
      <HeroBackground />
      <div className="absolute inset-0 bg-linear-to-b from-bg/40 via-bg/55 to-bg/80" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" aria-hidden>
            <path
              fill="currentColor"
              d="M14 4a6 6 0 1 0 0 12 5 5 0 0 1 0-10 4 4 0 1 1 0-8z"
            />
            <circle cx="17" cy="7" r="1.5" fill="currentColor" className="hero-star-twinkle" />
          </svg>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Eid Ul Adha 2026 · Pakistan
          </p>
        </motion.div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i < headlineWords.length - 1 ? '\u00a0' : ''}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block text-gold"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Before Eid
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl text-muted sm:text-2xl"
          dir="rtl"
        >
          گھر بیٹھے قربانی کا انتظام کریں
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58 }}
          className="mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          Verified, On-Time, Fixed Price — No Last Minute Stress
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 w-full"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted"
        >
          <span>🐐 Bakra</span>
          <span className="text-border">·</span>
          <span>🐑 Dumba</span>
          <span className="text-border">·</span>
          <span>🐄 Bachra</span>
          <span className="text-border">·</span>
          <span>🐪 Oont</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-3 text-xs text-muted"
        >
          Whole animal bookings only — no Hissa / share-based Qurbani
        </motion.p>
      </div>
    </section>
  )
}

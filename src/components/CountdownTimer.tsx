import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'

type UnitProps = {
  label: string
  value: number
}

function CountdownUnit({ label, value }: UnitProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-5 sm:px-6 sm:py-6 min-w-[72px] sm:min-w-[88px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl font-bold tabular-nums text-gold"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  )
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds, isPast } = useCountdown()

  if (isPast) {
    return (
      <p className="text-lg font-semibold text-gold">Eid Mubarak! 🌙</p>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      <CountdownUnit label="Days" value={days} />
      <CountdownUnit label="Hours" value={hours} />
      <CountdownUnit label="Minutes" value={minutes} />
      <CountdownUnit label="Seconds" value={seconds} />
    </div>
  )
}

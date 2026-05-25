import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

type SuccessModalProps = {
  open: boolean
  reference: string
  onClose: () => void
}

export function SuccessModal({ open, reference, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 p-5 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl gold-glow"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:text-text"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20"
            >
              <Check className="h-10 w-10 text-success" strokeWidth={2.5} />
            </motion.div>

            <h2 className="mt-6 text-2xl font-bold">Booking Confirmed!</h2>
            <p className="mt-2 text-lg text-gold">Jazak Allah Khair 🌙</p>

            <p className="mt-6 text-sm text-muted">Your booking reference</p>
            <p className="mt-1 font-mono text-3xl font-bold tracking-widest text-gold">
              #{reference}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              We will call you within 2 hours to confirm your Kasai
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

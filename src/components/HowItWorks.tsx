import { motion } from 'framer-motion'
import { AnimatedSection } from '../lib/animations'
import { staggerContainer, staggerItem } from '../lib/constants'

const steps = [
  {
    number: '01',
    emoji: '🐐',
    titleUrdu: 'Animal Chunein',
    subtitle: 'Select your animal type and preferred date/time',
  },
  {
    number: '02',
    emoji: '📋',
    titleUrdu: 'Details Bharein',
    subtitle: 'Fill in your address and contact info',
  },
  {
    number: '03',
    emoji: '🔪',
    titleUrdu: 'Kasai Aayega',
    subtitle: 'Verified Kasai arrives at your doorstep on time',
  },
]

export function HowItWorks() {
  return (
    <AnimatedSection id="how-it-works" className="px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Itna Aasan Hai
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">It&apos;s This Simple</h2>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {steps.map((step) => (
            <motion.article
              key={step.number}
              variants={staggerItem}
              className="group rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/30"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" role="img" aria-hidden>
                  {step.emoji}
                </span>
                <span className="text-sm font-bold text-gold/60">{step.number}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{step.titleUrdu}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.subtitle}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

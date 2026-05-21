import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { AnimatedSection } from '../lib/animations'
import { ANIMALS, staggerContainer, staggerItem } from '../lib/constants'
import type { AnimalType } from '../lib/constants'

type AnimalPackagesProps = {
  onSelectAnimal: (animal: AnimalType) => void
}

export function AnimalPackages({ onSelectAnimal }: AnimalPackagesProps) {
  return (
    <AnimatedSection id="packages" className="px-5 py-24 lg:py-32 bg-surface/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold" dir="rtl">
            Apna Janwar Chunein
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Choose Your Animal</h2>
          <p className="mt-4 text-sm text-muted">
            Starting prices are indicative — final quote confirmed on call
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {ANIMALS.map((animal) => (
            <motion.article
              key={animal.id}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:border-gold/40 hover:gold-glow"
            >
              {animal.tag && (
                <span className="absolute -top-3 right-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-bg">
                  {animal.tag}
                </span>
              )}
              <span className="text-5xl" role="img" aria-hidden>
                {animal.emoji}
              </span>
              <h3 className="mt-4 text-lg font-bold">{animal.name}</h3>
              <p className="text-sm text-gold" dir="rtl">
                {animal.nameUrdu}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {animal.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Clock className="h-4 w-4 text-gold" />
                <span>{animal.time}</span>
              </div>
              <p className="mt-3 text-sm text-muted">
                Starting from{' '}
                <span className="text-lg font-bold text-gold">{animal.price}</span>
              </p>
              <button
                type="button"
                onClick={() => onSelectAnimal(animal.id)}
                className="mt-6 w-full rounded-xl border border-gold/60 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-bg"
              >
                Select & Book
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

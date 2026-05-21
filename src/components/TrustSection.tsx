import { motion } from 'framer-motion'
import { BadgeCheck, Clock, Sparkles, Wallet } from 'lucide-react'
import { AnimatedSection } from '../lib/animations'
import { staggerContainer, staggerItem } from '../lib/constants'

const trustItems = [
  {
    icon: BadgeCheck,
    title: 'Verified Kasai',
    description: 'All kasais are ID verified and background checked',
  },
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: 'We show up in your confirmed time slot, always',
  },
  {
    icon: Wallet,
    title: 'Fixed Pricing',
    description: 'No surprise charges after the job. Price fixed upfront',
  },
  {
    icon: Sparkles,
    title: 'Clean & Hygienic',
    description: 'Full cleanup after Qurbani. We leave no mess behind',
  },
]

export function TrustSection() {
  return (
    <AnimatedSection className="px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Kyun Hum?
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Why Choose KasaiOnCall</h2>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {trustItems.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <item.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

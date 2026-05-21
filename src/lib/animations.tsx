import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { sectionVariants } from './constants'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function AnimatedSection({ id, className = '', children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  )
}

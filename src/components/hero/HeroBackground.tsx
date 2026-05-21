import { motion } from 'framer-motion'
import type { ImgHTMLAttributes, ReactNode } from 'react'
import { HERO_ANIMALS, HERO_ANIMAL_SIZE, type HeroAnimalSize } from '../../lib/heroAssets'

type AnimalImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  name: string
  size?: HeroAnimalSize
}

function AnimalImage({ src, name, size = 'medium', className = '', ...props }: AnimalImageProps) {
  return (
    <span className={`hero-animal-slot shrink-0 ${HERO_ANIMAL_SIZE[size]}`}>
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className={`hero-animal-media ${className}`}
        data-animal={name}
        {...props}
      />
    </span>
  )
}

function CrescentStar() {
  return (
    <motion.div
      className="absolute left-1/2 top-[12%] -translate-x-1/2 text-gold hero-crescent-glow sm:top-[10%]"
      animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 120 120" className="h-20 w-20 opacity-25 sm:h-28 sm:w-28" aria-hidden>
        <defs>
          <radialGradient id="hero-moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0c040" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="55" fill="url(#hero-moon-glow)" />
        <path
          fill="currentColor"
          d="M72 20a44 44 0 1 0 0 80 36 36 0 1 1 0-80z"
        />
        <polygon
          fill="currentColor"
          points="88,28 96,44 114,46 100,58 104,76 88,66 72,76 76,58 62,46 80,44"
          className="hero-star-twinkle"
        />
      </svg>
    </motion.div>
  )
}

function Lantern({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none text-gold ${className}`}
      style={{ transformOrigin: 'top center' }}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 4 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg viewBox="0 0 40 64" className="h-14 w-9 opacity-20 sm:h-16 sm:w-10" aria-hidden>
        <line x1="20" y1="0" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14 H32 L28 52 H12 Z" fill="currentColor" opacity="0.85" />
        <rect x="14" y="52" width="12" height="4" rx="1" fill="currentColor" />
        <motion.ellipse
          cx="20"
          cy="34"
          rx="6"
          ry="8"
          fill="#f0c040"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        />
      </svg>
    </motion.div>
  )
}

function FloatingStar({ className, delay, size }: { className: string; delay: number; size: number }) {
  return (
    <motion.span
      className={`absolute block rounded-full bg-gold ${className}`}
      style={{ width: size, height: size }}
      animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
      transition={{ duration: 2.5 + delay, repeat: Infinity, delay }}
      aria-hidden
    />
  )
}

function BackgroundAnimal({
  className,
  delay,
  duration,
  drift,
  prominent,
  children,
  label,
}: {
  className: string
  delay: number
  duration: number
  drift?: number
  prominent?: boolean
  children: ReactNode
  label: string
}) {
  const opacity = prominent ? [0.5, 0.65, 0.5] : [0.38, 0.52, 0.38]

  return (
    <motion.div
      className={`hero-animal-glow absolute pointer-events-none text-gold-light ${className}`}
      aria-hidden
      title={label}
      animate={{
        y: [0, -14, 0],
        x: drift ? [0, drift, 0] : 0,
        opacity,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

function WalkingAnimal({
  className,
  duration,
  children,
}: {
  className: string
  duration: number
  children: ReactNode
}) {
  return (
    <motion.div
      className={`hero-animal-glow absolute bottom-[8%] text-gold-light sm:bottom-[10%] ${className}`}
      aria-hidden
      initial={{ x: '-20%', opacity: 0.42 }}
      animate={{ x: '120vw', opacity: 0.42 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

const STARS = [
  { className: 'left-[12%] top-[18%]', delay: 0, size: 3 },
  { className: 'right-[14%] top-[22%]', delay: 0.8, size: 2 },
  { className: 'left-[22%] top-[8%]', delay: 1.2, size: 2 },
  { className: 'right-[28%] top-[14%]', delay: 0.4, size: 3 },
  { className: 'left-[8%] top-[42%]', delay: 1.6, size: 2 },
  { className: 'right-[8%] top-[38%]', delay: 2, size: 3 },
  { className: 'left-[35%] top-[6%]', delay: 0.6, size: 2 },
  { className: 'right-[40%] top-[32%]', delay: 1.4, size: 2 },
]

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-linear-to-b from-gold/8 via-transparent to-bg/95" />
      <div className="absolute inset-0 bg-radial-[ellipse_80%_50%_at_50%_0%] from-gold/10 via-transparent to-transparent" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(70vw,400px)] w-[min(70vw,400px)] -translate-x-1/2 -translate-y-1/2 opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full text-gold/15">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 45} 100 100)`}
              d="M100 12 L104 28 L100 44 L96 28 Z"
              fill="currentColor"
              opacity="0.4"
            />
          ))}
        </svg>
      </motion.div>

      <CrescentStar />
      {STARS.map((star) => (
        <FloatingStar key={star.className} {...star} />
      ))}

      <Lantern className="left-[6%] top-[28%] hidden sm:block" delay={0} />
      <Lantern className="right-[6%] top-[32%] hidden sm:block" delay={1.2} />
      <Lantern className="left-[4%] top-[55%] opacity-60 sm:opacity-100" delay={0.6} />
      <Lantern className="right-[4%] top-[52%] opacity-60 sm:opacity-100" delay={1.8} />

      <BackgroundAnimal
        className="left-[2%] top-[52%] sm:left-[4%] sm:top-[50%]"
        delay={0}
        duration={9}
        drift={6}
        prominent
        label="Goat"
      >
        <AnimalImage src={HERO_ANIMALS.goat} name="goat" size="large" />
      </BackgroundAnimal>
      <BackgroundAnimal
        className="right-[2%] top-[42%] sm:right-[5%]"
        delay={1.5}
        duration={10}
        drift={-8}
        prominent
        label="Sheep"
      >
        <AnimalImage src={HERO_ANIMALS.sheep} name="sheep" size="large" />
      </BackgroundAnimal>
      <BackgroundAnimal
        className="left-[0%] top-[26%] sm:left-[2%] sm:top-[22%]"
        delay={2.2}
        duration={11}
        drift={5}
        prominent
        label="Camel"
      >
        <AnimalImage src={HERO_ANIMALS.camel} name="camel" size="large" />
      </BackgroundAnimal>
      <BackgroundAnimal
        className="right-[0%] top-[58%] sm:right-[2%] sm:top-[55%]"
        delay={0.8}
        duration={9.5}
        drift={-6}
        prominent
        label="Cow"
      >
        <AnimalImage src={HERO_ANIMALS.cow} name="cow" size="large" />
      </BackgroundAnimal>
      <BackgroundAnimal
        className="left-[12%] bottom-[18%] sm:left-[14%] sm:bottom-[16%]"
        delay={3}
        duration={8}
        label="Sheep"
      >
        <AnimalImage src={HERO_ANIMALS.sheep} name="sheep" size="small" className="scale-x-[-1]" />
      </BackgroundAnimal>
      <BackgroundAnimal
        className="right-[10%] bottom-[20%] sm:right-[12%] sm:bottom-[18%]"
        delay={1}
        duration={8.5}
        drift={4}
        label="Goat"
      >
        <AnimalImage src={HERO_ANIMALS.goat} name="goat" size="small" className="scale-x-[-1]" />
      </BackgroundAnimal>

      <WalkingAnimal className="sm:block" duration={38}>
        <AnimalImage src={HERO_ANIMALS.goat} name="goat" size="walk" />
      </WalkingAnimal>
      <motion.div
        className="hero-animal-glow absolute bottom-[8%] text-gold-light sm:bottom-[10%]"
        aria-hidden
        initial={{ x: '-25%', opacity: 0.45 }}
        animate={{ x: '120vw', opacity: 0.45 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear', delay: 10 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimalImage src={HERO_ANIMALS.camel} name="camel" size="walk" />
        </motion.div>
      </motion.div>

      <div className="hero-sparkles absolute inset-0" />
    </div>
  )
}

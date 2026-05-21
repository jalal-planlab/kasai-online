import cowImg from '../assets/cow.png'
import sheepImg from '../assets/sheep.png'

/** Hero background animal images. */
export const HERO_ANIMALS = {
  goat: '/hero/goat.png',
  sheep: sheepImg,
  camel: '/hero/camel.png',
  cow: cowImg,
} as const

/** Max display size per placement — keeps animals from filling the hero. */
export const HERO_ANIMAL_SIZE = {
  large: 'h-[5.5rem] w-[6.5rem] sm:h-24 sm:w-28',
  medium: 'h-20 w-24 sm:h-[5.5rem] sm:w-[6.5rem]',
  small: 'h-16 w-20 sm:h-20 sm:w-24',
  walk: 'h-14 w-[4.5rem] sm:h-16 sm:w-24',
} as const

export type HeroAnimalSize = keyof typeof HERO_ANIMAL_SIZE

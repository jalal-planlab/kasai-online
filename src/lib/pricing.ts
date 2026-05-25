import {
  ANIMAL_BY_ID,
  EID_DAYS,
  TIME_SLOTS,
  type AnimalType,
} from './constants'

export type EidDayValue = (typeof EID_DAYS)[number]['value']
export type TimeSlotValue = (typeof TIME_SLOTS)[number]['value']

export const DAY_PRICE_MULTIPLIERS: Record<EidDayValue, number> = {
  '2026-05-27': 1.35,
  '2026-05-28': 1.15,
  '2026-05-29': 1,
}

export const SLOT_PRICE_MULTIPLIERS: Record<TimeSlotValue, number> = {
  early: 1.25,
  morning: 1.2,
  afternoon: 1,
  evening: 0.95,
}

export const MORNING_SLOTS: TimeSlotValue[] = ['early', 'morning']

export type AnimalSelection = { type: AnimalType; count: number }

export type BookingPriceLineItem = {
  type: AnimalType
  name: string
  count: number
  baseUnitPrice: number
  baseSubtotal: number
}

export type BookingPriceBreakdown = {
  lineItems: BookingPriceLineItem[]
  animalsSubtotal: number
  dayMultiplier: number
  dayLabel: string
  daySurcharge: number
  slotMultiplier: number
  slotLabel: string
  slotSurcharge: number
  totalPrice: number
  isComplete: boolean
}

function percentLabel(multiplier: number): string {
  const pct = Math.round((multiplier - 1) * 100)
  if (pct === 0) return 'Standard rate'
  return pct > 0 ? `+${pct}%` : `${pct}%`
}

export function getDayPricing(date: string) {
  const day = EID_DAYS.find((d) => d.value === date)
  const multiplier = DAY_PRICE_MULTIPLIERS[date as EidDayValue] ?? 1
  return {
    multiplier,
    label: day?.sublabel ?? 'Selected day',
    percentLabel: percentLabel(multiplier),
    isPeak: date === '2026-05-27',
  }
}

export function getSlotPricing(slot: string) {
  const timeSlot = TIME_SLOTS.find((s) => s.value === slot)
  const multiplier = SLOT_PRICE_MULTIPLIERS[slot as TimeSlotValue] ?? 1
  const isMorning = MORNING_SLOTS.includes(slot as TimeSlotValue)
  return {
    multiplier,
    label: timeSlot?.label ?? 'Selected slot',
    percentLabel: percentLabel(multiplier),
    isMorning,
  }
}

export function calculateBookingPrice(
  animalSelections: AnimalSelection[],
  preferredDate: string,
  preferredTimeSlot: string,
): BookingPriceBreakdown {
  const lineItems: BookingPriceLineItem[] = animalSelections.map((selection) => {
    const animal = ANIMAL_BY_ID[selection.type]
    const baseSubtotal = animal.priceAmount * selection.count
    return {
      type: selection.type,
      name: animal.name.split(' / ')[0],
      count: selection.count,
      baseUnitPrice: animal.priceAmount,
      baseSubtotal,
    }
  })

  const animalsSubtotal = lineItems.reduce((sum, item) => sum + item.baseSubtotal, 0)
  const hasDate = Boolean(preferredDate)
  const hasSlot = Boolean(preferredTimeSlot)
  const isComplete = hasDate && hasSlot && lineItems.length > 0

  const day = getDayPricing(preferredDate)
  const slot = getSlotPricing(preferredTimeSlot)

  const afterDay = Math.round(animalsSubtotal * day.multiplier)
  const daySurcharge = afterDay - animalsSubtotal

  const totalPrice = isComplete
    ? Math.round(afterDay * slot.multiplier)
    : animalsSubtotal

  const slotSurcharge = isComplete ? totalPrice - afterDay : 0

  return {
    lineItems,
    animalsSubtotal,
    dayMultiplier: day.multiplier,
    dayLabel: day.label,
    daySurcharge: hasDate ? daySurcharge : 0,
    slotMultiplier: slot.multiplier,
    slotLabel: slot.label,
    slotSurcharge: hasSlot && hasDate ? slotSurcharge : 0,
    totalPrice: isComplete ? totalPrice : animalsSubtotal,
    isComplete,
  }
}

export function getSampleUnitPrice(
  basePrice: number,
  date: string,
  slot: string,
): number | null {
  if (!date || !slot) return null
  const day = DAY_PRICE_MULTIPLIERS[date as EidDayValue] ?? 1
  const slotMult = SLOT_PRICE_MULTIPLIERS[slot as TimeSlotValue] ?? 1
  return Math.round(basePrice * day * slotMult)
}

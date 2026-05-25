import { ANIMAL_BY_ID, EID_DAYS, TIME_SLOTS, type AnimalType } from './constants'
import type { BookingPriceBreakdown } from './pricing'

type BookingInput = {
  fullName: string
  phone: string
  city: string
  address: string
  preferredDate: string
  preferredTimeSlot: string
  animalSelections: { type: AnimalType; count: number }[]
  specialInstructions?: string
}

export type SubmitBookingPayload = {
  reference: string
  fullName: string
  phone: string
  city: string
  address: string
  preferredDate: string
  preferredDateLabel: string
  preferredTimeSlot: string
  preferredTimeSlotLabel: string
  animalSelections: {
    type: AnimalType
    name: string
    count: number
    baseUnitPrice: number
    baseSubtotal: number
  }[]
  specialInstructions?: string
  priceBreakdown: {
    animalsSubtotal: number
    dayLabel: string
    daySurcharge: number
    slotLabel: string
    slotSurcharge: number
    totalPrice: number
  }
}

function getBookingApiUrl(): string | undefined {
  const url = import.meta.env.REACT_APP_BASE_URL?.trim()
  return url || undefined
}

export function buildBookingPayload(
  data: BookingInput,
  reference: string,
  priceBreakdown: BookingPriceBreakdown,
): SubmitBookingPayload {
  const day = EID_DAYS.find((d) => d.value === data.preferredDate)
  const slot = TIME_SLOTS.find((s) => s.value === data.preferredTimeSlot)

  return {
    reference,
    fullName: data.fullName,
    phone: data.phone,
    city: data.city,
    address: data.address,
    preferredDate: data.preferredDate,
    preferredDateLabel: day ? `${day.label} (${day.sublabel})` : data.preferredDate,
    preferredTimeSlot: data.preferredTimeSlot,
    preferredTimeSlotLabel: slot
      ? `${slot.label} (${slot.sublabel})`
      : data.preferredTimeSlot,
    animalSelections: priceBreakdown.lineItems.map((item) => ({
      type: item.type,
      name: ANIMAL_BY_ID[item.type].name,
      count: item.count,
      baseUnitPrice: item.baseUnitPrice,
      baseSubtotal: item.baseSubtotal,
    })),
    specialInstructions: data.specialInstructions,
    priceBreakdown: {
      animalsSubtotal: priceBreakdown.animalsSubtotal,
      dayLabel: priceBreakdown.dayLabel,
      daySurcharge: priceBreakdown.daySurcharge,
      slotLabel: priceBreakdown.slotLabel,
      slotSurcharge: priceBreakdown.slotSurcharge,
      totalPrice: priceBreakdown.totalPrice,
    },
  }
}

export async function submitBooking(
  payload: SubmitBookingPayload,
): Promise<{ reference: string }> {
  const apiUrl = getBookingApiUrl()

  if (!apiUrl) {
    throw new Error('Booking API URL is not configured (REACT_APP_BASE_URL).')
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const body = (await response.json().catch(() => ({}))) as {
    error?: string
    message?: string
    reference?: string
  }

  if (!response.ok) {
    throw new Error(body.message ?? body.error ?? 'Booking request failed')
  }

  return { reference: body.reference ?? payload.reference }
}

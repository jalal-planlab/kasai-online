import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatedSection } from '../lib/animations'
import {
  ANIMALS,
  BOOKING_CITY,
  EID_DAYS,
  TIME_SLOTS,
  formatPKR,
  type AnimalType,
} from '../lib/constants'
import { buildBookingPayload, submitBooking } from '../lib/bookingApi'
import { calculateBookingPrice } from '../lib/pricing'
import { useCountdown } from '../hooks/useCountdown'

const phoneRegex = /^03\d{2}-?\d{7}$/

const animalSelectionSchema = z.object({
  type: z.enum(['bakra', 'bachra', 'dumba', 'oont']),
  count: z
    .number({ error: 'Enter count' })
    .min(1, 'Minimum 1')
    .max(10, 'Maximum 10'),
})

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .regex(phoneRegex, 'Use Pakistan format: 03XX-XXXXXXX'),
  city: z.literal(BOOKING_CITY),
  address: z.string().min(10, 'Please enter your full address'),
  animalSelections: z
    .array(animalSelectionSchema)
    .min(1, 'Select at least one animal type'),
  preferredDate: z.enum(['2026-05-27', '2026-05-28', '2026-05-29'], {
    message: 'Please select a date',
  }),
  preferredTimeSlot: z.enum(['early', 'morning', 'afternoon', 'evening'], {
    message: 'Please select a time slot',
  }),
  specialInstructions: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>

type BookingFormProps = {
  selectedAnimal: AnimalType | null
  onSubmitSuccess: (reference: string) => void
}

const inputClass =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20'

const labelClass = 'mb-2 block text-sm font-medium text-text'

function isAnimalSelected(
  selections: BookingFormData['animalSelections'],
  type: AnimalType,
): boolean {
  return selections.some((s) => s.type === type)
}

function getAnimalCount(
  selections: BookingFormData['animalSelections'],
  type: AnimalType,
): number {
  return selections.find((s) => s.type === type)?.count ?? 1
}

export function BookingForm({ selectedAnimal, onSubmitSuccess }: BookingFormProps) {
  const { totalDays, isPast } = useCountdown()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      city: BOOKING_CITY,
      animalSelections: [],
    },
  })

  const animalSelections = watch('animalSelections')
  const preferredDate = watch('preferredDate')
  const preferredTimeSlot = watch('preferredTimeSlot')

  const priceBreakdown = useMemo(
    () =>
      calculateBookingPrice(
        animalSelections,
        preferredDate ?? '',
        preferredTimeSlot ?? '',
      ),
    [animalSelections, preferredDate, preferredTimeSlot],
  )

  const { lineItems, totalPrice, isComplete } = priceBreakdown

  const toggleAnimal = (type: AnimalType, checked: boolean) => {
    const current = watch('animalSelections')
    if (checked) {
      setValue(
        'animalSelections',
        [...current, { type, count: 1 }],
        { shouldValidate: true },
      )
    } else {
      setValue(
        'animalSelections',
        current.filter((s) => s.type !== type),
        { shouldValidate: true },
      )
    }
  }

  const updateAnimalCount = (type: AnimalType, count: number) => {
    const current = watch('animalSelections')
    setValue(
      'animalSelections',
      current.map((s) =>
        s.type === type ? { ...s, count: Number.isNaN(count) ? 1 : count } : s,
      ),
      { shouldValidate: true },
    )
  }

  useEffect(() => {
    if (!selectedAnimal) return
    const current = getValues('animalSelections')
    if (!current.some((s) => s.type === selectedAnimal)) {
      setValue(
        'animalSelections',
        [...current, { type: selectedAnimal, count: 1 }],
        { shouldValidate: true },
      )
    }
  }, [selectedAnimal, setValue, getValues])

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError(null)
    const reference = String(Math.floor(100000 + Math.random() * 900000))
    const payload = buildBookingPayload(data, reference, priceBreakdown)

    try {
      const result = await submitBooking(payload)
      onSubmitSuccess(result.reference)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not submit booking. Please try again.'
      setSubmitError(message)
      console.error('Booking submission failed:', err)
    }
  }

  const daysLabel = isPast
    ? 'Eid has arrived'
    : `Eid is in ${totalDays} day${totalDays === 1 ? '' : 's'}`

  return (
    <AnimatedSection id="book" className="px-5 py-24 lg:py-32 bg-surface/50">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold" dir="rtl">
            ابھی Book Karein
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Book Your Slot Now</h2>
          <p className="mt-4 text-sm text-muted">
            Limited slots available — {daysLabel}
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-3xl border border-border bg-card p-6 sm:p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id="fullName"
              {...register('fullName')}
              className={inputClass}
              placeholder="Ahmed Khan"
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-gold">*</span>
            </label>
            <input
              id="phone"
              {...register('phone')}
              className={inputClass}
              placeholder="03XX-XXXXXXX"
              type="tel"
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              type="text"
              readOnly
              value={BOOKING_CITY}
              className={`${inputClass} cursor-default bg-surface/80 text-muted`}
            />
            <input type="hidden" {...register('city')} value={BOOKING_CITY} />
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Full Address / Gali Mohalla <span className="text-gold">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              {...register('address')}
              className={`${inputClass} resize-none`}
              placeholder="House #, Street, Area, Landmark..."
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-400">{errors.address.message}</p>
            )}
          </div>

          <fieldset>
            <legend className={labelClass}>
              Animal Types <span className="text-gold">*</span>
            </legend>
            <p className="mb-3 text-xs text-muted">
              Select one or more — enter count for each selected animal
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ANIMALS.map((animal) => {
                const selected = isAnimalSelected(animalSelections, animal.id)
                return (
                  <div
                    key={animal.id}
                    className={`rounded-xl border p-4 transition-all ${
                      selected
                        ? 'border-gold bg-gold/10 gold-glow'
                        : 'border-border bg-surface'
                    }`}
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) => toggleAnimal(animal.id, e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border accent-gold"
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-2xl">{animal.emoji}</span>
                          <span className="text-sm font-semibold">
                            {animal.name.split(' / ')[0]}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-gold">
                          From {animal.price} (Day 3, afternoon)
                        </span>
                      </span>
                    </label>
                    {selected && (
                      <div className="mt-3 pl-7">
                        <label
                          htmlFor={`count-${animal.id}`}
                          className="mb-1.5 block text-xs font-medium text-muted"
                        >
                          How many?
                        </label>
                        <input
                          id={`count-${animal.id}`}
                          type="number"
                          min={1}
                          max={10}
                          value={getAnimalCount(animalSelections, animal.id)}
                          onChange={(e) =>
                            updateAnimalCount(
                              animal.id,
                              parseInt(e.target.value, 10),
                            )
                          }
                          className={inputClass}
                        />
                        <p className="mt-1 text-xs text-muted">Whole animals only (1–10)</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {errors.animalSelections && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.animalSelections.message}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className={labelClass}>
              Preferred Date <span className="text-gold">*</span>
            </legend>
            <p className="mb-3 text-xs text-muted">
              Eid Day 1 has the highest rates — prices decrease on later days
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {EID_DAYS.map((day) => (
                <label
                  key={day.value}
                  className={`relative flex cursor-pointer flex-col rounded-xl border bg-surface p-4 transition-all has-[:checked]:border-gold has-[:checked]:bg-gold/10 ${
                    'isPeak' in day && day.isPeak
                      ? 'border-gold/40'
                      : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    value={day.value}
                    {...register('preferredDate')}
                    className="sr-only"
                  />
                  {'isPeak' in day && day.isPeak && (
                    <span className="absolute -top-2.5 left-3 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-bg">
                      Peak
                    </span>
                  )}
                  <span className="font-semibold">{day.label}</span>
                  <span className="text-xs text-muted">{day.sublabel}</span>
                  <span className="mt-2 text-xs font-medium text-gold">
                    {day.priceNote}
                  </span>
                </label>
              ))}
            </div>
            {errors.preferredDate && (
              <p className="mt-1.5 text-xs text-red-400">{errors.preferredDate.message}</p>
            )}
          </fieldset>

          <fieldset>
            <legend className={labelClass}>
              Preferred Time Slot <span className="text-gold">*</span>
            </legend>
            <p className="mb-3 text-xs text-muted">
              Morning slots (Early Morning &amp; Morning) carry a premium surcharge
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {TIME_SLOTS.map((slot) => (
                <label
                  key={slot.value}
                  className={`relative flex cursor-pointer flex-col rounded-xl border bg-surface p-4 transition-all has-[:checked]:border-gold has-[:checked]:bg-gold/10 ${
                    'isMorning' in slot && slot.isMorning
                      ? 'border-gold/40'
                      : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    value={slot.value}
                    {...register('preferredTimeSlot')}
                    className="sr-only"
                  />
                  {'isMorning' in slot && slot.isMorning && (
                    <span className="absolute -top-2.5 left-3 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-bg">
                      Premium
                    </span>
                  )}
                  <span className="font-semibold">{slot.label}</span>
                  <span className="text-xs text-muted">{slot.sublabel}</span>
                  <span className="mt-2 text-xs font-medium text-gold">
                    {slot.priceNote}
                  </span>
                </label>
              ))}
            </div>
            {errors.preferredTimeSlot && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.preferredTimeSlot.message}
              </p>
            )}
          </fieldset>

          {lineItems.length > 0 && (
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <h3 className="text-sm font-semibold text-text">Price Breakdown</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {lineItems.map((item) => (
                  <li
                    key={item.type}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>
                      {item.name} × {item.count} @ {formatPKR(item.baseUnitPrice)}
                    </span>
                    <span className="shrink-0 font-medium text-text">
                      {formatPKR(item.baseSubtotal)}
                    </span>
                  </li>
                ))}
              </ul>
              {preferredDate && priceBreakdown.daySurcharge !== 0 && (
                <div className="mt-3 flex items-center justify-between gap-4 border-t border-gold/10 pt-3 text-sm">
                  <span className="text-muted">
                    {priceBreakdown.dayLabel} (
                    {Math.round((priceBreakdown.dayMultiplier - 1) * 100) > 0
                      ? `+${Math.round((priceBreakdown.dayMultiplier - 1) * 100)}%`
                      : 'standard'}
                    )
                  </span>
                  <span className="font-medium text-text">
                    {priceBreakdown.daySurcharge > 0 ? '+' : ''}
                    {formatPKR(priceBreakdown.daySurcharge)}
                  </span>
                </div>
              )}
              {preferredDate && preferredTimeSlot && priceBreakdown.slotSurcharge !== 0 && (
                <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted">
                    {priceBreakdown.slotLabel} (
                    {Math.round((priceBreakdown.slotMultiplier - 1) * 100) > 0
                      ? `+${Math.round((priceBreakdown.slotMultiplier - 1) * 100)}%`
                      : `${Math.round((priceBreakdown.slotMultiplier - 1) * 100)}%`}
                    )
                  </span>
                  <span className="font-medium text-text">
                    {priceBreakdown.slotSurcharge > 0 ? '+' : ''}
                    {formatPKR(priceBreakdown.slotSurcharge)}
                  </span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-gold/20 pt-4">
                <span className="font-semibold text-text">Final Price</span>
                <span className="text-xl font-bold text-gold">
                  {formatPKR(totalPrice)}
                </span>
              </div>
              {!isComplete && (
                <p className="mt-2 text-xs text-muted">
                  Select your preferred date and time slot to see the final price
                </p>
              )}
              {isComplete && (
                <p className="mt-2 text-xs text-muted">
                  Includes peak day and slot adjustments where applicable
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="specialInstructions" className={labelClass}>
              Special Instructions <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="specialInstructions"
              rows={3}
              {...register('specialInstructions')}
              className={`${inputClass} resize-none`}
              placeholder="Gate location, parking, building access..."
            />
          </div>

          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gold py-4 text-base font-bold text-bg transition-all hover:bg-gold-light disabled:opacity-60 gold-glow"
          >
            {isSubmitting
              ? 'Submitting...'
              : lineItems.length > 0 && isComplete
                ? `Confirm Booking — ${formatPKR(totalPrice)}`
                : 'Confirm Booking'}
          </button>
        </motion.form>
      </div>
    </AnimatedSection>
  )
}

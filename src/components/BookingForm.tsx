import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatedSection } from '../lib/animations'
import {
  ANIMALS,
  CITIES,
  EID_DAYS,
  TIME_SLOTS,
  type AnimalType,
} from '../lib/constants'
import { useCountdown } from '../hooks/useCountdown'

const phoneRegex = /^03\d{2}-?\d{7}$/

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .regex(phoneRegex, 'Use Pakistan format: 03XX-XXXXXXX'),
  city: z.string().min(1, 'Please select your city'),
  address: z.string().min(10, 'Please enter your full address'),
  animalType: z.enum(['bakra', 'bachra', 'dumba', 'oont'], {
    message: 'Please select an animal',
  }),
  numberOfAnimals: z
    .number({ error: 'Enter number of animals' })
    .min(1, 'Minimum 1 animal')
    .max(10, 'Maximum 10 animals'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTimeSlot: z.string().min(1, 'Please select a time slot'),
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

export function BookingForm({ selectedAnimal, onSubmitSuccess }: BookingFormProps) {
  const { totalDays, isPast } = useCountdown()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      animalType: selectedAnimal ?? undefined,
      numberOfAnimals: 1,
      city: '',
      preferredDate: '',
      preferredTimeSlot: '',
    },
  })

  const watchedAnimal = watch('animalType')

  useEffect(() => {
    if (selectedAnimal) {
      setValue('animalType', selectedAnimal, { shouldValidate: true })
    }
  }, [selectedAnimal, setValue])

  const onSubmit = (data: BookingFormData) => {
    const reference = String(Math.floor(100000 + Math.random() * 900000))
    console.info('Booking submitted:', data, reference)
    onSubmitSuccess(reference)
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
              City <span className="text-gold">*</span>
            </label>
            <select id="city" {...register('city')} className={inputClass}>
              <option value="">Select city</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1.5 text-xs text-red-400">{errors.city.message}</p>
            )}
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
              Animal Type <span className="text-gold">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ANIMALS.map((animal) => (
                <label
                  key={animal.id}
                  className={`flex cursor-pointer flex-col items-center rounded-xl border p-4 text-center transition-all ${
                    watchedAnimal === animal.id
                      ? 'border-gold bg-gold/10 gold-glow'
                      : 'border-border bg-surface hover:border-gold/40'
                  }`}
                >
                  <input
                    type="radio"
                    value={animal.id}
                    {...register('animalType')}
                    className="sr-only"
                  />
                  <span className="text-2xl">{animal.emoji}</span>
                  <span className="mt-2 text-xs font-semibold">{animal.name.split(' / ')[0]}</span>
                </label>
              ))}
            </div>
            {errors.animalType && (
              <p className="mt-1.5 text-xs text-red-400">{errors.animalType.message}</p>
            )}
          </fieldset>

          <div>
            <label htmlFor="numberOfAnimals" className={labelClass}>
              Number of Animals <span className="text-gold">*</span>
            </label>
            <input
              id="numberOfAnimals"
              type="number"
              min={1}
              max={10}
              {...register('numberOfAnimals', { valueAsNumber: true })}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">Whole animals only (1–10)</p>
            {errors.numberOfAnimals && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.numberOfAnimals.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className={labelClass}>
              Preferred Date <span className="text-gold">*</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {EID_DAYS.map((day) => (
                <label
                  key={day.value}
                  className="flex cursor-pointer flex-col rounded-xl border border-border bg-surface p-4 transition-all has-[:checked]:border-gold has-[:checked]:bg-gold/10"
                >
                  <input
                    type="radio"
                    value={day.value}
                    {...register('preferredDate')}
                    className="sr-only"
                  />
                  <span className="font-semibold">{day.label}</span>
                  <span className="text-xs text-muted">{day.sublabel}</span>
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
            <div className="grid gap-3 sm:grid-cols-2">
              {TIME_SLOTS.map((slot) => (
                <label
                  key={slot.value}
                  className="flex cursor-pointer flex-col rounded-xl border border-border bg-surface p-4 transition-all has-[:checked]:border-gold has-[:checked]:bg-gold/10"
                >
                  <input
                    type="radio"
                    value={slot.value}
                    {...register('preferredTimeSlot')}
                    className="sr-only"
                  />
                  <span className="font-semibold">{slot.label}</span>
                  <span className="text-xs text-muted">{slot.sublabel}</span>
                </label>
              ))}
            </div>
            {errors.preferredTimeSlot && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.preferredTimeSlot.message}
              </p>
            )}
          </fieldset>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gold py-4 text-base font-bold text-bg transition-all hover:bg-gold-light disabled:opacity-60 gold-glow"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </motion.form>
      </div>
    </AnimatedSection>
  )
}

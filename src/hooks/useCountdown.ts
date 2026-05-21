import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { EID_DATE } from '../lib/constants'

export type CountdownValues = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
  isPast: boolean
}

function calcCountdown(target: Date): CountdownValues {
  const now = new Date()
  const diff = differenceInSeconds(target, now)

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      isPast: true,
    }
  }

  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = diff % 60

  return { days, hours, minutes, seconds, totalDays: days, isPast: false }
}

export function useCountdown(target: Date = EID_DATE) {
  const [values, setValues] = useState<CountdownValues>(() => calcCountdown(target))

  useEffect(() => {
    const tick = () => setValues(calcCountdown(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return values
}

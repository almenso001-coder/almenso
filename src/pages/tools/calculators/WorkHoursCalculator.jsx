import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

function parseTime(value) {
  if (!value) return null
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  return { h, m }
}

export default function WorkHoursCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Work Hours Calculator — Track Shift Duration" 
        description="Calculate total work hours by entering clock in/out times and break duration. Great for hourly workers and time tracking."
        inputs={[
          { name: 'clockIn', label: 'Clock In', type: 'time', placeholder: '', defaultValue: '' },
          { name: 'clockOut', label: 'Clock Out', type: 'time', placeholder: '', defaultValue: '' },
          { name: 'breakMinutes', label: 'Break (minutes)', type: 'number', placeholder: 'Enter break time in minutes', defaultValue: '0' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ clockIn, clockOut, breakMinutes }) => {
          const inTime = parseTime(clockIn)
          const outTime = parseTime(clockOut)
          const breakMin = parseFloat(breakMinutes)
          if (!inTime || !outTime || Number.isNaN(breakMin)) {
            return { error: 'Please enter valid times and break minutes.' }
          }

          const inMinutes = inTime.h * 60 + inTime.m
          const outMinutes = outTime.h * 60 + outTime.m
          let duration = outMinutes - inMinutes
          if (duration < 0) duration += 24 * 60
          duration -= breakMin
          if (duration < 0) duration = 0

          const hours = Math.floor(duration / 60)
          const minutes = duration % 60
          return {
            hours,
            minutes,
            totalHours: (duration / 60).toFixed(2),
            formula: `Work duration = (${clockOut} - ${clockIn}) - break = ${hours}h ${minutes}m`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your clock in and clock out times, then enter the total break time in minutes.
          The calculator computes the total worked hours after subtracting the break duration. If the shift crosses midnight, it automatically adjusts the calculation.
        </p>

        <h2>Benefits</h2>
        <p>
          Track your shift length easily and avoid manual errors. This is useful for hourly pay calculations, overtime tracking, and ensuring you log accurate work hours.
          It provides a clear breakdown in hours and minutes, plus a decimal total for payroll calculations.
        </p>

        <h2>FAQ</h2>
        <h3>Does it handle overnight shifts?</h3>
        <p>
          Yes. If the clock-out time is earlier than the clock-in time, it treats the shift as spanning midnight and calculates accordingly.
        </p>

        <h3>Can break time exceed work time?</h3>
        <p>
          If break time exceeds the total duration, the result will be zero hours to avoid negative work time.
        </p>

        <h3>How do I calculate pay?</h3>
        <p>
          Multiply the decimal total hours by your hourly rate to estimate pay. For example, 7.5 hours at ₹200/hr equals ₹1500.
        </p>
      </section>
    </>
  )
}

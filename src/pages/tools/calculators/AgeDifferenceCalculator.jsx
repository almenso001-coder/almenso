import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

function diffDates(d1, d2) {
  const start = new Date(d1)
  const end = new Date(d2)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  if (end < start) return diffDates(d2, d1)

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

export default function AgeDifferenceCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Age Difference Calculator — Calculate Difference Between Dates"
        description="Find the age difference between two dates in years, months, and days. Useful for comparing birthdays or planning timelines."
        inputs={[
          { name: 'date1', label: 'First Date', type: 'date', placeholder: '', defaultValue: '' },
          { name: 'date2', label: 'Second Date', type: 'date', placeholder: '', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ date1, date2 }) => {
          if (!date1 || !date2) return { error: 'Please select both dates.' }
          const diff = diffDates(date1, date2)
          if (!diff) return { error: 'Invalid dates provided.' }
          const { years, months, days } = diff
          return {
            difference: `${years} years, ${months} months, ${days} days`,
            years,
            months,
            days,
            formula: `Difference between ${date1} and ${date2}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Choose two dates using the date pickers. The calculator compares the two dates and returns the difference in completed years, months, and days.
          If the second date is earlier than the first, the tool automatically swaps them so the result is always positive. This is great for calculating age gaps, project durations, or countdowns.
        </p>

        <h2>Benefits</h2>
        <p>
          Quickly see how far apart two dates are in human-friendly units. It helps you plan events, track milestones, and compare time spans without manual date math.
          The result includes years, months, and days to give a clear understanding of the full duration.
        </p>

        <h2>FAQ</h2>
        <h3>What if I enter the same date twice?</h3>
        <p>
          The difference will be zero years, months, and days. This can be useful for checking if two dates match exactly.
        </p>

        <h3>Are leap years handled?</h3>
        <p>
          Yes. The calculator uses JavaScript date math, which accounts for leap years and varying month lengths when calculating the difference.
        </p>

        <h3>Can I use it for countdowns?</h3>
        <p>
          Yes. Enter today’s date as one value and a future date as the other to see how much time remains until that date.
        </p>
      </section>
    </>
  )
}

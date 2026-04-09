import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function DateDurationCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Date Duration Calculator — Days Between Dates" 
        description="Calculate the number of days between two dates. Great for counting days until events or tracking project timelines."
        inputs={[
          { name: 'startDate', label: 'Start Date', type: 'date', placeholder: '', defaultValue: '' },
          { name: 'endDate', label: 'End Date', type: 'date', placeholder: '', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ startDate, endDate }) => {
          if (!startDate || !endDate) return { error: 'Please select both start and end dates.' }
          const start = new Date(startDate)
          const end = new Date(endDate)
          if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return { error: 'Invalid dates provided.' }
          }
          const diffMs = Math.abs(end - start)
          const days = Math.round(diffMs / (1000 * 60 * 60 * 24))
          return {
            days,
            formula: `|${endDate} - ${startDate}| = ${days} days`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Select a start date and an end date. This tool calculates the total number of days between the two dates by converting the difference to milliseconds and then dividing by the number of milliseconds in a day.
          It works for past and future dates and returns a positive value even if the dates are swapped.
        </p>

        <h2>Benefits</h2>
        <p>
          This calculator is useful for planning trips, tracking deadlines, or measuring how many days remain until an important event.
          It removes the need for manual counting and handles leap years and differing month lengths automatically.
        </p>

        <h2>FAQ</h2>
        <h3>Does it count both start and end days?</h3>
        <p>
          The result is the difference in full days. If the dates are the same, the result is zero. If you want to include both days, add one to the result manually.
        </p>

        <h3>What about time zones?</h3>
        <p>
          The calculator uses local time based on your browser. Time zone differences can affect the result if one date crosses a daylight saving boundary.
        </p>

        <h3>Is partial day counted?</h3>
        <p>
          The result rounds to the nearest full day. Partial days are not counted separately.
        </p>
      </section>
    </>
  )
}

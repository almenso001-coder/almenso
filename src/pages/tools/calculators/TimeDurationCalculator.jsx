import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

function parseTime(value) {
  if (!value) return null
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  return { h, m }
}

export default function TimeDurationCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Time Duration Calculator — Hours & Minutes" 
        description="Find the duration between two times (HH:MM). Useful for tracking work sessions, meetings, and schedules."
        inputs={[
          { name: 'startTime', label: 'Start Time', type: 'time', placeholder: '', defaultValue: '' },
          { name: 'endTime', label: 'End Time', type: 'time', placeholder: '', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ startTime, endTime }) => {
          const s = parseTime(startTime)
          const e = parseTime(endTime)
          if (!s || !e) return { error: 'Please enter valid start and end times.' }

          const startMinutes = s.h * 60 + s.m
          const endMinutes = e.h * 60 + e.m
          let diff = endMinutes - startMinutes
          if (diff < 0) diff += 24 * 60

          const hours = Math.floor(diff / 60)
          const minutes = diff % 60
          return {
            hours,
            minutes,
            duration: `${hours} hours ${minutes} minutes`,
            formula: `(${endTime} - ${startTime}) = ${hours}h ${minutes}m`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a start time and an end time using the time picker. The calculator computes the duration between them in hours and minutes.
          If the end time is earlier than the start time, it assumes the period extends to the next day (overnight shift). This is helpful for tracking work hours or schedules.
        </p>

        <h2>Benefits</h2>
        <p>
          Quickly calculate how long a task or event lasted without manual math. Use it to total daily work, plan meeting lengths, or check travel time.
          The result is easy to read and can help with time tracking and productivity.
        </p>

        <h2>FAQ</h2>
        <h3>Does it handle overnight times?</h3>
        <p>
          Yes. If the end time is earlier than the start time, the duration is calculated as if the end time is on the next day.
        </p>

        <h3>What if I enter the same time twice?</h3>
        <p>
          The result will be 0 hours and 0 minutes, indicating no duration between the times.
        </p>

        <h3>Can I use it for multiple shifts?</h3>
        <p>
          This tool calculates one continuous time span. For multiple shifts, use the tool repeatedly and add the durations together manually.
        </p>
      </section>
    </>
  )
}

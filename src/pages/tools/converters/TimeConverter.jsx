import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function TimeConverter() {
  return (
    <ConverterTemplate
      title="Time Converter — Seconds, Minutes, Hours & Days"
      description="Convert time between seconds, minutes, hours, and days. Useful for scheduling, workouts, and time tracking."
      converterName="Time"
      baseUnit="seconds"
      inputs={[
        { name: 'seconds', label: 'Seconds (s)', type: 'number', placeholder: 'Enter time in seconds', defaultValue: '' },
      ]}
      formula={({ seconds }) => {
        const s = parseFloat(seconds)
        if (Number.isNaN(s)) {
          return { error: 'Please enter a valid time in seconds.' }
        }
        const minutes = s / 60
        const hours = s / 3600
        const days = s / 86400
        return {
          minutes: isFinite(minutes) ? Number(minutes.toFixed(4)) : 'Invalid input',
          hours: isFinite(hours) ? Number(hours.toFixed(5)) : 'Invalid input',
          days: isFinite(days) ? Number(days.toFixed(6)) : 'Invalid input',
        }
      }}
    />
  )
}

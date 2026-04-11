import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function PowerConverter() {
  return (
    <ConverterTemplate
      emoji="⚡"
      heroColor="linear-gradient(135deg,#0f172a,#b45309)"
      title="Power Converter — Watts, Kilowatts, Horsepower"
      description="Convert power between watts, kilowatts, and horsepower. Great for appliances, engines, and power calculations."
      converterName="Power"
      baseUnit="watts"
      inputs={[
        { name: 'watts', label: 'Watts (W)', type: 'number', placeholder: 'Enter power in watts', defaultValue: '' },
      ]}
      formula={({ watts }) => {
        const w = parseFloat(watts)
        if (Number.isNaN(w)) {
          return { error: 'Please enter a valid power value in watts.' }
        }
        const kilowatts = w / 1000
        const horsepower = w * 0.00134102
        return {
          kilowatts: isFinite(kilowatts) ? Number(kilowatts.toFixed(4)) : 'Invalid input',
          horsepower: isFinite(horsepower) ? Number(horsepower.toFixed(5)) : 'Invalid input',
        }
      }}
    />
  )
}

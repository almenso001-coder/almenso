import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function LengthConverter() {
  return (
    <ConverterTemplate
      emoji="📏"
      heroColor="linear-gradient(135deg,#0f172a,#0369a1)"
      title="Length Converter — Meters, Kilometers, Feet & More"
      description="Convert between meters, kilometers, feet, inches and miles in one place. Great for travel, DIY, and planning projects."
      converterName="Length"
      baseUnit="meters"
      inputs={[
        { name: 'meters', label: 'Meters (m)', type: 'number', placeholder: 'Enter length in meters', defaultValue: '' },
      ]}
      formula={({ meters }) => {
        const m = parseFloat(meters)
        if (Number.isNaN(m)) {
          return { error: 'Please enter a valid length in meters.' }
        }
        const kilometers = m / 1000
        const centimeters = m * 100
        const feet = m * 3.28084
        const inches = m * 39.3701
        const miles = m * 0.000621371
        return {
          kilometers: isFinite(kilometers) ? Number(kilometers.toFixed(6)) : 'Invalid input',
          centimeters: isFinite(centimeters) ? Number(centimeters.toFixed(4)) : 'Invalid input',
          feet: isFinite(feet) ? Number(feet.toFixed(4)) : 'Invalid input',
          inches: isFinite(inches) ? Number(inches.toFixed(4)) : 'Invalid input',
          miles: isFinite(miles) ? Number(miles.toFixed(6)) : 'Invalid input',
        }
      }}
    />
  )
}

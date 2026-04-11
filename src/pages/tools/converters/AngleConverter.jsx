import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function AngleConverter() {
  return (
    <ConverterTemplate
      emoji="🔵"
      heroColor="linear-gradient(135deg,#0f172a,#4f46e5)"
      title="Angle Converter — Degrees, Radians, Gradians"
      description="Convert angles between degrees, radians, and gradians. Useful for geometry, engineering, and graphics."
      converterName="Angle"
      baseUnit="degrees"
      inputs={[
        { name: 'degrees', label: 'Degrees (°)', type: 'number', placeholder: 'Enter angle in degrees', defaultValue: '' },
      ]}
      formula={({ degrees }) => {
        const deg = parseFloat(degrees)
        if (Number.isNaN(deg)) {
          return { error: 'Please enter a valid angle in degrees.' }
        }
        const radians = (deg * Math.PI) / 180
        const gradians = deg * (10 / 9)
        return {
          radians: isFinite(radians) ? Number(radians.toFixed(6)) : 'Invalid input',
          gradians: isFinite(gradians) ? Number(gradians.toFixed(4)) : 'Invalid input',
        }
      }}
    />
  )
}

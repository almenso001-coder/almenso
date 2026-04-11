import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function EnergyConverter() {
  return (
    <ConverterTemplate
      emoji="⚡"
      heroColor="linear-gradient(135deg,#0f172a,#d97706)"
      title="Energy Converter — Joules, Calories, kWh"
      description="Convert energy values between joules, calories, kilowatt-hours and BTUs. Useful for nutrition, physics, and electricity."
      converterName="Energy"
      baseUnit="joules"
      inputs={[
        { name: 'joules', label: 'Joules (J)', type: 'number', placeholder: 'Enter energy in joules', defaultValue: '' },
      ]}
      formula={({ joules }) => {
        const j = parseFloat(joules)
        if (Number.isNaN(j)) {
          return { error: 'Please enter a valid energy value in joules.' }
        }
        const calories = j / 4.184
        const kilowattHours = j / 3_600_000
        const btu = j / 1055.06
        return {
          calories: isFinite(calories) ? Number(calories.toFixed(4)) : 'Invalid input',
          kilowattHours: isFinite(kilowattHours) ? Number(kilowattHours.toFixed(8)) : 'Invalid input',
          btu: isFinite(btu) ? Number(btu.toFixed(4)) : 'Invalid input',
        }
      }}
    />
  )
}

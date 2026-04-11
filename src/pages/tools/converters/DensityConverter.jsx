import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function DensityConverter() {
  return (
    <ConverterTemplate
      emoji="⚗️"
      heroColor="linear-gradient(135deg,#0f172a,#7e22ce)"
      title="Density Converter — kg/m³, g/cm³, lb/ft³"
      description="Convert density between kilograms per cubic meter, grams per cubic centimeter and pounds per cubic foot. Useful for materials and fluids."
      converterName="Density"
      baseUnit="kg/m³"
      inputs={[
        { name: 'kgPerCubicMeter', label: 'Kilograms per cubic meter (kg/m³)', type: 'number', placeholder: 'Enter density in kg/m³', defaultValue: '' },
      ]}
      formula={({ kgPerCubicMeter }) => {
        const kgm3 = parseFloat(kgPerCubicMeter)
        if (Number.isNaN(kgm3)) {
          return { error: 'Please enter a valid density in kg/m³.' }
        }
        const gPerCm3 = kgm3 / 1000
        const lbPerFt3 = kgm3 * 0.06242796
        return {
          gPerCm3: isFinite(gPerCm3) ? Number(gPerCm3.toFixed(6)) : 'Invalid input',
          lbPerFt3: isFinite(lbPerFt3) ? Number(lbPerFt3.toFixed(4)) : 'Invalid input',
        }
      }}
    />
  )
}

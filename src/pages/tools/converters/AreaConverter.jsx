import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function AreaConverter() {
  return (
    <ConverterTemplate
      title="Area Converter — Square Meters, Acres, Square Feet"
      description="Convert area between square meters, acres, square feet, and square yards. Handy for land planning and real estate."
      converterName="Area"
      baseUnit="square meters"
      inputs={[
        { name: 'squareMeters', label: 'Square meters (m²)', type: 'number', placeholder: 'Enter area in square meters', defaultValue: '' },
      ]}
      formula={({ squareMeters }) => {
        const m2 = parseFloat(squareMeters)
        if (Number.isNaN(m2)) {
          return { error: 'Please enter a valid area in square meters.' }
        }
        const squareFeet = m2 * 10.7639
        const squareYards = m2 * 1.19599
        const acres = m2 * 0.000247105
        const hectares = m2 * 0.0001
        return {
          squareFeet: isFinite(squareFeet) ? Number(squareFeet.toFixed(2)) : 'Invalid input',
          squareYards: isFinite(squareYards) ? Number(squareYards.toFixed(2)) : 'Invalid input',
          acres: isFinite(acres) ? Number(acres.toFixed(6)) : 'Invalid input',
          hectares: isFinite(hectares) ? Number(hectares.toFixed(6)) : 'Invalid input',
        }
      }}
    />
  )
}

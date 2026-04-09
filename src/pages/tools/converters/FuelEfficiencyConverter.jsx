import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function FuelEfficiencyConverter() {
  return (
    <ConverterTemplate
      title="Fuel Efficiency Converter — km/L, MPG, L/100km"
      description="Convert fuel efficiency between kilometers per liter, miles per gallon, and liters per 100 km. Helpful for comparing vehicles."
      converterName="Fuel Efficiency"
      baseUnit="km per liter"
      inputs={[
        { name: 'kmPerLiter', label: 'Kilometers per liter (km/L)', type: 'number', placeholder: 'Enter fuel efficiency in km/L', defaultValue: '' },
      ]}
      formula={({ kmPerLiter }) => {
        const kmpl = parseFloat(kmPerLiter)
        if (Number.isNaN(kmpl) || kmpl <= 0) {
          return { error: 'Please enter a valid fuel efficiency value (greater than 0).' }
        }
        const mpgUS = kmpl * 2.35215
        const mpgUK = kmpl * 2.825
        const litersPer100km = 100 / kmpl
        return {
          mpgUS: isFinite(mpgUS) ? Number(mpgUS.toFixed(2)) : 'Invalid input',
          mpgUK: isFinite(mpgUK) ? Number(mpgUK.toFixed(2)) : 'Invalid input',
          litersPer100km: isFinite(litersPer100km) ? Number(litersPer100km.toFixed(2)) : 'Invalid input',
        }
      }}
    />
  )
}

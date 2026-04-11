import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function TemperatureConverter() {
  return (
    <ConverterTemplate
      emoji="🌡️"
      heroColor="linear-gradient(135deg,#0f172a,#ef4444)"
      title="Temperature Converter — Celsius, Fahrenheit, Kelvin"
      description="Quickly convert temperatures between Celsius, Fahrenheit, and Kelvin. Ideal for weather, cooking and science."
      converterName="Temperature"
      baseUnit="Celsius"
      inputs={[
        { name: 'celsius', label: 'Celsius (°C)', type: 'number', placeholder: 'Enter temperature in Celsius', defaultValue: '' },
      ]}
      formula={({ celsius }) => {
        const c = parseFloat(celsius)
        if (Number.isNaN(c)) {
          return { error: 'Please enter a valid temperature in Celsius.' }
        }
        const fahrenheit = c * 1.8 + 32
        const kelvin = c + 273.15
        const rankine = (c + 273.15) * 1.8
        return {
          fahrenheit: isFinite(fahrenheit) ? Number(fahrenheit.toFixed(2)) : 'Invalid input',
          kelvin: isFinite(kelvin) ? Number(kelvin.toFixed(2)) : 'Invalid input',
          rankine: isFinite(rankine) ? Number(rankine.toFixed(2)) : 'Invalid input',
        }
      }}
    />
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function TemperatureConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Temperature Converter — Celsius, Fahrenheit, Kelvin"
        description="Convert temperature values between Celsius, Fahrenheit, and Kelvin with ease. Great for science, cooking, and weather conversions."
        inputs={[
          { name: 'celsius', label: 'Celsius (°C)', type: 'number', placeholder: 'Enter temperature in °C', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ celsius }) => {
          const c = parseFloat(celsius)
          if (Number.isNaN(c)) {
            return { error: 'Please enter a valid temperature in Celsius.' }
          }
          const f = (c * 9) / 5 + 32
          const k = c + 273.15
          return {
            fahrenheit: isFinite(f) ? f : 'Invalid input',
            kelvin: isFinite(k) ? k : 'Invalid input',
            formula: `°F = (°C × 9/5) + 32; K = °C + 273.15`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a temperature in Celsius. The tool converts it to Fahrenheit and Kelvin using standard conversion formulas.
          This is useful for comparing temperatures across different units, whether you are cooking, studying physics, or checking weather reports from other countries.
        </p>

        <h2>Benefits</h2>
        <p>
          Temperature conversions help you understand readings from different sources and equipment. It makes it easy to work with scientific data and everyday measurements.
          The calculator eliminates manual math and ensures consistent results.
        </p>

        <h2>FAQ</h2>
        <h3>Why is Kelvin used?</h3>
        <p>
          Kelvin is the standard unit of temperature in science, used for absolute temperature measurements. Kelvin starts at absolute zero, where molecular motion stops.
        </p>

        <h3>Can I convert Fahrenheit to Celsius?</h3>
        <p>
          This calculator converts from Celsius to other units. To convert Fahrenheit to Celsius, use the reverse formula: (°F - 32) × 5/9.
        </p>

        <h3>Is 0°C the same as 32°F?</h3>
        <p>
          Yes. 0°C equals 32°F and 273.15 K. This converter reflects that relationship.
        </p>
      </section>
    </>
  )
}

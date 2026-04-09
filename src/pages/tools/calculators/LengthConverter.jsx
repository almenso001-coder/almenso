import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LengthConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Length Converter — Meters, Kilometers, Feet" 
        description="Convert length between meters, kilometers, feet, and inches. Useful for construction, travel, and design."
        inputs={[
          { name: 'meters', label: 'Meters (m)', type: 'number', placeholder: 'Enter length in meters', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ meters }) => {
          const m = parseFloat(meters)
          if (Number.isNaN(m)) {
            return { error: 'Please enter a valid length in meters.' }
          }
          const kilometers = m / 1000
          const feet = m * 3.28084
          const inches = m * 39.3701
          return {
            kilometers: isFinite(kilometers) ? kilometers : 'Invalid input',
            feet: isFinite(feet) ? feet : 'Invalid input',
            inches: isFinite(inches) ? inches : 'Invalid input',
            formula: `km = m ÷ 1000, ft = m × 3.28084, in = m × 39.3701`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a length value in meters. The converter calculates the equivalent length in kilometers, feet, and inches.
          This is handy when working with different unit systems, such as metric and imperial, and for quickly checking measurements while planning projects.
        </p>

        <h2>Benefits</h2>
        <p>
          Having a quick conversion tool helps avoid mistakes when switching between units and makes it easier to understand specifications or instructions from different regions.
          It is especially useful for DIY projects, travel planning, and comparing product dimensions.
        </p>

        <h2>FAQ</h2>
        <h3>Why convert to feet and inches?</h3>
        <p>
          Feet and inches are commonly used in the United States for construction and everyday measurements. Converting helps you interpret specs or build plans.
        </p>

        <h3>What if I want yards?</h3>
        <p>
          You can convert feet to yards (1 yard = 3 feet). Multiply the feet result by 0.333333 to get yards.
        </p>

        <h3>Is the conversion exact?</h3>
        <p>
          The calculator uses standard conversion factors. Results are approximate due to rounding, but accurate enough for most practical uses.
        </p>
      </section>
    </>
  )
}

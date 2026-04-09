import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function AreaConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Area Converter — m², ft², acres" 
        description="Convert area between square meters, square feet, and acres. Useful for real estate, gardening, and planning."
        inputs={[
          { name: 'squareMeters', label: 'Square Meters (m²)', type: 'number', placeholder: 'Enter area in square meters', defaultValue: '' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ squareMeters }) => {
          const m2 = parseFloat(squareMeters)
          if (Number.isNaN(m2)) {
            return { error: 'Please enter a valid area in square meters.' }
          }
          const squareFeet = m2 * 10.7639
          const acres = m2 / 4046.86
          return {
            squareFeet: isFinite(squareFeet) ? squareFeet : 'Invalid input',
            acres: isFinite(acres) ? acres : 'Invalid input',
            formula: `ft² = m² × 10.7639, acres = m² ÷ 4046.86`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter an area measurement in square meters. The calculator converts it to square feet and acres. It’s helpful when comparing property sizes, estimating land area, or planning space usage.
          Most real estate listings in some countries use acres or square feet, so having quick conversions makes evaluation easier.
        </p>

        <h2>Benefits</h2>
        <p>
          Quickly understand and compare area measurements from different systems. Whether you are buying land, planning a garden, or reading floor plans, converting units saves time and reduces mistakes.
        </p>

        <h2>FAQ</h2>
        <h3>What is an acre?</h3>
        <p>
          An acre is a unit of area commonly used in land measurement, primarily in the US and UK. One acre equals 4,046.86 square meters.
        </p>

        <h3>Is square feet used for houses?</h3>
        <p>
          Yes. Floor plans and property listings often use square feet to describe interior and lot size in the US and some other countries.
        </p>

        <h3>Can I convert back from acres to m²?</h3>
        <p>
          Yes. Multiply acres by 4046.86 to get square meters.
        </p>
      </section>
    </>
  )
}

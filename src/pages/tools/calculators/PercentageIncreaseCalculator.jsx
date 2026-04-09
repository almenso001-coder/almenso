import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PercentageIncreaseCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Percentage Increase Calculator — Calculate % Increase"
        description="Find the percentage increase from an original value to a new value. Useful for price increases, growth rates, and performance changes."
        inputs={[
          { name: 'originalValue', label: 'Original Value', type: 'number', placeholder: 'Enter original value', defaultValue: '' },
          { name: 'newValue', label: 'New Value', type: 'number', placeholder: 'Enter new value', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ originalValue, newValue }) => {
          const o = parseFloat(originalValue)
          const n = parseFloat(newValue)
          if (Number.isNaN(o) || Number.isNaN(n) || o === 0) {
            return { error: 'Please enter valid numbers (original value must be non-zero).' }
          }
          const increase = ((n - o) / o) * 100
          return {
            percentageIncrease: isFinite(increase) ? increase : 'Invalid input',
            formula: `((New - Original) / Original) × 100 = ${increase}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Percentage increase measures how much a value has grown relative to its original amount. It is useful for tracking price hikes, revenue growth, and other increases over time.
        </p>

        <h2>FAQ</h2>
        <h3>Can this show negative values?</h3>
        <p>
          If the new value is smaller than the original value, the result will be negative — indicating a decrease rather than an increase.
        </p>

        <h3>What if original value is zero?</h3>
        <p>
          Percentage change from zero is undefined, so this calculator requires the original value to be non-zero.
        </p>

        <h3>How do I interpret the result?</h3>
        <p>
          A result of 20% means the new value is 20% higher than the original. For example, going from 100 to 120 is a 20% increase.
        </p>
      </section>
    </>
  )
}

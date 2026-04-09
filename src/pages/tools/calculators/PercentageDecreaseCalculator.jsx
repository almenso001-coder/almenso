import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PercentageDecreaseCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Percentage Decrease Calculator — Calculate % Decrease"
        description="Calculate the percentage decrease from an original value to a new value. Useful for discounts, savings, and reductions."
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
          const decrease = ((o - n) / o) * 100
          return {
            percentageDecrease: isFinite(decrease) ? decrease : 'Invalid input',
            formula: `((Original - New) / Original) × 100 = ${decrease}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Percentage decrease measures how much a value has reduced relative to its original amount. It is useful for calculating discounts, savings, and reductions.
        </p>

        <h2>FAQ</h2>
        <h3>What does a negative result mean?</h3>
        <p>
          A negative result means the new value is higher than the original value, which indicates an increase instead of a decrease.
        </p>

        <h3>Why should original value not be zero?</h3>
        <p>
          Division by zero is undefined. The calculator requires a non-zero original value to compute a percentage change.
        </p>

        <h3>How is this different from percentage increase?</h3>
        <p>
          Percentage decrease uses (original - new), while percentage increase uses (new - original). Both divide by the original value and multiply by 100.
        </p>
      </section>
    </>
  )
}

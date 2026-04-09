import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PercentageChangeCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Percentage Change Calculator — Measure Difference Over Time" 
        description="Calculate the percentage change between two values, useful for tracking growth or decline." 
        inputs={[
          { name: 'oldValue', label: 'Old Value', type: 'number', placeholder: 'Enter old value', defaultValue: '' },
          { name: 'newValue', label: 'New Value', type: 'number', placeholder: 'Enter new value', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ oldValue, newValue }) => {
          const oldVal = parseFloat(oldValue)
          const newVal = parseFloat(newValue)
          if (Number.isNaN(oldVal) || Number.isNaN(newVal) || oldVal === 0) {
            return { error: 'Please enter valid numbers and ensure the old value is not zero.' }
          }

          const change = ((newVal - oldVal) / Math.abs(oldVal)) * 100
          return {
            percentageChange: isFinite(change) ? change : 'Invalid input',
            formula: `Percentage change = ((new - old) / |old|) × 100 = ${change}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter an original value and a new value to see how much the value has changed in percentage terms.
          This is common for tracking price changes, growth rates, or performance improvements.
        </p>

        <h2>Positive vs negative change</h2>
        <p>
          Positive results mean an increase; negative values indicate a decrease. The calculator uses the absolute old value in the denominator.
        </p>

        <h2>FAQ</h2>
        <h3>Why must old value be non-zero?</h3>
        <p>
          Dividing by zero is mathematically undefined, so the old value must be non-zero.
        </p>

        <h3>Is this the same as percentage difference?</h3>
        <p>
          No — percentage change compares to the original value, while percentage difference compares relative to the average of both values.
        </p>

        <h3>How do I interpret a negative result?</h3>
        <p>
          A negative value means the new value is lower than the old value, representing a decline.
        </p>
      </section>
    </>
  )
}

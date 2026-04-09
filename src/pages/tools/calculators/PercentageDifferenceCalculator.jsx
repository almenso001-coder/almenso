import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PercentageDifferenceCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Percentage Difference Calculator — Compare Two Values" 
        description="Calculate the percentage difference between two numbers, useful for comparing changes or sizes." 
        inputs={[
          { name: 'valueA', label: 'Value A', type: 'number', placeholder: 'Enter first value', defaultValue: '' },
          { name: 'valueB', label: 'Value B', type: 'number', placeholder: 'Enter second value', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ valueA, valueB }) => {
          const a = parseFloat(valueA)
          const b = parseFloat(valueB)
          if (Number.isNaN(a) || Number.isNaN(b) || (a === 0 && b === 0)) {
            return { error: 'Please enter valid numbers (not both zero).' }
          }

          const diff = Math.abs(a - b)
          const avg = (Math.abs(a) + Math.abs(b)) / 2
          const percentDiff = (diff / avg) * 100

          return {
            percentageDifference: isFinite(percentDiff) ? percentDiff : 'Invalid input',
            formula: `Percentage Difference = (|A - B| / ((|A| + |B|)/2)) × 100 = ${percentDiff}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter two values to see how far apart they are in percentage terms. This is useful for comparing measurements, performance, or results.
        </p>

        <h2>When to use percentage difference</h2>
        <p>
          Rather than absolute difference, percentage difference standardizes the comparison relative to the average of the values.
          It is especially helpful when the values are on different scales.
        </p>

        <h2>FAQ</h2>
        <h3>Is this the same as percent change?</h3>
        <p>
          Not exactly. Percent change measures growth from one value to another, while percentage difference measures the relative difference between two values.
        </p>

        <h3>What if one value is negative?</h3>
        <p>
          The formula uses absolute values so the difference is always positive and reflects the magnitude of change.
        </p>

        <h3>Why use average in the formula?</h3>
        <p>
          Using the average of the two values prevents the result from depending on which value is labeled A or B.
        </p>
      </section>
    </>
  )
}

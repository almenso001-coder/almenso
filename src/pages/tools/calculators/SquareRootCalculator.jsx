import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SquareRootCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Square Root Calculator — Find Square Roots" 
        description="Calculate the square root of a number, useful for geometry, algebra, and measurement conversions." 
        inputs={[
          { name: 'number', label: 'Number', type: 'number', placeholder: 'Enter a number', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ number }) => {
          const val = parseFloat(number)
          if (Number.isNaN(val)) {
            return { error: 'Please enter a valid number.' }
          }

          if (val < 0) {
            return { error: 'Square root of a negative number is not a real number.' }
          }

          const root = Math.sqrt(val)

          return {
            squareRoot: isFinite(root) ? root : 'Invalid input',
            formula: `√${val} = ${root}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a number to see its square root. The square root is a value that multiplied by itself equals the original number.
        </p>

        <h2>Where it's used</h2>
        <p>
          Square roots appear in geometry (finding side lengths), physics, and statistics. They are also used in calculators for standard deviation.
        </p>

        <h2>FAQ</h2>
        <h3>Why can't I use negative numbers?</h3>
        <p>
          The square root of a negative number is not a real number. For complex numbers, you would need an advanced calculator.
        </p>

        <h3>What is √0?</h3>
        <p>
          The square root of 0 is 0.
        </p>

        <h3>How accurate is the result?</h3>
        <p>
          This calculation uses JavaScript’s Math.sqrt, which provides double-precision accuracy suitable for most use cases.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function GCDCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="GCD Calculator — Greatest Common Divisor"
        description="Find the greatest common divisor of two integers using the Euclidean algorithm."
        inputs={[
          { name: 'a', label: 'First Integer', type: 'number', placeholder: 'e.g., 48', defaultValue: '' },
          { name: 'b', label: 'Second Integer', type: 'number', placeholder: 'e.g., 18', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ a, b }) => {
          let x = parseInt(a, 10)
          let y = parseInt(b, 10)
          if (Number.isNaN(x) || Number.isNaN(y)) {
            return { error: 'Enter two integers.' }
          }
          x = Math.abs(x)
          y = Math.abs(y)
          while (y !== 0) {
            const temp = y
            y = x % y
            x = temp
          }
          return { gcd: x, formula: 'Euclidean algorithm: gcd(a, b)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter two integers and click Calculate. The calculator returns the greatest common divisor (GCD), which is the largest integer that divides both numbers.
        </p>

        <h2>Benefits</h2>
        <p>
          GCD is useful in simplifying fractions, cryptography, and number theory. It helps you reduce ratios to their simplest form.
        </p>
        <p>
          It also appears in algorithms that need to determine compatibility or shared factors.
        </p>

        <h2>FAQ</h2>
        <h3>What if one number is 0?</h3>
        <p>
          The GCD of 0 and a non-zero number is the absolute value of the non-zero number.
        </p>
        <h3>Does order matter?</h3>
        <p>
          No. gcd(a, b) is the same as gcd(b, a).
        </p>
      </section>
    </>
  )
}

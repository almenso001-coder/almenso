import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LogCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Log Calculator — Logarithm with Changeable Base"
        description="Compute logarithms for any positive number and base."
        inputs={[
          { name: 'value', label: 'Value (x)', type: 'number', placeholder: 'e.g., 100', defaultValue: '' },
          { name: 'base', label: 'Base', type: 'number', placeholder: 'e.g., 10', defaultValue: '10' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ value, base }) => {
          const x = parseFloat(value)
          const b = parseFloat(base)

          if (Number.isNaN(x) || Number.isNaN(b) || x <= 0 || b <= 0 || b === 1) {
            return { error: 'Value and base must be positive, and base cannot be 1.' }
          }

          const result = Math.log(x) / Math.log(b)
          return {
            result: isFinite(result) ? result : 'Invalid input',
            formula: 'log_b(x) = ln(x) / ln(b)'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a positive value and a base (not equal to 1). The calculator shows the logarithm of the value with respect to that base.
        </p>
        <p>
          Common bases are 10 (logarithm) and e (natural logarithm). In math, logarithms answer the question “to what power must the base be raised to get the value?”.
        </p>

        <h2>Benefits</h2>
        <p>
          Logarithms are used in many fields including science, engineering, and finance. This tool helps with calculations in growth modeling, signal processing, and pH measurements.
        </p>
        <p>
          It also helps verify computations in algebra and calculus problems.
        </p>

        <h2>FAQ</h2>
        <h3>What is base e?</h3>
        <p>
          Base e (approximately 2.718) is the natural logarithm base, commonly used in calculus and continuous growth models.
        </p>
        <h3>Can I use negative numbers?</h3>
        <p>
          No. Logarithms are only defined for positive values and bases.
        </p>
      </section>
    </>
  )
}

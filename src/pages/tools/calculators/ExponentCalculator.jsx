import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ExponentCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Exponent Calculator — Power & Roots"
        description="Raise a number to a power or compute roots using fractional exponents."
        inputs={[
          { name: 'base', label: 'Base', type: 'number', placeholder: 'e.g., 2', defaultValue: '' },
          { name: 'exponent', label: 'Exponent', type: 'number', placeholder: 'e.g., 3', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ base, exponent }) => {
          const b = parseFloat(base)
          const e = parseFloat(exponent)
          if (Number.isNaN(b) || Number.isNaN(e)) {
            return { error: 'Please enter valid numbers for base and exponent.' }
          }
          const result = Math.pow(b, e)
          return { result: isFinite(result) ? result : 'Invalid input', formula: 'result = base ^ exponent' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a base number and an exponent. Click Calculate to raise the base to that power. Use fractional exponents to compute roots (e.g., 0.5 for square root).
        </p>
        <p>
          This tool handles positive, negative, and fractional exponents where JavaScript supports them.
        </p>

        <h2>Benefits</h2>
        <p>
          Exponents are common in physics, finance, and algebra. This calculator helps verify expressions, calculate growth, and solve equations.
        </p>
        <p>
          It can also be used to quickly compute powers for loan amortization, compound interest, and area/volume formulas.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use negative exponents?</h3>
        <p>
          Yes. A negative exponent computes the reciprocal power (e.g., 2^-1 = 0.5).
        </p>
        <h3>What about roots?</h3>
        <p>
          Use a fractional exponent (e.g., 1/2 for square root, 1/3 for cube root).
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function RandomNumberGenerator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Random Number Generator — Pick a Number" 
        description="Generate a random number within a range. Great for decision-making, games, or simulations." 
        inputs={[
          { name: 'min', label: 'Minimum', type: 'number', placeholder: 'Enter minimum value', defaultValue: '' },
          { name: 'max', label: 'Maximum', type: 'number', placeholder: 'Enter maximum value', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ min, max }) => {
          const minVal = parseFloat(min)
          const maxVal = parseFloat(max)
          if (Number.isNaN(minVal) || Number.isNaN(maxVal) || minVal > maxVal) {
            return { error: 'Please enter valid numbers and ensure minimum is not greater than maximum.' }
          }

          const random = Math.random() * (maxVal - minVal) + minVal
          return {
            randomNumber: random,
            formula: `Random = Math.random() × (max - min) + min = ${random}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a minimum and maximum value to generate a random number in that inclusive range.
          Use it to make decisions, simulate outcomes, or add randomness to games.
        </p>

        <h2>Note on randomness</h2>
        <p>
          This generator uses JavaScript’s pseudo-random number generator, which is not suitable for cryptographic purposes but works well for basic tasks.
        </p>

        <h2>FAQ</h2>
        <h3>Will it always return an integer?</h3>
        <p>
          No. It returns a floating-point number. Round or floor the result if you need an integer.
        </p>

        <h3>Can I use negative numbers?</h3>
        <p>
          Yes. Both minimum and maximum values can be negative as long as min ≤ max.
        </p>

        <h3>Is the result predictable?</h3>
        <p>
          The number is generated pseudo-randomly and will differ on each calculation. It is not secure for cryptographic uses.
        </p>
      </section>
    </>
  )
}

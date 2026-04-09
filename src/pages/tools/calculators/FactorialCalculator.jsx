import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function FactorialCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Factorial Calculator — Integer Factorial Values"
        description="Compute n! (n factorial) for non-negative integers."
        inputs={[
          { name: 'n', label: 'n (integer)', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ n }) => {
          const num = parseInt(n, 10)
          if (Number.isNaN(num) || num < 0) {
            return { error: 'Enter a non-negative integer.' }
          }
          if (num > 170) {
            return { error: 'Result is too large for reliable JavaScript number precision.' }
          }
          let result = 1
          for (let i = 2; i <= num; i += 1) {
            result *= i
          }
          return { factorial: result, formula: 'n! = 1 * 2 * ... * n' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a non-negative integer and click Calculate. The calculator returns n! (n factorial), which is the product of all positive integers up to n.
        </p>
        <p>
          Factorials grow very quickly, so large values may exceed JavaScript number limits.
        </p>

        <h2>Benefits</h2>
        <p>
          Factorials are used in combinatorics, probability, and calculus. This tool helps with permutations, combinations, and series expansions.
        </p>
        <p>
          It is especially useful for checking homework or validating formulas for small n.
        </p>

        <h2>FAQ</h2>
        <h3>What is 0!?</h3>
        <p>
          By definition, 0! is 1. This calculator handles that case.
        </p>
        <h3>Why can’t I calculate very large n?</h3>
        <p>
          Factorials grow extremely fast. JavaScript numbers lose precision beyond about 170! so results become unreliable.
        </p>
      </section>
    </>
  )
}

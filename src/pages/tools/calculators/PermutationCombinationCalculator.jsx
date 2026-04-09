import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PermutationCombinationCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Permutation & Combination Calculator"
        description="Calculate nPr (permutations) and nCr (combinations) for given n and r values."
        inputs={[
          { name: 'n', label: 'n (total items)', type: 'number', placeholder: 'e.g., 10', defaultValue: '' },
          { name: 'r', label: 'r (selected items)', type: 'number', placeholder: 'e.g., 3', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ n, r }) => {
          const N = parseInt(n, 10)
          const R = parseInt(r, 10)
          if (Number.isNaN(N) || Number.isNaN(R) || N < 0 || R < 0 || R > N) {
            return { error: 'Enter non-negative integers with r ≤ n.' }
          }

          const factorial = (x) => {
            if (x === 0) return 1
            let res = 1
            for (let i = 1; i <= x; i += 1) res *= i
            return res
          }

          const nFact = factorial(N)
          const rFact = factorial(R)
          const nMinusRFact = factorial(N - R)
          const permutations = nFact / nMinusRFact
          const combinations = permutations / rFact

          return { permutations, combinations, formula: 'nPr = n!/(n-r)!  |  nCr = nPr/r!' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter values for n and r. The calculator returns the number of possible ordered arrangements (permutations) and unordered selections (combinations).
        </p>
        <p>
          Use permutations when order matters (e.g., race finishes) and combinations when it does not (e.g., selecting a committee).
        </p>

        <h2>Benefits</h2>
        <p>
          This tool helps with probability, statistics, and counting problems. It is handy for games, lottery odds, and planning scenarios.
        </p>
        <p>
          It saves time compared to manual factorial calculations and reduces the risk of mistakes.
        </p>

        <h2>FAQ</h2>
        <h3>What if r = 0?</h3>
        <p>
          By definition, 0 items can be chosen in 1 way. The calculator handles this correctly.
        </p>
        <h3>Can n be large?</h3>
        <p>
          For large n, factorial results can exceed JavaScript number limits. Use smaller values or a specialized math library for very large computations.
        </p>
      </section>
    </>
  )
}

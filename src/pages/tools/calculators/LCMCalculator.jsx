import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LCMCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="LCM Calculator — Least Common Multiple"
        description="Compute the least common multiple of two integers."
        inputs={[
          { name: 'a', label: 'First Integer', type: 'number', placeholder: 'e.g., 12', defaultValue: '' },
          { name: 'b', label: 'Second Integer', type: 'number', placeholder: 'e.g., 18', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ a, b }) => {
          const x = parseInt(a, 10)
          const y = parseInt(b, 10)
          if (Number.isNaN(x) || Number.isNaN(y) || x === 0 || y === 0) {
            return { error: 'Enter two non-zero integers.' }
          }
          const absX = Math.abs(x)
          const absY = Math.abs(y)
          const gcd = (u, v) => {
            while (v !== 0) {
              const t = v
              v = u % v
              u = t
            }
            return u
          }
          const g = gcd(absX, absY)
          const lcm = Math.abs((absX / g) * absY)
          return { lcm, gcd: g, formula: 'lcm(a,b) = |a*b| / gcd(a,b)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter two non-zero integers and click Calculate. The calculator returns the least common multiple (LCM), the smallest positive number divisible by both inputs.
        </p>

        <h2>Benefits</h2>
        <p>
          LCM is useful when adding fractions, scheduling repeating events, and solving problems that require syncing cycles.
        </p>
        <p>
          It helps you find common denominators and align repeating patterns cleanly.
        </p>

        <h2>FAQ</h2>
        <h3>How is LCM related to GCD?</h3>
        <p>
          LCM and GCD are related by the formula: lcm(a,b) * gcd(a,b) = |a*b|.
        </p>
        <h3>Can it handle negative numbers?</h3>
        <p>
          Yes. The result is always positive, because LCM is defined as a positive quantity.
        </p>
      </section>
    </>
  )
}

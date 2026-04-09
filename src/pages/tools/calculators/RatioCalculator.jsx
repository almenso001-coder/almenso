import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function RatioCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Ratio Calculator — Simplify Ratios" 
        description="Simplify and compare ratios. Use it for mixing, scaling recipes, or comparing proportional quantities." 
        inputs={[
          { name: 'numA', label: 'Number A', type: 'number', placeholder: 'Enter first number', defaultValue: '' },
          { name: 'numB', label: 'Number B', type: 'number', placeholder: 'Enter second number', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ numA, numB }) => {
          const a = parseFloat(numA)
          const b = parseFloat(numB)
          if (Number.isNaN(a) || Number.isNaN(b) || (a === 0 && b === 0)) {
            return { error: 'Please enter valid numbers (not both zero).' }
          }

          const gcd = (x, y) => {
            if (!y) return Math.abs(x)
            return gcd(y, x % y)
          }

          const g = gcd(a, b)
          const simplifiedA = a / g
          const simplifiedB = b / g

          return {
            ratio: `${simplifiedA}:${simplifiedB}`,
            formula: `Simplified ratio = (${a}:${b}) ÷ GCD(${a}, ${b}) = ${simplifiedA}:${simplifiedB}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter two numbers to get their simplified ratio. This is useful when scaling recipes, allocating resources, or comparing proportions.
        </p>

        <h2>How it works</h2>
        <p>
          The calculator finds the greatest common divisor (GCD) and divides both numbers to reduce the ratio.
        </p>

        <h2>FAQ</h2>
        <h3>What is a ratio?</h3>
        <p>
          A ratio compares how much of one thing exists relative to another. It is often written as A:B.
        </p>

        <h3>Can ratios include decimals?</h3>
        <p>
          Yes. This tool handles decimals but simplifies ratios based on their numeric GCD.
        </p>

        <h3>What if one number is 0?</h3>
        <p>
          The ratio is undefined if both are 0. If one is 0, the ratio is 0 to the other number.
        </p>
      </section>
    </>
  )
}

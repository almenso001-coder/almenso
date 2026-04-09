import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function FractionCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Fraction Calculator — Convert Fractions to Decimals" 
        description="Convert between fractions and decimals, and simplify fractions quickly." 
        inputs={[
          { name: 'numerator', label: 'Numerator', type: 'number', placeholder: 'Enter numerator', defaultValue: '' },
          { name: 'denominator', label: 'Denominator', type: 'number', placeholder: 'Enter denominator', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ numerator, denominator }) => {
          const num = parseFloat(numerator)
          const den = parseFloat(denominator)
          if (Number.isNaN(num) || Number.isNaN(den) || den === 0) {
            return { error: 'Please enter valid numbers and ensure denominator is non-zero.' }
          }

          const decimal = num / den

          const gcd = (a, b) => {
            if (!b) return Math.abs(a)
            return gcd(b, a % b)
          }

          const g = gcd(num, den)
          const simplifiedNum = num / g
          const simplifiedDen = den / g

          return {
            decimal: isFinite(decimal) ? decimal : 'Invalid input',
            simplified: `${simplifiedNum}/${simplifiedDen}`,
            formula: `Decimal = numerator / denominator = ${decimal}; Simplified = ${simplifiedNum}/${simplifiedDen}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a numerator and denominator to see the equivalent decimal value and the fraction in simplest terms.
          This helps with conversions in math homework, recipes, and measurements.
        </p>

        <h2>Common uses</h2>
        <p>
          Fractions often appear in cooking, construction measurements, and finances. Converting them to decimals can make arithmetic easier.
        </p>

        <h2>FAQ</h2>
        <h3>What if the fraction is already simplified?</h3>
        <p>
          The calculator will still show the simplified fraction. If it's already in simplest terms, it will remain unchanged.
        </p>

        <h3>Can I use negative numbers?</h3>
        <p>
          Yes. The calculator handles negative numerators and denominators.
        </p>

        <h3>What happens if denominator is zero?</h3>
        <p>
          Division by zero is undefined, so the calculator requires a non-zero denominator.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function InterestCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Interest Calculator – Calculate Simple Interest"
        description="Calculate simple interest on a principal amount. Enter principal, interest rate, and time to see interest and total amount."
        inputs={[
          { name: 'principal', label: 'Principal', type: 'number', placeholder: 'Enter principal amount', defaultValue: '' },
          { name: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'Enter annual interest rate', defaultValue: '' },
          { name: 'time', label: 'Time (years)', type: 'number', placeholder: 'Enter time in years', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ principal, rate, time }) => {
          const p = parseFloat(principal)
          const r = parseFloat(rate)
          const t = parseFloat(time)
          if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t)) {
            return { error: 'Please enter valid numbers for principal, rate, and time.' }
          }
          const interest = (p * r * t) / 100
          const total = p + interest
          return {
            interest: isFinite(interest) ? interest : 'Invalid input',
            total: isFinite(total) ? total : 'Invalid input',
            formula: `(P × R × T) ÷ 100 = ${interest}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Simple interest is calculated on the original principal amount only. The formula is (P × R × T) ÷ 100, where P is principal, R is annual interest rate, and T is time in years.
        </p>

        <h2>FAQ</h2>
        <h3>What is the difference between simple and compound interest?</h3>
        <p>
          Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus accumulated interest.
        </p>

        <h3>Can I use this for monthly interest?</h3>
        <p>
          This calculator assumes time in years. For months, convert months to years (e.g., 6 months = 0.5 years).
        </p>

        <h3>Why does total amount matter?</h3>
        <p>
          Total amount shows how much you'll have after the interest is added to the principal.
        </p>
      </section>
    </>
  )
}

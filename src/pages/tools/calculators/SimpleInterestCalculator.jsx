import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SimpleInterestCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Simple Interest Calculator — Calculate Interest Quickly"
        description="Compute simple interest and total amount using principal, rate, and time. Great for quick finance estimates."
        inputs={[
          { name: 'principal', label: 'Principal (P)', type: 'number', placeholder: 'Enter principal amount', defaultValue: '' },
          { name: 'rate', label: 'Rate (%)', type: 'number', placeholder: 'Enter annual interest rate', defaultValue: '' },
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
            totalAmount: isFinite(total) ? total : 'Invalid input',
            formula: `(P × R × T) ÷ 100 = ${interest}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Simple interest is calculated only on the original principal amount. It does not compound, so interest remains the same each period.
        </p>

        <h2>FAQ</h2>
        <h3>What is simple interest?</h3>
        <p>
          Simple interest is interest calculated on the principal only, without compounding. It is commonly used for short-term loans and investments.
        </p>

        <h3>How do I convert months to years?</h3>
        <p>
          Convert months to years by dividing by 12 (for example, 6 months = 0.5 years).
        </p>

        <h3>Why is the total amount useful?</h3>
        <p>
          Total amount tells you what you will have after interest is added to the principal, or what you will pay back on a loan.
        </p>
      </section>
    </>
  )
}

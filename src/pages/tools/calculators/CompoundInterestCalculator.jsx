import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CompoundInterestCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Compound Interest Calculator — Calculate Growth"
        description="Calculate compound interest and final amount based on principal, annual rate, and time in years. Compounding annually is assumed."
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
          const amount = p * Math.pow(1 + r / 100, t)
          const interest = amount - p
          return {
            totalAmount: isFinite(amount) ? amount : 'Invalid input',
            interest: isFinite(interest) ? interest : 'Invalid input',
            formula: `A = P × (1 + r/100)^t = ${amount}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Compound interest includes interest on the principal and on previously earned interest. This calculator assumes annual compounding for simplicity.
        </p>

        <h2>FAQ</h2>
        <h3>What is compounding?</h3>
        <p>
          Compounding means earning interest on interest. The more frequently interest compounds, the higher the total amount.
        </p>

        <h3>Can I change compounding frequency?</h3>
        <p>
          This tool uses annual compounding. For monthly or daily compounding, the formula would include a different compounding factor.
        </p>

        <h3>Why is the total amount higher than simple interest?</h3>
        <p>
          Compound interest grows faster because each period’s interest adds to the principal for the next period.</p>
      </section>
    </>
  )
}

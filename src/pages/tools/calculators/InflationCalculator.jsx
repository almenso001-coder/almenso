import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function InflationCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Inflation Calculator — Future Value of Money"
        description="See how inflation reduces purchasing power over time and calculate the equivalent future cost."
        inputs={[
          { name: 'currentAmount', label: 'Current Amount', type: 'number', placeholder: 'e.g., 1000', defaultValue: '' },
          { name: 'inflationRate', label: 'Annual Inflation Rate (%)', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
          { name: 'years', label: 'Years', type: 'number', placeholder: 'e.g., 10', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ currentAmount, inflationRate, years }) => {
          const amount = parseFloat(currentAmount)
          const rate = parseFloat(inflationRate) / 100
          const yrs = parseFloat(years)

          if ([amount, rate, yrs].some(v => Number.isNaN(v))) {
            return { error: 'Please enter valid numbers.' }
          }

          const future = amount * Math.pow(1 + rate, yrs)
          const purchasingPower = amount / Math.pow(1 + rate, yrs)

          return {
            futureValue: future.toFixed(2),
            equivalentToday: purchasingPower.toFixed(2),
            formula: 'Future = Present * (1 + rate)^years'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the amount you have today, an expected yearly inflation rate, and the number of years. Click Calculate to see the future value and the equivalent purchasing power in today’s terms.
        </p>
        <p>
          This tool assumes a steady inflation rate and compound growth for simplicity.
        </p>

        <h2>Benefits</h2>
        <p>
          Understanding inflation helps you plan for savings, retirement, and long-term expenses. It shows why money today is not the same as money tomorrow and highlights the need to invest rather than just save.
        </p>
        <p>
          It can help you set more realistic targets for future purchases and budgets.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include deflation?</h3>
        <p>
          Yes. If you enter a negative inflation rate, the calculator treats it as deflation and shows how purchasing power increases.
        </p>
        <h3>What if inflation changes every year?</h3>
        <p>
          This calculator uses a constant rate. For variable inflation, you can run it with an average rate or use a more detailed financial model.
        </p>
      </section>
    </>
  )
}

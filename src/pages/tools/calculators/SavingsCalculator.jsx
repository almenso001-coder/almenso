import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SavingsCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Savings Calculator — Plan Your Savings Goals" 
        description="Estimate how long it will take to reach a savings target based on monthly contributions and interest rate." 
        inputs={[
          { name: 'targetAmount', label: 'Target Amount', type: 'number', placeholder: 'Enter goal amount', defaultValue: '' },
          { name: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', placeholder: 'Enter monthly saving', defaultValue: '' },
          { name: 'annualInterestRate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'Enter yearly interest rate', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ targetAmount, monthlyContribution, annualInterestRate }) => {
          const goal = parseFloat(targetAmount)
          const monthly = parseFloat(monthlyContribution)
          const annualRate = parseFloat(annualInterestRate)
          if (Number.isNaN(goal) || Number.isNaN(monthly) || Number.isNaN(annualRate) || monthly <= 0) {
            return { error: 'Please enter valid numbers and ensure monthly contribution is greater than zero.' }
          }

          const r = annualRate / 100 / 12
          let months = 0
          let balance = 0

          while (balance < goal && months < 1000) {
            balance = balance * (1 + r) + monthly
            months += 1
          }

          if (months >= 1000) {
            return { error: 'Goal not reached within 1000 months. Try increasing contributions or adjusting your goal.' }
          }

          return {
            months,
            years: (months / 12).toFixed(2),
            formula: `Using monthly contributions and compound interest: balance after N months = previous balance * (1 + r) + monthly contribution.`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the amount you want to save, how much you can contribute monthly, and the interest rate you expect from your savings.
          This calculator estimates how many months it will take to reach your goal under consistent contributions.
        </p>

        <h2>Tips for faster savings</h2>
        <p>
          Increasing your monthly contribution or finding a higher-yield account can significantly reduce the time needed to reach your goal.
          Even small incremental increases compound over time.
        </p>

        <h2>FAQ</h2>
        <h3>Does it account for taxes or inflation?</h3>
        <p>
          No. This calculator assumes a flat interest rate and does not factor in taxes, fees, or inflation. Use it as a basic planning tool.
        </p>

        <h3>Can I use this for retirement planning?</h3>
        <p>
          This tool is a rough estimate for savings goals. For a full retirement plan, consider consulting a financial professional.
        </p>

        <h3>What if I want to save for multiple goals?</h3>
        <p>
          Run the calculator separately for each goal, or combine goals into a single total target amount.
        </p>
      </section>
    </>
  )
}

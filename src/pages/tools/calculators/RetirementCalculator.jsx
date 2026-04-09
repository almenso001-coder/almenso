import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function RetirementCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Retirement Calculator — Project Your Retirement Savings"
        description="Estimate how much your retirement savings will grow based on contributions and expected returns."
        inputs={[
          { name: 'currentAge', label: 'Current Age', type: 'number', placeholder: 'e.g., 35', defaultValue: '' },
          { name: 'retirementAge', label: 'Retirement Age', type: 'number', placeholder: 'e.g., 60', defaultValue: '' },
          { name: 'currentSavings', label: 'Current Savings', type: 'number', placeholder: 'e.g., 50000', defaultValue: '' },
          { name: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', placeholder: 'e.g., 1000', defaultValue: '' },
          { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number', placeholder: 'e.g., 6', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn }) => {
          const now = parseFloat(currentAge)
          const retire = parseFloat(retirementAge)
          const principal = parseFloat(currentSavings)
          const contribution = parseFloat(monthlyContribution)
          const annualRate = parseFloat(annualReturn) / 100

          if ([now, retire, principal, contribution, annualRate].some(v => Number.isNaN(v))) {
            return { error: 'Please enter valid numbers for all fields.' }
          }

          if (retire <= now) {
            return { error: 'Retirement age must be greater than current age.' }
          }

          const months = (retire - now) * 12
          const monthlyRate = annualRate / 12
          let balance = principal

          for (let i = 0; i < months; i += 1) {
            balance *= 1 + monthlyRate
            balance += contribution
          }

          return {
            yearsToRetirement: retire - now,
            monthsToRetirement: months,
            projectedBalance: balance.toFixed(2),
            formula: 'Future value of contributions compounded monthly'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide your current age, planned retirement age, current savings, monthly savings amount, and expected annual return. The calculator projects how much you may have at retirement.
        </p>
        <p>
          This is a simplified estimate. Real-world returns vary, and contributions may change over time.
        </p>

        <h2>Benefits</h2>
        <p>
          Use this tool to see whether you are on track for your retirement goals and whether you need to increase savings or adjust your expectations.
        </p>
        <p>
          It can help motivate regular contributions and provide a tangible long-term goal.
        </p>

        <h2>FAQ</h2>
        <h3>What rate should I use?</h3>
        <p>
          Choose a conservative estimate based on historical returns for your investment mix. 4-7% is common for balanced portfolios.
        </p>
        <h3>Does this include inflation?</h3>
        <p>
          No — this shows nominal dollars. Adjust your goal for inflation separately if you want a real purchasing power estimate.
        </p>
      </section>
    </>
  )
}

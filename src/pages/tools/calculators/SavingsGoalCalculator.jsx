import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SavingsGoalCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Savings Goal Calculator — Time to Reach Your Target"
        description="Estimate how long it will take to reach a savings goal based on monthly contributions and expected returns."
        inputs={[
          { name: 'currentSavings', label: 'Current Savings', type: 'number', placeholder: 'e.g., 10000', defaultValue: '' },
          { name: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', placeholder: 'e.g., 5000', defaultValue: '' },
          { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
          { name: 'goalAmount', label: 'Savings Goal', type: 'number', placeholder: 'e.g., 100000', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ currentSavings, monthlyContribution, annualReturn, goalAmount }) => {
          const principal = parseFloat(currentSavings)
          const contribution = parseFloat(monthlyContribution)
          const annualRate = parseFloat(annualReturn) / 100
          const goal = parseFloat(goalAmount)

          if ([principal, contribution, annualRate, goal].some(v => Number.isNaN(v))) {
            return { error: 'Please enter valid numbers for all fields.' }
          }

          if (goal <= principal) {
            return { message: 'You have already reached your goal!', months: 0 }
          }

          const monthlyRate = annualRate / 12
          let balance = principal
          let months = 0
          const maxMonths = 600 // 50 years

          while (balance < goal && months < maxMonths) {
            balance += contribution
            balance *= 1 + monthlyRate
            months += 1
          }

          if (months === maxMonths && balance < goal) {
            return { error: 'Goal not reached within 50 years with current contributions.' }
          }

          const years = Math.floor(months / 12)
          const remainingMonths = months % 12

          return {
            months,
            years,
            remainingMonths,
            projectedSavings: balance.toFixed(2),
            formula: 'Future value = (current + contributions) growing at annual return.'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide your current savings, how much you can add each month, the expected annual return, and your target amount. Click Calculate to see how many years and months it will take to hit your goal.
        </p>
        <p>
          If you are not sure about the return rate, choose a conservative number (e.g., 4-6%). The calculator assumes contributions happen monthly and returns compound monthly.
        </p>

        <h2>Benefits</h2>
        <p>
          A savings goal calculator helps you set realistic timelines and decide whether you need to adjust contributions or expected returns. It gives you a clear plan rather than a vague idea.
        </p>
        <p>
          Once you have a timeline, you can set milestones and track progress more easily, keeping motivation high.
        </p>

        <h2>FAQ</h2>
        <h3>Can I factor in inflation?</h3>
        <p>
          This tool shows nominal values. To account for inflation, reduce the annual return by an inflation rate or increase your goal accordingly.
        </p>
        <h3>What if my contributions change over time?</h3>
        <p>
          This version assumes a steady monthly contribution. For changing amounts, you can run the calculator multiple times or use a spreadsheet for a detailed plan.
        </p>
      </section>
    </>
  )
}

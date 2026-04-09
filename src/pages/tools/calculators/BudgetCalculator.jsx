import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BudgetCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Budget Calculator — Track Income & Expenses"
        description="Quickly calculate your monthly budget surplus or deficit from income and expenses."
        inputs={[
          { name: 'income', label: 'Total Monthly Income', type: 'number', placeholder: 'e.g., 50000', defaultValue: '' },
          { name: 'expenses', label: 'Total Monthly Expenses', type: 'number', placeholder: 'e.g., 42000', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ income, expenses }) => {
          const inc = parseFloat(income)
          const exp = parseFloat(expenses)
          if (Number.isNaN(inc) || Number.isNaN(exp)) {
            return { error: 'Please enter valid numbers for income and expenses.' }
          }

          const balance = inc - exp
          return {
            income: inc.toFixed(2),
            expenses: exp.toFixed(2),
            balance: balance.toFixed(2),
            status: balance >= 0 ? 'Surplus' : 'Deficit'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your total monthly income and your total monthly expenses. Click Calculate to see whether you are running a surplus (extra money) or deficit (overspending) for the month.
        </p>
        <p>
          Use this tool as a quick sanity check when planning monthly bills, savings, or setting spending goals.
        </p>

        <h2>Benefits</h2>
        <p>
          Understanding your budget at a glance helps you avoid debt, identify where to cut costs, and plan for savings. This tool works well as a simple check before you build a more detailed budget spreadsheet.
        </p>
        <p>
          It also helps you set priorities — knowing how much room you have can inform decisions about large purchases or extra savings contributions.
        </p>

        <h2>FAQ</h2>
        <h3>What counts as income?</h3>
        <p>
          Include your take-home pay, regular side income, and any predictable cash inflows. Exclude one-time windfalls unless you want to treat them as a special case.
        </p>
        <h3>How should I track expenses?</h3>
        <p>
          Add up recurring bills, groceries, subscriptions, and other regular expenses. It can help to review bank statements to make sure nothing is missed.
        </p>
      </section>
    </>
  )
}

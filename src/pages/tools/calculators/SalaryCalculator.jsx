import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SalaryCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Salary Calculator — Monthly Total Salary"
        description="Calculate your total monthly salary by adding bonus to your base monthly salary. Great for budgeting and salary planning."
        inputs={[
          { name: 'monthlySalary', label: 'Monthly Salary', type: 'number', placeholder: 'Enter monthly salary', defaultValue: '' },
          { name: 'bonus', label: 'Bonus', type: 'number', placeholder: 'Enter bonus amount', defaultValue: '0' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ monthlySalary, bonus }) => {
          const salary = parseFloat(monthlySalary)
          const b = parseFloat(bonus)
          if (Number.isNaN(salary) || Number.isNaN(b)) {
            return { error: 'Please enter valid numbers for salary and bonus.' }
          }
          const total = salary + b
          return {
            totalSalary: isFinite(total) ? total : 'Invalid input',
            formula: `Monthly Salary + Bonus = ${total}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Total salary includes your base monthly salary plus any bonuses or incentives received in that month. This calculator helps you see your total take-home pay before deductions.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include taxes?</h3>
        <p>
          No. This calculator only sums salary and bonus. Taxes and deductions are not included.
        </p>

        <h3>Can bonus be negative?</h3>
        <p>
          In most cases bonus is positive. If you enter a negative value, the calculator will subtract it from your salary.
        </p>

        <h3>Can I calculate annual salary?</h3>
        <p>
          Multiply the total monthly salary by 12 to estimate annual earnings.</p>
      </section>
    </>
  )
}

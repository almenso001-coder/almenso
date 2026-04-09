import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function AverageCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Average Calculator — Compute Mean Value" 
        description="Calculate the average of a list of numbers. Perfect for grades, budgets, or performance metrics." 
        inputs={[
          { name: 'values', label: 'Values (comma-separated)', type: 'text', placeholder: 'e.g., 10, 20, 30', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ values }) => {
          const nums = values
            .split(',')
            .map((v) => parseFloat(v.trim()))
            .filter((n) => !Number.isNaN(n))

          if (nums.length === 0) {
            return { error: 'Please enter at least one number.' }
          }

          const sum = nums.reduce((acc, n) => acc + n, 0)
          const avg = sum / nums.length

          return {
            average: isFinite(avg) ? avg : 'Invalid input',
            formula: `Average = (sum of values) / (number of values) = ${avg}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a list of numbers separated by commas. The calculator ignores non-numeric entries and computes the mean of the valid numbers.
        </p>

        <h2>When to use</h2>
        <p>
          Use this for calculating grade averages, budget spending, or any situation where you need a central tendency measure.
        </p>

        <h2>FAQ</h2>
        <h3>Can I include text or blanks?</h3>
        <p>
          Non-numeric values are ignored. Only numbers contribute to the average.
        </p>

        <h3>What if I want a median or mode?</h3>
        <p>
          This tool calculates the arithmetic mean. For median or mode, use a dedicated statistics calculator.
        </p>

        <h3>How many values can I enter?</h3>
        <p>
          You can enter as many as your browser will comfortably handle. For very large lists, consider using spreadsheet software.
        </p>
      </section>
    </>
  )
}

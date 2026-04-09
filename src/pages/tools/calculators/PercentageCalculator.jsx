import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PercentageCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Percentage Calculator – Calculate Percentages Online"
        description="Calculate percentages easily with our free percentage calculator tool. Enter a number and percentage, then hit Calculate to see the result instantly."
        inputs={[
          { name: 'number', label: 'Number', type: 'number', placeholder: 'Enter a number', defaultValue: '' },
          { name: 'percentage', label: 'Percentage', type: 'number', placeholder: 'Enter percentage (e.g. 15)', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ number, percentage }) => {
          const a = parseFloat(number)
          const p = parseFloat(percentage)
          if (Number.isNaN(a) || Number.isNaN(p)) {
            return { error: 'Please enter valid numbers.' }
          }
          const result = (a * p) / 100
          return {
            result: isFinite(result) ? result : 'Invalid input',
            formula: `${number} × ${percentage} ÷ 100 = ${result}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          To calculate a percentage of a number, multiply the number by the percentage and divide by 100.
          For example, 20% of 50 is calculated as (50 × 20) ÷ 100 = 10.
        </p>

        <h2>FAQ</h2>
        <h3>What does the percentage value mean?</h3>
        <p>
          The percentage value represents how much out of 100 you want to take. 50% means half, 25% means one quarter, and so on.
        </p>

        <h3>Can I use decimals?</h3>
        <p>
          Yes. You can enter decimal values like 12.5 to get a precise result.
        </p>

        <h3>Why is the result wrong sometimes?</h3>
        <p>
          Make sure you entered valid numeric values for both fields. Empty input or non-numbers will not calculate correctly.
        </p>
      </section>
    </>
  )
}

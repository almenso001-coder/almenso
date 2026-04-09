import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CommissionCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Commission Calculator — Commission Amount" 
        description="Calculate commission earned based on sales amount and commission rate." 
        inputs={[
          { name: 'sales', label: 'Sales Amount', type: 'number', placeholder: 'Enter total sales', defaultValue: '' },
          { name: 'rate', label: 'Commission Rate (%)', type: 'number', placeholder: 'Enter commission rate', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ sales, rate }) => {
          const s = parseFloat(sales)
          const r = parseFloat(rate)
          if (Number.isNaN(s) || Number.isNaN(r)) {
            return { error: 'Please enter valid numbers for sales and commission rate.' }
          }
          const commission = (s * r) / 100
          return {
            commission: isFinite(commission) ? commission : 'Invalid input',
            formula: `(Sales × Rate) ÷ 100 = ${commission}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total sales amount and the commission rate percentage. This tool calculates how much commission is earned based on the sales performance.
          It can be used for sales teams, affiliate programs, or any commission-based compensation structure.
        </p>

        <h2>Benefits</h2>
        <p>
          Quickly estimate earnings from commission, compare different rate structures, and plan your revenue goals. It removes guesswork and provides clarity on how sales volume translates into income.
        </p>

        <h2>FAQ</h2>
        <h3>What if the commission rate is a fixed amount?</h3>
        <p>
          This calculator assumes a percentage rate. If you have a fixed commission amount per sale, simply multiply by number of sales outside this tool.
        </p>

        <h3>Can I use it for tiered commissions?</h3>
        <p>
          For tiered commission structures, calculate each tier separately and add the results. This tool handles a single percentage rate.
        </p>

        <h3>Does it include taxes?</h3>
        <p>
          No. Commission is calculated before taxes. Apply tax deductions separately as required.
        </p>
      </section>
    </>
  )
}

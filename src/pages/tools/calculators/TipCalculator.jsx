import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function TipCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Tip Calculator — Calculate Tip & Total Bill"
        description="Quickly calculate the tip amount and total bill based on bill amount and tip percentage. Great for dining out."
        inputs={[
          { name: 'billAmount', label: 'Bill Amount', type: 'number', placeholder: 'Enter bill amount', defaultValue: '' },
          { name: 'tipPercentage', label: 'Tip (%)', type: 'number', placeholder: 'Enter tip percentage', defaultValue: '10' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ billAmount, tipPercentage }) => {
          const bill = parseFloat(billAmount)
          const tipPct = parseFloat(tipPercentage)
          if (Number.isNaN(bill) || Number.isNaN(tipPct)) {
            return { error: 'Please enter valid numbers for bill amount and tip percentage.' }
          }
          const tip = (bill * tipPct) / 100
          const total = bill + tip
          return {
            tipAmount: isFinite(tip) ? tip : 'Invalid input',
            totalBill: isFinite(total) ? total : 'Invalid input',
            formula: `(Bill × Tip%) ÷ 100 = ${tip}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Tip is usually a percentage of the bill amount. This calculator shows the tip amount and the total amount including tip.
        </p>

        <h2>FAQ</h2>
        <h3>What tip percentage should I use?</h3>
        <p>
          Common tip rates are 10–20%. Choose based on service quality and local norms.
        </p>

        <h3>Does this include taxes?</h3>
        <p>
          No. Tip is calculated on the bill amount you enter. Include tax in the bill amount if you want it factored in.
        </p>

        <h3>Can I split the bill?</h3>
        <p>
          This calculator does not split the bill, but you can divide the total by the number of people after computing the total.
        </p>
      </section>
    </>
  )
}

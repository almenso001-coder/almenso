import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function GSTCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free GST Calculator – Calculate GST Online"
        description="Calculate GST amount and totals instantly. Enter the base amount and GST rate to see GST value and final price."
        inputs={[
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter base amount', defaultValue: '' },
          { name: 'gstRate', label: 'GST Rate (%)', type: 'number', placeholder: 'Enter GST rate (e.g. 18)', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ amount, gstRate }) => {
          const a = parseFloat(amount)
          const r = parseFloat(gstRate)
          if (Number.isNaN(a) || Number.isNaN(r)) {
            return { error: 'Please enter valid numbers for amount and GST rate.' }
          }
          const gst = (a * r) / 100
          const total = a + gst
          return {
            gst: isFinite(gst) ? gst : 'Invalid input',
            total: isFinite(total) ? total : 'Invalid input',
            formula: `${amount} × ${gstRate} ÷ 100 = ${gst}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          GST (Goods and Services Tax) is calculated as a percentage of the base amount. Multiply the amount by the GST rate, then divide by 100 to get the GST amount. Add the GST amount to the base amount to get the final total.
        </p>

        <h2>FAQ</h2>
        <h3>What is the GST rate?</h3>
        <p>
          GST rate is the percentage applied on goods or services. Common rates in India are 5%, 12%, 18%, and 28%.
        </p>

        <h3>Does this calculate inclusive or exclusive GST?</h3>
        <p>
          This calculator assumes the amount you enter is the base amount (exclusive of GST). To compute inclusive GST, subtract the GST portion from the inclusive amount (not supported here).
        </p>

        <h3>Why do I need the total amount?</h3>
        <p>
          The total amount helps you see how much you will pay after adding GST to the base price.
        </p>
      </section>
    </>
  )
}

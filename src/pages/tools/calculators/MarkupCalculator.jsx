import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function MarkupCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Markup Calculator — Calculate Markup Percentage" 
        description="Calculate markup percentage based on cost price and selling price, or find selling price for a desired markup." 
        inputs={[
          { name: 'costPrice', label: 'Cost Price', type: 'number', placeholder: 'Enter cost price', defaultValue: '' },
          { name: 'sellingPrice', label: 'Selling Price', type: 'number', placeholder: 'Enter selling price', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ costPrice, sellingPrice }) => {
          const cp = parseFloat(costPrice)
          const sp = parseFloat(sellingPrice)
          if (Number.isNaN(cp) || Number.isNaN(sp) || cp === 0) {
            return { error: 'Please enter valid numbers and ensure cost price is non-zero.' }
          }
          const markup = ((sp - cp) / cp) * 100
          return {
            markup: isFinite(markup) ? markup : 'Invalid input',
            formula: `Markup % = ((SP - CP) / CP) × 100 = ${markup}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the cost price and the desired selling price. The calculator computes the markup percentage, which shows how much more the selling price is compared to the cost.
          This helps you set prices that cover costs and deliver profit while staying competitive.
        </p>

        <h2>Benefits</h2>
        <p>
          Use markup to maintain consistent margins across products. It’s especially useful in retail and manufacturing to ensure every sale contributes a predictable profit percentage.
          Understanding markup also helps in negotiating supplier prices and setting discount policies.
        </p>

        <h2>FAQ</h2>
        <h3>How is markup different from margin?</h3>
        <p>
          Markup is based on cost price; margin is based on selling price. A 20% markup does not equal a 20% margin.
        </p>

        <h3>Can markup be negative?</h3>
        <p>
          Yes. Negative markup means selling below cost, resulting in a loss.
        </p>

        <h3>How do I use this for target margin?
        </h3>
        <p>
          To target a margin, use a margin calculator instead. This tool focuses on markup relative to cost.
        </p>
      </section>
    </>
  )
}

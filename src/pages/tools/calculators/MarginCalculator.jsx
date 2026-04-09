import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function MarginCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Margin Calculator — Calculate Profit Margin" 
        description="Calculate profit margin percentage based on cost or selling price. Use it to understand profitability and price competitiveness." 
        inputs={[
          { name: 'costPrice', label: 'Cost Price', type: 'number', placeholder: 'Enter cost price', defaultValue: '' },
          { name: 'sellingPrice', label: 'Selling Price', type: 'number', placeholder: 'Enter selling price', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ costPrice, sellingPrice }) => {
          const cp = parseFloat(costPrice)
          const sp = parseFloat(sellingPrice)
          if (Number.isNaN(cp) || Number.isNaN(sp) || sp === 0) {
            return { error: 'Please enter valid numbers and ensure selling price is non-zero.' }
          }
          const margin = ((sp - cp) / sp) * 100
          return {
            margin: isFinite(margin) ? margin : 'Invalid input',
            formula: `Margin % = ((SP - CP) / SP) × 100 = ${margin}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your cost and selling price to calculate how much profit you keep from each sale as a percentage of the selling price.
          This is useful for pricing products competitively while ensuring profitable operations.
        </p>

        <h2>Why margin matters</h2>
        <p>
          Margin gives insight into profitability per sale. A higher margin leaves more room for discounts, marketing, and covering fixed costs.
          It’s especially important in industries with tight price competition.
        </p>

        <h2>FAQ</h2>
        <h3>What is a good margin percentage?</h3>
        <p>
          It depends on the industry. Retail typically targets 30–50%, while services may have higher margins.
        </p>

        <h3>Can margin exceed 100%?</h3>
        <p>
          No. Margin is capped at 100% when cost is zero. If cost is zero, the calculation is not meaningful.
        </p>

        <h3>Margin vs markup?</h3>
        <p>
          Margin is profit as a percentage of selling price; markup is based on cost. Use the markup calculator to compare.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ProfitMarginCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Profit Margin Calculator — Business Margin %" 
        description="Calculate profit margin from cost price and selling price. Useful for pricing, retail, and small business planning."
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
            return { error: 'Please enter valid numbers for cost price and selling price (selling price must be non-zero).' }
          }
          const margin = ((sp - cp) / sp) * 100
          return {
            profitMargin: isFinite(margin) ? margin : 'Invalid input',
            formula: `((SP - CP) / SP) × 100 = ${margin}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Profit margin shows how much of the selling price is profit. It is calculated as (selling price - cost price) divided by selling price, then multiplied by 100.
        </p>

        <h2>FAQ</h2>
        <h3>Why use selling price in the formula?</h3>
        <p>
          Profit margin is a percentage of the selling price, which is useful for comparing profitability across products and industries.
        </p>

        <h3>What if the selling price is lower than cost price?</h3>
        <p>
          If the selling price is lower than the cost price, the profit margin will be negative, indicating a loss.
        </p>

        <h3>How is margin different from markup?</h3>
        <p>
          Margin is profit divided by selling price. Markup is profit divided by cost price. Margin and markup are related but not the same.
        </p>
      </section>
    </>
  )
}

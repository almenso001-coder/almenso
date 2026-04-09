import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ProfitCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Profit Calculator — Calculate Profit & Loss"
        description="Calculate profit or loss by entering cost price and selling price. The tool shows the profit/loss amount and percentage."
        inputs={[
          { name: 'costPrice', label: 'Cost Price', type: 'number', placeholder: 'Enter cost price', defaultValue: '' },
          { name: 'sellingPrice', label: 'Selling Price', type: 'number', placeholder: 'Enter selling price', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ costPrice, sellingPrice }) => {
          const cp = parseFloat(costPrice)
          const sp = parseFloat(sellingPrice)
          if (Number.isNaN(cp) || Number.isNaN(sp)) {
            return { error: 'Please enter valid numbers for cost and selling price.' }
          }
          const profit = sp - cp
          const percent = cp === 0 ? 0 : (profit / cp) * 100
          return {
            profit: isFinite(profit) ? profit : 'Invalid input',
            profitPercent: isFinite(percent) ? percent : 'Invalid input',
            formula: `Profit = Selling - Cost; % = (Profit / Cost) × 100 = ${percent}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the cost price (what you paid) and the selling price (what you sold it for). The calculator determines whether you made a profit or loss,
          how much money you gained or lost, and what percentage of the cost the profit represents.
          This is helpful for retail, e-commerce, and small businesses to understand margins and price strategy.
        </p>

        <h2>Benefits</h2>
        <p>
          Easily see the money impact of pricing decisions. Use it when pricing goods, evaluating deals, or checking whether discounts still yield profit.
          The percentage metric helps compare products even when their absolute values differ.
        </p>

        <h2>FAQ</h2>
        <h3>What if it shows a negative value?</h3>
        <p>
          A negative value means a loss — you sold below your cost price. The percentage will also be negative, indicating the loss relative to cost.
        </p>

        <h3>Can I use it for wholesale pricing?</h3>
        <p>
          Yes. Enter the purchase price as cost and the selling price as the wholesale rate. The tool works for any buy-sell scenario.
        </p>

        <h3>Does it include taxes?</h3>
        <p>
          No. Taxes, shipping, and other expenses are not included. Add those costs to the cost price if you want a more accurate picture.
        </p>
      </section>
    </>
  )
}

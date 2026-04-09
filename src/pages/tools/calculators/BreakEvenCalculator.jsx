import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BreakEvenCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Break Even Calculator — Find Sales Needed" 
        description="Calculate how many units need to be sold to cover fixed and variable costs. Great for business planning." 
        inputs={[
          { name: 'fixedCost', label: 'Fixed Cost', type: 'number', placeholder: 'Enter fixed costs', defaultValue: '' },
          { name: 'variableCost', label: 'Variable Cost per Unit', type: 'number', placeholder: 'Enter variable cost per unit', defaultValue: '' },
          { name: 'pricePerUnit', label: 'Price per Unit', type: 'number', placeholder: 'Enter selling price per unit', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ fixedCost, variableCost, pricePerUnit }) => {
          const f = parseFloat(fixedCost)
          const v = parseFloat(variableCost)
          const p = parseFloat(pricePerUnit)
          if (Number.isNaN(f) || Number.isNaN(v) || Number.isNaN(p) || p <= v) {
            return { error: 'Please enter valid numbers and ensure price per unit is greater than variable cost.' }
          }
          const units = f / (p - v)
          return {
            units: isFinite(units) ? units : 'Invalid input',
            formula: `Break-even units = Fixed cost ÷ (Price - Variable cost) = ${units}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your fixed costs (rent, salaries, etc.), variable cost per item (materials, production), and the selling price per unit. The calculator shows how many units you must sell to cover all costs.
          This helps you set sales targets and understand when your business will start generating profit.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your break-even point helps you make smarter pricing and production decisions. It tells you the minimum volume needed to avoid loss, which is crucial for startups and project planning.
          Use it to evaluate product viability and guide marketing and sales efforts.
        </p>

        <h2>FAQ</h2>
        <h3>What happens if price equals variable cost?</h3>
        <p>
          If price equals variable cost, you never cover fixed costs no matter how many units you sell, because each sale adds no profit.
        </p>

        <h3>Can fixed costs change?</h3>
        <p>
          Yes. If fixed costs change, recalculate the break-even point. This helps you see how cost reductions impact required sales.
        </p>

        <h3>Do I include taxes?</h3>
        <p>
          Typically, you exclude taxes from the price and cost calculations and handle them separately. Include them if they are part of your direct sales cost.
        </p>
      </section>
    </>
  )
}

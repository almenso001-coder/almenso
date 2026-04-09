import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CostPerUnitCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Cost Per Unit Calculator — Price per Item"
        description="Compute the unit cost by dividing total cost by number of units."
        inputs={[
          { name: 'totalCost', label: 'Total Cost', type: 'number', placeholder: 'e.g., 1200', defaultValue: '' },
          { name: 'units', label: 'Units', type: 'number', placeholder: 'e.g., 50', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ totalCost, units }) => {
          const cost = parseFloat(totalCost)
          const u = parseFloat(units)

          if (Number.isNaN(cost) || Number.isNaN(u) || u <= 0) {
            return { error: 'Enter valid numbers and units must be greater than zero.' }
          }

          return {
            costPerUnit: (cost / u).toFixed(4),
            formula: 'Cost per unit = Total cost / Units'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total cost and the number of units purchased. Click Calculate to see the price per unit.
        </p>
        <p>
          This is useful for comparing pack sizes, bulk pricing, and determining if a deal is truly better value.
        </p>

        <h2>Benefits</h2>
        <p>
          A cost per unit calculation helps you make smart buying decisions and avoid misleading pricing.
        </p>
        <p>
          It also helps businesses price products accurately and understand margins.
        </p>

        <h2>FAQ</h2>
        <h3>Can units be weight or volume?</h3>
        <p>
          Yes. Units can represent pieces, kilos, liters, or any measurable quantity.
        </p>
        <h3>What if packaging adds extra value?</h3>
        <p>
          If packaging adds significant value, consider whether it should be included in the total cost or treated separately.
        </p>
      </section>
    </>
  )
}

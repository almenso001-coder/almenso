import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ElectricityBillCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Electricity Bill Calculator — Estimate Your Bill" 
        description="Estimate your electricity bill based on units consumed, rate per unit, and any fixed charges."
        inputs={[
          { name: 'units', label: 'Units Consumed (kWh)', type: 'number', placeholder: 'Enter units consumed', defaultValue: '' },
          { name: 'rate', label: 'Rate (₹/kWh)', type: 'number', placeholder: 'Enter rate per unit', defaultValue: '' },
          { name: 'fixedCharge', label: 'Fixed Charges (₹)', type: 'number', placeholder: 'Enter fixed charges', defaultValue: '0' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ units, rate, fixedCharge }) => {
          const u = parseFloat(units)
          const r = parseFloat(rate)
          const f = parseFloat(fixedCharge)
          if (Number.isNaN(u) || Number.isNaN(r) || Number.isNaN(f) || u < 0 || r < 0 || f < 0) {
            return { error: 'Please enter valid non-negative numbers for units, rate, and charges.' }
          }
          const energyCost = u * r
          const total = energyCost + f
          return {
            energyCost: isFinite(energyCost) ? energyCost : 'Invalid input',
            totalBill: isFinite(total) ? total : 'Invalid input',
            formula: `Bill = (Units × Rate) + Fixed = ${total}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the number of units consumed (kWh), the rate per unit charged by your provider, and any fixed monthly charges such as meter rent or service fees.
          The calculator multiplies units by rate and adds fixed charges to estimate your total bill.
        </p>

        <h2>Benefits</h2>
        <p>
          This tool helps you understand your electricity expenses and forecast bills based on consumption. It is useful for budgeting and tracking how changes in usage affect costs.
        </p>

        <h2>FAQ</h2>
        <h3>Does it account for slab rates?</h3>
        <p>
          No. This calculator uses a single rate. For slab-based billing, calculate each slab separately or use a specialized bill analyzer.
        </p>

        <h3>What are fixed charges?</h3>
        <p>
          Fixed charges are fees applied regardless of consumption, such as meter rent or standing charges. Include them to estimate the full bill.
        </p>

        <h3>Can I use it for different billing periods?</h3>
        <p>
          Yes. Just use the total units consumed and the rate for that period to estimate the bill for any billing cycle.
        </p>
      </section>
    </>
  )
}

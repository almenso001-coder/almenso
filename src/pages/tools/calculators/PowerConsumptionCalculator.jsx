import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PowerConsumptionCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Power Consumption Calculator — kWh & Cost" 
        description="Calculate electricity consumption and cost using appliance wattage, daily usage, and unit rate."
        inputs={[
          { name: 'wattage', label: 'Wattage (W)', type: 'number', placeholder: 'Enter appliance wattage', defaultValue: '' },
          { name: 'hoursPerDay', label: 'Hours per Day', type: 'number', placeholder: 'Enter hours used per day', defaultValue: '' },
          { name: 'rate', label: 'Electricity Rate (₹/kWh)', type: 'number', placeholder: 'Enter rate per unit', defaultValue: '' },
          { name: 'days', label: 'Days', type: 'number', placeholder: 'Enter number of days', defaultValue: '30' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="inverter"
        formula={({ wattage, hoursPerDay, rate, days }) => {
          const w = parseFloat(wattage)
          const h = parseFloat(hoursPerDay)
          const r = parseFloat(rate)
          const d = parseFloat(days)
          if (Number.isNaN(w) || Number.isNaN(h) || Number.isNaN(r) || Number.isNaN(d)) {
            return { error: 'Please enter valid numbers for wattage, hours, rate, and days.' }
          }
          const kwhPerDay = (w * h) / 1000
          const monthlyKwh = kwhPerDay * d
          const cost = monthlyKwh * r
          return {
            monthlyKwh: isFinite(monthlyKwh) ? monthlyKwh : 'Invalid input',
            monthlyCost: isFinite(cost) ? cost : 'Invalid input',
            formula: `(W × h ÷ 1000) × days × rate = ${cost}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the appliance wattage, how many hours you use it per day, the electricity rate (₹ per kWh), and the number of days you want to calculate for.
          The calculator converts watts to kilowatt-hours and multiplies by the rate and days to estimate monthly energy consumption and cost.
        </p>

        <h2>Benefits</h2>
        <p>
          This helps you understand which appliances consume the most energy and how much they contribute to your electricity bill.
          With the insight, you can adjust usage or replace devices with more efficient alternatives.
        </p>

        <h2>FAQ</h2>
        <h3>What is kWh?</h3>
        <p>
          kWh is a unit of energy (kilowatt-hour). It measures how much power is used over time: 1 kW of power used for 1 hour equals 1 kWh.
        </p>

        <h3>Does this include taxes and charges?</h3>
        <p>
          No. This calculator estimates only the energy cost based on the rate you provide. Taxes and fixed charges are not included.
        </p>

        <h3>How can I lower costs?</h3>
        <p>
          Reduce usage, switch to energy-efficient appliances, and compare rates from different providers to lower your bill.
        </p>
      </section>
    </>
  )
}

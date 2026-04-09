import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ElectricityCostCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Electricity Cost Calculator – Estimate Monthly Electricity Bill"
        description="Estimate your monthly electricity cost by entering appliance power, daily usage hours, and electricity rate. Great for budgeting and saving energy."
        inputs={[
          { name: 'power', label: 'Power (Watts)', type: 'number', placeholder: 'Enter power in watts', defaultValue: '' },
          { name: 'hoursPerDay', label: 'Hours per Day', type: 'number', placeholder: 'Enter hours used per day', defaultValue: '' },
          { name: 'rate', label: 'Electricity Rate (₹ / kWh)', type: 'number', placeholder: 'Enter electricity rate per unit', defaultValue: '' },
          { name: 'daysPerMonth', label: 'Days per Month', type: 'number', placeholder: 'Enter billing days (e.g. 30)', defaultValue: '30' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ power, hoursPerDay, rate, daysPerMonth }) => {
          const p = parseFloat(power)
          const h = parseFloat(hoursPerDay)
          const r = parseFloat(rate)
          const d = parseFloat(daysPerMonth)
          if (Number.isNaN(p) || Number.isNaN(h) || Number.isNaN(r) || Number.isNaN(d)) {
            return { error: 'Please enter valid numbers for power, hours, rate and days.' }
          }

          const kwhPerDay = (p / 1000) * h
          const monthlyKwh = kwhPerDay * d
          const monthlyCost = monthlyKwh * r
          const dailyCost = kwhPerDay * r
          const yearlyCost = monthlyCost * 12

          return {
            dailyCost: isFinite(dailyCost) ? dailyCost : 'Invalid input',
            monthlyCost: isFinite(monthlyCost) ? monthlyCost : 'Invalid input',
            yearlyCost: isFinite(yearlyCost) ? yearlyCost : 'Invalid input',
            formula: `(Power / 1000) × Hours × Days × Rate = ${monthlyCost}`,
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Electricity cost is based on the energy consumed (kWh). Convert watts to kilowatts, multiply by hours per day and days in the billing cycle to get monthly kWh.
          Multiply monthly energy usage by your electricity rate (₹ per kWh) to estimate the monthly bill.
        </p>

        <h2>FAQ</h2>
        <h3>What is kWh?</h3>
        <p>
          kWh (kilowatt-hour) is a unit of energy. It represents running a 1 kW appliance for 1 hour. Most electricity bills charge per kWh.
        </p>

        <h3>How do I find my electricity rate?</h3>
        <p>
          Check your latest electricity bill for the rate per unit (kWh). In India, it is usually shown as ₹/unit.
        </p>

        <h3>Can I use this for multiple appliances?</h3>
        <p>
          This calculator estimates cost for a single appliance. To estimate multiple appliances, calculate each separately and add the results.
        </p>
      </section>
    </>
  )
}

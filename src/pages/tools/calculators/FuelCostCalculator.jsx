import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function FuelCostCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Fuel Cost Calculator — Estimate Trip Fuel Cost"
        description="Calculate how much fuel you need and what it will cost for a trip based on distance, fuel efficiency, and fuel price."
        inputs={[
          { name: 'distance', label: 'Distance (km)', type: 'number', placeholder: 'Enter distance to travel', defaultValue: '' },
          { name: 'efficiency', label: 'Fuel Efficiency (km/l)', type: 'number', placeholder: 'Enter vehicle km per liter', defaultValue: '' },
          { name: 'price', label: 'Fuel Price (₹/l)', type: 'number', placeholder: 'Enter fuel price per liter', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ distance, efficiency, price }) => {
          const d = parseFloat(distance)
          const e = parseFloat(efficiency)
          const p = parseFloat(price)
          if (Number.isNaN(d) || Number.isNaN(e) || Number.isNaN(p) || e <= 0) {
            return { error: 'Please enter valid numbers and ensure fuel efficiency is greater than zero.' }
          }
          const liters = d / e
          const cost = liters * p
          return {
            liters: isFinite(liters) ? liters : 'Invalid input',
            cost: isFinite(cost) ? cost : 'Invalid input',
            formula: `Fuel needed = Distance ÷ Efficiency = ${liters} L`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the trip distance in kilometers, your vehicle’s fuel efficiency (km per liter), and the fuel price per liter.
          The calculator estimates the total liters required and the total fuel cost for the trip. This helps you budget for fuel and compare route options.
        </p>

        <h2>Benefits</h2>
        <p>
          Fuel cost estimates help you plan trips and manage expenses. Use this tool to compare the cost of different vehicles or routes and to decide whether to refuel before a long journey.
          It also helps in calculating monthly fuel spending for commuting.
        </p>

        <h2>FAQ</h2>
        <h3>What if I have a hybrid or electric vehicle?</h3>
        <p>
          This calculator is based on fuel consumption. For electric vehicles, calculate energy consumption separately (kWh per km) and use a different tool.
        </p>

        <h3>Can I use it for round trips?</h3>
        <p>
          Yes. Enter the total round trip distance. If you only know one-way distance, double it before entering.
        </p>

        <h3>How accurate is the estimate?</h3>
        <p>
          This is an estimate based on constant fuel efficiency. Real-world conditions like traffic, speed, and load can affect actual fuel usage.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SolarPanelCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Solar Panel Calculator — Estimate Energy Production" 
        description="Estimate daily and monthly energy output from solar panels using panel wattage, sun hours, and number of panels."
        inputs={[
          { name: 'panelWatt', label: 'Panel Wattage (W)', type: 'number', placeholder: 'Enter panel wattage', defaultValue: '' },
          { name: 'sunHours', label: 'Sun Hours per Day', type: 'number', placeholder: 'Enter average sun hours', defaultValue: '5' },
          { name: 'panelCount', label: 'Number of Panels', type: 'number', placeholder: 'Enter number of panels', defaultValue: '1' },
        ]}
        affCategory="solar"
      hasResult={true}
      serviceCategory="solar"
        formula={({ panelWatt, sunHours, panelCount }) => {
          const watt = parseFloat(panelWatt)
          const hours = parseFloat(sunHours)
          const count = parseFloat(panelCount)
          if (Number.isNaN(watt) || Number.isNaN(hours) || Number.isNaN(count) || watt <= 0 || hours <= 0 || count <= 0) {
            return { error: 'Please enter valid positive numbers for wattage, sun hours, and panel count.' }
          }
          const dailyKwh = (watt * hours * count) / 1000
          const monthlyKwh = dailyKwh * 30
          return {
            dailyKwh: isFinite(dailyKwh) ? dailyKwh : 'Invalid input',
            monthlyKwh: isFinite(monthlyKwh) ? monthlyKwh : 'Invalid input',
            formula: `(W × h × panels) ÷ 1000 = ${dailyKwh} kWh/day`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the wattage of a single solar panel, the average sun hours per day for your location, and the number of panels you have.
          The calculator estimates daily and monthly energy production in kilowatt-hours. This helps you plan system size and expected output.
        </p>

        <h2>Benefits</h2>
        <p>
          Estimating solar energy helps you understand how much electricity you can generate, compare system sizes, and estimate savings.
          It also provides a simple baseline before considering losses from efficiency, shading, and temperature.
        </p>

        <h2>FAQ</h2>
        <h3>What are sun hours?</h3>
        <p>
          Sun hours represent the equivalent number of hours per day when solar irradiance is ideal (~1000 W/m²). It varies by location and season.
        </p>

        <h3>Does this include system losses?</h3>
        <p>
          No. This is a theoretical estimate. Real output is usually lower due to inverter losses, wiring, and shading.
        </p>

        <h3>Can I use it to size a battery?</h3>
        <p>
          Yes. Use the daily kWh figure to estimate how much storage you need to cover cloudy days or nighttime usage.
        </p>
      </section>
    </>
  )
}

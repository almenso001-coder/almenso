import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function EnergyConsumptionCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Energy Consumption Calculator — kWh and Cost"
        description="Estimate energy usage in kWh and cost based on power and hours."
        inputs={[
          { name: 'powerWatts', label: 'Power (Watts)', type: 'number', placeholder: 'e.g., 100', defaultValue: '' },
          { name: 'hours', label: 'Hours Used', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
          { name: 'costPerKWh', label: 'Cost per kWh', type: 'number', placeholder: 'e.g., 0.12', defaultValue: '0.12' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ powerWatts, hours, costPerKWh }) => {
          const watts = parseFloat(powerWatts)
          const hrs = parseFloat(hours)
          const rate = parseFloat(costPerKWh)

          if ([watts, hrs, rate].some(v => Number.isNaN(v) || v < 0)) {
            return { error: 'Enter valid non-negative numbers.' }
          }

          const kwh = (watts * hrs) / 1000
          const cost = kwh * rate
          return { kWh: kwh.toFixed(3), cost: cost.toFixed(2), formula: 'kWh = (Watts × Hours) / 1000' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the appliance power in watts, how long it runs, and the electricity cost per kWh. Click Calculate to estimate energy consumed and the resulting cost.
        </p>
        <p>
          This is helpful for planning energy usage and finding the most expensive devices to run.
        </p>

        <h2>Benefits</h2>
        <p>
          Understanding energy consumption helps you reduce bills and make informed choices about efficient appliances.
        </p>
        <p>
          It also aids in comparing devices and calculating savings from upgrades.
        </p>

        <h2>FAQ</h2>
        <h3>What if my appliance power is in amps?</h3>
        <p>
          Convert amps to watts by multiplying by voltage (Watts = Amps × Volts) before using this tool.
        </p>
        <h3>Does this include standby power?</h3>
        <p>
          Only if you include the standby wattage and hours in the inputs.
        </p>
      </section>
    </>
  )
}

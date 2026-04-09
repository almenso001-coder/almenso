import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BatteryBackupCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Battery Backup Calculator — Estimate Backup Time" 
        description="Estimate how long a battery can power a load based on battery capacity, voltage, and power draw."
        inputs={[
          { name: 'capacity', label: 'Battery Capacity (Ah)', type: 'number', placeholder: 'Enter capacity in ampere-hours', defaultValue: '' },
          { name: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: 'Enter battery voltage', defaultValue: '12' },
          { name: 'load', label: 'Load (W)', type: 'number', placeholder: 'Enter load power in watts', defaultValue: '' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="inverter"
        formula={({ capacity, voltage, load }) => {
          const ah = parseFloat(capacity)
          const v = parseFloat(voltage)
          const w = parseFloat(load)
          if (Number.isNaN(ah) || Number.isNaN(v) || Number.isNaN(w) || ah <= 0 || v <= 0 || w <= 0) {
            return { error: 'Please enter valid positive numbers for capacity, voltage, and load.' }
          }
          const wattHours = ah * v
          const hours = wattHours / w
          return {
            backupHours: isFinite(hours) ? hours : 'Invalid input',
            wattHours: isFinite(wattHours) ? wattHours : 'Invalid input',
            formula: `Backup hours = (Ah × V) ÷ W = ${hours}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your battery capacity in ampere-hours (Ah), the battery voltage in volts, and the power draw of the load in watts.
          This calculator computes total energy available (watt-hours) and divides by the load power to estimate how long the battery can run the equipment.
        </p>

        <h2>Benefits</h2>
        <p>
          Use this tool to size batteries for UPS systems, solar setups, or backup power. It helps you understand how long a given battery can support a particular load and informs decisions about battery capacity and load management.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include inefficiencies?</h3>
        <p>
          No. This is a theoretical estimate. Real systems have losses due to inverter efficiency, battery aging, temperature, and wiring. Expect actual runtime to be lower.
        </p>

        <h3>What if I have multiple batteries?</h3>
        <p>
          For batteries in parallel, add their amp-hours. For series, keep the same amp-hours and add voltages. Then use the resulting voltage and capacity in this tool.
        </p>

        <h3>Can I use it for solar power?</h3>
        <p>
          Yes. It helps estimate how long stored energy will last when running appliances during low-sun periods.
        </p>
      </section>
    </>
  )
}

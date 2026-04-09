import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ElectricalLoadCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Electrical Load Calculator"
        description="Estimate total electrical load by summing wattage of appliances and converting to amps."
        inputs={[
          { name: 'totalWatts', label: 'Total Wattage (W)', type: 'number', placeholder: 'e.g., 3000', defaultValue: '' },
          { name: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: 'e.g., 230', defaultValue: '230' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ totalWatts, voltage }) => {
          const watts = parseFloat(totalWatts)
          const v = parseFloat(voltage)
          if (Number.isNaN(watts) || Number.isNaN(v) || v === 0) {
            return { error: 'Enter valid power and voltage values.' }
          }
          const amps = watts / v
          return { amps: amps.toFixed(2), formula: 'I = P / V' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total wattage of the devices on a circuit and the supply voltage. Click Calculate to find the current in amperes.
        </p>
        <p>
          This helps ensure the wiring and breakers are sized correctly for the load.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing the total load helps prevent overloaded circuits and improves safety in homes and workshops.
        </p>
        <p>
          It also assists in planning generators and UPS systems.
        </p>

        <h2>FAQ</h2>
        <h3>What if I have multiple circuits?</h3>
        <p>
          Calculate each circuit separately or sum the wattages for a total load estimate.
        </p>
        <h3>Is this for AC or DC?</h3>
        <p>
          This formula applies to DC or purely resistive AC loads. For AC with power factor, include PF in the calculation.
        </p>
      </section>
    </>
  )
}

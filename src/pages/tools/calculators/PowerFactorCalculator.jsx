import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PowerFactorCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Power Factor Calculator"
        description="Calculate power factor using real and apparent power values."
        inputs={[
          { name: 'realPower', label: 'Real Power (kW)', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
          { name: 'apparentPower', label: 'Apparent Power (kVA)', type: 'number', placeholder: 'e.g., 6', defaultValue: '' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ realPower, apparentPower }) => {
          const p = parseFloat(realPower)
          const s = parseFloat(apparentPower)
          if (Number.isNaN(p) || Number.isNaN(s) || s <= 0) {
            return { error: 'Enter valid real and apparent power values.' }
          }
          const pf = p / s
          return { powerFactor: pf.toFixed(3), formula: 'PF = Real Power / Apparent Power' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter real power (kW) and apparent power (kVA). Click Calculate to compute the power factor, a number between 0 and 1.
        </p>
        <p>
          Power factor indicates how effectively electrical power is being used; a value closer to 1 is more efficient.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your power factor can help reduce energy costs and avoid penalties in commercial settings. Improving power factor can lead to better utilization of electrical infrastructure.
        </p>
        <p>
          It also helps in selecting corrective equipment like capacitors or synchronous condensers.
        </p>

        <h2>FAQ</h2>
        <h3>Can power factor be greater than 1?</h3>
        <p>
          No. The power factor must be between 0 and 1 for passive loads.
        </p>
        <h3>What is a good power factor?</h3>
        <p>
          Utility companies often prefer a power factor above 0.9. Values below that may result in extra charges.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function VoltageDropCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Voltage Drop Calculator — Estimate Voltage Loss" 
        description="Estimate voltage drop in a cable based on current, length, and resistance. Useful for electrical wiring calculations."
        inputs={[
          { name: 'current', label: 'Current (A)', type: 'number', placeholder: 'Enter current in amps', defaultValue: '' },
          { name: 'length', label: 'Length (m)', type: 'number', placeholder: 'Enter one-way length in meters', defaultValue: '' },
          { name: 'resistance', label: 'Resistance (Ω/m)', type: 'number', placeholder: 'Enter conductor resistance per meter', defaultValue: '' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ current, length, resistance }) => {
          const i = parseFloat(current)
          const l = parseFloat(length)
          const r = parseFloat(resistance)
          if (Number.isNaN(i) || Number.isNaN(l) || Number.isNaN(r) || i < 0 || l < 0 || r < 0) {
            return { error: 'Please enter valid non-negative numbers for current, length, and resistance.' }
          }
          // Voltage drop for round trip conductor (to and from load)
          const vDrop = 2 * i * r * l
          return {
            voltageDrop: isFinite(vDrop) ? vDrop : 'Invalid input',
            formula: `Vdrop = 2 × I × R × L = ${vDrop}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide the current in amps, the one-way cable length in meters, and the conductor resistance in ohms per meter.
          The calculator assumes a round-trip path (out and return) and computes the voltage drop across the conductor. This helps in designing wiring to keep voltage drop within acceptable limits.
        </p>

        <h2>Benefits</h2>
        <p>
          Estimating voltage drop is important for electrical safety and performance. Excessive voltage drop can reduce equipment efficiency and cause equipment to run hot or fail.
          Use this tool when sizing cables for motors, lighting, or other loads.
        </p>

        <h2>FAQ</h2>
        <h3>Why multiply by 2?</h3>
        <p>
          Voltage travels there and back along the conductor pair. The formula includes both directions, doubling the length factor for round-trip resistance.
        </p>

        <h3>What is a typical allowable voltage drop?</h3>
        <p>
          A common guideline is less than 3–5% of the supply voltage. For 230V systems, that means keeping drop below about 7–11 volts.
        </p>

        <h3>Can I use this for DC and AC?</h3>
        <p>
          Yes. The formula works for DC and AC resistive circuits. For AC with reactance, additional factors apply.
        </p>
      </section>
    </>
  )
}

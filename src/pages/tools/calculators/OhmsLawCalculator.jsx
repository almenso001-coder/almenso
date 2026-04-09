import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function OhmsLawCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Ohm’s Law Calculator — Voltage, Current & Resistance"
        description="Solve Ohm’s Law (V = I × R) by entering any two values."
        inputs={[
          { name: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: 'e.g., 12', defaultValue: '' },
          { name: 'current', label: 'Current (A)', type: 'number', placeholder: 'e.g., 2', defaultValue: '' },
          { name: 'resistance', label: 'Resistance (Ω)', type: 'number', placeholder: 'e.g., 6', defaultValue: '' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ voltage, current, resistance }) => {
          const v = parseFloat(voltage)
          const i = parseFloat(current)
          const r = parseFloat(resistance)

          const provided = [!Number.isNaN(v), !Number.isNaN(i), !Number.isNaN(r)].filter(Boolean).length
          if (provided < 2) {
            return { error: 'Provide at least two values.' }
          }

          if (Number.isNaN(v)) {
            return { voltage: (i * r).toFixed(2), formula: 'V = I × R' }
          }
          if (Number.isNaN(i)) {
            return { current: (v / r).toFixed(2), formula: 'I = V / R' }
          }
          if (Number.isNaN(r)) {
            return { resistance: (v / i).toFixed(2), formula: 'R = V / I' }
          }

          const power = v * i
          return { voltage: v, current: i, resistance: r, power: power.toFixed(2), formula: 'V = I × R, P = V × I' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter any two of the three values (voltage, current, resistance). Click Calculate to solve for the missing value using Ohm’s Law.
        </p>
        <p>
          This is a practical tool when designing circuits, selecting components, or troubleshooting electrical systems.
        </p>

        <h2>Benefits</h2>
        <p>
          Ohm’s Law is fundamental in electronics. This calculator helps you quickly verify relationships and choose correct resistors or power ratings.
        </p>
        <p>
          It also shows how changing one variable affects the others.
        </p>

        <h2>FAQ</h2>
        <h3>What if I enter all three values?</h3>
        <p>
          The tool will calculate power (P = V × I) in addition to echoing the inputs.
        </p>
        <h3>Can I use this for AC circuits?</h3>
        <p>
          This calculator assumes DC values. For AC circuits, use RMS values and account for phase angle if needed.
        </p>
      </section>
    </>
  )
}

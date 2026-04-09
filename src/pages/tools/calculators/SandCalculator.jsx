import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SandCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Sand Calculator — Estimate Sand Volume" 
        description="Estimate sand needed for projects like concrete mixes or leveling based on area and depth." 
        inputs={[
          { name: 'length', label: 'Length (ft)', type: 'number', placeholder: 'Enter length', defaultValue: '' },
          { name: 'width', label: 'Width (ft)', type: 'number', placeholder: 'Enter width', defaultValue: '' },
          { name: 'depth', label: 'Depth (in)', type: 'number', placeholder: 'Enter depth', defaultValue: '' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ length, width, depth }) => {
          const l = parseFloat(length)
          const w = parseFloat(width)
          const d = parseFloat(depth)

          if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(d) || l <= 0 || w <= 0 || d <= 0) {
            return { error: 'Please enter valid dimensions greater than zero.' }
          }

          const volumeCubicFeet = l * w * (d / 12)
          const tons = volumeCubicFeet * 0.1 // approximate tons per cubic foot for sand

          return {
            volumeCubicFeet: isFinite(volumeCubicFeet) ? volumeCubicFeet : 'Invalid input',
            tons: isFinite(tons) ? tons : 'Invalid input',
            formula: `Volume (cu ft) = L × W × (D/12); Tons ≈ volume × 0.1`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the area and depth to estimate the volume of sand required. This is useful for mixing concrete, leveling, or drainage projects.
        </p>

        <h2>Ordering sand</h2>
        <p>
          Sand is often sold by weight. Use the ton estimate when ordering but check with your supplier for specific density.
        </p>

        <h2>FAQ</h2>
        <h3>Does this account for compaction?</h3>
        <p>
          No. Sand can settle, so consider ordering slightly more than the estimate to account for compaction.
        </p>

        <h3>Can I use different units?</h3>
        <p>
          This tool uses imperial units. Convert your measurements to feet and inches first.
        </p>

        <h3>What if I need a cubic yard estimate?</h3>
        <p>
          Divide the cubic feet result by 27 to convert to cubic yards.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function GravelCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Gravel Calculator — Estimate Gravel Volume" 
        description="Estimate gravel needed for landscaping projects based on area and depth." 
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
          const tons = volumeCubicFeet * 0.1 // approximate tons per cubic foot for gravel

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
          Enter the dimensions of the area and desired depth. This gives an estimate of gravel volume and weight.
        </p>

        <h2>Estimating quantity</h2>
        <p>
          Gravel is often sold by weight. Use the ton estimate to order the right amount from suppliers.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include compaction?</h3>
        <p>
          No. Gravel can compact when installed. Add extra (typically 5-10%) to account for settling.
        </p>

        <h3>What if I need a different unit?</h3>
        <p>
          This tool uses feet and inches. Convert metric units before using it.
        </p>

        <h3>Can I use this for other aggregates?</h3>
        <p>
          Yes, but densities vary. Adjust the ton conversion if your material has a different density.
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function AsphaltCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Asphalt Calculator — Estimate Asphalt Needed" 
        description="Estimate asphalt volume needed for paving based on area and thickness." 
        inputs={[
          { name: 'length', label: 'Length (ft)', type: 'number', placeholder: 'Enter length', defaultValue: '' },
          { name: 'width', label: 'Width (ft)', type: 'number', placeholder: 'Enter width', defaultValue: '' },
          { name: 'thickness', label: 'Thickness (in)', type: 'number', placeholder: 'Enter thickness', defaultValue: '' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ length, width, thickness }) => {
          const l = parseFloat(length)
          const w = parseFloat(width)
          const t = parseFloat(thickness)

          if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(t) || l <= 0 || w <= 0 || t <= 0) {
            return { error: 'Please enter valid dimensions greater than zero.' }
          }

          const area = l * w
          const volumeCubicFeet = area * (t / 12)
          const tons = volumeCubicFeet * 0.094 // approximate tons per cubic foot for asphalt

          return {
            volumeCubicFeet: isFinite(volumeCubicFeet) ? volumeCubicFeet : 'Invalid input',
            tons: isFinite(tons) ? tons : 'Invalid input',
            formula: `Volume (cu ft) = area × thickness (ft); Tons ≈ volume × 0.094`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the length and width of the area, plus the desired thickness of the asphalt layer.
          This estimates the volume and weight (tons) of asphalt required.
        </p>

        <h2>Estimating weight</h2>
        <p>
          The tonnage conversion uses a common approximation. Confirm with your supplier for exact density.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use this for driveways?</h3>
        <p>
          Yes. This is helpful for estimating materials for driveways, parking lots, and walkways.
        </p>

        <h3>What thickness should I use?</h3>
        <p>
          Typical asphalt thickness ranges from 2 to 4 inches for driveways and up to 6 inches for heavier traffic.
        </p>

        <h3>Why do I need tons?</h3>
        <p>
          Asphalt is often sold by weight. This estimate helps you order the correct amount.
        </p>
      </section>
    </>
  )
}

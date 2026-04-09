import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function RoofingCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Roofing Calculator — Estimate Roofing Materials" 
        description="Estimate roofing material needs based on roof area and material coverage." 
        inputs={[
          { name: 'roofArea', label: 'Roof Area (sq ft)', type: 'number', placeholder: 'Enter roof area', defaultValue: '' },
          { name: 'coverage', label: 'Coverage per Bundle (sq ft)', type: 'number', placeholder: 'Enter coverage', defaultValue: '' },
          { name: 'waste', label: 'Waste Allowance (%)', type: 'number', placeholder: 'Enter waste percentage', defaultValue: '10' },
          { name: 'slopeFactor', label: 'Slope Factor', type: 'number', placeholder: 'Enter slope factor (e.g., 1.1)', defaultValue: '1.1' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ roofArea, coverage, waste, slopeFactor }) => {
          const area = parseFloat(roofArea)
          const cov = parseFloat(coverage)
          const w = parseFloat(waste)
          const slope = parseFloat(slopeFactor)

          if (
            Number.isNaN(area) ||
            Number.isNaN(cov) ||
            Number.isNaN(w) ||
            Number.isNaN(slope) ||
            area <= 0 ||
            cov <= 0 ||
            slope <= 0
          ) {
            return { error: 'Please enter valid numbers greater than zero.' }
          }

          const adjustedArea = area * slope
          const totalArea = adjustedArea * (1 + w / 100)
          const bundles = totalArea / cov

          return {
            adjustedArea: isFinite(adjustedArea) ? adjustedArea : 'Invalid input',
            bundles: isFinite(bundles) ? Math.ceil(bundles) : 'Invalid input',
            formula: `Adjusted area = Roof area × slope factor; Bundles = (Adjusted area × (1 + waste%)) / Coverage`,
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your roof area, the coverage per material bundle, and an allowance for waste.
          This gives an estimate of how many bundles you should purchase.
        </p>

        <h2>Why waste allowance matters</h2>
        <p>
          Roofing involves cuts, overlaps, and damaged materials. Adding 10–15% waste ensures you have sufficient material.
        </p>

        <h2>FAQ</h2>
        <h3>What is roof area?</h3>
        <p>
          Roof area is typically larger than the building footprint due to slope. Measure or consult your roof plan.
        </p>

        <h3>Can I use this for shingles?</h3>
        <p>
          Yes. Shingles are commonly sold in bundles with a specified coverage area.
        </p>

        <h3>What if I have multiple roof slopes?</h3>
        <p>
          Calculate the total roof area from all slopes and use the sum in this calculator.
        </p>
      </section>
    </>
  )
}

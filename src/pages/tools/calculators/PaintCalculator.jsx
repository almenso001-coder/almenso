import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PaintCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Paint Calculator — Estimate Paint Needed" 
        description="Estimate how much paint you need based on surface area and paint coverage per gallon." 
        inputs={[
          { name: 'area', label: 'Surface Area (sq ft)', type: 'number', placeholder: 'Enter total area', defaultValue: '' },
          { name: 'coverage', label: 'Coverage per Gallon (sq ft)', type: 'number', placeholder: 'Enter coverage', defaultValue: '' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ area, coverage }) => {
          const a = parseFloat(area)
          const c = parseFloat(coverage)
          if (Number.isNaN(a) || Number.isNaN(c) || a <= 0 || c <= 0) {
            return { error: 'Please enter valid numbers greater than zero.' }
          }

          const gallons = a / c
          return {
            gallons: isFinite(gallons) ? gallons : 'Invalid input',
            formula: `Gallons needed = Area / Coverage = ${gallons}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the surface area to be painted and the coverage rate of your paint. Most paint cans list coverage in square feet per gallon.
        </p>

        <h2>Tips for accuracy</h2>
        <p>
          Subtract windows and doors from the area if you don't plan to paint them. Add a margin for texture and second coats.
        </p>

        <h2>FAQ</h2>
        <h3>Why does coverage vary?</h3>
        <p>
          Coverage depends on paint type, surface texture, and application method. Always check the label for estimated coverage.
        </p>

        <h3>Should I round up?</h3>
        <p>
          Yes. It's best to round up and buy extra paint to avoid running out mid-job.
        </p>

        <h3>Can I use this for primer and topcoat?</h3>
        <p>
          Use this estimate for each coat separately, as coverage may vary between products.
        </p>
      </section>
    </>
  )
}

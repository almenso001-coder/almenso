import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function FlooringCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Flooring Calculator — Estimate Flooring Materials" 
        description="Estimate how much flooring material you need based on room dimensions and coverage per unit." 
        inputs={[
          { name: 'length', label: 'Room Length (ft)', type: 'number', placeholder: 'Enter length', defaultValue: '' },
          { name: 'width', label: 'Room Width (ft)', type: 'number', placeholder: 'Enter width', defaultValue: '' },
          { name: 'coverage', label: 'Coverage per Box (sq ft)', type: 'number', placeholder: 'Enter coverage', defaultValue: '' },
          { name: 'waste', label: 'Waste Allowance (%)', type: 'number', placeholder: 'Enter waste percentage', defaultValue: '10' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ length, width, coverage, waste }) => {
          const l = parseFloat(length)
          const w = parseFloat(width)
          const c = parseFloat(coverage)
          const ws = parseFloat(waste)

          if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(c) || Number.isNaN(ws) || l <= 0 || w <= 0 || c <= 0) {
            return { error: 'Please enter valid numbers greater than zero.' }
          }

          const area = l * w
          const totalArea = area * (1 + ws / 100)
          const boxes = totalArea / c

          return {
            area,
            boxes: isFinite(boxes) ? Math.ceil(boxes) : 'Invalid input',
            formula: `Total area = L × W; Boxes needed = (Total area × (1 + waste%)) / coverage per box`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your room dimensions, the coverage per box of flooring, and a waste allowance.
          This provides an estimate of how many boxes you should purchase.
        </p>

        <h2>Why add waste</h2>
        <p>
          Waste accounts for cuts, patterns, and mistakes during installation. A typical waste allowance is 10–15%.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use this for tile or laminate?</h3>
        <p>
          Yes. As long as you know the coverage per package, you can use this for tile, laminate, vinyl, and other flooring materials.
        </p>

        <h3>What if the room is not rectangular?</h3>
        <p>
          For irregular shapes, divide the room into rectangles or use a more advanced area calculator.
        </p>

        <h3>Should I round up or down?</h3>
        <p>
          Always round up and buy a bit extra to ensure you have enough material.
        </p>
      </section>
    </>
  )
}

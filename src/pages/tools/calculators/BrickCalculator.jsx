import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BrickCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Brick Calculator — Estimate Bricks Needed" 
        description="Estimate how many bricks are needed for a wall based on dimensions and mortar joints." 
        inputs={[
          { name: 'length', label: 'Wall Length (ft)', type: 'number', placeholder: 'Enter wall length', defaultValue: '' },
          { name: 'height', label: 'Wall Height (ft)', type: 'number', placeholder: 'Enter wall height', defaultValue: '' },
          { name: 'brickLength', label: 'Brick Length (in)', type: 'number', placeholder: 'Enter brick length', defaultValue: '8' },
          { name: 'brickHeight', label: 'Brick Height (in)', type: 'number', placeholder: 'Enter brick height', defaultValue: '2.25' },
          { name: 'mortar', label: 'Mortar Joint (in)', type: 'number', placeholder: 'Enter mortar joint thickness', defaultValue: '0.375' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ length, height, brickLength, brickHeight, mortar }) => {
          const l = parseFloat(length)
          const h = parseFloat(height)
          const bl = parseFloat(brickLength)
          const bh = parseFloat(brickHeight)
          const m = parseFloat(mortar)

          if (
            Number.isNaN(l) ||
            Number.isNaN(h) ||
            Number.isNaN(bl) ||
            Number.isNaN(bh) ||
            Number.isNaN(m) ||
            l <= 0 ||
            h <= 0 ||
            bl <= 0 ||
            bh <= 0 ||
            m < 0
          ) {
            return { error: 'Please enter valid positive dimensions.' }
          }

          const wallArea = l * h
          const brickArea = (bl + m) * (bh + m) / 144 // convert to sq ft
          const bricks = wallArea / brickArea

          return {
            bricks: isFinite(bricks) ? Math.ceil(bricks) : 'Invalid input',
            formula: `Bricks needed = Wall area / Brick area (including mortar) = ${bricks}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the wall length and height in feet, along with brick dimensions and mortar joint thickness in inches.
          This estimates how many bricks you need to order.
        </p>

        <h2>Tips</h2>
        <p>
          Add extra bricks (typically 5–10%) to account for cuts, waste, and unexpected damage.
        </p>

        <h2>FAQ</h2>
        <h3>What is included in brick dimensions?</h3>
        <p>
          Brick dimensions are typically given as length × height. Include mortar joints for a more accurate count.
        </p>

        <h3>Why include mortar in calculations?</h3>
        <p>
          Mortar increases the spacing between bricks and therefore affects how many bricks are required.
        </p>

        <h3>Can I use this for multiple walls?</h3>
        <p>
          Multiply the wall area for each wall and use the total area in the calculator.
        </p>
      </section>
    </>
  )
}

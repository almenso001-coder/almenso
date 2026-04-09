import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ConcreteCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Concrete Calculator — Estimate Concrete Volume" 
        description="Estimate the amount of concrete needed for a slab, footing, or column based on dimensions." 
        inputs={[
          { name: 'length', label: 'Length (ft)', type: 'number', placeholder: 'Enter length in feet', defaultValue: '' },
          { name: 'width', label: 'Width (ft)', type: 'number', placeholder: 'Enter width in feet', defaultValue: '' },
          { name: 'depth', label: 'Depth (in)', type: 'number', placeholder: 'Enter depth in inches', defaultValue: '' },
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

          // Convert depth from inches to feet
          const depthFeet = d / 12
          const cubicFeet = l * w * depthFeet
          const cubicYards = cubicFeet / 27

          return {
            cubicFeet: isFinite(cubicFeet) ? cubicFeet : 'Invalid input',
            cubicYards: isFinite(cubicYards) ? cubicYards : 'Invalid input',
            formula: `Volume (cu ft) = L × W × (D/12); Volume (cu yd) = cu ft / 27`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the length and width of your slab in feet, and the depth in inches. This calculates the volume in both cubic feet and cubic yards.
          Builders commonly order concrete by the cubic yard.
        </p>

        <h2>Tips for ordering</h2>
        <p>
          Always add a little extra (commonly 10%) to account for waste and uneven surfaces. Confirm with your supplier for minimum order quantities.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use metric units?</h3>
        <p>
          This tool uses feet and inches. Convert metric measurements to imperial first, or use a dedicated metric concrete calculator.
        </p>

        <h3>What if my shape is not rectangular?</h3>
        <p>
          For irregular shapes, break the area into rectangles or use a more advanced volume estimation method.
        </p>

        <h3>Should I include rebar volume?</h3>
        <p>
          The volume of reinforcement is usually small compared to concrete volume and is typically ignored for ordering.
        </p>
      </section>
    </>
  )
}

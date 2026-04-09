import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function VolumeConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Volume Converter — Liters, Milliliters, Gallons" 
        description="Convert volume between liters, milliliters, and US gallons. Useful for cooking, liquid measurements, and storage planning."
        inputs={[
          { name: 'liters', label: 'Liters (L)', type: 'number', placeholder: 'Enter volume in liters', defaultValue: '' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ liters }) => {
          const l = parseFloat(liters)
          if (Number.isNaN(l)) {
            return { error: 'Please enter a valid volume in liters.' }
          }
          const milliliters = l * 1000
          const gallons = l * 0.264172
          return {
            milliliters: isFinite(milliliters) ? milliliters : 'Invalid input',
            gallons: isFinite(gallons) ? gallons : 'Invalid input',
            formula: `mL = L × 1000, gal = L × 0.264172`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a volume amount in liters. The converter calculates the equivalent in milliliters and US gallons. This is helpful for recipes, filling containers, and comparing how much liquid you have across different unit systems.
        </p>

        <h2>Benefits</h2>
        <p>
          Volumes are often listed in different units depending on the context. This tool saves you time and reduces errors when converting between metric and US customary units.
          It’s useful for shopping, cooking, and planning storage or fluid capacity.
        </p>

        <h2>FAQ</h2>
        <h3>Why use US gallons?</h3>
        <p>
          US gallons are widely used in the United States for fuel, beverages, and liquid products. Converting helps when dealing with American specifications.
        </p>

        <h3>Can I convert to imperial gallons?</h3>
        <p>
          This tool converts to US gallons. For imperial gallons, multiply liters by 0.219969.
        </p>

        <h3>Is 1 liter always 1000 milliliters?</h3>
        <p>
          Yes. The milliliter is defined as one-thousandth of a liter, so 1 L = 1000 mL exactly.
        </p>
      </section>
    </>
  )
}

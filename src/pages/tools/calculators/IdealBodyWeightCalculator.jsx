import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function IdealBodyWeightCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Ideal Body Weight Calculator"
        description="Estimate ideal body weight using the Devine formula based on height and gender."
        inputs={[
          { name: 'gender', label: 'Gender (M/F)', type: 'text', placeholder: 'M or F', defaultValue: 'M' },
          { name: 'heightCm', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ gender, heightCm }) => {
          const g = (gender || '').trim().toUpperCase()
          const height = parseFloat(heightCm)
          if (!['M', 'F'].includes(g) || Number.isNaN(height) || height <= 0) {
            return { error: 'Enter gender (M/F) and a valid height.' }
          }

          const inches = height / 2.54
          const base = 50 + 2.3 * (inches - 60)
          const ideal = g === 'F' ? base - 2.3 : base

          return { idealWeightKg: ideal.toFixed(1), formula: 'Devine formula for ideal body weight' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your gender (M or F) and height in centimeters. Click Calculate to see an estimated ideal body weight based on the Devine formula.
        </p>
        <p>
          Ideal weight estimates are guidelines; factors like muscle mass and body composition are not included.
        </p>

        <h2>Benefits</h2>
        <p>
          This tool gives a quick benchmark to compare against your current weight and set healthy targets.
        </p>
        <p>
          Use it as one of several measures, alongside BMI and body fat percentage.
        </p>

        <h2>FAQ</h2>
        <h3>Is this formula accurate for everyone?</h3>
        <p>
          It is a general estimate and may not fit all body types. Athletes and people with high muscle mass may present differently.
        </p>
        <h3>Can I use this formula for children?</h3>
        <p>
          No. This formula is intended for adults; children have different growth patterns.
        </p>
      </section>
    </>
  )
}

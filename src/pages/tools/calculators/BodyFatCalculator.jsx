import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BodyFatCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Body Fat Calculator — Estimate Body Fat Percentage"
        description="Estimate body fat percentage using body measurements (Navy method)."
        inputs={[
          { name: 'gender', label: 'Gender (M/F)', type: 'text', placeholder: 'M or F', defaultValue: 'M' },
          { name: 'waist', label: 'Waist Circumference (cm)', type: 'number', placeholder: 'e.g., 80', defaultValue: '' },
          { name: 'neck', label: 'Neck Circumference (cm)', type: 'number', placeholder: 'e.g., 40', defaultValue: '' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175', defaultValue: '' },
          { name: 'hip', label: 'Hip Circumference (cm, women only)', type: 'number', placeholder: 'e.g., 95', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ gender, waist, neck, height, hip }) => {
          const g = (gender || '').trim().toUpperCase()
          const w = parseFloat(waist)
          const n = parseFloat(neck)
          const h = parseFloat(height)
          const hp = parseFloat(hip)

          if (!['M', 'F'].includes(g) || [w, n, h].some(v => Number.isNaN(v))) {
            return { error: 'Please enter valid measurements and specify gender as M or F.' }
          }

          // US Navy method
          let bodyFat
          if (g === 'M') {
            bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76
          } else {
            if (Number.isNaN(hp)) {
              return { error: 'Please provide hip measurement for females.' }
            }
            bodyFat = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387
          }

          return { bodyFat: bodyFat.toFixed(1) + '%', formula: 'Navy body fat formula (logarithmic)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your gender, waist, neck, and height measurements. Women also need to enter hip circumference. Click Calculate to estimate body fat percentage.
        </p>
        <p>
          This method is an estimate and works best with consistent measurement technique.
        </p>

        <h2>Benefits</h2>
        <p>
          Body fat percentage gives a better sense of fitness than weight alone. It helps you track progress in fat loss vs muscle gain.
        </p>
        <p>
          Use it alongside other measures like waist-to-height ratio and strength improvements.
        </p>

        <h2>FAQ</h2>
        <h3>Is this as accurate as DEXA?</h3>
        <p>
          No. This formula provides an estimate. DEXA scans and other body composition tests are more accurate.
        </p>
        <h3>How should I measure?</h3>
        <p>
          Measure with a flexible tape at the widest (waist) or narrowest (neck) points and keep the tape snug but not compressing skin.
        </p>
      </section>
    </>
  )
}

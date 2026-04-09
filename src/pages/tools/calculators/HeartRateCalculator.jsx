import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function HeartRateCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Heart Rate Calculator — Target Zone & Maximum"
        description="Find your estimated maximum heart rate and target training zones."
        inputs={[
          { name: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 30', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ age }) => {
          const a = parseFloat(age)
          if (Number.isNaN(a) || a <= 0) {
            return { error: 'Enter a valid age.' }
          }
          const maxHR = 220 - a
          const zones = {
            'Warm-up (50-60%)': `${Math.round(maxHR * 0.5)} - ${Math.round(maxHR * 0.6)}`,
            'Fat burn (60-70%)': `${Math.round(maxHR * 0.6)} - ${Math.round(maxHR * 0.7)}`,
            'Cardio (70-80%)': `${Math.round(maxHR * 0.7)} - ${Math.round(maxHR * 0.8)}`,
            'Peak (80-90%)': `${Math.round(maxHR * 0.8)} - ${Math.round(maxHR * 0.9)}`,
          }
          return { maxHeartRate: maxHR, zones, formula: 'Max HR ≈ 220 − age' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your age and click Calculate to see your estimated maximum heart rate and common training zones.
        </p>
        <p>
          These zones are guidelines for different workout intensities (warm-up, fat burn, cardio, peak).
        </p>

        <h2>Benefits</h2>
        <p>
          Understanding your target heart rate zones helps you train safely and effectively, whether you’re improving endurance or burning fat.
        </p>
        <p>
          It’s especially useful when using fitness trackers or training plans that target heart rate zones.
        </p>

        <h2>FAQ</h2>
        <h3>Is this accurate for everyone?</h3>
        <p>
          The formula is a general estimate. Individual maximum heart rates can vary based on genetics and fitness level.
        </p>
        <h3>Should I consult a doctor?</h3>
        <p>
          If you have health concerns, consult a healthcare provider before starting a new exercise program.
        </p>
      </section>
    </>
  )
}

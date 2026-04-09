import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function StandardDeviationCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Standard Deviation Calculator — Measure Data Spread"
        description="Calculate the standard deviation of a list of numbers (population standard deviation)."
        inputs={[
          { name: 'values', label: 'Values (comma-separated)', type: 'text', placeholder: 'e.g., 10, 12, 15, 20', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ values }) => {
          const nums = values
            .split(',')
            .map(v => parseFloat(v.trim()))
            .filter(n => !Number.isNaN(n))

          if (nums.length === 0) {
            return { error: 'Enter at least one number.' }
          }

          const mean = nums.reduce((sum, n) => sum + n, 0) / nums.length
          const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length
          const stdDev = Math.sqrt(variance)

          return { mean: mean.toFixed(2), standardDeviation: stdDev.toFixed(2), formula: 'σ = sqrt(Σ(x-μ)^2 / N)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a list of numbers separated by commas and click Calculate. This tool computes the population standard deviation, which shows how spread out the values are around the mean.
        </p>
        <p>
          Standard deviation is useful when you want to understand variability or volatility in a dataset.
        </p>

        <h2>Benefits</h2>
        <p>
          A lower standard deviation means data points are closer to the mean, while a higher standard deviation indicates more spread.
        </p>
        <p>
          It’s commonly used in finance, quality control, and scientific measurement to express uncertainty.
        </p>

        <h2>FAQ</h2>
        <h3>Is this population or sample standard deviation?</h3>
        <p>
          This calculator uses population standard deviation (dividing by N). For a sample, you would divide by N-1.
        </p>
        <h3>Can I include outliers?</h3>
        <p>
          Yes, outliers will increase the standard deviation. Consider removing obvious data entry errors when analyzing results.
        </p>
      </section>
    </>
  )
}

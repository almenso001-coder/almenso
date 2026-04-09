import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function MeanCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Mean Calculator — Arithmetic Average"
        description="Compute the mean (arithmetic average) of a list of numbers."
        inputs={[
          { name: 'values', label: 'Values (comma-separated)', type: 'text', placeholder: 'e.g., 10, 20, 30', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ values }) => {
          const nums = values
            .split(',')
            .map(v => parseFloat(v.trim()))
            .filter(n => !Number.isNaN(n))

          if (nums.length === 0) {
            return { error: 'Enter at least one number.' }
          }

          const sum = nums.reduce((acc, n) => acc + n, 0)
          const mean = sum / nums.length
          return { mean: mean.toFixed(2), count: nums.length, formula: 'Mean = sum / count' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a list of numbers separated by commas and click Calculate. The calculator ignores invalid entries and returns the arithmetic mean.
        </p>
        <p>
          The mean is useful when you want a single representative value for a dataset.
        </p>

        <h2>Benefits</h2>
        <p>
          Mean is one of the simplest measures of central tendency and is widely used in statistics, finance, and everyday analysis.
        </p>
        <p>
          It helps you summarize a set of values into a single figure.
        </p>

        <h2>FAQ</h2>
        <h3>What if I want a median instead?</h3>
        <p>
          Use the median calculator for the middle value, which is less affected by outliers.
        </p>
        <h3>Can I include text?</h3>
        <p>
          Non-numeric entries are ignored, so you can paste data from spreadsheets without extra cleanup.
        </p>
      </section>
    </>
  )
}

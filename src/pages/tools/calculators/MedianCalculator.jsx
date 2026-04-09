import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function MedianCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Median Calculator — Middle Value of a Dataset"
        description="Find the median, the middle value in an ordered set of numbers."
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
            .sort((a, b) => a - b)

          if (nums.length === 0) {
            return { error: 'Enter at least one number.' }
          }

          const mid = Math.floor(nums.length / 2)
          const median = nums.length % 2 === 0 ? (nums[mid - 1] + nums[mid]) / 2 : nums[mid]
          return { median: median.toFixed(2), count: nums.length, formula: 'Median = middle value (or average of two middle values)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter numbers separated by commas and click Calculate. The calculator sorts the list and finds the middle value (or the average of the two middle values for even-length sets).
        </p>
        <p>
          Median is especially useful when your data has outliers that would skew the mean.
        </p>

        <h2>Benefits</h2>
        <p>
          The median gives you a better idea of a “typical” value in skewed distributions, such as income or property prices.
        </p>
        <p>
          It is commonly used in statistics, real estate, and economic reporting.
        </p>

        <h2>FAQ</h2>
        <h3>What if there are duplicates?</h3>
        <p>
          Duplicates are treated like any other value — the median is based on the sorted list.
        </p>
        <h3>Does order matter?</h3>
        <p>
          No. The calculator sorts the values internally, so you can enter them in any order.
        </p>
      </section>
    </>
  )
}

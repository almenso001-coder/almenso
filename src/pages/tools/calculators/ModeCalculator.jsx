import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ModeCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Mode Calculator — Most Frequent Value(s)"
        description="Find the mode(s) of a list of numbers (the most frequently occurring values)."
        inputs={[
          { name: 'values', label: 'Values (comma-separated)', type: 'text', placeholder: 'e.g., 1, 2, 2, 3', defaultValue: '' },
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

          const freq = {}
          nums.forEach(n => { freq[n] = (freq[n] || 0) + 1 })
          const maxFreq = Math.max(...Object.values(freq))
          const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number)

          return { modes: modes.join(', '), frequency: maxFreq, formula: 'Mode = most frequent number(s)' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a list of numbers separated by commas and click Calculate. The tool identifies the value(s) that appear most often.
        </p>
        <p>
          If multiple values share the highest frequency, all are returned as modes.
        </p>

        <h2>Benefits</h2>
        <p>
          Mode is useful in statistics and data analysis when you want to see the most common outcome or option in a dataset.
        </p>
        <p>
          It can also help in decision-making when selecting the most frequent choice.
        </p>

        <h2>FAQ</h2>
        <h3>What if all values are unique?</h3>
        <p>
          If every number appears once, all values are technically tied as modes. The calculator will return all numbers in that case.
        </p>
        <h3>Can I use this for text?</h3>
        <p>
          This tool works with numbers. If you need mode for text, you can adapt the logic to count string frequency.
        </p>
      </section>
    </>
  )
}

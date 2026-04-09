import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function DataStorageConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Data Storage Converter — Convert MB to GB/TB"
        description="Convert megabytes (MB) to gigabytes (GB) and terabytes (TB) quickly. Useful for file sizes and storage planning."
        inputs={[
          { name: 'mb', label: 'Value (MB)', type: 'number', placeholder: 'Enter value in megabytes', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ mb }) => {
          const m = parseFloat(mb)
          if (Number.isNaN(m)) {
            return { error: 'Please enter a valid number for megabytes.' }
          }
          const gb = m / 1024
          const tb = m / (1024 * 1024)
          return {
            gigabytes: isFinite(gb) ? gb : 'Invalid input',
            terabytes: isFinite(tb) ? tb : 'Invalid input',
            formula: `GB = MB ÷ 1024, TB = MB ÷ 1048576`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Data sizes are often measured in MB, GB, and TB. Each step is 1024 times larger than the previous (1024 MB = 1 GB, 1024 GB = 1 TB).
        </p>

        <h2>FAQ</h2>
        <h3>Why divide by 1024?</h3>
        <p>
          Computers use binary conventions where 1 kilobyte is 1024 bytes, so each unit is 1024 times the previous.
        </p>

        <h3>Is 1 GB always 1024 MB?</h3>
        <p>
          Technically, 1 GiB is 1024 MB, while 1 GB is 1000 MB. This tool uses the binary convention (1024) which is common in operating systems.
        </p>

        <h3>Can I convert TB to MB?</h3>
        <p>
          Yes. Multiply TB by 1024 twice (TB × 1024 × 1024) to get MB. This tool converts MB → GB/TB only.
        </p>
      </section>
    </>
  )
}

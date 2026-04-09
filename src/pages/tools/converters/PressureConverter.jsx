import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function PressureConverter() {
  return (
    <ConverterTemplate
      title="Pressure Converter — Pascals, PSI, Bar"
      description="Convert pressure between pascals, psi, bar, and mmHg. Helpful for tyre pressure, weather, and engineering."
      converterName="Pressure"
      baseUnit="pascals"
      inputs={[
        { name: 'pascals', label: 'Pascals (Pa)', type: 'number', placeholder: 'Enter pressure in pascals', defaultValue: '' },
      ]}
      formula={({ pascals }) => {
        const pa = parseFloat(pascals)
        if (Number.isNaN(pa)) {
          return { error: 'Please enter a valid pressure in pascals.' }
        }
        const psi = pa * 0.000145038
        const bar = pa / 100000
        const mmHg = pa * 0.00750062
        return {
          psi: isFinite(psi) ? Number(psi.toFixed(4)) : 'Invalid input',
          bar: isFinite(bar) ? Number(bar.toFixed(6)) : 'Invalid input',
          mmHg: isFinite(mmHg) ? Number(mmHg.toFixed(4)) : 'Invalid input',
        }
      }}
    />
  )
}

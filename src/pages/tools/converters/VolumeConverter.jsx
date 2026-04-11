import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function VolumeConverter() {
  return (
    <ConverterTemplate
      emoji="🧊"
      heroColor="linear-gradient(135deg,#0f172a,#0891b2)"
      title="Volume Converter — Liters, Milliliters, Gallons"
      description="Convert volume between liters, milliliters, gallons, and cubic meters. Great for recipes, liquids, and storage planning."
      converterName="Volume"
      baseUnit="liters"
      inputs={[
        { name: 'liters', label: 'Liters (L)', type: 'number', placeholder: 'Enter volume in liters', defaultValue: '' },
      ]}
      formula={({ liters }) => {
        const l = parseFloat(liters)
        if (Number.isNaN(l)) {
          return { error: 'Please enter a valid volume in liters.' }
        }
        const milliliters = l * 1000
        const cubicMeters = l / 1000
        const usGallons = l * 0.264172
        const cups = l * 4.22675
        return {
          milliliters: isFinite(milliliters) ? Number(milliliters.toFixed(2)) : 'Invalid input',
          cubicMeters: isFinite(cubicMeters) ? Number(cubicMeters.toFixed(6)) : 'Invalid input',
          usGallons: isFinite(usGallons) ? Number(usGallons.toFixed(4)) : 'Invalid input',
          cups: isFinite(cups) ? Number(cups.toFixed(2)) : 'Invalid input',
        }
      }}
    />
  )
}

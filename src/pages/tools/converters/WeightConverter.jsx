import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function WeightConverter() {
  return (
    <ConverterTemplate
      title="Weight Converter — Kilograms, Pounds, Ounces"
      description="Convert weight between kilograms, grams, pounds, ounces, and stones. Useful for cooking, shopping, and shipping."
      converterName="Weight"
      baseUnit="kilograms"
      inputs={[
        { name: 'kilograms', label: 'Kilograms (kg)', type: 'number', placeholder: 'Enter weight in kilograms', defaultValue: '' },
      ]}
      formula={({ kilograms }) => {
        const kg = parseFloat(kilograms)
        if (Number.isNaN(kg)) {
          return { error: 'Please enter a valid weight in kilograms.' }
        }
        const grams = kg * 1000
        const pounds = kg * 2.20462
        const ounces = kg * 35.274
        const stones = kg * 0.157473
        return {
          grams: isFinite(grams) ? Number(grams.toFixed(2)) : 'Invalid input',
          pounds: isFinite(pounds) ? Number(pounds.toFixed(4)) : 'Invalid input',
          ounces: isFinite(ounces) ? Number(ounces.toFixed(4)) : 'Invalid input',
          stones: isFinite(stones) ? Number(stones.toFixed(4)) : 'Invalid input',
        }
      }}
    />
  )
}

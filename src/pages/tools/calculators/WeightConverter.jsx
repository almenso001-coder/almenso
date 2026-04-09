import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function WeightConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Weight Converter — Kg, lbs, oz" 
        description="Convert weight between kilograms, pounds, and ounces. Useful for cooking, shipping, and fitness tracking."
        inputs={[
          { name: 'kilograms', label: 'Kilograms (kg)', type: 'number', placeholder: 'Enter weight in kg', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ kilograms }) => {
          const kg = parseFloat(kilograms)
          if (Number.isNaN(kg)) {
            return { error: 'Please enter a valid weight in kilograms.' }
          }
          const pounds = kg * 2.20462
          const ounces = kg * 35.274
          return {
            pounds: isFinite(pounds) ? pounds : 'Invalid input',
            ounces: isFinite(ounces) ? ounces : 'Invalid input',
            formula: `lb = kg × 2.20462, oz = kg × 35.274`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a weight in kilograms. The calculator converts it to pounds and ounces using standard conversion factors.
          This is helpful when following recipes, comparing product weights, or checking shipping estimates in different unit systems.
        </p>

        <h2>Benefits</h2>
        <p>
          Quickly switch between metric and imperial weight units without manual calculations. It helps you interpret nutrition labels, convert gym weights, and communicate measurements consistently.
        </p>

        <h2>FAQ</h2>
        <h3>Why use pounds and ounces?</h3>
        <p>
          Pounds and ounces are common in the US and some other countries. Converting makes it easier to understand measurements in those regions.
        </p>

        <h3>Can I reverse the conversion?</h3>
        <p>
          This tool converts from kilograms. To go from pounds to kilograms, divide pounds by 2.20462.
        </p>

        <h3>Are these conversions exact?</h3>
        <p>
          The values are accurate to typical decimal precision and are suitable for everyday use. Slight rounding differences may occur.
        </p>
      </section>
    </>
  )
}

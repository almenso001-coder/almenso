import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BMRCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free BMR Calculator — Basal Metabolic Rate" 
        description="Estimate your Basal Metabolic Rate (BMR), the calories your body burns at rest, based on your age, weight, height, and gender."
        inputs={[
          { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter your weight in kg', defaultValue: '' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'Enter your height in cm', defaultValue: '' },
          { name: 'age', label: 'Age (years)', type: 'number', placeholder: 'Enter your age in years', defaultValue: '' },
          { name: 'gender', label: 'Gender (male/female)', type: 'text', placeholder: 'Enter male or female', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ weight, height, age, gender }) => {
          const w = parseFloat(weight)
          const h = parseFloat(height)
          const a = parseFloat(age)
          const g = (gender || '').toLowerCase()
          if (Number.isNaN(w) || Number.isNaN(h) || Number.isNaN(a) || !['male', 'female'].includes(g)) {
            return { error: 'Please enter valid numbers and specify gender as male or female.' }
          }

          const bmr = g === 'male'
            ? 10 * w + 6.25 * h - 5 * a + 5
            : 10 * w + 6.25 * h - 5 * a - 161

          return {
            bmr: isFinite(bmr) ? bmr : 'Invalid input',
            formula: `BMR = 10×W + 6.25×H - 5×A + ${g === 'male' ? 5 : -161}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your weight (in kilograms), height (in centimeters), age, and gender. This calculator uses the Mifflin-St Jeor equation to estimate the number of calories your body burns at rest.
          BMR represents the energy needed for basic body functions like breathing, circulation, and cell production. Use this as a baseline to plan daily calorie needs depending on activity level.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your BMR helps you set realistic goals for weight loss, maintenance, or gain. It provides a starting point for calculating daily calorie requirements and adjusting food intake.
          If you track your progress over time, you can fine-tune your plan based on changes in weight or activity.
        </p>

        <h2>FAQ</h2>
        <h3>Is this accurate for everyone?</h3>
        <p>
          The BMR formula provides an estimate. Individual metabolism varies based on genetics, muscle mass, and health conditions. Use it as a general guide and consider consulting a health professional.
        </p>

        <h3>Can I use it to plan weight loss?</h3>
        <p>
          Yes. To lose weight, aim for a calorie deficit (consume fewer calories than you burn). Use BMR as a baseline and add activity calories to determine your daily maintenance calories.
        </p>

        <h3>What if I am not sure of my gender?</h3>
        <p>
          The formula differs slightly for male and female. If you prefer not to specify, try both values and see the range. For full guidance, consult a healthcare provider.
        </p>
      </section>
    </>
  )
}

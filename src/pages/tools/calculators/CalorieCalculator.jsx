import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CalorieCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Calorie Calculator — Daily Calorie Needs"
        description="Estimate your daily calorie needs based on basic BMR and activity level."
        inputs={[
          { name: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 30', defaultValue: '' },
          { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70', defaultValue: '' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175', defaultValue: '' },
          { name: 'activityFactor', label: 'Activity Factor (1.2-1.9)', type: 'number', placeholder: 'e.g., 1.55', defaultValue: '1.55' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ age, weight, height, activityFactor }) => {
          const a = parseFloat(age)
          const w = parseFloat(weight)
          const h = parseFloat(height)
          const activity = parseFloat(activityFactor)

          if ([a, w, h, activity].some(v => Number.isNaN(v))) {
            return { error: 'Please enter valid numbers.' }
          }

          // Mifflin-St Jeor BMR (gender-neutral estimate)
          const bmr = 10 * w + 6.25 * h - 5 * a + 5
          const calories = bmr * activity
          return { bmr: bmr.toFixed(0), dailyCalories: calories.toFixed(0), formula: 'TDEE ≈ BMR * activity factor' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide your age, weight, height, and a rough activity factor (1.2=sedentary, 1.55=moderately active, 1.9=very active). Click Calculate to estimate daily calorie needs.
        </p>
        <p>
          This calculator uses a general formula and does not replace personalized advice from a nutrition professional.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your approximate calorie needs helps with weight management and planning meals. It can guide how much to eat to maintain, lose, or gain weight.
        </p>
        <p>
          It is a good starting point before diving deeper into macro tracking or meal planning.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use pounds and inches?</h3>
        <p>
          This calculator expects metric units. Convert pounds to kilograms and inches to centimeters for best results.
        </p>
        <h3>What is activity factor?</h3>
        <p>
          Activity factor adjusts for how much you move. Use a higher factor if you exercise regularly and a lower one if you are mostly sedentary.
        </p>
      </section>
    </>
  )
}

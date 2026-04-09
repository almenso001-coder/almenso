import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function WaterIntakeCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Water Intake Calculator — Daily Hydration Goal"
        description="Estimate daily water intake based on weight and activity level."
        inputs={[
          { name: 'weightKg', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70', defaultValue: '' },
          { name: 'activityLevel', label: 'Activity Level (hours/day)', type: 'number', placeholder: 'e.g., 1', defaultValue: '1' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ weightKg, activityLevel }) => {
          const weight = parseFloat(weightKg)
          const activity = parseFloat(activityLevel)
          if (Number.isNaN(weight) || Number.isNaN(activity) || weight <= 0 || activity < 0) {
            return { error: 'Enter valid weight and activity hours.' }
          }
          const baseLiters = weight * 0.033
          const activityLiters = activity * 0.35
          const total = baseLiters + activityLiters
          return { dailyWaterLiters: total.toFixed(2), formula: 'Water = 0.033*weight + 0.35*activity hours' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your weight in kilograms and your average daily activity in hours. Click Calculate to get an estimated daily water intake in liters.
        </p>
        <p>
          The formula is a simple guideline. Adjust intake based on climate, health conditions, and how you feel.
        </p>

        <h2>Benefits</h2>
        <p>
          Staying hydrated supports energy, focus, and overall wellness. This tool gives you a quick target to aim for.
        </p>
        <p>
          It is especially helpful when increasing activity, traveling, or in hot weather.
        </p>

        <h2>FAQ</h2>
        <h3>Is this medically accurate?</h3>
        <p>
          This is a general guideline. Consult a healthcare professional for personalized recommendations.
        </p>
        <h3>Do I need to count food fluids?</h3>
        <p>
          Some water comes from food. This tool focuses on beverage and supplement intake but provides a solid target.
        </p>
      </section>
    </>
  )
}

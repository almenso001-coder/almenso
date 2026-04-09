import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BMICalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free BMI Calculator — Body Mass Index" 
        description="Calculate your Body Mass Index (BMI) using your weight and height. BMI gives a general idea of healthy weight ranges."
        inputs={[
          { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter your weight in kg', defaultValue: '' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'Enter your height in cm', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ weight, height }) => {
          const w = parseFloat(weight)
          const h = parseFloat(height)
          if (Number.isNaN(w) || Number.isNaN(h) || h <= 0) {
            return { error: 'Please enter valid numbers for weight and height.' }
          }
          const heightMeters = h / 100
          const bmi = w / (heightMeters * heightMeters)
          const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese'
          return {
            bmi: isFinite(bmi) ? bmi : 'Invalid input',
            category,
            formula: `BMI = weight (kg) ÷ (height (m))² = ${bmi}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your current weight in kilograms and your height in centimeters. This calculator uses the standard BMI formula to estimate your body mass index.
          BMI is a quick screening tool to indicate whether you are underweight, normal weight, overweight, or obese. It does not account for muscle mass or body composition,
          so use it as a rough guide rather than a medical diagnosis. For best results, measure height and weight accurately and update the values whenever you have a new measurement.
        </p>

        <h2>Benefits</h2>
        <p>
          BMI is a simple way to track weight trends over time and compare readings against general health categories.
          It can help you set realistic goals, track progress, and motivate healthy lifestyle choices. Knowing your BMI can also help you decide when to consult a healthcare
          provider for personalized guidance.
        </p>

        <h2>FAQ</h2>
        <h3>Is BMI accurate for everyone?</h3>
        <p>
          BMI is a general indicator and may not be accurate for athletes, bodybuilders, or people with high muscle mass. It also does not differentiate between muscle and fat.
          For more detailed insights, consider other measurements like waist circumference or body fat percentage.
        </p>

        <h3>What BMI range is healthy?</h3>
        <p>
          A BMI between 18.5 and 24.9 is generally considered normal. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese.
          These ranges are guidelines and may vary by age, ethnicity, and individual factors.
        </p>

        <h3>Can I use pounds and inches?</h3>
        <p>
          This calculator uses kilograms and centimeters for accuracy. You can convert pounds to kilograms (divide by 2.2046) and inches to centimeters (multiply by 2.54) before using the tool.
        </p>
      </section>
    </>
  )
}

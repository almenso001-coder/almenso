import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function IdealWeightCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Ideal Weight Calculator — Healthy Weight Estimate" 
        description="Estimate your ideal body weight based on height using a standard BMI target. Useful for setting realistic health goals."
        inputs={[
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'Enter your height in cm', defaultValue: '' },
          { name: 'targetBmi', label: 'Target BMI', type: 'number', placeholder: 'Enter desired BMI (e.g. 22)', defaultValue: '22' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ height, targetBmi }) => {
          const h = parseFloat(height)
          const bmi = parseFloat(targetBmi)
          if (Number.isNaN(h) || Number.isNaN(bmi) || h <= 0 || bmi <= 0) {
            return { error: 'Please enter valid numbers for height and target BMI.' }
          }
          const heightM = h / 100
          const idealWeight = bmi * heightM * heightM
          return {
            idealWeight: isFinite(idealWeight) ? idealWeight : 'Invalid input',
            formula: `Ideal Weight = BMI × Height(m)² = ${idealWeight}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide your height in centimeters and a target BMI value. The calculator uses the BMI formula to estimate the weight associated with your chosen BMI.
          A common healthy BMI range is 18.5–24.9, and many people use 22 as a target. This tool gives you a ballpark idea of what your weight might look like at a healthy BMI.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your ideal weight helps you set realistic fitness goals and monitor progress. It can provide motivation and help you compare different strategies for reaching a healthier body composition.
          Use it as a guide rather than a strict rule, since individual factors like muscle mass and body shape vary.
        </p>

        <h2>FAQ</h2>
        <h3>Is this weight perfect for everyone?</h3>
        <p>
          No. This gives an estimate based on BMI. People with more muscle may weigh more but still be healthy. Consider other metrics like waist circumference and body fat percentage.
        </p>

        <h3>How do I choose a target BMI?</h3>
        <p>
          The middle of the healthy range (around 21–23) is common. If you are unsure, consult a doctor or nutritionist.
        </p>

        <h3>Can I use this for children or teenagers?</h3>
        <p>
          BMI interpretation differs for growing children and teens. Use age-based charts or consult a pediatrician for those groups.
        </p>
      </section>
    </>
  )
}

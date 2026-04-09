import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function StairCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Stair Calculator — Estimate Stair Dimensions" 
        description="Determine the number of steps and rise/run dimensions for a staircase based on total height." 
        inputs={[
          { name: 'totalRise', label: 'Total Rise (in)', type: 'number', placeholder: 'Enter total height', defaultValue: '' },
          { name: 'risePerStep', label: 'Rise per Step (in)', type: 'number', placeholder: 'Enter rise per step', defaultValue: '7' },
          { name: 'runPerStep', label: 'Run per Step (in)', type: 'number', placeholder: 'Enter run per step', defaultValue: '10' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ totalRise, risePerStep, runPerStep }) => {
          const total = parseFloat(totalRise)
          const rise = parseFloat(risePerStep)
          const run = parseFloat(runPerStep)

          if (
            Number.isNaN(total) ||
            Number.isNaN(rise) ||
            Number.isNaN(run) ||
            total <= 0 ||
            rise <= 0 ||
            run <= 0
          ) {
            return { error: 'Please enter valid numbers greater than zero.' }
          }

          const steps = Math.ceil(total / rise)
          const actualRise = total / steps
          const totalRun = steps * run

          return {
            steps,
            actualRise: isFinite(actualRise) ? actualRise : 'Invalid input',
            totalRun: isFinite(totalRun) ? totalRun : 'Invalid input',
            formula: `Steps = ceil(total rise / rise per step); Total run = steps × run per step.`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total height your stairs need to cover and preferred rise/run dimensions.
          This helps you plan a stairway that is comfortable and meets building standards.
        </p>

        <h2>Design tips</h2>
        <p>
          Comfortable stairs usually have a rise of 7 inches and a run of 10 inches, but local codes may vary.
          Adjust the rise/run for your space and comfort needs.
        </p>

        <h2>FAQ</h2>
        <h3>What is rise and run?</h3>
        <p>
          Rise is the vertical height of each step; run is the horizontal depth. Together they define step geometry.
        </p>

        <h3>Why use ceiling (ceil) for steps?</h3>
        <p>
          You need a whole number of steps. The calculator rounds up so you don't end up short of height.
        </p>

        <h3>How do I know if my stairs meet code?</h3>
        <p>
          Building codes vary by region; consult local regulations for exact dimensions and maximum rise per step.
        </p>
      </section>
    </>
  )
}

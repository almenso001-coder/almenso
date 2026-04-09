import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function DistanceCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Distance Calculator — Speed × Time" 
        description="Calculate distance traveled given speed and time. Useful for trip planning and motion analysis."
        inputs={[
          { name: 'speed', label: 'Speed (km/h)', type: 'number', placeholder: 'Enter speed in km/h', defaultValue: '' },
          { name: 'time', label: 'Time (hours)', type: 'number', placeholder: 'Enter time in hours', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ speed, time }) => {
          const s = parseFloat(speed)
          const t = parseFloat(time)
          if (Number.isNaN(s) || Number.isNaN(t) || t < 0) {
            return { error: 'Please enter valid values for speed and time.' }
          }
          const distance = s * t
          return {
            distance: isFinite(distance) ? distance : 'Invalid input',
            formula: `Distance = Speed × Time = ${distance} km`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the speed in km/h and the duration in hours. The calculator multiplies these values to determine how far you would travel in that time.
          This is helpful for planning road trips, estimating commute distances, or solving physics problems.
        </p>

        <h2>Benefits</h2>
        <p>
          Distance calculations help you plan travel and understand relationships between speed, time, and distance.
          Knowing distance can help with fuel planning, timing arrival, or evaluating different route options.
        </p>

        <h2>FAQ</h2>
        <h3>What if time is not whole hours?</h3>
        <p>
          You can enter fractional hours (e.g., 1.5 for one and a half hours) to calculate distance accurately.
        </p>

        <h3>Can speed be zero?</h3>
        <p>
          If speed is zero, distance will be zero regardless of time. This indicates no movement.
        </p>

        <h3>What units are used?</h3>
        <p>
          This calculator uses kilometers and hours. To use miles or minutes, convert the values first (1 mile ≈ 1.609 km, 60 minutes = 1 hour).
        </p>
      </section>
    </>
  )
}

import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function SpeedCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Speed Calculator — Distance over Time" 
        description="Calculate speed by entering distance and time. Useful for travel planning and performance tracking."
        inputs={[
          { name: 'distance', label: 'Distance (km)', type: 'number', placeholder: 'Enter distance in km', defaultValue: '' },
          { name: 'timeHours', label: 'Time (hours)', type: 'number', placeholder: 'Enter time in hours', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ distance, timeHours }) => {
          const d = parseFloat(distance)
          const t = parseFloat(timeHours)
          if (Number.isNaN(d) || Number.isNaN(t) || t <= 0) {
            return { error: 'Please enter valid values for distance and time (time must be greater than zero).' }
          }
          const speed = d / t
          return {
            speed: isFinite(speed) ? speed : 'Invalid input',
            formula: `Speed = Distance ÷ Time = ${speed} km/h`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the distance traveled in kilometers and the time taken in hours. The calculator divides distance by time to give you the average speed in km/h.
          This is great for estimating travel time, checking pacing during workouts, and comparing different routes or modes of transport.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing average speed helps you plan trips, set performance targets, and understand how long a journey will take. It keeps you aware of pacing and helps you make smarter travel decisions.
        </p>

        <h2>FAQ</h2>
        <h3>What if time is in minutes?</h3>
        <p>
          Convert time to hours first (e.g., 30 minutes = 0.5 hours) and enter that value to get the correct speed.
        </p>

        <h3>Can speed be zero?</h3>
        <p>
          If distance is zero, speed is zero. If time is zero, the calculator will show an error since you cannot divide by zero.
        </p>

        <h3>Is this average speed?</h3>
        <p>
          Yes. This tool calculates average speed over the entire distance and time, not accounting for variations during the journey.
        </p>
      </section>
    </>
  )
}

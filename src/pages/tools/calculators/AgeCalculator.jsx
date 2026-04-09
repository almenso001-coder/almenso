import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

function calculateAge(dobValue) {
  const dob = new Date(dobValue)
  if (Number.isNaN(dob.getTime())) return null
  const now = new Date()
  let years = now.getFullYear() - dob.getFullYear()
  let months = now.getMonth() - dob.getMonth()
  let days = now.getDate() - dob.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

export default function AgeCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Age Calculator – Find Your Exact Age"
        description="Calculate your current age in years, months, and days based on your date of birth."
        inputs={[
          { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: '', defaultValue: '' },
        ]}
        affCategory="health"
      hasResult={true}
        formula={({ dob }) => {
          if (!dob) return { error: 'Please select your date of birth.' }
          const age = calculateAge(dob)
          if (!age) return { error: 'Invalid date of birth.' }
          const { years, months, days } = age
          return {
            age: `${years} years, ${months} months, ${days} days`,
            years,
            months,
            days,
            formula: `Current age since ${dob}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Age is calculated by comparing your date of birth with today's date. This calculator computes completed years, months, and days you have lived.
        </p>

        <h2>FAQ</h2>
        <h3>What if I enter a future date?</h3>
        <p>
          If you enter a future date, the calculator will show an invalid input error because age cannot be calculated for future dates.
        </p>

        <h3>Why are months and days sometimes negative?</h3>
        <p>
          The calculator adjusts automatically so months and days are always non-negative by borrowing from the next larger unit.
        </p>

        <h3>Can I use this for exact age in years and months?</h3>
        <p>
          Yes. The result shows completed years, months, and days since your birth date.
        </p>
      </section>
    </>
  )
}

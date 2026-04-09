import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CubeCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Cube Calculator — Calculate Cube of a Number" 
        description="Calculate the cube (third power) of a number. Useful for volume, physics, and algebraic computations." 
        inputs={[
          { name: 'number', label: 'Number', type: 'number', placeholder: 'Enter a number', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ number }) => {
          const val = parseFloat(number)
          if (Number.isNaN(val)) {
            return { error: 'Please enter a valid number.' }
          }

          const cube = Math.pow(val, 3)

          return {
            cube: isFinite(cube) ? cube : 'Invalid input',
            formula: `${val}³ = ${cube}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a number to calculate its cube (number raised to the power of three). This is useful for volume calculations and certain algebraic applications.
        </p>

        <h2>When to use</h2>
        <p>
          Cubing is used in volume formulas for cubes and other shapes, as well as in physics for scaling relationships.
        </p>

        <h2>FAQ</h2>
        <h3>What is the cube of a number?</h3>
        <p>
          The cube of a number is the number multiplied by itself three times (n × n × n).
        </p>

        <h3>Does it work for negative numbers?</h3>
        <p>
          Yes. The cube of a negative number is negative.
        </p>

        <h3>How accurate is the result?</h3>
        <p>
          This uses JavaScript’s Math.pow with double-precision, which is accurate for most practical purposes.
        </p>
      </section>
    </>
  )
}

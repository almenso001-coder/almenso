import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function BinaryConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Free Binary Converter — Convert Between Binary and Decimal" 
        description="Convert numbers between binary and decimal formats. Great for learning computer number systems." 
        inputs={[
          { name: 'decimal', label: 'Decimal', type: 'number', placeholder: 'Enter decimal number', defaultValue: '' },
          { name: 'binary', label: 'Binary', type: 'text', placeholder: 'Enter binary number', defaultValue: '' },
        ]}
        affCategory="tech"
      hasResult={true}
        formula={({ decimal, binary }) => {
          const dec = parseInt(decimal, 10)
          const isBinary = /^[01]+$/.test(binary)

          if (!Number.isNaN(dec) && decimal !== '') {
            return {
              decimal: dec,
              binary: dec.toString(2),
              formula: `Binary = decimal.toString(2)`
            }
          }

          if (binary && isBinary) {
            return {
              decimal: parseInt(binary, 2),
              binary,
              formula: `Decimal = parseInt(binary, 2)`
            }
          }

          return { error: 'Please enter a valid decimal or binary number.' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter either a decimal number to get its binary equivalent or a binary number to get its decimal equivalent.
          Leave the other field empty.
        </p>

        <h2>Why binary matters</h2>
        <p>
          Computers use binary (0s and 1s) to represent data. Understanding binary helps with programming, electronics, and digital logic.
        </p>

        <h2>FAQ</h2>
        <h3>Why does binary only use 0 and 1?</h3>
        <p>
          Binary represents values using two states, often corresponding to off/on or false/true.
        </p>

        <h3>Can I convert negative numbers?</h3>
        <p>
          This tool does not support signed binary formats (like two's complement); it works with non-negative numbers.
        </p>

        <h3>What is the largest number I can convert?</h3>
        <p>
          JavaScript numbers are limited by 53-bit precision. Very large numbers may lose accuracy.
        </p>
      </section>
    </>
  )
}

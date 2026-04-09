import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function UnitPriceCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Unit Price Calculator — Price per Item"
        description="Calculate the unit price by entering total price and quantity. Useful for comparing pack sizes and deals."
        inputs={[
          { name: 'totalPrice', label: 'Total Price', type: 'number', placeholder: 'Enter total price', defaultValue: '' },
          { name: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Enter quantity', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ totalPrice, quantity }) => {
          const price = parseFloat(totalPrice)
          const qty = parseFloat(quantity)
          if (Number.isNaN(price) || Number.isNaN(qty) || qty === 0) {
            return { error: 'Please enter valid numbers (quantity must be non-zero).' }
          }
          const unitPrice = price / qty
          return {
            unitPrice: isFinite(unitPrice) ? unitPrice : 'Invalid input',
            formula: `Total Price ÷ Quantity = ${unitPrice}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Unit price helps compare costs across different package sizes. Divide the total price by the number of units to find the price per item.
        </p>

        <h2>FAQ</h2>
        <h3>What if quantity is 0?</h3>
        <p>
          Quantity cannot be zero because division by zero is undefined. Enter a positive quantity value.
        </p>

        <h3>Can I use this for weight-based pricing?</h3>
        <p>
          Yes. Treat weight (kg, g, etc.) as quantity to calculate price per unit of weight.
        </p>

        <h3>How do I compare two products?</h3>
        <p>
          Calculate the unit price for each product and compare the values. Lower unit price means better deal.
        </p>
      </section>
    </>
  )
}

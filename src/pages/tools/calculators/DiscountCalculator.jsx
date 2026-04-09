import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function DiscountCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Discount Calculator – Calculate Savings Quickly"
        description="Find out how much you'll save with a discount. Enter the original price and discount percentage to see the discount amount and final price."
        inputs={[
          { name: 'price', label: 'Original Price', type: 'number', placeholder: 'Enter original price', defaultValue: '' },
          { name: 'discountPercent', label: 'Discount (%)', type: 'number', placeholder: 'Enter discount percentage', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ price, discountPercent }) => {
          const p = parseFloat(price)
          const d = parseFloat(discountPercent)
          if (Number.isNaN(p) || Number.isNaN(d)) {
            return { error: 'Please enter valid numbers for price and discount percentage.' }
          }
          const discount = (p * d) / 100
          const finalPrice = p - discount
          return {
            discount: isFinite(discount) ? discount : 'Invalid input',
            finalPrice: isFinite(finalPrice) ? finalPrice : 'Invalid input',
            formula: `${price} × ${discountPercent} ÷ 100 = ${discount}`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          A discount reduces the original price by a percentage. Multiply the price by the discount rate and divide by 100 to get the discount amount, then subtract it from the original price to get the final price.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use decimals in the discount?</h3>
        <p>
          Yes. You can enter decimal percentages like 12.5 for more precise discounts.
        </p>

        <h3>Is the discount amount the same as the final price?</h3>
        <p>
          No. The discount amount is what you save. The final price is what you pay after applying the discount.
        </p>

        <h3>What if I want to apply multiple discounts?</h3>
        <p>
          Apply discounts sequentially by using the final price from one discount as the original price for the next.
        </p>
      </section>
    </>
  )
}

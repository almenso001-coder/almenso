import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CurrencyConverter() {
  return (
    <>
      <CalculatorTemplate
        title="Currency Converter — Convert Between Currencies"
        description="Convert an amount from one currency to another using an exchange rate."
        inputs={[
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'e.g., 100', defaultValue: '' },
          { name: 'exchangeRate', label: 'Exchange Rate (1 unit = ?)', type: 'number', placeholder: 'e.g., 0.013', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ amount, exchangeRate }) => {
          const val = parseFloat(amount)
          const rate = parseFloat(exchangeRate)

          if (Number.isNaN(val) || Number.isNaN(rate)) {
            return { error: 'Please enter valid numbers.' }
          }

          return {
            converted: (val * rate).toFixed(2),
            formula: 'Converted = Amount * Exchange Rate'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the amount in the original currency and the exchange rate (how much one unit is worth in the target currency). Click Calculate to see the converted value.
        </p>
        <p>
          Exchange rates change frequently, so use a recent rate from a trusted source for accurate results.
        </p>

        <h2>Benefits</h2>
        <p>
          A currency converter is essential for travel planning, international purchases, or comparing prices across markets. It helps you estimate costs and avoid surprises.
        </p>
        <p>
          This tool gives a quick estimate without needing a full financial app.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include fees?</h3>
        <p>
          No. This calculator uses a straight conversion. To include fees, adjust the exchange rate downward or add a separate fee calculation.
        </p>
        <h3>Can I convert between three currencies?</h3>
        <p>
          This tool converts between two currencies at a time. For more steps, convert sequentially using multiple runs.
        </p>
      </section>
    </>
  )
}

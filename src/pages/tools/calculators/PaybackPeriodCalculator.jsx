import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function PaybackPeriodCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Payback Period Calculator — Time to Recover Investment"
        description="Calculate how long it takes to recover an investment from periodic cash inflows."
        inputs={[
          { name: 'investment', label: 'Initial Investment', type: 'number', placeholder: 'e.g., 20000', defaultValue: '' },
          { name: 'cashInflow', label: 'Annual Cash Inflow', type: 'number', placeholder: 'e.g., 5000', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ investment, cashInflow }) => {
          const inv = parseFloat(investment)
          const inflow = parseFloat(cashInflow)

          if (Number.isNaN(inv) || Number.isNaN(inflow) || inv <= 0 || inflow <= 0) {
            return { error: 'Enter positive numbers for investment and cash inflow.' }
          }

          const years = inv / inflow
          const wholeYears = Math.floor(years)
          const remainingMonths = Math.round((years - wholeYears) * 12)

          return {
            paybackYears: wholeYears,
            extraMonths: remainingMonths,
            totalYears: years.toFixed(2),
            formula: 'Payback period = Investment / Annual cash inflow'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the amount invested and the expected annual cash inflow (profit, savings, revenue). Click Calculate to estimate how many years it takes to recover the investment.
        </p>
        <p>
          This tool assumes consistent cash inflow each year. For variable cash flows, consider a discounted payback analysis or a full cash flow model.
        </p>

        <h2>Benefits</h2>
        <p>
          A payback period helps evaluate whether an investment is worth the time horizon. Shorter payback periods often feel less risky, but they don’t capture long-term profitability.
        </p>
        <p>
          Use it as a rough screening tool before doing deeper financial analysis.
        </p>

        <h2>FAQ</h2>
        <h3>Does this include interest?</h3>
        <p>
          No. This is a simple payback calculation. For time value of money, use a discounted cash flow or internal rate of return (IRR) model.
        </p>
        <h3>What if cash inflow changes each year?</h3>
        <p>
          You can run multiple scenarios with different inflow estimates or build a cash flow schedule in a spreadsheet.
        </p>
      </section>
    </>
  )
}

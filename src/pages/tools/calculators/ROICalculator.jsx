import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ROICalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free ROI Calculator — Return on Investment" 
        description="Calculate the return on investment (ROI) percentage using gain and cost values. Useful for evaluating investment performance." 
        inputs={[
          { name: 'gain', label: 'Gain from Investment', type: 'number', placeholder: 'Enter gain or return', defaultValue: '' },
          { name: 'cost', label: 'Cost of Investment', type: 'number', placeholder: 'Enter initial cost', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ gain, cost }) => {
          const g = parseFloat(gain)
          const c = parseFloat(cost)
          if (Number.isNaN(g) || Number.isNaN(c) || c === 0) {
            return { error: 'Please enter valid numbers and ensure cost is not zero.' }
          }
          const roi = ((g - c) / c) * 100
          return {
            roi: isFinite(roi) ? roi : 'Invalid input',
            formula: `ROI = (Gain - Cost) ÷ Cost × 100 = ${roi}%`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total amount you received (gain) and the amount you invested (cost). The calculator computes the return on investment as a percentage.
          This helps you compare different investments by normalizing returns relative to the money you put in.
        </p>

        <h2>Benefits</h2>
        <p>
          ROI provides a straightforward way to assess whether an investment is worth the cost. It makes it easy to compare performance across projects or assets, even if the amounts differ.
          Investors and business owners use ROI to prioritize investments and decide where to allocate funds.
        </p>

        <h2>FAQ</h2>
        <h3>Is ROI the same as profit?</h3>
        <p>
          Not exactly. ROI is a percentage that describes how much profit you made relative to the cost of the investment.
          Profit is the absolute amount gained (gain minus cost).
        </p>

        <h3>Can ROI be negative?</h3>
        <p>
          Yes. A negative ROI means the investment lost money. The larger the negative number, the greater the loss.
        </p>

        <h3>Should I include fees?</h3>
        <p>
          For accurate ROI, include all costs and gains, including fees, taxes, and commissions. That gives a truer picture of performance.
        </p>
      </section>
    </>
  )
}

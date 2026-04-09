import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function InvestmentReturnCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Investment Return Calculator — Calculate ROI" 
        description="Estimate your investment's future value given principal, annual return, and investment period." 
        inputs={[
          { name: 'principal', label: 'Principal Amount', type: 'number', placeholder: 'Enter initial investment', defaultValue: '' },
          { name: 'annualReturn', label: 'Annual Return (%)', type: 'number', placeholder: 'Enter average annual return', defaultValue: '' },
          { name: 'years', label: 'Years Invested', type: 'number', placeholder: 'Enter investment duration', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ principal, annualReturn, years }) => {
          const p = parseFloat(principal)
          const r = parseFloat(annualReturn) / 100
          const n = parseFloat(years)

          if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(n) || n <= 0) {
            return { error: 'Please enter valid numbers and ensure years is greater than zero.' }
          }

          const futureValue = p * Math.pow(1 + r, n)
          const growth = futureValue - p
          const roi = (growth / p) * 100

          return {
            futureValue: isFinite(futureValue) ? futureValue : 'Invalid input',
            roi: isFinite(roi) ? roi : 'Invalid input',
            formula: `Future value = P × (1 + r)^n; ROI = ((Future - P) / P) × 100`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your initial investment, expected annual return rate, and how many years you plan to invest.
          This calculates the future value of your investment under compound growth and estimates total return.
        </p>

        <h2>Why compound interest matters</h2>
        <p>
          Compounding means you earn returns on both your principal and previously earned interest.
          Over time, this can significantly increase your investment value compared to simple interest.
        </p>

        <h2>FAQ</h2>
        <h3>Does this consider fees or taxes?</h3>
        <p>
          No. This tool assumes a constant net return. Fees, taxes, and inflation are not accounted for.
        </p>

        <h3>What if the return rate changes each year?</h3>
        <p>
          This calculator assumes a steady average return. For variable returns, use a more detailed investment analysis tool.
        </p>

        <h3>What is a good ROI?</h3>
        <p>
          It depends on the risk profile and investment type. Compare ROI with benchmarks like stock indices, bond yields, or target inflation.
        </p>
      </section>
    </>
  )
}

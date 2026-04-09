import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function NetWorthCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Net Worth Calculator — Assets Minus Liabilities"
        description="Calculate your net worth by comparing total assets to total liabilities."
        inputs={[
          { name: 'assets', label: 'Total Assets', type: 'number', placeholder: 'e.g., 150000', defaultValue: '' },
          { name: 'liabilities', label: 'Total Liabilities', type: 'number', placeholder: 'e.g., 60000', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ assets, liabilities }) => {
          const a = parseFloat(assets)
          const l = parseFloat(liabilities)
          if (Number.isNaN(a) || Number.isNaN(l)) {
            return { error: 'Please enter numeric values.' }
          }
          const net = a - l
          return {
            assets: a.toFixed(2),
            liabilities: l.toFixed(2),
            netWorth: net.toFixed(2),
            status: net >= 0 ? 'Positive net worth' : 'Negative net worth'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total value of your assets (cash, investments, property) and your total liabilities (debts, loans, credit cards). Click Calculate to find your net worth.
        </p>
        <p>
          A positive net worth means you own more than you owe, while a negative number indicates more debt than assets.
        </p>

        <h2>Benefits</h2>
        <p>
          Tracking net worth over time is a simple way to measure financial progress. It helps you see whether you’re building wealth, staying flat, or falling behind.
        </p>
        <p>
          It also provides a snapshot that can inform budgeting, saving, and debt reduction decisions.
        </p>

        <h2>FAQ</h2>
        <h3>What counts as an asset?</h3>
        <p>
          Include cash, savings, investments, property equity, and other possessions with resale value.
        </p>
        <h3>Should I include retirement accounts?</h3>
        <p>
          Yes — include retirement accounts like 401(k) and IRAs. If you prefer, track retirement separately but it still contributes to net worth.
        </p>
      </section>
    </>
  )
}

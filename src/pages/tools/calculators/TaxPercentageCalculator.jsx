import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function TaxPercentageCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Tax Percentage Calculator — Rate & Amount Conversion"
        description="Convert between tax amount and tax percentage based on taxable income."
        inputs={[
          { name: 'income', label: 'Taxable Income', type: 'number', placeholder: 'e.g., 50000', defaultValue: '' },
          { name: 'taxAmount', label: 'Tax Amount', type: 'number', placeholder: 'e.g., 7500', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ income, taxAmount }) => {
          const inc = parseFloat(income)
          const tax = parseFloat(taxAmount)

          if (Number.isNaN(inc) || Number.isNaN(tax) || inc <= 0) {
            return { error: 'Enter valid numbers with income greater than zero.' }
          }

          const rate = (tax / inc) * 100
          return {
            taxPercentage: rate.toFixed(2) + '%',
            formula: 'Tax % = (Tax amount / Income) * 100'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter your taxable income and the amount of tax paid. Click Calculate to see the effective tax rate as a percentage.
        </p>
        <p>
          This calculator helps you understand what fraction of your income is going to taxes.
        </p>

        <h2>Benefits</h2>
        <p>
          Knowing your effective tax rate can help with budgeting, comparing tax burdens, and planning for changes in income or deductions.
        </p>
        <p>
          It can also be useful when evaluating job offers or freelance rates after taxes.
        </p>

        <h2>FAQ</h2>
        <h3>Does this reflect my marginal tax rate?</h3>
        <p>
          No. This shows your average tax rate (tax paid divided by income). Your marginal rate depends on tax brackets and deductions.
        </p>
        <h3>Can I use this for sales tax?</h3>
        <p>
          Yes — just treat income as the purchase price and tax amount as the sales tax paid.
        </p>
      </section>
    </>
  )
}

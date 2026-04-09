import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LoanCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Loan Calculator — Calculate Monthly Loan EMI"
        description="Estimate the monthly payment for a loan using loan amount, annual interest rate, and loan term in years."
        inputs={[
          { name: 'loanAmount', label: 'Loan Amount', type: 'number', placeholder: 'Enter loan amount', defaultValue: '' },
          { name: 'interestRate', label: 'Interest Rate (%)', type: 'number', placeholder: 'Enter annual interest rate', defaultValue: '' },
          { name: 'loanTerm', label: 'Loan Term (years)', type: 'number', placeholder: 'Enter loan term in years', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ loanAmount, interestRate, loanTerm }) => {
          const p = parseFloat(loanAmount)
          const annualRate = parseFloat(interestRate)
          const years = parseFloat(loanTerm)
          if (Number.isNaN(p) || Number.isNaN(annualRate) || Number.isNaN(years)) {
            return { error: 'Please enter valid values for loan amount, interest rate, and term.' }
          }
          const monthlyRate = annualRate / 12 / 100
          const n = years * 12
          if (monthlyRate <= 0 || n <= 0) {
            return { error: 'Interest rate and loan term must be greater than zero.' }
          }
          const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
          return {
            monthlyPayment: isFinite(emi) ? emi : 'Invalid input',
            formula: `EMI = (P × r × (1+r)^n) / ((1+r)^n - 1)`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          Monthly payments for a loan (EMI) depend on the loan amount, annual interest rate, and loan term. The formula spreads the interest and principal equally over the loan duration.
        </p>

        <h2>FAQ</h2>
        <h3>What is EMI?</h3>
        <p>
          EMI stands for Equated Monthly Installment. It's the fixed amount you pay each month until the loan is fully repaid.
        </p>

        <h3>Can I change the loan term?</h3>
        <p>
          Yes. Increasing the loan term lowers the monthly payment but increases the total interest paid over the loan duration.
        </p>

        <h3>What happens if the interest rate is 0%?</h3>
        <p>
          A 0% interest loan means the monthly payment is simply the loan amount divided by the number of months.
        </p>
      </section>
    </>
  )
}

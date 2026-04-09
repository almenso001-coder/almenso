import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function EMICalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free EMI Calculator – Calculate Loan EMI Online"
        description="Calculate your monthly EMI, total payment, and total interest for a loan. Enter loan amount, annual interest rate, and tenure in years."
        inputs={[
          { name: 'loanAmount', label: 'Loan Amount', type: 'number', placeholder: 'Enter loan amount', defaultValue: '' },
          { name: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'Enter annual interest rate', defaultValue: '' },
          { name: 'tenureYears', label: 'Tenure (years)', type: 'number', placeholder: 'Enter tenure in years', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ loanAmount, interestRate, tenureYears }) => {
          const p = parseFloat(loanAmount)
          const annualRate = parseFloat(interestRate)
          const years = parseFloat(tenureYears)
          if (Number.isNaN(p) || Number.isNaN(annualRate) || Number.isNaN(years)) {
            return { error: 'Please enter valid numbers for loan amount, interest rate, and tenure.' }
          }
          const monthlyRate = annualRate / 12 / 100
          const n = years * 12
          if (monthlyRate <= 0 || n <= 0) {
            return { error: 'Interest rate and tenure must be greater than zero.' }
          }
          const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
          const totalPayment = emi * n
          const totalInterest = totalPayment - p
          return {
            emi: isFinite(emi) ? emi : 'Invalid input',
            totalPayment: isFinite(totalPayment) ? totalPayment : 'Invalid input',
            totalInterest: isFinite(totalInterest) ? totalInterest : 'Invalid input',
            formula: `EMI = (P × r × (1+r)^n) / ((1+r)^n - 1)`
          }
        }}
      />

      <section className="calc-info">
        <h2>Explanation</h2>
        <p>
          EMI (Equated Monthly Installment) is the fixed amount you pay every month for a loan. It depends on the loan amount, annual interest rate, and the loan tenure in years.
        </p>

        <h2>FAQ</h2>
        <h3>What is the interest rate in EMI?</h3>
        <p>
          The interest rate is annual and converted to a monthly rate in the EMI formula. A higher rate increases the EMI and total interest paid.
        </p>

        <h3>How do I reduce my EMI?</h3>
        <p>
          You can reduce EMI by lowering the loan amount, reducing the interest rate, or increasing the tenure (longer tenure lowers EMI but increases total interest).
        </p>

        <h3>Is the total payment same as EMI?</h3>
        <p>
          No. Total payment = EMI × number of months. It includes the principal plus the total interest paid over the loan duration.
        </p>
      </section>
    </>
  )
}

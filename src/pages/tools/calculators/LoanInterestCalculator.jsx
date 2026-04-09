import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LoanInterestCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Loan Interest Calculator — Estimate Total Interest" 
        description="Calculate total interest paid over the life of a loan using principal, annual interest rate, and loan term." 
        inputs={[
          { name: 'principal', label: 'Loan Amount', type: 'number', placeholder: 'Enter loan amount', defaultValue: '' },
          { name: 'annualInterest', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'Enter interest rate', defaultValue: '' },
          { name: 'years', label: 'Loan Term (years)', type: 'number', placeholder: 'Enter years', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ principal, annualInterest, years }) => {
          const p = parseFloat(principal)
          const r = parseFloat(annualInterest) / 100
          const n = parseFloat(years)

          if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(n) || n <= 0) {
            return { error: 'Please enter valid numbers and ensure loan term is greater than zero.' }
          }

          // Simple interest calculation (without compounding) for the total cost.
          const totalInterest = p * r * n
          const totalPayment = p + totalInterest

          return {
            totalInterest: isFinite(totalInterest) ? totalInterest : 'Invalid input',
            totalPayment: isFinite(totalPayment) ? totalPayment : 'Invalid input',
            formula: `Total interest = P × r × n; Total payment = P + total interest.`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the loan amount, annual interest rate, and loan term in years. This calculator uses simple interest, which is useful for estimating the total cost of a loan.
        </p>

        <h2>When to use simple interest</h2>
        <p>
          Many loans compound interest (e.g., mortgages or credit cards). Use this when your loan uses simple interest or when you need a quick estimation.
        </p>

        <h2>FAQ</h2>
        <h3>How is this different from EMI?</h3>
        <p>
          EMI calculators use amortization formulas with periodic compounding. This tool gives a simpler, high-level estimate of interest costs.
        </p>

        <h3>What if my loan compounds monthly?</h3>
        <p>
          For compounding loans, consider using a mortgage or amortization calculator that models periodic compounding.
        </p>

        <h3>Can this show monthly payments?</h3>
        <p>
          No. It only estimates total interest and payment over the loan term using simple interest.
        </p>
      </section>
    </>
  )
}

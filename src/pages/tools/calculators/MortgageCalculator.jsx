import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function MortgageCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Mortgage Calculator — Monthly Payment & Interest"
        description="Estimate monthly mortgage payments, total interest, and total cost over the loan term."
        inputs={[
          { name: 'loanAmount', label: 'Loan Amount', type: 'number', placeholder: 'e.g., 250000', defaultValue: '' },
          { name: 'annualInterestRate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'e.g., 4.5', defaultValue: '' },
          { name: 'termYears', label: 'Term (years)', type: 'number', placeholder: 'e.g., 30', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ loanAmount, annualInterestRate, termYears }) => {
          const principal = parseFloat(loanAmount)
          const annualRate = parseFloat(annualInterestRate) / 100
          const years = parseFloat(termYears)

          if (!principal || !annualRate || !years) {
            return { error: 'Please provide all inputs.' }
          }

          const monthlyRate = annualRate / 12
          const totalPayments = years * 12
          const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
          const totalPaid = monthlyPayment * totalPayments
          const totalInterest = totalPaid - principal

          return {
            monthlyPayment: isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : 'Invalid input',
            totalPaid: isFinite(totalPaid) ? totalPaid.toFixed(2) : 'Invalid input',
            totalInterest: isFinite(totalInterest) ? totalInterest.toFixed(2) : 'Invalid input',
            formula: 'M = P*r / (1 - (1+r)^-n)'
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Fill in the loan amount, annual interest rate, and loan term in years. Click Calculate to see your estimated monthly payment, the total amount paid over the loan, and the total interest.
        </p>
        <p>
          This tool assumes a fixed interest rate and fixed monthly payments, which is the standard for most mortgages. It does not include taxes, insurance, or other fees.
        </p>

        <h2>Benefits</h2>
        <p>
          A mortgage calculator helps you compare loan terms, gauge affordability, and plan your budget. Knowing your monthly payment and total interest helps you decide whether to shop for a better rate or shorten the loan term.
        </p>
        <p>
          Running the numbers ahead of time can prevent surprises and give you more confidence when talking to lenders.
        </p>

        <h2>FAQ</h2>
        <h3>Can I include taxes and insurance?</h3>
        <p>
          This calculator focuses on principal and interest. You can add an estimated monthly amount for taxes and insurance to the result manually.
        </p>
        <h3>What if my rate is variable?</h3>
        <p>
          For variable rates, you can run this tool multiple times with different rate assumptions to see how payments change.
        </p>
      </section>
    </>
  )
}

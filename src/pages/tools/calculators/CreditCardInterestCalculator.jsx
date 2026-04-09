import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function CreditCardInterestCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Credit Card Interest Calculator — Estimate Interest Charges" 
        description="Estimate how much interest you pay on a credit card balance using annual rate and balance duration." 
        inputs={[
          { name: 'balance', label: 'Balance', type: 'number', placeholder: 'Enter credit card balance', defaultValue: '' },
          { name: 'annualRate', label: 'Annual Rate (%)', type: 'number', placeholder: 'Enter APR', defaultValue: '' },
          { name: 'days', label: 'Days Outstanding', type: 'number', placeholder: 'Enter days balance carried', defaultValue: '' },
        ]}
        affCategory="finance"
      hasResult={true}
        formula={({ balance, annualRate, days }) => {
          const bal = parseFloat(balance)
          const r = parseFloat(annualRate) / 100
          const d = parseFloat(days)

          if (Number.isNaN(bal) || Number.isNaN(r) || Number.isNaN(d) || d <= 0) {
            return { error: 'Please enter valid numbers and ensure days outstanding is greater than zero.' }
          }

          const dailyRate = r / 365
          const interest = bal * dailyRate * d

          return {
            interest: isFinite(interest) ? interest : 'Invalid input',
            formula: `Interest = Balance × (APR / 365) × Days = ${interest}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Provide your current balance, annual percentage rate (APR), and how many days you carry the balance.
          This gives an estimate of interest costs for the period.
        </p>

        <h2>How interest is calculated</h2>
        <p>
          Credit cards often calculate daily interest and accumulate it each day. This tool approximates that by converting APR to a daily rate.
        </p>

        <h2>FAQ</h2>
        <h3>Does this reflect my statement balance?</h3>
        <p>
          It estimates interest based on the given balance and assumes it stays constant for the period. Actual interest may vary with daily balance changes.
        </p>

        <h3>What if I pay more than the minimum?</h3>
        <p>
          Paying more reduces your balance and thus lowers interest charges in subsequent periods. This tool does not model payment schedules.
        </p>

        <h3>Is APR always the same as interest rate?</h3>
        <p>
          APR includes fees and other costs. This calculator uses APR as the annual interest rate for simplicity.</p>
      </section>
    </>
  )
}

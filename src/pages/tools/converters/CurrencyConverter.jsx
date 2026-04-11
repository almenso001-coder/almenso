import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function CurrencyConverter() {
  return (
    <ConverterTemplate
      emoji="💱"
      heroColor="linear-gradient(135deg,#0f172a,#15803d)"
      title="Currency Converter — USD, EUR, GBP, INR"
      description="Convert between US dollars, euros, British pounds and Indian rupees with fixed sample rates. Great for quick estimates."
      converterName="Currency"
      baseUnit="USD"
      inputs={[
        { name: 'usd', label: 'US Dollars (USD)', type: 'number', placeholder: 'Enter amount in USD', defaultValue: '' },
      ]}
      formula={({ usd }) => {
        const u = parseFloat(usd)
        if (Number.isNaN(u)) {
          return { error: 'Please enter a valid amount in USD.' }
        }
        // These sample rates are approximate and for quick estimates only.
        const eur = u * 0.92
        const gbp = u * 0.79
        const inr = u * 83.0
        return {
          eur: isFinite(eur) ? Number(eur.toFixed(2)) : 'Invalid input',
          gbp: isFinite(gbp) ? Number(gbp.toFixed(2)) : 'Invalid input',
          inr: isFinite(inr) ? Number(inr.toFixed(2)) : 'Invalid input',
        }
      }}
    />
  )
}

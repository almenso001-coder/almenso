import React, { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom'

const calculatorMap = {
  'mortgage-calculator': () => import('./MortgageCalculator'),
  'budget-calculator': () => import('./BudgetCalculator'),
  'savings-goal-calculator': () => import('./SavingsGoalCalculator'),
  'inflation-calculator': () => import('./InflationCalculator'),
  'currency-converter': () => import('./CurrencyConverter'),
  'net-worth-calculator': () => import('./NetWorthCalculator'),
  'retirement-calculator': () => import('./RetirementCalculator'),
  'payback-period-calculator': () => import('./PaybackPeriodCalculator'),
  'cost-per-unit-calculator': () => import('./CostPerUnitCalculator'),
  'tax-percentage-calculator': () => import('./TaxPercentageCalculator'),
  'log-calculator': () => import('./LogCalculator'),
  'exponent-calculator': () => import('./ExponentCalculator'),
  'factorial-calculator': () => import('./FactorialCalculator'),
  'gcd-calculator': () => import('./GCDCalculator'),
  'lcm-calculator': () => import('./LCMCalculator'),
  'mean-calculator': () => import('./MeanCalculator'),
  'median-calculator': () => import('./MedianCalculator'),
  'mode-calculator': () => import('./ModeCalculator'),
  'standard-deviation-calculator': () => import('./StandardDeviationCalculator'),
  'permutation-combination-calculator': () => import('./PermutationCombinationCalculator'),
  'calorie-calculator': () => import('./CalorieCalculator'),
  'body-fat-calculator': () => import('./BodyFatCalculator'),
  'water-intake-calculator': () => import('./WaterIntakeCalculator'),
  'ideal-body-weight-calculator': () => import('./IdealBodyWeightCalculator'),
  'heart-rate-calculator': () => import('./HeartRateCalculator'),
  'ohms-law-calculator': () => import('./OhmsLawCalculator'),
  'power-factor-calculator': () => import('./PowerFactorCalculator'),
  'energy-consumption-calculator': () => import('./EnergyConsumptionCalculator'),
  'led-resistor-calculator': () => import('./LEDResistorCalculator'),
  'electrical-load-calculator': () => import('./ElectricalLoadCalculator'),
}

export default function CalculatorRouter() {
  const { calculator } = useParams()
  const loader = calculatorMap[calculator]

  const Component = useMemo(() => {
    if (!loader) return null
    return React.lazy(loader)
  }, [loader])

  if (!Component) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h1>Calculator not found</h1>
        <p>We couldn't find the calculator you are looking for. Check the URL or return to the calculators list.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

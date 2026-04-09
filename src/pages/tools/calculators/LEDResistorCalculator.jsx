import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function LEDResistorCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="LED Resistor Calculator"
        description="Calculate the resistor value needed for an LED given supply voltage, LED voltage drop, and current."
        inputs={[
          { name: 'supplyVoltage', label: 'Supply Voltage (V)', type: 'number', placeholder: 'e.g., 5', defaultValue: '' },
          { name: 'ledVoltage', label: 'LED Forward Voltage (V)', type: 'number', placeholder: 'e.g., 2', defaultValue: '' },
          { name: 'ledCurrent', label: 'LED Current (mA)', type: 'number', placeholder: 'e.g., 20', defaultValue: '20' },
        ]}
        affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
        formula={({ supplyVoltage, ledVoltage, ledCurrent }) => {
          const vSupply = parseFloat(supplyVoltage)
          const vLed = parseFloat(ledVoltage)
          const mA = parseFloat(ledCurrent)
          if ([vSupply, vLed, mA].some(v => Number.isNaN(v))) {
            return { error: 'Enter valid numbers.' }
          }
          const currentA = mA / 1000
          const resistor = (vSupply - vLed) / currentA
          return { resistorOhms: resistor.toFixed(1), formula: 'R = (Vs - Vf) / I' }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the supply voltage, the LED forward voltage drop, and the desired current in milliamps. Click Calculate to get the recommended resistor value in ohms.
        </p>
        <p>
          If you have multiple LEDs in series, adjust the LED voltage accordingly.
        </p>

        <h2>Benefits</h2>
        <p>
          This calculator prevents burning out LEDs by ensuring the correct current flows through the device. It is useful for DIY electronics and prototyping.
        </p>
        <p>
          It also helps you choose the nearest standard resistor value.
        </p>

        <h2>FAQ</h2>
        <h3>What if the result is negative?</h3>
        <p>
          A negative value means the supply voltage is lower than the LED voltage; the circuit will not work without a higher supply voltage.
        </p>
        <h3>Can I use more than one LED?</h3>
        <p>
          Yes, but add the LED voltage drops together and calculate for the total.
        </p>
      </section>
    </>
  )
}

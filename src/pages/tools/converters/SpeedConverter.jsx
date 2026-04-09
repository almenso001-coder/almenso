import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function SpeedConverter() {
  return (
    <ConverterTemplate
      title="Speed Converter — km/h, m/s, mph & Knots"
      description="Convert speed between kilometers per hour, meters per second, miles per hour and knots. Great for travel, sports, and navigation." 
      converterName="Speed"
      baseUnit="km/h"
      inputs={[
        { name: 'kmh', label: 'Kilometers per hour (km/h)', type: 'number', placeholder: 'Enter speed in km/h', defaultValue: '' },
      ]}
      formula={({ kmh }) => {
        const v = parseFloat(kmh)
        if (Number.isNaN(v)) {
          return { error: 'Please enter a valid speed in km/h.' }
        }
        const metersPerSecond = v / 3.6
        const milesPerHour = v * 0.621371
        const knots = v * 0.539957
        return {
          metersPerSecond: isFinite(metersPerSecond) ? Number(metersPerSecond.toFixed(3)) : 'Invalid input',
          milesPerHour: isFinite(milesPerHour) ? Number(milesPerHour.toFixed(3)) : 'Invalid input',
          knots: isFinite(knots) ? Number(knots.toFixed(3)) : 'Invalid input',
        }
      }}
    />
  )
}

import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const CONVERSIONS = {
  length: {
    name: 'Length',
    units: {
      mm: { name: 'Millimeter', toBase: 0.001 },
      cm: { name: 'Centimeter', toBase: 0.01 },
      m: { name: 'Meter', toBase: 1 },
      km: { name: 'Kilometer', toBase: 1000 },
      in: { name: 'Inch', toBase: 0.0254 },
      ft: { name: 'Foot', toBase: 0.3048 },
      yd: { name: 'Yard', toBase: 0.9144 },
      mi: { name: 'Mile', toBase: 1609.344 }
    }
  },
  weight: {
    name: 'Weight',
    units: {
      mg: { name: 'Milligram', toBase: 0.000001 },
      g: { name: 'Gram', toBase: 0.001 },
      kg: { name: 'Kilogram', toBase: 1 },
      t: { name: 'Ton', toBase: 1000 },
      oz: { name: 'Ounce', toBase: 0.0283495 },
      lb: { name: 'Pound', toBase: 0.453592 },
      st: { name: 'Stone', toBase: 6.35029 }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      c: { name: 'Celsius', toBase: (val) => val, fromBase: (val) => val },
      f: { name: 'Fahrenheit', toBase: (val) => (val - 32) * 5/9, fromBase: (val) => val * 9/5 + 32 },
      k: { name: 'Kelvin', toBase: (val) => val - 273.15, fromBase: (val) => val + 273.15 }
    }
  },
  area: {
    name: 'Area',
    units: {
      'mm²': { name: 'Square Millimeter', toBase: 0.000001 },
      'cm²': { name: 'Square Centimeter', toBase: 0.0001 },
      'm²': { name: 'Square Meter', toBase: 1 },
      'km²': { name: 'Square Kilometer', toBase: 1000000 },
      'in²': { name: 'Square Inch', toBase: 0.00064516 },
      'ft²': { name: 'Square Foot', toBase: 0.092903 },
      'yd²': { name: 'Square Yard', toBase: 0.836127 },
      'ac': { name: 'Acre', toBase: 4046.86 },
      'ha': { name: 'Hectare', toBase: 10000 }
    }
  },
  volume: {
    name: 'Volume',
    units: {
      'mm³': { name: 'Cubic Millimeter', toBase: 0.000000001 },
      'cm³': { name: 'Cubic Centimeter', toBase: 0.000001 },
      'ml': { name: 'Milliliter', toBase: 0.000001 },
      'l': { name: 'Liter', toBase: 0.001 },
      'm³': { name: 'Cubic Meter', toBase: 1 },
      'in³': { name: 'Cubic Inch', toBase: 0.0000163871 },
      'ft³': { name: 'Cubic Foot', toBase: 0.0283168 },
      'yd³': { name: 'Cubic Yard', toBase: 0.764555 },
      'gal': { name: 'Gallon (US)', toBase: 0.00378541 },
      'qt': { name: 'Quart (US)', toBase: 0.000946353 },
      'pt': { name: 'Pint (US)', toBase: 0.000473176 },
      'cup': { name: 'Cup (US)', toBase: 0.000236588 }
    }
  },
  time: {
    name: 'Time',
    units: {
      ns: { name: 'Nanosecond', toBase: 0.000000001 },
      μs: { name: 'Microsecond', toBase: 0.000001 },
      ms: { name: 'Millisecond', toBase: 0.001 },
      s: { name: 'Second', toBase: 1 },
      min: { name: 'Minute', toBase: 60 },
      h: { name: 'Hour', toBase: 3600 },
      d: { name: 'Day', toBase: 86400 },
      w: { name: 'Week', toBase: 604800 },
      mo: { name: 'Month (30 days)', toBase: 2592000 },
      y: { name: 'Year (365 days)', toBase: 31536000 }
    }
  }
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('ft')
  const [inputValue, setInputValue] = useState('1')
  const [result, setResult] = useState('')

  const convert = useMemo(() => {
    if (!inputValue || isNaN(inputValue)) return ''

    const value = parseFloat(inputValue)
    const cat = CONVERSIONS[category]
    if (!cat) return ''

    const from = cat.units[fromUnit]
    const to = cat.units[toUnit]
    if (!from || !to) return ''

    let baseValue

    // Special handling for temperature
    if (category === 'temperature') {
      baseValue = from.toBase ? from.toBase(value) : value
      const result = to.fromBase ? to.fromBase(baseValue) : baseValue
      return result.toFixed(6).replace(/\.?0+$/, '')
    }

    // Normal conversion
    baseValue = value * from.toBase
    const converted = baseValue / to.toBase

    return converted.toFixed(6).replace(/\.?0+$/, '')
  }, [category, fromUnit, toUnit, inputValue])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setInputValue(result || '1')
  }

  const getCategoryUnits = (cat) => {
    return Object.keys(CONVERSIONS[cat].units)
  }

  const formatNumber = (num) => {
    if (!num) return ''
    const n = parseFloat(num)
    if (n >= 1000000) return n.toExponential(2)
    if (n >= 1000) return n.toLocaleString()
    return n.toString()
  }

  return (
    <ToolWrapper
      title="Unit Converter — Online Unit Conversion"
      description="Length, weight, temperature, area, volume, time — sab units convert karo instantly."
      keywords="unit converter, unit conversion, length converter, weight converter, temperature converter, metric conversion"
      emoji="🔄"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #06b6d4 100%)"
      toolName="Unit Converter"
      tagline="Convert Units · All Categories · Instant Results"
      guideSteps={[
        { heading: 'Category choose karo', text: 'Length, weight, temperature etc. se select karo.' },
        { heading: 'Units set karo', text: 'From aur to units select karo.' },
        { heading: 'Value daalo', text: 'Convert karne wali value enter karo.' },
        { heading: 'Result dekho', text: 'Instant conversion result milega.' },
      ]}
      faqs={[
        { q: 'Kitne categories support hote hain?', a: '6 categories: Length, Weight, Temperature, Area, Volume, Time.' },
        { q: 'Temperature conversion kaise hota hai?', a: 'Celsius, Fahrenheit, Kelvin — sab ke beech automatic conversion.' },
        { q: 'Decimal places kitne hain?', a: '6 decimal places tak accurate results, trailing zeros remove.' },
        { q: 'Large numbers kaise handle hote hain?', a: 'Scientific notation mein convert ho jaate hain.' },
      ]}
      relatedBlog={{ slug: 'unit-conversion-guide', title: 'Unit Conversion Guide', excerpt: 'Measurements aur conversions ke basics.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/percentage-calculator', emoji: '📊', name: 'Percentage Calculator' },
        { path: '/tools/gst-calculator', emoji: '🧾', name: 'GST Calculator' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🔄 Unit Conversion</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>📂 Category</label>
            <select value={category} onChange={e => {
              const newCat = e.target.value
              setCategory(newCat)
              const units = getCategoryUnits(newCat)
              setFromUnit(units[0])
              setToUnit(units[1] || units[0])
            }}>
              {Object.keys(CONVERSIONS).map(cat => (
                <option key={cat} value={cat}>{CONVERSIONS[cat].name}</option>
              ))}
            </select>
          </div>

          <div className="tw-field">
            <label>📥 From</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
              {getCategoryUnits(category).map(unit => (
                <option key={unit} value={unit}>
                  {unit} - {CONVERSIONS[category].units[unit].name}
                </option>
              ))}
            </select>
          </div>

          <div className="tw-field">
            <label>📤 To</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
              {getCategoryUnits(category).map(unit => (
                <option key={unit} value={unit}>
                  {unit} - {CONVERSIONS[category].units[unit].name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="tw-field" style={{ flex: 1 }}>
              <label>🔢 Value</label>
              <input
                type="number"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
            <button
              onClick={swapUnits}
              style={{
                padding: '8px',
                background: '#f3f4f6',
                border: '1.5px solid #e5e7eb',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
              title="Swap units"
            >
              ⇅
            </button>
          </div>
        </div>
      </div>

      {convert && (
        <div className="tp-card">
          <div className="tp-sec-title">📊 Conversion Result</div>
          <div style={{
            padding: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12,
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
              {formatNumber(inputValue)} {fromUnit}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
              = {formatNumber(convert)} {toUnit}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {CONVERSIONS[category].units[fromUnit].name} to {CONVERSIONS[category].units[toUnit].name}
            </div>
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Unit Conversion Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Unit conversion har field mein zaroori skill hai — engineering se lekar cooking tak. Different countries aur systems different units use karte hain. Yeh guide aapko sikhaega ki conversions kaise karein accurately aur efficiently.
          </p>

          <h3>1. Metric vs Imperial Systems</h3>
          <p>
            <strong>Metric System:</strong> Most countries use karte hain. Base 10, logical.
          </p>
          <ul>
            <li>Length: mm, cm, m, km</li>
            <li>Weight: mg, g, kg, t</li>
            <li>Volume: ml, l, m³</li>
          </ul>
          <p>
            <strong>Imperial/US System:</strong> US mein common. Historical reasons se.
          </p>
          <ul>
            <li>Length: inch, foot, yard, mile</li>
            <li>Weight: ounce, pound, stone</li>
            <li>Volume: pint, quart, gallon</li>
          </ul>

          <h3>2. Common Conversion Factors</h3>
          <ul>
            <li>1 meter = 3.28084 feet</li>
            <li>1 kilogram = 2.20462 pounds</li>
            <li>1 liter = 0.264172 gallons</li>
            <li>1 Celsius = (Fahrenheit-32) × 5/9</li>
            <li>1 square meter = 10.7639 square feet</li>
          </ul>

          <h3>3. Temperature Conversions</h3>
          <p>
            Temperature special case hai kyunki zero points different hain:
          </p>
          <ul>
            <li><strong>Celsius to Fahrenheit:</strong> (°C × 9/5) + 32</li>
            <li><strong>Fahrenheit to Celsius:</strong> (°F - 32) × 5/9</li>
            <li><strong>Celsius to Kelvin:</strong> °C + 273.15</li>
            <li><strong>Absolute zero:</strong> 0K = -273.15°C = -459.67°F</li>
          </ul>

          <h3>4. Area Conversions</h3>
          <p>
            Area = length × length, so square factors use karo:
          </p>
          <ul>
            <li>1 m² = 10,000 cm²</li>
            <li>1 acre = 4,046.86 m²</li>
            <li>1 hectare = 10,000 m²</li>
            <li>1 square foot = 0.0929 m²</li>
          </ul>

          <h3>5. Volume Conversions</h3>
          <p>
            Volume = length × length × length:
          </p>
          <ul>
            <li>1 m³ = 1,000 liters</li>
            <li>1 liter = 1,000 ml</li>
            <li>1 gallon (US) = 3.78541 liters</li>
            <li>1 cubic foot = 28.3168 liters</li>
          </ul>

          <h3>6. Time Conversions</h3>
          <p>
            Time conversions straightforward hain:
          </p>
          <ul>
            <li>1 minute = 60 seconds</li>
            <li>1 hour = 3,600 seconds</li>
            <li>1 day = 86,400 seconds</li>
            <li>1 year = 31,536,000 seconds (approximately)</li>
          </ul>

          <h3>7. Precision Matters</h3>
          <p>
            Different applications mein different precision chahiye:
          </p>
          <ul>
            <li><strong>Engineering:</strong> 4-6 decimal places</li>
            <li><strong>Cooking:</strong> 1-2 decimal places</li>
            <li><strong>Construction:</strong> 2-3 decimal places</li>
            <li><strong>Finance:</strong> 2 decimal places</li>
          </ul>

          <h3>8. Common Mistakes</h3>
          <ul>
            <li>Square/cubic conversions bhoolna</li>
            <li>Temperature formulas galat use karna</li>
            <li>Significant figures ignore karna</li>
            <li>Unit prefixes (kilo, milli) bhoolna</li>
          </ul>

          <h3>9. Digital Tools</h3>
          <p>
            Modern conversion tools:
          </p>
          <ul>
            <li>Google: "100 USD in INR"</li>
            <li>Unit converter apps</li>
            <li>Calculator built-in converters</li>
            <li>Spreadsheet functions</li>
          </ul>

          <h3>10. Real-world Applications</h3>
          <ul>
            <li><strong>Cooking:</strong> Recipes convert karna</li>
            <li><strong>Travel:</strong> Distance aur fuel economy</li>
            <li><strong>Shopping:</strong> International prices</li>
            <li><strong>Health:</strong> Weight aur height tracking</li>
            <li><strong>Science:</strong> Lab measurements</li>
          </ul>

          <h3>11. International Standards</h3>
          <p>
            SI (International System of Units) global standard hai:
          </p>
          <ul>
            <li>Base units: meter, kilogram, second, ampere, kelvin, mole, candela</li>
            <li>Prefixes: nano (10^-9), micro (10^-6), milli (10^-3), kilo (10^3), mega (10^6)</li>
          </ul>

          <h3>12. Future of Units</h3>
          <p>
            Modern developments:
          </p>
          <ul>
            <li>Digital units (bytes, pixels)</li>
            <li>Environmental units (carbon footprint)</li>
            <li>Cryptocurrency units</li>
            <li>Space measurements</li>
          </ul>

          <p>
            Yeh tool basic conversions ke liye perfect hai. Complex calculations ke liye scientific calculators ya software use karo. Practice se aap expert ban jaoge unit conversions mein!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
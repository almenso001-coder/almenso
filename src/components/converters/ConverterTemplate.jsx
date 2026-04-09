import React, { useMemo, useState } from 'react'
import ToolWrapper from '../ToolWrapper'

/**
 * A reusable converter template for building unit conversion tools.
 *
 * Props:
 * - title: string (page title + H1)
 * - description: string (meta description + subtitle)
 * - converterName: string (e.g. "Length", "Weight")
 * - baseUnit: string (e.g. "meters", "kilograms")
 * - inputs: Array<{ name: string, label: string, type?: string, placeholder?: string, defaultValue?: any }>
 * - formula: (values: Record<string, any>) => any
 * - affCategory: string (optional, for affiliate widget)
 * - toolPath: string (optional, for related tools)
 * - heroColor: string (optional)
 * - emoji: string (optional)
 */
export default function ConverterTemplate({
  title, description, converterName, baseUnit, inputs = [], formula,
  affCategory = null, toolPath = null,
  heroColor = '#0f766e', emoji = '🔄',
  keywords = '',
}) {
  const initialValues = useMemo(() => {
    const base = {}
    inputs.forEach(i => { base[i.name] = i.defaultValue ?? '' })
    return base
  }, [inputs])

  const [values, setValues] = useState(initialValues)
  const [result, setResult] = useState(null)
  const [hasResult, setHasResult] = useState(false)

  const handleChange = name => event => {
    setValues(prev => ({ ...prev, [name]: event.target.value }))
  }

  const handleReset = () => {
    setValues(initialValues)
    setResult(null)
    setHasResult(false)
  }

  const handleCalculate = () => {
    if (typeof formula === 'function') {
      try {
        const res = formula(values)
        setResult(res)
        if (res && !res.error) setHasResult(true)
      } catch (e) {
        setResult({ error: 'Calculation failed. Check inputs.' })
        console.error('ConverterTemplate formula error:', e)
      }
    }
  }

  const formattedResult = useMemo(() => {
    if (result === null || result === undefined) return null
    if (typeof result === 'object') return result
    return { result }
  }, [result])

  const faqs = [
    {
      q: `Can I use this for any ${converterName.toLowerCase()} unit type?`,
      a: `Yes. This converter is built for reliable ${converterName.toLowerCase()} conversions. If you need a unit that isn't included, convert to the closest available unit and adjust from there.`,
    },
    {
      q: 'How accurate are the conversions?',
      a: 'Standard conversion factors are used. Accurate for everyday needs — double-check for engineering or scientific work.',
    },
    {
      q: 'What should I do if the result is not what I expect?',
      a: `Make sure you entered the ${baseUnit} value correctly. Use Reset to clear and start fresh.`,
    },
    {
      q: 'Is this suitable for professional use?',
      a: 'Yes for most planning and everyday scenarios. For highly precise work, verify with dedicated tools.',
    },
  ]

  const guideSteps = [
    { heading: `Enter value in ${baseUnit}`, text: `Type your ${converterName.toLowerCase()} value in the input field.` },
    { heading: 'Click Convert', text: 'Press the Convert button to see all equivalent values.' },
    { heading: 'Use your result', text: 'Copy the converted value you need — or reset to try another.' },
  ]

  return (
    <ToolWrapper
      title={title}
      description={description}
      keywords={keywords}
      toolName={`${converterName} Converter`}
      emoji={emoji}
      heroColor={heroColor}
      tagline={`Convert ${converterName} units instantly — free, fast, no login`}
      affCategory={affCategory}
      toolPath={toolPath}
      hasResult={hasResult}
      faqs={faqs}
      guideSteps={guideSteps}
    >
      <div className="conv-wrap">
        <div className="conv-inputs">
          {inputs.map(input => (
            <label key={input.name} className="conv-row">
              <span className="conv-label">{input.label}</span>
              <input
                type={input.type || 'number'}
                value={values[input.name]}
                placeholder={input.placeholder || ''}
                onChange={handleChange(input.name)}
                className="conv-input"
              />
            </label>
          ))}
          <div className="conv-actions">
            <button className="conv-btn-primary" onClick={handleCalculate}>
              🔄 Convert
            </button>
            <button className="conv-btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {result !== null && (
          <div className={`conv-result ${hasResult ? 'conv-result-show' : ''}`}>
            {formattedResult && typeof formattedResult === 'object' && !formattedResult.error
              ? Object.entries(formattedResult).map(([k, v]) => (
                  <div key={k} className="conv-result-row">
                    <span className="conv-result-key">
                      {k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                    </span>
                    <span className="conv-result-val">{String(v)}</span>
                  </div>
                ))
              : formattedResult?.error
                ? <div className="conv-error">⚠️ {formattedResult.error}</div>
                : <div className="conv-result-row"><span className="conv-result-val">{String(formattedResult)}</span></div>
            }
          </div>
        )}
      </div>

      <style>{`
        .conv-wrap { padding: 0; }
        .conv-inputs { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); margin-bottom: 16px; }
        .conv-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .conv-label { font-size: 0.85rem; font-weight: 600; color: #374151; }
        .conv-input { padding: 10px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 1rem; outline: none; transition: border 0.2s; }
        .conv-input:focus { border-color: #0f766e; }
        .conv-actions { display: flex; gap: 10px; margin-top: 6px; }
        .conv-btn-primary { flex: 1; padding: 11px; background: linear-gradient(135deg, #0f766e, #0d9488); color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }
        .conv-btn-secondary { padding: 11px 18px; background: #f1f5f9; color: #374151; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer; }
        .conv-result { background: #f0fdf9; border: 1.5px solid #0f766e33; border-radius: 12px; padding: 16px; animation: convFadeIn 0.3s ease; }
        .conv-result-show { }
        @keyframes convFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .conv-result-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #0f766e18; }
        .conv-result-row:last-child { border-bottom: none; }
        .conv-result-key { font-size: 0.85rem; color: #374151; font-weight: 500; }
        .conv-result-val { font-size: 1rem; font-weight: 700; color: #0f766e; }
        .conv-error { color: #dc2626; font-size: 0.9rem; padding: 8px; background: #fef2f2; border-radius: 6px; }
      `}</style>
    </ToolWrapper>
  )
}

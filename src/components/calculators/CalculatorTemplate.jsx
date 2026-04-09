/**
 * CalculatorTemplate v2 — Improved UI
 * Changes:
 * - Real-time calculation (onChange)
 * - Copy result button
 * - Input validation with red border + error messages
 * - Better result display with formatting
 * - Animated result reveal
 * - Clean, modern design
 */
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import SEOHead from '../SEOHead'
import './CalculatorTemplate.css'

// Format numbers nicely: 1234567 → 12,34,567 (Indian)
function formatIndian(num) {
  if (typeof num !== 'number' || !isFinite(num)) return String(num)
  return num.toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

// Friendly label from camelCase key
function friendlyLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .replace(/_/g, ' ')
    .trim()
}

export default function CalculatorTemplate({
  title, description,
  inputs = [],
  formula,
  affCategory,
}) {
  const initialValues = useMemo(() => {
    const base = {}
    inputs.forEach(i => { base[i.name] = i.defaultValue ?? '' })
    return base
  }, [inputs])

  const [values, setValues]     = useState(initialValues)
  const [errors, setErrors]     = useState({})
  const [result, setResult]     = useState(null)
  const [copied, setCopied]     = useState(false)
  const [touched, setTouched]   = useState({})
  const [animate, setAnimate]   = useState(false)

  // Validate a single field
  const validateField = useCallback((input, value) => {
    if (input.required !== false && value === '') return 'Yeh field zaroori hai'
    if (input.type === 'number' && value !== '') {
      const n = parseFloat(value)
      if (isNaN(n)) return 'Sirf number enter karein'
      if (input.min !== undefined && n < input.min) return `Min value: ${input.min}`
      if (input.max !== undefined && n > input.max) return `Max value: ${input.max}`
    }
    return null
  }, [])

  // Run calculation
  const calculate = useCallback((vals) => {
    if (typeof formula !== 'function') return
    // Validate all fields first
    const newErrors = {}
    let hasError = false
    inputs.forEach(input => {
      const err = validateField(input, vals[input.name])
      if (err) { newErrors[input.name] = err; hasError = true }
    })
    setErrors(newErrors)
    if (hasError) { setResult(null); return }

    try {
      const res = formula(vals)
      setResult(res)
      setAnimate(false)
      setTimeout(() => setAnimate(true), 10)
    } catch (e) {
      setResult({ error: 'Calculation failed. Check inputs.' })
    }
  }, [formula, inputs, validateField])

  // Real-time calculation on change
  const handleChange = useCallback((name) => (e) => {
    const value = e.target.value
    setValues(prev => {
      const next = { ...prev, [name]: value }
      calculate(next)
      return next
    })
    // Show error only if user has touched this field
    if (touched[name]) {
      const input = inputs.find(i => i.name === name)
      if (input) {
        const err = validateField(input, value)
        setErrors(prev => ({ ...prev, [name]: err }))
      }
    }
  }, [touched, inputs, validateField, calculate])

  const handleBlur = useCallback((name) => () => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const input = inputs.find(i => i.name === name)
    if (input) {
      const err = validateField(input, values[name])
      setErrors(prev => ({ ...prev, [name]: err }))
    }
  }, [inputs, values, validateField])

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setResult(null)
    setAnimate(false)
  }

  // Copy result to clipboard
  const handleCopy = () => {
    if (!result) return
    const text = Object.entries(result)
      .filter(([k]) => k !== 'error' && k !== 'formula')
      .map(([k, v]) => `${friendlyLabel(k)}: ${typeof v === 'number' ? formatIndian(v) : v}`)
      .join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const formattedResult = useMemo(() => {
    if (!result) return null
    if (typeof result === 'object') return result
    return { result }
  }, [result])

  const hasResult = formattedResult && !formattedResult.error
  const hasError  = formattedResult?.error

  return (
    <div className="calc-page">
      <SEOHead title={title} description={description} />

      <div className="calc-card">
        {/* Input panel */}
        <div className="calc-panel-inputs">
          <div className="calc-panel-header">
            <span className="calc-panel-icon">🔢</span>
            <h2>Values Enter Karein</h2>
          </div>

          <div className="calc-inputs">
            {inputs.map(input => (
              <div key={input.name} className={`calc-field ${errors[input.name] ? 'has-error' : values[input.name] !== '' ? 'has-value' : ''}`}>
                <label className="calc-label">{input.label}</label>
                {input.type === 'select' ? (
                  <select
                    className="calc-input"
                    value={values[input.name]}
                    onChange={handleChange(input.name)}
                    onBlur={handleBlur(input.name)}
                  >
                    <option value="">-- Select --</option>
                    {input.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : input.type === 'textarea' ? (
                  <textarea
                    className="calc-input"
                    value={values[input.name]}
                    placeholder={input.placeholder || ''}
                    onChange={handleChange(input.name)}
                    onBlur={handleBlur(input.name)}
                    rows={input.rows || 3}
                  />
                ) : (
                  <input
                    className="calc-input"
                    type={input.type || 'text'}
                    value={values[input.name]}
                    placeholder={input.placeholder || ''}
                    onChange={handleChange(input.name)}
                    onBlur={handleBlur(input.name)}
                  />
                )}
                {errors[input.name] && (
                  <span className="calc-field-error">⚠ {errors[input.name]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="calc-actions">
            <button className="calc-btn-primary" onClick={() => { setTouched(Object.fromEntries(inputs.map(i => [i.name, true]))); calculate(values) }}>
              <span>⚡</span> Calculate
            </button>
            <button className="calc-btn-secondary" onClick={handleReset}>
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Result panel */}
        <div className="calc-panel-result">
          <div className="calc-panel-header">
            <span className="calc-panel-icon">📊</span>
            <h2>Result</h2>
            {hasResult && (
              <button className="calc-copy-btn" onClick={handleCopy}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>

          {!result && (
            <div className="calc-empty">
              <div className="calc-empty-ico">🧮</div>
              <p>Values enter karo — result turant dikhega</p>
            </div>
          )}

          {hasError && (
            <div className="calc-error-box">
              <span>⚠️</span> {formattedResult.error}
            </div>
          )}

          {hasResult && (
            <div className={`calc-results ${animate ? 'calc-results-in' : ''}`}>
              {Object.entries(formattedResult)
                .filter(([k]) => k !== 'error')
                .map(([k, v], i) => {
                  const isFormula = k === 'formula'
                  const isFirst = i === 0
                  const numVal = typeof v === 'number'
                  return (
                    <div key={k} className={`calc-result-row ${isFirst ? 'calc-result-primary' : ''} ${isFormula ? 'calc-result-formula' : ''}`}>
                      <span className="calc-result-label">{friendlyLabel(k)}</span>
                      <span className="calc-result-value">
                        {numVal ? (isFormula ? String(v) : formatIndian(v)) : String(v)}
                      </span>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

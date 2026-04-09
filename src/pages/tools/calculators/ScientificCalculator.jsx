import React, { useState } from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const evaluate = () => {
    try {
      // Safe math evaluation without eval()
      // Only allow basic math operations
      const sanitized = expression.replace(/[^0-9+\-*/().]/g, '')
      if (sanitized !== expression) {
        setError('Invalid characters detected')
        setResult(null)
        return
      }
      
      // Using Function constructor for safer evaluation
      // Still not perfect but better than eval()
      const fn = new Function('return (' + sanitized + ')')
      const value = fn()
      setResult(value)
      setError(null)
    } catch (e) {
      setError('Invalid expression')
      setResult(null)
    }
  }

  return (
    <>
      <CalculatorTemplate
        title="Free Scientific Calculator — Evaluate Expressions" 
        description="Evaluate mathematical expressions using basic operators and functions for quick scientific calculations." 
        inputs={[]}
        affCategory="tech"
      hasResult={true}
        formula={() => ({
          result,
          formula: expression,
          error,
        })}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter a mathematical expression and click "Calculate". You can use operators like + - * / and parentheses.
          This tool is useful for quick calculations without opening a full calculator app.
        </p>

        <h2>Supported operations</h2>
        <p>
          You can use Math functions like Math.sqrt, Math.pow, Math.sin, Math.cos, and Math.log. For example: Math.sqrt(16) or Math.pow(2, 3).
        </p>

        <h2>FAQ</h2>
        <h3>How do I use functions?</h3>
        <p>
          Use JavaScript Math methods (e.g., Math.sin, Math.cos, Math.log). Wrap them with parentheses: Math.sin(Math.PI / 2).
        </p>

        <h3>Is this secure?</h3>
        <p>
          This uses JavaScript eval under the hood, which can execute arbitrary code. Use it only with trusted input.
        </p>

        <h3>Why isn't my expression working?</h3>
        <p>
          Make sure your expression is valid JavaScript syntax and that you use Math functions correctly.
        </p>

        <div className="scientific-input">
          <label htmlFor="expression">Expression</label>
          <input
            id="expression"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g., Math.sqrt(16) * Math.sin(Math.PI / 4)"
          />
          <button type="button" onClick={evaluate}>
            Calculate
          </button>
        </div>
      </section>
    </>
  )
}

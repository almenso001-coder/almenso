import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const randomHex = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  return `#${hex}`
}

export default function GradientGenerator() {
  const [angle, setAngle] = useState(135)
  const [colors, setColors] = useState([randomHex(), randomHex()])
  const [css, setCss] = useState('')

  const generate = () => {
    const newColors = [randomHex(), randomHex()]
    setColors(newColors)
    setCss(`background: linear-gradient(${angle}deg, ${newColors.join(', ')});`)
  }

  return (
    <ToolWrapper
      title="Gradient Generator — Create CSS Gradient Backgrounds"
      description="Generate beautiful CSS gradients with two random colors and copy the code instantly."
      keywords="gradient generator, css gradient, background gradient, gradient code"
      emoji="🌈"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Gradient Generator"
      tagline="Create and copy CSS gradients in seconds."
      guideSteps={[
        { heading: 'Adjust angle', text: 'Set the direction of the gradient.' },
        { heading: 'Generate', text: 'Create a new random gradient.' },
        { heading: 'Copy CSS', text: 'Use the code in your stylesheet.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Can I use this in CSS?', a: 'Yes — copy the generated CSS and paste it into your stylesheet or style attribute.' },
        { q: 'How many colors can a gradient have?', a: 'You can add more colors by editing the code yourself, but this tool generates two-color gradients for simplicity.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎨 Gradient Preview</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Angle (degrees)</label>
            <input
              type="number"
              value={angle}
              min={0}
              max={360}
              onChange={e => setAngle(Number(e.target.value))}
              style={{ width: 120, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🌈 Generate Gradient
          </button>

          {css && (
            <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: 24, background: `linear-gradient(${angle}deg, ${colors.join(', ')})`, color: '#fff' }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Preview</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{colors.join(' → ')}</div>
              </div>
              <div style={{ padding: 14, background: '#f8fafc' }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>CSS</div>
                <textarea
                  value={css}
                  readOnly
                  rows={2}
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #cbd5e1', fontFamily: 'monospace' }}
                />
                <button
                  onClick={() => navigator.clipboard.writeText(css)}
                  style={{ marginTop: 10, padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
                >
                  📋 Copy CSS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Set a gradient angle, then click "Generate Gradient" to create a fresh combo of two colors. The preview shows how the gradient will look and provides a ready-to-copy CSS snippet. Paste the CSS into your project to apply the gradient background.
        </p>

        <h2>Benefits</h2>
        <p>
          Gradients add depth and modern flair to your designs. This generator helps you quickly create eye-catching backgrounds without needing design skills or time-consuming color selection.
        </p>
        <p>
          Use gradients in hero sections, buttons, and cards to give your UI a polished feel. The CSS snippet makes it easy to apply the exact gradient across your site.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I customize the colors?</strong><br />
          A: You can edit the generated CSS snippet to use your own colors or adjust the angle to fit your design.
        </p>
        <p>
          <strong>Q: What can I use gradients for?</strong><br />
          A: Use them for hero sections, buttons, cards, backgrounds, or any place where you want a modern look.
        </p>
      </div>
    </ToolWrapper>
  )
}

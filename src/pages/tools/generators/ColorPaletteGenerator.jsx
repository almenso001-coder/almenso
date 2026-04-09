import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const randomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  return `#${hex}`
}

export default function ColorPaletteGenerator() {
  const [count, setCount] = useState(5)
  const [palette, setPalette] = useState([])

  const generate = () => {
    const colors = []
    for (let i = 0; i < count; i++) {
      colors.push(randomColor())
    }
    setPalette(colors)
  }

  return (
    <ToolWrapper
      title="Color Palette Generator — Create Palette Ideas"
      description="Generate harmonious color palettes for UI design, branding, or art projects."
      keywords="color palette generator, palette ideas, color scheme generator, design palette"
      emoji="🎨"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Color Palette Generator"
      tagline="Generate and copy beautiful color palettes instantly."
      guideSteps={[
        { heading: 'Choose palette size', text: 'Pick how many colors you want.' },
        { heading: 'Generate palette', text: 'Get a new set of colors with one click.' },
        { heading: 'Copy hex codes', text: 'Use the colors in your design tools.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Can I adjust the colors?', a: 'This generates random palettes. For fine-tuning, use a design editor or color tool.' },
        { q: 'How do I use hex codes?', a: 'Copy the hex code and paste into design apps like Figma, Photoshop, or CSS.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎨 Color Palette</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ maxWidth: 220 }}>
            <label>Colors in palette</label>
            <input
              type="number"
              min={2}
              max={8}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🧩 Generate Palette
          </button>

          {palette.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${palette.length}, 1fr)`, gap: 8, marginTop: 16 }}>
              {palette.map(color => (
                <button
                  key={color}
                  onClick={() => navigator.clipboard.writeText(color)}
                  style={{
                    height: 100,
                    borderRadius: 12,
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: color,
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Choose how many colors you want and click "Generate Palette". Each color swatch shows a hex code you can copy and paste into your design tool or CSS code. Use the palette for UI themes, branding, or artwork.
        </p>

        <h2>Benefits</h2>
        <p>
          A good color palette brings cohesion to your designs and helps create a consistent visual identity. This tool generates quick inspiration so you can focus on making layouts and components look polished.
        </p>
        <p>
          Experiment with different palettes to find combinations that fit your brand or mood. Save or note the hex codes you like to reuse across your website, graphics, or marketing materials.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Are these colors guaranteed to look good together?</strong><br />
          A: The tool generates random palettes. You can try multiple times until you find a set that works for your project.
        </p>
        <p>
          <strong>Q: How do I use these in CSS?</strong><br />
          A: Copy the hex codes and use them as values for CSS properties like background-color, color, border, etc.
        </p>
      </div>
    </ToolWrapper>
  )
}

import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3)
  const [output, setOutput] = useState('')

  const generate = () => {
    const text = Array.from({ length: paragraphs }, () => LOREM).join('\n\n')
    setOutput(text)
  }

  return (
    <ToolWrapper
      title="Lorem Ipsum Generator — Dummy Text for Design"
      description="Generate placeholder lorem ipsum text for layouts, mockups, and templates."
      keywords="lorem ipsum generator, placeholder text, dummy text, sample copy"
      emoji="📝"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Lorem Ipsum Generator"
      tagline="Get placeholder text instantly."
      guideSteps={[
        { heading: 'Choose number of paragraphs', text: 'Decide how much text you need.' },
        { heading: 'Generate', text: 'Create lorem ipsum paragraphs with one click.' },
        { heading: 'Copy and paste', text: 'Use the text in your designs or mockups.' },
      ]}
            affCategory="finance"
      hasResult={true}
      faqs={[
        { q: 'What is lorem ipsum?', a: 'It is placeholder text derived from Latin, commonly used in design and publishing as filler content.' },
        { q: 'Can I customize the text?', a: 'This tool generates standard lorem ipsum. For custom text, edit the output after generation.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📄 Lorem Ipsum</div>
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ maxWidth: 220 }}>
            <label>Paragraphs</label>
            <input
              type="number"
              min={1}
              max={10}
              value={paragraphs}
              onChange={e => setParagraphs(Number(e.target.value))}
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            📄 Generate Ipsum
          </button>

          {output && (
            <div>
              <textarea
                value={output}
                onChange={e => setOutput(e.target.value)}
                rows={10}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
              />
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                style={{ marginTop: 10, padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
              >
                📋 Copy Text
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Select how many paragraphs you need and click "Generate". The tool will output standard lorem ipsum placeholder text that you can paste into your mockups, templates, or website drafts. You can modify the text as needed after generation.
        </p>

        <h2>Benefits</h2>
        <p>
          Lorem ipsum helps focus on layout and design without getting distracted by actual content. This generator makes it easy to create consistent filler text for prototypes, wireframes, and sample pages.
        </p>
        <p>
          Having placeholder text ready speeds up the design process and improves feedback loops. You can quickly swap in real content later while keeping the structure intact.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Why use lorem ipsum?</strong><br />
          A: It prevents design decisions from being influenced by content and gives a more realistic visual impression of typography and spacing.
        </p>
        <p>
          <strong>Q: Can I use this in production?</strong><br />
          A: Lorem ipsum is meant for placeholder use only. Replace it with real content before launching.
        </p>
      </div>
    </ToolWrapper>
  )
}

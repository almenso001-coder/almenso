import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const STREETS = ['Maple St', 'Oak Ave', 'Cedar Rd', 'Pine Lane', 'Sunset Blvd', 'River View', 'Garden Way', 'Parkside Dr']
const CITIES = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Jaipur']
const STATES = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Rajasthan', 'Delhi']

export default function FakeAddressGenerator() {
  const [address, setAddress] = useState('')

  const generate = () => {
    const street = STREETS[Math.floor(Math.random() * STREETS.length)]
    const city = CITIES[Math.floor(Math.random() * CITIES.length)]
    const state = STATES[Math.floor(Math.random() * STATES.length)]
    const pin = Math.floor(100000 + Math.random() * 900000)

    setAddress(`${Math.floor(1 + Math.random() * 499)}, ${street}, ${city}, ${state} - ${pin}, India`)
  }

  return (
    <ToolWrapper
      title="Fake Address Generator — Create Dummy Addresses"
      description="Generate realistic-looking addresses for testing, mock data, or design prototypes."
      keywords="fake address generator, dummy address, test data, fake location"
      emoji="📍"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Fake Address Generator"
      tagline="Generate realistic example addresses immediately."
      guideSteps={[
        { heading: 'Generate address', text: 'Click to create a new dummy address.' },
        { heading: 'Use for testing', text: 'Paste into forms, mock data sets, or designs.' },
        { heading: 'Generate again', text: 'Create multiple addresses by regenerating.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Is this a real address?', a: 'No. The generator combines random pieces to create realistic but fictional addresses.' },
        { q: 'Can I change the country?', a: 'The current tool outputs Indian-style addresses; you can edit the code for other formats.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🏠 Generated Address</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🧩 Generate Address
          </button>

          {address && (
            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #cbd5e1' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Example Address</div>
              <div style={{ wordBreak: 'break-word', fontSize: '0.95rem' }}>{address}</div>
              <button
                onClick={() => navigator.clipboard.writeText(address)}
                style={{ marginTop: 12, padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
              >
                📋 Copy Address
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Click the button to generate a fake address. Use the copy button to paste it into forms, mock data, or design placeholders. Each click creates a new combination of street, city, state, and PIN code.
        </p>

        <h2>Benefits</h2>
        <p>
          Fake addresses are useful when you need example data for testing, prototyping, or sharing demos without exposing real personal information. This tool helps you avoid using actual user data while keeping formats realistic.
        </p>
        <p>
          You can use these addresses in mock signups, sample receipts, or UI designs. Using consistent-looking fake data helps your prototypes look polished without risking privacy.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I use these for real deliveries?</strong><br />
          A: No. These addresses are fictional and not linked to actual locations.
        </p>
        <p>
          <strong>Q: Can I customize the format?</strong><br />
          A: Yes — you can edit the source code to change the structure, country, or address components.
        </p>
      </div>
    </ToolWrapper>
  )
}

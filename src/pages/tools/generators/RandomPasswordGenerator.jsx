import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUM = '0123456789'
const SYM = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export default function RandomPasswordGenerator() {
  const [length, setLength] = useState(12)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('')

  const generate = () => {
    let chars = ''
    if (includeLower) chars += LOWER
    if (includeUpper) chars += UPPER
    if (includeNumbers) chars += NUM
    if (includeSymbols) chars += SYM
    if (!chars) {
      setPassword('')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const strength = useMemo(() => {
    if (!password) return 'No password'
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Medium'
    return 'Strong'
  }, [password])

  return (
    <ToolWrapper
      title="Random Password Generator — Secure Password Maker"
      description="Create strong passwords instantly with customizable length and character sets."
      keywords="random password generator, strong password, secure password, password creator"
      emoji="🔑"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Random Password Generator"
      tagline="Generate strong passwords you can trust."
      guideSteps={[
        { heading: 'Choose length', text: 'Pick how long you want the password to be.' },
        { heading: 'Select character types', text: 'Include letters, numbers, and symbols.' },
        { heading: 'Generate', text: 'Get a random password instantly.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'How strong is the password?', a: 'Strength depends on length and variety of characters. More types and longer length = stronger password.' },
        { q: 'Should I store the password?', a: 'Use a password manager to store and retrieve passwords securely.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎲 Password Generator</div>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={includeLower} onChange={e => setIncludeLower(e.target.checked)} />
              Lowercase
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={includeUpper} onChange={e => setIncludeUpper(e.target.checked)} />
              Uppercase
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} />
              Numbers
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} />
              Symbols
            </label>
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🔐 Generate Password
          </button>

          {password && (
            <div style={{ padding: 14, borderRadius: 12, background: '#0f172a', color: 'white' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, wordBreak: 'break-all' }}>{password}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Strength: {strength}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(password)}
                  style={{ padding: '8px 12px', background: '#10b981', border: 'none', borderRadius: 10, cursor: 'pointer', color: 'white' }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Choose a password length and the types of characters you want to include. Click "Generate Password" to create a secure, random password. Copy it to your clipboard and use it for new accounts or to update existing ones.
        </p>

        <h2>Benefits</h2>
        <p>
          Strong passwords protect your accounts from brute force and guessing attacks. This generator helps you create passwords that are hard to crack while still being easy to copy when needed. Using a unique password for each service helps keep your digital life secure.
        </p>
        <p>
          Pair this tool with a password manager to store and organize generated passwords securely. This way you can use long, complex passwords without having to remember each one manually.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: What password length is recommended?</strong><br />
          A: Aim for at least 12 characters. Longer is better, especially when using a mix of letters, numbers, and symbols.
        </p>
        <p>
          <strong>Q: Should I reuse passwords?</strong><br />
          A: No. Use a different password for each account to reduce risk in case one password is compromised.
        </p>
      </div>
    </ToolWrapper>
  )
}

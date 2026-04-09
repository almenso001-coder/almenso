import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let chars = ''
    if (includeLowercase) chars += LOWERCASE
    if (includeUppercase) chars += UPPERCASE
    if (includeNumbers) chars += NUMBERS
    if (includeSymbols) chars += SYMBOLS

    if (!chars) {
      setPassword('')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  const strength = useMemo(() => {
    if (!password) return { level: 0, text: 'No password', color: '#666' }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (score <= 2) return { level: 1, text: 'Weak', color: '#ef4444' }
    if (score <= 4) return { level: 2, text: 'Medium', color: '#f59e0b' }
    if (score <= 5) return { level: 3, text: 'Strong', color: '#10b981' }
    return { level: 4, text: 'Very Strong', color: '#059669' }
  }, [password])

  const getPasswordHints = () => {
    const hints = []
    if (password.length < 8) hints.push('Use at least 8 characters')
    if (!/[a-z]/.test(password)) hints.push('Include lowercase letters')
    if (!/[A-Z]/.test(password)) hints.push('Include uppercase letters')
    if (!/[0-9]/.test(password)) hints.push('Include numbers')
    if (!/[^a-zA-Z0-9]/.test(password)) hints.push('Include special characters')
    return hints
  }

  return (
    <ToolWrapper
      title="Password Generator — Strong Password Creator"
      description="Secure passwords generate karo — customizable length aur character types."
      keywords="password generator, strong password, secure password, random password, password creator"
      emoji="🔐"
      heroColor="linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
      toolName="Password Generator"
      tagline="Secure Passwords · Instant Generation · Copy to Clipboard"
      guideSteps={[
        { heading: 'Length set karo', text: '8-32 characters ke beech choose karo.' },
        { heading: 'Character types select karo', text: 'Lowercase, uppercase, numbers, symbols.' },
        { heading: 'Generate karo', text: 'Strong password instantly milega.' },
        { heading: 'Copy karo', text: 'Clipboard mein save karo aur use karo.' },
      ]}
      faqs={[
        { q: 'Kitna strong password chahiye?', a: 'Minimum 12 characters, sabhi types include karo.' },
        { q: 'Symbols kya add karun?', a: '!, @, #, $, %, ^, &, * etc. — avoid confusing ones.' },
        { q: 'Password store kaise karun?', a: 'Password manager use karo, never plain text mein.' },
        { q: 'Same password multiple sites pe?', a: 'Never! Har site ka unique password banao.' },
      ]}
      relatedBlog={{ slug: 'password-security-guide', title: 'Password Security Guide', excerpt: 'Strong passwords banane aur manage karne ke tips.' }}
      relatedTools={[
        { path: '/tools/qr-code-generator', emoji: '📱', name: 'QR Code Generator' },
        { path: '/tools/text-case-converter', emoji: '📝', name: 'Text Case Converter' }
      ]}
      affCategory="tech"
      hasResult={true}
      toolPath="/tools/password-generator"
    >
      <div className="tp-card">
        <div className="tp-sec-title">🔐 Password Generator</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>📏 Length: {length} characters</label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={e => setLength(parseInt(e.target.value))}
              style={{ width: '100%', marginTop: 8 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', marginTop: 4 }}>
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          <div className="tw-field">
            <label>🔤 Character Types</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={e => setIncludeLowercase(e.target.checked)}
                />
                <span>Lowercase (a-z)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={e => setIncludeUppercase(e.target.checked)}
                />
                <span>Uppercase (A-Z)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={e => setIncludeNumbers(e.target.checked)}
                />
                <span>Numbers (0-9)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={e => setIncludeSymbols(e.target.checked)}
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 16
            }}
          >
            🎲 Generate Password
          </button>
        </div>
      </div>

      {password && (
        <div className="tp-card">
          <div className="tp-sec-title">🔑 Generated Password</div>
          <div style={{
            padding: 20,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: 12,
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'monospace',
              marginBottom: 12,
              wordBreak: 'break-all',
              letterSpacing: 1
            }}>
              {password}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 12
            }}>
              <div style={{
                padding: '4px 12px',
                background: strength.color,
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {strength.text}
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  background: copied ? '#10b981' : '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                {copied ? '✅' : '📋'} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {getPasswordHints().length > 0 && (
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                💡 Tips: {getPasswordHints().join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">🛡️ Password Security Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Strong passwords internet security ki foundation hain. Weak passwords se accounts hack ho jaate hain aur personal data compromise ho jaata hai. Yeh guide aapko strong passwords banane aur manage karne ka complete roadmap deta hai.
          </p>

          <h3>1. Password Strength Factors</h3>
          <ul>
            <li><strong>Length:</strong> Minimum 12 characters, ideal 16+</li>
            <li><strong>Complexity:</strong> Uppercase, lowercase, numbers, symbols</li>
            <li><strong>Unpredictability:</strong> Random combination, no patterns</li>
            <li><strong>Uniqueness:</strong> Har account ka different password</li>
          </ul>

          <h3>2. Common Password Mistakes</h3>
          <ul>
            <li>123456, password, qwerty — most common weak passwords</li>
            <li>Birth dates, pet names, phone numbers</li>
            <li>Keyboard patterns (qwerty, asdf)</li>
            <li>Simple word variations (password123, admin123)</li>
          </ul>

          <h3>3. Password Best Practices</h3>
          <ul>
            <li><strong>Use Passphrases:</strong> "Blue Horse Battery Staple" better than "BhBs12!"</li>
            <li><strong>Password Managers:</strong> LastPass, Bitwarden, 1Password</li>
            <li><strong>Two-Factor Authentication:</strong> Always enable 2FA</li>
            <li><strong>Regular Updates:</strong> Change passwords every 3-6 months</li>
          </ul>

          <h3>4. Password Manager Benefits</h3>
          <ul>
            <li>Generate strong, unique passwords automatically</li>
            <li>Store passwords securely with encryption</li>
            <li>Auto-fill login forms</li>
            <li>Sync across devices</li>
            <li>Monitor for breaches</li>
          </ul>

          <h3>5. Two-Factor Authentication (2FA)</h3>
          <ul>
            <li><strong>App-based:</strong> Google Authenticator, Authy</li>
            <li><strong>SMS-based:</strong> Convenient but less secure</li>
            <li><strong>Hardware keys:</strong> YubiKey, most secure</li>
            <li><strong>Biometric:</strong> Fingerprint, face recognition</li>
          </ul>

          <h3>6. Password Recovery</h3>
          <ul>
            <li>Use security questions wisely</li>
            <li>Set up recovery email/phone</li>
            <li>Never share recovery codes</li>
            <li>Have backup authentication methods</li>
          </ul>

          <h3>7. Business Password Policies</h3>
          <ul>
            <li>Minimum length requirements</li>
            <li>Complexity rules</li>
            <li>Regular password changes</li>
            <li>Account lockout policies</li>
            <li>Password history restrictions</li>
          </ul>

          <h3>8. Password Cracking Methods</h3>
          <ul>
            <li><strong>Brute Force:</strong> Trying all combinations</li>
            <li><strong>Dictionary Attack:</strong> Common words and variations</li>
            <li><strong>Rainbow Tables:</strong> Pre-computed hash tables</li>
            <li><strong>Social Engineering:</strong> Guessing based on personal info</li>
          </ul>

          <h3>9. Password Storage Security</h3>
          <ul>
            <li><strong>Hashing:</strong> One-way encryption (bcrypt, Argon2)</li>
            <li><strong>Salting:</strong> Adding random data to prevent rainbow table attacks</li>
            <li><strong>Key Stretching:</strong> Making computation slower</li>
            <li><strong>Encryption:</strong> Protecting stored password data</li>
          </ul>

          <h3>10. Passwordless Authentication</h3>
          <ul>
            <li><strong>Biometrics:</strong> Fingerprint, facial recognition</li>
            <li><strong>Hardware Tokens:</strong> USB security keys</li>
            <li><strong>Magic Links:</strong> Email-based login</li>
            <li><strong>WebAuthn:</strong> Browser-based authentication</li>
          </ul>

          <h3>11. Password Security Tools</h3>
          <ul>
            <li><strong>Have I Been Pwned:</strong> Check if your email is in breaches</li>
            <li><strong>Password Strength Checkers:</strong> Test password strength</li>
            <li><strong>Security Dashboards:</strong> Monitor account security</li>
            <li><strong>VPN Services:</strong> Encrypt internet traffic</li>
          </ul>

          <h3>12. Mobile Device Security</h3>
          <ul>
            <li>Use strong device PIN/passcode</li>
            <li>Enable biometric authentication</li>
            <li>Auto-lock after short period</li>
            <li>Remote wipe capability</li>
            <li>App permissions management</li>
          </ul>

          <h3>13. WiFi Network Security</h3>
          <ul>
            <li>Use WPA3 encryption</li>
            <li>Strong WiFi passwords</li>
            <li>Guest network for visitors</li>
            <li>Change default router passwords</li>
            <li>Regular firmware updates</li>
          </ul>

          <h3>14. Social Media Privacy</h3>
          <ul>
            <li>Limit personal information sharing</li>
            <li>Private account settings</li>
            <li>Be cautious with friend requests</li>
            <li>Don't share location data</li>
            <li>Review privacy settings regularly</li>
          </ul>

          <h3>15. Future of Passwords</h3>
          <ul>
            <li><strong>FIDO2/WebAuthn:</strong> Passwordless web authentication</li>
            <li><strong>Biometric Authentication:</strong> Advanced fingerprint/face recognition</li>
            <li><strong>Behavioral Biometrics:</strong> Keystroke dynamics, mouse movements</li>
            <li><strong>AI-Powered Security:</strong> Anomaly detection and threat prevention</li>
          </ul>

          <p>
            Password security ek continuous process hai. Technology badal rahi hai, threats evolve kar rahe hain, aur best practices update ho rahi hain. Stay informed, use strong passwords, aur modern security tools ka leverage lo. Aapki digital security aapke haath mein hai!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
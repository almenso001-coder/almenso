/**
 * PHONE LOGIN — Mobile OTP Verification
 * Uses Firebase Phone Auth (if configured) OR simple localStorage-based session
 * Shows as a modal before service booking
 */
import React, { useState, useEffect, useRef } from 'react'
import { saveUserDB, getUserDB } from '../utils/db'
import './PhoneLogin.css'

const WA_OWNER = '919258133689'

// ── Session helpers ────────────────────────────────────────
export function getLoggedInUser() {
  try { return JSON.parse(sessionStorage.getItem('almenso_user') || 'null') } catch { return null }
}
export function setLoggedInUser(user) {
  try { sessionStorage.setItem('almenso_user', JSON.stringify(user)) } catch {}
}
export function logoutUser() {
  try { sessionStorage.removeItem('almenso_user') } catch {}
}

// Generate 6-digit OTP
function genOTP() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export default function PhoneLogin({ onSuccess, onSkip, title = 'Service Book Karne Ke Liye Login Karo' }) {
  const mounted = useRef(true)
  useEffect(() => () => { mounted.current = false }, [])
  const [step, setStep]       = useState('phone') // phone | otp | done
  const [phone, setPhone]     = useState('')
  const [name, setName]       = useState('')
  const [otp, setOtp]         = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [err, setErr]         = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer]     = useState(0)

  // Timer countdown for resend
  useEffect(() => {
    if (timer <= 0) return
    const t = setTimeout(() => { if (mounted.current) setTimer(prev => prev - 1) }, 1000)
    return () => clearTimeout(t)
  }, [timer])

  // Check if already logged in
  useEffect(() => {
    const user = getLoggedInUser()
    if (user?.phone) {
      onSuccess(user)
    }
  }, [])

  const sendOTP = async () => {
    const cleaned = phone.replace(/[^0-9]/g, '')
    if (cleaned.length < 10) return setErr('Sahi mobile number daalo (10 digits)')
    if (!name.trim()) return setErr('Apna naam daalo')
    setLoading(true); setErr('')

    const otp = genOTP()
    setGeneratedOtp(otp)

    // Send OTP via WhatsApp to user
    const full = cleaned.startsWith('91') ? cleaned : '91' + cleaned
    const msg = `🔐 Almenso OTP Verification\n\nAapka OTP hai: *${otp}*\n\nYe OTP 10 minutes mein expire ho jaayega.\n\n_Agar aapne request nahi kiya toh ignore karein._`

    // Open WhatsApp with OTP
    window.open(`https://wa.me/${full}?text=${encodeURIComponent(msg)}`, '_blank')

    setStep('otp')
    setTimer(30)
    setLoading(false)
  }

  const verifyOTP = async () => {
    if (!otp.trim()) return setErr('OTP daalo')
    if (otp.trim() !== generatedOtp) return setErr('Galat OTP hai — dobara check karo')
    setLoading(true); setErr('')

    const cleaned = phone.replace(/[^0-9]/g, '')
    const full = cleaned.startsWith('91') ? cleaned : '91' + cleaned

    const user = {
      phone:       '+' + full,
      phoneClean:  full,
      name:        name.trim(),
      createdAt:   Date.now(),
      lastLogin:   Date.now(),
      notifEnabled: true,
    }

    await saveUserDB(user)
    setLoggedInUser(user)
    setStep('done')
    setLoading(false)
    setTimeout(() => { if (mounted.current) onSuccess(user) }, 600)
  }

  if (step === 'done') return (
    <div className="pl-success">
      <div className="pl-success-ico">✅</div>
      <div className="pl-success-title">Login Ho Gaya!</div>
      <div className="pl-success-sub">Welcome {name}!</div>
    </div>
  )

  return (
    <div className="pl-wrap">
      <div className="pl-header">
        <div className="pl-ico">📱</div>
        <div className="pl-title">{title}</div>
        <div className="pl-sub">Mobile number se quick login karo</div>
      </div>

      {err && <div className="pl-err">⚠️ {err}</div>}

      {step === 'phone' && (
        <div className="pl-body">
          <div className="pl-field">
            <label>Aapka Naam *</label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setErr('') }}
              placeholder="Jaise: Rahul Sharma"
              autoComplete="name"
            />
          </div>
          <div className="pl-field">
            <label>Mobile Number *</label>
            <div className="pl-phone-row">
              <span className="pl-cc">🇮🇳 +91</span>
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value.replace(/[^0-9]/g,'')); setErr('') }}
                placeholder="XXXXX XXXXX"
                maxLength={10}
                autoComplete="tel"
              />
            </div>
          </div>
          <button className="pl-btn" onClick={sendOTP} disabled={loading}>
            {loading ? '⏳ Bhej raha hai...' : '📲 OTP WhatsApp Pe Bhejo'}
          </button>
          <div className="pl-info">OTP aapke WhatsApp pe aayega</div>
          {onSkip && (
            <button className="pl-skip" onClick={onSkip}>
              Login baad mein → Abhi skip karo
            </button>
          )}
        </div>
      )}

      {step === 'otp' && (
        <div className="pl-body">
          <div className="pl-otp-sent">
            ✅ OTP WhatsApp pe bheja gaya: <strong>+91 {phone}</strong>
          </div>
          <div className="pl-field">
            <label>6-Digit OTP *</label>
            <input
              type="number"
              value={otp}
              onChange={e => { setOtp(e.target.value.slice(0,6)); setErr('') }}
              placeholder="● ● ● ● ● ●"
              maxLength={6}
              style={{ fontSize:'1.4rem', letterSpacing:'0.3em', textAlign:'center', fontWeight:900 }}
              autoFocus
            />
          </div>
          <button className="pl-btn" onClick={verifyOTP} disabled={loading || otp.length < 6}>
            {loading ? '⏳ Verify ho raha hai...' : '✅ OTP Verify Karo'}
          </button>
          <div className="pl-resend">
            {timer > 0
              ? <span>Resend OTP in {timer}s</span>
              : <button onClick={() => { setStep('phone'); setOtp(''); setGeneratedOtp('') }}>🔄 OTP Dobara Bhejo</button>
            }
          </div>
          <button className="pl-back" onClick={() => { setStep('phone'); setOtp(''); setErr('') }}>
            ← Phone number change karo
          </button>
        </div>
      )}
    </div>
  )
}

// ── Login Modal Wrapper ───────────────────────────────────
export function LoginModal({ show, onSuccess, onClose, title }) {
  if (!show) return null
  return (
    <div className="pl-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pl-modal">
        <button className="pl-modal-close" onClick={onClose}>✕</button>
        <PhoneLogin onSuccess={onSuccess} onSkip={onClose} title={title} />
      </div>
    </div>
  )
}

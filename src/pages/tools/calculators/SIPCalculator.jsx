/**
 * SIP CALCULATOR — Systematic Investment Plan
 * High-traffic India SEO keyword: "SIP Calculator" ~3M+ monthly searches
 * Features: Interactive chart, FIRE calculator, step-up SIP, comparison
 */
import React, { useState, useMemo, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const FMT = (n) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
const FMT_CRORE = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`
  return `₹${FMT(n)}`
}

function calcSIP(monthly, rate, years, stepUp = 0) {
  const months = years * 12
  const r = rate / 100 / 12
  let invested = 0, corpus = 0, sip = monthly
  const yearlyData = []
  for (let m = 1; m <= months; m++) {
    corpus = corpus * (1 + r) + sip
    invested += sip
    if (m % 12 === 0) {
      yearlyData.push({ year: m / 12, invested: Math.round(invested), corpus: Math.round(corpus), gains: Math.round(corpus - invested) })
      if (stepUp > 0) sip = sip * (1 + stepUp / 100)
    }
  }
  return { corpus: Math.round(corpus), invested: Math.round(invested), gains: Math.round(corpus - invested), yearlyData }
}

const PRESETS = [
  { label: '🎓 Child Education', monthly: 5000,  rate: 12, years: 18 },
  { label: '🏠 Home Down Payment', monthly: 15000, rate: 12, years: 7  },
  { label: '🚗 Car Purchase',     monthly: 8000,  rate: 12, years: 5  },
  { label: '🌴 Retirement FIRE',  monthly: 20000, rate: 12, years: 30 },
  { label: '💍 Wedding Fund',     monthly: 10000, rate: 12, years: 10 },
]

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate]       = useState(12)
  const [years, setYears]     = useState(10)
  const [stepUp, setStepUp]   = useState(0)
  const [showChart, setShowChart] = useState(true)

  const result = useMemo(() => calcSIP(monthly, rate, years, stepUp), [monthly, rate, years, stepUp])
  const wealthRatio = useMemo(() => result.gains / (result.invested || 1), [result])

  const applyPreset = useCallback((p) => {
    setMonthly(p.monthly); setRate(p.rate); setYears(p.years); setStepUp(0)
  }, [])

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SIP Calculator",
    "url": "https://almenso.com/tools/sip-calculator",
    "applicationCategory": "FinanceApplication",
    "description": "Free SIP Calculator — Calculate your Systematic Investment Plan returns with step-up SIP, compare funds, and plan retirement.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
  }

  const barMax = result.yearlyData.length > 0 ? result.yearlyData[result.yearlyData.length - 1].corpus : 1

  return (
    <ToolWrapper
      title="SIP Calculator — Mutual Fund Returns Calculator Free 2025"
      description="Free SIP Calculator India. Monthly SIP ka return, maturity amount, step-up SIP — sab calculate karo."
      keywords="sip calculator, systematic investment plan calculator, mutual fund calculator, sip return calculator, monthly investment calculator india, step up sip calculator"
      toolName="SIP Calculator"
      emoji="📈"
      heroColor="#1e3a5f"
      tagline="Monthly SIP kitna return dega? Retirement, education, home — sab plan karo!"
      affCategory="finance"
      toolPath="/tools/sip-calculator"
      hasResult={!!result}
      faqs={[
        { q: 'SIP kya hota hai?', a: 'Systematic Investment Plan — mutual fund mein regular monthly amount invest karna. Compounding se wealth banata hai.' },
        { q: 'Kitni return milti hai?', a: 'Equity mutual funds historically 10-15% annual return dete hain. Calculator mein apna expected rate set karo.' },
        { q: 'Step-up SIP kya hai?', a: 'Har saal apni SIP amount ek fixed % se badhana — income growth ke saath investment bhi badhao.' },
        { q: 'Kya SIP safe hai?', a: 'Market linked hota hai isliye short-term risk hota hai. Long-term (10+ year) mein historically positive returns milte hain.' },
      ]}
      guideSteps={[
        { heading: 'Monthly SIP amount daalo', text: 'Kitna invest karna chahte ho har mahine.' },
        { heading: 'Duration aur return rate set karo', text: 'Kitne saal ke liye aur expected annual return %.' },
        { heading: 'Result dekho', text: 'Total corpus, invested amount aur gains ek jagah dekhein.' },
      ]}
    >

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px' }}>

        {/* Presets */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>Quick Goals</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => applyPreset(p)}
                style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20, padding: '6px 14px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', color: '#334155', transition: 'all 0.15s' }}
                onMouseOver={e => { e.target.style.background = '#1565c0'; e.target.style.color = '#fff' }}
                onMouseOut={e => { e.target.style.background = '#fff'; e.target.style.color = '#334155' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>

          {/* Input Card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: 20, marginTop: 0 }}>Apni Details Bharo</h2>

            {[
              { label: `Monthly Investment`, value: monthly, min: 500, max: 100000, step: 500, set: setMonthly, prefix: '₹', fmt: FMT },
              { label: `Expected Return (p.a.)`, value: rate, min: 5, max: 30, step: 0.5, set: setRate, suffix: '%', fmt: v => v },
              { label: `Investment Duration`, value: years, min: 1, max: 40, step: 1, set: setYears, suffix: ' years', fmt: v => v },
              { label: `Annual Step-Up`, value: stepUp, min: 0, max: 30, step: 1, set: setStepUp, suffix: '%', fmt: v => v, note: 'Har saal SIP amount badhaao' },
            ].map(({ label, value, min, max, step, set, prefix = '', suffix = '', fmt, note }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>{label}</label>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: '#1565c0' }}>{prefix}{fmt(value)}{suffix}</span>
                </div>
                {note && <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: 6 }}>💡 {note}</div>}
                <input type="range" min={min} max={max} step={step} value={value}
                  onChange={e => set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1565c0', height: 6, cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                  <span>{prefix}{fmt(min)}{suffix}</span>
                  <span>{prefix}{fmt(max)}{suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Result Card */}
          <div>
            <div style={{ background: 'linear-gradient(135deg,#1e3a5f,#1565c0)', borderRadius: 16, padding: 24, color: '#fff', marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Maturity Amount</div>
              <div style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, marginBottom: 16 }}>{FMT_CRORE(result.corpus)}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Total Invested</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{FMT_CRORE(result.invested)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Wealth Gained</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#86efac' }}>{FMT_CRORE(result.gains)}</div>
                </div>
              </div>
              <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px' }}>
                <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Return on Investment: </span>
                <span style={{ fontWeight: 900, color: '#fbbf24' }}>{(wealthRatio * 100).toFixed(0)}%</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}> &nbsp;({years} years)</span>
              </div>
            </div>

            {/* Progress bars */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 16 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 14 }}>💰 Invested vs Gains</div>
              {[
                { label: 'Invested', value: result.invested, total: result.corpus, color: '#1565c0' },
                { label: 'Gains', value: result.gains, total: result.corpus, color: '#10b981' },
              ].map(({ label, value, total, color }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>
                    <span>{label}</span><span style={{ fontWeight: 700, color }}>{FMT_CRORE(value)}</span>
                  </div>
                  <div style={{ background: '#f1f5f9', borderRadius: 99, height: 8 }}>
                    <div style={{ width: `${Math.min(100, (value / total) * 100)}%`, background: color, height: 8, borderRadius: 99, transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Step-up note */}
            {stepUp > 0 && (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '12px 16px', fontSize: '0.8rem', color: '#166534' }}>
                <strong>Step-Up Mode ON ({stepUp}% p.a.):</strong> Apna final corpus {FMT_CRORE(result.corpus)} tak badh sakta hai — regular SIP se kaafi zyada! 🚀
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        {result.yearlyData.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>📊 Year-by-Year Growth</h3>
              <button onClick={() => setShowChart(c => !c)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#334155' }}>
                {showChart ? 'Hide' : 'Show'} Chart
              </button>
            </div>
            {showChart && (
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 160, minWidth: result.yearlyData.length * 28, paddingBottom: 24, position: 'relative' }}>
                  {result.yearlyData.map(d => (
                    <div key={d.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <div title={`Year ${d.year}: ${FMT_CRORE(d.corpus)}`}
                        style={{ width: '100%', background: 'linear-gradient(to top,#1565c0,#42a5f5)', borderRadius: '3px 3px 0 0', height: `${(d.corpus / barMax) * 136}px`, transition: 'height 0.3s', cursor: 'pointer', position: 'relative' }}>
                        <div style={{ width: '100%', background: '#10b981', height: `${(d.gains / d.corpus) * 100}%`, borderRadius: '3px 3px 0 0', position: 'absolute', top: 0 }} />
                      </div>
                      {(d.year % 5 === 0 || result.yearlyData.length <= 10) && (
                        <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: 4, whiteSpace: 'nowrap' }}>Yr {d.year}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#64748b' }}>
                    <div style={{ width: 10, height: 10, background: '#1565c0', borderRadius: 2 }} /> Invested
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#64748b' }}>
                    <div style={{ width: 10, height: 10, background: '#10b981', borderRadius: 2 }} /> Gains
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Year-wise Table */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginTop: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>📋 Year-wise Breakdown</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Year', 'Total Invested', 'Total Gains', 'Corpus'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, color: '#475569', fontSize: '0.72rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(result.yearlyData.length / 10)) === 0 || i === result.yearlyData.length - 1).map(d => (
                  <tr key={d.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>Year {d.year}</td>
                    <td style={{ padding: '10px 12px', color: '#1565c0', fontWeight: 700, textAlign: 'right' }}>{FMT_CRORE(d.invested)}</td>
                    <td style={{ padding: '10px 12px', color: '#10b981', fontWeight: 700, textAlign: 'right' }}>{FMT_CRORE(d.gains)}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 900, color: '#0f172a', textAlign: 'right' }}>{FMT_CRORE(d.corpus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content Block */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginTop: 20 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: 12, marginTop: 0 }}>SIP Calculator kya hai? 📚</h2>
          <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.7 }}>
            <p><strong>Systematic Investment Plan (SIP)</strong> ek tarika hai jisme aap har mahine ek fixed amount mutual fund mein invest karte ho. Ye calculator aapko batata hai ki aapka monthly investment {years} saal mein kitna ban sakta hai.</p>
            <p><strong>SIP ke fayde:</strong> Rupee Cost Averaging ki wajah se market up-down ka asar kam hota hai. Compounding ki power se chota investment bhi bada corpus ban jaata hai.</p>
            <p><strong>Step-Up SIP:</strong> Har saal apni SIP amount badhaate raho — jaise salary badhti hai. Isse apna final corpus aur zyada badh sakta hai.</p>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1565c0', marginBottom: 8 }}>Top Mutual Fund Categories (India 2025):</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li><strong>Large Cap Funds:</strong> 10-13% expected returns — stable aur safe</li>
              <li><strong>Mid Cap Funds:</strong> 13-16% expected returns — medium risk</li>
              <li><strong>Small Cap Funds:</strong> 16-20% expected returns — high risk, high reward</li>
              <li><strong>Index Funds (Nifty 50):</strong> 12% average — low cost, passive</li>
              <li><strong>ELSS (Tax Saver):</strong> 12-15% + Section 80C tax benefit</li>
            </ul>
          </div>
        </div>

      </div>
      </div>
      </div>
      </div>
      </div>
    </ToolWrapper>
  )
}

/**
 * INCOME TAX CALCULATOR 2025-26
 * 🔥 2M+ monthly searches in India
 * Old Regime vs New Regime comparison
 * Section 80C, HRA, Standard Deduction
 */
import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const FMT = (n) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)
const FMT_N = (n) => new Intl.NumberFormat('en-IN', { maximumFractionDigits:0 }).format(n)

/* ── Tax Slabs 2025-26 ──────────────────────────────────── */
const NEW_REGIME_SLABS = [
  { from:0,        to:400000,  rate:0   },
  { from:400000,   to:800000,  rate:0.05 },
  { from:800000,   to:1200000, rate:0.10 },
  { from:1200000,  to:1600000, rate:0.15 },
  { from:1600000,  to:2000000, rate:0.20 },
  { from:2000000,  to:2400000, rate:0.25 },
  { from:2400000,  to:Infinity,rate:0.30 },
]

const OLD_REGIME_SLABS = [
  { from:0,       to:250000,  rate:0    },
  { from:250000,  to:500000,  rate:0.05 },
  { from:500000,  to:1000000, rate:0.20 },
  { from:1000000, to:Infinity,rate:0.30 },
]

const SENIOR_OLD_SLABS = [
  { from:0,       to:300000,  rate:0    },
  { from:300000,  to:500000,  rate:0.05 },
  { from:500000,  to:1000000, rate:0.20 },
  { from:1000000, to:Infinity,rate:0.30 },
]

function calcTax(income, slabs) {
  let tax = 0
  const breakdown = []
  for (const s of slabs) {
    if (income <= s.from) break
    const taxable = Math.min(income, s.to) - s.from
    const t = taxable * s.rate
    tax += t
    if (t > 0) breakdown.push({ range:`${FMT(s.from+1)}–${s.to===Infinity?'∞':FMT(s.to)}`, rate:`${s.rate*100}%`, taxable:FMT_N(taxable), tax:FMT_N(t) })
  }
  return { tax, breakdown }
}

function calcNew(income) {
  if (income <= 1200000) return { tax:0, breakdown:[], rebate: income > 0 }
  const { tax, breakdown } = calcTax(income, NEW_REGIME_SLABS)
  const cess = tax * 0.04
  return { tax: Math.round(tax + cess), breakdown, cess: Math.round(cess) }
}

function calcOld(income, deductions, isSenior) {
  const total80C = Math.min(deductions.c80, 150000)
  const std = 50000
  const hra = Math.min(deductions.hra, income * 0.5)
  const totalDed = total80C + std + hra + (deductions.other || 0)
  const taxableIncome = Math.max(0, income - totalDed)
  const slabs = isSenior ? SENIOR_OLD_SLABS : OLD_REGIME_SLABS
  const { tax, breakdown } = calcTax(taxableIncome, slabs)
  let rebate = 0
  if (taxableIncome <= 500000) rebate = Math.min(tax, 12500) // 87A rebate
  const finalTax = Math.max(0, tax - rebate)
  const cess = finalTax * 0.04
  return {
    tax: Math.round(finalTax + cess),
    taxableIncome, totalDed, breakdown, cess: Math.round(cess),
    rebate: Math.round(rebate),
    savings: { std, total80C, hra, other: deductions.other || 0 }
  }
}

export default function IncomeTaxCalculator() {
  const [income, setIncome]   = useState(800000)
  const [isSenior, setIs]     = useState(false)
  const [ded, setDed]         = useState({ c80:150000, hra:0, other:0 })
  const [showSlabs, setShow]  = useState(false)

  const newResult = useMemo(() => calcNew(income), [income])
  const oldResult = useMemo(() => calcOld(income, ded, isSenior), [income, ded, isSenior])

  const better = newResult.tax <= oldResult.tax ? 'new' : 'old'
  const saving = Math.abs(newResult.tax - oldResult.tax)

  const SCHEMA = {
    "@context":"https://schema.org","@type":"WebApplication",
    "name":"Income Tax Calculator 2025-26","applicationCategory":"FinanceApplication",
    "description":"Free Income Tax Calculator India 2025-26 — Old Regime vs New Regime comparison with Section 80C, HRA deductions.",
    "offers":{"@type":"Offer","price":"0"}
  }

  return (
    <ToolWrapper
      title="Income Tax Calculator 2025-26 — Old vs New Regime Free"
      description="Free Income Tax Calculator India 2025-26. Old vs New Regime compare karo, 80C, HRA deductions calculate karo."
      keywords="income tax calculator 2025, income tax calculator india, old regime new regime calculator, section 80c calculator, hra exemption calculator, tax slab 2025-26"
      toolName="Income Tax Calculator 2025-26"
      emoji="🇮🇳"
      heroColor="#1a1a2e"
      tagline="Old Regime vs New Regime — konsa behtar hai aapke liye?"
      affCategory="finance"
      toolPath="/tools/income-tax-calculator"
      hasResult={!!result}
      faqs={[
        { q: 'New Regime vs Old Regime — konsa choose karein?', a: 'Agar aapke paas 80C, HRA jaise deductions hain toh Old Regime better ho sakta hai. Budget 2025 ke baad ₹12L tak New Regime mein zero tax effective hai.' },
        { q: '2025-26 mein kya badla?', a: 'New Regime mein ₹12 lakh tak effectively zero tax (rebate + ₹75K standard deduction). Old regime unchanged hai.' },
        { q: 'Section 80C kya hai?', a: 'PPF, ELSS, LIC premium, home loan principal — inpar ₹1.5 lakh tak deduction milti hai old regime mein.' },
      ]}
      guideSteps={[
        { heading: 'Income daalo', text: 'Apni gross annual salary likho.' },
        { heading: 'Deductions fill karo', text: '80C, HRA, standard deduction select karo.' },
        { heading: 'Dono regimes compare karo', text: 'Table mein dekho konsa regime aapke liye better hai.' },
      ]}
    >

      <div style={{ maxWidth:900, margin:'0 auto', padding:'20px 16px' }}>

        {/* Input */}
        <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20 }}>
          <h2 style={{ fontSize:'1rem', fontWeight:900, color:'#0f172a', marginBottom:20, marginTop:0 }}>Apni Details Bharo</h2>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <label style={{ fontSize:'0.82rem', fontWeight:700, color:'#475569' }}>Category:</label>
            {[['individual','Normal (Below 60)'],['senior','Senior Citizen (60+)']].map(([v,l]) => (
              <button key={v} onClick={() => setIs(v==='senior')}
                style={{ padding:'7px 16px', borderRadius:99, border:'1.5px solid #e2e8f0', background: (v==='senior')===isSenior ? '#1565c0':'#fff', color: (v==='senior')===isSenior ? '#fff':'#334155', fontWeight:700, fontSize:'0.78rem', cursor:'pointer' }}>
                {l}
              </button>
            ))}
          </div>

          <div style={{ marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <label style={{ fontSize:'0.78rem', fontWeight:700, color:'#475569' }}>Annual Salary / Income</label>
              <span style={{ fontWeight:900, color:'#1565c0', fontSize:'1rem' }}>₹{FMT_N(income)}</span>
            </div>
            <input type="range" min={100000} max={5000000} step={10000} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              style={{ width:'100%', accentColor:'#1565c0', cursor:'pointer' }} />
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8' }}>
              <span>₹1L</span><span>₹50L</span>
            </div>
          </div>

          <div style={{ borderTop:'1.5px solid #f1f5f9', paddingTop:16 }}>
            <div style={{ fontSize:'0.78rem', fontWeight:800, color:'#334155', marginBottom:12 }}>Old Regime Deductions (Section 80C, HRA etc.)</div>
            {[
              { key:'c80', label:'Section 80C (PPF, LIC, ELSS)', max:150000, placeholder:'Max ₹1,50,000' },
              { key:'hra',  label:'HRA Exemption', max:300000, placeholder:'Actual rent paid' },
              { key:'other',label:'Other (80D, 80E etc.)', max:100000, placeholder:'Health ins, education loan' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom:12, display:'grid', gridTemplateColumns:'1fr auto', gap:10, alignItems:'center' }}>
                <label style={{ fontSize:'0.75rem', fontWeight:700, color:'#64748b' }}>{label}</label>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <span style={{ color:'#64748b', fontWeight:700, fontSize:'0.85rem' }}>₹</span>
                  <input type="number" value={ded[key] || ''} onChange={e => setDed(d => ({...d, [key]: Number(e.target.value)||0}))}
                    placeholder="0"
                    style={{ width:120, padding:'8px 10px', border:'1.5px solid #e2e8f0', borderRadius:8, fontSize:'0.85rem', fontWeight:700, color:'#1565c0', textAlign:'right' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16, marginBottom:20 }}>
          {[
            { label:'New Tax Regime', tax:newResult.tax, color:'#1565c0', bg:'#eff6ff', isBetter: better==='new' },
            { label:'Old Tax Regime', tax:oldResult.tax, color:'#7c3aed', bg:'#f5f3ff', isBetter: better==='old' },
          ].map(({ label, tax, color, bg, isBetter }) => (
            <div key={label} style={{ background:bg, borderRadius:16, padding:24, border:`2px solid ${isBetter ? color : '#e2e8f0'}`, position:'relative' }}>
              {isBetter && (
                <div style={{ position:'absolute', top:-12, right:16, background:color, color:'#fff', fontSize:'0.7rem', fontWeight:900, padding:'4px 12px', borderRadius:99 }}>
                  ✓ BETTER OPTION
                </div>
              )}
              <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#64748b', marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:'2rem', fontWeight:900, color, marginBottom:4 }}>{FMT(tax)}</div>
              <div style={{ fontSize:'0.72rem', color:'#94a3b8' }}>Annual Tax Payable</div>
              <div style={{ marginTop:12, fontSize:'0.75rem', color:'#64748b' }}>
                Monthly: <strong style={{ color }}>{FMT(Math.round(tax/12))}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Winner banner */}
        <div style={{ background: better==='new' ? 'linear-gradient(135deg,#eff6ff,#dbeafe)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)', borderRadius:14, padding:'16px 20px', border:`1.5px solid ${better==='new'?'#93c5fd':'#c4b5fd'}`, marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:'0.95rem', color:'#0f172a' }}>
              {better==='new' ? '🏆 New Regime Better Hai!' : '🏆 Old Regime Better Hai!'}
            </div>
            <div style={{ fontSize:'0.8rem', color:'#64748b', marginTop:2 }}>
              {better==='new' ? 'New regime choose karo — ' : 'Old regime choose karo — '}
              <strong style={{ color: better==='new' ? '#1565c0':'#7c3aed' }}>{FMT(saving)} bachega</strong> per year!
            </div>
          </div>
          <div style={{ fontSize:'1.8rem' }}>{better==='new' ? '💙' : '💜'}</div>
        </div>

        {/* Old regime breakdown */}
        {oldResult.savings && (
          <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20 }}>
            <h3 style={{ margin:'0 0 16px', fontSize:'0.95rem', fontWeight:900 }}>📋 Old Regime — Deductions Breakdown</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:10, marginBottom:16 }}>
              {[
                { label:'Standard Deduction', val:oldResult.savings.std },
                { label:'Section 80C',        val:oldResult.savings.total80C },
                { label:'HRA Exemption',      val:oldResult.savings.hra },
                { label:'Others',             val:oldResult.savings.other },
              ].map(({ label, val }) => val > 0 && (
                <div key={label} style={{ background:'#f8fafc', borderRadius:10, padding:'12px 14px' }}>
                  <div style={{ fontSize:'0.7rem', color:'#64748b' }}>{label}</div>
                  <div style={{ fontWeight:900, color:'#0f172a', fontSize:'0.95rem' }}>−{FMT(val)}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 14px', background:'#f0fdf4', borderRadius:10 }}>
              <span style={{ fontSize:'0.82rem', fontWeight:700 }}>Taxable Income (Old)</span>
              <span style={{ fontWeight:900, color:'#16a34a' }}>{FMT(oldResult.taxableIncome)}</span>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20 }}>
          <h2 style={{ fontSize:'1rem', fontWeight:900, color:'#0f172a', marginBottom:12, marginTop:0 }}>New Tax Regime 2025-26 — Tax Slabs 📊</h2>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Income Range','Old Rate','New Rate'].map(h => (
                    <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:800, color:'#475569', borderBottom:'2px solid #e2e8f0', fontSize:'0.72rem', textTransform:'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Up to ₹2,50,000','Nil','Nil'],
                  ['₹2,50,001 – ₹5,00,000','5%','Nil (Rebate u/s 87A)'],
                  ['₹5,00,001 – ₹10,00,000','20%','10-15%'],
                  ['₹10,00,001 – ₹12,00,000','30%','15%'],
                  ['₹12,00,001 – ₹15,00,000','30%','20%'],
                  ['Above ₹15,00,000','30%','30%'],
                ].map(([range, old, nw]) => (
                  <tr key={range} style={{ borderBottom:'1px solid #f1f5f9' }}>
                    <td style={{ padding:'10px 14px', fontWeight:700 }}>{range}</td>
                    <td style={{ padding:'10px 14px', color:'#7c3aed', fontWeight:700 }}>{old}</td>
                    <td style={{ padding:'10px 14px', color:'#1565c0', fontWeight:700 }}>{nw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize:'0.8rem', color:'#64748b', marginTop:12, lineHeight:1.6 }}>
            <strong>New Regime 2025-26 mein badlav:</strong> Budget 2025 mein ₹12 lakh tak income pe effectively zero tax (rebate + standard deduction ke baad). New regime mein ₹75,000 standard deduction milta hai. Old regime mein Section 80C (₹1.5L), HRA, 80D jaise deductions milte hain lekin tax rates zyada hain.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../../../components/SEOHead'
import '../../ToolsPage.css'

const CATEGORIES = [
  {
    id: 'finance',
    title: 'Finance Calculators',
    icon: '💰',
    desc: 'GST, EMI, profit & loan calculators — sab financial maths ek jagah.',
    tools: [
      { name: 'GST Calculator', path: '/tools/gst-calculator', desc: 'Inclusive & exclusive · CGST/SGST/IGST', ico: '🧾' },
      { name: 'EMI Calculator', path: '/tools/emi-calculator', desc: 'Home · Car · Education loan breakdown', ico: '🏦' },
      { name: 'Profit Margin Calculator', path: '/tools/profit-margin-calculator', desc: 'Cost · Selling price · Markup %', ico: '📊' },
      { name: 'Loan Interest Calculator', path: '/tools/loan-interest-calculator', desc: 'Simple & compound interest · FD', ico: '💰' },
    ],
  },
  {
    id: 'math',
    title: 'Math Calculators',
    icon: '🧮',
    desc: 'Quick math helpers — percentages, conversions and number tools.',
    tools: [
      { name: 'Percentage Calculator', path: '/tools/percentage-calculator', desc: 'Discount, marks, GST & price change', ico: '📊' },
      { name: 'Word Counter', path: '/tools/word-counter', desc: 'Words, characters & reading time', ico: '📝' },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical Calculators',
    icon: '⚡',
    desc: 'Electricity, wiring & solar calculations.',
    tools: [
      { name: 'Bijli Bill Calculator', path: '/tools/bijli', desc: '7 states · latest tariff rates', ico: '⚡' },
      { name: 'Electricity Bill Analyzer', path: '/tools/electricity-bill-analyzer', desc: 'Meter reading · slab breakup', ico: '⚡' },
      { name: 'Solar ROI Calculator', path: '/tools/solar-roi', desc: 'Payback · savings · NPV', ico: '☀️' },
      { name: 'Wire Size Calculator', path: '/tools/wire-size-calculator', desc: 'Voltage drop & cable sizing', ico: '🔌' },
    ],
  },
  {
    id: 'unit',
    title: 'Unit Converters',
    icon: '🔧',
    desc: 'Convert units across length, weight, temperature & more.',
    tools: [
      { name: 'Unit Converter', path: '/tools/unit-converter', desc: 'Length, weight, area, volume, time', ico: '🔄' },
    ],
  },
  {
    id: 'date-time',
    title: 'Date & Time Calculators',
    icon: '⏳',
    desc: 'Date math & time calculations made easy.',
    tools: [
      { name: 'Age Calculator', path: '/tools/age-calculator', desc: 'Years, months, days, hours & minutes', ico: '🎂' },
    ],
  },
]

export default function Calculators() {
  const nav = useNavigate()

  return (
    <>
      <SEOHead
        title="Calculator Categories — Almenso"
        description="Browse calculator categories and jump to the right tool: finance, math, electrical, converters, date & time."
        keywords="calculator categories, finance calculators, math calculators, unit converter, date calculator"
      />

      <div className="tools-page">
        <div className="tools-hero">
          <div className="th-ico">🧮</div>
          <h1 className="th-title">Calculator Categories</h1>
          <p className="th-sub">Select a category to find the right calculator fast. Sab kuch ek jagah.</p>
        </div>

        <div className="tools-body">
          {CATEGORIES.map(cat => (
            <section key={cat.id} style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: '1.5rem' }}>{cat.icon}</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{cat.title}</h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{cat.desc}</p>
                </div>
              </div>

              <div className="tools-grid">
                {cat.tools.map(tool => (
                  <div
                    key={tool.path}
                    className="tool-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => nav(tool.path)}
                    onKeyDown={e => e.key === 'Enter' && nav(tool.path)}
                  >
                    <div className="tc-icon">{tool.ico}</div>
                    <div className="tc-name">{tool.name}</div>
                    <div className="tc-desc">{tool.desc}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

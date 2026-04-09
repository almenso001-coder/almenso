import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

const DEFAULT_APPLIANCES = [
  { name: 'Ceiling Fan', watt: 75, hours: 10, count: 1 },
  { name: 'LED Bulb (10W)', watt: 10, hours: 6, count: 4 },
  { name: 'Refrigerator', watt: 150, hours: 24, count: 1 },
]

function fmtINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function ElectricityCostCalculator() {
  const [appliances, setAppliances] = useState(DEFAULT_APPLIANCES)
  const [rate, setRate] = useState('7')
  const [days, setDays] = useState('30')

  const updateAppliance = (idx, key, value) => {
    const next = [...appliances]
    next[idx] = { ...next[idx], [key]: value }
    setAppliances(next)
  }

  const addAppliance = () => setAppliances(p => [...p, { name: '', watt: 0, hours: 0, count: 1 }])
  const removeAppliance = idx => setAppliances(p => p.filter((_, i) => i !== idx))

  const totals = useMemo(() => {
    const unitRate = parseFloat(rate) || 0
    const daysCount = parseFloat(days) || 30

    const dailyKWh = appliances.reduce((sum, a) => {
      const w = parseFloat(a.watt) || 0
      const hrs = parseFloat(a.hours) || 0
      const cnt = parseFloat(a.count) || 0
      return sum + (w * hrs * cnt) / 1000
    }, 0)

    const costPerDay = dailyKWh * unitRate
    const costPerMonth = costPerDay * daysCount
    const costPerYear = costPerMonth * 12

    return { dailyKWh, costPerDay, costPerMonth, costPerYear }
  }, [appliances, rate, days])

  return (
    <ToolWrapper
      title="Electricity Cost Calculator — Appliance Cost per Day/Month/Year"
      description="Appliance ke wattage aur running hours daalo — daily, monthly aur yearly electricity cost calculate karo." 
      keywords="electricity cost calculator, appliance cost calculator, daily electricity bill estimate, monthly electricity cost india"
      emoji="⚡"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #f97316 100%)"
      toolName="Electricity Cost Calculator"
      tagline="Appliance-wise electricity cost calculate karo — per day, month, year." 
      guideSteps={[
        { heading: 'Appliances add karo', text: 'Har appliance ka wattage aur daily use hours daalo.' },
        { heading: 'Unit rate set karo', text: 'Apne area ka ₹/unit rate daal ke cost estimate lo.' },
        { heading: 'Results dekho', text: 'Daily, monthly aur yearly cost turant mil jayega.' },
        { heading: 'Optimization karo', text: 'High cost appliances pe nazar rakho aur usage kam karo.' },
      ]}
      faqs={[
        { q: 'Kya ye exact bill deta hai?', a: 'Nahi, ye approximate cost deta hai. Actual bill mein fixed charges aur duties alag ho sakte hain.' },
        { q: 'Kaise unit rate pata karu?', a: 'Apne current electricity bill mein per unit rate dekho ya area provider se confirm karo.' },
        { q: 'Yearly cost kaise nikala gaya?', a: 'Monthly cost × 12 liya gaya hai. Actual variation seasons ke hisab se ho sakti hai.' },
      ]}
      relatedTools={[
        { path: '/tools/power-consumption-planner', emoji: '🏠', name: 'Power Consumption Planner' },
        { path: '/tools/electricity-bill-analyzer', emoji: '⚡', name: 'Electricity Bill Analyzer' },
      ]}
      affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
    >
      <div className="tp-card">
        <div className="tp-sec-title">🧮 Appliance Inputs</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Appliance</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Watt</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Hours/Day</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Count</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Daily kWh</th>
                <th style={{ padding: '10px', textAlign: 'center' }}> </th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((a, idx) => {
                const watt = parseFloat(a.watt) || 0
                const hrs = parseFloat(a.hours) || 0
                const cnt = parseFloat(a.count) || 0
                const kwh = ((watt * hrs * cnt) / 1000).toFixed(2)
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px' }}>
                      <input
                        value={a.name}
                        placeholder="Appliance"
                        onChange={e => updateAppliance(idx, 'name', e.target.value)}
                        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={a.watt}
                        onChange={e => updateAppliance(idx, 'watt', e.target.value)}
                        style={{ width: 80, padding: 8, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={a.hours}
                        onChange={e => updateAppliance(idx, 'hours', e.target.value)}
                        style={{ width: 80, padding: 8, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={a.count}
                        onChange={e => updateAppliance(idx, 'count', e.target.value)}
                        style={{ width: 60, padding: 8, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 800 }}>{kwh}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {appliances.length > 1 && (
                        <button
                          onClick={() => removeAppliance(idx)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 18 }}
                          title="Remove"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <button className="tw-calc-btn" onClick={addAppliance} style={{ marginTop: 12 }}>+ Add Appliance</button>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">⚡ Rate & Period</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>₹ Per Unit (kWh)</label>
            <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>Billing Days</label>
            <input type="number" value={days} onChange={e => setDays(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}>
        <div className="tw-result-label">Daily Cost</div>
        <div className="tw-result-val">{fmtINR(totals.costPerDay)}</div>
        <div className="tw-result-sub">{totals.dailyKWh.toFixed(2)} kWh per day</div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
        <div className="tw-result-label">Monthly Cost ({days} days)</div>
        <div className="tw-result-val">{fmtINR(totals.costPerMonth)}</div>
        <div className="tw-result-sub">{(totals.costPerMonth / (parseFloat(days) || 30)).toFixed(2)} per day average</div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #1a1a2e, #6d28d9)' }}>
        <div className="tw-result-label">Yearly Cost (12 months)</div>
        <div className="tw-result-val">{fmtINR(totals.costPerYear)}</div>
        <div className="tw-result-sub">Includes 12x monthly estimate</div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📌 Tip</div>
        <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <strong>Use this calculator</strong> to compare appliances. Agar koi device zyada cost le raha hai, toh uska running time kam karo ya energy-efficient alternative dekho. Yeh estimate aapko bill control karne mein help karega.
        </p>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📝 Electricity Saving Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Electricity bill kam karna har household ke liye important hai. Yeh guide aapko sikhaega ki kaise consumption track karein, appliances ko efficiently use karein, aur long-term savings ka plan banayein.
          </p>

          <h3>1. Understanding Your Bill</h3>
          <p>
            Bill mein fixed charges, energy charges, duty, aur taxes hote hain. Energy charges = units × rate. Slab system mein jyada units pe rate badhta hai. Track karo ki kitne units kaam karte ho.
          </p>

          <h3>2. High Consumption Appliances</h3>
          <p>
            AC, geyser, water pump sabse zyada units lete hain. AC pe 1°C increase se 6% saving. Geyser ko timer pe lagao. Pump ko off-peak use karo.
          </p>

          <h3>3. Lighting aur Fans</h3>
          <p>
            LED bulbs use karo — 10W LED = 60W incandescent. Fans ko speed 3 pe rakho. Natural light use karo din mein.
          </p>

          <h3>4. Kitchen Appliances</h3>
          <p>
            Microwave aur induction efficient hain. Fridge ko direct sunlight se door rakho. Unused appliances unplug karo.
          </p>

          <h3>5. Smart Habits</h3>
          <p>
            Switch off lights jab room khali ho. Use task lighting. Wash clothes in full load. Dry clothes naturally.
          </p>

          <h3>6. Renewable Energy</h3>
          <p>
            Solar panels invest karo. 3kW system se monthly 300-400 units generate ho sakte hain. Government subsidies check karo.
          </p>

          <h3>7. Monitoring Tools</h3>
          <p>
            Smart meters aur apps use karo. Track daily usage. Set budgets aur alerts.
          </p>

          <h3>8. Seasonal Adjustments</h3>
          <p>
            Summer mein AC use kam karo. Winter mein geyser timer pe. Rainy season mein pump carefully use karo.
          </p>

          <h3>9. Cost Calculation</h3>
          <p>
            Yeh tool daily/monthly/yearly cost batata hai. Compare karo aur decide karo ki kaunse appliances replace karne hain.
          </p>

          <h3>10. Long-term Savings</h3>
          <p>
            Energy-efficient appliances buy karo. Home insulation improve karo. LED retrofit karo. Yeh investments 2-3 saal mein recover ho jaate hain.
          </p>

          <p>
            Small changes se badi savings ho sakti hai. Yeh calculator aapko starting point deta hai — track karo aur optimize karo.
          </p>
        </div>
      </div>
          {/* ── Copy + Share ── */}
          <div style={{ display:'flex', gap:8, margin:'14px 0 4px' }}>
            <button onClick={()=>{
              const r=document.querySelectorAll('.tw-result-val,.tw-brow-val')
              const t='Electricity Cost:\n'+Array.from(r).map(e=>e.innerText).join('\n')+'\n\nalmenso.com/tools/electricity-cost-calculator'
              navigator.clipboard?.writeText(t).then(()=>alert('✅ Copy ho gaya!'))
            }} style={{flex:1,padding:'10px',background:'#f0fdf4',border:'1.5px solid #16a34a',borderRadius:9,color:'#15803d',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>📋 Copy Result</button>
            <button onClick={()=>window.open('https://wa.me/?text='+encodeURIComponent('Electricity Cost calculate kiya — try karo: almenso.com/tools/electricity-cost-calculator'),'_blank')} style={{flex:1,padding:'10px',background:'#e7fdf0',border:'1.5px solid #25d366',borderRadius:9,color:'#166534',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>💬 WhatsApp Share</button>
          </div>
    </ToolWrapper>
  )
}

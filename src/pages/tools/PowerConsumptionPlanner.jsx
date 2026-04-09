import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

const DEFAULT_APPLIANCES = [
  { name: 'Ceiling Fan', watt: 75, icon: '🌀', defaultHours: 10 },
  { name: 'LED Bulb (10W)', watt: 10, icon: '💡', defaultHours: 6 },
  { name: 'Refrigerator', watt: 150, icon: '🧊', defaultHours: 24 },
  { name: 'TV (LED 43")', watt: 120, icon: '📺', defaultHours: 5 },
  { name: 'Laptop', watt: 65, icon: '💻', defaultHours: 6 },
  { name: 'Washing Machine', watt: 500, icon: '👕', defaultHours: 1 },
  { name: 'Water Pump', watt: 750, icon: '💧', defaultHours: 1 },
  { name: 'Mixer / Grinder', watt: 450, icon: '🍲', defaultHours: 0.5 },
  { name: 'Microwave', watt: 800, icon: '📡', defaultHours: 0.5 },
]

function fmtINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function PowerConsumptionPlanner() {
  const [appliances, setAppliances] = useState(DEFAULT_APPLIANCES.map(a => ({ ...a, hours: a.defaultHours, count: 1 })))
  const [unitRate, setUnitRate] = useState('7')
  const [days, setDays] = useState('30')

  const total = useMemo(() => {
    const dailyKWh = appliances.reduce((sum, app) => sum + (app.watt * app.hours * app.count) / 1000, 0)
    const monthlyKWh = dailyKWh * (parseFloat(days) || 30)
    const cost = monthlyKWh * (parseFloat(unitRate) || 0)
    return { dailyKWh, monthlyKWh, cost }
  }, [appliances, unitRate, days])

  const updateAppliance = (idx, key, value) => {
    const next = [...appliances]
    next[idx] = { ...next[idx], [key]: value }
    setAppliances(next)
  }

  return (
    <ToolWrapper
      title="Home Power Consumption Planner — Monthly Electricity Cost Estimate"
      description="Apne ghar ke appliances ke usage ko plan karo. Monthly unit consumption aur bill estimate karo with adjustable unit rate."
      keywords="home power consumption planner, electricity usage calculator, monthly units estimate, india electrical planning"
      emoji="🏠"
      heroColor="linear-gradient(135deg,#1a1a2e,#14b8a6)"
      toolName="Home Power Consumption Planner"
      tagline="Appliances ka daily use dal ke monthly units aur bill estimate karo — budget-friendly planning."
      guideSteps={[
        { heading: 'Appliances select karo', text: 'Apne commonly used appliances add karo aur daily running hours set karo.' },
        { heading: 'Unit rate enter karo', text: 'Apne area ka current electricity rate daalo (₹/unit). Yeh bill estimate mein important hai.' },
        { heading: 'Days set karo', text: 'Generally billing cycle 30 days hoti hai — lekin aap 28/31 days bhi set kar sakte ho.' },
        { heading: 'Plan aur reduce karo', text: 'Usage dekh ke decide karo ki kaunse appliance ko kam chalana hai ya energy-saving kisko replace karna hai.' },
      ]}
      faqs={[
        { q: 'Kya yeh exact bill dega?', a: 'Yeh ek estimate hai based on input usage. Actual bill mein fixed charges, demand charges aur subsidies include nahi hote. Lekin yeh aapko usage pattern samajhne mein madad karega.' },
        { q: 'Unit rate kaise pata karun?', a: 'Apne last electricity bill mein per unit rate dekho. Agar rate alag-alag slabs mein hai, toh average rate use karein.' },
        { q: 'Kya solar ya inverter se savings dikhayega?', a: 'Is tool se aap apna current consumption dekh sakte ho. Fir Solar ROI tool ya Inverter Planner join karke aap future savings estimate kar sakte ho.' },
        { q: 'Kaise consumption reduce karun?', a: 'LED lights, energy-efficient appliances, aur smart habits (fan speed, AC set temp) se significant reduction ho sakta hai. Article mein detailed tips hain.' },
      ]}
      relatedBlog={{ slug: 'how-to-calculate-home-electricity-usage-in-india', title: 'How to calculate home electricity usage in India', excerpt: 'Steps to accurately calculate daily and monthly units — useful for budget planning.' }}
      relatedTools={[
        { path: '/tools/electricity-bill-analyzer', emoji: '⚡', name: 'Electricity Bill Analyzer' },
        { path: '/tools/solar-roi', emoji: '☀️', name: 'Solar ROI Calculator' },
      ]}
      affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
    >
      <div className="tp-card">
        <div className="tp-sec-title">📊 Appliance Usage</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Appliance</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Watts</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Count</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Hours/Day</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Daily kWh</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((app, idx) => {
                const daily = (app.watt * (parseFloat(app.hours) || 0) * app.count) / 1000
                return (
                  <tr key={app.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px', fontWeight: 800 }}>{app.icon} {app.name}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>{app.watt}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        min="0"
                        value={app.count}
                        onChange={e => updateAppliance(idx, 'count', parseInt(e.target.value) || 0)}
                        style={{ width: 60, padding: '6px 8px', borderRadius: 8, border: '1.5px solid #e5e7eb', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={app.hours}
                        onChange={e => updateAppliance(idx, 'hours', e.target.value)}
                        style={{ width: 60, padding: '6px 8px', borderRadius: 8, border: '1.5px solid #e5e7eb', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 800 }}>{daily.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">⏱️ Billing Inputs</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>📅 Billing days</label>
            <input type="number" value={days} min="1" onChange={e => setDays(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>⚡ Unit rate (₹/kWh)</label>
            <input type="number" value={unitRate} step="0.1" onChange={e => setUnitRate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)' }}>
        <div className="tw-result-label">Estimated Monthly Consumption</div>
        <div className="tw-result-val">{total.monthlyKWh.toFixed(1)} kWh</div>
        <div className="tw-result-sub">≈ {fmtINR(total.cost)} per month</div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📘 Power Planning Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Ghar ka monthly electricity bill manage karna aaj kal zaroori ho gaya hai. Electricity bills badh rahe hain aur har household ko apna consumption samajhna chahiye. Ye planner aapko ek rough estimate dega ki appliances ka combination aapke budget mein fit hota hai ya nahi. Chaliye shuru karte hain.
          </p>

          <h3>1. Apne Basic Consumption ko samjho</h3>
          <p>
            Har ghar mein few basic items hote hain jo har roz chalte hain: refrigerator, fan, lights. Inka consumption stable hota hai. Fridge ka average 1.5–2 kWh per day hota hai (24×0.15 kW). Fan 75W × 10 hours = 0.75 kWh.
          </p>
          <p>
            Ye numbers aapki daily units ka base hote hain. Agar aapka bill 500 units aa raha hai, toh aapko pata hona chahiye ki isme 200–250 units to basic appliances le rahe hain.
          </p>

          <h3>2. Peak Loads ko Identify karo</h3>
          <p>
            Kuch appliances high consumption rakhte hain: AC, geyser, microwave. Ye short duration mein bhi 1–2 kW le lete hain. Agar aap inhe 2 hours use karte hain, toh 2 kW × 2 = 4 kWh ho gaya.
          </p>
          <p>
            Is planner mein apne load ko categories mein divide karo: <strong>Essential</strong> (fridge, fan, lights), <strong>Comfort</strong> (AC, TV), <strong>Occasional</strong> (geyser, microwave). Is se aapko pata chalega ki kaunsa load aap kama ke bill ko control kar sakte ho.
          </p>

          <h3>3. Unit Rate ka Sach</h3>
          <p>
            Bill ka ek bada hissa units × per unit rate hota hai. Rate normally 4–10 ₹/unit hota hai, lekin kabhi slab-based ho sakta hai. Agar aap 150 units se zyada chalate ho, toh per unit rate badh sakta hai. Aap apne last bill ka average rate use karke estimate karein.
          </p>
          <p>
            Example: ₹7 per unit rate aur 400 units consumption = ₹2800. Lekin actual bill mein fixed charge, duty, meter rent bhi add hote hain. Isliye 10-15% additional buffer rakho.
          </p>

          <h3>4. Kaise Consumption Reduce Karen?</h3>
          <p>
            - <strong>LED lighting</strong>: 10W bulb 60W incandescent se 6x efficient
            - <strong>AC temperature</strong>: 1°C increase se 6% saving
            - <strong>Use inverter AC</strong>: fixed speed AC se 25-35% kam power
            - <strong>Off-peak use</strong>: Geyser, washing machine raat ko chalayein
            - <strong>Unplug standby devices</strong>: TV, set-top, chargers standby mein power lete hain
          </p>

          <h3>5. Solar + Battery se kitna bachat?</h3>
          <p>
            Agar aap apne monthly consumption ka 50-70% solar se cover kar lein, toh bill bohot kam ho sakta hai. Is planner se aap monthly kWh estimate le sakte ho, aur fir <strong>Solar ROI Calculator</strong> se check kar sakte ho ki kitna system chahiye.
          </p>
          <p>
            Example: Agar 300 kWh monthly consumption hai, aur aap 4 kW system lagate ho jo 20 kWh per day produce karta hai, toh monthly 600 kWh generate hoga (assuming good sunlight). Yeh aapke usage ko double-deck kar sakta hai.
          </p>

          <h3>6. Track Karne ka Simple Tarika</h3>
          <p>
            - Har mahine meter reading note karo (same date)
            - Is planner mein same inputs daal ke estimate compare karo
            - Agar estimate aur bill mein zyada difference ho, toh appliance audit karo (e.g., high load devices ko ek ek karke off karo aur meter reading dekho)
          </p>

          <h3>7. Budget Banane ka Formula</h3>
          <p>
            - Step 1: Estimate monthly energy cost (this tool)
            - Step 2: Add 10-15% buffer for fixed charges and duty
            - Step 3: Set monthly budget and track actual bill
            - Step 4: If bill exceed ho raha hai, check peak load aur reduce usage accordingly
          </p>

          <h3>8. FAQs</h3>
          <p><strong>Q:</strong> Kya ek hi bill mein slab rate alag ho sakta hai?<br />
          <strong>A:</strong> Haan, many states slab-based billing rakhte hain. 0-100 units ₹??, 101-200 ₹?? etc. Is planner mein average rate use karte hain. Agar aap slab dekhna chahte ho, Electricity Bill Analyzer tool use karo.</p>
          <p><strong>Q:</strong> Kya 30 days ke liye hi plan banega?<br />
          <strong>A:</strong> Nahi, aap days field adjust karke koi bhi period plan kar sakte ho (20, 28, 31 days etc.).</p>

          <h3>9. Next Steps</h3>
          <p>
            - Compare apne bill ka actual value is planner ke estimate se.
            - Agar difference 15% se zyada hai, toh appliance audit karein.
            - Solar ya inverter ka plan banana ho toh related tools explore karein.
          </p>

          <p>
            Ye planner aapko ek baseline dega. Ab jab aapko pata hai kitna electricity use ho rahi hai, aap usko optimize kar sakte ho — budgeting, appliance upgrade, ya solar system planning karke.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

import React, { useState, useMemo, useEffect } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

const APPLIANCES = [
  { name: 'AC (1.5 Ton)', watt: 1500, icon: '❄️' },
  { name: 'Fan', watt: 75, icon: '🌀' },
  { name: 'LED Bulb (10W)', watt: 10, icon: '💡' },
  { name: 'Fridge', watt: 200, icon: '🧊' },
  { name: 'TV (LED 43")', watt: 120, icon: '📺' },
  { name: 'Laptop', watt: 65, icon: '💻' },
  { name: 'Geyser (2000W)', watt: 2000, icon: '🚿' },
  { name: 'Washing Machine', watt: 500, icon: '👕' },
  { name: 'Microwave', watt: 800, icon: '📡' },
  { name: 'Refrigerator (Inverter)', watt: 150, icon: '🧊' },
]

const WIRE_TABLE = [
  { size: '1.5 mm²', amp: 18 },
  { size: '2.5 mm²', amp: 24 },
  { size: '4 mm²', amp: 32 },
  { size: '6 mm²', amp: 40 },
  { size: '10 mm²', amp: 55 },
  { size: '16 mm²', amp: 70 },
  { size: '25 mm²', amp: 90 },
  { size: '35 mm²', amp: 110 },
]

function fmtWatt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + ' kW'
  return n + ' W'
}

export default function InverterLoadPlanner() {
  const { setShowMonetization } = useToolResult()
  // Inverter always shows result — trigger monetization on mount
  useEffect(() => { setShowMonetization(true) }, [])

  const [items, setItems] = useState(APPLIANCES.map(a => ({ ...a, hours: 1, count: 0 })))
  const [backupHours, setBackupHours] = useState('4')
  const [efficiency, setEfficiency] = useState('0.85')

  const total = useMemo(() => {
    const kw = items.reduce((sum, item) => sum + (item.watt * item.count * (parseFloat(item.hours) || 0)), 0) / 1000
    const watts = items.reduce((sum, item) => sum + (item.watt * item.count), 0)
    return { kw, watts }
  }, [items])

  const recommendedInverter = useMemo(() => {
    const targetW = total.watts * 1.2 // 20% headroom
    const kv = Math.ceil(targetW / 100) * 100
    return kv
  }, [total.watts])

  const battery = useMemo(() => {
    const hrs = parseFloat(backupHours) || 0
    const eff = parseFloat(efficiency) || 0.85
    const dailyWh = total.kw * 1000 * hrs
    const requiredAh = eff > 0 ? Math.ceil(dailyWh / (12 * eff)) : 0
    return { dailyWh, requiredAh }
  }, [total.kw, backupHours, efficiency])

  const updateItem = (idx, key, value) => {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: value }
    setItems(next)
  }

  return (
    <ToolWrapper
      title="Inverter Load Planner — Appliance Based Backup Calculator"
      description="Apne appliances ka load daalo aur dekho kitna VA inverter, battery capacity (Ah) aur generator wattage chahiye. Backup hours aur efficiency ke hisab se plan banao."
      keywords="inverter load planner, battery capacity calculator, inverter sizing, home backup planning, watt to va converter"
      emoji="🔋"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #059669 100%)"
      toolName="Inverter Load Planner"
      tagline="Appliances select karo, backup hours set karo, aur ideal inverter + battery size dekho."
      guideSteps={[
        { heading: 'Appliances add karo', text: 'Har appliance ka wattage aur chalne ka waqt daalo. Default list se shuru karo aur customize karo.' },
        { heading: 'Backup hours set karo', text: 'Kitne ghante tak bijli chahiye during outage? Yeh number effect karega battery size.' },
        { heading: 'Efficiency aur headroom', text: 'Inverter efficiency 80-90% maan ke calculate karo — system losses ko dhyan mein rakho.' },
        { heading: 'Result dekho', text: 'Recommended inverter VA, battery Ah, aur total ke matches dekho. Fir market quotes compare karo.' },
      ]}
      faqs={[
        { q: 'Inverter VA aur watt mein kya farq hai?', a: 'Watt actual power hai, VA apparent power. Inverter ko generally 1.2-1.3 times headroom chahiye — isi liye hum watt ko 120% karke VA recommend karte hain.' },
        { q: 'Battery Ah kaise calculate hota hai?', a: 'Battery Ah = (Total watt × backup hours) ÷ (Battery voltage × efficiency). Yahan hum 12V battery assume karte hain aur efficiency ke liye 0.85 default use karte hain.' },
        { q: 'Kya 200Ah battery har inverter ke saath chalta hai?', a: 'Nahi. Battery voltage (12V / 24V / 48V) aur inverter compatibility check karo. Ye calculator 12V base pe estimate deta hai.' },
        { q: 'Kya inverters mein surge capacity hoti hai?', a: 'Haan, aksar 1.2× surge capacity hoti hai — matlab short time ke liye zyada load handle kar sakte hain (starter motor, pump, etc.).' },
      ]}
      relatedBlog={{ slug: 'best-inverter-battery-capacity', title: 'Best inverter battery capacity for homes', excerpt: 'Apne ghar ke liye correct inverter aur battery capacity kaise choose karein — easy steps.' }}
      relatedTools={[
        { path: '/tools/electricity-bill-analyzer', emoji: '⚡', name: 'Electricity Bill Analyzer' },
        { path: '/tools/solar-roi', emoji: '☀️', name: 'Solar ROI Calculator' }
      ]}
      affCategory="electrical"
      serviceCategory="inverter"
      toolPath="/tools/inverter-load-planner"
    >
      <div className="tp-card">
        <div className="tp-sec-title">🛠️ Appliance Load Setup</div>
        <p style={{ fontSize: '0.78rem', color: '#666' }}>Select appliances that you want backed up during power cut. Enter how many hours they run per day (or during outage).</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}></th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Watts</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Count</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Hours</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Total W</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const totalW = item.watt * item.count
                return (
                  <tr key={item.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px', fontWeight: 800 }}>{item.icon} {item.name}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>{item.watt}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        min="0"
                        value={item.count}
                        onChange={e => updateItem(idx, 'count', parseInt(e.target.value) || 0)}
                        style={{ width: 60, padding: '6px 8px', borderRadius: 8, border: '1.5px solid #e5e7eb', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.hours}
                        onChange={e => updateItem(idx, 'hours', e.target.value)}
                        style={{ width: 60, padding: '6px 8px', borderRadius: 8, border: '1.5px solid #e5e7eb', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 800 }}>{totalW}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🔧 Backup & Sizing Options</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>⏳ Backup Duration (hours)</label>
            <input type="number" value={backupHours} min="1" step="0.5" onChange={e => setBackupHours(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>⚙️ Inverter Efficiency (%)</label>
            <input type="number" value={efficiency} min="0.5" max="1" step="0.01" onChange={e => setEfficiency(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
        <div className="tw-result-label">Recommended Inverter</div>
        <div className="tw-result-val">{recommendedInverter} VA</div>
        <div className="tw-result-sub">{fmtWatt(total.watts)} peak load + 20% headroom</div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #0c4a6e, #22c55e)' }}>
        <div className="tw-result-label">Battery Capacity (12V)</div>
        <div className="tw-result-val">{Math.round(battery.requiredAh)} Ah</div>
        <div className="tw-result-sub">For ~{backupHours}h backup at {total.kw.toFixed(2)} kW</div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📘 Load Planning Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Inverter aur battery ka selection sirf "VA" aur "Ah" dekhne se nahi hota — ek smart plan mein aapko apne real life usage ko samajhna zaroori hai. Is guide mein hum step-by-step batayenge ki kaise appliance list banayein, total load calculate karein, aur kaise decide karein ki inverter battery swap kis type ka hona chahiye.
          </p>

          <h3>1. Wattage aur Usage Samjho</h3>
          <p>
            First step: har appliance ki power rating dekho. Ye usually sticker par hoti hai — jaise fan 75W, refrigerator 150W, inverter AC 1500W. Agar rating nahi mil rahi ho, toh Google search karo "<em>Appliance name wattage</em>".
          </p>
          <p>
            Important: Inverter systems mein aapko continuous aur surge power ko samajhna hota hai. Waise to fan ya light constant hota hai, lekin refrigerator ya pump-start mein short spike aata hai (surge). Isliye hum recommended inverter ko 20-30% headroom ke saath select karte hain.
          </p>

          <h3>2. Backup Duration Kaise Chunein?</h3>
          <p>
            Backup duration define karta hai kitne ghante tak aap chahte hain ki inverter chal jaye bina grid ke. Ye generally 3-6 ghante hota hai for most homes. Agar aap power cut ke time mein sirf essentials (lights, fan, phone charging) chahte ho, toh 3–4 ghante ka backup enough hai.
          </p>
          <p>
            Agar aap chahte ho ki fridge aur TV bhi chalti rahe, toh 4-6 ghante rakhna better hai. Battery Ah iske according exponentially badhta hai (agar aap double duration rakhte ho toh battery capacity double). Isliye realistic estimate zaroori hai.
          </p>

          <h3>3. Inverter Size — VA kaise calculate karein?</h3>
          <p>
            Inverter manufacturers VA (volt-ampere) mein rating dete hain. Ye isliye hota hai because AC power mein voltage aur current phase difference ho sakta hai (power factor). Home appliances ke liye aap 1.2 multiplier se calculate kar sakte hain.
          </p>
          <p>
            Formula: <strong>Recommended VA = Total watt × 1.2</strong>. 
            Agar total watt 800 ho (fan + lights + TV), toh inverter minimum 960 VA hona chaiye — is tool mein hum isko 1000 VA rounding karke show karte hain.
          </p>

          <h3>4. Battery Ah Ka Calculation</h3>
          <p>
            Battery Ah (Ampere-hour) ka formula hota hai:
            <br />
            <strong>Ah = (Watt × Hours) / (Voltage × Efficiency)</strong>
          </p>
          <p>
            Hum standard 12V battery assume karte hain. Agar aap 24V system lete ho, toh required Ah aadha ho jayega (voltage high → current low). Efficiency factor (0.8–0.9) battery aur inverter losses ko cover karta hai.
          </p>
          <p>
            Example: Agar aapke appliances total 500W hain aur aap 4 ghante backup chahte ho, toh energy requirement = 500 × 4 = 2000 Wh. 
            <br />
            Battery Ah = 2000 / (12 × 0.85) = 196 Ah.
          </p>

          <h3>5. Kis Type ki Battery Best Hai?</h3>
          <p>
            3 main types hoti hain:
          </p>
          <ul>
            <li><strong>SMF / Tubular</strong> — Long life (5-7 saal), maintenance free, best for home inverter.</li>
            <li><strong>Flat plate</strong> — Sasta, lekin life 3-4 saal. Agar budget tight hai, toh ye ek option ho sakta hai.</li>
            <li><strong>Lithium</strong> — Fast charging, long life (10+ saal), lekin mehenga. Agar aapko high cycle life chahiye aur space limited hai, toh consider karein.</li>
          </ul>

          <h3>6. Load Prioritization</h3>
          <p>
            Har ghar ka load alag hota hai. Sabse pehle decide karo ki outage mein kaunse appliances chahiye:
          </p>
          <ul>
            <li><strong>Essential</strong>: Light, fan, phone charging, fridge.</li>
            <li><strong>Comfort</strong>: TV, router, laptop.</li>
            <li><strong>Optional</strong>: Microwave, geyser, AC.</li>
          </ul>
          <p>
            Is tool mein aap multiple appliances set kar sakte ho aur count bata sakte ho (e.g., 3 fans, 2 LED bulbs). Phir aap dekhenge ki kitna watt total hai aur kya aapka chosen inverter handle karega.
          </p>

          <h3>7. Real World Tips</h3>
          <p>
            - Lighting ke liye LED bulbs best hain. 10W bulb se 800 lumens milte hain.
            - AC ko inverter AC lein agar aapko longer backup chahiye. Fixed speed AC ka start current zyada hota hai.
            - High start current appliances (pump, refrigerator) ko ek separate circuit se chalayein.
          </p>

          <h3>8. Installation & Safety</h3>
          <p>
            - Inverter ko ventilated jagah pe rakhein, direct sunlight se bachaayein.
            - Batteries ko dry, dust-free area mein rakhein. Unke aas-paas kuch space honi chahiye.
            - Always use correct gauge cables (1.5-2.5 mm² for low load, 6mm²+ for high load). Overheating wire se fire hazard hota hai.
          </p>

          <h3>9. Maintenance</h3>
          <p>
            - Battery terminals ko clean rakhna important hai.
            - Inverter fan aur ventilation slots regularly dust-free rakhein.
            - Battery water level (agar tubular battery ho) 2-3 mahine mein check karein.
          </p>

          <h3>10. Summary</h3>
          <p>
            Inverter aur battery planning kaarahi mein aapko apne actual usage ko samajhna hoga. Is tool se aap appliances add karke exact wattage nikal sakte ho, aur backup hours ke hisab se battery size easily calculate ho jata hai.
            <br />
            Hamesha 20% headroom rakho — taki short-term load spikes (pump start, refrigerator start) handle ho jaye.
          </p>
        </div>
      </div>
          {/* ── Copy + Share ── */}
          <div style={{ display:'flex', gap:8, margin:'14px 0 4px' }}>
            <button onClick={()=>{
              const r=document.querySelectorAll('.tw-result-val,.tw-brow-val')
              const t='Inverter Load:\n'+Array.from(r).map(e=>e.innerText).join('\n')+'\n\nalmenso.com/tools/inverter-load-planner'
              navigator.clipboard?.writeText(t).then(()=>alert('✅ Copy ho gaya!'))
            }} style={{flex:1,padding:'10px',background:'#f0fdf4',border:'1.5px solid #16a34a',borderRadius:9,color:'#15803d',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>📋 Copy Result</button>
            <button onClick={()=>window.open('https://wa.me/?text='+encodeURIComponent('Inverter Load calculate kiya — try karo: almenso.com/tools/inverter-load-planner'),'_blank')} style={{flex:1,padding:'10px',background:'#e7fdf0',border:'1.5px solid #25d366',borderRadius:9,color:'#166534',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>💬 WhatsApp Share</button>
          </div>
    </ToolWrapper>
  )
}

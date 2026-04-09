import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

const STATES = {
  uttarakhand: {
    name: 'Uttarakhand (UPCL)',
    year: '2025',
    slabs: [
      { label: '0–100 units', units: 100, rate: 3.25 },
      { label: '101–200 units', units: 100, rate: 4.10 },
      { label: '201–400 units', units: 200, rate: 5.40 },
      { label: '400+ units', units: Infinity, rate: 6.60 },
    ],
    fixed: u => (u <= 100 ? 65 : u <= 200 ? 95 : 130),
    note: 'UPCL domestic tariff 2025',
  },
  delhi: {
    name: 'Delhi (BSES/Tata)',
    year: '2025',
    slabs: [
      { label: '0–200 units', units: 200, rate: 3.00 },
      { label: '201–400 units', units: 200, rate: 4.50 },
      { label: '401–800 units', units: 400, rate: 6.50 },
      { label: '800+ units', units: Infinity, rate: 7.00 },
    ],
    fixed: u => (u <= 400 ? 0 : 125),
    note: 'Delhi domestic tariff 2025 — 0–200 units subsidized',
  },
  maharashtra: {
    name: 'Maharashtra (MSEDCL)',
    year: '2025',
    slabs: [
      { label: '0–100 units', units: 100, rate: 2.81 },
      { label: '101–300 units', units: 200, rate: 5.66 },
      { label: '301–500 units', units: 200, rate: 8.65 },
      { label: '500+ units', units: Infinity, rate: 9.91 },
    ],
    fixed: u => (u <= 100 ? 55 : u <= 300 ? 90 : 150),
    note: 'MSEDCL domestic tariff 2025',
  },
  up: {
    name: 'Uttar Pradesh (UPPCL)',
    year: '2025',
    slabs: [
      { label: '0–150 units', units: 150, rate: 3.35 },
      { label: '151–300 units', units: 150, rate: 4.50 },
      { label: '301–500 units', units: 200, rate: 5.50 },
      { label: '500+ units', units: Infinity, rate: 6.50 },
    ],
    fixed: u => (u <= 150 ? 70 : u <= 300 ? 100 : 140),
    note: 'UPPCL domestic tariff 2025',
  },
}

function calcBill(units, stateKey) {
  const st = STATES[stateKey];
  if (!st) return null
  let bill = 0
  let rem = units
  const breakdown = []
  for (const slab of st.slabs) {
    if (rem <= 0) break
    const used = Math.min(rem, slab.units)
    const slabCost = used * slab.rate
    bill += slabCost
    breakdown.push({ label: slab.label, units: used, rate: slab.rate, cost: slabCost })
    rem -= used
  }
  const fixed = st.fixed(units)
  const duty = Math.round((bill + fixed) * 0.05)
  const total = Math.round(bill + fixed + duty)
  return { energy: Math.round(bill), fixed, duty, total, units, st, breakdown }
}

function fmtINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function ElectricityBillAnalyzer() {
  const [stateKey, setStateKey] = useState('uttarakhand')
  const [mode, setMode] = useState('reading')
  const [prev, setPrev] = useState('')
  const [curr, setCurr] = useState('')
  const [units, setUnits] = useState('')
  const [result, setResult] = useState(null)
  const { setShowMonetization } = useToolResult()
  const [notes, setNotes] = useState('')

  const computedUnits = useMemo(() => {
    if (mode === 'reading') {
      const p = parseFloat(prev)
      const c = parseFloat(curr)
      if (isNaN(p) || isNaN(c)) return null
      return c - p
    }
    return parseFloat(units)
  }, [mode, prev, curr, units])

  const calculate = () => {
    const u = computedUnits
    if (!u || u <= 0) return
    const res = calcBill(u, stateKey)
    setResult(res)
    setShowMonetization(true)

    // Quick advice
    const advice = []
    if (u > 400) advice.push('Aapka consumption kaafi high hai — AC aur heater ka usage check karein.')
    else if (u > 200) advice.push('Thoda kam karo — LED bulbs aur fan ke sath AC consumption bhi dekho.')
    else advice.push('Bahut achha! Aapka usage efficient hai.')
    if (u > 0 && u < 50) advice.push('Agar bills consistently low hain toh check karein ki meter kisi tarah se bypass nahi ho raha.')
    setNotes(advice.join(' '))
  }

  const usageLabel = result ?
    (result.units <= 100 ? '🟢 Efficient use' : result.units <= 200 ? '🟡 Average use' : result.units <= 400 ? '🟠 High use' : '🔴 Very high use')
    : ''

  const usageColor = result ?
    (result.units <= 100 ? '#16a34a' : result.units <= 200 ? '#eab308' : result.units <= 400 ? '#f97316' : '#dc2626')
    : '#e0e0e0'

  return (
    <ToolWrapper
      title="Smart Electricity Bill Analyzer — India Specific Meter Reading + Tips"
      description="Meter reading, slab breakup, fixed charge, duty aur smart tips — ek hi jagah. Apne current aur pichle reading se exact bill nikalo aur pata karo kis slab mein bach sakte ho."
      keywords="electricity bill calculator india, meter reading calculator, bijli bill analyzer, slab breakup, fixed charges"
      emoji="⚡"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #e65100 100%)"
      toolName="Smart Electricity Bill Analyzer"
      tagline="Meter reading se exact bill aur slab analysis — India ke multiple states ke saath"
      guideSteps={[
        { heading: 'State select karein', text: 'Apne electricity board ke hisab se state choose karo. Har state ka rate thoda alag hota hai.' },
        { heading: 'Meter reading enter karo', text: 'Agar bill pe readings likhi hain toh wahi dah do, warna meter par current reading padho.' },
        { heading: 'Bill calculate karo', text: 'Slab wise cost, fixed charge, duty aur total estimate milega — aapke bill se match karo.' },
        { heading: 'Tips padho aur bacho', text: 'High usage peaks ka matlab adhik bill. Simple tweaks se kaafi bachat ho sakti hai.' },
      ]}
      faqs={[
        { q: 'Kya yeh tool exact bill deta hai?', a: 'Yeh aapke entered units ke hisab se slab breakdown aur approximate fixed/duty charges deta hai. Actual bill mein meter rent, fuel surcharge ya state-specific subsidies bhi ho sakte hain.' },
        { q: 'Meter reading kaise check karun?', a: 'Meter ke digit panel se first reading (previous) aur second reading (current) dekho. In dono ka difference aapka consumption units hota hai.' },
        { q: 'Tariff slab har saal change hota hai?', a: 'Haan, state electricity boards aksar har saal (ya kabhi kabhi 6 mahine) mein rate revise karte hain. Latest rate ke liye apne board ka website check karo.' },
        { q: 'Kya poor households ko subsidy milti hai?', a: 'Kuch states mein 100 units tak subsidy milti hai. Is tool mein yeh general slab cost dikhayi gayi hai, subsidy apply nahi ki gayi hai.' },
      ]}
      relatedBlog={{ slug: 'bijli-bill-kaise-kam-kare', title: 'Bijli Bill Kaise Kam Kare? 10 Proven Tips', excerpt: 'Simple tricks se monthly electricity bill mein ₹200–500 tak bachat possible hai.' }}
      relatedTools={[
        { path: '/tools/bijli', emoji: '⚡', name: 'Bijli Bill Calculator' },
        { path: '/tools/solar-roi', emoji: '☀️', name: 'Solar ROI Calculator' },
        { path: '/tools/inverter-load-planner', emoji: '🔋', name: 'Inverter Load Planner' }
      ]}
      affCategory="electrical"
      serviceCategory="electrician"
      toolPath="/tools/electricity-bill-analyzer"
    >
      <div className="tp-card">
        <div className="tp-sec-title">🔎 Meter Reading Se Bill Estimate</div>
        <div className="tw-input-group">
          <div className="tw-field"><label>📍 State (Tariffs)</label>
            <select value={stateKey} onChange={e => { setStateKey(e.target.value); setResult(null) }}>
              {Object.entries(STATES).map(([k,v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>
          <div className="tw-field">
            <label>📏 Input Mode</label>
            <select value={mode} onChange={e => { setMode(e.target.value); setResult(null) }}>
              <option value="reading">Meter Reading</option>
              <option value="units">Units Enter Karo</option>
            </select>
          </div>
          {mode === 'reading' ? (
            <>
              <div className="tw-field"><label>🧮 Previous Reading</label>
                <input type="number" value={prev} onChange={e => { setPrev(e.target.value); setResult(null) }} placeholder="e.g. 12345" />
              </div>
              <div className="tw-field"><label>📈 Current Reading</label>
                <input type="number" value={curr} onChange={e => { setCurr(e.target.value); setResult(null) }} placeholder="e.g. 12780" />
              </div>
            </>
          ) : (
            <div className="tw-field"><label>🔢 Units Consumed</label>
              <input type="number" value={units} onChange={e => { setUnits(e.target.value); setResult(null) }} placeholder="e.g. 340" />
            </div>
          )}
          <button className="tw-calc-btn" onClick={calculate}>📊 Calculate Bill</button>
        </div>
      </div>

      {result && (
        <>
          <div className="tw-result" style={{ background: usageColor }}>
            <div className="tw-result-label">Estimated Bill</div>
            <div className="tw-result-val">{fmtINR(result.total)}</div>
            <div className="tw-result-sub">{result.units} units — {usageLabel}</div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">📋 Bill Breakdown</div>
            <div className="tw-breakdown">
              <div className="tw-brow"><span className="tw-brow-label">Energy Charge</span><span className="tw-brow-val">{fmtINR(result.energy)}</span></div>
              <div className="tw-brow"><span className="tw-brow-label">Fixed Charge</span><span className="tw-brow-val">{fmtINR(result.fixed)}</span></div>
              <div className="tw-brow"><span className="tw-brow-label">Duty / GST</span><span className="tw-brow-val">{fmtINR(result.duty)}</span></div>
              <div className="tw-brow total"><span className="tw-brow-label">Total Estimated Bill</span><span className="tw-brow-val">{fmtINR(result.total)}</span></div>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">📊 Slab Wise Consumption</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                <thead><tr style={{ background: '#f8fafc' }}>
                  {['Slab', 'Units', 'Rate', 'Cost'].map(h => (
                    <th key={h} style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 800, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {result.breakdown.map((r, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 700 }}>{r.label}</td>
                      <td style={{ padding: '7px 6px', textAlign: 'right' }}>{r.units}</td>
                      <td style={{ padding: '7px 6px', textAlign: 'right' }}>₹{r.rate.toFixed(2)}</td>
                      <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 700 }}>₹{Math.round(r.cost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">💡 Smart Tips for Lower Bill</div>
            <div className="tp-tip">{notes}</div>
            <div className="tp-tip">✅ Tip: Meter reading har mahine ek hi date par lo — phir usage pattern dekhna easy hota hai.</div>
            <div className="tp-tip">✅ Tip: Agar units 3 mahine tak 400+ consistently ho, toh LED, inverter AC, aur energy-efficient appliances consider karo.</div>
          
              {/* Copy + Share */}
              <div style={{ display:'flex', gap:8, marginTop:14 }}>
                <button onClick={() => {
                  const t = `Bijli Bill Calculation\nAlmenso.com\nResult: Check your bill at almenso.com/tools/bijli`
                  navigator.clipboard?.writeText(t).then(()=>alert('✅ Copy ho gaya!'))
                }} style={{ flex:1, padding:'10px 6px', background:'#f0fdf4', border:'1.5px solid #16a34a', borderRadius:9, color:'#15803d', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', fontFamily:'var(--font)' }}>
                  📋 Copy Result
                </button>
                <button onClick={() => {
                  window.open('https://wa.me/?text='+encodeURIComponent('Bijli Bill check kiya almenso.com pe — free tool try karo!'), '_blank')
                }} style={{ flex:1, padding:'10px 6px', background:'#e7fdf0', border:'1.5px solid #25d366', borderRadius:9, color:'#166534', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', fontFamily:'var(--font)' }}>
                  💬 WhatsApp Share
                </button>
              </div>
</div>
        </>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Deep Dive: Bijli Bill Samajhna</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#333' }}>
          <p>
            India mein bijli bill sirf units ka hisaab nahi hota — iske piche ek poora system hota hai jo slab rates, fixed charges, subsidy schemes, aur duty ke mix se tayar hota hai. Agar aap har mahine apna bill dekhte hain aur soche bas ₹xxxx aa gaya, toh samajhna zaroori hai ki kaha paise ja rahe hain. Yahan hum ek choti si guide likh rahe hain jo aapko meter reading se lekar bill reduction tak le jayegi.
          </p>
          <h3>1. Meter Reading Kaise Kaam Karti Hai?</h3>
          <p>
            Har ghar mein jo meter laga hota hai woh units ko count karta hai — ek unit = 1 kWh. Agar meter par 12345 likha hai, aur agle mahine 12500 hai, toh aapne 155 units use kiye. Ye simple difference hi aapka consumption hai. Meter reading ka sahi tareeka: 
          </p>
          <ul>
            <li><strong>Previous reading</strong> ko note karein (billing cycle start).</li>
            <li><strong>Current reading</strong> uss mahine ke end pe note karein.</li>
            <li>Difference ko samjhne ke liye calendar ko tog ya bill cycle ko dhyan mein rakhein — jo 30/31 din hai.</li>
          </ul>
          <p>
            Agar aapka meter digital hai toh reading asaani se dikh jaati hai. Electromechanical meters mein aapko wheel ko dhyan se dekhna padta hai. Agar zero reset ho, toh pichle month ka bill compare karke check karein.
          </p>

          <h3>2. Tariff Slabs Samjhein</h3>
          <p>
            Har state board apne slab rates decide karta hai. Yeh slabs ek range batate hain — pehli 100 units par ek rate, agle 100 par thoda zyada, aur baad mein fir zyada. Iss tool mein aap state select karke exact slab breakup dekh sakte hain.
          </p>
          <p>
            <strong>Example:</strong> Uttarakhand mein 0–100 units ₹3.25/unit, 101–200 units ₹4.10/unit, 201–400 units ₹5.40/unit, aur 400+ units ₹6.60/unit. Matlab agar aap 350 units chalate ho, toh pehle 100 unit ₹325, next 100 ₹410, next 150 ₹810 — total ₹1545 energy charge.
          </p>

          <h3>3. Fixed Charges aur Duty Kya Hote Hain?</h3>
          <p>
            Jo bill aapko aata hai usmein sirf energy charge nahi hoti. Har board fixed charge bhi lagata hai — yeh maintenance aur distribution cost cover karta hai. Kuch boards mein fixed charges units ke hisab se vary karte hain (jaise 100 unit tak ₹65, 200 unit tak ₹95, etc.).
          </p>
          <p>
            Duty ya GST bhi add hoti hai. Is tool mein hum 5% duty apply karte hain (jo as a ballpark kaam karta hai). Aapke actual bill mein ye 5% se thoda upar neeche ho sakti hai, lekin yeh aapko ek accurate estimate deta hai.
          </p>

          <h3>4. Kyon Bill Achanak Badh Jata Hai?</h3>
          <p>
            Agar ek mahine mein bills zyada aa jaate hain, toh kuch common reasons yeh hain:
          </p>
          <ul>
            <li><strong>Temperature badhna</strong>: Garamiyon mein AC ya cooler se usage tezi se badhta hai.</li>
            <li><strong>Appliance fault</strong>: Geyser ya fridge ka compressor agar kharab ho toh zyada current kheenchte hain.</li>
            <li><strong>Phantom load</strong>: TV, set-top box, charger standby mein bhi current lete rehte hain. Raat mein switch off karein.</li>
            <li><strong>Meter tampering</strong>: Kabhi kabhi meter bypass ya magnet se tampering hoti hai. Aisa lagta hai ke bill kam aa raha hai, lekin ye illegal hai aur fine lag sakta hai.</li>
          </ul>

          <h3>5. Kaise Bill Kam Karein — Smart Steps</h3>
          <p>
            Agar aap budget mein rehna chahte hain, toh yeh 5 simple steps follow karein:
          </p>
          <ol>
            <li><strong>LED lighting</strong>: 10W LED bulb 60W bulb se 6x kam bijli use karta hai. Agar aapke ghar mein 10 bulb hain, toh savings ₹150–200 per month ho sakti hai.</li>
            <li><strong>AC setting</strong>: 1°C badhaane se 6% tak bijli bacha sakte hain. 24°C par chalayein aur fan speed high rakhein.</li>
            <li><strong>Timer use karein</strong>: Geyser ko sirf 15–20 minute pehle on karein. Raat ko switch off rakhein.</li>
            <li><strong>Appliances ki maintenance</strong>: Fridge coil clean karein, AC filter dhoyein. Poor maintenance se energy waste hota hai.</li>
            <li><strong>Monthly tracking</strong>: Har mahine reading note karein aur is tool mein entry karein. Pattern dikhne lagega aur aap decide kar sakte hain kaha cut karna hai.</li>
          </ol>

          <h3>6. Agle Bill ke Liye Planning</h3>
          <p>
            Agar aapko lagta hai ki aane wala bill zyada aa sakta hai (jaise festival, guests, ya garam mausam), toh pehle se hi thode changes kar sakte hain:
          </p>
          <ul>
            <li>Apne sabse bada appliance (AC/Heater) ki wattage check karo, aur use calculate karo kitne hours chalane par kitna unit lagega.</li>
            <li>Unplug karne layak devices (charging adapters, set-top boxes) ko ek power strip mein lagao aur raat ko off kar do.</li>
            <li>Energy saver mode wale appliances (inverter AC, 5-star fridge) ki taraf invest karo — thoda mehenga par 2-3 saal mein bachat ho jaati hai.</li>
          </ul>

          <h3>7. Aapka Meter Sahi Kaam Kar Raha Hai?</h3>
          <p>
            Agar aapko lagta hai ki aapke bill mein kuch gadbad hai, toh ek baar meter reading ko khud verify karke dekhein:
          </p>
          <ul>
            <li>Meter reading note karo (digit-wise) aur apne bill ke saath compare karo.</li>
            <li>Meter ke sticker ya serial number check karo — kabhi kabhi post me switch hone se naya meter lagta hai.</li>
            <li>Agar reading match nahi hoti, toh apne electricity board ko complaint file karo — generally 30 din mein verify karke correction hota hai.</li>
          </ul>

          <h3>8. Solar Ya Inverter Se Bachat Kaise Ho Sakti Hai?</h3>
          <p>
            Agar aapka bill consistently ₹2000+ aata hai, toh solar panel ya inverter system ek serious option ho sakta hai. Solar se pehle meter reading aur average daily use samajhna bohot zaroori hai — iss tool se aap easily monthly consumption nikal sakte hain.
          </p>
          <p>
            Aap <strong>Solar ROI Calculator</strong> tool use kar sakte hain jo batata hai ki kitne saalon mein aapki investment recover hogi. General rule: agar aapki monthly saving ₹3000+ hai, toh 3-4 kW solar system 5-6 saal mein payback de deta hai (current rates ke hisab se).</p>

          <h3>9. FAQs (Quick Notes)</h3>
          <p>
            <strong>Q:</strong> Kya aapke kalkulator se subsidy dhyan mein aati hai?<br />
            <strong>A:</strong> Nahi, yeh tool general slab rates aur fixed charges dikhata hai. Subsidies state-specific hoti hain aur board ke rules ke hisab se alag padti hain.
          </p>
          <p>
            <strong>Q:</strong> Kya units actual bill se match karengi?<br />
            <strong>A:</strong> Agar aap sahi reading daalte hain aur state select sahi hai, toh total kaafi hat tak match karega. Lekin bill par dusre charges (meter rent, demand charges, late fee) bhi lag sakte hain.
          </p>

          <h3>10. Next Steps</h3>
          <p>
            - Apne last 6 mahine ka usage track karo.<br />
            - Agar 3 mahine consecutively high ho, toh appliances audit karo.<br />
            - Solar/inverter planner use karo (tool shelf mein available) aur decide karo ki kaunse options sabse zyada faydemand hain.
          </p>
          <p>
            Aapne ek smart step liya hai by using this bill analyzer – ab aapko har bill surprise nahi karega. Save this tool as bookmark, aur har month reading dalte raho. 🚀
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

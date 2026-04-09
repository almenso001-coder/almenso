import React, { useState, useMemo, useEffect } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

function fmtINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

function round2(n) {
  return Math.round(n * 100) / 100
}

export default function SolarROICalculator() {
  const [systemKw, setSystemKw] = useState('3')
  const [costPerW, setCostPerW] = useState('60')
  const [avgSunHrs, setAvgSunHrs] = useState('5')
  const [tariff, setTariff] = useState('7')
  const [annualInflation, setAnnualInflation] = useState('5')
  const [commission, setCommission] = useState('4')

  const { setShowMonetization } = useToolResult()
  // Solar ROI always shows result (useMemo) — trigger monetization on mount
  useEffect(() => { setShowMonetization(true) }, [])

  const data = useMemo(() => {
    const kw = parseFloat(systemKw) || 0
    const costW = parseFloat(costPerW) || 0
    const sun = parseFloat(avgSunHrs) || 0
    const rate = parseFloat(tariff) || 0
    const inflation = parseFloat(annualInflation) / 100
    const comm = parseFloat(commission) / 100

    const totalCost = kw * costW * 1000
    const dailyGen = kw * sun
    const annualGen = dailyGen * 365
    const annualSaving = annualGen * rate
    const commissionCost = totalCost * comm
    const netInvestment = totalCost + commissionCost

    // Payback (years) ignoring inflation
    const paybackYears = annualSaving > 0 ? netInvestment / annualSaving : null

    // Simple NPV with inflation (discount rate = inflation)
    const npv = annualSaving / inflation - netInvestment

    // If rate increases every year
    const futureValue = annualSaving * Math.pow(1 + inflation, 10)

    return {
      kw, totalCost, dailyGen, annualGen, annualSaving, paybackYears, npv, futureValue
    }
  }, [systemKw, costPerW, avgSunHrs, tariff, annualInflation, commission])

  return (
    <ToolWrapper
      title="Solar ROI Calculator — Kitna Jaldi Payback Milega?"
      description="Solar panel system ka payback time, annual savings, aur NPV calculate karo. Cost per watt, sunlight hours, aur electricity rate daal ke apna smart plan banao."
      keywords="solar roi calculator india, solar payback calculator, solar panel return on investment, solar savings calculator, solar insurance"
      emoji="☀️"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #f59e0b 100%)"
      toolName="Solar ROI Calculator"
      tagline="System cost, daily generation, payback period — sab ek jagah."
      guideSteps={[
        { heading: 'System Size daalo', text: 'Kitna kW ka solar system install karwana chahte ho — 1kW to 10kW typical for homes.' },
        { heading: 'Cost per watt set karo', text: 'Market mein ₹40-70 per watt hota hai. Install aur inverter sab mila ke dekho.' },
        { heading: 'Tariff aur sunlight estimate', text: 'Aapke state ka unit rate aur daily sunlight hours daal ke accurate savings nikalti hai.' },
        { heading: 'Payback aur saving dekho', text: 'Kitne saal mein aapki investment wapas aayegi aur aane wale 20 saal mein kitni savings hogi.' },
      ]}
      faqs={[
        { q: 'Kya solar panel ROI har jagah same hota hai?', a: 'Nahi. Solar ki efficiency, electricity rate, aur sunlight hours determine karte hain. Delhi mein zyada tariff hai, isliye ROI fast hota hai; Kerala mein sunlight kam hai, isliye ROI thoda slow.' },
        { q: 'Commission aur maintenance kaise add karein?', a: 'Ye tool aapko ek basic commission (4%) add karne deta hai. Maintenance per year typically 1-2% hoti hai, usko bhi frame mein rakhein.' },
        { q: 'Tariff inflation ka impact kya hai?', a: 'Jitni tez electricity rate badhegi, utni fast aapki savings badhegi. Isliye 5-7% annual inflation assume karna common hai.' },
        { q: 'Grid se connect rooftop solar ka kya fayda?', a: 'Net metering ke through excess electricity grid ko bech sakte ho. Is tool mein ham assume karte hain ki aap apni generation ka maximum use kar rahe ho.' },
      ]}
      relatedBlog={{ slug: 'solar-panel-roi-explained', title: 'Solar panel ROI explained', excerpt: 'Solar ka ROI kaise nikalte hain aur kaise 5-7 saal mein investment recover hota hai.' }}
      relatedTools={[
        { path: '/tools/electricity-bill-analyzer', emoji: '⚡', name: 'Electricity Bill Analyzer' },
        { path: '/tools/inverter-load-planner', emoji: '🔋', name: 'Inverter Load Planner' }
      ]}
      affCategory="solar"
      serviceCategory="solar"
      toolPath="/tools/solar-roi"
    >
      <div className="tp-card">
        <div className="tp-sec-title">📈 Solar Savings Estimate</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>☀️ System Size (kW)</label>
            <input type="number" value={systemKw} step="0.1" onChange={e => setSystemKw(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>💰 Cost per Watt (₹)</label>
            <input type="number" value={costPerW} step="1" onChange={e => setCostPerW(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>⏱️ Average Sun Hours / Day</label>
            <input type="number" value={avgSunHrs} step="0.1" onChange={e => setAvgSunHrs(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>⚡ Electricity Tariff (₹ / unit)</label>
            <input type="number" value={tariff} step="0.1" onChange={e => setTariff(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>📈 Annual Tariff Inflation (%)</label>
            <input type="number" value={annualInflation} step="0.1" onChange={e => setAnnualInflation(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>🛠️ Installation + Commission (%)</label>
            <input type="number" value={commission} step="0.1" onChange={e => setCommission(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg,#f59e0b,#fb923c)' }}>
        <div className="tw-result-label">Estimated System Cost</div>
        <div className="tw-result-val">{fmtINR(data.totalCost)}</div>
        <div className="tw-result-sub">Including commission, #{Math.round((data.totalCost * (parseFloat(commission) / 100 || 0)))} extra</div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🔎 Annual Performance</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Daily Generation</span><span className="tw-brow-val">{round2(data.dailyGen)} kWh</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Annual Generation</span><span className="tw-brow-val">{Math.round(data.annualGen)} kWh</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Annual Savings</span><span className="tw-brow-val">{fmtINR(data.annualSaving)}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Payback Period (years)</span><span className="tw-brow-val">{data.paybackYears ? data.paybackYears.toFixed(1) : '—'}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">NPV (at {annualInflation}% discount)</span><span className="tw-brow-val">{data.npv > 0 ? fmtINR(data.npv) : 'Negative'}</span></div>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📌 Solar ROI Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Solar energy ka ROI (Return on Investment) samajhna pehle thoda confusing lag sakta hai, lekin jab aap basic math samajh lete hain toh decisions kaafi aasan ho jate hain. Aaj hum aapko step-by-step batayenge ki aap apne ghar ke liye ideal solar system kaise chun sakte hain, kitni energy aapko mil sakti hai, aur kitne saal mein aapki investment wapas milegi.
          </p>

          <h3>Solar ka basic formula kya hai?</h3>
          <p>
            Sabse pehle samajh lein: Solar ke saare calculations energy (kWh) se judhe hote hain.
            <br />
            <strong>Energy produced per day</strong> = <em>System size (kW) × Average sun hours</em>.
            <br />
            Aapke liye important number hai <strong>annual generation</strong>, jo ki hota hai:
            <br />
            <em>Annual generation = daily generation × 365</em>.
          </p>
          <p>
            Ab agar aapki current electricity tariff ₹7 per unit hai, toh total savings hongi:
            <br />
            <em>Annual savings = annual generation × tariff</em>.
          </p>

          <h3>Construction cost — kitna paisa lagega?</h3>
          <p>
            Cost per watt market mein ₹40 se ₹70 tak ho sakti hai, depending on panels, inverter quality, installation charges, aur GST. Ek 3kW system (3000W) agar ₹60 per watt se lage toh system cost ₹1.8 lakh banega.
          </p>
          <p>
            Solar installers ke alawa aapko wiring, structure, earthing aur net-metering connection ke liye extra ₹8,000-15,000 bhi lag sakte hain. Isliye is tool mein hum ek "commission" field rakhte hain — isme aap installation se judi extra cost daal sakte ho.
          </p>

          <h3>Payback period kaise nikalte hain?</h3>
          <p>
            Payback period ek simple formula se nikalta hai:
            <br />
            <strong>Payback (years) = Total investment / Annual savings</strong>.
          </p>
          <p>
            Example: agar aap ₹1,80,000 invest karte ho aur annual savings ₹35,000 ho, toh payback aayega 1,80,000 / 35,000 = 5.14 saal.
            Uske baad ka jo bacha hua generation hai, wo aapki free bijli hai — yani profit.
          </p>

          <h3>Tariff inflation ko kyun consider karein?</h3>
          <p>
            Aaj ₹7 per unit hai, ho sakta hai 5 saal mein ₹9 ya ₹10 ho jaaye. Jab aapka electricity rate badhega, aapki savings bhi proportionally badh jaayegi. Isi wajah se hum yearly inflation rate ko ek "discount rate" ke jaise consider karte hain.
          </p>
          <p>
            Tools mein hamne NPV (Net Present Value) calculate kiya hai — yeh batata hai ki aaj ke paise mein aapki future savings ki value kya hai. Agar NPV positive hai, toh investment financially sound ho sakti hai.
          </p>

          <h3>Solar system choose karte waqt kya dekhna hai?</h3>
          <ul>
            <li><strong>Panels ki quality</strong>: Mono-crystalline panels zyada efficient aur long-lasting hote hain. 25 saal ki warranty dekho.</li>
            <li><strong>Inverter ka rating</strong>: Ye DC ko AC mein convert karta hai. High efficiency (95%+) inverter lena better hota hai.</li>
            <li><strong>Net-metering policy</strong>: Har state mein net-metering rules alag hain. Kuch states mein aapko excess power ke liye full tariff milta hai, kuch mein sirf khud ke consumption ke against credit milta hai.</li>
            <li><strong>Roof orientation & shading</strong>: South-facing roof best hota hai. Trees, chimneys se shade aane par output kam ho sakta hai.</li>
          </ul>

          <h3>Kitna kW system choose karun?</h3>
          <p>
            Aap apne monthly electricity bill se estimate kar sakte hain. Agar aapka bill ₹6,000 hai aur unit rate ₹8 hai, toh aap ~750 units consume karte ho. Agar aap 5 sun hours assume karo, toh 750 units = 15kWh per day.
            <br />
            Iska matlab 15 / 5 = 3 kW system aapko itna generate karega. Lekin kabhi kabhi aapko thoda extra cushion ke liye 3.5-4 kW lena chahiye — taaki monsoon ya badal ke dino mein bhi kaam chal sake.
          </p>

          <h3>Warranty aur maintenance</h3>
          <p>
            Panels ki generally 25 saal output warranty hoti hai (degradation 0.5-0.7% per year). Inverter ki warranty 5-10 saal hoti hai. Har 6 mahine mein panels ko saaf karna invest ko safe rakhta hai.
          </p>

          <h3>Solar + Battery = Complete Backup</h3>
          <p>
            Agar aapko blackout time mein bhi bijli chahiye, toh aapko battery add karni padegi. Battery cost system cost ka 30-50% hoti hai. Agar aap sirf bill reduce karna chahte hain, grid-tied system (without battery) hi behtar hai.
          </p>

          <h3>Conclusion</h3>
          <p>
            Solar ek long-term investment hai. Agar aap 5-7 saal ke andar payback dekh sakte hain, toh agle 10-15 saal free bijli milti hai. Hamare calculator ko use karo, apne numbers daalo, aur compare karo alag-alag quotes se. Fir jo decision nikle, usse dhyan se implement karo.
          </p>
        </div>
      </div>
          {/* ── Copy + Share ── */}
          <div style={{ display:'flex', gap:8, margin:'14px 0 4px' }}>
            <button onClick={()=>{
              const r=document.querySelectorAll('.tw-result-val,.tw-brow-val')
              const t='Solar ROI:\n'+Array.from(r).map(e=>e.innerText).join('\n')+'\n\nalmenso.com/tools/solar-roi'
              navigator.clipboard?.writeText(t).then(()=>alert('✅ Copy ho gaya!'))
            }} style={{flex:1,padding:'10px',background:'#f0fdf4',border:'1.5px solid #16a34a',borderRadius:9,color:'#15803d',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>📋 Copy Result</button>
            <button onClick={()=>window.open('https://wa.me/?text='+encodeURIComponent('Solar ROI calculate kiya — try karo: almenso.com/tools/solar-roi'),'_blank')} style={{flex:1,padding:'10px',background:'#e7fdf0',border:'1.5px solid #25d366',borderRadius:9,color:'#166534',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>💬 WhatsApp Share</button>
          </div>
    </ToolWrapper>
  )
}

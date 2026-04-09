import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const RELATED_TOOLS = [
  { path:'/tools/loan-interest-calculator', emoji:'💰', name:'Loan Interest Calculator' },
  { path:'/tools/gst-calculator',           emoji:'🧾', name:'GST Calculator' },
  { path:'/tools/profit-margin-calculator', emoji:'📊', name:'Profit Margin' },
]

function calcEMIData(P, annualRate, months) {
  const R = annualRate / 100 / 12
  if (!P || !R || !months) return null
  const emi   = P * R * Math.pow(1+R, months) / (Math.pow(1+R, months) - 1)
  const total = emi * months
  return { emi, total, interest: total - P, principal: P, months, R }
}

function getYearBreak(P, R, emi, N) {
  const rows = []; let balance = P
  for (let y = 1; y <= Math.ceil(N/12); y++) {
    const mths = Math.min(12, N - (y-1)*12)
    let yi = 0, yp = 0
    for (let m = 0; m < mths; m++) {
      const mi = balance * R; const mp = emi - mi
      yi += mi; yp += mp; balance -= mp
    }
    rows.push({ year:y, principal:yp, interest:yi, balance:Math.max(0,balance) })
  }
  return rows
}

export default function EMICalculator() {
  const [tab, setTab] = useState('emi')
  const [principal, setPrincipal] = useState('')
  const [rate,      setRate]      = useState('')
  const [tenure,    setTenure]    = useState('')
  const [tenureType,setTenureType]= useState('months')
  const [result,    setResult]    = useState(null)
  const [ppPrincipal, setPPPrincipal] = useState('')
  const [ppRate,      setPPRate]      = useState('')
  const [ppTenure,    setPPTenure]    = useState('')
  const [ppExtra,     setPPExtra]     = useState('')
  const [ppMonth,     setPPMonth]     = useState('')
  const [ppResult,    setPPResult]    = useState(null)
  const [c1, setC1] = useState({ principal:'', rate:'', tenure:'', type:'years' })
  const [c2, setC2] = useState({ principal:'', rate:'', tenure:'', type:'years' })
  const [cmpRes, setCmpRes] = useState(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const N = tenureType === 'years' ? parseFloat(tenure)*12 : parseFloat(tenure)
    const res = calcEMIData(P, parseFloat(rate), N)
    if (!res) return
    setResult({ ...res, yearBreakdown: getYearBreak(P, res.R, res.emi, N) })
  }

  const calcPrepay = () => {
    const P = parseFloat(ppPrincipal), r = parseFloat(ppRate)/100/12
    const N = parseFloat(ppTenure)*12
    const extra = parseFloat(ppExtra)||0
    const prepayAt = parseInt(ppMonth)||0
    if (!P||!r||!N) return
    const emi = P * r * Math.pow(1+r,N) / (Math.pow(1+r,N)-1)
    const totalNormal = emi * N
    let balance = P, totalPaidWith = 0, monthsWith = 0
    for (let m = 1; m <= N; m++) {
      balance -= (emi - balance * r); totalPaidWith += emi; monthsWith++
      if (m === prepayAt && extra > 0) { balance -= extra; totalPaidWith += extra }
      if (balance <= 0) break
    }
    setPPResult({ emi, totalNormal, totalPaidWith, saved: totalNormal - totalPaidWith, monthsSaved: N - monthsWith })
  }

  const calcCompare = () => {
    const calc = (c) => {
      const P = parseFloat(c.principal), r = parseFloat(c.rate)
      const N = c.type==='years' ? parseFloat(c.tenure)*12 : parseFloat(c.tenure)
      return calcEMIData(P, r, N)
    }
    const r1 = calc(c1), r2 = calc(c2)
    if (!r1 || !r2) return
    setCmpRes([r1, r2])
  }

  const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN')
  const pct = (a,b) => ((a/b)*100).toFixed(1) + '%'
  const tabSt = (t) => ({
    flex:1, padding:'9px 4px', border:'1.5px solid', borderRadius:8, cursor:'pointer',
    fontWeight:800, fontSize:'0.76rem',
    borderColor: tab===t ? '#0d47a1' : '#e5e7eb',
    background:  tab===t ? '#0d47a1' : '#fff',
    color:       tab===t ? '#fff'    : '#555',
  })

  return (
    <ToolWrapper
      title="EMI Calculator — Home Loan, Car Loan, Personal Loan EMI Calculate Karo"
      description="Loan EMI, prepayment savings aur loan comparison — teen tools ek jagah. Home loan, car loan, personal loan sab ke liye year-wise breakdown."
      keywords="emi calculator, home loan emi, car loan emi, prepayment calculator, loan comparison india hindi"
      emoji="🏦"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #0d47a1 100%)"
      toolName="EMI Calculator"
      tagline="EMI · Prepayment Savings · Loan Comparison — teen tools ek jagah"
      guideSteps={[
        { heading: 'Loan Amount daalo', text: 'Kitna loan chahiye — ghar, gaadi, personal.' },
        { heading: 'Rate aur Tenure', text: 'Bank ka annual rate aur kitne saal ka loan.' },
        { heading: 'Prepayment tab try karo', text: 'Extra payment se kitna bachega — instantly pata karo.' },
        { heading: 'Compare tab use karo', text: 'Do banks ke offers compare karo, better deal chunao.' },
      ]}
      faqs={[
        { q: 'EMI mein kya shaamil hota hai?', a: 'EMI mein Principal + Interest dono hote hain. Shuru ke mahine zyada interest hoti hai, baad mein principal zyada katne lagta hai.' },
        { q: 'Prepayment kab karna chahiye?', a: 'Loan ke pehle 5 saal mein prepayment sabse zyada faydemand hoti hai — kyunki tab interest component sabse zyada hota hai.' },
        { q: 'Floating vs Fixed rate?', a: 'Floating mein RBI ke hisab se rate badlti hai — 20 saal mein aksar sasta padta hai. Fixed mein guarantee hoti hai lekin rate zyada hota hai.' },
        { q: 'Home loan pe tax benefit?', a: 'Principal pe 80C ₹1.5 lakh + Interest pe 24(b) ₹2 lakh deduction — old regime mein.' },
        { q: 'Tenure badhane se kya hota hai?', a: 'Monthly EMI kam hoti hai lekin total interest bohot zyada ho jaata hai. Short tenure sahi hai agar afford kar sako.' },
      ]}
      relatedBlog={{ slug:'how-emi-is-calculated', title:'EMI Kaise Calculate Hoti Hai?', excerpt:'Bank kaise EMI nikaalti hai — simple language mein.' }}
      relatedTools={RELATED_TOOLS}
      affCategory="finance"
      hasResult={true}
      toolPath="/tools/emi-calculator"
    >
      <div style={{ display:'flex', gap:6, marginBottom:4 }}>
        <button style={tabSt('emi')}     onClick={()=>setTab('emi')}>🏦 EMI</button>
        <button style={tabSt('prepay')}  onClick={()=>setTab('prepay')}>💡 Prepayment</button>
        <button style={tabSt('compare')} onClick={()=>setTab('compare')}>⚖️ Compare</button>
      </div>

      {tab === 'emi' && <>
        <div className="tp-card">
          <div className="tp-sec-title">🏦 Loan EMI Calculate Karo</div>
          <div className="tw-input-group">
            <div className="tw-field"><label>💰 Loan Amount (₹)</label>
              <input type="number" value={principal} placeholder="e.g. 500000" onChange={e=>{setPrincipal(e.target.value);setResult(null)}} /></div>
            <div className="tw-field"><label>📊 Annual Interest Rate (%)</label>
              <input type="number" step="0.1" value={rate} placeholder="e.g. 8.5" onChange={e=>{setRate(e.target.value);setResult(null)}} /></div>
            <div className="tw-field"><label>📅 Loan Tenure</label>
              <div style={{ display:'flex', gap:8 }}>
                <input type="number" value={tenure} placeholder={tenureType==='years'?'e.g. 20':'e.g. 240'} style={{ flex:1 }} onChange={e=>{setTenure(e.target.value);setResult(null)}} />
                <select value={tenureType} onChange={e=>setTenureType(e.target.value)} style={{ width:100, padding:'10px 8px', border:'1.5px solid #e5e7eb', borderRadius:8 }}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
            <button className="tw-calc-btn" onClick={calculate}>🏦 EMI Calculate Karo</button>
          </div>
        </div>
        {result && (<>
          <div className="tw-result">
            <div className="tw-result-label">Monthly EMI</div>
            <div className="tw-result-val">{fmt(result.emi)}</div>
            <div className="tw-result-sub">per month × {result.months} months</div>
          </div>
          <div className="tp-card">
            <div className="tp-sec-title">📋 Loan Summary</div>
            <div className="tw-breakdown">
              <div className="tw-brow"><span className="tw-brow-label">Loan Amount</span><span className="tw-brow-val">{fmt(result.principal)}</span></div>
              <div className="tw-brow"><span className="tw-brow-label">Total Interest</span><span className="tw-brow-val" style={{color:'#dc2626'}}>{fmt(result.interest)}</span></div>
              <div className="tw-brow total"><span className="tw-brow-label">Total Payment</span><span className="tw-brow-val">{fmt(result.total)}</span></div>
            </div>
            {/* Copy + Share Buttons */}
            <div style={{ display:'flex', gap:8, marginTop:14, marginBottom:4 }}>
              <button onClick={() => {
                const t = `EMI Calculation\nLoan: ${fmt(result.principal)}\nRate: ${result.ratePA}% p.a.\nTenure: ${result.months} months\nMonthly EMI: ${fmt(result.emi)}\nTotal Interest: ${fmt(result.interest)}\nTotal Payment: ${fmt(result.total)}\n\nSource: almenso.com/tools/emi-calculator`
                navigator.clipboard?.writeText(t).then(()=>alert('✅ Result copy ho gaya!'))
              }} style={{ flex:1, padding:'10px 6px', background:'#f0fdf4', border:'1.5px solid #16a34a', borderRadius:9, color:'#15803d', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', fontFamily:'var(--font)' }}>
                📋 Copy Result
              </button>
              <button onClick={() => {
                const t = `EMI Calculation\nLoan: ${fmt(result.principal)}\nMonthly EMI: ${fmt(result.emi)}\nTotal Interest: ${fmt(result.interest)}\nTotal Payment: ${fmt(result.total)}\n\nFree calculate: almenso.com/tools/emi-calculator`
                window.open('https://wa.me/?text='+encodeURIComponent(t), '_blank')
              }} style={{ flex:1, padding:'10px 6px', background:'#e7fdf0', border:'1.5px solid #25d366', borderRadius:9, color:'#166534', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', fontFamily:'var(--font)' }}>
                💬 WhatsApp Share
              </button>
            </div>
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:'0.72rem', color:'#888', marginBottom:6 }}>Principal vs Interest</div>
              <div style={{ height:12, borderRadius:99, background:'#e5e7eb', overflow:'hidden', display:'flex' }}>
                <div style={{ width:pct(result.principal,result.total), background:'#16a34a', borderRadius:'99px 0 0 99px' }} />
                <div style={{ flex:1, background:'#ef4444', borderRadius:'0 99px 99px 0' }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.68rem', marginTop:4, color:'#888' }}>
                <span>🟢 Principal {pct(result.principal,result.total)}</span>
                <span>🔴 Interest {pct(result.interest,result.total)}</span>
              </div>
            </div>
          </div>
          {result.yearBreakdown.length > 0 && (
            <div className="tp-card">
              <div className="tp-sec-title">📅 Year-wise Breakdown</div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.75rem' }}>
                  <thead><tr style={{ background:'#f8fafc' }}>
                    {['Saal','Principal','Interest','Balance'].map(h => (
                      <th key={h} style={{ padding:'8px 6px', textAlign:'right', fontWeight:800, color:'#374151', borderBottom:'2px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {result.yearBreakdown.map(r => (
                      <tr key={r.year} style={{ borderBottom:'1px solid #f0f0f0' }}>
                        <td style={{ padding:'7px 6px', textAlign:'right', fontWeight:700 }}>{r.year}</td>
                        <td style={{ padding:'7px 6px', textAlign:'right', color:'#16a34a' }}>{fmt(r.principal)}</td>
                        <td style={{ padding:'7px 6px', textAlign:'right', color:'#dc2626' }}>{fmt(r.interest)}</td>
                        <td style={{ padding:'7px 6px', textAlign:'right', fontWeight:700 }}>{fmt(r.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>)}
      </>}

      {tab === 'prepay' && <>
        <div className="tp-card">
          <div className="tp-sec-title">💡 Prepayment Se Kitna Bachega?</div>
          <p style={{ fontSize:'0.78rem', color:'#888', marginBottom:14 }}>Ek baar extra payment karne se total interest aur loan tenure kitna kam hoga.</p>
          <div className="tw-input-group">
            <div className="tw-field"><label>💰 Loan Amount (₹)</label>
              <input type="number" value={ppPrincipal} placeholder="e.g. 3000000" onChange={e=>{setPPPrincipal(e.target.value);setPPResult(null)}} /></div>
            <div className="tw-field"><label>📊 Annual Rate (%)</label>
              <input type="number" step="0.1" value={ppRate} placeholder="e.g. 8.5" onChange={e=>{setPPRate(e.target.value);setPPResult(null)}} /></div>
            <div className="tw-field"><label>📅 Tenure (Years)</label>
              <input type="number" value={ppTenure} placeholder="e.g. 20" onChange={e=>{setPPTenure(e.target.value);setPPResult(null)}} /></div>
            <div className="tw-field"><label>💸 Prepayment Amount (₹)</label>
              <input type="number" value={ppExtra} placeholder="e.g. 100000" onChange={e=>{setPPExtra(e.target.value);setPPResult(null)}} /></div>
            <div className="tw-field"><label>📅 Konse Mahine Mein? (e.g. 24 = 2 saal baad)</label>
              <input type="number" value={ppMonth} placeholder="e.g. 24" onChange={e=>{setPPMonth(e.target.value);setPPResult(null)}} /></div>
            <button className="tw-calc-btn" onClick={calcPrepay}>💡 Savings Calculate Karo</button>
          </div>
        </div>
        {ppResult && (
          <div className="tp-card">
            <div className="tp-sec-title">📊 Prepayment Result</div>
            <div className="tw-breakdown">
              <div className="tw-brow"><span className="tw-brow-label">Monthly EMI</span><span className="tw-brow-val">{fmt(ppResult.emi)}</span></div>
              <div className="tw-brow"><span className="tw-brow-label">Without Prepayment (Total)</span><span className="tw-brow-val" style={{color:'#dc2626'}}>{fmt(ppResult.totalNormal)}</span></div>
              <div className="tw-brow"><span className="tw-brow-label">With Prepayment (Total)</span><span className="tw-brow-val" style={{color:'#16a34a'}}>{fmt(ppResult.totalPaidWith)}</span></div>
              <div className="tw-brow" style={{background:'#f0fdf4',borderLeft:'3px solid #16a34a'}}>
                <span className="tw-brow-label">💰 Total Interest Savings</span>
                <span className="tw-brow-val" style={{color:'#16a34a',fontWeight:900}}>{fmt(ppResult.saved)}</span>
              </div>
              <div className="tw-brow" style={{background:'#eff6ff',borderLeft:'3px solid #3b82f6'}}>
                <span className="tw-brow-label">⏱️ Loan Jaldi Khatam Hua</span>
                <span className="tw-brow-val" style={{color:'#1d4ed8',fontWeight:900}}>{ppResult.monthsSaved} months pehle</span>
              </div>
            </div>
          </div>
        )}
      </>}

      {tab === 'compare' && <>
        <div className="tp-card">
          <div className="tp-sec-title">⚖️ Do Loans Compare Karo</div>
          <p style={{ fontSize:'0.78rem', color:'#888', marginBottom:14 }}>Do alag banks ya offers ka comparison — konsa deal sach mein better hai.</p>
          {[{label:'Loan A 🔵', state:c1, setState:setC1}, {label:'Loan B 🟢', state:c2, setState:setC2}].map(({label,state,setState}) => (
            <div key={label} style={{ background:'#f8fafc', border:'1.5px solid #e5e7eb', borderRadius:10, padding:'12px', marginBottom:10 }}>
              <div style={{ fontWeight:900, fontSize:'0.82rem', color:'#374151', marginBottom:10 }}>{label}</div>
              <div className="tw-input-group" style={{ gap:8 }}>
                <div className="tw-field"><label>Amount (₹)</label>
                  <input type="number" value={state.principal} placeholder="e.g. 5000000" onChange={e=>{setState(s=>({...s,principal:e.target.value}));setCmpRes(null)}} /></div>
                <div className="tw-field"><label>Rate (%)</label>
                  <input type="number" step="0.1" value={state.rate} placeholder="e.g. 8.5" onChange={e=>{setState(s=>({...s,rate:e.target.value}));setCmpRes(null)}} /></div>
                <div className="tw-field"><label>Tenure</label>
                  <div style={{ display:'flex', gap:6 }}>
                    <input type="number" value={state.tenure} placeholder="20" style={{ flex:1 }} onChange={e=>{setState(s=>({...s,tenure:e.target.value}));setCmpRes(null)}} />
                    <select value={state.type} onChange={e=>{setState(s=>({...s,type:e.target.value}));setCmpRes(null)}} style={{ width:88, padding:'10px 6px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.78rem' }}>
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="tw-calc-btn" onClick={calcCompare}>⚖️ Compare Karo</button>
        </div>
        {cmpRes && (
          <div className="tp-card">
            <div className="tp-sec-title">📊 Comparison</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
              {cmpRes.map((r,i) => (
                <div key={i} style={{ background: i===0?'#eff6ff':'#f0fdf4', border:`2px solid ${i===0?'#3b82f6':'#16a34a'}`, borderRadius:10, padding:12 }}>
                  <div style={{ fontWeight:900, fontSize:'0.8rem', color: i===0?'#1d4ed8':'#15803d', marginBottom:8 }}>Loan {i===0?'A':'B'}</div>
                  <div style={{ fontSize:'0.78rem', marginBottom:4 }}><b>EMI:</b> {fmt(r.emi)}</div>
                  <div style={{ fontSize:'0.78rem', marginBottom:4 }}><b>Interest:</b> {fmt(r.interest)}</div>
                  <div style={{ fontSize:'0.78rem' }}><b>Total:</b> {fmt(r.total)}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fef9c3', border:'1.5px solid #fbbf24', borderRadius:8, padding:'10px 12px', fontSize:'0.8rem', fontWeight:700 }}>
              {cmpRes[0].total < cmpRes[1].total
                ? `✅ Loan A better hai — ${fmt(cmpRes[1].total - cmpRes[0].total)} kam dena padega.`
                : cmpRes[1].total < cmpRes[0].total
                ? `✅ Loan B better hai — ${fmt(cmpRes[0].total - cmpRes[1].total)} kam dena padega.`
                : '🤝 Dono loans same cost pe hain.'}
            </div>
          </div>
        )}
      </>}

      <div className="tp-card">
        <div className="tp-sec-title">🏦 EMI Calculator - Complete Loan Planning Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <h1>EMI Calculator: Your Complete Guide to Loan Planning and Financial Freedom</h1>

          <p>
            In today's world, taking loans for major purchases like homes, cars, or education has become a necessity. However, understanding how Equated Monthly Installments (EMIs) work and planning your finances accordingly is crucial for maintaining financial health. Our comprehensive EMI Calculator not only helps you calculate EMIs but also provides insights into loan prepayments, comparisons, and long-term financial planning.
          </p>

          <h2>Understanding EMI: The Basics</h2>

          <p>
            EMI stands for Equated Monthly Installment. It's a fixed amount you pay every month to repay your loan, which includes both principal and interest components. Understanding EMI calculation is essential for making informed borrowing decisions.
          </p>

          <h3>How EMI is Calculated</h3>
          <p>
            EMI calculation uses a standard mathematical formula that considers:
          </p>
          <ul>
            <li><strong>Principal Amount (P):</strong> The loan amount you borrow</li>
            <li><strong>Rate of Interest (R):</strong> Annual interest rate</li>
            <li><strong>Loan Tenure (N):</strong> Number of months for repayment</li>
          </ul>

          <p>The formula is: EMI = P × R × (1+R)^N / ((1+R)^N - 1)</p>

          <h2>Types of Loans and Their EMI Structures</h2>

          <h3>Home Loans</h3>
          <p>
            Home loans are long-term loans typically ranging from 5 to 30 years. They usually have lower interest rates but longer tenures, resulting in higher total interest payments.
          </p>
          <ul>
            <li><strong>Loan Amount:</strong> ₹10 lakhs to ₹5 crores</li>
            <li><strong>Interest Rate:</strong> 6.5% to 9%</li>
            <li><strong>Tenure:</strong> 5 to 30 years</li>
            <li><strong>EMI Range:</strong> ₹6,000 to ₹50,000 per month</li>
          </ul>

          <h3>Car Loans</h3>
          <p>
            Car loans are shorter-term loans with higher interest rates. They're typically for 1 to 7 years and help finance vehicle purchases.
          </p>
          <ul>
            <li><strong>Loan Amount:</strong> ₹1 lakh to ₹50 lakhs</li>
            <li><strong>Interest Rate:</strong> 7% to 12%</li>
            <li><strong>Tenure:</strong> 1 to 7 years</li>
            <li><strong>EMI Range:</strong> ₹2,000 to ₹15,000 per month</li>
          </ul>

          <h3>Personal Loans</h3>
          <p>
            Personal loans are unsecured loans for various purposes. They have higher interest rates but flexible usage.
          </p>
          <ul>
            <li><strong>Loan Amount:</strong> ₹50,000 to ₹25 lakhs</li>
            <li><strong>Interest Rate:</strong> 10% to 20%</li>
            <li><strong>Tenure:</strong> 1 to 5 years</li>
            <li><strong>EMI Range:</strong> ₹1,500 to ₹8,000 per month</li>
          </ul>

          <h2>Interest Rate Types: Fixed vs Floating</h2>

          <h3>Fixed Interest Rates</h3>
          <p>
            Fixed rates remain constant throughout the loan tenure. You know exactly what your EMI will be each month, making budgeting easier.
          </p>
          <ul>
            <li><strong>Advantages:</strong> Predictable EMIs, protection against rate hikes</li>
            <li><strong>Disadvantages:</strong> Usually higher than floating rates initially</li>
            <li><strong>Best for:</strong> Risk-averse borrowers, short-term loans</li>
          </ul>

          <h3>Floating Interest Rates</h3>
          <p>
            Floating rates change with market conditions, typically linked to MCLR (Marginal Cost of Funds based Lending Rate) or repo rate.
          </p>
          <ul>
            <li><strong>Advantages:</strong> Lower initial rates, benefit from rate cuts</li>
            <li><strong>Disadvantages:</strong> EMI changes with market rates</li>
            <li><strong>Best for:</strong> Long-term loans, borrowers who can handle rate volatility</li>
          </ul>

          <h2>Prepayment and Foreclosure: Saving on Interest</h2>

          <h3>Understanding Prepayment</h3>
          <p>
            Prepayment allows you to pay extra amounts towards your loan principal, reducing the outstanding balance and future interest payments.
          </p>

          <h4>Prepayment Benefits</h4>
          <ul>
            <li><strong>Interest Savings:</strong> Reduce total interest paid</li>
            <li><strong>Loan Tenure Reduction:</strong> Pay off loan faster</li>
            <li><strong>Financial Freedom:</strong> Become debt-free sooner</li>
          </ul>

          <h4>Prepayment Strategies</h4>
          <ul>
            <li><strong>Early Tenure Prepayments:</strong> Maximum interest savings in initial years</li>
            <li><strong>Bonus Payments:</strong> Use annual bonuses or tax refunds</li>
            <li><strong>Regular Extra Payments:</strong> Small additional amounts monthly</li>
          </ul>

          <h3>Prepayment Charges</h3>
          <p>
            Some loans have prepayment penalties. Check your loan agreement for:
          </p>
          <ul>
            <li><strong>Fixed Rate Loans:</strong> Usually 2-3% prepayment charge</li>
            <li><strong>Floating Rate Loans:</strong> Often no prepayment charges</li>
            <li><strong>Government Schemes:</strong> No prepayment charges</li>
          </ul>

          <h2>Loan Comparison: Making Informed Decisions</h2>

          <h3>Key Factors to Compare</h3>
          <ul>
            <li><strong>Interest Rates:</strong> Annual and effective rates</li>
            <li><strong>Processing Fees:</strong> One-time charges</li>
            <li><strong>EMI Amounts:</strong> Monthly payment requirements</li>
            <li><strong>Total Cost:</strong> Principal + Interest + Fees</li>
            <li><strong>Tenure Options:</strong> Flexibility in loan duration</li>
            <li><strong>Prepayment Terms:</strong> Charges and conditions</li>
          </ul>

          <h3>Hidden Costs to Consider</h3>
          <ul>
            <li><strong>Processing Fees:</strong> 0.5% to 2% of loan amount</li>
            <li><strong>Documentation Charges:</strong> ₹500 to ₹5,000</li>
            <li><strong>Technical Fees:</strong> For home loans</li>
            <li><strong>Insurance Premiums:</strong> Life and property insurance</li>
            <li><strong>Stamp Duty:</strong> For property purchases</li>
          </ul>

          <h2>Financial Planning with EMI Calculator</h2>

          <h3>EMI to Income Ratio</h3>
          <p>
            Financial experts recommend that your total EMIs should not exceed 50-60% of your monthly income. This ensures you have enough funds for other expenses and savings.
          </p>

          <h4>Calculating Safe EMI Limits</h4>
          <ul>
            <li><strong>Monthly Income:</strong> Your take-home salary</li>
            <li><strong>Existing EMIs:</strong> Current loan obligations</li>
            <li><strong>Essential Expenses:</strong> Food, utilities, transportation</li>
            <li><strong>Savings Goal:</strong> Emergency fund and investments</li>
            <li><strong>Safe EMI:</strong> 30-40% of disposable income</li>
          </ul>

          <h3>Loan Eligibility Assessment</h3>
          <p>
            Before applying for a loan, assess your eligibility based on:
          </p>
          <ul>
            <li><strong>Credit Score:</strong> 750+ for better rates</li>
            <li><strong>Income Stability:</strong> Consistent salary record</li>
            <li><strong>Debt-to-Income Ratio:</strong> Below 40%</li>
            <li><strong>Employment Type:</strong> Salaried vs self-employed</li>
          </ul>

          <h2>Tax Benefits on Home Loans</h2>

          <h3>Section 24(b): Interest Deduction</h3>
          <p>
            Under the Income Tax Act, you can claim deduction on home loan interest up to ₹2 lakhs per year for self-occupied properties.
          </p>

          <h3>Section 80C: Principal Deduction</h3>
          <p>
            Principal repayment qualifies for deduction under Section 80C up to ₹1.5 lakhs per year, along with other eligible investments.
          </p>

          <h3>Tax Saving Strategies</h3>
          <ul>
            <li><strong>Maximize Deductions:</strong> Plan repayments to optimize tax benefits</li>
            <li><strong>Documentation:</strong> Keep all receipts and statements</li>
            <li><strong>Tax Planning:</strong> Coordinate with tax advisor</li>
          </ul>

          <h2>Common EMI Myths and Facts</h2>

          <h3>Myth 1: Longer Tenure Means Lower EMIs</h3>
          <p>
            <strong>Fact:</strong> While monthly EMIs decrease with longer tenure, total interest paid increases significantly. Shorter tenure saves money in the long run.
          </p>

          <h3>Myth 2: Prepayment Always Saves Money</h3>
          <p>
            <strong>Fact:</strong> Prepayment saves interest but consider opportunity cost. Invest prepayment amount if returns are higher than interest rate.
          </p>

          <h3>Myth 3: All Banks Offer Same Rates</h3>
          <p>
            <strong>Fact:</strong> Interest rates vary by 1-2% between lenders. Compare multiple offers and negotiate for better rates.
          </p>

          <h2>Digital Tools for EMI Management</h2>

          <h3>Mobile Apps for EMI Tracking</h3>
          <ul>
            <li><strong>Bank Apps:</strong> Official banking applications</li>
            <li><strong>Fintech Apps:</strong> Personal finance management tools</li>
            <li><strong>Calendar Apps:</strong> EMI due date reminders</li>
            <li><strong>Auto-pay Setup:</strong> Automatic EMI payments</li>
          </ul>

          <h3>Online EMI Calculators</h3>
          <p>
            Advanced calculators offer:
          </p>
          <ul>
            <li><strong>Year-wise Breakdown:</strong> Principal vs interest split</li>
            <li><strong>Prepayment Calculator:</strong> Savings estimation</li>
            <li><strong>Loan Comparison:</strong> Side-by-side analysis</li>
            <li><strong>Amortization Schedule:</strong> Complete payment plan</li>
          </ul>

          <h2>Future Trends in Loan Technology</h2>

          <h3>AI-Powered Lending</h3>
          <ul>
            <li><strong>Instant Approval:</strong> AI-based credit assessment</li>
            <li><strong>Dynamic Pricing:</strong> Personalized interest rates</li>
            <li><strong>Risk Assessment:</strong> Advanced default prediction</li>
          </ul>

          <h3>Blockchain in Lending</h3>
          <ul>
            <li><strong>Smart Contracts:</strong> Automated loan agreements</li>
            <li><strong>Transparent Records:</strong> Immutable transaction history</li>
            <li><strong>Peer-to-Peer Lending:</strong> Direct borrower-lender connection</li>
          </ul>

          <h3>Fintech Innovations</h3>
          <ul>
            <li><strong>Buy Now Pay Later:</strong> Flexible EMI options</li>
            <li><strong>Digital-only Banks:</strong> Lower operational costs</li>
            <li><strong>Open Banking:</strong> Data sharing for better rates</li>
          </ul>

          <h2>Conclusion: Smart Borrowing for Financial Success</h2>

          <p>
            EMI calculation is more than just mathematics—it's about making informed financial decisions that impact your future. Our comprehensive EMI Calculator helps you understand not just the monthly payments, but the complete financial picture including prepayment benefits, loan comparisons, and long-term savings.
          </p>

          <p>
            Remember, taking a loan is a significant financial commitment. Always borrow within your means, compare multiple options, and plan for prepayments. Use our calculator regularly to track your loan progress and make strategic decisions about your financial future.
          </p>

          <p>
            Whether you're planning to buy your dream home, finance your education, or purchase a vehicle, understanding EMIs empowers you to make better borrowing decisions. Start calculating today and take control of your financial journey.
          </p>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
            <h4>Related Tools:</h4>
            <ul>
              <li><a href="#loan-interest-calculator">Loan Interest Calculator</a> - Calculate simple and compound interest</li>
              <li><a href="#gst-calculator">GST Calculator</a> - Calculate GST amounts and invoices</li>
              <li><a href="#percentage-calculator">Percentage Calculator</a> - Calculate percentages and ratios</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolWrapper>
  )
}

import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const RELATED_TOOLS = [
  { path:'/tools/emi-calculator',        emoji:'🏦', name:'EMI Calculator' },
  { path:'/tools/percentage-calculator', emoji:'📊', name:'Percentage Calculator' },
  { path:'/tools/gst-calculator',        emoji:'🧾', name:'GST Calculator' },
]

function getZodiac(month, day) {
  if ((month===3&&day>=21)||(month===4&&day<=19)) return { sign:'♈ Aries (Mesh)', dates:'21 Mar – 19 Apr' }
  if ((month===4&&day>=20)||(month===5&&day<=20)) return { sign:'♉ Taurus (Vrishabh)', dates:'20 Apr – 20 May' }
  if ((month===5&&day>=21)||(month===6&&day<=20)) return { sign:'♊ Gemini (Mithun)', dates:'21 May – 20 Jun' }
  if ((month===6&&day>=21)||(month===7&&day<=22)) return { sign:'♋ Cancer (Kark)', dates:'21 Jun – 22 Jul' }
  if ((month===7&&day>=23)||(month===8&&day<=22)) return { sign:'♌ Leo (Singh)', dates:'23 Jul – 22 Aug' }
  if ((month===8&&day>=23)||(month===9&&day<=22)) return { sign:'♍ Virgo (Kanya)', dates:'23 Aug – 22 Sep' }
  if ((month===9&&day>=23)||(month===10&&day<=22)) return { sign:'♎ Libra (Tula)', dates:'23 Sep – 22 Oct' }
  if ((month===10&&day>=23)||(month===11&&day<=21)) return { sign:'♏ Scorpio (Vrishchik)', dates:'23 Oct – 21 Nov' }
  if ((month===11&&day>=22)||(month===12&&day<=21)) return { sign:'♐ Sagittarius (Dhanu)', dates:'22 Nov – 21 Dec' }
  if ((month===12&&day>=22)||(month===1&&day<=19)) return { sign:'♑ Capricorn (Makar)', dates:'22 Dec – 19 Jan' }
  if ((month===1&&day>=20)||(month===2&&day<=18)) return { sign:'♒ Aquarius (Kumbh)', dates:'20 Jan – 18 Feb' }
  return { sign:'♓ Pisces (Meen)', dates:'19 Feb – 20 Mar' }
}

export default function AgeCalculator() {
  const [dob,    setDob]    = useState('')
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0,10))
  const [result, setResult] = useState(null)
  // Retirement tab
  const [retireDob,   setRetireDob]   = useState('')
  const [retireAge,   setRetireAge]   = useState('60')
  const [retireResult,setRetireResult]= useState(null)

  const calculate = () => {
    if (!dob) return
    const birth = new Date(dob)
    const to    = new Date(toDate)
    if (birth > to) { setResult({ error:'Date of birth future mein nahi ho sakti!' }); return }

    let years  = to.getFullYear() - birth.getFullYear()
    let months = to.getMonth()    - birth.getMonth()
    let days   = to.getDate()     - birth.getDate()
    if (days < 0)   { months--; days   += new Date(to.getFullYear(), to.getMonth(), 0).getDate() }
    if (months < 0) { years--;  months += 12 }

    const totalDays   = Math.floor((to - birth) / 86400000)
    const totalMonths = years * 12 + months
    const totalWeeks  = Math.floor(totalDays / 7)
    const totalHours  = totalDays * 24

    const nextBday = new Date(to.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBday <= to) nextBday.setFullYear(to.getFullYear() + 1)
    const daysToNext = Math.floor((nextBday - to) / 86400000)

    const zodiac = getZodiac(birth.getMonth()+1, birth.getDate())

    setResult({ years, months, days, totalDays, totalMonths, totalWeeks, totalHours, daysToNext, zodiac })
  }

  const calcRetire = () => {
    if (!retireDob) return
    const birth = new Date(retireDob)
    const retireAt = parseInt(retireAge)||60
    const retireDate = new Date(birth)
    retireDate.setFullYear(birth.getFullYear() + retireAt)
    const today = new Date()
    const diff = retireDate - today
    if (diff <= 0) { setRetireResult({ done: true }); return }
    const days = Math.floor(diff / 86400000)
    const yrs  = Math.floor(days/365)
    const mths = Math.floor((days % 365) / 30)
    setRetireResult({ retireDate: retireDate.toLocaleDateString('hi-IN', {day:'numeric',month:'long',year:'numeric'}), years:yrs, months:mths, days, done:false })
  }

  const tabSt = (active, color='#7c3aed') => ({
    flex:1, padding:'9px', border:`1.5px solid ${active?color:'#e5e7eb'}`, borderRadius:8, cursor:'pointer',
    fontWeight:800, fontSize:'0.78rem', background:active?color:'#fff', color:active?'#fff':'#555',
  })

  const [tab, setTab] = useState('age')

  return (
    <ToolWrapper
      title="Age Calculator — Apni Exact Umar Nikalo"
      description="Date of birth se exact age — saal, mahine, din, ghante. Zodiac sign, next birthday countdown aur retirement date — sab ek jagah."
      keywords="age calculator, umar calculator, date of birth calculator, zodiac sign calculator, retirement date calculator hindi"
      emoji="🎂"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      toolName="Age Calculator"
      tagline="Umar · Zodiac Sign · Retirement Date — sab ek jagah"
      guideSteps={[
        { heading: 'Date of Birth daalo', text: 'Calendar se apni sahi janm tithi chunen.' },
        { heading: 'Calculate dabao', text: 'Exact age saal, mahine, din, ghante mein milegi.' },
        { heading: 'Zodiac sign dekho', text: 'Apna zodiac sign automatically dikhega.' },
        { heading: 'Retirement tab try karo', text: 'Retirement mein kitne din baaki hain — instantly jaanein.' },
      ]}
      faqs={[
        { q: 'Kya age calculator bilkul sahi hota hai?', a: 'Haan, leap years aur alag mahine ke din — sab consider hote hain.' },
        { q: 'Aadhaar ke liye age kaise check karein?', a: 'Apni DOB daalo aur "Calculate To" mein aaj ki date rakho.' },
        { q: 'School admission ke liye cut-off age?', a: '"Calculate To" mein admission cut-off date daalo — us din ki exact age milegi.' },
        { q: 'Zodiac sign kaise determine hota hai?', a: 'Date of birth ke month aur day se zodiac sign determine hota hai — sun sign kehte hain ise.' },
      ]}
      relatedBlog={{ slug:'how-to-calculate-age-online', title:'Online Age Calculator Kaise Use Karein?', excerpt:'Aadhaar, passport, naukri — sab jagah sahi age kaise dikhayein.' }}
            affCategory="health"
      hasResult={true}
      relatedTools={RELATED_TOOLS}
    >
      <div style={{ display:'flex', gap:6, marginBottom:4 }}>
        <button style={tabSt(tab==='age')} onClick={()=>setTab('age')}>🎂 Age</button>
        <button style={tabSt(tab==='retire')} onClick={()=>setTab('retire')}>👴 Retirement</button>
      </div>

      {tab === 'age' && <>
        <div className="tp-card">
          <div className="tp-sec-title">🎂 Apni Umar Nikalo</div>
          <div className="tw-input-group">
            <div className="tw-field">
              <label>📅 Date of Birth</label>
              <input type="date" value={dob} max={toDate} onChange={e=>{setDob(e.target.value);setResult(null)}} />
            </div>
            <div className="tw-field">
              <label>📅 Is Date Tak Calculate Karo (default: aaj)</label>
              <input type="date" value={toDate} min={dob} onChange={e=>{setToDate(e.target.value);setResult(null)}} />
            </div>
            <button className="tw-calc-btn" onClick={calculate} style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7)' }}>🎂 Age Calculate Karo</button>
          </div>
        </div>

        {result && !result.error && (<>
          <div className="tw-result" style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
            <div className="tw-result-label">Aapki Exact Umar</div>
            <div className="tw-result-val">{result.years} Saal</div>
            <div className="tw-result-sub">{result.months} mahine aur {result.days} din</div>
          </div>
          <div className="tp-card">
            <div className="tp-sec-title">📊 Poori Detail</div>
            <div className="tw-breakdown">
              {[
                { label:'Total Saal',   val: result.years + ' saal' },
                { label:'Total Mahine', val: result.totalMonths.toLocaleString('en-IN') + ' mahine' },
                { label:'Total Hafte',  val: result.totalWeeks.toLocaleString('en-IN') + ' hafte' },
                { label:'Total Din',    val: result.totalDays.toLocaleString('en-IN') + ' din' },
                { label:'Total Ghante', val: result.totalHours.toLocaleString('en-IN') + ' ghante' },
              ].map(r => (
                <div key={r.label} className="tw-brow">
                  <span className="tw-brow-label">{r.label}</span>
                  <span className="tw-brow-val">{r.val}</span>
                </div>
              ))}
              <div className="tw-brow" style={{ background:'#eff6ff', borderLeft:'3px solid #3b82f6' }}>
                <span className="tw-brow-label">🎂 Agle Birthday Mein</span>
                <span className="tw-brow-val" style={{ color:'#1d4ed8' }}>{result.daysToNext} din baki</span>
              </div>
              <div className="tw-brow" style={{ background:'#fdf4ff', borderLeft:'3px solid #a855f7' }}>
                <span className="tw-brow-label">✨ Zodiac Sign</span>
                <span className="tw-brow-val" style={{ color:'#7c3aed', fontWeight:900 }}>{result.zodiac.sign}</span>
              </div>
            </div>
          </div>
        </>)}
        {result?.error && (
          <div style={{ background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:10, padding:'12px 14px', color:'#dc2626', fontSize:'0.85rem' }}>
            ❌ {result.error}
          </div>
        )}
      </>}

      {tab === 'retire' && <>
        <div className="tp-card">
          <div className="tp-sec-title">👴 Retirement Countdown</div>
          <p style={{ fontSize:'0.78rem', color:'#888', marginBottom:14 }}>Apni retirement date aur kitna time bacha hai — instantly jaanein.</p>
          <div className="tw-input-group">
            <div className="tw-field">
              <label>📅 Date of Birth</label>
              <input type="date" value={retireDob} onChange={e=>{setRetireDob(e.target.value);setRetireResult(null)}} />
            </div>
            <div className="tw-field">
              <label>🎯 Retirement Age (years)</label>
              <div style={{ display:'flex', gap:8 }}>
                {['55','58','60','62','65'].map(a => (
                  <button key={a} onClick={()=>{setRetireAge(a);setRetireResult(null)}}
                    style={{ flex:1, padding:'8px 4px', border:`1.5px solid ${retireAge===a?'#7c3aed':'#e5e7eb'}`, borderRadius:8,
                      background:retireAge===a?'#7c3aed':'#fff', color:retireAge===a?'#fff':'#555', fontWeight:800, cursor:'pointer', fontSize:'0.76rem' }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <button className="tw-calc-btn" onClick={calcRetire} style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7)' }}>👴 Calculate Karo</button>
          </div>
        </div>
        {retireResult && (
          retireResult.done
            ? <div style={{ background:'#f0fdf4', border:'1.5px solid #16a34a', borderRadius:10, padding:'16px', textAlign:'center', fontSize:'1.1rem', fontWeight:800, color:'#15803d' }}>
                🎉 Aap pehle se retire ho chuke hain!
              </div>
            : <div className="tp-card">
                <div className="tp-sec-title">📅 Retirement Details</div>
                <div className="tw-breakdown">
                  <div className="tw-brow" style={{background:'#fdf4ff',borderLeft:'3px solid #7c3aed'}}>
                    <span className="tw-brow-label">🗓️ Retirement Date</span>
                    <span className="tw-brow-val" style={{color:'#7c3aed',fontWeight:900}}>{retireResult.retireDate}</span>
                  </div>
                  <div className="tw-brow"><span className="tw-brow-label">Saal Baki</span><span className="tw-brow-val">{retireResult.years} saal</span></div>
                  <div className="tw-brow"><span className="tw-brow-label">Mahine Baki</span><span className="tw-brow-val">{retireResult.months} mahine</span></div>
                  <div className="tw-brow"><span className="tw-brow-label">Total Din</span><span className="tw-brow-val">{retireResult.days.toLocaleString('en-IN')} din</span></div>
                </div>
              </div>
        )}
      </>}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Age Calculation Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Age calculation har jagah zaroori hota hai — school admission se lekar retirement planning tak. Yeh guide aapko sikhaega ki age kaise accurately calculate karein, zodiac signs kaise determine karein, aur kab kya important hota hai.
          </p>

          <h3>1. Age Calculation Basics</h3>
          <p>
            Age calculate karne ke liye sirf birth date aur current date chahiye. Formula simple hai:
          </p>
          <ul>
            <li>Years = Current Year - Birth Year</li>
            <li>Months aur Days ko adjust karna padta hai</li>
            <li>Leap years ko consider karna zaroori hai</li>
          </ul>

          <h3>2. Important Age Milestones</h3>
          <ul>
            <li><strong>School Admission:</strong> 3-6 years ke beech cut-off dates hoti hain</li>
            <li><strong>Aadhaar/PAN Card:</strong> Age proof ke liye exact age chahiye</li>
            <li><strong>Driving License:</strong> 18+ years required</li>
            <li><strong>Voting:</strong> 18+ years</li>
            <li><strong>Marriage:</strong> Different states mein different minimum age</li>
            <li><strong>Retirement:</strong> Government jobs mein 58-60 years</li>
          </ul>

          <h3>3. Zodiac Signs aur Birthstones</h3>
          <p>
            Har zodiac sign ka apna meaning aur birthstone hota hai:
          </p>
          <ul>
            <li><strong>Aries (Mesh):</strong> March 21 - April 19, Bloodstone</li>
            <li><strong>Taurus (Vrishabh):</strong> April 20 - May 20, Sapphire</li>
            <li><strong>Gemini (Mithun):</strong> May 21 - June 20, Agate</li>
            <li><strong>Cancer (Kark):</strong> June 21 - July 22, Emerald</li>
            <li><strong>Leo (Singh):</strong> July 23 - August 22, Onyx</li>
            <li><strong>Virgo (Kanya):</strong> August 23 - September 22, Carnelian</li>
            <li><strong>Libra (Tula):</strong> September 23 - October 22, Chrysolite</li>
            <li><strong>Scorpio (Vrishchik):</strong> October 23 - November 21, Beryl</li>
            <li><strong>Sagittarius (Dhanu):</strong> November 22 - December 21, Topaz</li>
            <li><strong>Capricorn (Makar):</strong> December 22 - January 19, Ruby</li>
            <li><strong>Aquarius (Kumbh):</strong> January 20 - February 18, Amethyst</li>
            <li><strong>Pisces (Meen):</strong> February 19 - March 20, Jasper</li>
          </ul>

          <h3>4. Age in Different Cultures</h3>
          <ul>
            <li><strong>Western:</strong> Birthday pe age badhta hai</li>
            <li><strong>Eastern:</strong> Chinese New Year pe age badhta hai</li>
            <li><strong>Some cultures:</strong> Conception se age count karte hain</li>
            <li><strong>Legal Age:</strong> Country ke laws ke according</li>
          </ul>

          <h3>5. Age-Related Calculations</h3>
          <ul>
            <li><strong>Next Birthday:</strong> Kitne din baaki hain</li>
            <li><strong>Retirement Age:</strong> Kitne saal baaki hain</li>
            <li><strong>Life Expectancy:</strong> Average life span ke according</li>
            <li><strong>Age Groups:</strong> Child, Teen, Adult, Senior</li>
          </ul>

          <h3>6. Common Age Calculation Mistakes</h3>
          <ul>
            <li>Leap years ko ignore karna</li>
            <li>Time zones ko consider nahi karna</li>
            <li>Daylight saving time bhoolna</li>
            <li>International date line cross karte time</li>
          </ul>

          <h3>7. Age in Different Contexts</h3>
          <ul>
            <li><strong>Medical:</strong> Health check-ups ke liye</li>
            <li><strong>Insurance:</strong> Premium calculation ke liye</li>
            <li><strong>Education:</strong> Class admission ke liye</li>
            <li><strong>Employment:</strong> Job eligibility ke liye</li>
            <li><strong>Legal:</strong> Contracts aur agreements ke liye</li>
          </ul>

          <h3>8. Age Calculation Tools</h3>
          <ul>
            <li><strong>Online Calculators:</strong> Instant results</li>
            <li><strong>Mobile Apps:</strong> On-the-go calculation</li>
            <li><strong>Calendar Method:</strong> Manual calculation</li>
            <li><strong>Software:</strong> Excel formulas</li>
          </ul>

          <h3>9. Future of Age Calculation</h3>
          <ul>
            <li><strong>Biometric Age:</strong> Body ki actual age</li>
            <li><strong>Digital Identity:</strong> Blockchain based age proof</li>
            <li><strong>AI Predictions:</strong> Life expectancy calculators</li>
            <li><strong>Global Standards:</strong> Universal age calculation</li>
          </ul>

          <h3>10. Age Wisdom</h3>
          <p>
            Age sirf number nahi hota — woh experience ka symbol hai. Har age ka apna significance aur learning hota hai. Age ko celebrate karo, experience ko value do, aur future ko plan karo. Yeh calculator tool aapki life ke important decisions mein help karega.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'
import { useToolResult } from '../../components/ToolWrapper'

const CONDUCTORS = [
  { label: 'Copper', resistivity: 0.017241 },
  { label: 'Aluminium', resistivity: 0.0282 },
]

const WIRE_SIZES = [
  { mm2: 1.5, amp: 18 },
  { mm2: 2.5, amp: 24 },
  { mm2: 4, amp: 32 },
  { mm2: 6, amp: 40 },
  { mm2: 10, amp: 55 },
  { mm2: 16, amp: 70 },
  { mm2: 25, amp: 90 },
  { mm2: 35, amp: 110 },
  { mm2: 50, amp: 125 },
]

function formatV(n) {
  return n.toFixed(2) + ' V'
}

export default function WireSizeCalculator() {
  const [loadW, setLoadW] = useState('2000')
  const [voltage, setVoltage] = useState('230')
  const [length, setLength] = useState('15')
  const [dropPct, setDropPct] = useState('3')
  const [conductor, setConductor] = useState('Copper')

  const result = useMemo(() => {
    const w = parseFloat(loadW) || 0
    const v = parseFloat(voltage) || 0
    const l = parseFloat(length) || 0
    const allowedDrop = (parseFloat(dropPct) || 0) / 100
    const resistivity = CONDUCTORS.find(c => c.label === conductor)?.resistivity || 0.017241
    const current = v > 0 ? w / v : 0

    const dropVolt = v * allowedDrop
    const reqR = dropVolt / (2 * current * l) // ohm per meter

    // cross section area mm^2 = resistivity / R (for 1m)
    const requiredArea = reqR > 0 ? resistivity / reqR : 0

    // choose nearest standard size
    const recommended = WIRE_SIZES.find(s => s.mm2 >= requiredArea) || WIRE_SIZES[WIRE_SIZES.length - 1]
    const actualDrop = current > 0 ? 2 * current * l * (resistivity / recommended.mm2) : 0
    const actualDropPct = v > 0 ? (actualDrop / v) * 100 : 0

    return {
      current, dropVolt, requiredArea, recommended, actualDrop, actualDropPct,
      maxCurrent: recommended.amp,
    }
  }, [loadW, voltage, length, dropPct, conductor])

  return (
    <ToolWrapper
      title="Wire Size & Voltage Drop Calculator — House Wiring Guide"
      description="Load, distance aur allowable voltage drop daalo — recommended copper/aluminium wire size aur actual drop pata karo. 230V home wiring ke liye best practice.
"      keywords="wire size calculator, voltage drop calculator, house wiring, copper wire gauge, mm2 for load"      emoji="🔌"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #0ea5e9 100%)"
      toolName="Wire Size & Voltage Drop Calculator"
      tagline="Load aur distance ke hisab se correct cable size chunno — thin wire se heating aur voltage drop se bachao."
      guideSteps={[
        { heading: 'Load watt daalo', text: 'Total wattage jo wire se transfer hoga — jaise lights + fans + AC etc.' },
        { heading: 'Length set karo', text: 'Line length (one-way) ya farad par supply cable ki length.' },
        { heading: 'Voltage drop limit', text: 'Generally 3-5% drop acceptable hota hai. Ghar mein 3% recommended.' },
        { heading: 'Result dekho', text: 'Recommended wire size, max current, aur expected voltage drop mil jayega.' },
      ]}
      faqs={[
        { q: 'Voltage drop itna important kyun hai?', a: 'Agar wire chhota ho aur load zyada, toh voltage drop se appliance slow chalega, motor garam hogi, aur efficiency kam hogi. Long runs mein voltage drop 5-8% bhi ho sakta hai — yeh avoid karna chahiye.' },
        { q: 'Copper vs Aluminium', a: 'Copper zyada conductive hota hai (kam resistivity), isliye same current ke liye chhota size chal jata hai. Aluminium cheaper hai lekin size bada chahiye. Is calculator mein dono options available hain.' },
        { q: 'Kya length 1-way lena chahiye?', a: 'Haan. Length aapko source se load tak ka one-way distance lena hai. Voltage drop formula mein round-trip include hota hai (2 × length) happily calculated hota hai.' },
        { q: 'Wire diameter kaise check karun?', a: 'India mein wire size mm² se denote hota hai (1.5mm², 2.5mm², etc.). Apne electrician se confirm karo ke wire standard IS 694/IS 8271 ho.' },
      ]}
      relatedBlog={{ slug: 'understanding-wire-size-for-house-wiring', title: 'Understanding wire size for house wiring', excerpt: 'Kaunsi wire size aapke load ke liye safe hai? Voltage drop aur safety ki guide.' }}
      relatedTools={[
        { path: '/tools/inverter-load-planner', emoji: '🔋', name: 'Inverter Load Planner' },
        { path: '/tools/electricity-bill-analyzer', emoji: '⚡', name: 'Electricity Bill Analyzer' },
      ]}
      affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
    >
      <div className="tp-card">
        <div className="tp-sec-title">📏 Load & Distance Inputs</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>⚡ Load (Watts)</label>
            <input type="number" value={loadW} onChange={e => setLoadW(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>🔌 Supply Voltage</label>
            <input type="number" value={voltage} onChange={e => setVoltage(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>📏 Cable Length (meters)</label>
            <input type="number" value={length} onChange={e => setLength(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>✅ Allowed Voltage Drop (%)</label>
            <input type="number" value={dropPct} onChange={e => setDropPct(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>🧪 Conductor Material</label>
            <select value={conductor} onChange={e => setConductor(e.target.value)}>
              {CONDUCTORS.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="tw-result" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>
        <div className="tw-result-label">Current Draw</div>
        <div className="tw-result-val">{result.current.toFixed(1)} A</div>
        <div className="tw-result-sub">Based on {loadW}W at {voltage}V</div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🧮 Recommended Cable Size</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Required cross-section</span><span className="tw-brow-val">{result.requiredArea.toFixed(2)} mm²</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Recommended standard size</span><span className="tw-brow-val">{result.recommended.mm2} mm²</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Max current capacity</span><span className="tw-brow-val">{result.maxCurrent} A</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Estimated Voltage Drop</span><span className="tw-brow-val">{formatV(result.actualDrop)} ({result.actualDropPct.toFixed(2)}%)</span></div>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📝 Wire Sizing Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Ghar ki wiring design karte waqt sahi wire size select karna sabse important hota hai. Galat wire size se current overheating hoti hai, insulation melt ho sakti hai, aur fire hazard badhta hai. Is guide mein hum wire size kaise decide karein, voltage drop kaise calculate karein, aur kaunse standards follow karein, ye sab explain karenge.
          </p>

          <h3>Wire size kyu important hai?</h3>
          <p>
            Jab current wire se flow karta hai, toh wire ki resistance ki wajah se voltage drop hota hai. Agar wire size chhota ho, toh resistance zyada hota hai, aur voltage drop bhi zyada hota hai. Iska matlab appliances ko kam voltage milti hai aur wo sahi se kaam nahi karti.
          </p>
          <p>
            Dusra issue heat generation hai. Resistance ke saath current ka square jada ho jata hai (I²R). Agar wire chhota ho, wo garam ho sakta hai, insulation melt ho sakta hai, aur fire risk ban sakta hai. Isliye aapko wire ke liye specific amp rating aur standard size choose karna padta hai.
          </p>

          <h3>Voltage drop kya hai aur acceptable limit</h3>
          <p>
            Voltage drop ka formula: <br />
            <strong>Vdrop = 2 × Length × Current × (Resistivity / Cross-sectional area)</strong>
          </p>
          <p>
            Yahan 2 factor isliye hai kyunki electricity round trip nikalti hai (phase + neutral). 
            Typically residential wiring mein 3% se 5% voltage drop acceptable mana jata hai. Agar aap 230V supply le rahe ho, toh 3% drop = 6.9V. Is tool mein aap allowed drop set kar sakte ho, aur tool size suggest karega.
          </p>

          <h3>Copper vs Aluminium conductor</h3>
          <p>
            Copper ka resistivity ~0.017 ohm-mm²/m hai, jabki aluminium ka ~0.028 ohm-mm²/m. Matlab aluminium ka resistance jyada hai, isliye same ampere capacity ke liye aluminium wire ka cross-section larger hota hai. 
          </p>
          <p>
            India mein general practice yeh hai: 
            <ul>
              <li>Lighting circuits - 1.5 mm² copper</li>
              <li>Power circuits - 2.5 mm² copper</li>
              <li>AC/pump - 4 mm² ya 6 mm² copper</li>
            </ul>
            Agar aluminium use kar rahe ho, toh hamesha size ek step ya do bada lena chahiye.
          </p>

          <h3>Cable length kaise measure karein?</h3>
          <p>
            Length ko hum "one-way" distance ke roop mein lete hain — yani distribution board se load tak ki cable length. Example: agar board se kitchen tak 10 meter hai, toh one-way length 10m hai, aur round trip 20m ho jata hai (phase + neutral). Isi tarah calculation hota hai.
          </p>

          <h3>Why standard wire sizes matter?</h3>
          <p>
            Wire factories standard sizes produce karte hain (1.5, 2.5, 4, 6 mm² etc.). Agar required area 3 mm² nikle, toh aap 4 mm² select karte ho (next standard). Standard sizes hoti hai takki market mein available ho aur ratings clear ho.
          </p>

          <h3>Practical example</h3>
          <p>
            Maan lijiye aap 230V pe 3000W load chala rahe ho (approx. 13A). Agar distance 15m hai aur wire copper hai, toh recommended size 4 mm² aayega (current capacity 32A). Voltage drop check karne pe agar 2.5% aata hai, toh safe hai.
          </p>

          <h3>Safety aur regulation</h3>
          <p>
            India mein wiring ke liye IS 732 aur IS 694 standards follow karna chahiye. Licensed electrician se wiring karwayein aur proper earthing lagwayein. Circuit breakers and MCBs ko protective rating assign karna bhi zaroori hai.
          </p>

          <h3>Final tips</h3>
          <ul>
            <li>Cable tray aur conduit mein run karte waqt dhyan de ki wire gaubandh na ho; overheating se avoid karein.</li>
            <li>Extra length thoda chhodke rakhna achha hota hai taaki future changes mein easily extend kar sakein.</li>
            <li>Har circuit ke liye alag breaker use karein — overload se bachne ke liye.</li>
          </ul>

          <p>
            Is calculator se aap ek quick estimate le sakte hain. Final wiring design hamesha licensed electrician se verify karwayein. Safe wiring aapke ghar ko long term mein surakshit rakhegi.
          </p>

          <h3>Advanced considerations</h3>
          <p>
            Agar aap industrial ya commercial wiring plan kar rahe hain, toh ambient temperature correction aur cable grouping ko bhi consider karein. Jab multiple cables ek saath tray mein ho, tab derating factor apply karna padta hai. Residential setup mein 1-2 cables usually safe hote hain, lekin larger installations mein derating zaroori hota hai.
          </p>

          <p>
            Ye tool basic voltage drop aur recommended wire size batata hai. Agar aapko exact design chahiye, toh Electrical engineer se detailed calculation karwayein, jisme cable type, insulation, start/stop points aur future expansion sab consider hota hai.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

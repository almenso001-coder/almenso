import React, { useState, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const APPLIANCES = [
  { name: 'LED Bulb (9W)', power: 9, category: 'Lighting' },
  { name: 'CFL Bulb (15W)', power: 15, category: 'Lighting' },
  { name: 'Incandescent Bulb (60W)', power: 60, category: 'Lighting' },
  { name: 'Tube Light (40W)', power: 40, category: 'Lighting' },
  { name: 'Ceiling Fan (75W)', power: 75, category: 'Fans' },
  { name: 'Table Fan (50W)', power: 50, category: 'Fans' },
  { name: 'Exhaust Fan (100W)', power: 100, category: 'Fans' },
  { name: 'Air Cooler (200W)', power: 200, category: 'Cooling' },
  { name: 'Split AC (1.5 Ton)', power: 1500, category: 'Cooling' },
  { name: 'Window AC (1 Ton)', power: 1000, category: 'Cooling' },
  { name: 'Refrigerator (200L)', power: 150, category: 'Kitchen' },
  { name: 'Washing Machine (6kg)', power: 500, category: 'Kitchen' },
  { name: 'Microwave Oven (1000W)', power: 1000, category: 'Kitchen' },
  { name: 'Electric Kettle (1500W)', power: 1500, category: 'Kitchen' },
  { name: 'Induction Cooktop (2000W)', power: 2000, category: 'Kitchen' },
  { name: 'Water Heater (1500W)', power: 1500, category: 'Kitchen' },
  { name: 'Iron (1000W)', power: 1000, category: 'Kitchen' },
  { name: 'Television (32")', power: 50, category: 'Entertainment' },
  { name: 'Computer/Laptop', power: 300, category: 'Entertainment' },
  { name: 'WiFi Router', power: 10, category: 'Entertainment' },
  { name: 'Mobile Charger', power: 10, category: 'Entertainment' },
  { name: 'Water Pump (1HP)', power: 750, category: 'Utilities' },
  { name: 'Inverter (800VA)', power: 600, category: 'Utilities' },
  { name: 'Custom Appliance', power: 100, category: 'Custom' }
]

export default function AppliancePowerConsumptionCalculator() {
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [customPower, setCustomPower] = useState(100)
  const [customHours, setCustomHours] = useState(1)
  const [electricityRate, setElectricityRate] = useState(8) // ₹ per kWh

  const addAppliance = (appliance) => {
    const newAppliance = {
      ...appliance,
      id: Date.now() + Math.random(),
      hoursPerDay: appliance.category === 'Custom' ? customHours : 1,
      quantity: 1
    }
    setSelectedAppliances([...selectedAppliances, newAppliance])
  }

  const updateAppliance = (id, field, value) => {
    setSelectedAppliances(selectedAppliances.map(app =>
      app.id === id ? { ...app, [field]: parseFloat(value) || 0 } : app
    ))
  }

  const removeAppliance = (id) => {
    setSelectedAppliances(selectedAppliances.filter(app => app.id !== id))
  }

  const calculations = useMemo(() => {
    const totalPower = selectedAppliances.reduce((sum, app) => sum + (app.power * app.quantity), 0)
    const totalDailyConsumption = selectedAppliances.reduce((sum, app) =>
      sum + (app.power * app.quantity * app.hoursPerDay / 1000), 0
    )
    const totalMonthlyConsumption = totalDailyConsumption * 30
    const totalYearlyConsumption = totalDailyConsumption * 365
    const dailyCost = totalDailyConsumption * electricityRate
    const monthlyCost = totalMonthlyConsumption * electricityRate
    const yearlyCost = totalYearlyConsumption * electricityRate

    return {
      totalPower,
      totalDailyConsumption,
      totalMonthlyConsumption,
      totalYearlyConsumption,
      dailyCost,
      monthlyCost,
      yearlyCost
    }
  }, [selectedAppliances, electricityRate])

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
    return num.toFixed(2)
  }

  const getAppliancesByCategory = (category) => {
    return APPLIANCES.filter(app => app.category === category)
  }

  const categories = [...new Set(APPLIANCES.map(app => app.category))]

  return (
    <ToolWrapper
      title="Appliance Power Consumption Calculator — Electricity Bill Calculator"
      description="Home appliances ka power consumption aur electricity bill calculate karo."
      keywords="power consumption calculator, electricity bill calculator, appliance power usage, energy calculator"
      emoji="⚡"
      heroColor="linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)"
      toolName="Appliance Power Calculator"
      tagline="Power Usage · Electricity Cost · Monthly Bill Estimate"
      guideSteps={[
        { heading: 'Appliances add karo', text: 'Ghar ke appliances select karo aur quantity daalo.' },
        { heading: 'Usage hours set karo', text: 'Har appliance ka daily usage time enter karo.' },
        { heading: 'Electricity rate daalo', text: 'Aapke area ka per unit rate enter karo.' },
        { heading: 'Results dekho', text: 'Daily, monthly aur yearly consumption aur bill.' },
      ]}
      faqs={[
        { q: 'Power rating kahan se dekhu?', a: 'Appliance ke sticker pe ya manual mein likha hota hai.' },
        { q: 'AC ka power consumption?', a: '1 ton AC ~1000W, 1.5 ton ~1500W, par actual usage kam hota hai.' },
        { q: 'Refrigerator 24 hours chalta hai?', a: 'Haan, par compressor cycle mein hota hai, average 150-200W.' },
        { q: 'Solar panel ke liye?', a: 'Daily consumption se battery aur panel size calculate kar sakte hain.' },
      ]}
      relatedBlog={{ slug: 'electricity-saving-tips', title: 'Electricity Saving Tips', excerpt: 'Bijli bill kam karne ke practical tips.' }}
      relatedTools={[
        { path: '/tools/electricity-cost-calculator', emoji: '💡', name: 'Electricity Cost Calculator' },
        { path: '/tools/solar-roi', emoji: '☀️', name: 'Solar ROI Calculator' }
      ]}
      affCategory="electrical"
      hasResult={true}
      serviceCategory="electrician"
      toolPath="/tools/appliance-power-calculator"
    >
      <div className="tp-card">
        <div className="tp-sec-title">⚡ Appliance Power Calculator</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>💰 Electricity Rate (₹ per kWh)</label>
            <input
              type="number"
              value={electricityRate}
              onChange={e => setElectricityRate(parseFloat(e.target.value) || 0)}
              placeholder="8"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🏠 Add Appliances</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {categories.map(category => (
            <div key={category} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 12, color: '#374151' }}>{category}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {getAppliancesByCategory(category).map(appliance => (
                  <button
                    key={appliance.name}
                    onClick={() => addAppliance(appliance)}
                    style={{
                      padding: '8px 12px',
                      background: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'left'
                    }}
                  >
                    {appliance.name} ({appliance.power}W)
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAppliances.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">📋 Selected Appliances</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selectedAppliances.map(appliance => (
              <div key={appliance.id} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: 12,
                alignItems: 'center',
                padding: 12,
                background: '#f9fafb',
                borderRadius: 8,
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontWeight: 500 }}>{appliance.name}</div>
                <div>
                  <input
                    type="number"
                    value={appliance.quantity}
                    onChange={e => updateAppliance(appliance.id, 'quantity', e.target.value)}
                    placeholder="Qty"
                    min="1"
                    style={{ width: '60px', padding: '4px 8px', borderRadius: 4, border: '1px solid #d1d5db' }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={appliance.hoursPerDay}
                    onChange={e => updateAppliance(appliance.id, 'hoursPerDay', e.target.value)}
                    placeholder="Hours"
                    min="0"
                    max="24"
                    step="0.5"
                    style={{ width: '60px', padding: '4px 8px', borderRadius: 4, border: '1px solid #d1d5db' }}
                  />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  {(appliance.power * appliance.quantity * appliance.hoursPerDay / 1000).toFixed(2)} kWh/day
                </div>
                <button
                  onClick={() => removeAppliance(appliance.id)}
                  style={{
                    padding: '4px 8px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedAppliances.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">📊 Power Consumption Results</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginTop: 16
          }}>
            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>
                {formatNumber(calculations.totalPower)}W
              </div>
              <div style={{ fontSize: '0.9rem', color: '#78350f' }}>Total Power Rating</div>
            </div>

            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                {formatNumber(calculations.totalDailyConsumption)} kWh
              </div>
              <div style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>Daily Consumption</div>
            </div>

            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>
                ₹{formatNumber(calculations.dailyCost)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#14532d' }}>Daily Cost</div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginTop: 16
          }}>
            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#991b1b' }}>
                {formatNumber(calculations.totalMonthlyConsumption)} kWh
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7f1d1d' }}>Monthly Consumption</div>
            </div>

            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3730a3' }}>
                ₹{formatNumber(calculations.monthlyCost)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#312e81' }}>Monthly Bill</div>
            </div>

            <div style={{
              padding: 16,
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#be185d' }}>
                ₹{formatNumber(calculations.yearlyCost)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#9d174d' }}>Yearly Cost</div>
            </div>
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">💡 Electricity Saving Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Electricity bill kam karna har ghar ka target hota hai. Sahi appliances choose karna aur unka proper use karna se significant savings ho sakti hai. Yeh guide aapko electricity consumption ko control karne ke practical tips deta hai.
          </p>

          <h3>1. Understanding Power Ratings</h3>
          <ul>
            <li><strong>Watt (W):</strong> Power consumption rate</li>
            <li><strong>Kilowatt (kW):</strong> 1 kW = 1000 W</li>
            <li><strong>Kilowatt Hour (kWh):</strong> Energy consumed in one hour</li>
            <li><strong>Power Factor:</strong> Actual power vs apparent power</li>
          </ul>

          <h3>2. Lighting Efficiency</h3>
          <ul>
            <li><strong>LED Bulbs:</strong> 9W LED = 60W incandescent brightness, 85% less power</li>
            <li><strong>CFL Bulbs:</strong> 15W CFL = 60W incandescent, 75% savings</li>
            <li><strong>Smart Lighting:</strong> Motion sensors aur timers se extra savings</li>
            <li><strong>Natural Light:</strong> Daylight ka maximum use karo</li>
          </ul>

          <h3>3. Fan & Cooling Appliances</h3>
          <ul>
            <li><strong>Ceiling Fans:</strong> 75W, efficient cooling solution</li>
            <li><strong>Air Coolers:</strong> AC se kam power, humid areas mein best</li>
            <li><strong>AC Temperature:</strong> 24°C pe set karo, har degree se 5-10% savings</li>
            <li><strong>AC Maintenance:</strong> Clean filters se efficiency badhti hai</li>
          </ul>

          <h3>4. Kitchen Appliances</h3>
          <ul>
            <li><strong>Refrigerator:</strong> 150-200W, door less open karo</li>
            <li><strong>Microwave:</strong> 1000W, induction se fast aur efficient</li>
            <li><strong>Electric Kettle:</strong> Only required water heat karo</li>
            <li><strong>Induction Cooktop:</strong> Gas se efficient, instant heat control</li>
          </ul>

          <h3>5. Entertainment Devices</h3>
          <ul>
            <li><strong>LED TVs:</strong> 50W for 32", energy star rating dekho</li>
            <li><strong>Computers:</strong> 300W, sleep mode use karo</li>
            <li><strong>Chargers:</strong> Unplug when not in use, vampire power avoid karo</li>
            <li><strong>WiFi Router:</strong> 10W, energy efficient models choose karo</li>
          </ul>

          <h3>6. Water Heating</h3>
          <ul>
            <li><strong>Solar Water Heater:</strong> Free energy after installation</li>
            <li><strong>Instant Geyser:</strong> Only when needed use karo</li>
            <li><strong>Timer Settings:</strong> Peak hours avoid karo</li>
            <li><strong>Insulation:</strong> Hot water pipes insulate karo</li>
          </ul>

          <h3>7. Power Factor Improvement</h3>
          <ul>
            <li><strong>Capacitor Banks:</strong> Reactive power compensate karte hain</li>
            <li><strong>Efficient Motors:</strong> High power factor appliances</li>
            <li><strong>Power Quality:</strong> Voltage fluctuations avoid karo</li>
            <li><strong>Harmonic Filters:</strong> Electronic equipment ke liye</li>
          </ul>

          <h3>8. Smart Home Solutions</h3>
          <ul>
            <li><strong>Smart Plugs:</strong> Remote control aur scheduling</li>
            <li><strong>Energy Monitors:</strong> Real-time consumption tracking</li>
            <li><strong>Smart Thermostats:</strong> AC temperature optimization</li>
            <li><strong>Home Automation:</strong> Lights aur fans ka automated control</li>
          </ul>

          <h3>9. Seasonal Considerations</h3>
          <ul>
            <li><strong>Summer:</strong> AC usage badhta hai, energy efficient models</li>
            <li><strong>Winter:</strong> Heating appliances ka judicious use</li>
            <li><strong>Rainy Season:</strong> Dehumidifiers aur exhaust fans</li>
            <li><strong>Peak Hours:</strong> High tariff periods avoid karo</li>
          </ul>

          <h3>10. Maintenance Tips</h3>
          <ul>
            <li><strong>Regular Cleaning:</strong> Dust se efficiency kam ho jaati hai</li>
            <li><strong>Timely Repairs:</strong> Faulty appliances replace karo</li>
            <li><strong>Proper Installation:</strong> Certified electricians se karwao</li>
            <li><strong>Voltage Stabilizers:</strong> Voltage fluctuations se bachao</li>
          </ul>

          <h3>11. Government Schemes</h3>
          <ul>
            <li><strong>PAT Scheme:</strong> Energy efficient appliances ka promotion</li>
            <li><strong>Star Rating:</strong> 5-star appliances ka use</li>
            <li><strong>Subsidies:</strong> Solar panels aur energy efficient devices pe</li>
            <li><strong>Net Metering:</strong> Solar power feed into grid</li>
          </ul>

          <h3>12. Cost Calculation Methods</h3>
          <ul>
            <li><strong>Simple Method:</strong> Power × Hours × Rate ÷ 1000</li>
            <li><strong>Detailed Tracking:</strong> Individual appliance monitoring</li>
            <li><strong>Seasonal Variation:</strong> Usage patterns ka analysis</li>
            <li><strong>Load Factor:</strong> Average vs peak consumption</li>
          </ul>

          <h3>13. Renewable Energy Integration</h3>
          <ul>
            <li><strong>Solar Panels:</strong> Rooftop solar installation</li>
            <li><strong>Battery Storage:</strong> Excess energy store karo</li>
            <li><strong>Hybrid Systems:</strong> Grid + solar combination</li>
            <li><strong>Net Metering:</strong> Excess power sell back to grid</li>
          </ul>

          <h3>14. Future Technologies</h3>
          <ul>
            <li><strong>IoT Devices:</strong> Smart energy management</li>
            <li><strong>AI Optimization:</strong> Usage patterns se learning</li>
            <li><strong>Blockchain:</strong> Energy trading platforms</li>
            <li><strong>Microgrids:</strong> Local energy distribution</li>
          </ul>

          <h3>15. Emergency Preparedness</h3>
          <ul>
            <li><strong>Power Backup:</strong> Inverter aur UPS systems</li>
            <li><strong>Load Shedding:</strong> Essential appliances priority</li>
            <li><strong>Energy Storage:</strong> Battery systems</li>
            <li><strong>Alternative Sources:</strong> Generators aur solar backup</li>
          </ul>

          <p>
            Electricity consumption ko control karna ek habit hai jo banaya ja sakta hai. Small changes se bade savings ho sakte hain. Regular monitoring aur conscious usage se aapke bills mein significant reduction aa sakta hai. Start today aur sustainable living ka part ban jaiye!
          </p>
        </div>
      </div>
          {/* ── Copy + Share ── */}
          <div style={{ display:'flex', gap:8, margin:'14px 0 4px' }}>
            <button onClick={()=>{
              const r=document.querySelectorAll('.tw-result-val,.tw-brow-val')
              const t='Power Consumption:\n'+Array.from(r).map(e=>e.innerText).join('\n')+'\n\nalmenso.com/tools/appliance-power-calculator'
              navigator.clipboard?.writeText(t).then(()=>alert('✅ Copy ho gaya!'))
            }} style={{flex:1,padding:'10px',background:'#f0fdf4',border:'1.5px solid #16a34a',borderRadius:9,color:'#15803d',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>📋 Copy Result</button>
            <button onClick={()=>window.open('https://wa.me/?text='+encodeURIComponent('Power Consumption calculate kiya — try karo: almenso.com/tools/appliance-power-calculator'),'_blank')} style={{flex:1,padding:'10px',background:'#e7fdf0',border:'1.5px solid #25d366',borderRadius:9,color:'#166534',fontWeight:800,fontSize:'0.78rem',cursor:'pointer',fontFamily:'var(--font)'}}>💬 WhatsApp Share</button>
          </div>
    </ToolWrapper>
  )
}
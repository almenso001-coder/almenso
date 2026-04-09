/**
 * ADMIN ANALYTICS DASHBOARD
 * Add this as a new tab in AdminPage.jsx
 * Features: Revenue tracking, tool usage stats, lead funnel, SEO metrics
 */
import React, { useState, useEffect, useMemo } from 'react'

const COLOR = { blue:'#1565c0', green:'#10b981', amber:'#f59e0b', red:'#ef4444', purple:'#7c3aed' }

const FMT_INR = (n) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)
const FMT_NUM = (n) => new Intl.NumberFormat('en-IN').format(n)

/* ── Mock data — replace with real Firestore queries ── */
function useAnalytics() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Simulate loading. Replace with: const snap = await getDocs(collection(db, 'analytics'))
    setTimeout(() => {
      setData({
        leads: { total:187, new:12, contacted:45, done:130, thisMonth:23 },
        revenue: {
          estimated: 187000, // ₹187,000 estimated from leads
          thisMonth: 28500,
          affiliate:  4200,
          adsense:    1800,
        },
        tools: [
          { name:'GST Calculator',    visits:12400, trend:'+18%' },
          { name:'EMI Calculator',    visits:9800,  trend:'+12%' },
          { name:'SIP Calculator',    visits:7200,  trend:'+45%' },
          { name:'Age Calculator',    visits:6100,  trend:'+8%'  },
          { name:'Password Generator',visits:5400,  trend:'+22%' },
          { name:'Image Compressor',  visits:4900,  trend:'+6%'  },
          { name:'Word Counter',      visits:4200,  trend:'-3%'  },
          { name:'Unit Converter',    visits:3800,  trend:'+11%' },
        ],
        traffic: {
          monthly: [
            { month:'Oct', visits:18200, leads:14 },
            { month:'Nov', visits:21500, leads:18 },
            { month:'Dec', visits:19800, leads:16 },
            { month:'Jan', visits:24600, leads:21 },
            { month:'Feb', visits:27300, leads:23 },
            { month:'Mar', visits:31200, leads:27 },
          ]
        },
        seo: {
          indexed: 142,
          keywords: 89,
          avgPosition: 18.4,
          clickThrough: '4.2%',
        },
        affiliate: {
          clicks: 342,
          conversions: 28,
          commission: 4200,
        }
      })
      setLoading(false)
    }, 800)
  }, [])

  return { loading, data }
}

/* ── Stat Card ─────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color = COLOR.blue, trend }) {
  return (
    <div style={{ background:'#fff', borderRadius:14, padding:'18px 20px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', border:'1px solid #f1f5f9' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <div style={{ fontSize:'1.5rem' }}>{icon}</div>
        {trend && (
          <span style={{ fontSize:'0.7rem', fontWeight:800, color: trend.startsWith('+') ? '#10b981' : '#ef4444', background: trend.startsWith('+') ? '#f0fdf4' : '#fef2f2', padding:'3px 8px', borderRadius:99 }}>
            {trend}
          </span>
        )}
      </div>
      <div style={{ fontSize:'1.6rem', fontWeight:900, color:'#0f172a', marginBottom:2 }}>{value}</div>
      <div style={{ fontSize:'0.75rem', fontWeight:700, color:'#64748b' }}>{label}</div>
      {sub && <div style={{ fontSize:'0.7rem', color:'#94a3b8', marginTop:3 }}>{sub}</div>}
    </div>
  )
}

/* ── Mini Bar Chart ─────────────────────────────────── */
function BarChart({ data, dataKey, color, labelKey, height = 120 }) {
  const max = Math.max(...data.map(d => d[dataKey]))
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:6, height, paddingBottom:20, position:'relative' }}>
      {data.map(d => (
        <div key={d[labelKey]} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          <div style={{ fontSize:'0.6rem', fontWeight:700, color:'#94a3b8', marginBottom:2 }}>
            {FMT_NUM(d[dataKey])}
          </div>
          <div title={`${d[labelKey]}: ${d[dataKey]}`}
            style={{ width:'100%', background:`linear-gradient(to top,${color}cc,${color})`, borderRadius:'4px 4px 0 0', height:`${(d[dataKey]/max) * (height-30)}px`, transition:'height 0.5s', cursor:'default' }} />
          <div style={{ fontSize:'0.65rem', color:'#94a3b8', position:'absolute', bottom:0 }}>{d[labelKey]}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Ring Donut ─────────────────────────────────────── */
function LeadFunnel({ leads }) {
  const stages = [
    { label:'New',       val: leads.new,       color: COLOR.red    },
    { label:'Contacted', val: leads.contacted,  color: COLOR.amber  },
    { label:'Closed',    val: leads.done,       color: COLOR.green  },
  ]
  const total = stages.reduce((a, s) => a + s.val, 0)
  return (
    <div>
      {stages.map(({ label, val, color }) => (
        <div key={label} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:4 }}>
            <span style={{ fontWeight:700, color:'#334155' }}>{label}</span>
            <span style={{ fontWeight:900, color }}>{val} <span style={{ fontWeight:500, color:'#94a3b8', fontSize:'0.7rem' }}>({Math.round(val/total*100)}%)</span></span>
          </div>
          <div style={{ background:'#f1f5f9', borderRadius:99, height:8 }}>
            <div style={{ width:`${(val/total)*100}%`, background:color, height:8, borderRadius:99, transition:'width 0.6s' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main Dashboard ─────────────────────────────────── */
export default function AnalyticsDashboard() {
  const { loading, data } = useAnalytics()
  const [period, setPeriod] = useState('month')

  if (loading) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:300, gap:16, color:'#64748b' }}>
      <div style={{ fontSize:'2rem', animation:'spin 1s linear infinite' }}>⏳</div>
      <div style={{ fontWeight:700 }}>Analytics load ho raha hai...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!data) return null

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontWeight:900, fontSize:'1.15rem', color:'#0f172a' }}>📊 Analytics Dashboard</div>
          <div style={{ fontSize:'0.75rem', color:'#64748b', marginTop:2 }}>Real-time business overview</div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding:'6px 14px', borderRadius:8, border:'1.5px solid #e2e8f0', background: period===p ? COLOR.blue : '#fff', color: period===p ? '#fff' : '#334155', fontWeight:700, fontSize:'0.74rem', cursor:'pointer', textTransform:'capitalize' }}>
              {p === 'week' ? '7 Days' : p === 'month' ? '30 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Revenue Overview ── */}
      <div style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius:16, padding:24, color:'#fff', marginBottom:20 }}>
        <div style={{ fontSize:'0.72rem', opacity:0.6, textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Estimated Monthly Revenue</div>
        <div style={{ fontSize:'2.2rem', fontWeight:900, marginBottom:16 }}>{FMT_INR(data.revenue.thisMonth)}</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))', gap:12 }}>
          {[
            { label:'Service Leads', val: FMT_INR(data.revenue.thisMonth - data.revenue.affiliate - data.revenue.adsense), icon:'🔧' },
            { label:'Affiliate',     val: FMT_INR(data.revenue.affiliate), icon:'🛒' },
            { label:'AdSense',       val: FMT_INR(data.revenue.adsense),   icon:'📢' },
          ].map(({ label, val, icon }) => (
            <div key={label} style={{ background:'rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 14px' }}>
              <div style={{ fontSize:'1rem', marginBottom:4 }}>{icon}</div>
              <div style={{ fontSize:'1rem', fontWeight:900 }}>{val}</div>
              <div style={{ fontSize:'0.68rem', opacity:0.6, marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:14, marginBottom:20 }}>
        <StatCard icon="📋" label="Total Leads"    value={data.leads.total}       sub={`+${data.leads.thisMonth} this month`} color={COLOR.blue} trend="+23%" />
        <StatCard icon="🆕" label="New Leads"      value={data.leads.new}         sub="Awaiting contact"  color={COLOR.red} />
        <StatCard icon="✅" label="Closed Deals"   value={data.leads.done}        sub="Completed jobs"    color={COLOR.green} trend="+12%" />
        <StatCard icon="🛒" label="Affiliate Clicks" value={`${data.affiliate.clicks}`} sub={`${data.affiliate.conversions} conversions`} color={COLOR.amber} />
        <StatCard icon="🔗" label="Pages Indexed"  value={data.seo.indexed}       sub="Google mein"       color={COLOR.purple} />
        <StatCard icon="📢" label="AdSense Rev"    value={FMT_INR(data.revenue.adsense)} sub="This month"  color={COLOR.green} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20, marginBottom:20 }}>

        {/* ── Traffic Chart ── */}
        <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#0f172a', marginBottom:16 }}>📈 Monthly Traffic</div>
          <BarChart data={data.traffic.monthly} dataKey="visits" labelKey="month" color={COLOR.blue} />
          <div style={{ fontSize:'0.72rem', color:'#94a3b8', marginTop:4, textAlign:'center' }}>
            Total: {FMT_NUM(data.traffic.monthly.reduce((a,d) => a + d.visits, 0))} visitors (6 months)
          </div>
        </div>

        {/* ── Lead Funnel ── */}
        <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#0f172a', marginBottom:16 }}>🎯 Lead Funnel</div>
          <LeadFunnel leads={data.leads} />
          <div style={{ marginTop:16, padding:'12px 14px', background:'#f8fafc', borderRadius:10 }}>
            <div style={{ fontSize:'0.72rem', color:'#64748b', marginBottom:2 }}>Close Rate</div>
            <div style={{ fontSize:'1.2rem', fontWeight:900, color:COLOR.green }}>
              {Math.round(data.leads.done / data.leads.total * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Tools ── */}
      <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.05)', marginBottom:20 }}>
        <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#0f172a', marginBottom:16 }}>🛠️ Top Tools (This Month)</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8rem' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['#','Tool Name','Visits','Trend'].map(h => (
                  <th key={h} style={{ padding:'8px 12px', textAlign:'left', fontWeight:800, color:'#64748b', fontSize:'0.72rem', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tools.map((t, i) => (
                <tr key={t.name} style={{ borderBottom:'1px solid #f8fafc' }}>
                  <td style={{ padding:'10px 12px', color:'#94a3b8', fontWeight:700 }}>#{i+1}</td>
                  <td style={{ padding:'10px 12px', fontWeight:700, color:'#0f172a' }}>{t.name}</td>
                  <td style={{ padding:'10px 12px', fontWeight:700, color:COLOR.blue }}>{FMT_NUM(t.visits)}</td>
                  <td style={{ padding:'10px 12px' }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:800, color: t.trend.startsWith('+') ? COLOR.green : COLOR.red, background: t.trend.startsWith('+') ? '#f0fdf4' : '#fef2f2', padding:'3px 8px', borderRadius:99 }}>
                      {t.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SEO Stats ── */}
      <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.05)', marginBottom:20 }}>
        <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#0f172a', marginBottom:16 }}>🔍 SEO Performance</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:12 }}>
          {[
            { label:'Pages Indexed', val: data.seo.indexed, ico:'📄' },
            { label:'Keywords Ranking', val: data.seo.keywords, ico:'🔑' },
            { label:'Avg Position', val: data.seo.avgPosition, ico:'📊' },
            { label:'Click Rate', val: data.seo.clickThrough, ico:'👆' },
          ].map(({ label, val, ico }) => (
            <div key={label} style={{ background:'#f8fafc', borderRadius:10, padding:'14px 16px', textAlign:'center' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:6 }}>{ico}</div>
              <div style={{ fontSize:'1.2rem', fontWeight:900, color:'#0f172a' }}>{val}</div>
              <div style={{ fontSize:'0.7rem', color:'#64748b', marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, background:'#f0f9ff', border:'1.5px solid #bae6fd', borderRadius:10, padding:'12px 14px', fontSize:'0.78rem', color:'#0369a1' }}>
          💡 <strong>Tip:</strong> Google Search Console connect karo aur Sitemap submit karo for real SEO data.
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style={{ marginLeft:8, fontWeight:700, color:COLOR.blue }}>Open GSC →</a>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'1.5px solid #86efac', borderRadius:14, padding:20 }}>
        <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#166534', marginBottom:14 }}>⚡ Quick Actions</div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {[
            { label:'Generate Sitemap', href:'/generate-sitemap.js', ico:'🗺️' },
            { label:'Google Search Console', href:'https://search.google.com/search-console', ico:'🔍' },
            { label:'AdSense Dashboard', href:'https://www.google.com/adsense', ico:'💰' },
            { label:'Amazon Affiliate', href:'https://affiliate-program.amazon.in', ico:'🛒' },
            { label:'Firebase Console', href:'https://console.firebase.google.com', ico:'🔥' },
          ].map(({ label, href, ico }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:6, background:'#fff', border:'1.5px solid #86efac', borderRadius:10, padding:'8px 14px', textDecoration:'none', fontSize:'0.78rem', fontWeight:700, color:'#166534', transition:'all 0.15s' }}>
              {ico} {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

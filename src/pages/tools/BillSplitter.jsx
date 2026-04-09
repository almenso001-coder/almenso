/**
 * BILL SPLITTER — Viral Social Tool 🍕
 * High-engagement: friends share link with each other
 * SEO: "bill splitter", "expense splitter", "khana split karo"
 * Monetization: Affiliate links for UPI apps, expense tracking apps
 */
import React, { useState, useCallback, useMemo } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const EMOJIS = ['👤','👩','👨','🧑','👦','👧','🧒','👴','👵']
const FMT = n => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(n)

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Bill Splitter — Split Expenses with Friends",
  "applicationCategory": "FinanceApplication",
  "description": "Free bill splitter tool — restaurant bill, trip expenses, house rent split karo equal ya custom percentage mein.",
  "offers": { "@type": "Offer", "price": "0" }
}

function uid() { return Math.random().toString(36).slice(2, 7) }

export default function BillSplitter() {
  const [members, setMembers] = useState([
    { id: uid(), name: 'Rahul', paid: 0, emoji: '👨' },
    { id: uid(), name: 'Priya', paid: 0, emoji: '👩' },
    { id: uid(), name: 'Amit',  paid: 0, emoji: '🧑' },
  ])
  const [items, setItems] = useState([
    { id: uid(), name: 'Pizza', amount: 800, paidBy: '', splitWith: [] },
  ])
  const [tab, setTab] = useState('items') // 'items' | 'members' | 'result'
  const [splitMode, setSplitMode] = useState('equal') // 'equal' | 'custom'

  /* ── Members ── */
  const addMember = () => {
    const n = ['Sonu','Monu','Raju','Deepa','Sunita','Ajay','Neha','Vikas'][members.length % 8]
    setMembers(m => [...m, { id: uid(), name: n, paid: 0, emoji: EMOJIS[members.length % EMOJIS.length] }])
  }
  const removeMember = id => setMembers(m => m.filter(x => x.id !== id))
  const updateMember = (id, field, val) => setMembers(m => m.map(x => x.id === id ? { ...x, [field]: val } : x))

  /* ── Items ── */
  const addItem = () => setItems(i => [...i, { id: uid(), name: 'Item', amount: 0, paidBy: members[0]?.id || '', splitWith: members.map(m => m.id) }])
  const removeItem = id => setItems(i => i.filter(x => x.id !== id))
  const updateItem = (id, field, val) => setItems(i => i.map(x => x.id === id ? { ...x, [field]: val } : x))
  const toggleSplit = (itemId, memberId) => {
    setItems(items => items.map(item => {
      if (item.id !== itemId) return item
      const has = item.splitWith.includes(memberId)
      return { ...item, splitWith: has ? item.splitWith.filter(id => id !== memberId) : [...item.splitWith, memberId] }
    }))
  }

  /* ── Calculation ── */
  const result = useMemo(() => {
    // Each member's balance: positive = owed money, negative = owes money
    const balance = {}
    members.forEach(m => { balance[m.id] = 0 })

    items.forEach(item => {
      if (!item.paidBy || item.amount <= 0) return
      const splitters = item.splitWith.length > 0 ? item.splitWith : members.map(m => m.id)
      const share = item.amount / splitters.length
      // Payer gets credit
      balance[item.paidBy] = (balance[item.paidBy] || 0) + item.amount
      // Each splitter owes share
      splitters.forEach(id => {
        balance[id] = (balance[id] || 0) - share
      })
    })

    // Simplify debts
    const pos = Object.entries(balance).filter(([,v]) => v > 0.01).sort((a,b) => b[1]-a[1])
    const neg = Object.entries(balance).filter(([,v]) => v < -0.01).sort((a,b) => a[1]-b[1])
    const transactions = []
    const p = pos.map(([id,v]) => ({ id, v }))
    const n = neg.map(([id,v]) => ({ id, v }))
    let pi = 0, ni = 0
    while (pi < p.length && ni < n.length) {
      const amount = Math.min(p[pi].v, -n[ni].v)
      if (amount > 0.01) {
        const from = members.find(m => m.id === n[ni].id)
        const to   = members.find(m => m.id === p[pi].id)
        transactions.push({ from: from?.name || '?', to: to?.name || '?', amount, fromEmoji: from?.emoji || '👤', toEmoji: to?.emoji || '👤' })
      }
      p[pi].v -= amount
      n[ni].v += amount
      if (Math.abs(p[pi].v) < 0.01) pi++
      if (Math.abs(n[ni].v) < 0.01) ni++
    }

    const total = items.reduce((a, i) => a + (parseFloat(i.amount) || 0), 0)
    return { balance, transactions, total }
  }, [items, members])

  const getMember = id => members.find(m => m.id === id)

  const tabStyle = active => ({
    padding: '10px 20px', border: 'none', fontWeight: 800, fontSize: '0.82rem',
    cursor: 'pointer', borderBottom: active ? '3px solid #1565c0' : '3px solid transparent',
    background: 'none', color: active ? '#1565c0' : '#64748b', transition: 'all 0.2s',
  })

  return (
    <ToolWrapper
      title="Bill Splitter — Restaurant & Trip Expenses Split Free"
      description="Free Bill Splitter — restaurant bill, trip expenses split karo equal ya custom mein."
      keywords="bill splitter, expense splitter, restaurant bill split, khana bill split, dosto ke saath split"
      toolName="Bill Splitter"
      emoji="🍕"
      heroColor="#1565c0"
      tagline="Dosto ke saath restaurant bill ya trip expenses easily split karo!"
      affCategory="finance"
      toolPath="/tools/bill-splitter"
      hasResult={result && result.transactions && result.transactions.length > 0}
      faqs={[
        { q: 'Kya unequal split ho sakta hai?', a: 'Haan! Har item ke liye alag members select kar sakte ho.' },
        { q: 'Kitne members add kar sakte hain?', a: 'Koi limit nahi — group trip ke liye perfect hai.' },
        { q: 'Kya result save hota hai?', a: 'Result screen pe sab clear show hota hai, screenshot le lo!' },
      ]}
      guideSteps={[
        { heading: 'Members add karo', text: 'Jo log bill share karenge unke naam daalo.' },
        { heading: 'Items add karo', text: 'Kya-kya order hua — naam aur amount.' },
        { heading: 'Result tab dekho', text: 'Exactly pata chalega kaun kitna dega.' },
      ]}
    >
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 0 16px' }}>

        {/* Total Banner */}
        <div style={{ background: '#fff', borderRadius: '0 0 16px 16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Bill</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>₹{FMT(result.total)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Per Person</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1565c0' }}>
              ₹{FMT(members.length > 0 ? result.total / members.length : 0)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Transactions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>{result.transactions.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: '#fff', borderRadius: 14, marginBottom: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid #f1f5f9' }}>
            {[['items','🧾 Items'],['members','👥 Members'],['result','✅ Result']].map(([t, label]) => (
              <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>{label}</button>
            ))}
          </div>

          <div style={{ padding: 20 }}>

            {/* ── ITEMS TAB ── */}
            {tab === 'items' && (
              <div>
                {items.map((item, idx) => (
                  <div key={item.id} style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 14, border: '1.5px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.78rem' }}>#{idx+1}</span>
                      <input value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)}
                        placeholder="Item name (e.g. Pizza)"
                        style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontWeight: 700 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>₹</span>
                        <input type="number" value={item.amount || ''} onChange={e => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          style={{ width: 90, padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', fontWeight: 900, color: '#1565c0' }} />
                      </div>
                      {items.length > 1 && (
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: '#fef2f2', border: 'none', color: '#ef4444', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Paid by:</span>
                      {members.map(m => (
                        <button key={m.id} onClick={() => updateItem(item.id, 'paidBy', m.id)}
                          style={{ padding: '4px 12px', borderRadius: 99, border: '1.5px solid #e2e8f0', background: item.paidBy === m.id ? '#1565c0' : '#fff', color: item.paidBy === m.id ? '#fff' : '#334155', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
                          {m.emoji} {m.name}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Split with:</span>
                      {members.map(m => {
                        const included = item.splitWith.includes(m.id)
                        return (
                          <button key={m.id} onClick={() => toggleSplit(item.id, m.id)}
                            style={{ padding: '4px 12px', borderRadius: 99, border: `1.5px solid ${included ? '#10b981' : '#e2e8f0'}`, background: included ? '#f0fdf4' : '#fff', color: included ? '#166534' : '#94a3b8', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
                            {m.emoji} {m.name} {included && '✓'}
                          </button>
                        )
                      })}
                      <button onClick={() => updateItem(item.id, 'splitWith', members.map(m => m.id))}
                        style={{ padding: '4px 12px', borderRadius: 99, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>
                        All
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={addItem}
                  style={{ width: '100%', padding: '12px', background: '#f0f9ff', border: '2px dashed #93c5fd', borderRadius: 12, color: '#1565c0', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer' }}>
                  + Item Add Karo
                </button>
              </div>
            )}

            {/* ── MEMBERS TAB ── */}
            {tab === 'members' && (
              <div>
                {members.map(m => (
                  <div key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                    <input value={m.name} onChange={e => updateMember(m.id, 'name', e.target.value)}
                      style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', fontWeight: 700 }} />
                    {members.length > 2 && (
                      <button onClick={() => removeMember(m.id)}
                        style={{ background: '#fef2f2', border: 'none', color: '#ef4444', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                    )}
                  </div>
                ))}
                <button onClick={addMember}
                  style={{ width: '100%', padding: '12px', background: '#f0f9ff', border: '2px dashed #93c5fd', borderRadius: 12, color: '#1565c0', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer' }}>
                  + Member Add Karo (max 10)
                </button>
              </div>
            )}

            {/* ── RESULT TAB ── */}
            {tab === 'result' && (
              <div>
                {result.transactions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 20px', color: '#64748b' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🎉</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#16a34a' }}>Sab barabar hai!</div>
                    <div style={{ fontSize: '0.82rem', marginTop: 4 }}>Koi kisi ka kuch nahi banta.</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 14, textTransform: 'uppercase' }}>
                      {result.transactions.length} Transactions Needed
                    </div>
                    {result.transactions.map((t, i) => (
                      <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '16px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: '1.4rem' }}>{t.fromEmoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, fontSize: '0.88rem', color: '#0f172a' }}>
                            <span style={{ color: '#ef4444' }}>{t.from}</span>
                            <span style={{ color: '#94a3b8' }}> → </span>
                            <span style={{ color: '#10b981' }}>{t.to}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>UPI / Cash transfer karo</div>
                        </div>
                        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#1565c0' }}>₹{FMT(t.amount)}</div>
                        <span style={{ fontSize: '1.4rem' }}>{t.toEmoji}</span>
                      </div>
                    ))}

                    {/* Balance summary */}
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 10, textTransform: 'uppercase' }}>Balance Summary</div>
                      {members.map(m => {
                        const bal = result.balance[m.id] || 0
                        const isPos = bal > 0.01, isNeg = bal < -0.01
                        return (
                          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#fff', borderRadius: 10, marginBottom: 8, border: `1.5px solid ${isPos ? '#86efac' : isNeg ? '#fca5a5' : '#e2e8f0'}` }}>
                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.emoji} {m.name}</span>
                            <span style={{ fontWeight: 900, color: isPos ? '#16a34a' : isNeg ? '#dc2626' : '#64748b' }}>
                              {isPos ? `+₹${FMT(bal)} (gets back)` : isNeg ? `-₹${FMT(-bal)} (owes)` : '✓ Settled'}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Share button */}
                    <button onClick={() => {
                      const text = result.transactions.map(t => `${t.from} → ${t.to}: ₹${FMT(t.amount)}`).join('\n')
                      navigator.clipboard?.writeText(`🧾 Bill Split Summary\nTotal: ₹${FMT(result.total)}\n\n${text}\n\n📱 Almenso Bill Splitter: almenso.com/tools/bill-splitter`)
                      alert('Copied! WhatsApp pe paste karo 👇')
                    }}
                      style={{ width: '100%', marginTop: 14, padding: '13px', background: '#25d366', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer' }}>
                      📤 WhatsApp Pe Share Karo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation between tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {tab !== 'result' && (
            <button onClick={() => setTab(tab === 'items' ? 'members' : 'result')}
              style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg,#1565c0,#0d47a1)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer' }}>
              {tab === 'items' ? 'Next: Members 👥' : 'Result Dekho ✅'}
            </button>
          )}
          {tab === 'result' && (
            <button onClick={() => setTab('items')}
              style={{ padding: '12px 20px', background: '#f1f5f9', color: '#334155', border: '1.5px solid #e2e8f0', borderRadius: 12, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              ← Edit Karo
            </button>
          )}
        </div>
      </div>
    </ToolWrapper>
  )
}

import React, { useState, useMemo } from "react";
import ToolWrapper from "../../components/ToolWrapper";

const RT = {
  pct: [
    { path: "/tools/gst-calculator", emoji: "🧾", name: "GST Calculator" },
    {
      path: "/tools/profit-margin-calculator",
      emoji: "📊",
      name: "Profit Margin",
    },
  ],
  profit: [
    { path: "/tools/gst-calculator", emoji: "🧾", name: "GST Calculator" },
    { path: "/tools/emi-calculator", emoji: "🏦", name: "EMI Calculator" },
  ],
  loan: [
    { path: "/tools/emi-calculator", emoji: "🏦", name: "EMI Calculator" },
    {
      path: "/tools/profit-margin-calculator",
      emoji: "📊",
      name: "Profit Margin",
    },
  ],
  word: [
    {
      path: "/tools/qr-code-generator",
      emoji: "📱",
      name: "QR Code Generator",
    },
    { path: "/tools/age-calculator", emoji: "🎂", name: "Age Calculator" },
  ],
  qr: [
    { path: "/tools/word-counter", emoji: "📝", name: "Word Counter" },
    { path: "/tools/gst-calculator", emoji: "🧾", name: "GST Calculator" },
  ],
};

// ── Percentage Calculator ─────────────────────────────────
export function PercentageCalculator() {
  const [mode, setMode] = useState("pctOf");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const modes = [
    {
      id: "pctOf",
      label: "X% of Y",
      fn: () => (parseFloat(a) / 100) * parseFloat(b),
      desc: "e.g. 18% of 5000 = 900",
    },
    {
      id: "whatPct",
      label: "X, Y ka kitna%",
      fn: () => (parseFloat(a) / parseFloat(b)) * 100,
      desc: "e.g. 450/600 = 75%",
    },
    {
      id: "increase",
      label: "X pe Y% badhao",
      fn: () => parseFloat(a) * (1 + parseFloat(b) / 100),
      desc: "Price increase / markup",
    },
    {
      id: "decrease",
      label: "X pe Y% ghatao",
      fn: () => parseFloat(a) * (1 - parseFloat(b) / 100),
      desc: "Discount / sale price",
    },
    {
      id: "diff",
      label: "% Change (old→new)",
      fn: () => ((parseFloat(b) - parseFloat(a)) / parseFloat(a)) * 100,
      desc: "Salary hike, price change",
    },
    {
      id: "reverse",
      label: "Reverse % (total pe)",
      fn: () => parseFloat(a) / (parseFloat(b) / 100),
      desc: "100 = X% of kya? → nikalo",
    },
  ];
  const sel = modes.find((m) => m.id === mode);
  const labels = {
    pctOf: ["Percentage (%)", "Total Amount"],
    whatPct: ["Amount", "Total (100%)"],
    increase: ["Original Amount", "Increase %"],
    decrease: ["Original Amount", "Discount %"],
    diff: ["Purana Value", "Naya Value"],
    reverse: ["Amount (e.g. 900)", "Rate % (e.g. 18)"],
  };

  // Live calculation — no button
  const res = useMemo(() => {
    if (!a || !b) return null;
    try {
      const r = sel.fn();
      return isFinite(r) ? r : null;
    } catch {
      return null;
    }
  }, [a, b, mode]);

  const isPercent = ["whatPct", "diff"].includes(mode);

  return (
    <ToolWrapper
      title="Percentage Calculator — Online % Calculate Karo"
      description="6 modes: X% of Y, reverse %, marks, discount, price change — sab live mein. Koi button nahi — type karo aur answer instant."
      keywords="percentage calculator, percent calculator, discount calculator, marks percentage, reverse percentage hindi"
      emoji="📊"
      heroColor="linear-gradient(135deg, #1a1a2e, #7c3aed)"
      toolName="Percentage Calculator"
      tagline="6 modes · Live calculation — type karo, answer turant"
      guideSteps={[
        {
          heading: "Mode chunen",
          text: "6 alag calculations hain — apna kaam select karein.",
        },
        {
          heading: "Numbers daalo",
          text: "Type karte hi answer milega — koi button nahi.",
        },
        {
          heading: "Reverse % try karo",
          text: "100 rupees = 18% of kya? — reverse mode se.",
        },
      ]}
      faqs={[
        {
          q: "10% of 500 kaise nikalte hain?",
          a: '500 × 10 ÷ 100 = 50. "X% of Y" mode mein 10 aur 500 daalo.',
        },
        {
          q: "Marks ka percentage?",
          a: '"X, Y ka kitna%" mode — obtained marks aur total marks daalo.',
        },
        {
          q: "Salary hike % kaise nikalein?",
          a: '"% Change" mode — purani salary aur nayi salary daalo.',
        },
        {
          q: "Reverse percentage kya hai?",
          a: 'Example: ₹900 = 18% of kya? Answer: 5000. "Reverse %" mode mein 900 aur 18 daalo.',
        },
      ]}
      relatedBlog={{
        slug: "how-to-calculate-percentage",
        title: "Percentage Kaise Calculate Karte Hain?",
        excerpt: "Marks, discount, profit — sab jagah easy trick.",
      }}
      affCategory="finance"
      hasResult={true}
      relatedTools={RT.pct}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📊 Mode Chunen</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setA("");
                setB("");
              }}
              style={{
                padding: "7px 12px",
                borderRadius: 99,
                border: "1.5px solid",
                fontSize: "0.74rem",
                fontWeight: 700,
                cursor: "pointer",
                borderColor: mode === m.id ? "#7c3aed" : "#e5e7eb",
                background: mode === m.id ? "#7c3aed" : "#fff",
                color: mode === m.id ? "#fff" : "#555",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "0.74rem", color: "#888", marginBottom: 12 }}>
          📌 {sel.desc}
        </p>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>{labels[mode][0]}</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="tw-field">
            <label>{labels[mode][1]}</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter value"
            />
          </div>
        </div>
      </div>
      {res !== null && (
        <div className="tw-result">
          <div className="tw-result-label">Result (Live)</div>
          <div className="tw-result-val">
            {isPercent
              ? res.toFixed(2) + "%"
              : mode === "reverse"
                ? "₹" + res.toFixed(2)
                : "₹" + res.toFixed(2)}
          </div>
          {mode === "diff" && (
            <div
              className="tw-result-sub"
              style={{ color: res >= 0 ? "#86efac" : "#fca5a5" }}
            >
              {res >= 0
                ? `↑ ${res.toFixed(2)}% increase`
                : `↓ ${Math.abs(res).toFixed(2)}% decrease`}
            </div>
          )}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Percentage Calculation Guide</div>
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>
          <p>
            Percentage calculation har field mein zaroori skill hai — shopping
            se lekar business tak. Yeh guide aapko sikhaega ki percentages kaise
            calculate karein, kab kya formula use karein, aur real life mein
            kaise apply karein.
          </p>

          <h3>1. Basic Percentage Concepts</h3>
          <ul>
            <li>
              <strong>Percentage:</strong> 100 mein se kitna hissa
            </li>
            <li>
              <strong>Formula:</strong> (Part/Whole) × 100 = Percentage
            </li>
            <li>
              <strong>Decimal to Percent:</strong> 0.25 = 25%
            </li>
            <li>
              <strong>Percent to Decimal:</strong> 25% = 0.25
            </li>
          </ul>

          <h3>2. Common Percentage Calculations</h3>
          <ul>
            <li>
              <strong>X% of Y:</strong> (X/100) × Y
            </li>
            <li>
              <strong>What % is X of Y:</strong> (X/Y) × 100
            </li>
            <li>
              <strong>Increase by X%:</strong> Original × (1 + X/100)
            </li>
            <li>
              <strong>Decrease by X%:</strong> Original × (1 - X/100)
            </li>
            <li>
              <strong>% Change:</strong> ((New - Old)/Old) × 100
            </li>
          </ul>

          <h3>3. Real Life Applications</h3>
          <ul>
            <li>
              <strong>Shopping:</strong> Discount percentages
            </li>
            <li>
              <strong>Education:</strong> Marks aur grades
            </li>
            <li>
              <strong>Finance:</strong> Interest rates aur returns
            </li>
            <li>
              <strong>Business:</strong> Profit margins aur growth
            </li>
            <li>
              <strong>Health:</strong> BMI, body fat percentage
            </li>
          </ul>

          <h3>4. Percentage in Education</h3>
          <ul>
            <li>
              <strong>Marks Calculation:</strong> Obtained marks ÷ Total marks ×
              100
            </li>
            <li>
              <strong>Grade Conversion:</strong> Different grading systems
            </li>
            <li>
              <strong>Attendance:</strong> Present days ÷ Total days × 100
            </li>
            <li>
              <strong>Pass Percentage:</strong> Passed students ÷ Total students
              × 100
            </li>
          </ul>

          <h3>5. Business Percentages</h3>
          <ul>
            <li>
              <strong>Profit Margin:</strong> Profit ÷ Sales × 100
            </li>
            <li>
              <strong>Growth Rate:</strong> ((Current - Previous)/Previous) ×
              100
            </li>
            <li>
              <strong>Market Share:</strong> Company sales ÷ Total market × 100
            </li>
            <li>
              <strong>Tax Rates:</strong> GST, income tax percentages
            </li>
          </ul>

          <h3>6. Financial Calculations</h3>
          <ul>
            <li>
              <strong>Interest Rate:</strong> Simple aur compound interest
            </li>
            <li>
              <strong>Investment Returns:</strong> Annual returns percentage
            </li>
            <li>
              <strong>Loan EMI:</strong> Interest component percentage
            </li>
            <li>
              <strong>Inflation:</strong> Price increase percentage
            </li>
          </ul>

          <h3>7. Health & Fitness</h3>
          <ul>
            <li>
              <strong>BMI Calculation:</strong> Weight/height² formula
            </li>
            <li>
              <strong>Body Fat:</strong> Different measurement methods
            </li>
            <li>
              <strong>Calorie Distribution:</strong> Macronutrient percentages
            </li>
            <li>
              <strong>Progress Tracking:</strong> Weight loss/gain percentages
            </li>
          </ul>

          <h3>8. Statistical Percentages</h3>
          <ul>
            <li>
              <strong>Probability:</strong> Chance of events
            </li>
            <li>
              <strong>Survey Results:</strong> Response percentages
            </li>
            <li>
              <strong>Demographics:</strong> Population distribution
            </li>
            <li>
              <strong>Success Rates:</strong> Performance metrics
            </li>
          </ul>

          <h3>9. Common Mistakes</h3>
          <ul>
            <li>Wrong base value use karna</li>
            <li>Percentage aur absolute value confuse karna</li>
            <li>Decimal places ignore karna</li>
            <li>Negative percentages ka galat interpretation</li>
          </ul>

          <h3>10. Advanced Concepts</h3>
          <ul>
            <li>
              <strong>Percentage Points:</strong> Difference between percentages
            </li>
            <li>
              <strong>Compound Percentages:</strong> Multiple percentage
              applications
            </li>
            <li>
              <strong>Weighted Averages:</strong> Different weight percentages
            </li>
            <li>
              <strong>Percentage Change:</strong> Relative vs absolute change
            </li>
          </ul>

          <p>
            Percentage calculation ek fundamental math skill hai jo daily life
            mein kaam aati hai. Practice se aap expert ban jaoge aur complex
            calculations bhi easily kar paoge!
          </p>
        </div>
      </div>
    </ToolWrapper>
  );
}

// ── Profit Margin Calculator ──────────────────────────────
export function ProfitMarginCalculator() {
  const [tab, setTab] = useState("margin");
  const [cp, setCP] = useState("");
  const [sp, setSP] = useState("");
  const [res, setRes] = useState(null);
  // Target margin tab
  const [tCP, setTCP] = useState("");
  const [tMargin, setTMargin] = useState("");
  const [tRes, setTRes] = useState(null);
  // Break-even tab
  const [beFC, setBeFC] = useState("");
  const [beCP, setBeCP] = useState("");
  const [beSP, setBeSP] = useState("");
  const [beRes, setBeRes] = useState(null);

  const calc = () => {
    const c = parseFloat(cp),
      s = parseFloat(sp);
    if (!c || !s) return;
    const profit = s - c;
    const margin = (profit / s) * 100;
    const markup = (profit / c) * 100;
    setRes({ profit, margin, markup, cp: c, sp: s });
  };
  const calcTarget = () => {
    const c = parseFloat(tCP),
      m = parseFloat(tMargin);
    if (!c || !m || m >= 100) return;
    const sp = c / (1 - m / 100);
    setTRes({
      sp,
      profit: sp - c,
      markup: ((sp - c) / c) * 100,
      margin: m,
      cp: c,
    });
  };
  const calcBreakeven = () => {
    const fc = parseFloat(beFC),
      cp2 = parseFloat(beCP),
      sp2 = parseFloat(beSP);
    if (!fc || !cp2 || !sp2 || sp2 <= cp2) return;
    const units = Math.ceil(fc / (sp2 - cp2));
    setBeRes({
      units,
      revenue: units * sp2,
      profit: units * (sp2 - cp2) - fc,
      fc,
      cp: cp2,
      sp: sp2,
    });
  };
  const fmt = (n) =>
    "₹" +
    parseFloat(n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const tabSt = (t) => ({
    flex: 1,
    padding: "9px 4px",
    border: "1.5px solid",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "0.74rem",
    borderColor: tab === t ? "#0c831f" : "#e5e7eb",
    background: tab === t ? "#0c831f" : "#fff",
    color: tab === t ? "#fff" : "#555",
  });

  return (
    <ToolWrapper
      title="Profit Margin Calculator — Business Profit % Calculate Karo"
      description="Profit margin, target price aur break-even calculator — teen tools ek jagah. Dukaan, online business, manufacturing sab ke liye."
      keywords="profit margin calculator, break even calculator, target price calculator, business profit india hindi"
      emoji="📈"
      heroColor="linear-gradient(135deg, #1a1a2e, #0c831f)"
      toolName="Profit Margin Calculator"
      tagline="Margin · Target Price · Break-Even — teen tools ek jagah"
      guideSteps={[
        {
          heading: "Cost aur Selling Price daalo",
          text: "Profit margin aur markup instantly milega.",
        },
        {
          heading: "Target Margin tab try karo",
          text: "Chaahte ho 30% margin? Tab selling price kya honi chahiye — instantly.",
        },
        {
          heading: "Break-Even tab use karo",
          text: "Kitne units bechne ke baad profit start hoga — business planning ke liye.",
        },
      ]}
      faqs={[
        {
          q: "Profit margin aur markup mein fark?",
          a: "Margin = profit ÷ selling price. Markup = profit ÷ cost price. Margin hamesha markup se kam hoti hai.",
        },
        {
          q: "Achhi margin kitni hoti hai?",
          a: "Grocery 5-15%, electronics 15-30%, clothing 40-60%, services 50-70% normal hai.",
        },
        {
          q: "Break-even kya hota hai?",
          a: "Woh point jahan total revenue = total cost. Isse zyada sell karo toh profit shuru hota hai.",
        },
        {
          q: "Target margin kya use hai?",
          a: "Agar aapko pata hai ki 25% margin chahiye toh selling price calculator automatically nikaal deta hai.",
        },
      ]}
      relatedBlog={{
        slug: "profit-margin-kaise-badhaye",
        title: "Profit Margin Kaise Badhayein?",
        excerpt: "8 smart strategies jo actually kaam karti hain.",
      }}
      relatedTools={RT.profit}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        <button style={tabSt("margin")} onClick={() => setTab("margin")}>
          📈 Margin
        </button>
        <button style={tabSt("target")} onClick={() => setTab("target")}>
          🎯 Target
        </button>
        <button style={tabSt("breakeven")} onClick={() => setTab("breakeven")}>
          ⚖️ Break-Even
        </button>
      </div>

      {tab === "margin" && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">📈 Profit Calculate Karo</div>
            <div className="tw-input-group">
              <div className="tw-field">
                <label>💰 Cost Price (₹)</label>
                <input
                  type="number"
                  value={cp}
                  placeholder="e.g. 100"
                  onChange={(e) => {
                    setCP(e.target.value);
                    setRes(null);
                  }}
                />
              </div>
              <div className="tw-field">
                <label>🏷️ Selling Price (₹)</label>
                <input
                  type="number"
                  value={sp}
                  placeholder="e.g. 150"
                  onChange={(e) => {
                    setSP(e.target.value);
                    setRes(null);
                  }}
                />
              </div>
              <button className="tw-calc-btn" onClick={calc}>
                📈 Calculate Karo
              </button>
            </div>
          </div>
          {res && (
            <>
              <div
                className="tw-result"
                style={{
                  background:
                    res.profit >= 0
                      ? "linear-gradient(135deg,#0c831f,#16a34a)"
                      : "linear-gradient(135deg,#dc2626,#ef4444)",
                }}
              >
                <div className="tw-result-label">
                  {res.profit >= 0 ? "Profit" : "Nuksan"}
                </div>
                <div className="tw-result-val">{fmt(Math.abs(res.profit))}</div>
                <div className="tw-result-sub">
                  Margin: {res.margin.toFixed(2)}% · Markup:{" "}
                  {res.markup.toFixed(2)}%
                </div>
              </div>
              <div className="tp-card">
                <div className="tw-breakdown">
                  <div className="tw-brow">
                    <span className="tw-brow-label">Cost Price</span>
                    <span className="tw-brow-val">{fmt(res.cp)}</span>
                  </div>
                  <div className="tw-brow">
                    <span className="tw-brow-label">Selling Price</span>
                    <span className="tw-brow-val">{fmt(res.sp)}</span>
                  </div>
                  <div className="tw-brow">
                    <span className="tw-brow-label">Profit Amount</span>
                    <span
                      className="tw-brow-val"
                      style={{ color: res.profit >= 0 ? "#16a34a" : "#dc2626" }}
                    >
                      {fmt(res.profit)}
                    </span>
                  </div>
                  <div className="tw-brow">
                    <span className="tw-brow-label">Profit Margin %</span>
                    <span className="tw-brow-val">
                      {res.margin.toFixed(2)}%
                    </span>
                  </div>
                  <div className="tw-brow">
                    <span className="tw-brow-label">Markup %</span>
                    <span className="tw-brow-val">
                      {res.markup.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {tab === "target" && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">
              🎯 Target Margin Se Selling Price Nikalo
            </div>
            <p style={{ fontSize: "0.78rem", color: "#888", marginBottom: 12 }}>
              Aapko pata hai cost price aur chahiye X% margin — selling price
              kya rakhen?
            </p>
            <div className="tw-input-group">
              <div className="tw-field">
                <label>💰 Cost Price (₹)</label>
                <input
                  type="number"
                  value={tCP}
                  placeholder="e.g. 200"
                  onChange={(e) => {
                    setTCP(e.target.value);
                    setTRes(null);
                  }}
                />
              </div>
              <div className="tw-field">
                <label>🎯 Target Margin (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tMargin}
                  placeholder="e.g. 30"
                  onChange={(e) => {
                    setTMargin(e.target.value);
                    setTRes(null);
                  }}
                />
              </div>
              <button className="tw-calc-btn" onClick={calcTarget}>
                🎯 Selling Price Nikalo
              </button>
            </div>
          </div>
          {tRes && (
            <div className="tp-card">
              <div className="tw-breakdown">
                <div className="tw-brow">
                  <span className="tw-brow-label">Cost Price</span>
                  <span className="tw-brow-val">{fmt(tRes.cp)}</span>
                </div>
                <div
                  className="tw-brow"
                  style={{
                    background: "#f0fdf4",
                    borderLeft: "3px solid #16a34a",
                  }}
                >
                  <span className="tw-brow-label">
                    ✅ Selling Price (target ke liye)
                  </span>
                  <span
                    className="tw-brow-val"
                    style={{ color: "#15803d", fontWeight: 900 }}
                  >
                    {fmt(tRes.sp)}
                  </span>
                </div>
                <div className="tw-brow">
                  <span className="tw-brow-label">Profit Amount</span>
                  <span className="tw-brow-val">{fmt(tRes.profit)}</span>
                </div>
                <div className="tw-brow">
                  <span className="tw-brow-label">Markup</span>
                  <span className="tw-brow-val">{tRes.markup.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "breakeven" && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">⚖️ Break-Even Calculator</div>
            <p style={{ fontSize: "0.78rem", color: "#888", marginBottom: 12 }}>
              Kitne units bechne ke baad fixed costs cover honge aur actual
              profit shuru hoga?
            </p>
            <div className="tw-input-group">
              <div className="tw-field">
                <label>🏢 Fixed Costs (₹/month) — rent, salary etc.</label>
                <input
                  type="number"
                  value={beFC}
                  placeholder="e.g. 50000"
                  onChange={(e) => {
                    setBeFC(e.target.value);
                    setBeRes(null);
                  }}
                />
              </div>
              <div className="tw-field">
                <label>💰 Cost Price per Unit (₹)</label>
                <input
                  type="number"
                  value={beCP}
                  placeholder="e.g. 80"
                  onChange={(e) => {
                    setBeCP(e.target.value);
                    setBeRes(null);
                  }}
                />
              </div>
              <div className="tw-field">
                <label>🏷️ Selling Price per Unit (₹)</label>
                <input
                  type="number"
                  value={beSP}
                  placeholder="e.g. 150"
                  onChange={(e) => {
                    setBeSP(e.target.value);
                    setBeRes(null);
                  }}
                />
              </div>
              <button className="tw-calc-btn" onClick={calcBreakeven}>
                ⚖️ Break-Even Nikalo
              </button>
            </div>
          </div>
          {beRes && (
            <div className="tp-card">
              <div className="tw-breakdown">
                <div
                  className="tw-brow"
                  style={{
                    background: "#fef9c3",
                    borderLeft: "3px solid #fbbf24",
                  }}
                >
                  <span className="tw-brow-label">⚖️ Break-Even Units</span>
                  <span
                    className="tw-brow-val"
                    style={{ color: "#b45309", fontWeight: 900 }}
                  >
                    {beRes.units.toLocaleString("en-IN")} units
                  </span>
                </div>
                <div className="tw-brow">
                  <span className="tw-brow-label">Break-Even Revenue</span>
                  <span className="tw-brow-val">{fmt(beRes.revenue)}</span>
                </div>
                <div className="tw-brow">
                  <span className="tw-brow-label">Contribution per Unit</span>
                  <span className="tw-brow-val" style={{ color: "#16a34a" }}>
                    {fmt(beRes.sp - beRes.cp)}
                  </span>
                </div>
                <div
                  className="tw-brow"
                  style={{
                    background: "#f0fdf4",
                    borderLeft: "3px solid #16a34a",
                  }}
                >
                  <span className="tw-brow-label">
                    ✅ Iske Baad Har Unit Pe Net Profit
                  </span>
                  <span className="tw-brow-val" style={{ color: "#15803d" }}>
                    {fmt(beRes.sp - beRes.cp)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Profit Margin Guide</div>
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>
          <p>
            Profit margin business ki lifeline hai. Yeh guide aapko sikhaega ki
            profit margins kaise calculate karein, different types of margins
            kya hote hain, aur business mein kaise improve karein.
          </p>

          <h3>1. Understanding Profit Margins</h3>
          <ul>
            <li>
              <strong>Gross Margin:</strong> (Revenue - COGS) ÷ Revenue × 100
            </li>
            <li>
              <strong>Operating Margin:</strong> Operating Profit ÷ Revenue ×
              100
            </li>
            <li>
              <strong>Net Margin:</strong> Net Profit ÷ Revenue × 100
            </li>
            <li>
              <strong>Markup:</strong> (Selling Price - Cost) ÷ Cost × 100
            </li>
          </ul>

          <h3>2. Industry Benchmarks</h3>
          <ul>
            <li>
              <strong>Grocery Stores:</strong> 1-3% net margin
            </li>
            <li>
              <strong>Restaurants:</strong> 3-5% net margin
            </li>
            <li>
              <strong>Retail:</strong> 5-10% net margin
            </li>
            <li>
              <strong>Manufacturing:</strong> 10-15% net margin
            </li>
            <li>
              <strong>Technology:</strong> 15-25% net margin
            </li>
            <li>
              <strong>Pharmaceuticals:</strong> 20-30% net margin
            </li>
          </ul>

          <h3>3. Break-Even Analysis</h3>
          <ul>
            <li>
              <strong>Fixed Costs:</strong> Rent, salaries, insurance
            </li>
            <li>
              <strong>Variable Costs:</strong> Raw materials, packaging
            </li>
            <li>
              <strong>Contribution Margin:</strong> Selling Price - Variable
              Cost per unit
            </li>
            <li>
              <strong>Break-Even Point:</strong> Fixed Costs ÷ Contribution
              Margin
            </li>
          </ul>

          <h3>4. Pricing Strategies</h3>
          <ul>
            <li>
              <strong>Cost-Plus Pricing:</strong> Cost + Desired Margin
            </li>
            <li>
              <strong>Competitive Pricing:</strong> Market rate based
            </li>
            <li>
              <strong>Value-Based Pricing:</strong> Customer perceived value
            </li>
            <li>
              <strong>Dynamic Pricing:</strong> Demand-based adjustments
            </li>
          </ul>

          <h3>5. Cost Control</h3>
          <ul>
            <li>
              <strong>Direct Costs:</strong> Raw materials, labor
            </li>
            <li>
              <strong>Indirect Costs:</strong> Overhead expenses
            </li>
            <li>
              <strong>Cost Reduction:</strong> Efficiency improvements
            </li>
            <li>
              <strong>Supplier Negotiation:</strong> Better terms
            </li>
          </ul>

          <h3>6. Revenue Optimization</h3>
          <ul>
            <li>
              <strong>Volume Increase:</strong> More sales at same margin
            </li>
            <li>
              <strong>Price Increase:</strong> Higher prices with same volume
            </li>
            <li>
              <strong>Product Mix:</strong> Higher margin products
            </li>
            <li>
              <strong>Upselling:</strong> Additional products/services
            </li>
          </ul>

          <h3>7. Financial Metrics</h3>
          <ul>
            <li>
              <strong>ROI:</strong> Return on Investment
            </li>
            <li>
              <strong>ROCE:</strong> Return on Capital Employed
            </li>
            <li>
              <strong>Gross Profit:</strong> Revenue minus direct costs
            </li>
            <li>
              <strong>Operating Profit:</strong> Gross profit minus operating
              expenses
            </li>
          </ul>

          <h3>8. Common Mistakes</h3>
          <ul>
            <li>Fixed vs variable costs confuse karna</li>
            <li>Overhead allocation galat karna</li>
            <li>Seasonal variations ignore karna</li>
            <li>Competition analysis nahi karna</li>
          </ul>

          <h3>9. Tools & Software</h3>
          <ul>
            <li>
              <strong>Excel:</strong> Basic calculations
            </li>
            <li>
              <strong>QuickBooks:</strong> Accounting software
            </li>
            <li>
              <strong>SAP:</strong> Enterprise resource planning
            </li>
            <li>
              <strong>Margin calculators:</strong> Online tools
            </li>
          </ul>

          <h3>10. Future Trends</h3>
          <ul>
            <li>
              <strong>AI Pricing:</strong> Dynamic pricing algorithms
            </li>
            <li>
              <strong>Data Analytics:</strong> Customer behavior analysis
            </li>
            <li>
              <strong>Subscription Models:</strong> Recurring revenue
            </li>
            <li>
              <strong>E-commerce:</strong> Online margin optimization
            </li>
          </ul>

          <p>
            Profit margin calculation aur optimization business success ki key
            hai. Regular monitoring aur adjustment se sustainable growth
            possible hai.
          </p>
        </div>
      </div>
    </ToolWrapper>
  );
}

// ── Loan Interest Calculator ──────────────────────────────
export function LoanInterestCalculator() {
  const [p, setP] = useState("");
  const [r, setR] = useState("");
  const [t, setT] = useState("");
  const [type, setType] = useState("simple");
  const [compound, setCompound] = useState("annually"); // annually | semi | quarterly | monthly
  const [res, setRes] = useState(null);

  const freqMap = { annually: 1, semi: 2, quarterly: 4, monthly: 12 };
  const freqLabel = {
    annually: "Annually",
    semi: "Half-Yearly",
    quarterly: "Quarterly",
    monthly: "Monthly",
  };

  const calc = () => {
    const P = parseFloat(p),
      R = parseFloat(r) / 100,
      T = parseFloat(t);
    if (!P || !R || !T) return;
    if (type === "simple") {
      const interest = P * R * T;
      setRes({
        interest,
        total: P + interest,
        type: "simple",
        P,
        R: parseFloat(r),
        T,
        table: null,
      });
    } else {
      const n = freqMap[compound];
      const total = P * Math.pow(1 + R / n, n * T);
      const interest = total - P;
      // Year-wise growth table
      const table = [];
      for (let y = 1; y <= Math.min(T, 30); y++) {
        const amt = P * Math.pow(1 + R / n, n * y);
        table.push({ year: y, amount: amt, growth: amt - P });
      }
      setRes({
        interest,
        total,
        type: "compound",
        P,
        R: parseFloat(r),
        T,
        compound,
        table,
      });
    }
  };
  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <ToolWrapper
      title="Loan Interest Calculator — Simple & Compound Interest Online"
      description="Simple aur compound interest dono calculate karo. Quarterly, monthly, semi-annual compounding. FD maturity aur year-wise growth table."
      keywords="loan interest calculator, compound interest quarterly, fd maturity calculator, simple interest india hindi"
      emoji="💰"
      heroColor="linear-gradient(135deg, #1a1a2e, #b45309)"
      toolName="Loan Interest Calculator"
      tagline="Simple · Compound · FD Maturity — year-wise growth table ke saath"
      guideSteps={[
        {
          heading: "Principal daalo",
          text: "Kitna paisa liya ya invest kiya.",
        },
        {
          heading: "Rate aur Time",
          text: "Annual interest rate % aur kitne saal.",
        },
        {
          heading: "Compound frequency chunen",
          text: "FD mein quarterly hoti hai — select karo.",
        },
        {
          heading: "Year-wise table dekho",
          text: "Har saal ka balance aur growth dikhega.",
        },
      ]}
      faqs={[
        {
          q: "Simple aur compound interest mein fark?",
          a: "Simple sirf principal pe. Compound principal + interest dono pe lagta hai — isliye zyada hota hai.",
        },
        {
          q: "FD pe compound interest milta hai?",
          a: "Haan, bank FD pe quarterly compounding hoti hai. Compound + Quarterly select karo.",
        },
        {
          q: "Loan pe kaunsa interest lagta hai?",
          a: "Home/personal/car loan pe reducing balance compound interest. Short-term mein simple bhi hota hai.",
        },
        {
          q: "Quarterly vs Monthly compounding mein fark?",
          a: "Monthly compounding thoda zyada deta hai. ₹1 lakh pe 1 saal mein fark sirf ₹50-100 hota hai practically.",
        },
      ]}
      relatedBlog={{
        slug: "how-emi-is-calculated",
        title: "EMI Aur Interest Kaise Calculate Hota Hai?",
        excerpt: "Bank kaise interest lagate hain — simple language mein.",
      }}
      relatedTools={RT.loan}
    >
      <div className="tp-card">
        <div className="tp-sec-title">💰 Interest Calculate Karo</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["simple", "compound"].map((tt) => (
            <button
              key={tt}
              onClick={() => {
                setType(tt);
                setRes(null);
              }}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 8,
                border: "1.5px solid",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "0.8rem",
                borderColor: type === tt ? "#b45309" : "#e5e7eb",
                background: type === tt ? "#b45309" : "#fff",
                color: type === tt ? "#fff" : "#555",
              }}
            >
              {tt === "simple" ? "📐 Simple Interest" : "📈 Compound Interest"}
            </button>
          ))}
        </div>
        {type === "compound" && (
          <div className="tw-field" style={{ marginBottom: 12 }}>
            <label>🔄 Compounding Frequency</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Object.keys(freqMap).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setCompound(f);
                    setRes(null);
                  }}
                  style={{
                    padding: "7px 10px",
                    borderRadius: 99,
                    border: "1.5px solid",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderColor: compound === f ? "#b45309" : "#e5e7eb",
                    background: compound === f ? "#b45309" : "#fff",
                    color: compound === f ? "#fff" : "#555",
                  }}
                >
                  {freqLabel[f]}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="tw-input-group">
          <div className="tw-field">
            <label>💰 Principal Amount (₹)</label>
            <input
              type="number"
              value={p}
              placeholder="e.g. 100000"
              onChange={(e) => {
                setP(e.target.value);
                setRes(null);
              }}
            />
          </div>
          <div className="tw-field">
            <label>📊 Annual Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={r}
              placeholder="e.g. 7.5"
              onChange={(e) => {
                setR(e.target.value);
                setRes(null);
              }}
            />
          </div>
          <div className="tw-field">
            <label>📅 Time (Years)</label>
            <input
              type="number"
              step="0.5"
              value={t}
              placeholder="e.g. 5"
              onChange={(e) => {
                setT(e.target.value);
                setRes(null);
              }}
            />
          </div>
          <button
            className="tw-calc-btn"
            onClick={calc}
            style={{ background: "linear-gradient(135deg,#92400e,#b45309)" }}
          >
            💰 Calculate Karo
          </button>
        </div>
      </div>
      {res && (
        <>
          <div
            className="tw-result"
            style={{ background: "linear-gradient(135deg,#92400e,#b45309)" }}
          >
            <div className="tw-result-label">
              {res.type === "simple" ? "Simple" : "Compound"} Interest
            </div>
            <div className="tw-result-val">{fmt(res.interest)}</div>
            <div className="tw-result-sub">
              Maturity Amount: {fmt(res.total)}
            </div>
          </div>
          <div className="tp-card">
            <div className="tw-breakdown">
              <div className="tw-brow">
                <span className="tw-brow-label">Principal</span>
                <span className="tw-brow-val">{fmt(res.P)}</span>
              </div>
              <div className="tw-brow">
                <span className="tw-brow-label">Rate</span>
                <span className="tw-brow-val">{res.R}% per year</span>
              </div>
              <div className="tw-brow">
                <span className="tw-brow-label">Time</span>
                <span className="tw-brow-val">{res.T} years</span>
              </div>
              {res.compound && (
                <div className="tw-brow">
                  <span className="tw-brow-label">Compounding</span>
                  <span className="tw-brow-val">{freqLabel[res.compound]}</span>
                </div>
              )}
              <div className="tw-brow">
                <span className="tw-brow-label">Interest Earned</span>
                <span className="tw-brow-val" style={{ color: "#16a34a" }}>
                  {fmt(res.interest)}
                </span>
              </div>
              <div className="tw-brow total">
                <span className="tw-brow-label">Maturity Amount</span>
                <span className="tw-brow-val">{fmt(res.total)}</span>
              </div>
            </div>
          </div>
          {res.table && res.table.length > 1 && (
            <div className="tp-card">
              <div className="tp-sec-title">📈 Year-wise Growth</div>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.75rem",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Year", "Amount", "Growth"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 800,
                            borderBottom: "2px solid #e5e7eb",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {res.table.map((r) => (
                      <tr
                        key={r.year}
                        style={{ borderBottom: "1px solid #f0f0f0" }}
                      >
                        <td
                          style={{
                            padding: "7px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                          }}
                        >
                          {r.year}
                        </td>
                        <td
                          style={{
                            padding: "7px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                          }}
                        >
                          {fmt(r.amount)}
                        </td>
                        <td
                          style={{
                            padding: "7px 6px",
                            textAlign: "right",
                            color: "#16a34a",
                          }}
                        >
                          +{fmt(r.growth)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Interest Calculation Guide</div>
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>
          <p>
            Interest calculation banking aur finance ka basic concept hai. Yeh
            guide aapko simple aur compound interest ke differences,
            calculations, aur real life applications sikhaega.
          </p>

          <h3>1. Simple Interest</h3>
          <ul>
            <li>
              <strong>Formula:</strong> SI = (P × R × T) ÷ 100
            </li>
            <li>
              <strong>Principal:</strong> Original amount
            </li>
            <li>
              <strong>Rate:</strong> Annual interest rate
            </li>
            <li>
              <strong>Time:</strong> Period in years
            </li>
          </ul>

          <h3>2. Compound Interest</h3>
          <ul>
            <li>
              <strong>Formula:</strong> A = P(1 + r/n)^(nt)
            </li>
            <li>
              <strong>Compounding Frequency:</strong> Annually, semi-annually,
              quarterly, monthly
            </li>
            <li>
              <strong>Power of Compounding:</strong> Interest on interest
            </li>
          </ul>

          <h3>3. Types of Interest Rates</h3>
          <ul>
            <li>
              <strong>Nominal Rate:</strong> Stated annual rate
            </li>
            <li>
              <strong>Effective Rate:</strong> Actual annual rate with
              compounding
            </li>
            <li>
              <strong>APR:</strong> Annual Percentage Rate
            </li>
            <li>
              <strong>APY:</strong> Annual Percentage Yield
            </li>
          </ul>

          <h3>4. Banking Products</h3>
          <ul>
            <li>
              <strong>Savings Account:</strong> Low interest, safe
            </li>
            <li>
              <strong>Fixed Deposit:</strong> Higher interest, locked period
            </li>
            <li>
              <strong>Recurring Deposit:</strong> Monthly investment
            </li>
            <li>
              <strong>Loans:</strong> Home, car, personal loans
            </li>
          </ul>

          <h3>5. Investment Options</h3>
          <ul>
            <li>
              <strong>Stocks:</strong> High risk, high return
            </li>
            <li>
              <strong>Bonds:</strong> Fixed income securities
            </li>
            <li>
              <strong>Mutual Funds:</strong> Diversified investments
            </li>
            <li>
              <strong>P2P Lending:</strong> Direct lending
            </li>
          </ul>

          <h3>6. Loan Calculations</h3>
          <ul>
            <li>
              <strong>EMI:</strong> Equated Monthly Installment
            </li>
            <li>
              <strong>Principal Component:</strong> Loan amount repayment
            </li>
            <li>
              <strong>Interest Component:</strong> Interest payment
            </li>
            <li>
              <strong>Prepayment:</strong> Early loan closure
            </li>
          </ul>

          <h3>7. Tax Implications</h3>
          <ul>
            <li>
              <strong>TDS:</strong> Tax Deducted at Source
            </li>
            <li>
              <strong>Section 80C:</strong> Tax deduction on investments
            </li>
            <li>
              <strong>Interest Income:</strong> Taxable under different slabs
            </li>
          </ul>

          <h3>8. Risk Factors</h3>
          <ul>
            <li>
              <strong>Inflation:</strong> Reduces real returns
            </li>
            <li>
              <strong>Interest Rate Changes:</strong> Affect investments
            </li>
            <li>
              <strong>Credit Risk:</strong> Default possibility
            </li>
            <li>
              <strong>Liquidity Risk:</strong> Easy withdrawal
            </li>
          </ul>

          <h3>9. Financial Planning</h3>
          <ul>
            <li>
              <strong>Emergency Fund:</strong> 3-6 months expenses
            </li>
            <li>
              <strong>Retirement Planning:</strong> Long-term savings
            </li>
            <li>
              <strong>Goal-based Investing:</strong> Education, marriage, home
            </li>
            <li>
              <strong>Asset Allocation:</strong> Diversification strategy
            </li>
          </ul>

          <h3>10. Tools & Calculators</h3>
          <ul>
            <li>
              <strong>Online Calculators:</strong> Free interest calculators
            </li>
            <li>
              <strong>Excel Formulas:</strong> Custom calculations
            </li>
            <li>
              <strong>Mobile Apps:</strong> Banking and investment apps
            </li>
            <li>
              <strong>Financial Software:</strong> Advanced planning tools
            </li>
          </ul>

          <p>
            Interest calculation financial literacy ka important part hai. Yeh
            knowledge aapko better investment decisions lene mein help karega.
          </p>
        </div>
      </div>
    </ToolWrapper>
  );
}

// ── Word Counter ──────────────────────────────────────────
export function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const w = text.trim() ? text.trim().split(/\s+/).length : 0;
    const c = text.length;
    const cn = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?।]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const headings = (text.match(/^#{1,6}\s/gm) || []).length;
    const readMin = Math.max(1, Math.ceil(w / 200));
    const freq = {};
    const stopWords = new Set([
      "aur",
      "ka",
      "ki",
      "ke",
      "hai",
      "hain",
      "ko",
      "mein",
      "se",
      "pe",
      "ne",
      "kya",
      "yeh",
      "woh",
      "ek",
      "toh",
      "bhi",
      "ya",
      "lekin",
      "par",
      "tha",
      "thi",
      "the",
      "jo",
    ]);
    text
      .toLowerCase()
      .replace(/[^a-zA-Z\u0900-\u097F\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !stopWords.has(w))
      .forEach((w) => {
        freq[w] = (freq[w] || 0) + 1;
      });
    const topWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const keywordDensity = topWords.map(([word, count]) => ({
      word,
      count,
      density: w > 0 ? ((count / w) * 100).toFixed(1) : "0",
    }));
    return {
      w,
      c,
      cn,
      sentences,
      paragraphs,
      headings,
      readMin,
      topWords,
      keywordDensity,
    };
  }, [text]);

  const copyStats = () => {
    const t = `Word Count Report\nWords: ${stats.w}\nCharacters: ${stats.c}\nSentences: ${stats.sentences}\nReading Time: ${stats.readMin} min`;
    navigator.clipboard.writeText(t).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolWrapper
      title="Word Counter — Online Words, Characters Count Karo"
      description="Words, characters, sentences, reading time, keyword density — sab ek jagah. Blog, SEO article, resume, social media — sab ke liye."
      keywords="word counter, character counter, keyword density, reading time, text analyzer hindi seo"
      emoji="📝"
      heroColor="linear-gradient(135deg, #1a1a2e, #0369a1)"
      toolName="Word Counter"
      tagline="Words · Keyword Density · Reading Time — SEO ke liye perfect"
      guideSteps={[
        {
          heading: "Text paste karo",
          text: "Apna article ya koi bhi text neeche box mein daalo.",
        },
        {
          heading: "Live stats dekho",
          text: "Sab counts automatically update hote hain.",
        },
        {
          heading: "Keyword density check karo",
          text: "Top keywords aur unki density % dekho — SEO ke liye zaroori.",
        },
      ]}
      faqs={[
        {
          q: "Blog ke liye kitne words?",
          a: "SEO ke liye 1000-2000 words ideal. Google detailed content prefer karta hai.",
        },
        {
          q: "Twitter pe kitne characters?",
          a: "Twitter/X: 280. Instagram caption: 2200. WhatsApp status: 700.",
        },
        {
          q: "Keyword density kya hoti hai?",
          a: "Ek keyword kitni baar article mein aaya — total words ke percentage mein. 1-3% ideal hai SEO ke liye.",
        },
        {
          q: "Reading time kaise calculate hota hai?",
          a: "Average 200 words per minute. 1000 words = 5 min read time.",
        },
      ]}
      relatedBlog={{
        slug: "seo-blog-kaise-likhe",
        title: "SEO Blog Kaise Likhen?",
        excerpt: "Google pe rank karne ke liye blog kaise likhein.",
      }}
      relatedTools={RT.word}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📝 Text Daalo</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yahan apna text paste karo ya type karo..."
          style={{
            width: "100%",
            minHeight: 180,
            padding: "12px",
            border: "1.5px solid #e5e7eb",
            borderRadius: 8,
            fontSize: "0.88rem",
            resize: "vertical",
            boxSizing: "border-box",
            fontFamily: "inherit",
            lineHeight: 1.6,
          }}
        />
        {text && (
          <button
            className="tw-calc-btn"
            style={{ marginTop: 8, background: "#dc2626" }}
            onClick={() => setText("")}
          >
            🗑️ Clear
          </button>
        )}
      </div>
      <div className="tp-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div className="tp-sec-title" style={{ margin: 0 }}>
            📊 Statistics
          </div>
          {text && (
            <button
              onClick={copyStats}
              style={{
                padding: "6px 12px",
                background: "#eff6ff",
                border: "1.5px solid #3b82f6",
                borderRadius: 8,
                color: "#1d4ed8",
                fontWeight: 800,
                fontSize: "0.72rem",
                cursor: "pointer",
              }}
            >
              {copied ? "✅ Copied!" : "📋 Copy Stats"}
            </button>
          )}
        </div>
        <div className="tw-breakdown">
          {[
            { label: "📝 Words", val: stats.w.toLocaleString() },
            { label: "🔤 Characters", val: stats.c.toLocaleString() },
            { label: "🔡 Char (no spaces)", val: stats.cn.toLocaleString() },
            { label: "💬 Sentences", val: stats.sentences },
            { label: "📄 Paragraphs", val: stats.paragraphs },
            { label: "⏱️ Reading Time", val: stats.readMin + " min" },
          ].map((r) => (
            <div key={r.label} className="tw-brow">
              <span className="tw-brow-label">{r.label}</span>
              <span className="tw-brow-val">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
      {stats.keywordDensity.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">🔑 Keyword Density (SEO)</div>
          <p style={{ fontSize: "0.72rem", color: "#888", marginBottom: 10 }}>
            1-3% density ideal hai. Zyada = keyword stuffing penalty.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {stats.keywordDensity.map(({ word, count, density }) => (
              <div
                key={word}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{
                    minWidth: 100,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1d4ed8",
                  }}
                >
                  {word}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: "#e5e7eb",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, parseFloat(density) * 20)}%`,
                      height: "100%",
                      background:
                        parseFloat(density) > 3 ? "#ef4444" : "#3b82f6",
                      borderRadius: 99,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#888",
                    minWidth: 50,
                    textAlign: "right",
                  }}
                >
                  {count}x · {density}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">
          📝 Word Counter - Complete Guide to Text Analysis
        </div>
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>
          <h1>
            Word Counter Tool: Master Text Analysis and Writing Optimization
          </h1>

          <p>
            In today's digital age, content creation has become a cornerstone of
            communication, marketing, and education. Whether you're a student
            writing an essay, a blogger crafting engaging posts, a copywriter
            creating compelling advertisements, or a novelist developing your
            next bestseller, understanding your text metrics is crucial. Our
            comprehensive Word Counter tool goes beyond simple counting to
            provide detailed insights into your writing, helping you optimize
            content for better readability, SEO performance, and audience
            engagement.
          </p>

          <h2>Understanding Word Counting Fundamentals</h2>

          <p>
            Word counting might seem straightforward, but there's much more to
            it than meets the eye. At its core, word counting involves analyzing
            text to determine various metrics that help writers and content
            creators understand their work better. Our tool counts words,
            characters (with and without spaces), sentences, paragraphs, and
            even estimates reading time based on average reading speeds.
          </p>

          <h3>What Our Word Counter Measures</h3>
          <ul>
            <li>
              <strong>Word Count:</strong> The total number of words in your
              text
            </li>
            <li>
              <strong>Character Count:</strong> Total characters including
              spaces
            </li>
            <li>
              <strong>Character Count (No Spaces):</strong> Characters excluding
              spaces
            </li>
            <li>
              <strong>Sentence Count:</strong> Number of complete sentences
            </li>
            <li>
              <strong>Paragraph Count:</strong> Number of paragraph breaks
            </li>
            <li>
              <strong>Reading Time:</strong> Estimated time to read the content
            </li>
            <li>
              <strong>Speaking Time:</strong> Estimated time to speak the
              content
            </li>
          </ul>

          <h2>The Importance of Word Counting in Content Creation</h2>

          <p>
            Word counting serves multiple purposes in content creation. For
            students, it ensures assignments meet length requirements. For
            bloggers and content marketers, it helps optimize posts for search
            engines and reader engagement. For copywriters, it ensures content
            fits within specified limits. Understanding these metrics can
            significantly improve your writing process and final output.
          </p>

          <h3>Academic Writing Applications</h3>
          <p>
            In academic settings, word counts are often strictly enforced.
            Essays, research papers, theses, and dissertations all have specific
            length requirements. Our tool helps students and researchers:
          </p>
          <ul>
            <li>Meet assignment specifications</li>
            <li>Track progress during writing</li>
            <li>Ensure consistent document length</li>
            <li>Calculate reading time for presentations</li>
          </ul>

          <h3>Content Marketing and SEO</h3>
          <p>
            Content marketers use word counting to optimize their content for
            search engines and readers. Studies show that content of certain
            lengths performs better in search results:
          </p>
          <ul>
            <li>Blog posts: 1,500-2,500 words for optimal SEO performance</li>
            <li>Listicles: 1,000-2,000 words</li>
            <li>How-to guides: 2,000-3,000 words</li>
            <li>News articles: 600-800 words</li>
          </ul>

          <h2>How to Use Our Word Counter Effectively</h2>

          <h3>Basic Usage</h3>
          <ol>
            <li>Paste or type your text into the input area</li>
            <li>The tool automatically counts words and other metrics</li>
            <li>Review the results in the analysis section</li>
            <li>Use the insights to improve your content</li>
          </ol>

          <h3>Advanced Features</h3>
          <p>
            Our Word Counter includes several advanced features to help you
            analyze your text more deeply:
          </p>

          <h4>Reading Time Estimation</h4>
          <p>
            We calculate reading time based on an average reading speed of
            200-250 words per minute for adults. This helps you understand how
            long it will take your audience to consume your content. Factors
            that affect reading speed include:
          </p>
          <ul>
            <li>Content complexity</li>
            <li>Reader's familiarity with the topic</li>
            <li>Text formatting and structure</li>
            <li>Reader's language proficiency</li>
          </ul>

          <h4>Speaking Time Calculation</h4>
          <p>
            For content creators who also present their work orally (podcasters,
            speakers, educators), we provide speaking time estimates. The
            average speaking rate is about 150 words per minute, though this
            varies by individual and context.
          </p>

          <h2>Writing Optimization Strategies</h2>

          <h3>Achieving Optimal Content Length</h3>
          <p>
            Different types of content perform best at different lengths.
            Understanding these optimal ranges can help you create more
            effective content:
          </p>

          <h4>Blog Posts and Articles</h4>
          <ul>
            <li>
              <strong>Short posts (500-800 words):</strong> Quick reads, social
              media content
            </li>
            <li>
              <strong>Medium posts (1,000-1,500 words):</strong> In-depth
              analysis, how-to guides
            </li>
            <li>
              <strong>Long-form content (2,000+ words):</strong> Comprehensive
              guides, ultimate resources
            </li>
          </ul>

          <h4>Social Media Content</h4>
          <ul>
            <li>
              <strong>Twitter/X:</strong> 280 characters maximum
            </li>
            <li>
              <strong>Facebook:</strong> No strict limit, but 100-200 words
              optimal
            </li>
            <li>
              <strong>LinkedIn:</strong> 1,300-2,000 characters for best
              engagement
            </li>
            <li>
              <strong>Instagram captions:</strong> 125-150 characters optimal
            </li>
          </ul>

          <h3>Improving Readability</h3>
          <p>
            Our tool helps you assess readability through sentence and paragraph
            analysis. Good readability is crucial for keeping readers engaged:
          </p>
          <ul>
            <li>Average sentence length: 15-20 words</li>
            <li>Paragraph length: 3-5 sentences</li>
            <li>Use transition words for better flow</li>
            <li>Break up long paragraphs</li>
          </ul>

          <h2>SEO and Content Marketing Best Practices</h2>

          <h3>Keyword Optimization</h3>
          <p>
            While our Word Counter doesn't perform keyword analysis,
            understanding word count helps with keyword density. Aim for:
          </p>
          <ul>
            <li>Primary keyword: 1-2% density</li>
            <li>Secondary keywords: 0.5-1% density</li>
            <li>Long-tail keywords: Natural placement</li>
          </ul>

          <h3>Content Structure</h3>
          <p>
            Well-structured content performs better in search results and keeps
            readers engaged:
          </p>
          <ul>
            <li>Use headings (H1, H2, H3) to break up content</li>
            <li>Include an introduction and conclusion</li>
            <li>Add internal and external links</li>
            <li>Use bullet points and numbered lists</li>
          </ul>

          <h2>Common Word Counting Mistakes to Avoid</h2>

          <h3>Including Non-Content Elements</h3>
          <ul>
            <li>Headers and footers in word count</li>
            <li>Footnotes and endnotes</li>
            <li>Captions and image alt text</li>
            <li>References and bibliographies</li>
          </ul>

          <h3>Ignoring Context</h3>
          <p>Word count alone doesn't determine content quality. Consider:</p>
          <ul>
            <li>Content relevance and accuracy</li>
            <li>Reader engagement and value</li>
            <li>Visual elements and formatting</li>
            <li>Call-to-action effectiveness</li>
          </ul>

          <h2>Industry-Specific Applications</h2>

          <h3>Academic Writing</h3>
          <p>
            Students and researchers use word counters to ensure compliance with
            academic standards. Different institutions and journals have varying
            requirements for word counts in:
          </p>
          <ul>
            <li>Research abstracts (150-250 words)</li>
            <li>Literature reviews (1,000-2,000 words)</li>
            <li>Thesis chapters (5,000-10,000 words)</li>
            <li>Conference papers (2,000-5,000 words)</li>
          </ul>

          <h3>Professional Writing</h3>
          <p>Business professionals use word counting for various purposes:</p>
          <ul>
            <li>Email length optimization</li>
            <li>Report writing guidelines</li>
            <li>Proposal development</li>
            <li>Content marketing campaigns</li>
          </ul>

          <h3>Creative Writing</h3>
          <p>Authors and creative writers track word counts for:</p>
          <ul>
            <li>Daily writing goals</li>
            <li>Novel length requirements</li>
            <li>Short story competitions</li>
            <li>Poetry submissions</li>
          </ul>

          <h2>Tools and Software Integration</h2>

          <p>
            Our online Word Counter works seamlessly with other writing tools:
          </p>

          <h3>Word Processors</h3>
          <ul>
            <li>Microsoft Word: Built-in word count with real-time updates</li>
            <li>Google Docs: Collaborative word counting</li>
            <li>Apple Pages: Integrated counting features</li>
            <li>LibreOffice: Free alternative with counting tools</li>
          </ul>

          <h3>Writing Applications</h3>
          <ul>
            <li>Scrivener: Advanced project management with word tracking</li>
            <li>Ulysses: Distraction-free writing with detailed statistics</li>
            <li>Grammarly: Writing enhancement with word count</li>
            <li>Hemingway Editor: Readability analysis</li>
          </ul>

          <h2>Future of Text Analysis</h2>

          <p>
            As technology advances, word counting tools are becoming more
            sophisticated:
          </p>

          <h3>AI-Powered Analysis</h3>
          <ul>
            <li>Sentiment analysis</li>
            <li>Content quality scoring</li>
            <li>Readability algorithms</li>
            <li>Automated editing suggestions</li>
          </ul>

          <h3>Multilingual Support</h3>
          <ul>
            <li>Cross-language word counting</li>
            <li>Character encoding handling</li>
            <li>Cultural context analysis</li>
            <li>Translation word count estimation</li>
          </ul>

          <h3>Real-Time Collaboration</h3>
          <ul>
            <li>Live word count sharing</li>
            <li>Team writing goals</li>
            <li>Progress tracking</li>
            <li>Instant feedback systems</li>
          </ul>

          <h2>Tips for Better Writing</h2>

          <h3>Set Clear Goals</h3>
          <p>
            Before you start writing, define your word count goals based on your
            content type and audience. This helps you stay focused and ensures
            your content meets expectations.
          </p>

          <h3>Track Your Progress</h3>
          <p>
            Use our tool regularly to monitor your writing progress. Set daily
            or weekly word count targets and track your achievements over time.
          </p>

          <h3>Focus on Quality</h3>
          <p>
            While word count is important, never sacrifice quality for quantity.
            Ensure every word adds value to your content and serves your
            readers' needs.
          </p>

          <h3>Edit Ruthlessly</h3>
          <p>
            After reaching your word count goal, review your content and remove
            unnecessary words. Aim for clarity and conciseness in your final
            draft.
          </p>

          <h2>Conclusion: Mastering Text Analysis</h2>

          <p>
            Our Word Counter tool is more than just a counting utility—it's a
            comprehensive writing companion that helps you create better
            content. By understanding word counts, reading times, and other text
            metrics, you can optimize your writing for maximum impact and
            engagement.
          </p>

          <p>
            Whether you're a student meeting assignment requirements, a blogger
            optimizing for SEO, or a professional creating compelling content,
            our tool provides the insights you need to succeed. Start using it
            today and take your writing to the next level.
          </p>

          <p>
            Remember, great writing isn't just about hitting word counts—it's
            about creating valuable, engaging content that resonates with your
            audience. Use our Word Counter as part of your writing toolkit to
            achieve writing excellence.
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
            }}
          >
            <h4>Related Tools:</h4>
            <ul>
              <li>
                <a href="/tools/gst-calculator">GST Calculator</a> - Calculate
                GST amounts and invoices
              </li>
              <li>
                <a href="/tools/emi-calculator">EMI Calculator</a> - Calculate
                loan EMIs
              </li>
              <li>
                <a href="/tools/profit-margin-calculator">
                  Profit Margin Calculator
                </a>{" "}
                - Calculate business profits
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
}

// ── QR Code Generator ─────────────────────────────────────
export function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("text");
  const [size, setSize] = useState(200);
  const [color, setColor] = useState("0c831f");
  const [qrUrl, setQrUrl] = useState("");
  // vCard fields
  const [vcName, setVcName] = useState("");
  const [vcPhone, setVcPhone] = useState("");
  const [vcEmail, setVcEmail] = useState("");
  const [vcOrg, setVcOrg] = useState("");

  const TYPES = [
    { id: "text", label: "📝 URL/Text" },
    { id: "upi", label: "💳 UPI" },
    { id: "wa", label: "💬 WhatsApp" },
    { id: "email", label: "📧 Email" },
    { id: "sms", label: "📱 SMS" },
    { id: "vcard", label: "👤 Contact Card" },
  ];

  const COLORS = [
    { hex: "0c831f", label: "🟢 Green" },
    { hex: "1565c0", label: "🔵 Blue" },
    { hex: "dc2626", label: "🔴 Red" },
    { hex: "1a1a2e", label: "⚫ Black" },
    { hex: "7c3aed", label: "🟣 Purple" },
    { hex: "b45309", label: "🟠 Orange" },
  ];

  const generate = () => {
    let data = "";
    if (type === "vcard") {
      data = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nORG:${vcOrg}\nEND:VCARD`;
    } else {
      if (!input.trim()) return;
      data = input.trim();
      if (type === "upi")
        data = `upi://pay?pa=${encodeURIComponent(input)}&cu=INR`;
      if (type === "wa") data = `https://wa.me/${input.replace(/\D/g, "")}`;
      if (type === "email") data = `mailto:${input}`;
      if (type === "sms") data = `sms:${input}`;
    }
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&color=${color}&bgcolor=ffffff`,
    );
  };

  return (
    <ToolWrapper
      title="QR Code Generator — Free Online QR Code Banao"
      description="URL, UPI ID, WhatsApp, Contact Card (vCard), SMS — sab ke liye free QR code. Custom color aur size. Download PNG."
      keywords="qr code generator free, upi qr code, vcard qr code, contact card qr, whatsapp qr, custom color qr hindi"
      emoji="📱"
      heroColor="linear-gradient(135deg, #1a1a2e, #0c831f)"
      toolName="QR Code Generator"
      tagline="URL · UPI · Contact Card · Custom Color — sab free mein"
      guideSteps={[
        {
          heading: "Type chunen",
          text: "URL, UPI, WhatsApp, Email, SMS ya Contact Card.",
        },
        { heading: "Details daalo", text: "Apna URL, UPI ID ya contact info." },
        {
          heading: "Color choose karo",
          text: "Brand ke hisab se color select karo.",
        },
        {
          heading: "Download karo",
          text: "PNG mein download karo — print ke liye ready.",
        },
      ]}
      faqs={[
        {
          q: "UPI QR code kaise banate hain?",
          a: "UPI type select karo, apna UPI ID daalo (e.g. name@upi) — customer scan karke directly pay karega.",
        },
        {
          q: "Contact Card QR kya hota hai?",
          a: "vCard QR code scan karne se automatically contact phone mein save ho jaata hai — business card ka modern alternative.",
        },
        {
          q: "Print ke liye QR kitna bada?",
          a: "300x300 pixels minimum. Slider se 400x400 choose karo print ke liye — clear scan hoga.",
        },
        {
          q: "QR code free mein download ho sakta hai?",
          a: "Haan, bilkul. Download PNG button se image save karo — koi charge nahi.",
        },
      ]}
      relatedBlog={{
        slug: "upi-qr-code-business",
        title: "Dukaan Ke Liye UPI QR Code Kaise Banayein?",
        excerpt: "QR code se digital payment lena shuru karo — 2 minute mein.",
      }}
      relatedTools={RT.qr}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📱 QR Code Banao</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 14,
          }}
        >
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setType(t.id);
                setQrUrl("");
              }}
              style={{
                padding: "7px 12px",
                borderRadius: 99,
                border: "1.5px solid",
                fontSize: "0.74rem",
                fontWeight: 700,
                cursor: "pointer",
                borderColor: type === t.id ? "#0c831f" : "#e5e7eb",
                background: type === t.id ? "#0c831f" : "#fff",
                color: type === t.id ? "#fff" : "#555",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {type === "vcard" ? (
          <div className="tw-input-group">
            <div className="tw-field">
              <label>👤 Full Name</label>
              <input
                type="text"
                value={vcName}
                placeholder="e.g. Rahul Sharma"
                onChange={(e) => {
                  setVcName(e.target.value);
                  setQrUrl("");
                }}
              />
            </div>
            <div className="tw-field">
              <label>📱 Phone Number</label>
              <input
                type="text"
                value={vcPhone}
                placeholder="e.g. +919258133689"
                onChange={(e) => {
                  setVcPhone(e.target.value);
                  setQrUrl("");
                }}
              />
            </div>
            <div className="tw-field">
              <label>📧 Email</label>
              <input
                type="email"
                value={vcEmail}
                placeholder="e.g. rahul@email.com"
                onChange={(e) => {
                  setVcEmail(e.target.value);
                  setQrUrl("");
                }}
              />
            </div>
            <div className="tw-field">
              <label>🏢 Organization</label>
              <input
                type="text"
                value={vcOrg}
                placeholder="e.g. Almenso Store"
                onChange={(e) => {
                  setVcOrg(e.target.value);
                  setQrUrl("");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="tw-input-group">
            <div className="tw-field">
              <label>
                {type === "upi"
                  ? "UPI ID"
                  : type === "wa"
                    ? "WhatsApp Number"
                    : type === "email"
                      ? "Email"
                      : type === "sms"
                        ? "Phone Number"
                        : "URL ya Text"}
              </label>
              <input
                type="text"
                value={input}
                placeholder={
                  type === "upi"
                    ? "name@upi"
                    : type === "wa"
                      ? "919258133689"
                      : type === "email"
                        ? "example@gmail.com"
                        : "https://almenso.com"
                }
                onChange={(e) => {
                  setInput(e.target.value);
                  setQrUrl("");
                }}
              />
            </div>
          </div>
        )}

        <div className="tw-field" style={{ marginTop: 8 }}>
          <label>🎨 QR Color</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  setColor(c.hex);
                  setQrUrl("");
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: `2px solid ${color === c.hex ? "#1a1a2e" : "#e5e7eb"}`,
                  background: color === c.hex ? "#f0f0f0" : "#fff",
                  cursor: "pointer",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tw-field" style={{ marginTop: 8 }}>
          <label>
            📐 Size: {size}×{size}px
          </label>
          <input
            type="range"
            min={100}
            max={400}
            step={50}
            value={size}
            onChange={(e) => {
              setSize(+e.target.value);
              setQrUrl("");
            }}
          />
        </div>

        <button
          className="tw-calc-btn"
          style={{ marginTop: 8 }}
          onClick={generate}
        >
          📱 QR Code Generate Karo
        </button>
      </div>

      {qrUrl && (
        <div className="tp-card" style={{ textAlign: "center" }}>
          <div className="tp-sec-title">✅ Aapka QR Code Ready Hai</div>
          <img
            loading="lazy"
            src={qrUrl}
            alt="QR Code"
            style={{
              borderRadius: 12,
              border: "3px solid #0c831f",
              maxWidth: "100%",
              display: "block",
              margin: "0 auto 16px",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={qrUrl}
              download="almenso-qr-code.png"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#0c831f",
                color: "#fff",
                borderRadius: 99,
                fontWeight: 800,
                fontSize: "0.82rem",
                textDecoration: "none",
              }}
            >
              ⬇️ Download PNG
            </a>
            <button
              className="tw-calc-btn"
              style={{ maxWidth: 160, margin: 0, background: "#1a1a2e" }}
              onClick={() => window.open(qrUrl, "_blank")}
            >
              🔗 Full Size Open
            </button>
          </div>
          <p style={{ fontSize: "0.72rem", color: "#aaa", marginTop: 10 }}>
            Mobile pe: long press karke bhi save kar sakte ho
          </p>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">
          📱 QR Code Generator - Complete Guide to Digital Connectivity
        </div>
        <div style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>
          <h1>
            QR Code Generator: The Ultimate Guide to Creating Digital
            Connections
          </h1>

          <p>
            In today's fast-paced digital world, QR codes have become an
            essential tool for businesses, marketers, and individuals looking to
            bridge the gap between physical and digital experiences. Our
            comprehensive QR Code Generator empowers you to create custom QR
            codes for various purposes, from simple URL sharing to complex
            contact information storage. This guide will walk you through
            everything you need to know about QR codes and how to use our tool
            effectively.
          </p>

          <h2>Understanding QR Codes: The Basics</h2>

          <p>
            QR (Quick Response) codes are two-dimensional barcodes that can
            store various types of data. Unlike traditional barcodes that can
            only be read horizontally, QR codes can be scanned from any
            direction and contain much more information. They were invented in
            1994 by Denso Wave, a Japanese company, and have since
            revolutionized how we share and access information.
          </p>

          <h3>How QR Codes Work</h3>
          <p>
            QR codes consist of black squares arranged on a white background in
            a square grid pattern. The code contains positioning markers in
            three corners that help scanners determine the code's orientation.
            The data is encoded using a combination of black and white modules,
            with error correction capabilities that allow the code to be read
            even if partially damaged.
          </p>

          <h2>Types of QR Codes Our Generator Supports</h2>

          <h3>URL/Text QR Codes</h3>
          <p>
            The most common type of QR code, used for sharing website links,
            social media profiles, or any text information. When scanned, these
            codes typically open the URL in the user's browser or display the
            text content.
          </p>

          <h3>UPI Payment QR Codes</h3>
          <p>
            Specifically designed for digital payments in India, UPI QR codes
            allow customers to make instant payments by scanning the code with
            their UPI-enabled apps like Google Pay, PhonePe, or Paytm. These
            codes contain your UPI ID and can be used for both personal and
            business transactions.
          </p>

          <h3>WhatsApp QR Codes</h3>
          <p>
            Direct links to WhatsApp chats. When scanned, these codes open
            WhatsApp with a pre-filled phone number, making it easy for
            customers to start conversations with your business.
          </p>

          <h3>Email QR Codes</h3>
          <p>
            QR codes that open the user's email client with a pre-filled
            recipient address. Perfect for business cards, marketing materials,
            or any situation where you want to make it easy for people to
            contact you via email.
          </p>

          <h3>SMS QR Codes</h3>
          <p>
            Codes that open the user's SMS app with a pre-filled phone number.
            Useful for customer service hotlines, appointment booking, or any
            direct communication needs.
          </p>

          <h3>Contact Card (vCard) QR Codes</h3>
          <p>
            Digital business cards that contain complete contact information.
            When scanned, these codes can automatically add the contact details
            to the user's phone book, including name, phone number, email, and
            organization.
          </p>

          <h2>Business Applications of QR Codes</h2>

          <h3>Retail and E-commerce</h3>
          <ul>
            <li>
              <strong>Product Information:</strong> Link to detailed product
              descriptions, reviews, or tutorials
            </li>
            <li>
              <strong>Payment Processing:</strong> UPI QR codes for quick
              checkout
            </li>
            <li>
              <strong>Loyalty Programs:</strong> Scan to join rewards programs
              or access exclusive offers
            </li>
            <li>
              <strong>Inventory Management:</strong> Track products and access
              supplier information
            </li>
          </ul>

          <h3>Marketing and Advertising</h3>
          <ul>
            <li>
              <strong>Campaign Tracking:</strong> Monitor which marketing
              materials are most effective
            </li>
            <li>
              <strong>Social Media Integration:</strong> Direct links to social
              media profiles or campaigns
            </li>
            <li>
              <strong>Event Promotion:</strong> Easy access to event details,
              registration, or ticketing
            </li>
            <li>
              <strong>Brand Engagement:</strong> Interactive experiences and
              contests
            </li>
          </ul>

          <h3>Healthcare and Education</h3>
          <ul>
            <li>
              <strong>Patient Information:</strong> Access to medical records or
              appointment details
            </li>
            <li>
              <strong>Educational Resources:</strong> Links to course materials,
              videos, or assessments
            </li>
            <li>
              <strong>Certificate Verification:</strong> Digital certificates
              with verification links
            </li>
            <li>
              <strong>Library Systems:</strong> Book information and borrowing
              systems
            </li>
          </ul>

          <h2>Creating Effective QR Codes: Best Practices</h2>

          <h3>Design Considerations</h3>
          <p>
            The visual design of your QR code can impact its effectiveness. Our
            generator allows you to customize colors to match your brand
            identity.
          </p>

          <h4>Color Selection</h4>
          <ul>
            <li>
              <strong>High Contrast:</strong> Dark code on light background for
              better scanning
            </li>
            <li>
              <strong>Brand Colors:</strong> Incorporate your brand colors when
              possible
            </li>
            <li>
              <strong>Accessibility:</strong> Ensure sufficient contrast for all
              users
            </li>
            <li>
              <strong>Background:</strong> White or very light backgrounds work
              best
            </li>
          </ul>

          <h4>Size Guidelines</h4>
          <ul>
            <li>
              <strong>Minimum Size:</strong> 2cm x 2cm for close-range scanning
            </li>
            <li>
              <strong>Print Quality:</strong> 300x300 pixels minimum for printed
              materials
            </li>
            <li>
              <strong>Digital Display:</strong> 200x200 pixels sufficient for
              screens
            </li>
            <li>
              <strong>Outdoor Use:</strong> Larger sizes (5cm+) for outdoor
              applications
            </li>
          </ul>

          <h3>Content Optimization</h3>
          <p>What you put in your QR code matters as much as how it looks.</p>

          <h4>URL Shortening</h4>
          <p>
            Long URLs can make QR codes more complex and harder to scan. Use URL
            shorteners to create cleaner, more reliable codes.
          </p>

          <h4>Error Correction</h4>
          <p>
            QR codes have built-in error correction that allows them to be read
            even if partially damaged or obscured. Higher error correction
            levels create more complex codes but are more reliable.
          </p>

          <h2>Technical Specifications and Limitations</h2>

          <h3>Data Capacity</h3>
          <ul>
            <li>
              <strong>Numeric:</strong> Up to 7,089 characters
            </li>
            <li>
              <strong>Alphanumeric:</strong> Up to 4,296 characters
            </li>
            <li>
              <strong>Binary:</strong> Up to 2,953 bytes
            </li>
            <li>
              <strong>Kanji:</strong> Up to 1,817 characters
            </li>
          </ul>

          <h3>Scanning Requirements</h3>
          <ul>
            <li>
              <strong>Camera Quality:</strong> Most modern smartphones can scan
              QR codes
            </li>
            <li>
              <strong>Lighting:</strong> Adequate lighting improves scanning
              success
            </li>
            <li>
              <strong>Distance:</strong> Typically 6-12 inches from the camera
            </li>
            <li>
              <strong>Angle:</strong> Can be scanned from various angles
            </li>
          </ul>

          <h2>Security and Privacy Considerations</h2>

          <h3>Dynamic vs Static QR Codes</h3>
          <p>
            Our generator creates static QR codes, which contain fixed
            information. For applications requiring frequent updates or
            tracking, consider dynamic QR codes that can be changed after
            creation.
          </p>

          <h3>Privacy Concerns</h3>
          <ul>
            <li>
              <strong>Data Collection:</strong> Be transparent about what
              information you're collecting
            </li>
            <li>
              <strong>Personal Information:</strong> Avoid including sensitive
              personal data in QR codes
            </li>
            <li>
              <strong>Tracking:</strong> Inform users if QR codes are used for
              analytics
            </li>
          </ul>

          <h2>Integration with Other Technologies</h2>

          <h3>Mobile Apps</h3>
          <p>QR codes work seamlessly with mobile applications:</p>
          <ul>
            <li>
              <strong>Payment Apps:</strong> UPI, Google Pay, Apple Pay
            </li>
            <li>
              <strong>Social Media:</strong> Instagram, Facebook, Twitter
            </li>
            <li>
              <strong>Communication:</strong> WhatsApp, Telegram, Signal
            </li>
            <li>
              <strong>Productivity:</strong> Evernote, Google Keep, Microsoft
              Office
            </li>
          </ul>

          <h3>IoT and Smart Devices</h3>
          <p>
            QR codes are increasingly used in Internet of Things applications:
          </p>
          <ul>
            <li>
              <strong>Product Authentication:</strong> Verify genuine products
            </li>
            <li>
              <strong>Device Setup:</strong> Easy configuration of smart devices
            </li>
            <li>
              <strong>Maintenance:</strong> Access to service manuals and
              support
            </li>
          </ul>

          <h2>Future Trends in QR Code Technology</h2>

          <h3>Advanced Features</h3>
          <ul>
            <li>
              <strong>Animated QR Codes:</strong> Eye-catching designs that
              still scan correctly
            </li>
            <li>
              <strong>Color QR Codes:</strong> More visually appealing while
              maintaining functionality
            </li>
            <li>
              <strong>Micro QR Codes:</strong> Smaller versions for
              space-constrained applications
            </li>
            <li>
              <strong>Encrypted QR Codes:</strong> Secure data transmission
            </li>
          </ul>

          <h3>Integration with AI</h3>
          <p>Artificial intelligence is enhancing QR code capabilities:</p>
          <ul>
            <li>
              <strong>Smart Recognition:</strong> AI-powered scanning for better
              accuracy
            </li>
            <li>
              <strong>Contextual Actions:</strong> Intelligent responses based
              on scan context
            </li>
            <li>
              <strong>Personalization:</strong> Dynamic content based on user
              preferences
            </li>
          </ul>

          <h2>Legal and Regulatory Considerations</h2>

          <h3>Intellectual Property</h3>
          <ul>
            <li>
              <strong>QR Code Patents:</strong> Basic QR technology is
              patent-free
            </li>
            <li>
              <strong>Design Protection:</strong> Custom designs may be
              trademarked
            </li>
            <li>
              <strong>Content Rights:</strong> Ensure you have rights to linked
              content
            </li>
          </ul>

          <h3>Industry Regulations</h3>
          <ul>
            <li>
              <strong>Payment Regulations:</strong> UPI and payment QR codes
              must comply with RBI guidelines
            </li>
            <li>
              <strong>Data Protection:</strong> GDPR, CCPA compliance for user
              data
            </li>
            <li>
              <strong>Advertising Standards:</strong> Truthful and
              non-misleading content
            </li>
          </ul>

          <h2>Measuring QR Code Effectiveness</h2>

          <h3>Analytics and Tracking</h3>
          <p>Track how your QR codes perform:</p>
          <ul>
            <li>
              <strong>Scan Rates:</strong> How often codes are scanned
            </li>
            <li>
              <strong>Conversion Rates:</strong> Actions taken after scanning
            </li>
            <li>
              <strong>Geographic Data:</strong> Where scans are happening
            </li>
            <li>
              <strong>Device Information:</strong> What devices are used for
              scanning
            </li>
          </ul>

          <h3>A/B Testing</h3>
          <p>Test different QR code designs and placements:</p>
          <ul>
            <li>
              <strong>Size Variations:</strong> Different sizes for different
              applications
            </li>
            <li>
              <strong>Color Schemes:</strong> Brand colors vs. high-contrast
              designs
            </li>
            <li>
              <strong>Placement:</strong> Different locations and contexts
            </li>
            <li>
              <strong>Call-to-Action:</strong> Different prompts to scan
            </li>
          </ul>

          <h2>Troubleshooting Common Issues</h2>

          <h3>Scanning Problems</h3>
          <ul>
            <li>
              <strong>Poor Lighting:</strong> Ensure adequate lighting when
              scanning
            </li>
            <li>
              <strong>Damage:</strong> Avoid printing over or damaging QR codes
            </li>
            <li>
              <strong>Size Issues:</strong> Make sure codes are large enough to
              scan
            </li>
            <li>
              <strong>Resolution:</strong> High-resolution printing for best
              results
            </li>
          </ul>

          <h3>Content Issues</h3>
          <ul>
            <li>
              <strong>Broken Links:</strong> Regularly check that linked content
              still exists
            </li>
            <li>
              <strong>Outdated Information:</strong> Keep contact details and
              links current
            </li>
            <li>
              <strong>Compatibility:</strong> Ensure content works across
              different devices
            </li>
          </ul>

          <h2>Conclusion: The Power of QR Codes</h2>

          <p>
            QR codes have evolved from simple barcodes to powerful tools that
            connect the physical and digital worlds. Our QR Code Generator
            provides you with the flexibility to create codes for any purpose,
            from simple URL sharing to complex contact information storage.
          </p>

          <p>
            Whether you're a business owner looking to streamline payments, a
            marketer creating engaging campaigns, or an individual sharing
            contact information, QR codes offer a convenient and effective
            solution. Start creating your QR codes today and discover how this
            technology can enhance your digital presence.
          </p>

          <p>
            Remember, the key to successful QR code implementation lies in
            understanding your audience, choosing the right type of code, and
            ensuring it provides value to the user. With our comprehensive
            generator and this guide, you're well-equipped to create QR codes
            that work effectively for your needs.
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
            }}
          >
            <h4>Related Tools:</h4>
            <ul>
              <li>
                <a href="#word-counter">Word Counter</a> - Analyze text content
                and readability
              </li>
              <li>
                <a href="#age-calculator">Age Calculator</a> - Calculate age and
                time differences
              </li>
              <li>
                <a href="#percentage-calculator">Percentage Calculator</a> -
                Calculate percentages and ratios
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
}

// ── Default export wrapper for lazy loading ──
const TOOL_MAP = {
  PercentageCalculator,
  ProfitMarginCalculator,
  LoanInterestCalculator,
  WordCounter,
  QRCodeGenerator,
};

export default function OtherTools({ toolName }) {
  const Tool = TOOL_MAP[toolName];
  if (!Tool)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
        Tool not found
      </div>
    );
  return <Tool />;
}

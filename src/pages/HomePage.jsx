/**
 * ALMENSO HOMEPAGE — Admin Controlled
 * Sab settings Admin Panel → Homepage tab se control hoti hain
 *
 * v3 IMPROVEMENTS:
 * - Tool-first hero: "170+ Free Tools & Calculators — All in One Place"
 * - Hero sub mentions local services for SEO
 * - "Call Now" button in hero CTAs
 * - WhatsApp button tooltip: "Chat for Electrician Service"
 * - Float card: "Call Electrician Now" CTA + improved spacing
 * - Tools section: Popular/Trending labels + category pills
 * - Local SEO section: "Best Electrician in Haldwani" with trust badges
 * - Internal linking block (solar, interior, tools, blog)
 */
import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { useSettings } from "../context/SettingsContext";
import { initAnalytics } from "../utils/analytics";
import "./HomePage.css";

const SERVICES_META = [
  {
    id: "electrician",
    emoji: "⚡",
    path: "/electrician-haldwani",
    points: [
      "Home Wiring & Rewiring",
      "Inverter Install",
      "AC Repair",
      "Fan Fitting",
      "MCB / DB Box",
    ],
    accent: "#dbeafe",
    accentDark: "#1d4ed8",
    settingKeys: {
      show: "hp_showElectrician",
      badge: "hp_elec_badge",
      tagline: "hp_elec_tagline",
      price: "hp_elec_price",
    },
    title: "Electrician Service",
  },
  {
    id: "solar",
    emoji: "☀️",
    path: "/solar-solutions",
    points: [
      "1kW–10kW Solar System",
      "Inverter + Battery",
      "Solar Geyser",
      "Car Battery",
      "Free Site Visit",
    ],
    accent: "#fef3c7",
    accentDark: "#b45309",
    settingKeys: {
      show: "hp_showSolar",
      badge: "hp_solar_badge",
      tagline: "hp_solar_tagline",
      price: "hp_solar_price",
    },
    title: "Solar & Battery",
  },
  {
    id: "interior",
    emoji: "🏠",
    path: "/interior-design",
    points: [
      "Modular Kitchen",
      "Wardrobe & Almirah",
      "TV Panel",
      "False Ceiling",
      "Wall Texture",
    ],
    accent: "#ede9fe",
    accentDark: "#7c3aed",
    settingKeys: {
      show: "hp_showInterior",
      badge: "hp_int_badge",
      tagline: "hp_int_tagline",
      price: "hp_int_price",
    },
    title: "Interior Design",
  },
];

/* ─── SERVICE CARD ────────────────────────────────────────────── */
const ServiceCard = memo(function ServiceCard({ s, onClick }) {
  const isElectrician = s.id === "electrician";
  const priceText =
    s.price || (isElectrician ? "Starting ₹150" : "Free estimate");
  const ctaText = isElectrician
    ? "⚡ Book Electrician Now"
    : "Book Now — Free Estimate →";
  return (
    <div
      className="hsc-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div
        className="hsc-top"
        style={{
          background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
        }}
      >
        <span className="hsc-emoji">{s.emoji}</span>
        {s.badge && (
          <span className="hsc-badge" style={{ background: s.accentDark }}>
            {s.badge}
          </span>
        )}
      </div>
      <div className="hsc-body">
        <div className="hsc-title">{s.title}</div>
        {isElectrician && (
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Same Day · Available Today
          </span>
        )}
        <div className="hsc-tagline">{s.tagline}</div>
        {isElectrician && (
          <div className="mt-3 text-sm font-semibold text-emerald-700">
            30–60 min arrival
          </div>
        )}
        <ul className="hsc-points">
          {s.points.map((p) => (
            <li key={p}>
              <span style={{ color: s.accentDark }}>✓</span> {p}
            </li>
          ))}
        </ul>
        <div className="hsc-price" style={{ color: s.accentDark }}>
          {priceText}
        </div>
      </div>
      <div className="hsc-footer">
        <button
          className="hsc-cta"
          style={{
            background: isElectrician ? "#059669" : s.accentDark,
            boxShadow: isElectrician
              ? "0 10px 26px rgba(6, 182, 148, 0.16)"
              : undefined,
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
});

/* ─── TESTIMONIAL CARD ────────────────────────────────────────── */
const TestiCard = memo(function TestiCard({ t, idx }) {
  return (
    <div className="htesti-card" style={{ animationDelay: `${idx * 80}ms` }}>
      <div className="htesti-quote">"</div>
      <p className="htesti-text">{t.text}</p>
      <div className="htesti-bottom">
        <div
          className="htesti-avatar"
          style={{
            background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)`,
          }}
        >
          {t.initials}
        </div>
        <div>
          <div className="htesti-name">{t.name}</div>
          <div className="htesti-meta">
            📍 {t.city} · {t.service}
          </div>
        </div>
        <div className="htesti-stars">{"★".repeat(t.rating)}</div>
      </div>
    </div>
  );
});

/* ─── TOP TOOLS GRID ──────────────────────────────────────────── */
const TopToolsGrid = memo(function TopToolsGrid() {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const featuredIds = Array.isArray(settings.featuredTools)
    ? settings.featuredTools
    : [];

  const TOOL_MAP = {
    "gst-calculator": {
      name: "GST Calculator",
      emoji: "🧾",
      slug: "gst-calculator",
      description: "GST calculate karo",
    },
    "emi-calculator": {
      name: "EMI Calculator",
      emoji: "🏦",
      slug: "emi-calculator",
      description: "Loan EMI nikalo",
    },
    bijli: {
      name: "Bijli Bill Calculator",
      emoji: "⚡",
      slug: "bijli",
      description: "UPCL bill check karo",
    },
    "solar-roi": {
      name: "Solar ROI Calculator",
      emoji: "☀️",
      slug: "solar-roi",
      description: "Solar savings calculate",
    },
    "image-compressor": {
      name: "Image Compressor",
      emoji: "🗜️",
      slug: "image-compressor",
      description: "Image size kam karo",
    },
    "bmi-calculator": {
      name: "BMI Calculator",
      emoji: "⚖️",
      slug: "bmi-calculator",
      description: "Health check karo",
    },
    "password-generator": {
      name: "Password Generator",
      emoji: "🔐",
      slug: "password-generator",
      description: "Strong password banao",
    },
    "qr-code-generator": {
      name: "QR Code Generator",
      emoji: "📱",
      slug: "qr-code-generator",
      description: "QR code banao free",
    },
    "word-counter": {
      name: "Word Counter",
      emoji: "📝",
      slug: "word-counter",
      description: "Words count karo",
    },
    "discount-calculator": {
      name: "Discount Calculator",
      emoji: "💸",
      slug: "discount-calculator",
      description: "Sale price nikalo",
    },
    "currency-converter": {
      name: "Currency Converter",
      emoji: "💱",
      slug: "currency-converter",
      description: "Currency convert karo",
    },
    "age-calculator": {
      name: "Age Calculator",
      emoji: "🎂",
      slug: "age-calculator",
      description: "Exact umar nikalo",
    },
    "temperature-converter": {
      name: "Temperature Converter",
      emoji: "🌡️",
      slug: "temperature-converter",
      description: "°C °F convert karo",
    },
    "hashtag-generator": {
      name: "Hashtag Generator",
      emoji: "#️⃣",
      slug: "hashtag-generator",
      description: "Instagram hashtags",
    },
    "percentage-calculator": {
      name: "Percentage Calculator",
      emoji: "📊",
      slug: "percentage-calculator",
      description: "% calculate karo",
    },
    "json-formatter": {
      name: "JSON Formatter",
      emoji: "💻",
      slug: "json-formatter",
      description: "JSON format karo",
    },
    "inverter-load-planner": {
      name: "Inverter Load Planner",
      emoji: "🔋",
      slug: "inverter-load-planner",
      description: "Battery size plan karo",
    },
    "instagram-caption-generator": {
      name: "Instagram Caption",
      emoji: "📸",
      slug: "instagram-caption-generator",
      description: "Caption generate karo",
    },
    "loan-calculator": {
      name: "Loan Calculator",
      emoji: "💰",
      slug: "loan-calculator",
      description: "Loan EMI calculate",
    },
    "calorie-calculator": {
      name: "Calorie Calculator",
      emoji: "🔥",
      slug: "calorie-calculator",
      description: "Daily calories plan karo",
    },
  };

  let topTools = [];
  if (featuredIds.length > 0) {
    topTools = featuredIds
      .map((id) => TOOL_MAP[id])
      .filter(Boolean)
      .slice(0, 6);
  }
  if (topTools.length === 0) {
    topTools = [
      TOOL_MAP["bijli"],
      TOOL_MAP["gst-calculator"],
      TOOL_MAP["emi-calculator"],
      TOOL_MAP["image-compressor"],
      TOOL_MAP["bmi-calculator"],
      TOOL_MAP["password-generator"],
    ].filter(Boolean);
  }

  if (topTools.length === 0) return null;

  return (
    <div className="hp3-tools-grid">
      {topTools.map((tool) => (
        <div
          key={tool.slug}
          className="hp3-tool-card"
          onClick={() => navigate(`/tools/${tool.slug}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && navigate(`/tools/${tool.slug}`)
          }
        >
          <div className="hp3-tool-emoji">{tool.emoji}</div>
          <div className="hp3-tool-name">{tool.name}</div>
          <div className="hp3-tool-desc">
            {tool.description || tool.category}
          </div>
          <div className="hp3-tool-arrow">Use Free →</div>
        </div>
      ))}
    </div>
  );
});

/* ─── MAIN ────────────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const products = (() => {
    try {
      const parsed = JSON.parse(settings.hp_featuredProducts || "[]");
      return parsed.filter((p) => p.visible !== false);
    } catch {
      return [];
    }
  })();

  const WA = settings.whatsapp || "919258133689";
  const PHONE = settings.phone || "+919258133689";

  const stats = (() => {
    try {
      const parts = (settings.hp_stats || "").split("|");
      const result = [];
      for (let i = 0; i + 2 < parts.length; i += 3) {
        result.push({ icon: parts[i], num: parts[i + 1], lbl: parts[i + 2] });
      }
      return result.length ? result : [];
    } catch {
      return [];
    }
  })();

  const trustBadgeItems = [
    { icon: "✔", label: "500+ Homes Served" },
    { icon: "✔", label: "4.9 Rating" },
    { icon: "✔", label: "Verified Electricians" },
    { icon: "✔", label: "Haldwani Local Team" },
  ];

  const testimonials = (() => {
    try {
      return JSON.parse(settings.hp_testimonials || "[]");
    } catch {
      return [];
    }
  })();

  const visibleServices = SERVICES_META.filter(
    (s) => settings[s.settingKeys.show] !== false,
  ).map((s) => ({
    ...s,
    badge: settings[s.settingKeys.badge] || "",
    tagline: settings[s.settingKeys.tagline] || "",
    price: settings[s.settingKeys.price] || "",
  }));

  const goTo = useCallback((path) => () => navigate(path), [navigate]);
  const openWA = useCallback(
    () =>
      window.open(
        `https://wa.me/${WA}?text=${encodeURIComponent("Namaste! Almenso se baat karni thi.")}`,
        "_blank",
        "noopener",
      ),
    [WA],
  );

  return (
    <>
      {/* ── SEO: tool-first title + rich description ── */}
      <SEOHead
        title={`${settings.siteName || "Almenso"} — 170+ Free Online Tools & Calculators | Electrician Haldwani`}
        description="170+ free online tools — GST calculator, EMI calculator, BMI calculator, image compressor & more. Plus same-day electrician, solar & interior services in Haldwani, Uttarakhand. No login required."
        keywords="free online tools india, gst calculator, emi calculator, bmi calculator, image compressor, electrician haldwani, solar panel uttarakhand, interior design haldwani, almenso"
        image="https://almenso.com/preview.svg"
        canonical="/"
      />

      <div className="hp3-root">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          aria-label="Hero"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute left-0 top-12 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 rounded-full bg-sky-200/70 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {settings.hp_heroChip || "Trusted Electrician Service"}
              </div>

              <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                <span className="block text-emerald-700">
                  ⚡ Haldwani ka Trusted Electrician — 30 Min Service
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
                Book expert electrician near you in Haldwani. Same-day service •
                Free estimate • Instant WhatsApp support
              </p>

              {stats.length > 0 && (
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {stats.map((s) => (
                    <div
                      key={s.lbl}
                      role="listitem"
                      className="rounded-3xl bg-white/90 px-5 py-4 shadow-sm ring-1 ring-slate-200"
                    >
                      <div className="text-2xl font-black text-slate-950">
                        {s.num}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                {visibleServices.length > 0 && (
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
                    onClick={goTo("/electrician-haldwani")}
                  >
                    ⚡ Book Electrician in 30 Sec
                  </button>
                )}
                <button
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition duration-200 hover:bg-slate-50"
                  onClick={openWA}
                >
                  💬 WhatsApp Now (Instant Reply)
                </button>
              </div>

              <div className="mt-4 text-sm font-semibold text-amber-600">
                🔥 Available Today — Limited Slots Left
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {trustBadgeItems.map((badge) => (
                  <div
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-3xl bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-2xl shadow-slate-400/10 backdrop-blur-xl ring-1 ring-slate-200">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span>Our Services</span>
                </div>

                <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  Available Now
                </div>

                <div className="mt-6 space-y-4">
                  {visibleServices.map((s, i) => (
                    <button
                      key={s.path}
                      onClick={goTo(s.path)}
                      className="group flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition duration-200 hover:border-emerald-300 hover:bg-white"
                      style={{ animationDelay: `${200 + i * 80}ms` }}
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: s.accent, color: s.accentDark }}
                      >
                        {s.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900">
                          {s.title}
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          {s.price ||
                            (s.id === "electrician"
                              ? "Starts ₹150"
                              : "Free estimate")}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-700">
                        Book →
                      </span>
                    </button>
                  ))}

                  <button
                    key="tools"
                    onClick={goTo("/tools")}
                    className="group flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition duration-200 hover:border-slate-300 hover:bg-white"
                    style={{ animationDelay: "440ms" }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      🛠️
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900">
                        Free Tools
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        170+ tools · No login
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">
                      Use →
                    </span>
                  </button>
                </div>

                <div className="mt-5 rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                  30–60 min arrival in Haldwani
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800"
                    onClick={goTo("/electrician-haldwani")}
                  >
                    Book Electrician Now
                  </button>
                  <button
                    className="w-full rounded-full bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition duration-200 hover:bg-emerald-100"
                    onClick={openWA}
                  >
                    💬 WhatsApp Now
                  </button>
                </div>

                <div className="mt-6 rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
                  Available now • Local electrician team • Quick response
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2 rounded-3xl bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <span>⭐</span>
                  <span>{settings.hp_ratingText || "4.9 · 500+ reviews"}</span>
                </div>
                <div className="flex items-center gap-2 rounded-3xl bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>Same Day Service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hp3-sec" aria-labelledby="trust-heading">
          <div className="hp3-sec-hd">
            <div>
              <div className="hp3-eyebrow">Trusted Local Performance</div>
              <h2 id="trust-heading" className="hp3-sec-h2">
                Haldwani's Trusted Electrician Team
              </h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Jobs Completed
              </div>
              <div className="mt-4 text-3xl font-black text-slate-950">
                500+
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Trusted electrical jobs delivered across Haldwani.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Average Rating
              </div>
              <div className="mt-4 flex items-center gap-2 text-3xl font-black text-slate-950">
                4.9<span className="text-lg text-amber-500">★★★★★</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Highly rated by local customers for reliability and speed.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Serving
              </div>
              <div className="mt-4 text-3xl font-black text-slate-950">
                Haldwani
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fast same-day service across Haldwani neighborhoods.
              </p>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-50 block md:hidden bg-white/95 border-t border-slate-200 shadow-[0_-10px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
            <a
              href={`tel:${PHONE}`}
              className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
            >
              Call Now
            </a>
            <button
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
              onClick={openWA}
            >
              WhatsApp
            </button>
            <button
              className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
              onClick={goTo("/electrician-haldwani")}
            >
              Book Service
            </button>
          </div>
        </div>

        {/* ── BODY ──────────────────────────────────────────────── */}
        <div className="hp3-body pb-24 md:pb-0">
          <AdSlot slot="top" />

          {/* ── SERVICES SECTION ── */}
          {settings.hp_showServices !== false && visibleServices.length > 0 && (
            <section className="hp3-sec" aria-labelledby="services-heading">
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">
                    🔧 Local Services — Haldwani
                  </div>
                  <h2 id="services-heading" className="hp3-sec-h2">
                    {settings.hp_servicesTitle ||
                      "Book a Service — Same Day Response"}
                  </h2>
                  <p className="hp3-sec-p">
                    {settings.hp_servicesSub ||
                      "Haldwani & Uttarakhand mein trusted professionals"}
                  </p>
                </div>
                <button className="hp3-viewall" onClick={goTo("/services")}>
                  All Services <span>→</span>
                </button>
              </div>
              <div className="hsc-grid">
                {visibleServices.map((s) => (
                  <ServiceCard key={s.id} s={s} onClick={goTo(s.path)} />
                ))}
              </div>
              <div className="mt-3 text-sm font-semibold text-amber-600">
                🔥 Limited slots available today
              </div>
              <div className="hp3-contact-bar mt-4">
                <div className="hp3-cb-left">
                  <span className="hp3-cb-live" />
                  <span>
                    Available now — <strong>Free estimate, no advance</strong>
                  </span>
                </div>
                <div className="hp3-cb-btns">
                  <button className="hp3-cb-wa" onClick={openWA}>
                    💬 WhatsApp Now
                  </button>
                  <a href={`tel:${PHONE}`} className="hp3-cb-call">
                    📞 Call Now
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* ── LOCAL SEO SECTION ────────────────────────────────
              "Best Electrician Service in Haldwani"
              Natural keyword coverage + trust items + internal links
          ──────────────────────────────────────────────────────── */}
          {settings.hp_showElectrician !== false && (
            <section
              className="hp3-sec hp3-local-seo"
              aria-labelledby="local-seo-heading"
            >
              <div className="hp3-local-inner">
                <div className="hp3-local-left">
                  <div className="hp3-eyebrow">📍 Haldwani, Uttarakhand</div>
                  <h2
                    id="local-seo-heading"
                    className="hp3-sec-h2 hp3-local-h2"
                  >
                    Best Electrician Service in Haldwani
                  </h2>
                  <p className="hp3-local-desc">
                    Almenso provides trusted, same-day electrician services
                    across Haldwani and Uttarakhand. Our verified professionals
                    handle home wiring, inverter installation, AC repair, MCB /
                    DB box fitting, and commercial electrical work — at
                    transparent prices with zero advance payment.
                  </p>

                  <ul className="hp3-local-services">
                    <li>
                      <span>⚡</span> Home &amp; Office Wiring / Rewiring
                    </li>
                    <li>
                      <span>🔋</span> Inverter &amp; Battery Installation
                    </li>
                    <li>
                      <span>❄️</span> AC Installation &amp; Repair
                    </li>
                    <li>
                      <span>💡</span> Fan, Light &amp; Fixture Fitting
                    </li>
                    <li>
                      <span>🔌</span> MCB / DB Box Work
                    </li>
                    <li>
                      <span>☀️</span> Solar Panel Wiring
                    </li>
                  </ul>

                  {/* Trust badges — 500+ jobs, same day, verified, zero advance */}
                  <div className="hp3-local-trust">
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">500+</span>
                      <span className="hp3-trust-lbl">Jobs Done</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">⚡</span>
                      <span className="hp3-trust-lbl">Same Day</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">✓</span>
                      <span className="hp3-trust-lbl">Verified Pros</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">₹0</span>
                      <span className="hp3-trust-lbl">Advance</span>
                    </div>
                  </div>

                  <div className="hp3-local-ctas">
                    <button
                      className="hp3-local-book"
                      onClick={goTo("/electrician-haldwani")}
                    >
                      ⚡ Book Electrician Now
                    </button>
                    <a href={`tel:${PHONE}`} className="hp3-local-call">
                      📞 Call Now
                    </a>
                    <button className="hp3-local-wa" onClick={openWA}>
                      💬 WhatsApp Now
                    </button>
                  </div>
                </div>

                <div className="hp3-local-right">
                  {/* Service card */}
                  <div className="hp3-local-card">
                    <div className="hp3-lc-head">
                      ⚡ Electrician Service — Haldwani
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      Available Today · 30–60 min arrival · Starts ₹150
                    </div>
                    <div className="hp3-lc-area">
                      <div className="hp3-lc-area-title">Service Areas</div>
                      <div className="hp3-lc-tags">
                        {[
                          "Haldwani",
                          "Nainital",
                          "Bhimtal",
                          "Kaladungi",
                          "Ramnagar",
                          "Lalkuan",
                        ].map((a) => (
                          <span key={a} className="hp3-lc-area-tag">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hp3-lc-price">
                      Starting ₹150 · Free site visit
                    </div>
                    <a href={`tel:${PHONE}`} className="hp3-lc-cta">
                      📞 Call Electrician Now
                    </a>
                    <div className="hp3-lc-note">
                      Mon–Sat 9am–8pm · Sun 10am–4pm
                    </div>
                  </div>

                  {/* Internal linking */}
                  <div className="hp3-internal-links">
                    <div className="hp3-il-title">Related Pages</div>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/solar-solutions")}
                    >
                      ☀️ Solar Panel Installation →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/interior-design")}
                    >
                      🏠 Interior Design Haldwani →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/bijli")}
                    >
                      ⚡ Bijli Bill Calculator →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/inverter-load-planner")}
                    >
                      🔋 Inverter Load Planner →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/solar-roi")}
                    >
                      📊 Solar ROI Calculator →
                    </button>
                    <button className="hp3-il-link" onClick={goTo("/blog")}>
                      📖 Read Our Guides →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── TOOLS SECTION ── */}
          {settings.hp_showTopTools !== false && (
            <section
              className="hp3-sec hp3-tools-sec"
              aria-labelledby="tools-heading"
            >
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">⚙️ Free Online Tools</div>
                  <h2 id="tools-heading" className="hp3-sec-h2">
                    {settings.hp_toolsTitle ||
                      "Most Used Tools — Try Instantly"}
                  </h2>
                  <p className="hp3-sec-p">
                    {settings.hp_toolsSub ||
                      "170+ tools · No signup · Works on mobile & desktop"}
                  </p>
                </div>
                <button className="hp3-viewall" onClick={goTo("/tools")}>
                  All 170+ Tools <span>→</span>
                </button>
              </div>

              {/* Popular / Trending labels */}
              <div className="hp3-tools-label-row">
                <span className="hp3-tools-label hp3-tools-label--popular">
                  🔥 Popular Tools
                </span>
                <span className="hp3-tools-label hp3-tools-label--trending">
                  ⚡ Trending Now
                </span>
              </div>

              <TopToolsGrid />

              {/* Category quick-jump pills */}
              <div className="hp3-tool-cats">
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=calculator")}
                >
                  🧮 Calculators
                </button>
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=image")}
                >
                  🖼️ Image Tools
                </button>
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=converter")}
                >
                  🔄 Converters
                </button>
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=text")}
                >
                  📝 Text Tools
                </button>
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=finance")}
                >
                  💰 Finance
                </button>
                <button
                  className="hp3-tool-cat"
                  onClick={goTo("/tools?category=health")}
                >
                  🏥 Health
                </button>
              </div>
            </section>
          )}

          <AdSlot slot="mid" />

          {/* ── TESTIMONIALS ── */}
          {settings.hp_showTestimonials !== false &&
            testimonials.length > 0 && (
              <section
                className="hp3-sec hp3-testi-sec"
                aria-labelledby="testi-heading"
              >
                <div className="hp3-sec-hd hp3-sec-hd--center">
                  <div className="hp3-eyebrow">⭐ Customer Reviews</div>
                  <h2 id="testi-heading" className="hp3-sec-h2">
                    {settings.hp_testiTitle ||
                      "Hamare Customers Kya Kehte Hain"}
                  </h2>
                  <p className="hp3-sec-p">
                    {settings.hp_testiSub || "500+ verified reviews"}
                  </p>
                </div>
                <div className="htesti-grid">
                  {testimonials.map((t, i) => (
                    <TestiCard key={t.id} t={t} idx={i} />
                  ))}
                </div>
                <div className="hp3-rating-bar">
                  <div className="hp3-rb-score">4.9</div>
                  <div>
                    <div className="hp3-rb-stars">★★★★★</div>
                    <div className="hp3-rb-count">
                      Based on {settings.hp_testiCount || "500+"} verified
                      reviews
                    </div>
                  </div>
                  <div className="hp3-rb-brands">
                    {["Google", "Facebook", "WhatsApp"].map((b) => (
                      <span key={b} className="hp3-rb-brand">
                        via {b}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

          {/* ── CTA BAND ── */}
          {settings.hp_showCtaBand !== false && (
            <section className="hp3-cta-band" aria-label="Contact CTA">
              <div className="hp3-cta-band-inner">
                <div className="hp3-cta-left">
                  <div className="hp3-cta-eye">📞 Abhi Sampark Karo</div>
                  <h2 className="hp3-cta-h2">
                    {settings.hp_ctaTitle || "Free Estimate Chahiye?"}
                    <br />
                    <em>Hum Yahan Hain!</em>
                  </h2>
                  <p className="hp3-cta-p">{settings.hp_ctaSub}</p>
                  <div className="hp3-cta-btns">
                    <a href={`tel:${PHONE}`} className="hero3-btn-service">
                      📞 {PHONE}
                    </a>
                    <button className="hp3-cta-wa" onClick={openWA}>
                      💬 WhatsApp Karo
                    </button>
                  </div>
                </div>
                <div className="hp3-cta-right">
                  {[
                    ...(settings.hp_showElectrician !== false
                      ? [
                          {
                            ico: "⚡",
                            name: "Electrician",
                            sub: `Same-day · ${settings.hp_elec_price || "₹150+"}`,
                            path: "/electrician-haldwani",
                          },
                        ]
                      : []),
                    ...(settings.hp_showSolar !== false
                      ? [
                          {
                            ico: "☀️",
                            name: "Solar Quote",
                            sub: "Free site visit",
                            path: "/solar-solutions",
                          },
                        ]
                      : []),
                    ...(settings.hp_showInterior !== false
                      ? [
                          {
                            ico: "🏠",
                            name: "Interior",
                            sub: "Free home visit",
                            path: "/interior-design",
                          },
                        ]
                      : []),
                    {
                      ico: "🛠️",
                      name: "Free Tools",
                      sub: "170+ tools · No login",
                      path: "/tools",
                    },
                  ].map((item) => (
                    <button
                      key={item.name}
                      className="hp3-cta-pill"
                      onClick={goTo(item.path)}
                    >
                      <span className="hp3-pill-ico">{item.ico}</span>
                      <div>
                        <div className="hp3-pill-name">{item.name}</div>
                        <div className="hp3-pill-sub">{item.sub}</div>
                      </div>
                      <span className="hp3-pill-arr">›</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── LOCAL SEO SECTION ────────────────────────────────
              "Best Electrician Service in Haldwani"
              Natural keyword coverage + trust items + internal links
          ──────────────────────────────────────────────────────── */}
          {settings.hp_showElectrician !== false && (
            <section
              className="hp3-sec hp3-local-seo"
              aria-labelledby="local-seo-heading"
            >
              <div className="hp3-local-inner">
                <div className="hp3-local-left">
                  <div className="hp3-eyebrow">📍 Haldwani, Uttarakhand</div>
                  <h2
                    id="local-seo-heading"
                    className="hp3-sec-h2 hp3-local-h2"
                  >
                    Best Electrician Service in Haldwani
                  </h2>
                  <p className="hp3-local-desc">
                    Almenso provides trusted, same-day electrician services
                    across Haldwani and Uttarakhand. Our verified professionals
                    handle home wiring, inverter installation, AC repair, MCB /
                    DB box fitting, and commercial electrical work — at
                    transparent prices with zero advance payment.
                  </p>

                  <ul className="hp3-local-services">
                    <li>
                      <span>⚡</span> Home &amp; Office Wiring / Rewiring
                    </li>
                    <li>
                      <span>🔋</span> Inverter &amp; Battery Installation
                    </li>
                    <li>
                      <span>❄️</span> AC Installation &amp; Repair
                    </li>
                    <li>
                      <span>💡</span> Fan, Light &amp; Fixture Fitting
                    </li>
                    <li>
                      <span>🔌</span> MCB / DB Box Work
                    </li>
                    <li>
                      <span>☀️</span> Solar Panel Wiring
                    </li>
                  </ul>

                  {/* Trust badges — 500+ jobs, same day, verified, zero advance */}
                  <div className="hp3-local-trust">
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">500+</span>
                      <span className="hp3-trust-lbl">Jobs Done</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">⚡</span>
                      <span className="hp3-trust-lbl">Same Day</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">✓</span>
                      <span className="hp3-trust-lbl">Verified Pros</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">₹0</span>
                      <span className="hp3-trust-lbl">Advance</span>
                    </div>
                  </div>

                  <div className="hp3-local-ctas">
                    <button
                      className="hp3-local-book"
                      onClick={goTo("/electrician-haldwani")}
                    >
                      Book Electrician — Free Estimate →
                    </button>
                    <a href={`tel:${PHONE}`} className="hp3-local-call">
                      📞 Call Now
                    </a>
                    <button className="hp3-local-wa" onClick={openWA}>
                      💬 WhatsApp
                    </button>
                  </div>
                </div>

                <div className="hp3-local-right">
                  {/* Service card */}
                  <div className="hp3-local-card">
                    <div className="hp3-lc-head">
                      ⚡ Electrician Service — Haldwani
                    </div>
                    <div className="hp3-lc-area">
                      <div className="hp3-lc-area-title">Service Areas</div>
                      <div className="hp3-lc-tags">
                        {[
                          "Haldwani",
                          "Nainital",
                          "Bhimtal",
                          "Kaladungi",
                          "Ramnagar",
                          "Lalkuan",
                        ].map((a) => (
                          <span key={a} className="hp3-lc-area-tag">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hp3-lc-price">
                      Starting ₹150 · Free site visit
                    </div>
                    <a href={`tel:${PHONE}`} className="hp3-lc-cta">
                      📞 Call Electrician Now
                    </a>
                    <div className="hp3-lc-note">
                      Mon–Sat 9am–8pm · Sun 10am–4pm
                    </div>
                  </div>

                  {/* Internal linking */}
                  <div className="hp3-internal-links">
                    <div className="hp3-il-title">Related Pages</div>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/solar-solutions")}
                    >
                      ☀️ Solar Panel Installation →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/interior-design")}
                    >
                      🏠 Interior Design Haldwani →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/bijli")}
                    >
                      ⚡ Bijli Bill Calculator →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/inverter-load-planner")}
                    >
                      🔋 Inverter Load Planner →
                    </button>
                    <button
                      className="hp3-il-link"
                      onClick={goTo("/tools/solar-roi")}
                    >
                      📊 Solar ROI Calculator →
                    </button>
                    <button className="hp3-il-link" onClick={goTo("/blog")}>
                      📖 Read Our Guides →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── PRODUCTS ── */}
          {settings.hp_showProducts !== false && (
            <section
              className="hp3-sec hp3-prods-sec"
              aria-labelledby="prods-heading"
            >
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">🛒 Recommended Products</div>
                  <h2 id="prods-heading" className="hp3-sec-h2">
                    {settings.hp_productsTitle || "Expert-Curated Picks"}
                  </h2>
                </div>
                <button className="hp3-viewall" onClick={goTo("/products")}>
                  All Products <span>→</span>
                </button>
              </div>
              <div className="hp3-prods-grid">
                {products.map((p) => (
                  <a
                    key={p.id}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="hp3-prod-card"
                    aria-label={`Buy ${p.name}`}
                  >
                    {p.badge && (
                      <span className="hp3-prod-badge">{p.badge}</span>
                    )}
                    <div className="hp3-prod-img">
                      {p.image?.startsWith("http") ? (
                        <img src={p.image} alt={p.name} loading="lazy" />
                      ) : (
                        <span>{p.image}</span>
                      )}
                    </div>
                    <div className="hp3-prod-body">
                      <div className="hp3-prod-name">{p.name}</div>
                      {p.desc && <div className="hp3-prod-desc">{p.desc}</div>}
                      <div className="hp3-prod-stars">
                        ★★★★★ <span>4.5</span>
                      </div>
                      {p.price && (
                        <div className="hp3-prod-price">{p.price}</div>
                      )}
                    </div>
                    <div className="hp3-prod-buy">🛒 Buy on Amazon</div>
                  </a>
                ))}
              </div>
              {settings.hp_affiliateDisc && (
                <p className="hp3-disc">{settings.hp_affiliateDisc}</p>
              )}
            </section>
          )}

          <AdSlot slot="bottom" />
        </div>
      </div>
    </>
  );
}

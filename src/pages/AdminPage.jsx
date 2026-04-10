/**
 * ALMENSO ADMIN PANEL — Extended
 * Tabs: Leads | Services | Blogs | Products | Shops | Settings
 */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSettings, DEFAULT_AFFILIATE_PRODUCTS } from "../context/SettingsContext";
import ImageUploadWidget from "../components/ImageUploadWidget";
import ProductsManager from "../components/ProductsManager";
import MarketingDashboard from "../components/MarketingDashboard";
import HomepageDesignManager from "../components/HomepageDesignManager";
import {
  fetchLeads,
  updateLeadStatusDB,
  fetchBlogs,
  saveBlogDB,
  deleteBlogDB,
  fetchAffiliateProducts,
  saveAffiliateProductDB,
  deleteAffiliateProductDB,
  fetchServices,
  addServiceDB,
  updateServiceDB,
  deleteServiceDB,
  fetchUsersDB,
  saveNotificationDB,
  fetchNotificationsDB,
} from "../utils/db";
import "./AdminPage.css";

const CREDS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "admin@almenso.com",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "almenso123",
};

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const login = () => {
    const saved = (() => {
      try {
        return JSON.parse(localStorage.getItem("almenso_admin_creds"));
      } catch {
        return null;
      }
    })();
    const c = saved || CREDS;
    if (email === c.email && pass === c.password) {
      localStorage.setItem("almenso_admin", "true");
      onLogin();
    } else setErr("Email ya password galat hai!");
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0a2342,#1565c0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "40px 28px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#0a2342",
            marginBottom: 8,
          }}
        >
          Admin
        </div>
        <div
          style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: 24 }}
        >
          Almenso Admin Panel
        </div>
        {err && (
          <div
            style={{
              background: "#fef2f2",
              border: "1.5px solid #fca5a5",
              borderRadius: 8,
              padding: "8px 12px",
              color: "#dc2626",
              fontSize: "0.82rem",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {err}
          </div>
        )}
        <div style={{ marginBottom: 12, textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#475569",
              display: "block",
              marginBottom: 5,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@almenso.com"
            style={{
              width: "100%",
              padding: "11px 14px",
              border: "1.5px solid #e2e8f0",
              borderRadius: 10,
              fontSize: "0.88rem",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#475569",
              display: "block",
              marginBottom: 5,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="..."
              style={{
                width: "100%",
                padding: "11px 44px 11px 14px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 10,
                fontSize: "0.88rem",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => setShow((s) => !s)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button
          onClick={login}
          style={{
            width: "100%",
            padding: 13,
            background: "linear-gradient(135deg,#0a2342,#1565c0)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: 900,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Login →
        </button>
      </div>
    </div>
  );
}

function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const typeColor = {
    electrician: "#0a2342",
    solar: "#b45309",
    interior: "#3730a3",
  };
  const typeEmoji = { electrician: "⚡", solar: "☀️", interior: "🏠" };
  const statusColor = { new: "#dc2626", contacted: "#d97706", done: "#16a34a" };
  const statusLabel = {
    new: "🆕 New",
    contacted: "📞 Contacted",
    done: "✅ Done",
  };

  useEffect(() => {
    let cancelled = false;
    fetchLeads()
      .then((l) => {
        if (!cancelled) {
          setLeads(l);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.type === filter)),
    [filter, leads],
  );

  const updateStatus = useCallback(async (id, status) => {
    await updateLeadStatusDB(id, status);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const fmtDate = (ts) => {
    if (!ts) return "";
    const d = new Date(
      typeof ts === "object" && ts.seconds ? ts.seconds * 1000 : ts,
    );
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Count by type
  const counts = useMemo(
    () =>
      leads.reduce((acc, l) => {
        acc[l.type] = (acc[l.type] || 0) + 1;
        return acc;
      }, {}),
    [leads],
  );

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div
            style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0f172a" }}
          >
            📋 All Leads
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 3 }}>
            Total: {leads.length} &nbsp;|&nbsp; ⚡ {counts.electrician || 0}{" "}
            Electrician &nbsp;|&nbsp; ☀️ {counts.solar || 0} Solar &nbsp;|&nbsp;
            🏠 {counts.interior || 0} Interior
          </div>
        </div>
        <button
          onClick={() => {
            setLoading(true);
            fetchLeads().then((l) => {
              setLeads(l);
              setLoading(false);
            });
          }}
          style={{
            background: "#f1f5f9",
            border: "none",
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: "0.78rem",
            fontWeight: 700,
            cursor: "pointer",
            color: "#475569",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div
        style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}
      >
        {[
          { id: "all", label: `🗂️ All (${leads.length})` },
          {
            id: "electrician",
            label: `⚡ Electrician (${counts.electrician || 0})`,
          },
          { id: "solar", label: `☀️ Solar (${counts.solar || 0})` },
          { id: "interior", label: `🏠 Interior (${counts.interior || 0})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`ftab${filter === f.id ? " on" : ""}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Leads list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>⏳</div>
          <div>Leads load ho rahe hain...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#94a3b8",
            background: "#f8fafc",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
          <div style={{ fontWeight: 700 }}>Koi lead nahi</div>
          <div style={{ fontSize: "0.8rem", marginTop: 4 }}>
            {filter !== "all"
              ? `${filter} type mein koi lead nahi abhi`
              : "Jab user form submit karenge, yahan dikhega"}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((l) => (
            <div
              key={l.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1.5px solid #e2e8f0",
                padding: "14px 16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Top row: badges + date */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: typeColor[l.type] || "#475569",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: 99,
                    }}
                  >
                    {typeEmoji[l.type] || ""} {l.type || "unknown"}
                  </span>
                  <span
                    style={{
                      background: statusColor[l.status] || "#94a3b8",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: 99,
                    }}
                  >
                    {statusLabel[l.status] || l.status || "new"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#94a3b8",
                    flexShrink: 0,
                  }}
                >
                  🕐 {fmtDate(l.createdAt)}
                </div>
              </div>

              {/* Name */}
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "1rem",
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                👤 {l.name}
              </div>

              {/* Details grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "4px 16px",
                  fontSize: "0.82rem",
                  color: "#475569",
                  marginBottom: 10,
                }}
              >
                <div>
                  📞 <strong>{l.phone}</strong>
                </div>
                {(l.city || l.location) && <div>🏙️ {l.city || l.location}</div>}
                {l.address && (
                  <div style={{ gridColumn: "1/-1" }}>🏠 {l.address}</div>
                )}
                {(l.requirement || l.problem) && (
                  <div style={{ gridColumn: "1/-1" }}>
                    🔧 {l.requirement || l.problem}
                  </div>
                )}
                {l.budget && <div>💰 {l.budget}</div>}
                {l.note && (
                  <div
                    style={{
                      gridColumn: "1/-1",
                      background: "#f8fafc",
                      borderRadius: 8,
                      padding: "6px 10px",
                      marginTop: 4,
                      color: "#64748b",
                      fontSize: "0.78rem",
                    }}
                  >
                    📝 {l.note}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  onClick={() => window.open(`tel:${l.phone}`)}
                  style={{
                    background: "#0a2342",
                    color: "#fff",
                    border: "none",
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  📞 Call
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${l.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaste ${l.name} ji! Almenso se bol raha hoon. Aapka ${l.type} enquiry mila.`)}`,
                      "_blank",
                    )
                  }
                  style={{
                    background: "#25d366",
                    color: "#fff",
                    border: "none",
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  💬 WhatsApp
                </button>
                <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                  {["new", "contacted", "done"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(l.id, s)}
                      style={{
                        background: l.status === s ? statusColor[s] : "#f1f5f9",
                        color: l.status === s ? "#fff" : "#475569",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 8,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogManager() {
  const { settings, saveSettings, showToast } = useSettings();

  const getArticles = () => {
    try {
      return Array.isArray(settings.blogArticles) ? settings.blogArticles : [];
    } catch {
      return [];
    }
  };

  const BLANK = {
    id: "",
    title: "",
    slug: "",
    category: "general",
    summary: "",
    content: "",
    image: "",
    tags: "",
    date: new Date().toISOString().split("T")[0],
    status: "draft",
    emoji: "📝",
    readMin: 5,
    accentColor: "#0c831f",
    coverColor: "#f0fdf4",
  };

  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(false);

  const articles = getArticles();
  const autoSlug = (t) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const filtered = search
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          (a.category || "").includes(search.toLowerCase()),
      )
    : articles;

  const save = () => {
    if (!form.title.trim()) return alert("Title zaroori hai");
    if (!form.summary.trim()) return alert("Summary zaroori hai");
    if (!form.content.trim()) return alert("Content zaroori hai");
    setSaving(true);
    const slug = form.slug || autoSlug(form.title);
    const article = {
      ...form,
      slug,
      id: form.id || slug + "-" + Date.now(),
      tags:
        typeof form.tags === "string"
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : form.tags || [],
    };
    const existing = getArticles();
    const idx = existing.findIndex((a) => a.id === article.id);
    const updated =
      idx >= 0
        ? existing.map((a) => (a.id === article.id ? article : a))
        : [article, ...existing];
    saveSettings({ blogArticles: updated });
    showToast(
      article.status === "published"
        ? "✅ Article published!"
        : "💾 Draft save hua!",
    );
    setSaving(false);
    setView("list");
  };

  const remove = (id) => {
    if (!window.confirm("Is article ko delete karo?")) return;
    saveSettings({ blogArticles: getArticles().filter((a) => a.id !== id) });
    showToast("🗑️ Article deleted");
  };

  const toggleStatus = (article) => {
    const s = article.status === "published" ? "draft" : "published";
    saveSettings({
      blogArticles: getArticles().map((a) =>
        a.id === article.id ? { ...a, status: s } : a,
      ),
    });
    showToast(s === "published" ? "✅ Published!" : "📝 Draft mein gaya");
  };

  const CATS = [
    "general",
    "bijli",
    "solar",
    "interior",
    "finance",
    "health",
    "travel",
    "tech",
    "tools",
    "business",
    "budget",
  ];
  const ACCENTS = [
    "#0c831f",
    "#1565c0",
    "#b45309",
    "#7c3aed",
    "#dc2626",
    "#0891b2",
    "#d97706",
    "#be185d",
    "#374151",
    "#0f172a",
  ];
  const COVERS = [
    "#f0fdf4",
    "#eff6ff",
    "#fffbeb",
    "#fce7f3",
    "#f3e8ff",
    "#fff3e0",
    "#e0f2fe",
    "#dcfce7",
    "#fef2f2",
    "#f8fafc",
  ];

  // ── EDIT VIEW ──
  if (view === "edit")
    return (
      <div>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <button className="ftab on" onClick={() => setView("list")}>
            ← Wapas
          </button>
          <span style={{ fontWeight: 900, fontSize: "1rem" }}>
            {form.id ? "✏️ Article Edit Karo" : "✍️ Naya Article Likho"}
          </span>
          <button
            onClick={() => setPreview(!preview)}
            style={{
              marginLeft: "auto",
              padding: "6px 14px",
              background: preview ? "#0f172a" : "#f1f5f9",
              color: preview ? "#fff" : "#475569",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.78rem",
              cursor: "pointer",
            }}
          >
            {preview ? "✏️ Edit Mode" : "👁️ Preview"}
          </button>
          {form.slug && (
            <a
              href={"/blog/" + form.slug}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.75rem", color: "#1565c0", fontWeight: 700 }}
            >
              🔗 Live →
            </a>
          )}
        </div>

        {/* SEO tip */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 14,
            fontSize: "0.78rem",
            color: "#166534",
          }}
        >
          💡 <strong>SEO Tip:</strong> Title mein keywords daalo — e.g. "Bijli
          Bill Kaise Kam Kare Haldwani 2025" &nbsp;|&nbsp; Content min 800 words
          rakho Google ranking ke liye
        </div>

        {/* Preview mode */}
        {preview && (
          <div
            style={{
              background: "#fff",
              border: "2px solid #e2e8f0",
              borderRadius: 14,
              padding: "20px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                padding: "16px",
                background: form.coverColor || "#f0fdf4",
                borderRadius: 10,
                marginBottom: 14,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>
                {form.emoji}
              </div>
              <h1
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: form.accentColor || "#0c831f",
                  margin: "0 0 8px",
                }}
              >
                {form.title || "Article Title"}
              </h1>
              <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                {form.summary}
              </p>
            </div>
            <div
              style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#374151" }}
              dangerouslySetInnerHTML={{
                __html: form.content || "<p>Content yahan dikhega...</p>",
              }}
            />
          </div>
        )}

        {/* Form fields */}
        {!preview && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 12,
              }}
            >
              <div className="al-field">
                <label>Title *</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      title: e.target.value,
                      slug: p.slug || autoSlug(e.target.value),
                    }))
                  }
                  placeholder="e.g. Bijli Bill Kaise Kam Kare?"
                />
              </div>
              <div className="al-field">
                <label>Slug (URL) — auto fill hota hai</label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  placeholder="bijli-bill-kaise-kam-kare"
                />
              </div>
              <div className="al-field">
                <label>Emoji</label>
                <input
                  value={form.emoji || "📝"}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, emoji: e.target.value }))
                  }
                  style={{ fontSize: "1.4rem" }}
                  placeholder="📝"
                />
              </div>
              <div className="al-field">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                >
                  {CATS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="al-field">
                <label>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div className="al-field">
                <label>Read Time (minutes)</label>
                <input
                  type="number"
                  value={form.readMin || 5}
                  min="1"
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      readMin: parseInt(e.target.value) || 5,
                    }))
                  }
                />
              </div>
              <div className="al-field">
                <label>Status</label>
                <select
                  value={form.status || "draft"}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value }))
                  }
                >
                  <option value="draft">
                    📝 Draft — website pe nahi dikhega
                  </option>
                  <option value="published">
                    ✅ Published — website pe live hai
                  </option>
                </select>
              </div>
              <div className="al-field">
                <label>Tags (comma se alag karo)</label>
                <input
                  value={
                    typeof form.tags === "object"
                      ? form.tags?.join(", ")
                      : form.tags || ""
                  }
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tags: e.target.value }))
                  }
                  placeholder="bijli, tips, haldwani"
                />
              </div>
            </div>

            {/* Colors */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: "14px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  marginBottom: 12,
                }}
              >
                🎨 Article Colors
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Accent Color (headings)
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {ACCENTS.map((c) => (
                      <div
                        key={c}
                        onClick={() =>
                          setForm((p) => ({ ...p, accentColor: c }))
                        }
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: c,
                          cursor: "pointer",
                          outline:
                            form.accentColor === c
                              ? "3px solid #0f172a"
                              : "none",
                          outlineOffset: 2,
                          transition: "transform 0.1s",
                          transform:
                            form.accentColor === c ? "scale(1.25)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Cover Color (background)
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {COVERS.map((c) => (
                      <div
                        key={c}
                        onClick={() =>
                          setForm((p) => ({ ...p, coverColor: c }))
                        }
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: c,
                          cursor: "pointer",
                          border: "2px solid #e2e8f0",
                          outline:
                            form.coverColor === c
                              ? "3px solid #0f172a"
                              : "none",
                          outlineOffset: 2,
                          transition: "transform 0.1s",
                          transform:
                            form.coverColor === c ? "scale(1.25)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Live color preview */}
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: form.coverColor,
                  border: `2px solid ${form.accentColor}50`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{form.emoji}</span>
                <div
                  style={{
                    fontWeight: 900,
                    color: form.accentColor,
                    fontSize: "0.9rem",
                  }}
                >
                  {form.title || "Preview: Title Yahan Dikhega"}
                </div>
              </div>
            </div>

            {/* Cover image */}
            <div className="al-field">
              <label>
                Cover Image URL{" "}
                <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                  (optional)
                </span>
              </label>
              <input
                value={form.image || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, image: e.target.value }))
                }
                placeholder="https://example.com/image.jpg"
              />
              {form.image?.startsWith("http") && (
                <img
                  src={form.image}
                  alt="preview"
                  style={{
                    marginTop: 8,
                    width: "100%",
                    maxHeight: 160,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            {/* Summary */}
            <div className="al-field">
              <label>
                Summary *
                <span
                  style={{
                    fontWeight: 400,
                    color: "#94a3b8",
                    fontSize: "0.72rem",
                    marginLeft: 6,
                  }}
                >
                  (Google search mein dikhega — max 160 chars)
                </span>
              </label>
              <textarea
                value={form.summary || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, summary: e.target.value }))
                }
                rows={3}
                placeholder="e.g. Bijli bill kam karne ke 10 proven tips jo Haldwani mein kaam karti hain..."
              />
              <div
                style={{
                  fontSize: "0.7rem",
                  marginTop: 3,
                  color:
                    (form.summary || "").length > 160 ? "#dc2626" : "#94a3b8",
                }}
              >
                {(form.summary || "").length}/160 chars
              </div>
            </div>

            {/* Content */}
            <div className="al-field">
              <label>
                Content *
                <span
                  style={{
                    fontWeight: 400,
                    color: "#94a3b8",
                    fontSize: "0.72rem",
                    marginLeft: 6,
                  }}
                >
                  HTML use karo neeche diye format ke hisaab se
                </span>
              </label>
              <div
                style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 8,
                  fontSize: "0.75rem",
                  color: "#1e40af",
                  lineHeight: 1.8,
                }}
              >
                <strong>HTML Format Guide:</strong>
                <br />
                <code>&lt;h2&gt;Section Heading&lt;/h2&gt;</code> — heading
                <br />
                <code>&lt;p&gt;Paragraph text yahan...&lt;/p&gt;</code> —
                paragraph
                <br />
                <code>
                  &lt;ul&gt;&lt;li&gt;Point 1&lt;/li&gt;&lt;li&gt;Point
                  2&lt;/li&gt;&lt;/ul&gt;
                </code>{" "}
                — bullet list
                <br />
                <code>&lt;strong&gt;Bold&lt;/strong&gt;</code> — bold text
                <br />
                <code>
                  &lt;div class="tip-box"&gt;💡 Tip yahan...&lt;/div&gt;
                </code>{" "}
                — highlighted tip box
              </div>
              <textarea
                value={form.content || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                rows={22}
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                }}
                placeholder={
                  '<h2>Pehla Section</h2>\n<p>Yahan apna content likho...</p>\n\n<h2>Doosra Section</h2>\n<p>Aur yahan bhi...</p>\n\n<div class="tip-box">💡 Koi important tip yahan likho</div>'
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                  {(form.content || "").split(/\s+/).filter(Boolean).length}{" "}
                  words
                </span>
                {(form.content || "").split(/\s+/).filter(Boolean).length <
                  800 && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "#d97706",
                      fontWeight: 700,
                    }}
                  >
                    ⚠️ SEO ke liye 800+ words recommend hain
                  </span>
                )}
              </div>
            </div>

            {/* Save / Cancel */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                className="al-btn"
                onClick={save}
                disabled={saving}
                style={{ flex: 1 }}
              >
                {saving
                  ? "⏳ Saving..."
                  : form.status === "published"
                    ? "🚀 Publish Karo"
                    : "💾 Draft Save Karo"}
              </button>
              <button
                onClick={() => setView("list")}
                style={{
                  padding: "12px 20px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                Cancel
              </button>
            </div>
            {form.slug && (
              <div
                style={{ marginTop: 8, fontSize: "0.75rem", color: "#94a3b8" }}
              >
                URL: /blog/{form.slug} &nbsp;
                <a
                  href={"/blog/" + form.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1565c0", fontWeight: 700 }}
                >
                  Preview →
                </a>
              </div>
            )}
          </>
        )}
      </div>
    );

  // ── LIST VIEW ──
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: "1rem" }}>
            📝 Blog & Articles ({articles.length})
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 2 }}>
            ✅ Published:{" "}
            {articles.filter((b) => b.status === "published").length}{" "}
            &nbsp;·&nbsp; 📝 Draft:{" "}
            {articles.filter((b) => b.status !== "published").length}
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setForm(BLANK);
            setView("edit");
          }}
        >
          ✍️ Naya Article
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Title ya category se search karo..."
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "1.5px solid #e2e8f0",
          borderRadius: 10,
          fontSize: "0.85rem",
          fontFamily: "var(--font)",
          boxSizing: "border-box",
          marginBottom: 14,
        }}
      />

      {/* Info */}
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
          fontSize: "0.78rem",
          color: "#166534",
        }}
      >
        💡 Yahan likhe articles <strong>/blog</strong> pe show honge. Firebase
        nahi chahiye — sab localhost + Vercel pe kaam karta hai. Published =
        live, Draft = hidden.
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            background: "#f8fafc",
            borderRadius: 12,
            color: "#64748b",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✍️</div>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>
            {search
              ? `"${search}" se koi article nahi mila`
              : "Koi article nahi hai abhi"}
          </div>
          <div style={{ fontSize: "0.8rem" }}>
            {search
              ? "Search clear karo ya naya article banao"
              : '"Naya Article" dabao — shuru karo!'}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1.5px solid #e2e8f0",
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: "1.3rem" }}>
                      {b.emoji || "📝"}
                    </span>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "0.92rem",
                        color: "#0f172a",
                        lineHeight: 1.3,
                      }}
                    >
                      {b.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <span>📅 {b.date}</span>
                    <span>🏷️ {b.category}</span>
                    <span>⏱️ {b.readMin || 5}min</span>
                    <span
                      style={{
                        color: b.status === "published" ? "#16a34a" : "#d97706",
                        fontWeight: 800,
                        background:
                          b.status === "published" ? "#f0fdf4" : "#fffbeb",
                        padding: "1px 8px",
                        borderRadius: 99,
                        fontSize: "0.68rem",
                      }}
                    >
                      {b.status === "published" ? "✅ Live" : "📝 Draft"}
                    </span>
                  </div>
                  {b.summary && (
                    <div
                      style={{
                        fontSize: "0.73rem",
                        color: "#64748b",
                        marginTop: 5,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {b.summary}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    <a
                      href={"/blog/" + b.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "6px 10px",
                        background: "#eff6ff",
                        color: "#1565c0",
                        borderRadius: 8,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      👁️
                    </a>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setForm({
                          ...b,
                          tags: Array.isArray(b.tags)
                            ? b.tags.join(", ")
                            : b.tags || "",
                        });
                        setView("edit");
                      }}
                    >
                      ✏️
                    </button>
                    <button className="del-btn" onClick={() => remove(b.id)}>
                      🗑️
                    </button>
                  </div>
                  <button
                    onClick={() => toggleStatus(b)}
                    style={{
                      padding: "5px 10px",
                      background: "none",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      border: `1.5px solid ${b.status === "published" ? "#f59e0b" : "#22c55e"}`,
                      color: b.status === "published" ? "#b45309" : "#16a34a",
                    }}
                  >
                    {b.status === "published"
                      ? "⬇️ Draft karo"
                      : "🚀 Publish karo"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServicesManager() {
  const [services, setServices] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState({
    name: "",
    emoji: "🔧",
    price: "",
    description: "",
    availability: "Haldwani",
    available: true,
    type: "electrician",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchServices().then((s) => {
      setServices(s);
      setLoading(false);
    });
  }, []);
  const save = async () => {
    if (!form.name.trim() || !form.price.trim())
      return alert("Name aur price zaroori hai");
    if (editId) {
      await updateServiceDB(editId, form);
      setServices((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...form } : s)),
      );
    } else {
      const added = await addServiceDB(form);
      setServices((prev) => [added, ...prev]);
    }
    setView("list");
    setEditId(null);
  };
  const remove = async (id) => {
    if (!window.confirm("Delete?")) return;
    await deleteServiceDB(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };
  const F = (label, key, type = "text") => (
    <div className="al-field" key={key}>
      <label>{label}</label>
      {type === "select_type" ? (
        <select
          value={form[key] || ""}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        >
          {["electrician", "solar", "interior", "other"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={form[key] || ""}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={form[key] || ""}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        />
      )}
    </div>
  );
  if (view === "edit")
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <button className="ftab on" onClick={() => setView("list")}>
            Back
          </button>
          <span style={{ fontWeight: 900 }}>
            {editId ? "Edit Service" : "Naya Service"}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 12,
          }}
        >
          {F("Name *", "name")}
          {F("Emoji", "emoji")}
          {F("Price *", "price")}
          {F("Type", "type", "select_type")}
          {F("Availability", "availability")}
          {F("Description", "description", "textarea")}
        </div>
        <div className="al-field" style={{ marginTop: 8 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm((p) => ({ ...p, available: e.target.checked }))
              }
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontWeight: 700 }}>Available</span>
          </label>
        </div>
        <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
          Save Service
        </button>
      </div>
    );
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: 900 }}>Services ({services.length})</div>
        <button
          className="add-btn"
          onClick={() => {
            setForm({
              name: "",
              emoji: "🔧",
              price: "",
              description: "",
              availability: "Haldwani",
              available: true,
              type: "electrician",
            });
            setEditId(null);
            setView("edit");
          }}
        >
          + Naya Service
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 30, color: "#94a3b8" }}>
          Loading...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: 10,
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1.5px solid #e2e8f0",
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    {s.price} · {s.type}
                  </div>
                </div>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.available !== false ? "#22c55e" : "#ef4444",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="edit-btn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setForm(s);
                    setEditId(s.id);
                    setView("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await updateServiceDB(s.id, { available: !s.available });
                    setServices((prev) =>
                      prev.map((x) =>
                        x.id === s.id ? { ...x, available: !s.available } : x,
                      ),
                    );
                  }}
                  style={{
                    padding: "7px 10px",
                    background: "none",
                    border: "1.5px solid",
                    borderColor: s.available !== false ? "#ef4444" : "#22c55e",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    color: s.available !== false ? "#ef4444" : "#22c55e",
                  }}
                >
                  {s.available !== false ? "Hide" : "Show"}
                </button>
                <button className="del-btn" onClick={() => remove(s.id)}>
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Notifications Manager ──────────────────────────────────
function NotificationsManager() {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]); // selected phone numbers
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(0);
  const [filterType, setFilterType] = useState("all"); // all | leads | users

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchUsersDB(), fetchNotificationsDB()])
      .then(([u, n]) => {
        if (!cancelled) {
          setUsers(u);
          setHistory(n);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback((phone) => {
    setSelected((prev) =>
      prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone],
    );
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) =>
      prev.length === users.length
        ? []
        : users.map((u) => u.phoneClean || u.phone),
    );
  }, [users]);

  // Send WhatsApp messages
  const sendBulk = async () => {
    if (!msg.trim()) return alert("Message likhna zaroori hai");
    if (!selected.length) return alert("Koi user select nahi kiya");
    if (
      !window.confirm(
        `${selected.length} logon ko WhatsApp message bhejenge. Confirm?`,
      )
    )
      return;

    setSending(true);
    setSent(0);

    for (let i = 0; i < selected.length; i++) {
      const phone = selected[i].replace(/[^0-9]/g, "");
      const full = phone.startsWith("91") ? phone : "91" + phone;
      window.open(
        `https://wa.me/${full}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      setSent(i + 1);
      // Small delay between each to avoid browser blocking
      await new Promise((r) => setTimeout(r, 800));
    }

    // Save notification history
    await saveNotificationDB({
      message: msg,
      sentTo: selected.length,
      phones: selected,
      type: "whatsapp",
      status: "sent",
    });

    const updated = await fetchNotificationsDB();
    setHistory(updated);
    setSending(false);
    setMsg("");
    setSelected([]);
    setSent(0);
  };

  // Send to single user
  const sendSingle = (phone, name) => {
    if (!msg.trim()) return alert("Pehle message likho (neeche wale box mein)");
    const cleaned = phone.replace(/[^0-9]/g, "");
    const full = cleaned.startsWith("91") ? cleaned : "91" + cleaned;
    window.open(
      `https://wa.me/${full}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const fmtDate = (ts) => {
    if (!ts) return "";
    const d = new Date(
      typeof ts === "object" && ts.seconds ? ts.seconds * 1000 : ts,
    );
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
        🔔 Notifications
      </div>
      <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 20 }}>
        Registered users ko select karke WhatsApp message bhejo — offers,
        updates, reminders
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          ⏳ Loading users...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {/* ── Message Composer ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              border: "1.5px solid #e2e8f0",
              padding: "16px",
            }}
          >
            <div
              style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: 10 }}
            >
              ✍️ Message Likho
            </div>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={5}
              placeholder={`Namaste! 🙏\n\nAlmenso ki taraf se special offer:\n⚡ Electrician service pe 10% discount\n\nBook karo: almenso.com/electrician-haldwani\n\n_Almenso Team_`}
              style={{
                width: "100%",
                border: "1.5px solid #e2e8f0",
                borderRadius: 10,
                padding: "12px",
                fontSize: "0.85rem",
                fontFamily: "var(--font)",
                lineHeight: 1.6,
                resize: "vertical",
                boxSizing: "border-box",
                background: "#f8fafc",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                {msg.length} characters
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: selected.length ? "#166534" : "#94a3b8",
                  fontWeight: 700,
                }}
              >
                {selected.length} users selected
              </div>
            </div>
          </div>

          {/* ── Users List ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              border: "1.5px solid #e2e8f0",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                  👥 Registered Users ({users.length})
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  Ye woh log hain jinne service book karte waqt login kiya
                </div>
              </div>
              {users.length > 0 && (
                <button
                  onClick={toggleAll}
                  style={{
                    padding: "7px 14px",
                    background: "#f1f5f9",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#475569",
                  }}
                >
                  {selected.length === users.length
                    ? "☑️ Deselect All"
                    : "✅ Select All"}
                </button>
              )}
            </div>

            {users.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: 32,
                  background: "#f8fafc",
                  borderRadius: 12,
                  color: "#64748b",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>👥</div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>
                  Koi registered user nahi
                </div>
                <div style={{ fontSize: "0.78rem" }}>
                  Jab koi service book karte waqt phone number se login karega,
                  <br />
                  woh yahan dikhega
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                {users.map((u) => {
                  const phone = u.phoneClean || u.phone?.replace(/[^0-9]/g, "");
                  const isSelected = selected.includes(phone);
                  return (
                    <div
                      key={u.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: `1.5px solid ${isSelected ? "#1565c0" : "#f1f5f9"}`,
                        background: isSelected ? "#eff6ff" : "#f8fafc",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onClick={() => toggle(phone)}
                    >
                      {/* Checkbox */}
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: `2px solid ${isSelected ? "#1565c0" : "#cbd5e1"}`,
                          background: isSelected ? "#1565c0" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && (
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "0.75rem",
                              fontWeight: 900,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      {/* Avatar */}
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#1565c0,#0a2342)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 900,
                          fontSize: "0.9rem",
                          flexShrink: 0,
                        }}
                      >
                        {(u.name || "?").charAt(0).toUpperCase()}
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: "0.88rem",
                            color: "#0f172a",
                          }}
                        >
                          {u.name || "Unknown"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          📞 {u.phone} · {fmtDate(u.lastLogin || u.createdAt)}
                        </div>
                      </div>
                      {/* Send single */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendSingle(phone, u.name);
                        }}
                        style={{
                          padding: "6px 10px",
                          background: "#25d366",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        💬
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Send Button ── */}
          {users.length > 0 && (
            <div>
              {sending ? (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: 12,
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📤</div>
                  <div style={{ fontWeight: 800, color: "#166534" }}>
                    Bhej raha hai... {sent}/{selected.length}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      marginTop: 4,
                    }}
                  >
                    Har WhatsApp window automatically open hogi. Close mat karo!
                  </div>
                  <div
                    style={{
                      background: "#e2e8f0",
                      borderRadius: 99,
                      height: 8,
                      marginTop: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "#25d366",
                        height: "100%",
                        width: `${(sent / selected.length) * 100}%`,
                        transition: "width 0.3s",
                        borderRadius: 99,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={sendBulk}
                  disabled={!selected.length || !msg.trim()}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background:
                      selected.length && msg.trim() ? "#25d366" : "#e2e8f0",
                    color: selected.length && msg.trim() ? "#fff" : "#94a3b8",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    cursor:
                      selected.length && msg.trim() ? "pointer" : "not-allowed",
                    fontFamily: "var(--font)",
                    minHeight: 48,
                  }}
                >
                  💬 {selected.length} logon ko WhatsApp Message Bhejo
                </button>
              )}
            </div>
          )}

          {/* ── Notification History ── */}
          {history.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1.5px solid #e2e8f0",
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  marginBottom: 12,
                }}
              >
                📜 History
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {history.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "10px 12px",
                      background: "#f8fafc",
                      borderRadius: 10,
                      fontSize: "0.82rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#0f172a" }}>
                        💬 {n.sentTo} logon ko bheja
                      </span>
                      <span style={{ color: "#94a3b8", fontSize: "0.72rem" }}>
                        {fmtDate(n.createdAt)}
                      </span>
                    </div>
                    <div style={{ color: "#64748b", lineHeight: 1.4 }}>
                      {(n.message || "").slice(0, 80)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Homepage Manager ──────────────────────────────────────
function AdminPage() {
  function HomepageManager() {
    const { settings, saveSettings, showToast } = useSettings();
    const [form, setForm] = useState({ ...settings });
    const [tab, setTab] = useState("hero");

    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));
    const save = () => {
      saveSettings(form);
      showToast("✅ Homepage update ho gaya! Refresh karo.");
    };

    const Inp = ({ label, fkey, hint, rows, type }) => (
      <div className="al-field">
        <label>
          {label}
          {hint && (
            <span
              style={{
                fontWeight: 400,
                color: "#94a3b8",
                fontSize: "0.72rem",
                marginLeft: 6,
              }}
            >
              {hint}
            </span>
          )}
        </label>
        {rows ? (
          <textarea
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
            rows={rows}
            style={{ resize: "vertical" }}
          />
        ) : (
          <input
            type={type || "text"}
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
          />
        )}
      </div>
    );

    const Toggle = ({ label, fkey, hint }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 10,
        }}
      >
        <div>
          <div
            style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}
          >
            {label}
          </div>
          {hint && (
            <div
              style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2 }}
            >
              {hint}
            </div>
          )}
        </div>
        <label
          style={{
            position: "relative",
            display: "inline-block",
            width: 44,
            height: 24,
            flexShrink: 0,
          }}
        >
          <input
            type="checkbox"
            checked={form[fkey] !== false}
            onChange={(e) => update(fkey, e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: "absolute",
              cursor: "pointer",
              inset: 0,
              borderRadius: 99,
              background: form[fkey] !== false ? "#10b981" : "#cbd5e1",
              transition: "0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: form[fkey] !== false ? 23 : 3,
                bottom: 3,
                background: "white",
                borderRadius: "50%",
                transition: "0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            />
          </span>
        </label>
      </div>
    );

    // Parse/edit testimonials as JSON
    const [testiErr, setTestiErr] = useState("");
    const validateTesti = (val) => {
      try {
        JSON.parse(val);
        setTestiErr("");
      } catch {
        setTestiErr("❌ JSON format galat hai");
      }
    };

    const HTABS = [
      { id: "hero", label: "🦸 Hero" },
      { id: "sections", label: "📦 Sections" },
      { id: "services", label: "🔧 Services" },
      { id: "testi", label: "⭐ Reviews" },
      { id: "prods", label: "🛒 Products" },
    ];

    const infoBox = (
      msg,
      color = "#eff6ff",
      border = "#bfdbfe",
      text = "#1e40af",
    ) => (
      <div
        style={{
          background: color,
          border: `1px solid ${border}`,
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 16,
          fontSize: "0.8rem",
          color: text,
        }}
      >
        {msg}
      </div>
    );

    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
          🏠 Homepage Control Panel
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 20 }}
        >
          Homepage ka har section yahan se control karo — text change karo,
          sections show/hide karo, services toggle karo. Save ke baad turant
          live ho jaata hai.
        </div>

        {/* Sub-tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 20,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 12,
          }}
        >
          {HTABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 14px",
                background: tab === t.id ? "#0f172a" : "#f1f5f9",
                color: tab === t.id ? "#fff" : "#475569",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── HERO ── */}
        {tab === "hero" && (
          <div>
            {infoBox(
              "💡 Hero section — sabse upar dikhta hai. Title, tagline, stats sab yahan se change karo.",
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Chip Text (chip badge)"
                fkey="hp_heroChip"
                hint="e.g. All-in-One Platform · Haldwani"
              />
              <Inp
                label="Hero Line 1"
                fkey="hp_heroLine1"
                hint="e.g. All-in-One"
              />
              <Inp
                label="Hero Line 2"
                fkey="hp_heroLine2"
                hint="e.g. Tools & Services"
              />
              <Inp
                label="Hero Accent Word"
                fkey="hp_heroAccent"
                hint="e.g. Platform (green mein dikhta hai)"
              />
            </div>
            <Inp
              label="Hero Subtitle"
              fkey="hp_heroSub"
              hint="(hero ke neeche description)"
              rows={3}
            />
            <Inp
              label="Trust Badges"
              fkey="hp_trustBadges"
              hint="Pipe | se alag karo — e.g. ✅ No Login|⚡ Same Day|💯 Free Estimate"
            />
            <Inp
              label="Rating Pill Text"
              fkey="hp_ratingText"
              hint="e.g. 4.9 · 500+ reviews"
            />
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: 8,
                }}
              >
                📊 Stats (hero ke neeche numbers)
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginBottom: 8,
                }}
              >
                Format: icon|number|label — Pipe | se alag karo
                <br />
                Example: ✅|500+|Jobs Done|⭐|4.9★|Avg Rating|🛠️|100+|Free Tools
              </div>
              <textarea
                value={form.hp_stats || ""}
                onChange={(e) => update("hp_stats", e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  padding: 8,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 8,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        )}

        {/* ── SECTIONS TOGGLE ── */}
        {tab === "sections" && (
          <div>
            {infoBox(
              "💡 Poore sections show/hide karo. Band karne pe woh section homepage pe bilkul nahi dikhega.",
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 10,
              }}
            >
              <Toggle
                label="🔧 Services Section"
                fkey="hp_showServices"
                hint="3 service cards — Electrician, Solar, Interior"
              />
              <Toggle
                label="⭐ Testimonials / Reviews Section"
                fkey="hp_showTestimonials"
                hint="Customer review cards"
              />
              <Toggle
                label="📞 CTA Band"
                fkey="hp_showCtaBand"
                hint="Free estimate call-to-action band"
              />
              <Toggle
                label="🛒 Products Section"
                fkey="hp_showProducts"
                hint="Affiliate product cards"
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: 8,
                }}
              >
                📞 CTA Band Text
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                  gap: 14,
                }}
              >
                <Inp
                  label="CTA Main Title"
                  fkey="hp_ctaTitle"
                  hint="e.g. Free Estimate Chahiye?"
                />
                <Inp
                  label="CTA Subtitle"
                  fkey="hp_ctaSub"
                  hint="(CTA ke neeche description)"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── SERVICES ── */}
        {tab === "services" && (
          <div>
            {infoBox(
              "💡 Individual services toggle karo aur unka text customize karo. Band karne pe woh card homepage se hat jaata hai.",
            )}

            <div
              style={{
                fontWeight: 800,
                fontSize: "0.9rem",
                marginBottom: 12,
                color: "#1d4ed8",
              }}
            >
              ⚡ Electrician Service
            </div>
            <Toggle label="Electrician Card Dikhao" fkey="hp_showElectrician" />
            {form.hp_showElectrician !== false && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <Inp
                  label="Badge Text"
                  fkey="hp_elec_badge"
                  hint="e.g. Same Day"
                />
                <Inp label="Tagline" fkey="hp_elec_tagline" />
                <Inp
                  label="Starting Price"
                  fkey="hp_elec_price"
                  hint="e.g. ₹150 se shuru"
                />
              </div>
            )}

            <div
              style={{
                fontWeight: 800,
                fontSize: "0.9rem",
                marginBottom: 12,
                color: "#b45309",
              }}
            >
              ☀️ Solar & Battery
            </div>
            <Toggle label="Solar Card Dikhao" fkey="hp_showSolar" />
            {form.hp_showSolar !== false && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <Inp
                  label="Badge Text"
                  fkey="hp_solar_badge"
                  hint="e.g. 40% Subsidy"
                />
                <Inp label="Tagline" fkey="hp_solar_tagline" />
                <Inp
                  label="Starting Price"
                  fkey="hp_solar_price"
                  hint="e.g. ₹35,000 se shuru"
                />
              </div>
            )}

            <div
              style={{
                fontWeight: 800,
                fontSize: "0.9rem",
                marginBottom: 12,
                color: "#7c3aed",
              }}
            >
              🏠 Interior Design
            </div>
            <Toggle label="Interior Card Dikhao" fkey="hp_showInterior" />
            {form.hp_showInterior !== false && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <Inp
                  label="Badge Text"
                  fkey="hp_int_badge"
                  hint="e.g. Free Home Visit"
                />
                <Inp label="Tagline" fkey="hp_int_tagline" />
                <Inp
                  label="Starting Price"
                  fkey="hp_int_price"
                  hint="e.g. ₹15,000 se shuru"
                />
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                gap: 14,
                marginTop: 8,
              }}
            >
              <Inp label="Services Section Title" fkey="hp_servicesTitle" />
              <Inp label="Services Section Subtitle" fkey="hp_servicesSub" />
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS ── */}
        {tab === "testi" && (
          <div>
            {infoBox(
              "💡 Reviews section ka text aur saare customer reviews yahan se edit karo.",
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                gap: 14,
              }}
            >
              <Inp label="Section Title" fkey="hp_testiTitle" />
              <Inp label="Section Subtitle" fkey="hp_testiSub" />
              <Inp
                label="Total Review Count"
                fkey="hp_testiCount"
                hint="e.g. 500+"
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: 6,
                }}
              >
                Customer Reviews (JSON)
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginBottom: 8,
                  background: "#f8fafc",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              >
                Har review mein ye fields chahiye:
                <br />
                <code
                  style={{ fontSize: "0.7rem" }}
                >{`{"id":1,"name":"Naam","city":"Sheher","rating":5,"initials":"AB","color":"#1d4ed8","text":"Review text","service":"Service naam"}`}</code>
              </div>
              {testiErr && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {testiErr}
                </div>
              )}
              <textarea
                value={form.hp_testimonials || "[]"}
                onChange={(e) => {
                  update("hp_testimonials", e.target.value);
                  validateTesti(e.target.value);
                }}
                rows={14}
                style={{
                  width: "100%",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  padding: 10,
                  border: `1.5px solid ${testiErr ? "#fca5a5" : "#e2e8f0"}`,
                  borderRadius: 8,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === "prods" && (
          <div>
            {infoBox(
              "💡 Products section ka title aur affiliate disclosure text yahan se change karo. Products khud 🛒 Products tab se manage hote hain.",
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Products Section Title"
                fkey="hp_productsTitle"
                hint="e.g. Expert-Curated Picks"
              />
            </div>
            <Inp
              label="Affiliate Disclosure Text"
              fkey="hp_affiliateDisc"
              hint="(products ke neeche dikhta hai — legal ke liye zaroori hai)"
              rows={2}
            />
            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 10,
                padding: "10px 14px",
                marginTop: 8,
                fontSize: "0.8rem",
                color: "#92400e",
              }}
            >
              ⚠️ Products ko add/edit/delete karne ke liye →{" "}
              <strong>🛒 Products tab</strong> mein jao. Wahan se product ki{" "}
              <strong>Visible</strong> field toggle karo — band karne pe
              homepage pe nahi dikhega.
            </div>
          </div>
        )}

        {/* Save Button */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "2px solid #f1f5f9",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button className="al-btn" onClick={save}>
            ✅ Homepage Save Karo
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.82rem", color: "#1565c0", fontWeight: 700 }}
          >
            🔗 Homepage Preview →
          </a>
        </div>
      </div>
    );
  }

  // ── Service Pages Manager ─────────────────────────────────
  function ServicePagesManager() {
    const { settings, saveSettings, showToast } = useSettings();
    const [form, setForm] = useState({ ...settings });
    const [tab, setTab] = useState("electrician");

    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));
    const save = () => {
      saveSettings(form);
      showToast("✅ Service page update ho gaya! Refresh karo.");
    };

    const Inp = ({ label, fkey, hint, rows }) => (
      <div className="al-field">
        <label>
          {label}
          {hint && (
            <span
              style={{
                fontWeight: 400,
                color: "#94a3b8",
                fontSize: "0.72rem",
                marginLeft: 6,
              }}
            >
              {hint}
            </span>
          )}
        </label>
        {rows ? (
          <textarea
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
            rows={rows}
            style={{ resize: "vertical" }}
          />
        ) : (
          <input
            type="text"
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
          />
        )}
      </div>
    );

    const JsonEditor = ({ label, fkey, hint, rows = 12 }) => {
      const [err, setErr] = useState("");
      return (
        <div className="al-field">
          <label>
            {label}
            {hint && (
              <span
                style={{
                  fontWeight: 400,
                  color: "#94a3b8",
                  fontSize: "0.72rem",
                  marginLeft: 6,
                }}
              >
                {hint}
              </span>
            )}
          </label>
          {err && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "0.75rem",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {err}
            </div>
          )}
          <textarea
            value={form[fkey] || "[]"}
            onChange={(e) => {
              update(fkey, e.target.value);
              try {
                JSON.parse(e.target.value);
                setErr("");
              } catch {
                setErr("❌ JSON format galat hai");
              }
            }}
            rows={rows}
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              resize: "vertical",
              border: err ? "1.5px solid #fca5a5" : undefined,
            }}
          />
        </div>
      );
    };

    const STABS = [
      { id: "electrician", label: "⚡ Electrician" },
      { id: "solar", label: "☀️ Solar" },
      { id: "interior", label: "🏠 Interior" },
    ];

    const infoBox = (msg) => (
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 16,
          fontSize: "0.8rem",
          color: "#1e40af",
        }}
      >
        {msg}
      </div>
    );

    const StatsRow = ({ prefix }) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            style={{
              background: "#f8fafc",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#64748b",
                marginBottom: 6,
              }}
            >
              Stat {n}
            </div>
            <Inp label="Number" fkey={`${prefix}_stat${n}n`} />
            <Inp label="Label" fkey={`${prefix}_stat${n}l`} />
          </div>
        ))}
      </div>
    );

    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
          🔧 Service Pages Control
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 20 }}
        >
          Electrician, Solar, Interior — teeno service pages ka poora content
          yahan se control karo. Hero text, services list, prices, reviews,
          FAQs, guarantees — sab.
        </div>

        {/* Service tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 20,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 12,
          }}
        >
          {STABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 16px",
                background: tab === t.id ? "#0f172a" : "#f1f5f9",
                color: tab === t.id ? "#fff" : "#475569",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ELECTRICIAN ── */}
        {tab === "electrician" && (
          <div>
            {infoBox(
              "⚡ Electrician service page — hero text, stats, reviews, services, FAQs aur guarantees yahan se change karo.",
            )}

            <div
              style={{ fontWeight: 800, color: "#1d4ed8", marginBottom: 10 }}
            >
              🦸 Hero Section
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Hero Title"
                fkey="elec_heroTitle"
                hint="e.g. Trusted Electrician"
              />
              <Inp
                label="Hero Emphasis (green line)"
                fkey="elec_heroEm"
                hint="e.g. Haldwani — Same Day"
              />
              <Inp
                label="Review Count"
                fkey="elec_reviewCount"
                hint="e.g. 500+"
              />
              <Inp label="Reviews Section Title" fkey="elec_reviewsTitle" />
            </div>
            <Inp label="Hero Subtitle" fkey="elec_heroSub" rows={3} />
            <Inp
              label="Trust Badges"
              fkey="elec_trustBadges"
              hint="Pipe | se alag karo — e.g. ⚡ 1–3 hr|✅ Free estimate"
            />
            <Inp
              label="Guarantees List"
              fkey="elec_guarantees"
              hint="Pipe | se alag karo — e.g. Free estimate|Same day response"
            />

            <div
              style={{
                fontWeight: 800,
                color: "#1d4ed8",
                margin: "16px 0 10px",
              }}
            >
              📊 Stats
            </div>
            <StatsRow prefix="elec" />

            <div
              style={{
                fontWeight: 800,
                color: "#1d4ed8",
                margin: "16px 0 10px",
              }}
            >
              🔧 Services List (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"id":"e1","emoji":"🔌","name":"Home Wiring","price":"₹500+","description":"...","available":true}]`}</code>
            </div>
            <JsonEditor fkey="elec_services" rows={14} />

            <div
              style={{
                fontWeight: 800,
                color: "#1d4ed8",
                margin: "16px 0 10px",
              }}
            >
              ⭐ Reviews (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"name":"Ramesh","city":"Haldwani","stars":5,"text":"...","svc":"Home Wiring"}]`}</code>
            </div>
            <JsonEditor fkey="elec_reviews" rows={12} />

            <div
              style={{
                fontWeight: 800,
                color: "#1d4ed8",
                margin: "16px 0 10px",
              }}
            >
              ❓ FAQs (JSON)
            </div>
            <JsonEditor
              fkey="elec_faqs"
              rows={12}
              label=""
              hint={`Format: [{"q":"Question?","a":"Answer."}]`}
            />

            <div
              style={{ marginTop: 8, fontSize: "0.78rem", color: "#64748b" }}
            >
              💡 Service areas ke liye →{" "}
              <strong>⚙️ Settings → Areas tab</strong> mein jao
            </div>
          </div>
        )}

        {/* ── SOLAR ── */}
        {tab === "solar" && (
          <div>
            {infoBox(
              "☀️ Solar service page — hero text, urgency message, stats, reviews, services, FAQs aur guarantees yahan se change karo.",
            )}

            <div
              style={{ fontWeight: 800, color: "#b45309", marginBottom: 10 }}
            >
              🦸 Hero Section
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Hero Title"
                fkey="solar_heroTitle"
                hint="e.g. Bijli Bill 90% Kam Karo"
              />
              <Inp
                label="Hero Emphasis (green)"
                fkey="solar_heroEm"
                hint="e.g. Solar Se Apna Ghar Chalao"
              />
              <Inp
                label="Urgency Message (top bar)"
                fkey="solar_urgency"
                hint="e.g. Is hafte sirf 3 slots available!"
              />
              <Inp
                label="Review/Install Count"
                fkey="solar_reviewCount"
                hint="e.g. 200+"
              />
            </div>
            <Inp label="Hero Subtitle" fkey="solar_heroSub" rows={3} />
            <Inp
              label="Guarantees List"
              fkey="solar_guarantees"
              hint="Pipe | se alag karo"
            />

            <div
              style={{
                fontWeight: 800,
                color: "#b45309",
                margin: "16px 0 10px",
              }}
            >
              📊 Stats
            </div>
            <StatsRow prefix="solar" />

            <div
              style={{
                fontWeight: 800,
                color: "#b45309",
                margin: "16px 0 10px",
              }}
            >
              ☀️ Services List (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"emoji":"☀️","name":"Solar Panel System","from":"₹35,000","was":"₹45,000","badge":"Most Popular","desc":"..."}]`}</code>
            </div>
            <JsonEditor fkey="solar_services" rows={14} />

            <div
              style={{
                fontWeight: 800,
                color: "#b45309",
                margin: "16px 0 10px",
              }}
            >
              ⭐ Reviews (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"name":"Rajesh","city":"Haldwani","stars":5,"text":"...","service":"Solar Panel"}]`}</code>
            </div>
            <JsonEditor fkey="solar_reviews" rows={12} />

            <div
              style={{
                fontWeight: 800,
                color: "#b45309",
                margin: "16px 0 10px",
              }}
            >
              ❓ FAQs (JSON)
            </div>
            <JsonEditor
              fkey="solar_faqs"
              rows={12}
              label=""
              hint={`Format: [{"q":"Question?","a":"Answer."}]`}
            />
          </div>
        )}

        {/* ── INTERIOR ── */}
        {tab === "interior" && (
          <div>
            {infoBox(
              "🏠 Interior design page — hero text, stats, reviews, services, FAQs aur guarantees yahan se change karo.",
            )}

            <div
              style={{ fontWeight: 800, color: "#7c3aed", marginBottom: 10 }}
            >
              🦸 Hero Section
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Hero Title"
                fkey="int_heroTitle"
                hint="e.g. Sapno Ka Ghar Banao"
              />
              <Inp
                label="Hero Emphasis (green)"
                fkey="int_heroEm"
                hint="e.g. Budget Mein — Haldwani"
              />
              <Inp
                label="Review/Project Count"
                fkey="int_reviewCount"
                hint="e.g. 300+"
              />
            </div>
            <Inp label="Hero Subtitle" fkey="int_heroSub" rows={2} />
            <Inp
              label="Guarantees List"
              fkey="int_guarantees"
              hint="Pipe | se alag karo"
            />

            <div
              style={{
                fontWeight: 800,
                color: "#7c3aed",
                margin: "16px 0 10px",
              }}
            >
              📊 Stats
            </div>
            <StatsRow prefix="int" />

            <div
              style={{
                fontWeight: 800,
                color: "#7c3aed",
                margin: "16px 0 10px",
              }}
            >
              🏠 Services List (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"emoji":"🍳","name":"Modular Kitchen","from":"₹80,000","was":"₹1,10,000","badge":"Most Popular","desc":"..."}]`}</code>
            </div>
            <JsonEditor fkey="int_services" rows={14} />

            <div
              style={{
                fontWeight: 800,
                color: "#7c3aed",
                margin: "16px 0 10px",
              }}
            >
              ⭐ Reviews (JSON)
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              Format:{" "}
              <code
                style={{ fontSize: "0.7rem" }}
              >{`[{"name":"Anjali","city":"Haldwani","stars":5,"text":"...","svc":"Modular Kitchen"}]`}</code>
            </div>
            <JsonEditor fkey="int_reviews" rows={12} />

            <div
              style={{
                fontWeight: 800,
                color: "#7c3aed",
                margin: "16px 0 10px",
              }}
            >
              ❓ FAQs (JSON)
            </div>
            <JsonEditor
              fkey="int_faqs"
              rows={12}
              label=""
              hint={`Format: [{"q":"Question?","a":"Answer."}]`}
            />
          </div>
        )}

        {/* Save */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "2px solid #f1f5f9",
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="al-btn" onClick={save}>
            ✅ Service Page Save Karo
          </button>
          <a
            href={
              tab === "electrician"
                ? "/electrician-haldwani"
                : tab === "solar"
                  ? "/solar-solutions"
                  : "/interior-design"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.82rem", color: "#1565c0", fontWeight: 700 }}
          >
            🔗 Page Preview →
          </a>
        </div>
      </div>
    );
  }

  // ── Pages Manager ─────────────────────────────────────────
  function PagesManager() {
    const { settings, saveSettings, showToast } = useSettings();
    const [form, setForm] = useState({ ...settings });
    const [tab, setTab] = useState("about");

    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));
    const save = () => {
      saveSettings(form);
      showToast("✅ Page content save ho gaya!");
    };

    const Inp = ({ label, fkey, hint, rows }) => (
      <div className="al-field">
        <label>
          {label}
          {hint && (
            <span
              style={{
                fontWeight: 400,
                color: "#94a3b8",
                fontSize: "0.72rem",
                marginLeft: 6,
              }}
            >
              {hint}
            </span>
          )}
        </label>
        {rows ? (
          <textarea
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
            rows={rows}
            style={{ resize: "vertical" }}
          />
        ) : (
          <input
            type="text"
            value={form[fkey] || ""}
            onChange={(e) => update(fkey, e.target.value)}
          />
        )}
      </div>
    );

    const PTABS = [
      { id: "about", label: "🏢 About" },
      { id: "contact", label: "📞 Contact" },
      { id: "privacy", label: "🔒 Privacy" },
      { id: "terms", label: "📋 Terms" },
      { id: "disclaimer", label: "⚠️ Disclaimer" },
    ];

    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
          📄 Pages
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 20 }}
        >
          About, Contact, Privacy Policy, Terms — sab Admin se edit karo. Save
          karne ke baad website pe turant update ho jaata hai.
        </div>

        {/* Page tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 20,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 12,
          }}
        >
          {PTABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 14px",
                background: tab === t.id ? "#0f172a" : "#f1f5f9",
                color: tab === t.id ? "#fff" : "#475569",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ABOUT PAGE ── */}
        {tab === "about" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: "0.8rem",
                color: "#1e40af",
              }}
            >
              💡 Ye content <strong>/about</strong> page pe dikhega — apne
              business ke baare mein likho
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Main Heading"
                fkey="aboutHeading"
                hint="(page ka title)"
              />
              <Inp
                label="Tagline"
                fkey="aboutTagline"
                hint="(heading ke neeche)"
              />
            </div>
            <Inp
              label="Description"
              fkey="aboutDesc"
              hint="(apne baare mein 2-3 lines)"
              rows={4}
            />
            <Inp
              label="Mission Statement"
              fkey="aboutMission"
              hint="(optional)"
              rows={2}
            />
            <Inp
              label="Features / Services List"
              fkey="aboutFeatures"
              hint="(har item ek nayi line pe, ✅ se shuru karo)"
              rows={6}
            />
            <Inp
              label="Extra Content"
              fkey="aboutExtra"
              hint="(optional — kuch aur add karna ho toh)"
              rows={3}
            />
            <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
              ✅ About Page Save Karo
            </button>
            <div style={{ marginTop: 10 }}>
              <a
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#1565c0",
                  fontWeight: 700,
                }}
              >
                🔗 About Page Preview →
              </a>
            </div>
          </div>
        )}

        {/* ── CONTACT PAGE ── */}
        {tab === "contact" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: "0.8rem",
                color: "#1e40af",
              }}
            >
              💡 Contact page ke liye{" "}
              <strong>phone, WhatsApp, email, address</strong> — Settings → Site
              Info mein update karo.
              <br />
              Yahan sirf heading aur subtext change karo.
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Page Heading"
                fkey="contactHeading"
                hint="e.g. Hamse Baat Karo"
              />
              <Inp
                label="Google Maps Embed URL"
                fkey="contactMapUrl"
                hint="(optional — Google Maps → Share → Embed URL)"
              />
            </div>
            <Inp
              label="Subtext"
              fkey="contactSubtext"
              hint="(heading ke neeche short description)"
              rows={2}
            />
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 10,
                padding: "12px 14px",
                marginTop: 16,
                fontSize: "0.82rem",
                color: "#475569",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                📞 Current Contact Info:
              </div>
              <div>
                Phone: <strong>{settings.phone}</strong>
              </div>
              <div>
                WhatsApp: <strong>{settings.whatsapp}</strong>
              </div>
              <div>
                Email: <strong>{settings.email}</strong>
              </div>
              <div>
                Address: <strong>{settings.address}</strong>
              </div>
              <div
                style={{ marginTop: 8, fontSize: "0.75rem", color: "#94a3b8" }}
              >
                Ye change karne ke liye → Settings → 📋 Site Info tab mein jao
              </div>
            </div>
            <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
              ✅ Contact Page Save Karo
            </button>
            <div style={{ marginTop: 10 }}>
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#1565c0",
                  fontWeight: 700,
                }}
              >
                🔗 Contact Page Preview →
              </a>
            </div>
          </div>
        )}

        {/* ── PRIVACY POLICY ── */}
        {tab === "privacy" && (
          <div>
            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: "0.8rem",
                color: "#92400e",
              }}
            >
              ⚠️ Privacy Policy{" "}
              <strong>Google AdSense approval ke liye zaroori hai</strong>.
              Default content already set hai jo valid hai. Sirf date aur extra
              notes update karo.
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Last Updated Date"
                fkey="privacyLastUpdated"
                hint="e.g. March 2026"
              />
            </div>
            <Inp
              label="Extra Custom Text"
              fkey="privacyCustomText"
              hint="(optional — koi additional clause add karna ho)"
              rows={5}
            />
            <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
              ✅ Privacy Policy Save Karo
            </button>
            <div style={{ marginTop: 10 }}>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#1565c0",
                  fontWeight: 700,
                }}
              >
                🔗 Privacy Policy Preview →
              </a>
            </div>
          </div>
        )}

        {/* ── TERMS ── */}
        {tab === "terms" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: "0.8rem",
                color: "#1e40af",
              }}
            >
              💡 Default Terms of Use already set hai. Sirf date aur extra
              clauses update karo.
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              <Inp
                label="Last Updated Date"
                fkey="termsLastUpdated"
                hint="e.g. March 2026"
              />
            </div>
            <Inp
              label="Extra Custom Text"
              fkey="termsCustomText"
              hint="(optional — koi additional clause add karna ho)"
              rows={5}
            />
            <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
              ✅ Terms Save Karo
            </button>
            <div style={{ marginTop: 10 }}>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#1565c0",
                  fontWeight: 700,
                }}
              >
                🔗 Terms Preview →
              </a>
            </div>
          </div>
        )}

        {/* ── DISCLAIMER ── */}
        {tab === "disclaimer" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: "0.8rem",
                color: "#1e40af",
              }}
            >
              💡 Default Disclaimer already set hai. Koi extra text add karna ho
              toh neeche likho.
            </div>
            <Inp
              label="Extra Disclaimer Text"
              fkey="disclaimerCustomText"
              hint="(optional)"
              rows={5}
            />
            <button className="al-btn" style={{ marginTop: 16 }} onClick={save}>
              ✅ Disclaimer Save Karo
            </button>
            <div style={{ marginTop: 10 }}>
              <a
                href="/disclaimer"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#1565c0",
                  fontWeight: 700,
                }}
              >
                🔗 Disclaimer Preview →
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Settings Manager ────────────────────────────────────────
  function SettingsManager() {
    const { settings, saveSettings, showToast } = useSettings();
    const [form, setForm] = useState({ ...settings });
    const [tab, setTab] = useState("firebase");
    const [pwForm, setPwForm] = useState({
      newEmail: "",
      newPass: "",
      confirm: "",
    });
    const [pwErr, setPwErr] = useState("");

    const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    const inp = (label, key, type = "text", placeholder = "", hint = "") => (
      <div className="al-field" key={key}>
        <label>
          {label}
          {hint && (
            <span
              style={{
                fontWeight: 400,
                color: "#94a3b8",
                fontSize: "0.72rem",
                marginLeft: 6,
              }}
            >
              {hint}
            </span>
          )}
        </label>
        <input
          type={type}
          value={form[key] || ""}
          onChange={(e) => update(key, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    );

    const saveAll = () => {
      saveSettings(form);
      showToast("✅ Settings save ho gayi!");
    };

    const changePassword = () => {
      if (!pwForm.newEmail.trim() || !pwForm.newPass.trim())
        return setPwErr("Email aur password dono daalo");
      if (pwForm.newPass !== pwForm.confirm)
        return setPwErr("Password match nahi karta");
      if (pwForm.newPass.length < 6)
        return setPwErr("Password minimum 6 characters ka hona chahiye");
      localStorage.setItem(
        "almenso_admin_creds",
        JSON.stringify({ email: pwForm.newEmail, password: pwForm.newPass }),
      );
      setPwErr("");
      setPwForm({ newEmail: "", newPass: "", confirm: "" });
      showToast("✅ Admin login update ho gaya!");
    };

    const STABS = [
      { id: "firebase", label: "🔥 Firebase" },
      { id: "analytics", label: "📊 Analytics" },
      { id: "adsense", label: "💰 AdSense" },
      { id: "areas", label: "📍 Service Areas" },
      { id: "site", label: "📋 Site Info" },
      { id: "security", label: "🔒 Security" },
    ];

    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
          ⚙️ Settings
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 20 }}
        >
          Yahan se Firebase keys, AdSense ID, site info, aur admin password
          manage karo
        </div>

        {/* Sub-tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 20,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 12,
          }}
        >
          {STABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 16px",
                background: tab === t.id ? "#0f172a" : "#f1f5f9",
                color: tab === t.id ? "#fff" : "#475569",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── FIREBASE TAB ── */}
        {tab === "firebase" && (
          <div>
            <div
              style={{
                background: "#fff7ed",
                border: "1.5px solid #fed7aa",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#c2410c",
                  marginBottom: 8,
                  fontSize: "0.9rem",
                }}
              >
                🔥 Firebase Setup Kaise Karo?
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#7c2d12",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  <strong>Step 1:</strong>{" "}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1565c0" }}
                  >
                    console.firebase.google.com
                  </a>{" "}
                  pe jao → New Project banao
                </div>
                <div>
                  <strong>Step 2:</strong> Project Settings → Add Web App →
                  firebaseConfig copy karo
                </div>
                <div>
                  <strong>Step 3:</strong> Firestore Database → Create database
                  → "Start in test mode" select karo
                </div>
                <div>
                  <strong>Step 4:</strong> Neeche keys paste karo → Save karo
                </div>
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 12px",
                    background: "#fef3c7",
                    borderRadius: 8,
                    color: "#92400e",
                    fontWeight: 600,
                  }}
                >
                  ⚠️ Note: Ye keys <code>src/utils/firebase.js</code> file mein
                  bhi dalni padti hain deploy se pehle — sirf admin se save
                  karna sirf local storage mein save hoga
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              {inp(
                "API Key *",
                "firebaseApiKey",
                "text",
                "AIzaSy...",
                "(Project Settings → Your apps)",
              )}
              {inp(
                "Auth Domain *",
                "firebaseAuthDomain",
                "text",
                "your-project.firebaseapp.com",
              )}
              {inp(
                "Project ID *",
                "firebaseProjectId",
                "text",
                "your-project-id",
              )}
              {inp(
                "Storage Bucket",
                "firebaseStorageBucket",
                "text",
                "your-project.appspot.com",
              )}
              {inp(
                "Messaging Sender ID",
                "firebaseMessagingSenderId",
                "text",
                "123456789",
              )}
              {inp("App ID *", "firebaseAppId", "text", "1:123:web:abc123")}
            </div>

            {/* firebase.js content generator */}
            {(form.firebaseApiKey || form.firebaseProjectId) && (
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    marginBottom: 8,
                  }}
                >
                  📋 Copy karo aur src/utils/firebase.js mein paste karo:
                </div>
                <div
                  style={{
                    background: "#0f172a",
                    borderRadius: 12,
                    padding: "16px",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    color: "#e2e8f0",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    overflowX: "auto",
                  }}
                >
                  {`export const firebaseConfig = {
  apiKey:            '${form.firebaseApiKey || "YOUR_API_KEY"}',
  authDomain:        '${form.firebaseAuthDomain || "YOUR_PROJECT.firebaseapp.com"}',
  projectId:         '${form.firebaseProjectId || "YOUR_PROJECT_ID"}',
  storageBucket:     '${form.firebaseStorageBucket || "YOUR_PROJECT.appspot.com"}',
  messagingSenderId: '${form.firebaseMessagingSenderId || "YOUR_SENDER_ID"}',
  appId:             '${form.firebaseAppId || "YOUR_APP_ID"}',
}`}
                </div>
                <button
                  onClick={() => {
                    const code = `export const firebaseConfig = {\n  apiKey:            '${form.firebaseApiKey || ""}',\n  authDomain:        '${form.firebaseAuthDomain || ""}',\n  projectId:         '${form.firebaseProjectId || ""}',\n  storageBucket:     '${form.firebaseStorageBucket || ""}',\n  messagingSenderId: '${form.firebaseMessagingSenderId || ""}',\n  appId:             '${form.firebaseAppId || ""}',\n}`;
                    navigator.clipboard?.writeText(code);
                    showToast("📋 Code copied!");
                  }}
                  style={{
                    marginTop: 10,
                    padding: "9px 18px",
                    background: "#1565c0",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.82rem",
                  }}
                >
                  📋 Copy Code
                </button>
              </div>
            )}

            <button
              className="al-btn"
              style={{ marginTop: 20 }}
              onClick={saveAll}
            >
              ✅ Firebase Settings Save Karo
            </button>
          </div>
        )}

        {/* ── SERVICE AREAS TAB ── */}
        {tab === "areas" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1.5px solid #bfdbfe",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontWeight: 800, color: "#1e40af", marginBottom: 8 }}
              >
                📍 Service Area Kya Hai?
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#1e40af",
                  lineHeight: 1.8,
                }}
              >
                Yahan jo areas daalo — sirf wahi areas form mein dikhengi.
                <br />
                Agar koi bahar ka area select kare toh{" "}
                <strong>"Is area mein service nahi"</strong> message dikhega.
                <br />
                <strong>Format:</strong> Comma se alag karo —{" "}
                <code>Haldwani,Kathgodam,Lalkuan</code>
              </div>
            </div>

            {/* Electrician Areas */}
            <div className="al-field">
              <label>
                ⚡ Electrician Service Areas
                <span
                  style={{
                    fontWeight: 400,
                    color: "#94a3b8",
                    fontSize: "0.72rem",
                    marginLeft: 6,
                  }}
                >
                  (comma separated — yahi areas form mein dikhengi)
                </span>
              </label>
              <textarea
                value={form.electricianAreas || ""}
                onChange={(e) => update("electricianAreas", e.target.value)}
                rows={3}
                placeholder="Haldwani City,Kathgodam,Lalkuan,Transport Nagar,Indira Nagar"
                style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
              />
              <div
                style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4 }}
              >
                Preview:{" "}
                {(form.electricianAreas || "")
                  .split(",")
                  .filter(Boolean)
                  .map((a) => (
                    <span
                      key={a}
                      style={{
                        background: "#dbeafe",
                        color: "#1565c0",
                        padding: "2px 7px",
                        borderRadius: 99,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        marginRight: 4,
                        marginTop: 2,
                        display: "inline-block",
                      }}
                    >
                      {a.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {/* Solar Areas */}
            <div className="al-field" style={{ marginTop: 16 }}>
              <label>
                ☀️ Solar Service Areas
                <span
                  style={{
                    fontWeight: 400,
                    color: "#94a3b8",
                    fontSize: "0.72rem",
                    marginLeft: 6,
                  }}
                >
                  (Solar page ki city dropdown)
                </span>
              </label>
              <textarea
                value={form.solarAreas || ""}
                onChange={(e) => update("solarAreas", e.target.value)}
                rows={3}
                placeholder="Haldwani,Nainital,Rudrapur,Kashipur,Ramnagar"
                style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
              />
              <div
                style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4 }}
              >
                Preview:{" "}
                {(form.solarAreas || "")
                  .split(",")
                  .filter(Boolean)
                  .map((a) => (
                    <span
                      key={a}
                      style={{
                        background: "#fef3c7",
                        color: "#b45309",
                        padding: "2px 7px",
                        borderRadius: 99,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        marginRight: 4,
                        marginTop: 2,
                        display: "inline-block",
                      }}
                    >
                      {a.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {/* Interior Areas */}
            <div className="al-field" style={{ marginTop: 16 }}>
              <label>
                🏠 Interior Design Service Areas
                <span
                  style={{
                    fontWeight: 400,
                    color: "#94a3b8",
                    fontSize: "0.72rem",
                    marginLeft: 6,
                  }}
                >
                  (Interior page ki location dropdown)
                </span>
              </label>
              <textarea
                value={form.interiorAreas || ""}
                onChange={(e) => update("interiorAreas", e.target.value)}
                rows={3}
                placeholder="Haldwani,Nainital,Bhowali,Rudrapur,Ramnagar"
                style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
              />
              <div
                style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4 }}
              >
                Preview:{" "}
                {(form.interiorAreas || "")
                  .split(",")
                  .filter(Boolean)
                  .map((a) => (
                    <span
                      key={a}
                      style={{
                        background: "#ede9fe",
                        color: "#4f46e5",
                        padding: "2px 7px",
                        borderRadius: 99,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        marginRight: 4,
                        marginTop: 2,
                        display: "inline-block",
                      }}
                    >
                      {a.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "#f0fdf4",
                borderRadius: 10,
                fontSize: "0.8rem",
                color: "#166534",
              }}
            >
              💡 <strong>Tip:</strong> Naya area add karna ho toh bas comma ke
              baad likhdo — e.g. <code>...Lalkuan,Ramnagar</code>. Remove karna
              ho toh us area ka naam hata do.
            </div>

            <button
              className="al-btn"
              style={{ marginTop: 16 }}
              onClick={saveAll}
            >
              ✅ Service Areas Save Karo
            </button>
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {tab === "analytics" && (
          <div>
            <div style={{ fontWeight: 900, fontSize: "1rem", marginBottom: 4 }}>
              📊 Google Analytics & Search Console
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#64748b",
                marginBottom: 20,
              }}
            >
              Yahan se website ka traffic track karo aur Google Search mein fast
              index karo
            </div>

            {/* ── GA4 Section ── */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1.5px solid #bbf7d0",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#14532d",
                  marginBottom: 10,
                  fontSize: "0.95rem",
                }}
              >
                📈 Google Analytics 4 (GA4)
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#166534",
                  lineHeight: 1.9,
                  marginBottom: 12,
                }}
              >
                <div>
                  <strong>Kya milega:</strong> Kitne log aaye, kahan se aaye,
                  kaun sa tool zyada use hua, leads kitni aayi
                </div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>
                  Setup Steps:
                </div>
                <div>
                  <strong>Step 1:</strong>{" "}
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1565c0" }}
                  >
                    analytics.google.com
                  </a>{" "}
                  pe jao → Sign in
                </div>
                <div>
                  <strong>Step 2:</strong> Admin → Create Property → Property
                  name: "Almenso" → India → INR select karo
                </div>
                <div>
                  <strong>Step 3:</strong> Data Stream → Web → almenso.com daalo
                  → Stream create karo
                </div>
                <div>
                  <strong>Step 4:</strong> Measurement ID copy karo — format:{" "}
                  <code
                    style={{
                      background: "#dcfce7",
                      padding: "1px 6px",
                      borderRadius: 4,
                    }}
                  >
                    G-XXXXXXXXXX
                  </code>
                </div>
                <div>
                  <strong>Step 5:</strong> Neeche paste karo → Save karo → Done!
                  🎉
                </div>
              </div>
              <div className="al-field" style={{ marginBottom: 0 }}>
                <label>
                  GA4 Measurement ID
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#94a3b8",
                      fontSize: "0.72rem",
                      marginLeft: 6,
                    }}
                  >
                    (G- se shuru hoga)
                  </span>
                </label>
                <input
                  value={form.ga4MeasurementId || ""}
                  onChange={(e) => update("ga4MeasurementId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
                />
                {form.ga4MeasurementId &&
                  form.ga4MeasurementId.startsWith("G-") && (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "6px 10px",
                        background: "#dcfce7",
                        borderRadius: 8,
                        fontSize: "0.75rem",
                        color: "#166534",
                        fontWeight: 600,
                      }}
                    >
                      ✅ Valid ID format — Save karo toh automatically activate
                      ho jaayega
                    </div>
                  )}
                {form.ga4MeasurementId &&
                  !form.ga4MeasurementId.startsWith("G-") && (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "6px 10px",
                        background: "#fef2f2",
                        borderRadius: 8,
                        fontSize: "0.75rem",
                        color: "#dc2626",
                        fontWeight: 600,
                      }}
                    >
                      ⚠️ ID G- se shuru hona chahiye — check karo
                    </div>
                  )}
              </div>
            </div>

            {/* ── Search Console Section ── */}
            <div
              style={{
                background: "#eff6ff",
                border: "1.5px solid #bfdbfe",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#1e40af",
                  marginBottom: 10,
                  fontSize: "0.95rem",
                }}
              >
                🔍 Google Search Console
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#1e40af",
                  lineHeight: 1.9,
                  marginBottom: 12,
                }}
              >
                <div>
                  <strong>Kya milega:</strong> Google pe konse keywords se
                  traffic aa raha hai, website kahan rank kar rahi hai, indexing
                  errors
                </div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>
                  Setup Steps:
                </div>
                <div>
                  <strong>Step 1:</strong>{" "}
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1565c0" }}
                  >
                    search.google.com/search-console
                  </a>{" "}
                  pe jao
                </div>
                <div>
                  <strong>Step 2:</strong> Add Property → URL prefix →{" "}
                  <code>https://almenso.com</code> daalo
                </div>
                <div>
                  <strong>Step 3:</strong> Verification method:{" "}
                  <strong>"HTML tag"</strong> select karo
                </div>
                <div>
                  <strong>Step 4:</strong> Tag dikhega jaise:{" "}
                  <code
                    style={{
                      background: "#dbeafe",
                      padding: "1px 6px",
                      borderRadius: 4,
                    }}
                  >
                    &lt;meta name="google-site-verification" content="
                    <strong>abc123xyz</strong>"/&gt;
                  </code>
                </div>
                <div>
                  <strong>Step 5:</strong> Sirf <strong>content value</strong>{" "}
                  copy karo (quotes ke bina) → neeche paste karo → Save
                </div>
                <div>
                  <strong>Step 6:</strong> Search Console wapas jao → Verify
                  button dabao ✅
                </div>
                <div
                  style={{ marginTop: 8, fontWeight: 700, color: "#1565c0" }}
                >
                  📌 Deploy ke baad Sitemap bhi submit karo:
                </div>
                <div>
                  Search Console → Sitemaps → <code>sitemap.xml</code> type karo
                  → Submit
                </div>
              </div>
              <div className="al-field" style={{ marginBottom: 0 }}>
                <label>
                  Search Console Verification Code
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#94a3b8",
                      fontSize: "0.72rem",
                      marginLeft: 6,
                    }}
                  >
                    (sirf content value — tag nahi)
                  </span>
                </label>
                <input
                  value={form.searchConsoleCode || ""}
                  onChange={(e) => update("searchConsoleCode", e.target.value)}
                  placeholder="abc123xyz456def789... (content value paste karo)"
                  style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
                />
                {form.searchConsoleCode &&
                  form.searchConsoleCode.length > 10 && (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "6px 10px",
                        background: "#dbeafe",
                        borderRadius: 8,
                        fontSize: "0.75rem",
                        color: "#1e40af",
                        fontWeight: 600,
                      }}
                    >
                      ✅ Code daala hai — Save karo toh meta tag automatically
                      add ho jaayega
                    </div>
                  )}
              </div>
            </div>

            {/* What you can track */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  marginBottom: 10,
                }}
              >
                📊 GA4 Mein Kya Track Hoga (Automatically):
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  fontSize: "0.78rem",
                  color: "#475569",
                }}
              >
                {[
                  ["👥", "Page Views", "Har page ka traffic"],
                  ["🎯", "Lead Events", "Jab koi form submit kare"],
                  ["📱", "Device Type", "Mobile vs Desktop"],
                  ["📍", "Location", "Kaun se city se aaya"],
                  ["⏱️", "Session Time", "Kitni der ruka"],
                  ["🔧", "Top Tools", "Kaunsa tool zyada use"],
                  ["📝", "Blog Traffic", "Kaun sa article popular"],
                  ["🔄", "Bounce Rate", "Kitne log wapas gaye"],
                ].map(([ico, t, d]) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      gap: 8,
                      padding: "8px",
                      background: "#f8fafc",
                      borderRadius: 8,
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{ico}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#0f172a",
                        }}
                      >
                        {t}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
                        {d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="al-btn" onClick={saveAll}>
              ✅ Analytics Settings Save Karo
            </button>

            {/* Quick links */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 14px",
                  background: "#f1f5f9",
                  borderRadius: 8,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#475569",
                  textDecoration: "none",
                }}
              >
                📈 Google Analytics →
              </a>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 14px",
                  background: "#f1f5f9",
                  borderRadius: 8,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#475569",
                  textDecoration: "none",
                }}
              >
                🔍 Search Console →
              </a>
            </div>
          </div>
        )}

        {/* ── ADSENSE TAB ── */}
        {tab === "adsense" && (
          <div>
            <div
              style={{
                background: "#f0fdf4",
                border: "1.5px solid #bbf7d0",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontWeight: 800, color: "#14532d", marginBottom: 8 }}
              >
                💰 Google AdSense Setup
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#166534",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  <strong>Step 1:</strong>{" "}
                  <a
                    href="https://adsense.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1565c0" }}
                  >
                    adsense.google.com
                  </a>{" "}
                  pe account banao
                </div>
                <div>
                  <strong>Step 2:</strong> Website add karo → Approval ka wait
                  karo (usually 1-2 weeks)
                </div>
                <div>
                  <strong>Step 3:</strong> Approve hone ke baad: Ads → Overview
                  → Client ID copy karo (ca-pub-XXXXXX)
                </div>
                <div>
                  <strong>Step 4:</strong> Ad Units banao → Har unit ka Slot ID
                  copy karo
                </div>
                <div>
                  <strong>Step 5:</strong> Neeche fill karo → Save karo → Ads
                  automatically show honge
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 14,
              }}
            >
              {inp(
                "AdSense Client ID *",
                "adsenseClient",
                "text",
                "ca-pub-1234567890123456",
                "(Ads → Overview se milega)",
              )}
              {inp(
                "Ad Slot — Top",
                "adsenseSlotTop",
                "text",
                "1234567890",
                "(Page ke top pe dikhega)",
              )}
              {inp(
                "Ad Slot — Mid",
                "adsenseSlotMid",
                "text",
                "0987654321",
                "(Page ke beech mein)",
              )}
              {inp(
                "Ad Slot — Bottom",
                "adsenseSlotBottom",
                "text",
                "1122334455",
                "(Page ke bottom pe)",
              )}
            </div>

            {form.adsenseClient && (
              <div
                style={{
                  marginTop: 16,
                  padding: "10px 14px",
                  background: "#dcfce7",
                  borderRadius: 10,
                  fontSize: "0.82rem",
                  color: "#166534",
                  fontWeight: 600,
                }}
              >
                ✅ AdSense Client ID set hai: <code>{form.adsenseClient}</code>
              </div>
            )}

            <button
              className="al-btn"
              style={{ marginTop: 20 }}
              onClick={saveAll}
            >
              ✅ AdSense Settings Save Karo
            </button>
          </div>
        )}

        {/* ── SITE INFO TAB ── */}
        {tab === "site" && (
          <div>
            <div
              style={{
                marginBottom: 16,
                fontWeight: 800,
                fontSize: "0.85rem",
                color: "#475569",
              }}
            >
              📋 Basic Site Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              {inp("Site Name", "siteName", "text", "Almenso")}
              {inp("Tagline", "tagline", "text", "Haldwani Ka Digital Sahayak")}
              {inp("Phone Number", "phone", "tel", "+919258133689")}
              {inp(
                "WhatsApp Number",
                "whatsapp",
                "tel",
                "919258133689",
                "(Country code ke saath, + nahi)",
              )}
              {inp("Email", "email", "email", "support@almenso.com")}
              {inp(
                "Address",
                "address",
                "text",
                "Haldwani, Uttarakhand — 263139",
              )}
            </div>
            <button
              className="al-btn"
              style={{ marginTop: 20 }}
              onClick={saveAll}
            >
              ✅ Site Info Save Karo
            </button>
          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {tab === "security" && (
          <div>
            <div
              style={{
                background: "#fef2f2",
                border: "1.5px solid #fecaca",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontWeight: 800, color: "#991b1b", marginBottom: 6 }}
              >
                🔒 Admin Login Credentials
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#7f1d1d",
                  lineHeight: 1.7,
                }}
              >
                Default login: <strong>admin@almenso.com</strong> /{" "}
                <strong>almenso123</strong>
                <br />
                ⚠️ Deploy karne ke baad yeh zaroor change karo!
              </div>
            </div>

            {pwErr && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1.5px solid #fca5a5",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#dc2626",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                ⚠️ {pwErr}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              <div className="al-field">
                <label>Naya Admin Email *</label>
                <input
                  type="email"
                  value={pwForm.newEmail}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, newEmail: e.target.value }))
                  }
                  placeholder="admin@yourdomain.com"
                />
              </div>
              <div className="al-field">
                <label>
                  Naya Password *{" "}
                  <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                    (min 6 chars)
                  </span>
                </label>
                <input
                  type="password"
                  value={pwForm.newPass}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, newPass: e.target.value }))
                  }
                  placeholder="Strong password daalo"
                />
              </div>
              <div className="al-field">
                <label>Password Confirm Karo *</label>
                <input
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, confirm: e.target.value }))
                  }
                  placeholder="Same password dobara daalo"
                />
              </div>
            </div>

            <button
              onClick={changePassword}
              style={{
                marginTop: 16,
                padding: "12px 24px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 800,
                cursor: "pointer",
                fontSize: "0.88rem",
              }}
            >
              🔒 Admin Login Update Karo
            </button>

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{ fontWeight: 800, marginBottom: 12, color: "#475569" }}
              >
                📍 Admin Panel URL
              </div>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: "0.82rem",
                  color: "#475569",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  Main URL:{" "}
                  <code
                    style={{
                      background: "#e2e8f0",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    https://yourdomain.com/admin-panel
                  </code>
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                  }}
                >
                  Ya secret path: localStorage mein 'almenso_admin_path' key set
                  karo
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Affiliate Products Manager ────────────────────────────
  function AffiliateManager() {
    const { settings, saveSettings, showToast } = useSettings();

    const CATEGORIES = [
      { id: 'electrical',   label: '⚡ Electrical' },
      { id: 'solar',        label: '☀️ Solar' },
      { id: 'finance',      label: '💰 Finance' },
      { id: 'design',       label: '🖼️ Design' },
      { id: 'health',       label: '❤️ Health' },
      { id: 'tech',         label: '🔧 Tech' },
      { id: 'construction', label: '🏗️ Construction' },
      { id: 'writing',      label: '✍️ Writing' },
    ];

    const [activeCat, setActiveCat] = useState('electrical');
    const [activeSection, setActiveSection] = useState('products'); // 'products' | 'homepage' | 'passive'
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [form, setForm] = useState({});

    const BLANK = { name:'', price:'', was:'', badge:'', img:'🛒', rating:'4.0★', reviews:'1k+', tag:'', link:'', cta:'Buy on Amazon', visible:true };

    // Get all affiliate products (merged: defaults + admin overrides)
    const getAllProducts = () => {
      try {
        if (settings.affiliateProducts) return JSON.parse(settings.affiliateProducts);
      } catch {}
      return JSON.parse(JSON.stringify(DEFAULT_AFFILIATE_PRODUCTS));
    };


    const [allProds, setAllProds] = useState(getAllProducts);

    const catProds = allProds[activeCat] || [];

    const saveAll = (updated) => {
      setAllProds(updated);
      saveSettings({ affiliateProducts: JSON.stringify(updated) });
      showToast('✅ Affiliate products saved!');
    };

    const toggleVisible = (id) => {
      const updated = { ...allProds, [activeCat]: catProds.map(p => p.id === id ? { ...p, visible: !p.visible } : p) };
      saveAll(updated);
    };

    const deleteProduct = (id) => {
      if (!window.confirm('Yeh product delete karna chahte ho?')) return;
      const updated = { ...allProds, [activeCat]: catProds.filter(p => p.id !== id) };
      saveAll(updated);
    };

    const startEdit = (p) => {
      setForm({ ...p });
      setEditingId(p.id);
      setShowAddForm(false);
    };

    const saveEdit = () => {
      if (!form.name || !form.link) { showToast('❌ Name aur Link zaroori hai!'); return; }
      const updated = { ...allProds, [activeCat]: catProds.map(p => p.id === editingId ? { ...form, id: editingId } : p) };
      saveAll(updated);
      setEditingId(null);
    };

    const addProduct = () => {
      if (!form.name || !form.link) { showToast('❌ Name aur Link zaroori hai!'); return; }
      const newId = activeCat[0] + Date.now();
      const updated = { ...allProds, [activeCat]: [...catProds, { ...form, id: newId }] };
      saveAll(updated);
      setShowAddForm(false);
      setForm({});
    };

    const resetToDefaults = () => {
      if (!window.confirm('Sab products default pe reset ho jayenge! Sure?')) return;
      saveSettings({ affiliateProducts: '' });
      setAllProds(getAllProducts());
      showToast('✅ Defaults restore ho gaye!');
    };

    // Homepage featured products
    const getFeatured = () => {
      try { return JSON.parse(settings.hp_featuredProducts || '[]'); } catch { return []; }
    };
    const [featured, setFeatured] = useState(getFeatured);
    const BLANK_FP = { name:'', price:'', image:'🛒', badge:'', link:'' };
    const [fpEditIdx, setFpEditIdx] = useState(null);
    const [fpForm, setFpForm] = useState({});
    const [fpShowAdd, setFpShowAdd] = useState(false);

    const saveFeatured = (list) => {
      setFeatured(list);
      saveSettings({ hp_featuredProducts: JSON.stringify(list) });
      showToast('✅ Homepage products saved!');
    };

    const S = {
      wrap: { padding:'20px' },
      sectionBtns: { display:'flex', gap:8, marginBottom:20 },
      sBtn: (active) => ({ padding:'8px 18px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:'0.85rem', background: active ? '#1d4ed8' : '#e2e8f0', color: active ? '#fff' : '#334155' }),
      catRow: { display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 },
      catBtn: (active) => ({ padding:'6px 13px', borderRadius:20, border:'none', cursor:'pointer', fontWeight:600, fontSize:'0.8rem', background: active ? '#0f172a' : '#f1f5f9', color: active ? '#fff' : '#475569' }),
      addBtn: { padding:'8px 16px', background:'#10b981', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:'0.85rem' },
      resetBtn: { padding:'8px 16px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:'0.82rem' },
      card: { background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'14px', marginBottom:12, display:'flex', alignItems:'flex-start', gap:12 },
      cardImg: { fontSize:'2rem', minWidth:40, textAlign:'center' },
      cardInfo: { flex:1 },
      cardName: { fontWeight:700, fontSize:'0.9rem', color:'#0f172a', marginBottom:2 },
      cardMeta: { fontSize:'0.78rem', color:'#64748b', marginBottom:4 },
      cardLink: { fontSize:'0.75rem', color:'#3b82f6', wordBreak:'break-all' },
      cardActions: { display:'flex', flexDirection:'column', gap:6 },
      editBtn: { padding:'5px 12px', background:'#3b82f6', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:'0.78rem', fontWeight:600 },
      delBtn:  { padding:'5px 12px', background:'#ef4444', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:'0.78rem', fontWeight:600 },
      togBtn: (v) => ({ padding:'5px 10px', background: v ? '#10b981' : '#94a3b8', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:'0.75rem', fontWeight:600 }),
      formBox: { background:'#f8fafc', border:'1px solid #cbd5e1', borderRadius:10, padding:16, marginBottom:16 },
      formTitle: { fontWeight:700, fontSize:'0.9rem', color:'#0f172a', marginBottom:12 },
      row2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 },
      row1: { marginBottom:10 },
      label: { display:'block', fontSize:'0.78rem', fontWeight:600, color:'#475569', marginBottom:4 },
      input: { width:'100%', padding:'8px 10px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:'0.85rem', boxSizing:'border-box' },
      savBtn: { padding:'8px 18px', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:7, cursor:'pointer', fontWeight:700, fontSize:'0.85rem', marginRight:8 },
      canBtn: { padding:'8px 16px', background:'#e2e8f0', color:'#334155', border:'none', borderRadius:7, cursor:'pointer', fontWeight:600, fontSize:'0.85rem' },
      badge: (v) => ({ display:'inline-block', padding:'2px 8px', borderRadius:10, fontSize:'0.7rem', fontWeight:700, background: v ? '#dcfce7' : '#f1f5f9', color: v ? '#15803d' : '#94a3b8', marginLeft:6 }),
      tip: { fontSize:'0.78rem', color:'#64748b', background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:8, padding:'10px 14px', marginBottom:16 },
    };

    const ProductForm = ({ title, data, onChange, onSave, onCancel }) => (
      <div style={S.formBox}>
        <div style={S.formTitle}>{title}</div>
        <div style={S.row2}>
          <div>
            <label style={S.label}>Product Name *</label>
            <input style={S.input} value={data.name || ''} onChange={e => onChange('name', e.target.value)} placeholder="e.g. Luminous Inverter 1100W" />
          </div>
          <div>
            <label style={S.label}>Emoji / Image</label>
            <input style={S.input} value={data.img || ''} onChange={e => onChange('img', e.target.value)} placeholder="🔌" />
          </div>
        </div>
        <div style={S.row2}>
          <div>
            <label style={S.label}>Price *</label>
            <input style={S.input} value={data.price || ''} onChange={e => onChange('price', e.target.value)} placeholder="₹6,200" />
          </div>
          <div>
            <label style={S.label}>Old Price (was)</label>
            <input style={S.input} value={data.was || ''} onChange={e => onChange('was', e.target.value)} placeholder="₹7,800 (optional)" />
          </div>
        </div>
        <div style={S.row2}>
          <div>
            <label style={S.label}>Badge</label>
            <input style={S.input} value={data.badge || ''} onChange={e => onChange('badge', e.target.value)} placeholder="Best Seller (optional)" />
          </div>
          <div>
            <label style={S.label}>Rating</label>
            <input style={S.input} value={data.rating || ''} onChange={e => onChange('rating', e.target.value)} placeholder="4.4★" />
          </div>
        </div>
        <div style={S.row2}>
          <div>
            <label style={S.label}>Reviews Count</label>
            <input style={S.input} value={data.reviews || ''} onChange={e => onChange('reviews', e.target.value)} placeholder="12k+" />
          </div>
          <div>
            <label style={S.label}>Tag / Specs</label>
            <input style={S.input} value={data.tag || ''} onChange={e => onChange('tag', e.target.value)} placeholder="1100VA Pure Sine Wave" />
          </div>
        </div>
        <div style={S.row1}>
          <label style={S.label}>Affiliate Link * (Amazon/Flipkart full URL)</label>
          <input style={S.input} value={data.link || ''} onChange={e => onChange('link', e.target.value)} placeholder="https://www.amazon.in/s?k=...&tag=almenso-21" />
        </div>
        <div style={S.row1}>
          <label style={S.label}>Button Text</label>
          <input style={S.input} value={data.cta || ''} onChange={e => onChange('cta', e.target.value)} placeholder="Buy on Amazon" />
        </div>
        <div style={{ marginTop:12 }}>
          <button style={S.savBtn} onClick={onSave}>💾 Save</button>
          <button style={S.canBtn} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );

    const HomepageFeaturedSection = () => {

      const FS = {
        card: { background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'14px', marginBottom:10, display:'flex', alignItems:'center', gap:12 },
        num: { fontWeight:800, fontSize:'1.2rem', color:'#94a3b8', minWidth:28 },
        img: { fontSize:'2rem', minWidth:36, textAlign:'center' },
        info: { flex:1 },
        name: { fontWeight:700, fontSize:'0.9rem', color:'#0f172a' },
        meta: { fontSize:'0.78rem', color:'#64748b' },
        actions: { display:'flex', gap:6 },
      };

      return (
        <div>
          <div style={S.tip}>
            💡 <strong>Homepage pe 3 featured products</strong> dikhte hain (Products section mein). Yahan se links aur naam change karo — turant live ho jaate hain.
          </div>
          {featured.map((fp, idx) => (
            fpEditIdx === idx ? (
              <div key={idx} style={S.formBox}>
                <div style={S.formTitle}>✏️ Featured Product #{idx + 1} Edit</div>
                <div style={S.row2}>
                  <div>
                    <label style={S.label}>Name</label>
                    <input style={S.input} value={fpForm.name || ''} onChange={e => setFpForm(f => ({...f, name: e.target.value}))} />
                  </div>
                  <div>
                    <label style={S.label}>Emoji</label>
                    <input style={S.input} value={fpForm.image || ''} onChange={e => setFpForm(f => ({...f, image: e.target.value}))} />
                  </div>
                </div>
                <div style={S.row2}>
                  <div>
                    <label style={S.label}>Price</label>
                    <input style={S.input} value={fpForm.price || ''} onChange={e => setFpForm(f => ({...f, price: e.target.value}))} />
                  </div>
                  <div>
                    <label style={S.label}>Badge</label>
                    <input style={S.input} value={fpForm.badge || ''} onChange={e => setFpForm(f => ({...f, badge: e.target.value}))} />
                  </div>
                </div>
                <div style={S.row1}>
                  <label style={S.label}>Affiliate Link *</label>
                  <input style={S.input} value={fpForm.link || ''} onChange={e => setFpForm(f => ({...f, link: e.target.value}))} />
                </div>
                <div style={{ marginTop:10 }}>
                  <button style={S.savBtn} onClick={() => {
                    const updated = featured.map((x, i) => i === idx ? { ...fpForm, id: x.id || ('fp' + Date.now()) } : x);
                    saveFeatured(updated);
                    setFpEditIdx(null);
                  }}>💾 Save</button>
                  <button style={S.canBtn} onClick={() => setFpEditIdx(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div key={idx} style={FS.card}>
                <div style={FS.num}>#{idx + 1}</div>
                <div style={FS.img}>{fp.image}</div>
                <div style={FS.info}>
                  <div style={FS.name}>{fp.name} {fp.badge && <span style={S.badge(true)}>{fp.badge}</span>}</div>
                  <div style={FS.meta}>{fp.price} · <a href={fp.link} target="_blank" rel="noopener noreferrer" style={{ color:'#3b82f6', fontSize:'0.75rem' }}>Link →</a></div>
                </div>
                <div style={FS.actions}>
                  <button style={S.editBtn} onClick={() => { setFpForm({...fp}); setFpEditIdx(idx); setFpShowAdd(false); }}>✏️ Edit</button>
                  <button style={S.delBtn} onClick={() => { saveFeatured(featured.filter((_, i) => i !== idx)); }}>🗑️</button>
                </div>
              </div>
            )
          ))}
          {featured.length < 6 && !fpShowAdd && (
            <button style={{ ...S.addBtn, marginTop:8 }} onClick={() => { setFpForm({ ...BLANK_FP, id:'fp'+Date.now() }); setFpShowAdd(true); setFpEditIdx(null); }}>+ Product Add Karo</button>
          )}
          {fpShowAdd && (
            <div style={S.formBox}>
              <div style={S.formTitle}>➕ New Featured Product</div>
              <div style={S.row2}>
                <div>
                  <label style={S.label}>Name</label>
                  <input style={S.input} value={fpForm.name || ''} onChange={e => setFpForm(f => ({...f, name: e.target.value}))} />
                </div>
                <div>
                  <label style={S.label}>Emoji</label>
                  <input style={S.input} value={fpForm.image || ''} onChange={e => setFpForm(f => ({...f, image: e.target.value}))} />
                </div>
              </div>
              <div style={S.row2}>
                <div>
                  <label style={S.label}>Price</label>
                  <input style={S.input} value={fpForm.price || ''} onChange={e => setFpForm(f => ({...f, price: e.target.value}))} />
                </div>
                <div>
                  <label style={S.label}>Badge</label>
                  <input style={S.input} value={fpForm.badge || ''} onChange={e => setFpForm(f => ({...f, badge: e.target.value}))} />
                </div>
              </div>
              <div style={S.row1}>
                <label style={S.label}>Affiliate Link *</label>
                <input style={S.input} value={fpForm.link || ''} onChange={e => setFpForm(f => ({...f, link: e.target.value}))} />
              </div>
              <div style={{ marginTop:10 }}>
                <button style={S.savBtn} onClick={() => {
                  if (!fpForm.name || !fpForm.link) { showToast('❌ Name aur Link zaroori hai!'); return; }
                  saveFeatured([...featured, { ...fpForm, id: 'fp' + Date.now() }]);
                  setFpShowAdd(false);
                  setFpForm({});
                }}>💾 Save</button>
                <button style={S.canBtn} onClick={() => setFpShowAdd(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      );
    };

    // ── Passive Income Links Section ──────────────────────────
    const DEFAULT_PASSIVE = [
      { id:'pl1', ico:'🏦', title:'Loan Apply Karo',   sub:'BankBazaar · Best rate · 2 min', color:'#2563eb', bg:'#eff6ff', url:'https://www.bankbazaar.com/personal-loan.html', active:true },
      { id:'pl2', ico:'📈', title:'Demat Account',     sub:'AngelOne · Zero brokerage',       color:'#16a34a', bg:'#f0fdf4', url:'https://www.angelone.in', active:true },
      { id:'pl3', ico:'💳', title:'Credit Card',       sub:'Best cards · Rewards + cashback', color:'#e11d48', bg:'#fff1f2', url:'https://www.bankbazaar.com/credit-card.html', active:true },
      { id:'pl4', ico:'☀️', title:'Solar Install',     sub:'Free site visit · 40% subsidy',   color:'#d97706', bg:'#fffbeb', url:'/solar-solutions', active:true },
    ];

    const PassiveLinksSection = () => {
      const getPLinks = () => {
        try {
          const parsed = JSON.parse(settings.passiveLinks || '[]');
          return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_PASSIVE;
        } catch { return DEFAULT_PASSIVE; }
      };

      const [links, setLinks] = useState(getPLinks);
      const [editIdx, setEditIdx] = useState(null);
      const [addForm, setAddForm] = useState(false);
      const BLANK_LINK = { id:'pl'+Date.now(), ico:'🔗', title:'', sub:'', color:'#374151', bg:'#f1f5f9', url:'', active:true };
      const [form, setForm] = useState({ ...BLANK_LINK });

      const saveLinks = (updated) => {
        setLinks(updated);
        saveSettings({ passiveLinks: JSON.stringify(updated) });
        showToast('✅ Passive Income Links saved!');
      };

      const PL = {
        card: { background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'14px', marginBottom:10, display:'flex', alignItems:'center', gap:12 },
        ico: { fontSize:'1.8rem', minWidth:36, textAlign:'center' },
        info: { flex:1 },
        name: { fontWeight:700, fontSize:'0.88rem', color:'#0f172a' },
        sub: { fontSize:'0.75rem', color:'#64748b' },
        url: { fontSize:'0.72rem', color:'#3b82f6', wordBreak:'break-all' },
        actions: { display:'flex', gap:6, flexShrink:0 },
        formBox: { background:'#f8fafc', border:'1px solid #cbd5e1', borderRadius:10, padding:16, marginBottom:14 },
        label: { display:'block', fontSize:'0.78rem', fontWeight:600, color:'#475569', marginBottom:4 },
        input: { width:'100%', padding:'8px 10px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:'0.85rem', boxSizing:'border-box', fontFamily:'inherit' },
        row2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 },
        row1: { marginBottom:10 },
      };

      const LinkForm = ({ title, data, onChange, onSave, onCancel }) => (
        <div style={PL.formBox}>
          <div style={{ fontWeight:700, fontSize:'0.9rem', color:'#0f172a', marginBottom:12 }}>{title}</div>
          <div style={PL.row2}>
            <div>
              <label style={PL.label}>Emoji Icon</label>
              <input style={PL.input} value={data.ico || ''} onChange={e => onChange('ico', e.target.value)} placeholder="🏦" />
            </div>
            <div>
              <label style={PL.label}>Title *</label>
              <input style={PL.input} value={data.title || ''} onChange={e => onChange('title', e.target.value)} placeholder="Loan Apply Karo" />
            </div>
          </div>
          <div style={PL.row1}>
            <label style={PL.label}>Sub-text</label>
            <input style={PL.input} value={data.sub || ''} onChange={e => onChange('sub', e.target.value)} placeholder="BankBazaar · Best rate · 2 min" />
          </div>
          <div style={PL.row1}>
            <label style={PL.label}>Affiliate URL * (full URL ya /path)</label>
            <input style={PL.input} value={data.url || ''} onChange={e => onChange('url', e.target.value)} placeholder="https://bankbazaar.com/... ya /solar-solutions" />
          </div>
          <div style={PL.row2}>
            <div>
              <label style={PL.label}>Background Color</label>
              <input style={{ ...PL.input, cursor:'pointer' }} type="color" value={data.bg || '#f1f5f9'} onChange={e => onChange('bg', e.target.value)} />
            </div>
            <div>
              <label style={PL.label}>Status</label>
              <select style={{ ...PL.input, cursor:'pointer' }} value={data.active ? 'true' : 'false'} onChange={e => onChange('active', e.target.value === 'true')}>
                <option value="true">✅ Active (Visible)</option>
                <option value="false">❌ Hidden</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <button style={S.savBtn} onClick={onSave}>💾 Save</button>
            <button style={S.canBtn} onClick={onCancel}>Cancel</button>
          </div>
        </div>
      );

      return (
        <div>
          <div style={S.tip}>
            💡 <strong>Tools page pe "Passive Income" banner</strong> mein yeh links dikhte hain. Admin panel se apne affiliate links (BankBazaar, AngelOne, insurance, koi bhi) yahan se change karo — turant live ho jaate hain bina deploy kiye.
          </div>

          {!addForm && editIdx === null && (
            <button style={{ ...S.addBtn, marginBottom:14 }} onClick={() => { setForm({ ...BLANK_LINK, id:'pl'+Date.now() }); setAddForm(true); }}>
              + Naya Link Add Karo
            </button>
          )}

          {addForm && (
            <LinkForm
              title="➕ Naya Passive Income Link"
              data={form}
              onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
              onSave={() => {
                if (!form.title || !form.url) { showToast('❌ Title aur URL zaroori hai!'); return; }
                saveLinks([...links, { ...form, id: 'pl'+Date.now() }]);
                setAddForm(false); setForm({ ...BLANK_LINK });
              }}
              onCancel={() => { setAddForm(false); setForm({ ...BLANK_LINK }); }}
            />
          )}

          {links.map((lk, idx) => (
            editIdx === idx ? (
              <LinkForm
                key={lk.id}
                title={`✏️ Edit — ${lk.title}`}
                data={form}
                onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
                onSave={() => {
                  if (!form.title || !form.url) { showToast('❌ Title aur URL zaroori hai!'); return; }
                  saveLinks(links.map((x, i) => i === idx ? { ...form } : x));
                  setEditIdx(null);
                }}
                onCancel={() => setEditIdx(null)}
              />
            ) : (
              <div key={lk.id} style={{ ...PL.card, opacity: lk.active === false ? 0.45 : 1 }}>
                <div style={{ ...PL.ico, background: lk.bg || '#f1f5f9', borderRadius:10, width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center' }}>{lk.ico}</div>
                <div style={PL.info}>
                  <div style={PL.name}>{lk.title} <span style={{ fontSize:'0.68rem', background: lk.active !== false ? '#dcfce7' : '#f1f5f9', color: lk.active !== false ? '#15803d' : '#94a3b8', borderRadius:8, padding:'1px 7px', marginLeft:4 }}>{lk.active !== false ? 'Active' : 'Hidden'}</span></div>
                  <div style={PL.sub}>{lk.sub}</div>
                  <div style={PL.url}>{lk.url}</div>
                </div>
                <div style={PL.actions}>
                  <button style={S.editBtn} onClick={() => { setForm({ ...lk }); setEditIdx(idx); setAddForm(false); }}>✏️</button>
                  <button style={S.togBtn(lk.active !== false)} onClick={() => saveLinks(links.map((x, i) => i === idx ? { ...x, active: !x.active } : x))}>
                    {lk.active !== false ? '👁️' : '🙈'}
                  </button>
                  <button style={S.delBtn} onClick={() => { if (window.confirm('Delete karna chahte ho?')) saveLinks(links.filter((_, i) => i !== idx)); }}>🗑️</button>
                </div>
              </div>
            )
          ))}

          <button style={{ ...S.resetBtn, marginTop:8 }} onClick={() => { if (window.confirm('Default links restore ho jayenge?')) { saveLinks(DEFAULT_PASSIVE); } }}>
            🔄 Reset to Defaults
          </button>
        </div>
      );
    };

    return (
      <div style={S.wrap}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <h2 style={{ margin:0, fontSize:'1.1rem', fontWeight:800, color:'#0f172a' }}>🛒 Affiliate Products Manager</h2>
            <p style={{ margin:'4px 0 0', fontSize:'0.8rem', color:'#64748b' }}>Tool pages, articles aur blog mein dikhne wale products yahan se manage karo</p>
          </div>
          <button style={S.resetBtn} onClick={resetToDefaults}>🔄 Reset Defaults</button>
        </div>

        {/* Section toggle */}
        <div style={S.sectionBtns}>
          <button style={S.sBtn(activeSection === 'products')} onClick={() => setActiveSection('products')}>📦 Tool/Article Products</button>
          <button style={S.sBtn(activeSection === 'homepage')} onClick={() => setActiveSection('homepage')}>🏠 Homepage Featured</button>
          <button style={S.sBtn(activeSection === 'passive')} onClick={() => setActiveSection('passive')}>💸 Passive Income Links</button>
        </div>

        {activeSection === 'passive' ? (
          <PassiveLinksSection />
        ) : activeSection === 'homepage' ? (
          <HomepageFeaturedSection />
        ) : (
          <>
            <div style={S.tip}>
              💡 <strong>Tool/Article pages pe</strong> category ke hisaab se products dikhte hain (AffiliateWidget). Electrician tools pe "Electrical", Solar tools pe "Solar" waale products dikhte hain. Yahan se kisi bhi category ke products change, add ya delete karo.
            </div>

            {/* Category tabs */}
            <div style={S.catRow}>
              {CATEGORIES.map(c => (
                <button key={c.id} style={S.catBtn(activeCat === c.id)} onClick={() => { setActiveCat(c.id); setEditingId(null); setShowAddForm(false); }}>
                  {c.label} <span style={{ fontWeight:400, opacity:0.7 }}>({(allProds[c.id] || []).length})</span>
                </button>
              ))}
            </div>

            {/* Add new product button */}
            {!showAddForm && editingId === null && (
              <button style={{ ...S.addBtn, marginBottom:14 }} onClick={() => { setForm({ ...BLANK }); setShowAddForm(true); setEditingId(null); }}>
                + Naya Product Add Karo
              </button>
            )}

            {/* Add form */}
            {showAddForm && (
              <ProductForm
                title={`➕ New Product — ${CATEGORIES.find(c => c.id === activeCat)?.label}`}
                data={form}
                onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
                onSave={addProduct}
                onCancel={() => { setShowAddForm(false); setForm({}); }}
              />
            )}

            {/* Product cards */}
            {catProds.length === 0 && (
              <div style={{ textAlign:'center', padding:'30px 0', color:'#94a3b8', fontSize:'0.9rem' }}>
                Is category mein koi product nahi hai. "Naya Product Add Karo" pe click karo.
              </div>
            )}

            {catProds.map(p => (
              editingId === p.id ? (
                <ProductForm
                  key={p.id}
                  title={`✏️ Edit — ${p.name}`}
                  data={form}
                  onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
                  onSave={saveEdit}
                  onCancel={() => { setEditingId(null); setForm({}); }}
                />
              ) : (
                <div key={p.id} style={{ ...S.card, opacity: p.visible === false ? 0.5 : 1 }}>
                  <div style={S.cardImg}>{p.img}</div>
                  <div style={S.cardInfo}>
                    <div style={S.cardName}>
                      {p.name}
                      {p.badge && <span style={S.badge(true)}>{p.badge}</span>}
                      <span style={S.badge(p.visible !== false)}>{p.visible !== false ? 'Visible' : 'Hidden'}</span>
                    </div>
                    <div style={S.cardMeta}>
                      {p.price}{p.was && ` · was ${p.was}`} · {p.rating} · {p.reviews} reviews
                    </div>
                    <div style={S.cardMeta}>{p.tag}</div>
                    <div style={S.cardLink}>{p.link}</div>
                  </div>
                  <div style={S.cardActions}>
                    <button style={S.editBtn} onClick={() => { setForm({ ...p }); startEdit(p); }}>✏️ Edit</button>
                    <button style={S.togBtn(p.visible !== false)} onClick={() => toggleVisible(p.id)}>
                      {p.visible !== false ? '👁️ Hide' : '👁️ Show'}
                    </button>
                    <button style={S.delBtn} onClick={() => deleteProduct(p.id)}>🗑️ Del</button>
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>
    );
  }

  // ── Tools Visibility Manager ─────────────────────────────
  function ToolsManager() {
    const { settings, saveSettings, showToast } = useSettings();

    const getHidden = () => {
      try {
        return Array.isArray(settings.hiddenTools) ? settings.hiddenTools : [];
      } catch {
        return [];
      }
    };
    const getFeatured = () => {
      try {
        return Array.isArray(settings.featuredTools)
          ? settings.featuredTools
          : [];
      } catch {
        return [];
      }
    };

    const [activeTab, setActiveTab] = useState("visibility");
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const getCustomTools = () => {
      try {
        return settings.customToolData || {};
      } catch {
        return {};
      }
    };

    const startEdit = (t) => {
      const custom = getCustomTools();
      setEditForm({
        name: custom[t.id]?.name || t.name,
        description: custom[t.id]?.description || "",
        cat: custom[t.id]?.cat || t.cat,
      });
      setEditingId(t.id);
    };

    const saveEdit = (id) => {
      const custom = getCustomTools();
      saveSettings({ customToolData: { ...custom, [id]: { ...editForm } } });
      showToast("✅ Tool updated!");
      setEditingId(null);
    };

    const resetEdit = (id) => {
      const custom = getCustomTools();
      const updated = { ...custom };
      delete updated[id];
      saveSettings({ customToolData: updated });
      showToast("🔄 Default pe reset ho gaya");
      setEditingId(null);
    };

    const hiddenTools = getHidden();
    const featuredTools = getFeatured();

    const ALL_TOOLS = [
      {
        id: "gst-calculator",
        name: "GST Calculator",
        cat: "💰 Finance",
        hot: true,
      },
      {
        id: "emi-calculator",
        name: "EMI Calculator",
        cat: "💰 Finance",
        hot: true,
      },
      {
        id: "discount-calculator",
        name: "Discount Calculator",
        cat: "💰 Finance",
        hot: true,
      },
      {
        id: "loan-calculator",
        name: "Loan Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "salary-calculator",
        name: "Salary Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "percentage-calculator",
        name: "Percentage Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "simple-interest-calculator",
        name: "Simple Interest Calc",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "compound-interest-calculator",
        name: "Compound Interest Calc",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "tip-calculator",
        name: "Tip Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "roi-calculator",
        name: "ROI Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "mortgage-calculator",
        name: "Mortgage Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "retirement-calculator",
        name: "Retirement Calculator",
        cat: "💰 Finance",
        hot: false,
      },
      {
        id: "bijli",
        name: "Bijli Bill Calculator",
        cat: "⚡ Electricity",
        hot: true,
      },
      {
        id: "electricity-bill-analyzer",
        name: "Electricity Bill Analyzer",
        cat: "⚡ Electricity",
        hot: true,
      },
      {
        id: "solar-roi",
        name: "Solar ROI Calculator",
        cat: "⚡ Electricity",
        hot: true,
      },
      {
        id: "inverter-load-planner",
        name: "Inverter Load Planner",
        cat: "⚡ Electricity",
        hot: true,
      },
      {
        id: "electricity-cost-calculator",
        name: "Electricity Cost Calc",
        cat: "⚡ Electricity",
        hot: false,
      },
      {
        id: "solar-panel-calculator",
        name: "Solar Panel Calculator",
        cat: "⚡ Electricity",
        hot: false,
      },
      {
        id: "battery-backup-calculator",
        name: "Battery Backup Calculator",
        cat: "⚡ Electricity",
        hot: false,
      },
      {
        id: "wire-size-calculator",
        name: "Wire Size Calculator",
        cat: "⚡ Electricity",
        hot: false,
      },
      {
        id: "ohms-law-calculator",
        name: "Ohms Law Calculator",
        cat: "⚡ Electricity",
        hot: false,
      },
      {
        id: "image-compressor",
        name: "Image Compressor",
        cat: "🖼️ Image",
        hot: true,
      },
      {
        id: "image-resizer",
        name: "Image Resizer",
        cat: "🖼️ Image",
        hot: true,
      },
      {
        id: "image-format-converter",
        name: "Image Format Converter",
        cat: "🖼️ Image",
        hot: true,
      },
      {
        id: "background-remover",
        name: "Background Remover",
        cat: "🖼️ Image",
        hot: true,
      },
      {
        id: "image-cropper",
        name: "Image Cropper",
        cat: "🖼️ Image",
        hot: false,
      },
      {
        id: "image-watermark",
        name: "Image Watermark",
        cat: "🖼️ Image",
        hot: false,
      },
      {
        id: "image-grayscale",
        name: "Grayscale Converter",
        cat: "🖼️ Image",
        hot: false,
      },
      {
        id: "image-blur",
        name: "Image Blur Tool",
        cat: "🖼️ Image",
        hot: false,
      },
      { id: "word-counter", name: "Word Counter", cat: "📝 Text", hot: true },
      {
        id: "character-counter",
        name: "Character Counter",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "text-case-converter",
        name: "Text Case Converter",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "text-reverser",
        name: "Text Reverser",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "remove-duplicate-lines",
        name: "Remove Duplicate Lines",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "lorem-ipsum-generator",
        name: "Lorem Ipsum Generator",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "text-to-slug-converter",
        name: "Text to Slug Converter",
        cat: "📝 Text",
        hot: false,
      },
      {
        id: "hashtag-generator",
        name: "Hashtag Generator",
        cat: "📱 Content",
        hot: true,
      },
      {
        id: "instagram-caption-generator",
        name: "Instagram Caption Gen",
        cat: "📱 Content",
        hot: true,
      },
      {
        id: "youtube-title-generator",
        name: "YouTube Title Generator",
        cat: "📱 Content",
        hot: false,
      },
      {
        id: "content-idea-generator",
        name: "Content Idea Generator",
        cat: "📱 Content",
        hot: false,
      },
      {
        id: "password-generator",
        name: "Password Generator",
        cat: "🔧 Generators",
        hot: true,
      },
      {
        id: "qr-code-generator",
        name: "QR Code Generator",
        cat: "🔧 Generators",
        hot: true,
      },
      {
        id: "username-generator",
        name: "Username Generator",
        cat: "🔧 Generators",
        hot: false,
      },
      {
        id: "color-palette-generator",
        name: "Color Palette Generator",
        cat: "🔧 Generators",
        hot: false,
      },
      {
        id: "bmi-calculator",
        name: "BMI Calculator",
        cat: "🏥 Health",
        hot: true,
      },
      {
        id: "calorie-calculator",
        name: "Calorie Calculator",
        cat: "🏥 Health",
        hot: false,
      },
      {
        id: "age-calculator",
        name: "Age Calculator",
        cat: "🏥 Health",
        hot: true,
      },
      {
        id: "temperature-converter",
        name: "Temperature Converter",
        cat: "🔄 Converters",
        hot: true,
      },
      {
        id: "currency-converter",
        name: "Currency Converter",
        cat: "🔄 Converters",
        hot: true,
      },
      {
        id: "length-converter",
        name: "Length Converter",
        cat: "🔄 Converters",
        hot: false,
      },
      {
        id: "weight-converter",
        name: "Weight Converter",
        cat: "🔄 Converters",
        hot: false,
      },
      {
        id: "area-converter",
        name: "Area Converter",
        cat: "🔄 Converters",
        hot: false,
      },
      {
        id: "json-formatter",
        name: "JSON Formatter",
        cat: "💻 Developer",
        hot: true,
      },
      {
        id: "base64-encoder",
        name: "Base64 Encoder/Decoder",
        cat: "💻 Developer",
        hot: false,
      },
      {
        id: "url-encoder",
        name: "URL Encoder/Decoder",
        cat: "💻 Developer",
        hot: false,
      },
      {
        id: "average-calculator",
        name: "Average Calculator",
        cat: "🧮 Math",
        hot: false,
      },
      {
        id: "fraction-calculator",
        name: "Fraction Calculator",
        cat: "🧮 Math",
        hot: false,
      },
      // ── 💰 Finance (missing) ──────────────────────────────
      { id: "profit-margin-calculator",       name: "Profit Margin Calculator",       cat: "💰 Finance",      hot: false },
      { id: "profit-calculator",              name: "Profit Calculator",              cat: "💰 Finance",      hot: false },
      { id: "roi-calculator",                 name: "ROI Calculator",                 cat: "💰 Finance",      hot: false },
      { id: "savings-calculator",             name: "Savings Calculator",             cat: "💰 Finance",      hot: false },
      { id: "simple-interest-calculator",     name: "Simple Interest Calculator",     cat: "💰 Finance",      hot: false },
      { id: "loan-interest-calculator",       name: "Loan Interest Calculator",       cat: "💰 Finance",      hot: false },
      { id: "credit-card-interest-calculator",name: "Credit Card Interest Calc",      cat: "💰 Finance",      hot: false },
      { id: "interest-calculator",            name: "Interest Calculator",            cat: "💰 Finance",      hot: false },
      { id: "investment-return-calculator",   name: "Investment Return Calculator",   cat: "💰 Finance",      hot: false },
      { id: "commission-calculator",          name: "Commission Calculator",          cat: "💰 Finance",      hot: false },
      { id: "markup-calculator",              name: "Markup Calculator",              cat: "💰 Finance",      hot: false },
      { id: "margin-calculator",              name: "Margin Calculator",              cat: "💰 Finance",      hot: false },
      { id: "break-even-calculator",          name: "Break Even Calculator",          cat: "💰 Finance",      hot: false },
      { id: "unit-price-calculator",          name: "Unit Price Calculator",          cat: "💰 Finance",      hot: false },
      { id: "tip-calculator",                 name: "Tip Calculator",                 cat: "💰 Finance",      hot: false },
      { id: "percentage-increase-calculator", name: "Percentage Increase Calc",       cat: "💰 Finance",      hot: false },
      { id: "percentage-decrease-calculator", name: "Percentage Decrease Calc",       cat: "💰 Finance",      hot: false },
      { id: "percentage-change-calculator",   name: "Percentage Change Calc",         cat: "💰 Finance",      hot: false },
      { id: "percentage-difference-calculator",name:"Percentage Difference Calc",     cat: "💰 Finance",      hot: false },
      { id: "mortgage-calculator",            name: "Mortgage Calculator",            cat: "💰 Finance",      hot: false },
      { id: "retirement-calculator",          name: "Retirement Calculator",          cat: "💰 Finance",      hot: false },
      { id: "net-worth-calculator",           name: "Net Worth Calculator",           cat: "💰 Finance",      hot: false },
      { id: "cost-per-unit-calculator",       name: "Cost Per Unit Calculator",       cat: "💰 Finance",      hot: false },
      { id: "tax-percentage-calculator",      name: "Tax Percentage Calculator",      cat: "💰 Finance",      hot: false },
      { id: "inflation-calculator",           name: "Inflation Calculator",           cat: "💰 Finance",      hot: false },
      { id: "savings-goal-calculator",        name: "Savings Goal Calculator",        cat: "💰 Finance",      hot: false },
      { id: "payback-period-calculator",      name: "Payback Period Calculator",      cat: "💰 Finance",      hot: false },
      // ── ⚡ Electricity (missing) ──────────────────────────
      { id: "power-consumption-calculator",   name: "Power Consumption Calc",         cat: "⚡ Electricity",  hot: false },
      { id: "power-consumption-planner",      name: "Power Consumption Planner",      cat: "⚡ Electricity",  hot: false },
      { id: "appliance-power-calculator",     name: "Appliance Power Calculator",     cat: "⚡ Electricity",  hot: false },
      { id: "electrical-load-calculator",     name: "Electrical Load Calculator",     cat: "⚡ Electricity",  hot: false },
      { id: "energy-consumption-calculator",  name: "Energy Consumption Calc",        cat: "⚡ Electricity",  hot: false },
      { id: "led-resistor-calculator",        name: "LED Resistor Calculator",        cat: "⚡ Electricity",  hot: false },
      { id: "ohms-law-calculator",            name: "Ohms Law Calculator",            cat: "⚡ Electricity",  hot: false },
      { id: "power-factor-calculator",        name: "Power Factor Calculator",        cat: "⚡ Electricity",  hot: false },
      { id: "electricity-bill-calculator",    name: "Electricity Bill Calculator",    cat: "⚡ Electricity",  hot: false },
      { id: "voltage-drop-calculator",        name: "Voltage Drop Calculator",        cat: "⚡ Electricity",  hot: false },
      // ── 🖼️ Image (missing) ──────────────────────────────
      { id: "image-rotator",                  name: "Image Rotator",                  cat: "🖼️ Image",        hot: false },
      { id: "image-flipper",                  name: "Image Flipper",                  cat: "🖼️ Image",        hot: false },
      { id: "image-watermark",                name: "Image Watermark",               cat: "🖼️ Image",        hot: false },
      { id: "image-grayscale",                name: "Grayscale Converter",            cat: "🖼️ Image",        hot: false },
      { id: "image-blur",                     name: "Image Blur Tool",                cat: "🖼️ Image",        hot: false },
      { id: "image-brightness",               name: "Brightness Adjuster",            cat: "🖼️ Image",        hot: false },
      { id: "image-contrast",                 name: "Contrast Adjuster",              cat: "🖼️ Image",        hot: false },
      { id: "image-saturation",               name: "Saturation Tool",                cat: "🖼️ Image",        hot: false },
      { id: "image-sharpen",                  name: "Image Sharpen Tool",             cat: "🖼️ Image",        hot: false },
      { id: "image-border",                   name: "Image Border Tool",              cat: "🖼️ Image",        hot: false },
      { id: "image-collage",                  name: "Image Collage Maker",            cat: "🖼️ Image",        hot: false },
      { id: "screenshot-to-image",            name: "Screenshot to Image",            cat: "🖼️ Image",        hot: false },
      { id: "base64-image-encoder",           name: "Base64 Image Encoder",           cat: "🖼️ Image",        hot: false },
      { id: "base64-image-decoder",           name: "Base64 Image Decoder",           cat: "🖼️ Image",        hot: false },
      { id: "image-metadata-viewer",          name: "Image Metadata Viewer",          cat: "🖼️ Image",        hot: false },
      { id: "image-converter",                name: "Image Converter",                cat: "🖼️ Image",        hot: false },
      // ── 📝 Text (missing) ────────────────────────────────
      { id: "character-counter",              name: "Character Counter",              cat: "📝 Text",         hot: false },
      { id: "sentence-counter",               name: "Sentence Counter",               cat: "📝 Text",         hot: false },
      { id: "paragraph-counter",              name: "Paragraph Counter",              cat: "📝 Text",         hot: false },
      { id: "uppercase-converter",            name: "Uppercase Converter",            cat: "📝 Text",         hot: false },
      { id: "lowercase-converter",            name: "Lowercase Converter",            cat: "📝 Text",         hot: false },
      { id: "title-case-converter",           name: "Title Case Converter",           cat: "📝 Text",         hot: false },
      { id: "capitalize-text",               name: "Capitalize Text",                cat: "📝 Text",         hot: false },
      { id: "text-reverser",                  name: "Text Reverser",                  cat: "📝 Text",         hot: false },
      { id: "remove-extra-spaces",            name: "Remove Extra Spaces",            cat: "📝 Text",         hot: false },
      { id: "text-sorter",                    name: "Text Sorter",                    cat: "📝 Text",         hot: false },
      { id: "text-diff-checker",              name: "Text Diff Checker",              cat: "📝 Text",         hot: false },
      { id: "text-to-html-converter",         name: "Text to HTML Converter",         cat: "📝 Text",         hot: false },
      { id: "html-to-text-converter",         name: "HTML to Text Converter",         cat: "📝 Text",         hot: false },
      { id: "line-counter",                   name: "Line Counter",                   cat: "📝 Text",         hot: false },
      { id: "lorem-ipsum-generator",          name: "Lorem Ipsum Generator",          cat: "📝 Text",         hot: false },
      { id: "text-to-slug-converter",         name: "Text to Slug Converter",         cat: "📝 Text",         hot: false },
      { id: "random-text-generator",          name: "Random Text Generator",          cat: "📝 Text",         hot: false },
      // ── 📱 Content (missing) ─────────────────────────────
      { id: "instagram-bio-generator",        name: "Instagram Bio Generator",        cat: "📱 Content",      hot: false },
      { id: "youtube-description-generator",  name: "YouTube Description Gen",        cat: "📱 Content",      hot: false },
      { id: "youtube-thumbnail-extractor",    name: "YouTube Thumbnail Extractor",    cat: "📱 Content",      hot: false },
      { id: "content-idea-generator",         name: "Content Idea Generator",         cat: "📱 Content",      hot: false },
      // ── 🔧 Generators (missing) ──────────────────────────
      { id: "username-generator",             name: "Username Generator",             cat: "🔧 Generators",   hot: false },
      { id: "business-name-generator",        name: "Business Name Generator",        cat: "🔧 Generators",   hot: false },
      { id: "domain-name-generator",          name: "Domain Name Generator",          cat: "🔧 Generators",   hot: false },
      { id: "random-name-generator",          name: "Random Name Generator",          cat: "🔧 Generators",   hot: false },
      { id: "random-password-generator",      name: "Random Password Generator",      cat: "🔧 Generators",   hot: false },
      { id: "fake-address-generator",         name: "Fake Address Generator",         cat: "🔧 Generators",   hot: false },
      { id: "fake-email-generator",           name: "Fake Email Generator",           cat: "🔧 Generators",   hot: false },
      { id: "color-palette-generator",        name: "Color Palette Generator",        cat: "🔧 Generators",   hot: false },
      { id: "gradient-generator",             name: "Gradient Generator",             cat: "🔧 Generators",   hot: false },
      { id: "slug-generator",                 name: "Slug Generator",                 cat: "🔧 Generators",   hot: false },
      { id: "website-performance-analyzer",   name: "Website Performance Analyzer",   cat: "🔧 Generators",   hot: false },
      // ── 🧮 Math (missing) ────────────────────────────────
      { id: "ratio-calculator",               name: "Ratio Calculator",               cat: "🧮 Math",         hot: false },
      { id: "square-root-calculator",         name: "Square Root Calculator",         cat: "🧮 Math",         hot: false },
      { id: "cube-calculator",                name: "Cube Calculator",                cat: "🧮 Math",         hot: false },
      { id: "log-calculator",                 name: "Log Calculator",                 cat: "🧮 Math",         hot: false },
      { id: "exponent-calculator",            name: "Exponent Calculator",            cat: "🧮 Math",         hot: false },
      { id: "factorial-calculator",           name: "Factorial Calculator",           cat: "🧮 Math",         hot: false },
      { id: "gcd-calculator",                 name: "GCD Calculator",                 cat: "🧮 Math",         hot: false },
      { id: "lcm-calculator",                 name: "LCM Calculator",                 cat: "🧮 Math",         hot: false },
      { id: "mean-calculator",                name: "Mean Calculator",                cat: "🧮 Math",         hot: false },
      { id: "median-calculator",              name: "Median Calculator",              cat: "🧮 Math",         hot: false },
      { id: "mode-calculator",                name: "Mode Calculator",                cat: "🧮 Math",         hot: false },
      { id: "standard-deviation-calculator",  name: "Standard Deviation Calc",        cat: "🧮 Math",         hot: false },
      { id: "random-number-generator",        name: "Random Number Generator",        cat: "🧮 Math",         hot: false },
      { id: "permutation-combination-calculator", name: "Permutation & Combination",  cat: "🧮 Math",         hot: false },
      { id: "binary-converter",               name: "Binary Converter",               cat: "🧮 Math",         hot: false },
      { id: "scientific-calculator",          name: "Scientific Calculator",          cat: "🧮 Math",         hot: false },
      // ── 🏥 Health (missing) ──────────────────────────────
      { id: "bmr-calculator",                 name: "BMR Calculator",                 cat: "🏥 Health",       hot: false },
      { id: "calorie-calculator",             name: "Calorie Calculator",             cat: "🏥 Health",       hot: false },
      { id: "body-fat-calculator",            name: "Body Fat Calculator",            cat: "🏥 Health",       hot: false },
      { id: "water-intake-calculator",        name: "Water Intake Calculator",        cat: "🏥 Health",       hot: false },
      { id: "heart-rate-calculator",          name: "Heart Rate Calculator",          cat: "🏥 Health",       hot: false },
      { id: "ideal-weight-calculator",        name: "Ideal Weight Calculator",        cat: "🏥 Health",       hot: false },
      { id: "ideal-body-weight-calculator",   name: "Ideal Body Weight Calc",         cat: "🏥 Health",       hot: false },
      // ── 🏗️ Construction (missing) ────────────────────────
      { id: "brick-calculator",               name: "Brick Calculator",               cat: "🏗️ Construction", hot: false },
      { id: "concrete-calculator",            name: "Concrete Calculator",            cat: "🏗️ Construction", hot: false },
      { id: "paint-calculator",               name: "Paint Calculator",               cat: "🏗️ Construction", hot: false },
      { id: "tile-calculator",                name: "Tile Calculator",                cat: "🏗️ Construction", hot: false },
      { id: "flooring-calculator",            name: "Flooring Calculator",            cat: "🏗️ Construction", hot: false },
      { id: "roofing-calculator",             name: "Roofing Calculator",             cat: "🏗️ Construction", hot: false },
      { id: "stair-calculator",               name: "Stair Calculator",               cat: "🏗️ Construction", hot: false },
      { id: "asphalt-calculator",             name: "Asphalt Calculator",             cat: "🏗️ Construction", hot: false },
      { id: "gravel-calculator",              name: "Gravel Calculator",              cat: "🏗️ Construction", hot: false },
      { id: "sand-calculator",                name: "Sand Calculator",                cat: "🏗️ Construction", hot: false },
      // ── 📐 Converters (missing) ──────────────────────────
      { id: "angle-converter",                name: "Angle Converter",                cat: "📐 Converters",   hot: false },
      { id: "volume-converter",               name: "Volume Converter",               cat: "📐 Converters",   hot: false },
      { id: "speed-converter",                name: "Speed Converter",                cat: "📐 Converters",   hot: false },
      { id: "time-converter",                 name: "Time Converter",                 cat: "📐 Converters",   hot: false },
      { id: "data-storage-converter",         name: "Data Storage Converter",         cat: "📐 Converters",   hot: false },
      { id: "pressure-converter",             name: "Pressure Converter",             cat: "📐 Converters",   hot: false },
      { id: "energy-converter",               name: "Energy Converter",               cat: "📐 Converters",   hot: false },
      { id: "power-converter",                name: "Power Converter",                cat: "📐 Converters",   hot: false },
      { id: "fuel-efficiency-converter",      name: "Fuel Efficiency Converter",      cat: "📐 Converters",   hot: false },
      { id: "density-converter",              name: "Density Converter",              cat: "📐 Converters",   hot: false },
      { id: "unit-converter",                 name: "Unit Converter (All)",           cat: "📐 Converters",   hot: true  },
      // ── ⏱️ Date & Time (missing) ─────────────────────────
      { id: "age-difference-calculator",      name: "Age Difference Calculator",      cat: "⏱️ Date & Time",  hot: false },
      { id: "date-duration-calculator",       name: "Date Duration Calculator",       cat: "⏱️ Date & Time",  hot: false },
      { id: "time-duration-calculator",       name: "Time Duration Calculator",       cat: "⏱️ Date & Time",  hot: false },
      { id: "work-hours-calculator",          name: "Work Hours Calculator",          cat: "⏱️ Date & Time",  hot: false },
      // ── 🚗 Travel (missing) ──────────────────────────────
      { id: "fuel-cost-calculator",           name: "Fuel Cost Calculator",           cat: "🚗 Travel",       hot: false },
      { id: "speed-calculator",               name: "Speed Calculator",               cat: "🚗 Travel",       hot: false },
      { id: "distance-calculator",            name: "Distance Calculator",            cat: "🚗 Travel",       hot: false },
      // ── 📱 Content extra ─────────────────────────────────
      { id: "ai-prompt-generator",            name: "AI Prompt Generator",            cat: "📱 Content",      hot: false },
    ];

    const CATS = ["all", ...new Set(ALL_TOOLS.map((t) => t.cat))];

    const toggleHide = (id) => {
      const updated = hiddenTools.includes(id)
        ? hiddenTools.filter((h) => h !== id)
        : [...hiddenTools, id];
      saveSettings({ hiddenTools: updated });
      showToast(
        hiddenTools.includes(id) ? "✅ Tool visible" : "🙈 Tool hidden",
      );
    };

    const toggleFeatured = (id) => {
      let updated;
      if (featuredTools.includes(id)) {
        updated = featuredTools.filter((f) => f !== id);
      } else {
        if (featuredTools.length >= 6)
          return showToast("⚠️ Max 6 featured tools allowed");
        updated = [...featuredTools, id];
      }
      saveSettings({ featuredTools: updated });
      showToast(
        featuredTools.includes(id)
          ? "⭐ Removed from featured"
          : "⭐ Featured mein add kiya!",
      );
    };

    const catBulkHide = (cat) => {
      const ids = ALL_TOOLS.filter((t) => t.cat === cat).map((t) => t.id);
      saveSettings({ hiddenTools: [...new Set([...hiddenTools, ...ids])] });
      showToast("🙈 Category hide ki");
    };
    const catBulkShow = (cat) => {
      const ids = ALL_TOOLS.filter((t) => t.cat === cat).map((t) => t.id);
      saveSettings({
        hiddenTools: hiddenTools.filter((h) => !ids.includes(h)),
      });
      showToast("✅ Category show ki");
    };
    const resetAll = () => {
      if (!window.confirm("Sab tools visible kar dein?")) return;
      saveSettings({ hiddenTools: [], featuredTools: [] });
      showToast("✅ Reset ho gaya");
    };

    const filtered = ALL_TOOLS.filter((t) => {
      const matchCat = catFilter === "all" || t.cat === catFilter;
      const matchSearch =
        !search || t.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });

    const visibleCount = ALL_TOOLS.length - hiddenTools.length;
    const featuredCount = featuredTools.length;

    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 4 }}>
          🛠️ Tools Manager
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 16 }}
        >
          Tools ko hide/show karo aur Homepage pe featured tools choose karo.
          Changes turant live hote hain — refresh nahi chahiye.
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#f0fdf4",
              border: "1.5px solid #bbf7d0",
              borderRadius: 12,
              padding: "10px 16px",
              flex: 1,
              minWidth: 100,
            }}
          >
            <div
              style={{ fontWeight: 900, fontSize: "1.4rem", color: "#16a34a" }}
            >
              {visibleCount}
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}
            >
              ✅ Visible
            </div>
          </div>
          <div
            style={{
              background: "#fef2f2",
              border: "1.5px solid #fecaca",
              borderRadius: 12,
              padding: "10px 16px",
              flex: 1,
              minWidth: 100,
            }}
          >
            <div
              style={{ fontWeight: 900, fontSize: "1.4rem", color: "#dc2626" }}
            >
              {hiddenTools.length}
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}
            >
              🙈 Hidden
            </div>
          </div>
          <div
            style={{
              background: "#fffbeb",
              border: "1.5px solid #fde68a",
              borderRadius: 12,
              padding: "10px 16px",
              flex: 1,
              minWidth: 100,
            }}
          >
            <div
              style={{ fontWeight: 900, fontSize: "1.4rem", color: "#b45309" }}
            >
              {featuredCount}/6
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}
            >
              ⭐ Featured
            </div>
          </div>
          <div
            style={{
              background: "#eff6ff",
              border: "1.5px solid #bfdbfe",
              borderRadius: 12,
              padding: "10px 16px",
              flex: 1,
              minWidth: 100,
            }}
          >
            <div
              style={{ fontWeight: 900, fontSize: "1.4rem", color: "#1565c0" }}
            >
              {ALL_TOOLS.length}
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}
            >
              🛠️ Total
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 12,
          }}
        >
          {[
            { id: "visibility", label: "👁️ Show/Hide" },
            { id: "featured", label: "⭐ Featured" },
            { id: "edit", label: "✏️ Edit Tools" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "8px 14px",
                background: activeTab === t.id ? "#0f172a" : "#f1f5f9",
                color: activeTab === t.id ? "#fff" : "#475569",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={resetAll}
            style={{
              marginLeft: "auto",
              padding: "8px 14px",
              background: "#fef2f2",
              color: "#dc2626",
              border: "1.5px solid #fecaca",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: "0.78rem",
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            🔄 Reset All
          </button>
        </div>

        {/* ── VISIBILITY TAB ── */}
        {activeTab === "visibility" && (
          <div>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 14,
                fontSize: "0.78rem",
                color: "#1e40af",
              }}
            >
              💡 Hidden tools website ke tools page pe nahi dikhengi. Direct URL
              se access ho sakti hain.
            </div>

            {/* Search + Category filter */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Tool search karo..."
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 10,
                fontSize: "0.85rem",
                fontFamily: "var(--font)",
                boxSizing: "border-box",
                marginBottom: 10,
              }}
            />

            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  style={{
                    padding: "6px 11px",
                    background: catFilter === c ? "#0f172a" : "#f1f5f9",
                    color: catFilter === c ? "#fff" : "#475569",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font)",
                  }}
                >
                  {c === "all" ? "🗂️ All" : c}
                </button>
              ))}
            </div>

            {/* Bulk actions for category */}
            {catFilter !== "all" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button
                  onClick={() => catBulkShow(catFilter)}
                  style={{
                    padding: "7px 14px",
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#16a34a",
                  }}
                >
                  ✅ Sab Show
                </button>
                <button
                  onClick={() => catBulkHide(catFilter)}
                  style={{
                    padding: "7px 14px",
                    background: "#fef2f2",
                    border: "1.5px solid #fecaca",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#dc2626",
                  }}
                >
                  🙈 Sab Hide
                </button>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#94a3b8",
                    alignSelf: "center",
                  }}
                >
                  {filtered.filter((t) => !hiddenTools.includes(t.id)).length}/
                  {filtered.length} visible
                </span>
              </div>
            )}

            {/* Tool list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {filtered.map((t) => {
                const isHidden = hiddenTools.includes(t.id);
                return (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: isHidden ? "#f8fafc" : "#fff",
                      border: `1.5px solid ${isHidden ? "#f1f5f9" : "#e2e8f0"}`,
                      borderRadius: 10,
                      opacity: isHidden ? 0.6 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    {/* Toggle switch */}
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: 38,
                        height: 22,
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!isHidden}
                        onChange={() => toggleHide(t.id)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          inset: 0,
                          borderRadius: 99,
                          background: !isHidden ? "#10b981" : "#cbd5e1",
                          transition: "0.2s",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            height: 16,
                            width: 16,
                            left: !isHidden ? 19 : 3,
                            bottom: 3,
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          }}
                        />
                      </span>
                    </label>
                    {/* Tool info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            color: "#0f172a",
                          }}
                        >
                          {t.name}
                        </span>
                        {t.hot && (
                          <span
                            style={{
                              background: "#fef3c7",
                              color: "#b45309",
                              fontSize: "0.6rem",
                              fontWeight: 800,
                              padding: "1px 6px",
                              borderRadius: 99,
                            }}
                          >
                            🔥 Hot
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                        {t.cat}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: isHidden ? "#dc2626" : "#16a34a",
                      }}
                    >
                      {isHidden ? "Hidden" : "Visible"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── FEATURED TAB ── */}
        {activeTab === "featured" && (
          <div>
            <div
              style={{
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 14,
                fontSize: "0.78rem",
                color: "#92400e",
              }}
            >
              ⭐ <strong>Featured tools</strong> Homepage pe "Popular Free
              Tools" section mein dikhengi (max 6). Inhe select karo jo sabse
              zyada useful hain visitors ke liye.
            </div>

            {/* Current featured */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  marginBottom: 10,
                }}
              >
                ⭐ Currently Featured ({featuredTools.length}/6):
              </div>
              {featuredTools.length === 0 ? (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    padding: "10px 0",
                  }}
                >
                  Koi featured tool nahi — neeche se select karo
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {featuredTools.map((id) => {
                    const t = ALL_TOOLS.find((x) => x.id === id);
                    if (!t) return null;
                    return (
                      <div
                        key={id}
                        style={{
                          background: "#fffbeb",
                          border: "1.5px solid #fde68a",
                          borderRadius: 10,
                          padding: "6px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: "0.8rem",
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>{t.name}</span>
                        <button
                          onClick={() => toggleFeatured(id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#94a3b8",
                            fontSize: "0.9rem",
                            padding: 0,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* All tools to pick from */}
            <div
              style={{ fontWeight: 800, fontSize: "0.85rem", marginBottom: 10 }}
            >
              Sab tools — select karo (max 6):
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Tool search karo..."
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 10,
                fontSize: "0.85rem",
                fontFamily: "var(--font)",
                boxSizing: "border-box",
                marginBottom: 10,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              {(search
                ? ALL_TOOLS.filter((t) =>
                    t.name.toLowerCase().includes(search.toLowerCase()),
                  )
                : ALL_TOOLS
              ).map((t) => {
                const isFeat = featuredTools.includes(t.id);
                return (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 14px",
                      background: isFeat ? "#fffbeb" : "#fff",
                      border: `1.5px solid ${isFeat ? "#fde68a" : "#e2e8f0"}`,
                      borderRadius: 10,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onClick={() => toggleFeatured(t.id)}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        flexShrink: 0,
                        background: isFeat ? "#f59e0b" : "#fff",
                        border: `2px solid ${isFeat ? "#f59e0b" : "#cbd5e1"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isFeat && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "0.75rem",
                            fontWeight: 900,
                          }}
                        >
                          ★
                        </span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#0f172a",
                        }}
                      >
                        {t.name}
                      </span>
                      {t.hot && (
                        <span
                          style={{
                            marginLeft: 6,
                            background: "#fef3c7",
                            color: "#b45309",
                            fontSize: "0.6rem",
                            fontWeight: 800,
                            padding: "1px 6px",
                            borderRadius: 99,
                          }}
                        >
                          🔥
                        </span>
                      )}
                      <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                        {t.cat}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: isFeat ? "#b45309" : "#94a3b8",
                      }}
                    >
                      {isFeat ? "⭐ Featured" : "Add karo"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EDIT TAB ── */}
        {activeTab === "edit" &&
          (() => {
            const custom = getCustomTools();
            const TOOL_CATS = [...new Set(ALL_TOOLS.map((t) => t.cat))];
            const editFiltered = ALL_TOOLS.filter((t) => {
              const matchSearch =
                !search || t.name.toLowerCase().includes(search.toLowerCase());
              const matchCat = catFilter === "all" || t.cat === catFilter;
              return matchSearch && matchCat;
            });
            return (
              <div>
                <div
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 14,
                    fontSize: "0.78rem",
                    color: "#1e40af",
                  }}
                >
                  ✏️ Har tool ka <strong>naam</strong>,{" "}
                  <strong>description</strong> aur <strong>category</strong>{" "}
                  yahan se badlo. Changes turant ToolsPage pe reflect honge.
                </div>

                {/* Search + Filter */}
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔍 Tool search karo..."
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: "0.85rem",
                    fontFamily: "var(--font)",
                    boxSizing: "border-box",
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  {["all", ...TOOL_CATS].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCatFilter(c)}
                      style={{
                        padding: "6px 11px",
                        background: catFilter === c ? "#0f172a" : "#f1f5f9",
                        color: catFilter === c ? "#fff" : "#475569",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font)",
                      }}
                    >
                      {c === "all" ? "🗂️ All" : c}
                    </button>
                  ))}
                </div>

                {/* Tool edit list */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {editFiltered.map((t) => {
                    const isEditing = editingId === t.id;
                    const hasCustom = !!custom[t.id];
                    const displayName = custom[t.id]?.name || t.name;
                    const displayDesc = custom[t.id]?.description || "";

                    return (
                      <div
                        key={t.id}
                        style={{
                          border: `1.5px solid ${isEditing ? "#1565c0" : hasCustom ? "#bbf7d0" : "#e2e8f0"}`,
                          borderRadius: 12,
                          overflow: "hidden",
                          background: isEditing ? "#f0f7ff" : "#fff",
                        }}
                      >
                        {/* Tool row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  color: "#0f172a",
                                }}
                              >
                                {displayName}
                              </span>
                              {t.hot && (
                                <span
                                  style={{
                                    background: "#fef3c7",
                                    color: "#b45309",
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    padding: "1px 6px",
                                    borderRadius: 99,
                                  }}
                                >
                                  🔥
                                </span>
                              )}
                              {hasCustom && (
                                <span
                                  style={{
                                    background: "#dcfce7",
                                    color: "#16a34a",
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    padding: "1px 6px",
                                    borderRadius: 99,
                                  }}
                                >
                                  ✏️ Edited
                                </span>
                              )}
                            </div>
                            <div
                              style={{ fontSize: "0.7rem", color: "#94a3b8" }}
                            >
                              {custom[t.id]?.cat || t.cat}
                            </div>
                            {displayDesc && (
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  color: "#64748b",
                                  marginTop: 2,
                                }}
                              >
                                {displayDesc}
                              </div>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", gap: 6, flexShrink: 0 }}
                          >
                            {hasCustom && !isEditing && (
                              <button
                                onClick={() => resetEdit(t.id)}
                                style={{
                                  padding: "5px 10px",
                                  background: "#fef2f2",
                                  border: "1.5px solid #fecaca",
                                  borderRadius: 7,
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  color: "#dc2626",
                                }}
                              >
                                Reset
                              </button>
                            )}
                            <button
                              onClick={() =>
                                isEditing ? setEditingId(null) : startEdit(t)
                              }
                              style={{
                                padding: "5px 12px",
                                background: isEditing ? "#f1f5f9" : "#0f172a",
                                color: isEditing ? "#475569" : "#fff",
                                border: "none",
                                borderRadius: 7,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              {isEditing ? "Cancel" : "✏️ Edit"}
                            </button>
                          </div>
                        </div>

                        {/* Edit form */}
                        {isEditing && (
                          <div
                            style={{
                              padding: "12px 14px",
                              borderTop: "1.5px solid #e2e8f0",
                              background: "#fff",
                            }}
                          >
                            <div style={{ marginBottom: 10 }}>
                              <label
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  color: "#475569",
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                Tool Name *
                              </label>
                              <input
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    name: e.target.value,
                                  }))
                                }
                                style={{
                                  width: "100%",
                                  padding: "8px 10px",
                                  border: "1.5px solid #cbd5e1",
                                  borderRadius: 8,
                                  fontSize: "0.85rem",
                                  fontFamily: "var(--font)",
                                  boxSizing: "border-box",
                                }}
                              />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                              <label
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  color: "#475569",
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                Description (tools page pe dikhegi)
                              </label>
                              <textarea
                                value={editForm.description}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    description: e.target.value,
                                  }))
                                }
                                rows={2}
                                placeholder="e.g. GST inclusive aur exclusive dono calculate karo — CGST/SGST/IGST breakup ke saath"
                                style={{
                                  width: "100%",
                                  padding: "8px 10px",
                                  border: "1.5px solid #cbd5e1",
                                  borderRadius: 8,
                                  fontSize: "0.82rem",
                                  fontFamily: "var(--font)",
                                  boxSizing: "border-box",
                                  resize: "vertical",
                                }}
                              />
                            </div>
                            <div style={{ marginBottom: 12 }}>
                              <label
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  color: "#475569",
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                Category
                              </label>
                              <select
                                value={editForm.cat}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    cat: e.target.value,
                                  }))
                                }
                                style={{
                                  width: "100%",
                                  padding: "8px 10px",
                                  border: "1.5px solid #cbd5e1",
                                  borderRadius: 8,
                                  fontSize: "0.82rem",
                                  fontFamily: "var(--font)",
                                  boxSizing: "border-box",
                                  background: "#fff",
                                }}
                              >
                                {TOOL_CATS.map((c) => (
                                  <option key={c} value={c}>
                                    {c}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button
                                onClick={() => saveEdit(t.id)}
                                style={{
                                  flex: 1,
                                  padding: "9px",
                                  background: "#0f172a",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: 8,
                                  fontWeight: 700,
                                  fontSize: "0.82rem",
                                  cursor: "pointer",
                                  fontFamily: "var(--font)",
                                }}
                              >
                                ✅ Save Changes
                              </button>
                              <button
                                onClick={() => resetEdit(t.id)}
                                style={{
                                  padding: "9px 14px",
                                  background: "#fef2f2",
                                  color: "#dc2626",
                                  border: "1.5px solid #fecaca",
                                  borderRadius: 8,
                                  fontWeight: 700,
                                  fontSize: "0.78rem",
                                  cursor: "pointer",
                                  fontFamily: "var(--font)",
                                }}
                              >
                                🔄 Reset
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
      </div>
    );
  }
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("almenso_admin") === "true",
  );
  const [tab, setTab] = useState("leads");
  const logout = () => {
    localStorage.removeItem("almenso_admin");
    setIsLoggedIn(false);
  };
  const TABS = [
    { id: "leads", label: "📋 Leads" },
    { id: "homepage", label: "🏠 Homepage" },
    { id: "design", label: "🎨 Design" },
    { id: "svcpages", label: "🔧 Service Pages" },
    { id: "services", label: "⚒️ Services" },
    { id: "blogs", label: "📝 Blogs" },
    { id: "products", label: "🛒 Products" },
    { id: "affiliate", label: "🛒 Affiliate" },
    { id: "tools", label: "🛠️ Tools" },
    { id: "marketing", label: "📊 Marketing" },
    { id: "notifications", label: "🔔 Notifications" },
    { id: "pages", label: "📄 Pages" },
    { id: "settings", label: "⚙️ Settings" },
  ];
  if (!isLoggedIn) return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-logo">⚙️ Almenso Admin</div>
        <button className="admin-logout" onClick={logout}>
          Logout 🚪
        </button>
      </div>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`at-btn${tab === t.id ? " on" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="admin-body">
        {tab === "leads" && <LeadsManager />}
        {tab === "homepage" && <HomepageManager />}
        {tab === "design" && <HomepageDesignManager />}
        {tab === "svcpages" && <ServicePagesManager />}
        {tab === "services" && <ServicesManager />}
        {tab === "blogs" && <BlogManager />}
        {tab === "products" && <ProductsManager />}
        {tab === "affiliate" && <AffiliateManager />}
        {tab === "tools" && <ToolsManager />}
        {tab === "marketing" && <MarketingDashboard />}
        {tab === "notifications" && <NotificationsManager />}
        {tab === "pages" && <PagesManager />}
        {tab === "settings" && <SettingsManager />}
      </div>
    </div>
  );
}

export default AdminPage;

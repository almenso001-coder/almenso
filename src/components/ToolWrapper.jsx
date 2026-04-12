/**
 * TOOL WRAPPER v2 — Improved UI
 * Changes:
 * - Animated hero with gradient based on tool color
 * - Smooth FAQ accordion with CSS animation
 * - Better section spacing and cards
 * - Page entrance animation
 */
import React, {
  useEffect,
  useState,
  memo,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import SEOHead from "./SEOHead";
import AdSlot from "./AdSlot";
import PostResultMonetization, {
  SERVICE_CONFIGS,
} from "./PostResultMonetization";
import {
  RelatedArticlesCard,
  ServiceCTAStrip,
  RelatedToolsGrid,
} from "./InterlinkedWidget";
import { TOOLS_DATABASE, TOOL_CATEGORIES } from "../data/toolsDatabase";
import "./ToolWrapper.css";

export const ToolResultCtx = createContext({
  showMonetization: false,
  setShowMonetization: () => {},
});
export const useToolResult = () => useContext(ToolResultCtx);

export default function ToolWrapper({
  title,
  description,
  keywords,
  emoji,
  heroColor,
  toolName,
  tagline,
  children,
  guideSteps = [],
  faqs = [],
  relatedBlog,
  relatedTools = [],
  affCategory = null,
  toolPath = null,
  serviceCategory = null,
  hasResult = null,
}) {
  const navigate = useNavigate();
  const [showMon, setShowMon] = useState(false);
  const [pageIn, setPageIn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setPageIn(true), 60);
  }, []);

  useEffect(() => {
    if (hasResult !== null) setShowMon(!!hasResult);
  }, [hasResult]);

  const serviceConfig = serviceCategory
    ? SERVICE_CONFIGS[serviceCategory]
    : null;

  const toolId = toolPath?.split("/").filter(Boolean).pop();
  const toolMeta = useMemo(() => {
    if (!toolId) return null;
    return (
      TOOLS_DATABASE.find(
        (t) => t.id === toolId || `/tools/${t.id}` === toolPath,
      ) || null
    );
  }, [toolId, toolPath]);

  const categoryKey = toolMeta?.category || null;
  const categoryLabel = categoryKey
    ? {
        [TOOL_CATEGORIES.CALCULATOR]: "Calculators",
        [TOOL_CATEGORIES.IMAGE]: "Image Tools",
        [TOOL_CATEGORIES.PDF]: "PDF Tools",
        [TOOL_CATEGORIES.TEXT]: "Text Tools",
        [TOOL_CATEGORIES.SEO]: "SEO Tools",
        [TOOL_CATEGORIES.DEVELOPER]: "Developer Tools",
        [TOOL_CATEGORIES.SOCIAL_MEDIA]: "Social Media Tools",
        [TOOL_CATEGORIES.FINANCE]: "Finance",
        [TOOL_CATEGORIES.HEALTH]: "Health",
        [TOOL_CATEGORIES.CONVERTER]: "Converters",
        [TOOL_CATEGORIES.UTILITY]: "Utilities",
        [TOOL_CATEGORIES.DESIGN]: "Design",
      }[categoryKey]
    : null;

  const computedToolName = toolName || toolMeta?.name || "Tool";
  const computedTagline = tagline || description || toolMeta?.description || "";

  const breadcrumbItems = useMemo(() => {
    const items = [
      { label: "Home", to: "/" },
      { label: "Tools", to: "/tools" },
    ];
    if (categoryLabel) {
      items.push({
        label: categoryLabel,
        to: `/tools?category=${encodeURIComponent(categoryKey)}`,
      });
    }
    items.push({ label: computedToolName, to: toolPath || "/tools" });
    return items;
  }, [categoryKey, categoryLabel, computedToolName, toolPath]);

  useEffect(() => {
    console.log("ToolWrapper debug:", {
      toolName,
      toolPath,
      toolId,
      toolMeta,
      categoryKey,
      categoryLabel,
      computedToolName,
      computedTagline,
    });
  }, [
    toolName,
    toolPath,
    toolId,
    toolMeta,
    categoryKey,
    categoryLabel,
    computedToolName,
    computedTagline,
  ]);

  // heroColor gradient string hai ya plain color — detect karo
  const heroBg = !heroColor
    ? "linear-gradient(135deg, #0b1d3a 0%, #0f3520 100%)"
    : heroColor.includes("gradient") ||
        (heroColor.includes("#") && heroColor.includes(","))
      ? heroColor // Already full gradient string — seedha use karo
      : `linear-gradient(135deg, ${heroColor}ee 0%, ${heroColor}99 100%)`; // Plain hex color

  return (
    <ToolResultCtx.Provider
      value={{ showMonetization: showMon, setShowMonetization: setShowMon }}
    >
      <SEOHead
        title={title || toolName}
        description={description}
        keywords={keywords}
      />

      <div className={`tool-page tw-page ${pageIn ? "tw-page-in" : ""}`}>
        {/* ── Hero ── */}
        <div className="tw-hero" style={{ background: heroBg }}>
          {/* Decorative background circles */}
          <div className="tw-hero-bg">
            <div className="tw-hero-circle tw-hero-circle-1" />
            <div className="tw-hero-circle tw-hero-circle-2" />
          </div>
          <div className="tw-hero-inner">
            <nav className="tw-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  {idx === breadcrumbItems.length - 1 ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link to={item.to}>{item.label}</Link>
                  )}
                  {idx < breadcrumbItems.length - 1 && (
                    <span className="tw-breadcrumb-sep">›</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            <div className="tw-hero-emoji">{emoji}</div>
            <h1 className="tw-hero-title">{computedToolName}</h1>
            {computedTagline && (
              <p className="tw-hero-tagline">{computedTagline}</p>
            )}
            <div className="tw-hero-badges">
              <span className="tw-badge">✅ 100% Free</span>
              <span className="tw-badge">🔒 No Login</span>
              <span className="tw-badge">📱 Mobile Ready</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="tw-body">
          <AdSlot slot="top" />

          {description && (
            <div className="tw-desc-card">
              <p>{description}</p>
            </div>
          )}

          {/* Tool content */}
          <div className="tw-tool-content">{children}</div>

          {!showMon && <AdSlot slot="mid" />}

          {/* Post-result monetization */}
          <PostResultMonetization
            show={showMon}
            affCategory={affCategory}
            serviceConfig={serviceConfig}
            adSlotId="mid"
          />

          {/* Guide */}
          {guideSteps.length > 0 && (
            <div className="tw-section-card">
              <div className="tw-section-title">
                <span>📖</span> {toolName} Kaise Use Karein?
              </div>
              <ol className="tw-guide-list">
                {guideSteps.map((step, i) => (
                  <li key={i} className="tw-guide-step">
                    <div className="tw-step-num">{i + 1}</div>
                    <div className="tw-step-body">
                      <strong>{step.heading}</strong>
                      {step.text && <p>{step.text}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <div className="tw-section-card">
              <div className="tw-section-title">
                <span>❓</span> Aksar Pooche Jaane Wale Sawaal
              </div>
              <div className="tw-faq-list">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          )}

          {/* Interlinked */}
          {toolPath && <RelatedArticlesCard toolPath={toolPath} />}
          {toolPath && <ServiceCTAStrip toolPath={toolPath} />}

          {relatedBlog && (
            <div
              className="tw-blog-cta"
              onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
            >
              <div>
                <div className="tw-blog-eyebrow">📝 Related Article</div>
                <div className="tw-blog-title">{relatedBlog.title}</div>
                <div className="tw-blog-excerpt">{relatedBlog.excerpt}</div>
              </div>
              <div className="tw-blog-arrow">→</div>
            </div>
          )}

          {relatedTools.length === 0 && toolPath && (
            <RelatedToolsGrid toolPath={toolPath} />
          )}

          {relatedTools.length > 0 && (
            <div className="tw-section-card">
              <div className="tw-section-title">
                <span>🛠️</span> Aur Tools Try Karo
              </div>
              <div className="tw-rel-tools">
                {relatedTools.map((t) => (
                  <button
                    key={t.path}
                    className="tw-rel-btn"
                    onClick={() => navigate(t.path)}
                  >
                    <span>{t.emoji}</span> {t.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AdSlot slot="bottom" />
        </div>
      </div>
    </ToolResultCtx.Provider>
  );
}

// ── FAQ Item with smooth animation ──────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tw-faq-item ${open ? "tw-faq-open" : ""}`}>
      <button className="tw-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="tw-faq-chevron">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 4.5L7 9.5L12 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="tw-faq-body">
        <div className="tw-faq-a">{a}</div>
      </div>
    </div>
  );
}

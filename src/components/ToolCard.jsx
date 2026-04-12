/**
 * TOOL CARD COMPONENT
 * Displays individual tool cards with icon, name, description
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import AdSlot from "./AdSlot";
import "./ToolCard.css";

export default function ToolCard({ tool, featured = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tools/${tool.id}`);
  };

  return (
    <div
      className={`tool-card ${featured ? "tool-card-featured" : ""}`}
      onClick={handleClick}
      style={{ "--tool-color": tool.color }}
    >
      {tool.featured && (
        <div className="tc-badge">
          <span className="tc-badge-icon">⭐</span>
          <span>Popular</span>
        </div>
      )}

      <div className="tc-icon" style={{ background: tool.color }}>
        <span className="tc-icon-emoji">{tool.icon}</span>
      </div>

      <div className="tc-content">
        <h3 className="tc-title">{tool.name}</h3>
        <p className="tc-description">{tool.description}</p>

        <div className="tc-footer">
          <span className="tc-category">{formatCategory(tool.category)}</span>
          <span className="tc-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Tool Card Grid Layout
 */
export function ToolGrid({ tools, featured = false, adFrequency = 6 }) {
  const entries = [];

  tools.forEach((tool, index) => {
    entries.push(
      <ToolCard
        key={tool.id || tool.path || index}
        tool={tool}
        featured={featured}
      />,
    );

    if ((index + 1) % adFrequency === 0 && index < tools.length - 1) {
      entries.push(
        <div
          key={`tool-ad-${index}`}
          style={{ gridColumn: "1 / -1", margin: "24px 0" }}
        >
          <AdSlot slot="mid" />
        </div>,
      );
    }
  });

  return <div className="tool-grid">{entries}</div>;
}

/**
 * Featured Tools Section
 */
export function FeaturedTools({ tools }) {
  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);

  return (
    <section className="featured-tools">
      <div className="ft-header">
        <h2 className="ft-title">🌟 Popular Tools</h2>
        <p className="ft-subtitle">Most used tools by our community</p>
      </div>

      <ToolGrid tools={featuredTools} featured={true} />
    </section>
  );
}

/**
 * Category Tools Section
 */
export function CategoryTools({ category, tools }) {
  const categoryTools = tools.filter((t) => t.category === category);

  return (
    <section className="category-tools">
      <div className="ct-header">
        <h2 className="ct-title">{formatCategory(category)}</h2>
        <p className="ct-count">{categoryTools.length} tools</p>
      </div>

      <ToolGrid tools={categoryTools} />
    </section>
  );
}

/**
 * Related Tools Component
 */
export function RelatedTools({ toolIds, allTools }) {
  const relatedTools = toolIds
    .map((id) => allTools.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (relatedTools.length === 0) return null;

  return (
    <section className="related-tools">
      <h3 className="rt-title">Related Tools You Might Like</h3>
      <div className="rt-grid">
        {relatedTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

/**
 * Compact Tool Link (for article sidebars)
 */
export function ToolLink({ tool }) {
  const navigate = useNavigate();

  return (
    <div className="tool-link" onClick={() => navigate(`/tools/${tool.id}`)}>
      <span className="tl-icon" style={{ background: tool.color }}>
        {tool.icon}
      </span>
      <div className="tl-content">
        <div className="tl-name">{tool.name}</div>
        <div className="tl-desc">{tool.description}</div>
      </div>
      <span className="tl-arrow">›</span>
    </div>
  );
}

/**
 * Format category name for display
 */
function formatCategory(category) {
  const categoryNames = {
    calculator: "Calculators",
    image: "Image Tools",
    pdf: "PDF Tools",
    text: "Text Tools",
    seo: "SEO Tools",
    developer: "Developer Tools",
    "social-media": "Social Media Tools",
    finance: "Finance Tools",
    health: "Health Tools",
    converter: "Converters",
    utility: "Utility Tools",
    design: "Design Tools",
  };

  return (
    categoryNames[category] ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

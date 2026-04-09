/**
 * SKELETON LOADERS — Reusable shimmer placeholders
 * Use these while async data is loading
 */
import React, { memo } from 'react'

// ── Base shimmer bar ──────────────────────────────────────────
export const SkBar = memo(({ w = '100%', h = 16, r = 8, mb = 10 }) => (
  <div className="skeleton" style={{ width: w, height: h, borderRadius: r, marginBottom: mb }} />
))

// ── Tool card skeleton ────────────────────────────────────────
export const ToolCardSkeleton = memo(() => (
  <div className="sk-tool-card">
    <div className="sk-tool-ico skeleton" />
    <div className="sk-tool-body">
      <SkBar h={13} w="70%" mb={6} />
      <SkBar h={10} w="90%" mb={0} />
    </div>
    <SkBar h={11} w={32} mb={0} r={6} />
  </div>
))

// ── Service card skeleton ─────────────────────────────────────
export const ServiceCardSkeleton = memo(() => (
  <div className="sk-svc-card">
    <div className="sk-svc-head skeleton" />
    <div style={{ padding: '14px 16px' }}>
      <SkBar h={14} w="60%" mb={8} />
      <SkBar h={10} w="80%" mb={6} />
      <SkBar h={10} w="70%" mb={14} />
      <div style={{ display:'flex', gap:6 }}>
        <SkBar h={9} w={70} mb={0} r={99} />
        <SkBar h={9} w={60} mb={0} r={99} />
        <SkBar h={9} w={80} mb={0} r={99} />
      </div>
    </div>
  </div>
))

// ── Blog post skeleton ────────────────────────────────────────
export const BlogCardSkeleton = memo(() => (
  <div className="sk-blog-card">
    <div className="sk-blog-emoji skeleton" />
    <div style={{ flex: 1 }}>
      <SkBar h={13} w="80%" mb={7} />
      <SkBar h={10} w="60%" mb={0} />
    </div>
  </div>
))

// ── Product card skeleton ─────────────────────────────────────
export const ProductCardSkeleton = memo(() => (
  <div className="sk-prod-card">
    <div className="sk-prod-img skeleton" />
    <SkBar h={11} w="85%" mb={5} />
    <SkBar h={14} w="50%" mb={8} />
    <SkBar h={30} w="100%" mb={0} r={8} />
  </div>
))

// ── Review card skeleton ──────────────────────────────────────
export const ReviewSkeleton = memo(() => (
  <div className="sk-review-card">
    <div style={{ display:'flex', gap:10, marginBottom:12 }}>
      <div className="sk-review-av skeleton" />
      <div style={{ flex:1 }}>
        <SkBar h={11} w="50%" mb={6} />
        <SkBar h={9}  w="35%" mb={0} />
      </div>
    </div>
    <SkBar h={9} w="100%" mb={5} />
    <SkBar h={9} w="90%"  mb={5} />
    <SkBar h={9} w="75%"  mb={10} />
    <SkBar h={9} w="35%"  mb={0} r={99} />
  </div>
))

// ── Hero stat skeleton ────────────────────────────────────────
export const HeroStatsSkeleton = memo(() => (
  <div style={{ display:'flex', gap:24, marginBottom:22 }}>
    {[1,2,3,4].map(i => (
      <div key={i}>
        <SkBar h={22} w={50} mb={4} />
        <SkBar h={10} w={60} mb={0} />
      </div>
    ))}
  </div>
))

// ── Page-level skeletons ──────────────────────────────────────

export const HomePageSkeleton = memo(() => (
  <div className="skeleton-page">
    {/* Hero skeleton */}
    <div className="sk-hero">
      <SkBar h={14} w={180} mb={14} r={99} />
      <SkBar h={40} w="80%" mb={8} />
      <SkBar h={40} w="60%" mb={18} />
      <SkBar h={16} w="90%" mb={22} />
      <div style={{ display:'flex', gap:12, marginBottom:24 }}>
        <SkBar h={50} w={180} mb={0} r={12} />
        <SkBar h={50} w={140} mb={0} r={12} />
      </div>
    </div>
    {/* Tools section skeleton */}
    <div className="sk-section">
      <SkBar h={14} w={200} mb={16} />
      <div className="sk-tools-row">
        {[1,2,3,4,5,6].map(i => <ToolCardSkeleton key={i} />)}
      </div>
    </div>
    {/* Services skeleton */}
    <div className="sk-section">
      <SkBar h={14} w={220} mb={16} />
      <div className="sk-svc-row">
        {[1,2,3].map(i => <ServiceCardSkeleton key={i} />)}
      </div>
    </div>
  </div>
))

export const BlogPageSkeleton = memo(() => (
  <div className="skeleton-page">
    <div className="sk-hero">
      <SkBar h={32} w="60%" mb={10} />
      <SkBar h={14} w="80%" mb={20} />
      {/* Search bar */}
      <SkBar h={44} w="100%" mb={0} r={12} />
    </div>
    {/* Category filters */}
    <div style={{ display:'flex', gap:8, margin:'16px 0' }}>
      {[70,90,80,100,75].map((w,i) => <SkBar key={i} h={32} w={w} mb={0} r={99} />)}
    </div>
    {/* Blog cards */}
    {[1,2,3,4,5].map(i => <BlogCardSkeleton key={i} />)}
  </div>
))

export const ProductsPageSkeleton = memo(() => (
  <div className="skeleton-page">
    <div className="sk-hero">
      <SkBar h={28} w="50%" mb={10} />
      <SkBar h={14} w="70%" mb={20} />
      <SkBar h={44} w="100%" mb={0} r={12} />
    </div>
    <div style={{ display:'flex', gap:8, margin:'16px 0' }}>
      {[60,90,70,80].map((w,i) => <SkBar key={i} h={34} w={w} mb={0} r={99} />)}
    </div>
    <div className="sk-prods-grid">
      {[1,2,3,4,5,6].map(i => <ProductCardSkeleton key={i} />)}
    </div>
  </div>
))

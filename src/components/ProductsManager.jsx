/**
 * PRODUCTS MANAGER — Admin Panel
 * Manage affiliate products: Add, Edit, Delete
 * Full CRUD with Firestore integration
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { fetchAffiliateProducts, saveAffiliateProductDB, deleteAffiliateProductDB } from '../utils/db'
import ImageUploadWidget from './ImageUploadWidget'

const CATEGORIES = [
  { id: 'electrical', label: '⚡ Electrical' },
  { id: 'solar', label: '☀️ Solar' },
  { id: 'interior', label: '🏠 Interior' },
  { id: 'other', label: '🔧 Other' },
]

const BADGE_OPTIONS = [
  'Best Seller',
  'Top Pick',
  'Best Value',
  'Popular',
  'New',
  'Top Rated',
  'Limited Stock',
  'Recommended',
]

function ProductForm({ product = null, onSave, onCancel }) {
  const [form, setForm] = useState(
    product || {
      name: '',
      category: 'electrical',
      price: '',
      image: '🛍️',
      description: '',
      affiliateLink: '',
      badge: '',
      visible: true,
    }
  )
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(product?.image || '')

  const validateForm = useCallback(() => {
    const newErrors = {}
    if (!form.name?.trim()) newErrors.name = 'Product name is required'
    if (!form.price?.trim()) newErrors.price = 'Price is required'
    if (!form.affiliateLink?.trim()) newErrors.affiliateLink = 'Affiliate link is required'
    if (form.affiliateLink?.trim() && !form.affiliateLink.startsWith('http')) {
      newErrors.affiliateLink = 'Must be a valid URL (http/https)'
    }
    return newErrors
  }, [form])

  const handleImageUploaded = (url) => {
    setUploaded(url)
    setForm((f) => ({ ...f, image: url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForm()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      const finalForm = {
        ...form,
        image: uploaded || form.image,
      }
      await saveAffiliateProductDB(finalForm)
      onSave()
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        borderRadius: 12,
        border: '1.5px solid #e2e8f0',
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          fontSize: '1rem',
          fontWeight: 900,
          color: '#0f172a',
          marginBottom: 16,
        }}
      >
        {product ? '✏️ Edit Product' : '➕ Add New Product'}
      </div>

      {errors.submit && (
        <div
          style={{
            background: '#fef2f2',
            border: '1.5px solid #fca5a5',
            borderRadius: 8,
            padding: '8px 12px',
            color: '#dc2626',
            fontSize: '0.82rem',
            marginBottom: 16,
          }}
        >
          {errors.submit}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: 16,
        }}
      >
        {/* Product Name */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={formLabelStyle}>Product Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }))
              if (errors.name) setErrors((er) => ({ ...er, name: '' }))
            }}
            placeholder="e.g. Luminous 150Ah Tubular Battery"
            style={{ ...formInputStyle, borderColor: errors.name ? '#f87171' : '#e2e8f0' }}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        {/* Category */}
        <div>
          <label style={formLabelStyle}>Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            style={formInputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label style={formLabelStyle}>Price *</label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => {
              setForm((f) => ({ ...f, price: e.target.value }))
              if (errors.price) setErrors((er) => ({ ...er, price: '' }))
            }}
            placeholder="e.g. ₹11,500"
            style={{ ...formInputStyle, borderColor: errors.price ? '#f87171' : '#e2e8f0' }}
          />
          {errors.price && <div style={errorStyle}>{errors.price}</div>}
        </div>

        {/* Badge */}
        <div>
          <label style={formLabelStyle}>Badge (Optional)</label>
          <select
            value={form.badge}
            onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
            style={formInputStyle}
          >
            <option value="">No badge</option>
            {BADGE_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={formLabelStyle}>Description (Optional)</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Product description..."
            rows="3"
            style={{
              ...formInputStyle,
              fontFamily: 'inherit',
              resize: 'vertical',
              minHeight: '70px',
            }}
          />
        </div>

        {/* Affiliate Link */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={formLabelStyle}>Affiliate Link *</label>
          <input
            type="url"
            value={form.affiliateLink}
            onChange={(e) => {
              setForm((f) => ({ ...f, affiliateLink: e.target.value }))
              if (errors.affiliateLink) setErrors((er) => ({ ...er, affiliateLink: '' }))
            }}
            placeholder="https://amazon.in/s?k=...&tag=YOUR_TAG"
            style={{
              ...formInputStyle,
              borderColor: errors.affiliateLink ? '#f87171' : '#e2e8f0',
            }}
          />
          {errors.affiliateLink && <div style={errorStyle}>{errors.affiliateLink}</div>}
        </div>

        {/* Image Upload */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={formLabelStyle}>Product Image</label>
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1 }}>
              <ImageUploadWidget
                onSuccess={handleImageUploaded}
                maxSize={5}
                preview={uploaded || form.image}
              />
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 8,
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                fontSize: '2rem',
                flexShrink: 0,
              }}
            >
              {uploaded ? (
                uploaded.startsWith('http') ? (
                  <img
                    src={uploaded}
                    alt="preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 6,
                    }}
                  />
                ) : (
                  uploaded
                )
              ) : (
                form.image
              )}
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
            id="visible_toggle"
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <label htmlFor="visible_toggle" style={{ fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
            Visible to users
          </label>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            padding: '10px 16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            color: '#475569',
            opacity: loading ? 0.6 : 1,
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 16px',
            background: '#0a2342',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? '⏳ Saving...' : product ? '💾 Update' : '➕ Add'}
        </button>
      </div>
    </form>
  )
}

export default function ProductsManager() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAffiliateProducts()
      setProducts(data)
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleSaveProduct = async () => {
    await loadProducts()
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteAffiliateProductDB(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return products.filter((p) => {
      const matchCat = filter === 'all' || p.category === filter
      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [filter, products, search])

  const counts = useMemo(
    () => products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {}),
    [products]
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: 4 }}>
          🛍️ Affiliate Products
        </div>
        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Manage affiliate products for your store. Total: {products.length}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingProduct(null)
          }}
          disabled={showForm}
          style={{
            padding: '10px 16px',
            background: showForm ? '#0a2342' : '#1565c0',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: showForm ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
          }}
        >
          ➕ Add Product
        </button>
        <button
          onClick={loadProducts}
          disabled={loading}
          style={{
            padding: '10px 16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            color: '#475569',
            opacity: loading ? 0.6 : 1,
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Form */}
      {showForm || editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      ) : null}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            background: filter === 'all' ? '#0a2342' : '#f1f5f9',
            color: filter === 'all' ? '#fff' : '#475569',
            border: 'none',
            padding: '7px 14px',
            borderRadius: 8,
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🗂️ All ({products.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            style={{
              background: filter === c.id ? '#0a2342' : '#f1f5f9',
              color: filter === c.id ? '#fff' : '#475569',
              border: 'none',
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {c.label} ({counts[c.id] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          border: '1.5px solid #e2e8f0',
          borderRadius: 10,
          padding: '8px 12px',
          marginBottom: 16,
        }}
      >
        <span>🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.9rem',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Products list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⏳</div>
          <div>Products load ho rahe hain...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#94a3b8',
            background: '#f8fafc',
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
          <div style={{ fontWeight: 700 }}>Koi product nahi</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                border: '1.5px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 8,
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                }}
              >
                {product.image?.startsWith('http') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  product.image || '🛍️'
                )}
              </div>

              {/* Info */}
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>
                  {product.name}
                  {!product.visible && (
                    <span
                      style={{
                        marginLeft: '8px',
                        fontSize: '0.7rem',
                        background: '#fef2f2',
                        color: '#dc2626',
                        padding: '2px 8px',
                        borderRadius: 4,
                      }}
                    >
                      Hidden
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 4 }}>
                  {product.price} • {product.category} {product.badge && `• ${product.badge}`}
                </div>
                {product.description && (
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {product.description.substring(0, 60)}...
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => {
                    setEditingProduct(product)
                    setShowForm(true)
                  }}
                  style={{
                    padding: '6px 12px',
                    background: '#dbeafe',
                    color: '#1e40af',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(product.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#fee2e2',
                    color: '#991b1b',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              maxWidth: 320,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 12, color: '#0f172a' }}>
              ⚠️ Delete Product?
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 20 }}>
              Ye product delete ho jaayega. Is action ko undo nahi kar sakte.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '8px 16px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                style={{
                  padding: '8px 16px',
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Shared styles ──────────────────────────────────────
const formLabelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#475569',
  marginBottom: 6,
}

const formInputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1.5px solid #e2e8f0',
  borderRadius: 8,
  fontSize: '0.85rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

const errorStyle = {
  fontSize: '0.75rem',
  color: '#dc2626',
  marginTop: 4,
  fontWeight: 600,
}

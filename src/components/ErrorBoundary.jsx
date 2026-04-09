import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production, send to logging service
    if (import.meta.env.PROD) {
      // GA4 error tracking
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'exception', {
          description: error?.message || 'Unknown error',
          fatal: false,
        })
      }
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        textAlign: 'center',
        background: '#f8f9fa',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>⚠️</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>
          Kuch Galat Ho Gaya
        </h1>
        <p style={{ color: '#64748b', marginBottom: 24, maxWidth: 360, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Page load karne mein problem aayi. Internet check karo ya page reload karo.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px', background: '#0f8a1f', color: '#fff',
              border: 'none', borderRadius: 12, fontWeight: 800,
              fontSize: '0.9rem', cursor: 'pointer',
            }}>
            🔄 Reload Karo
          </button>
          <button
            onClick={() => { window.location.href = '/' }}
            style={{
              padding: '12px 24px', background: '#f1f5f9', color: '#475569',
              border: '1.5px solid #e2e8f0', borderRadius: 12, fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer',
            }}>
            🏠 Home Pe Jao
          </button>
        </div>
        {import.meta.env.DEV && this.state.error && (
          <details style={{ marginTop: 24, textAlign: 'left', maxWidth: 600 }}>
            <summary style={{ cursor: 'pointer', color: '#dc2626', fontWeight: 700, fontSize: '0.82rem' }}>
              🐛 Error Details (Dev only)
            </summary>
            <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, marginTop: 8, fontSize: '0.72rem', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
        )}
      </div>
    )
  }
}

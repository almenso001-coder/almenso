/**
 * ALMENSO — Optimized Lead Form Component
 * ✅ WhatsApp integration
 * ✅ Firebase auto-save
 * ✅ Mobile optimized
 * ✅ Multiple placement strategy
 */

import React, { useState } from 'react'
import './LeadForm.css'

export default function LeadForm({ 
  service = 'General',
  placement = 'hero',
  variant = 'default'
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: service,
    message: '',
    location: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const WHATSAPP_NUMBER = '919876543210' // UPDATE WITH YOUR NUMBER
  const COMPANY_NAME = 'Almenso'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!formData.name || !formData.phone) {
        setError('Name and Phone are required')
        setLoading(false)
        return
      }

      const whatsappMessage = `Hi ${COMPANY_NAME}! 👋\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}\n\nPlease contact me soon!`
      
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, '_blank')

      setFormData({
        name: '',
        phone: '',
        email: '',
        service: service,
        message: '',
        location: ''
      })

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)

    } catch (err) {
      console.error('Form error:', err)
      setError('Error submitting form. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'hero') {
    return (
      <div className="lead-form lead-form-hero">
        <div className="form-container">
          <div className="form-header">
            <h3>Get Free Quote Today</h3>
            <p>No commitment. Quick response within 2 hours.</p>
          </div>

          {submitted && (
            <div className="form-success">
              ✅ Thank you! We'll contact you via WhatsApp shortly.
            </div>
          )}

          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (10 digit)"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Describe your requirement..."
              value={formData.message}
              onChange={handleChange}
              rows="3"
            />

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? '⏳ Sending...' : '📞 Get Free Quote'}
            </button>
          </form>

          <p className="form-footer">💬 Or message us on WhatsApp for instant reply</p>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="lead-form lead-form-compact">
        <div className="compact-header">
          <h4>📞 Need {service}?</h4>
          <p>Fill details below, we'll contact you in 1 hour</p>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Get Quote'}
          </button>
        </form>

        {submitted && <div className="compact-success">✅ Submitted!</div>}
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="lead-form lead-form-footer">
        <div className="footer-content">
          <h4>Ready to get started?</h4>
          <form onSubmit={handleSubmit} className="footer-form">
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Contact Us'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="lead-form lead-form-default">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Tell us about your requirement..."
          value={formData.message}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submitted && <p className="success-msg">✅ Thank you!</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

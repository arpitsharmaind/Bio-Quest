import { useEffect, useState } from 'react'
import api from '../api/client'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

// Fallback values used until settings load (and if the API is unreachable).
const DEFAULTS = {
  contact_tag: 'Get In Touch',
  contact_title: 'Contact Us',
  contact_subtitle:
    "Have a question or want to work together? We'd love to hear from you.",
  contact_office_title: 'Our Office',
  contact_office_text: 'A-902, RIICO Industrial Area,\nBhiwadi, Rajasthan 301019, India',
  contact_phone_title: 'Call Us',
  contact_phone_text: '+91-1493-234 100\n+91-1493-234 200',
  contact_email_title: 'Email Us',
  contact_email_text: 'info@titanbiotech.com\nsales@titanbiotech.com',
  contact_hours_title: 'Working Hours',
  contact_hours_text: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed',
}

// Render text so newlines become line breaks.
const multiline = { whiteSpace: 'pre-line' }

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text }
  const [submitting, setSubmitting] = useState(false)
  const [settings, setSettings] = useState(DEFAULTS)

  useEffect(() => {
    let active = true
    api
      .get('/settings')
      .then((res) => {
        if (active) setSettings({ ...DEFAULTS, ...res.data })
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const t = (key) => settings[key] ?? DEFAULTS[key]

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await api.post('/contact', form)
      setStatus({ type: 'success', text: res.data.message })
      setForm(EMPTY)
    } catch (err) {
      const text =
        err.response?.data?.message ||
        'Something went wrong. Please try again later.'
      setStatus({ type: 'error', text })
    } finally {
      setSubmitting(false)
    }
  }

  const cards = [
    {
      icon: 'fa-location-dot',
      title: t('contact_office_title'),
      text: t('contact_office_text'),
    },
    {
      icon: 'fa-phone',
      title: t('contact_phone_title'),
      text: t('contact_phone_text'),
    },
    {
      icon: 'fa-envelope',
      title: t('contact_email_title'),
      text: t('contact_email_text'),
    },
    {
      icon: 'fa-clock',
      title: t('contact_hours_title'),
      text: t('contact_hours_text'),
    },
  ]

  return (
    <section id="contactUs" className="sectionpanel contact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t('contact_tag')}</span>
          <h2 className="section-title">{t('contact_title')}</h2>
          <p className="section-subtitle">{t('contact_subtitle')}</p>
        </div>
        <div className="row g-4 mt-2">
          <div className="col-lg-5">
            <div className="contact-info-wrap">
              {cards.map((card) => (
                <div className="contact-card" key={card.icon}>
                  <div className="contact-card-icon">
                    <i className={`fa-solid ${card.icon}`}></i>
                  </div>
                  <div>
                    <h5>{card.title}</h5>
                    <p style={multiline}>{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form-wrap">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {status && (
                    <div className="col-12">
                      <div className={`form-alert ${status.type}`}>
                        {status.text}
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-select"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option>Product Inquiry</option>
                      <option>Partnership</option>
                      <option>Career</option>
                      <option>General Query</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-submit"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending…' : 'Send Message'}{' '}
                      <i className="fa-solid fa-paper-plane ms-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

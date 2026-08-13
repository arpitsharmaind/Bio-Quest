import { useEffect, useState } from 'react'
import api from '../../api/client'

// Fields shown in the editor, in display order.
const FIELDS = [
  { key: 'contact_tag', label: 'Section Tag', type: 'text' },
  { key: 'contact_title', label: 'Section Title', type: 'text' },
  { key: 'contact_subtitle', label: 'Section Subtitle', type: 'textarea' },
  { key: 'contact_office_title', label: 'Office — Title', type: 'text' },
  { key: 'contact_office_text', label: 'Office — Address', type: 'textarea' },
  { key: 'contact_phone_title', label: 'Phone — Title', type: 'text' },
  { key: 'contact_phone_text', label: 'Phone — Numbers', type: 'textarea' },
  { key: 'contact_email_title', label: 'Email — Title', type: 'text' },
  { key: 'contact_email_text', label: 'Email — Addresses', type: 'textarea' },
  { key: 'contact_hours_title', label: 'Working Hours — Title', type: 'text' },
  { key: 'contact_hours_text', label: 'Working Hours — Text', type: 'textarea' },
]

export default function ContactInfoAdmin() {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null) // { type, text }

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => {
        const picked = {}
        FIELDS.forEach((f) => {
          picked[f.key] = res.data[f.key] ?? ''
        })
        setValues(picked)
      })
      .catch(() => setStatus({ type: 'error', text: 'Failed to load settings.' }))
      .finally(() => setLoading(false))
  }, [])

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      await api.put('/admin/settings', { settings: values })
      setStatus({ type: 'success', text: 'Contact details saved.' })
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.response?.data?.message || 'Save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-muted">Loading…</p>
  }

  return (
    <div>
      <h5 className="mb-3">Contact Info</h5>
      <p className="text-muted small mb-3">
        Edit the &ldquo;Contact Us&rdquo; section shown on the home page. For
        multi-line fields (address, phone numbers, emails), press Enter for a new
        line.
      </p>

      <div className="admin-card p-4" style={{ maxWidth: 720 }}>
        {status && (
          <div className={`form-alert ${status.type} mb-3`}>{status.text}</div>
        )}
        <form onSubmit={save}>
          {FIELDS.map((field) => (
            <div className="mb-3" key={field.key}>
              <label className="form-label">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="form-control"
                  rows={2}
                  value={values[field.key] || ''}
                  onChange={(e) => update(field.key, e.target.value)}
                ></textarea>
              ) : (
                <input
                  className="form-control"
                  value={values[field.key] || ''}
                  onChange={(e) => update(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

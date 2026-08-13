import { useEffect, useRef, useState } from 'react'
import api from '../../api/client'

const EMPTY = {
  title: '',
  subtitle: '',
  button_text: '',
  button_link: '',
  is_active: true,
  sort_order: 0,
}

export default function SlidesAdmin() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = closed
  const [form, setForm] = useState(EMPTY)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  function load() {
    setLoading(true)
    api
      .get('/admin/slides')
      .then((res) => setSlides(res.data))
      .catch(() => setError('Failed to load slides.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setForm(EMPTY)
    setImageFile(null)
    setPreview(null)
    setEditing({ id: null, currentImage: null })
    setError(null)
  }

  function openEdit(slide) {
    setForm({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      button_text: slide.button_text || '',
      button_link: slide.button_link || '',
      is_active: slide.is_active,
      sort_order: slide.sort_order,
    })
    setImageFile(null)
    setPreview(null)
    setEditing({ id: slide.id, currentImage: slide.image_url })
    setError(null)
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function onPickFile(e) {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    if (!editing.id && !imageFile) {
      setError('Please choose an image for the new slide.')
      setSaving(false)
      return
    }

    const fd = new FormData()
    if (imageFile) fd.append('image', imageFile)
    fd.append('title', form.title)
    fd.append('subtitle', form.subtitle)
    fd.append('button_text', form.button_text)
    fd.append('button_link', form.button_link)
    fd.append('is_active', form.is_active ? '1' : '0')
    fd.append('sort_order', String(form.sort_order))

    try {
      if (editing.id) {
        await api.post(`/admin/slides/${editing.id}`, fd)
      } else {
        await api.post('/admin/slides', fd)
      }
      setEditing(null)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Check the fields.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(slide) {
    if (!window.confirm(`Delete slide "${slide.title || slide.id}"?`)) return
    await api.delete(`/admin/slides/${slide.id}`)
    load()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Hero Slides ({slides.length})</h5>
        <button className="btn btn-submit btn-sm" onClick={openCreate}>
          <i className="fa-solid fa-plus me-1"></i> Add Slide
        </button>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        {loading ? (
          <p className="p-4 text-muted mb-0">Loading…</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 120 }}>Image</th>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Active</th>
                  <th>Order</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide) => (
                  <tr key={slide.id}>
                    <td>
                      <img
                        src={slide.image_url}
                        alt={slide.title || 'slide'}
                        style={{
                          width: 96,
                          height: 54,
                          objectFit: 'cover',
                          borderRadius: 6,
                        }}
                      />
                    </td>
                    <td>{slide.title || '—'}</td>
                    <td style={{ maxWidth: 240 }}>
                      <span
                        className="d-inline-block text-truncate"
                        style={{ maxWidth: 240 }}
                      >
                        {slide.subtitle || '—'}
                      </span>
                    </td>
                    <td>
                      {slide.is_active ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Hidden</span>
                      )}
                    </td>
                    <td>{slide.sort_order}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => openEdit(slide)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(slide)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {slides.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No slides yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={save}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing.id ? 'Edit Slide' : 'Add Slide'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditing(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  {error && <div className="form-alert error mb-3">{error}</div>}

                  <div className="mb-3">
                    <label className="form-label">
                      Slide Image {editing.id && '(leave empty to keep current)'}
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={onPickFile}
                    />
                    <div className="mt-2">
                      {(preview || editing.currentImage) && (
                        <img
                          src={preview || editing.currentImage}
                          alt="preview"
                          style={{
                            width: '100%',
                            maxHeight: 150,
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      value={form.title}
                      onChange={(e) => update('title', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subtitle</label>
                    <input
                      className="form-control"
                      value={form.subtitle}
                      onChange={(e) => update('subtitle', e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Button Text</label>
                      <input
                        className="form-control"
                        value={form.button_text}
                        onChange={(e) => update('button_text', e.target.value)}
                        placeholder="Explore Products"
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Button Link</label>
                      <input
                        className="form-control"
                        value={form.button_link}
                        onChange={(e) => update('button_link', e.target.value)}
                        placeholder="#products"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Sort Order</label>
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        value={form.sort_order}
                        onChange={(e) =>
                          update('sort_order', Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-6 mb-3 d-flex align-items-end">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="slideActive"
                          checked={form.is_active}
                          onChange={(e) => update('is_active', e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="slideActive"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-submit"
                    disabled={saving}
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

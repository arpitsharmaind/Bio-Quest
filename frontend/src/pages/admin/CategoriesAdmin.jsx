import { useEffect, useState } from 'react'
import api from '../../api/client'

const EMPTY = {
  title: '',
  image_url: '',
  description: '',
  body: '',
  is_active: true,
  sort_order: 0,
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    setLoading(true)
    api
      .get('/admin/categories')
      .then((res) => setCategories(res.data))
      .catch(() => setError('Failed to load categories.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setForm(EMPTY)
    setEditing({ id: null })
    setError(null)
  }

  function openEdit(category) {
    setForm({
      title: category.title,
      image_url: category.image_url,
      description: category.description || '',
      body: category.body || '',
      is_active: category.is_active,
      sort_order: category.sort_order,
    })
    setEditing({ id: category.id })
    setError(null)
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editing.id) {
        await api.put(`/admin/categories/${editing.id}`, form)
      } else {
        await api.post('/admin/categories', form)
      }
      setEditing(null)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Check the fields.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(category) {
    if (
      !window.confirm(
        `Delete "${category.title}"? Products in it will be unassigned.`,
      )
    )
      return
    await api.delete(`/admin/categories/${category.id}`)
    load()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Categories ({categories.length})</h5>
        <button className="btn btn-submit btn-sm" onClick={openCreate}>
          <i className="fa-solid fa-plus me-1"></i> Add Category
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
                  <th style={{ width: 70 }}>Image</th>
                  <th>Title</th>
                  <th>Products</th>
                  <th>Active</th>
                  <th>Order</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <img
                        src={category.image_url}
                        alt={category.title}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    </td>
                    <td>{category.title}</td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {category.products_count ?? 0}
                      </span>
                    </td>
                    <td>
                      {category.is_active ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Hidden</span>
                      )}
                    </td>
                    <td>{category.sort_order}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => openEdit(category)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(category)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No categories yet.
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
                    {editing.id ? 'Edit Category' : 'Add Category'}
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
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      value={form.title}
                      onChange={(e) => update('title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Banner Image URL</label>
                    <input
                      className="form-control"
                      value={form.image_url}
                      onChange={(e) => update('image_url', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Short Description (shown under the title)
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Page Content (main body text)
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      value={form.body}
                      onChange={(e) => update('body', e.target.value)}
                    ></textarea>
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
                          id="catActive"
                          checked={form.is_active}
                          onChange={(e) => update('is_active', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="catActive">
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

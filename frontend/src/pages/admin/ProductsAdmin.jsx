import { useEffect, useState } from 'react'
import api from '../../api/client'

const EMPTY = {
  category_id: '',
  title: '',
  image_url: '',
  description: '',
  is_active: true,
  sort_order: 0,
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = closed
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    setLoading(true)
    Promise.all([api.get('/admin/products'), api.get('/admin/categories')])
      .then(([prods, cats]) => {
        setProducts(prods.data)
        setCategories(cats.data)
      })
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setForm({ ...EMPTY, category_id: categories[0]?.id ?? '' })
    setEditing({ id: null })
    setError(null)
  }

  function openEdit(product) {
    setForm({
      category_id: product.category_id ?? '',
      title: product.title,
      image_url: product.image_url,
      description: product.description || '',
      is_active: product.is_active,
      sort_order: product.sort_order,
    })
    setEditing({ id: product.id })
    setError(null)
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      category_id: form.category_id === '' ? null : Number(form.category_id),
    }
    try {
      if (editing.id) {
        await api.put(`/admin/products/${editing.id}`, payload)
      } else {
        await api.post('/admin/products', payload)
      }
      setEditing(null)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Check the fields.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(product) {
    if (!window.confirm(`Delete "${product.title}"?`)) return
    await api.delete(`/admin/products/${product.id}`)
    load()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Products ({products.length})</h5>
        <button
          className="btn btn-submit btn-sm"
          onClick={openCreate}
          disabled={categories.length === 0}
          title={
            categories.length === 0
              ? 'Create a category first'
              : 'Add a product'
          }
        >
          <i className="fa-solid fa-plus me-1"></i> Add Product
        </button>
      </div>

      {categories.length === 0 && !loading && (
        <div className="form-alert error mb-3">
          You need at least one category before adding products.
        </div>
      )}

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
                  <th>Category</th>
                  <th>Active</th>
                  <th>Order</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image_url}
                        alt={product.title}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>
                      {product.category ? (
                        <span className="badge bg-light text-dark">
                          {product.category.title}
                        </span>
                      ) : (
                        <span className="text-muted small">—</span>
                      )}
                    </td>
                    <td>
                      {product.is_active ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Hidden</span>
                      )}
                    </td>
                    <td>{product.sort_order}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => openEdit(product)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(product)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No products yet.
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
                    {editing.id ? 'Edit Product' : 'Add Product'}
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
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={form.category_id}
                      onChange={(e) => update('category_id', e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    <label className="form-label">Image URL</label>
                    <input
                      className="form-control"
                      value={form.image_url}
                      onChange={(e) => update('image_url', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
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
                          id="prodActive"
                          checked={form.is_active}
                          onChange={(e) => update('is_active', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="prodActive">
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

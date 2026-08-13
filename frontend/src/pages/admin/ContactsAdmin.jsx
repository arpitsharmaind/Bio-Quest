import { useEffect, useState } from 'react'
import api from '../../api/client'

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    api
      .get('/admin/contacts')
      .then((res) => setContacts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function markRead(contact) {
    await api.patch(`/admin/contacts/${contact.id}/read`)
    load()
  }

  async function remove(contact) {
    if (!window.confirm('Delete this submission?')) return
    await api.delete(`/admin/contacts/${contact.id}`)
    load()
  }

  return (
    <div>
      <h5 className="mb-3">Contact Submissions ({contacts.length})</h5>
      <div className="admin-card p-0 overflow-hidden">
        {loading ? (
          <p className="p-4 text-muted mb-0">Loading…</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th style={{ width: 150 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={contact.is_read ? '' : 'table-warning'}
                  >
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.subject || '—'}</td>
                    <td style={{ maxWidth: 260 }}>
                      <span className="d-inline-block text-truncate" style={{ maxWidth: 260 }}>
                        {contact.message || '—'}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(contact.created_at).toLocaleString()}
                    </td>
                    <td>
                      {!contact.is_read && (
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => markRead(contact)}
                          title="Mark as read"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(contact)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

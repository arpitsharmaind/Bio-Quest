import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'

export default function Dashboard() {
  const [stats, setStats] = useState({
    slides: 0,
    categories: 0,
    products: 0,
    contacts: 0,
    unread: 0,
  })

  useEffect(() => {
    Promise.all([
      api.get('/admin/slides'),
      api.get('/admin/categories'),
      api.get('/admin/products'),
      api.get('/admin/contacts'),
    ])
      .then(([slides, categories, products, contacts]) => {
        setStats({
          slides: slides.data.length,
          categories: categories.data.length,
          products: products.data.length,
          contacts: contacts.data.length,
          unread: contacts.data.filter((c) => !c.is_read).length,
        })
      })
      .catch(() => {})
  }, [])

  const cards = [
    {
      label: 'Hero Slides',
      value: stats.slides,
      icon: 'fa-images',
      to: '/admin/slides',
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: 'fa-layer-group',
      to: '/admin/categories',
    },
    {
      label: 'Products',
      value: stats.products,
      icon: 'fa-box',
      to: '/admin/products',
    },
    {
      label: 'Contact Submissions',
      value: stats.contacts,
      icon: 'fa-envelope',
      to: '/admin/contacts',
    },
    {
      label: 'Unread Messages',
      value: stats.unread,
      icon: 'fa-envelope-open-text',
      to: '/admin/contacts',
    },
  ]

  return (
    <div>
      <div className="row g-4">
        {cards.map((card) => (
          <div className="col-md-4" key={card.label}>
            <Link to={card.to} className="text-decoration-none">
              <div className="admin-card p-4 d-flex align-items-center gap-3">
                <span
                  className="contact-card-icon"
                  style={{ width: 56, height: 56, minWidth: 56 }}
                >
                  <i className={`fa-solid ${card.icon}`}></i>
                </span>
                <div>
                  <div className="h3 mb-0">{card.value}</div>
                  <div className="text-muted small">{card.label}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

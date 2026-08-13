import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    window.scrollTo(0, 0)

    api
      .get(`/categories/${slug}`)
      .then((res) => {
        if (active) setCategory(res.data)
      })
      .catch((err) => {
        if (active && err.response?.status === 404) setNotFound(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  return (
    <div id="wrapper">
      <span id="top"></span>
      <Navbar />

      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '60vh' }}
        >
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}

      {!loading && notFound && (
        <div className="container text-center" style={{ padding: '160px 0 100px' }}>
          <h2>Category not found</h2>
          <p className="text-muted">
            The category you are looking for doesn’t exist or is unavailable.
          </p>
          <Link to="/" className="btn btn-submit mt-2">
            Back to Home
          </Link>
        </div>
      )}

      {!loading && category && (
        <>
          {/* Banner */}
          <section
            className="category-banner"
            style={{ backgroundImage: `url(${category.image_url})` }}
          >
            <div className="category-banner-overlay"></div>
            <div className="container category-banner-content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb category-breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {category.title}
                  </li>
                </ol>
              </nav>
              <h1>{category.title}</h1>
              {category.description && <p>{category.description}</p>}
            </div>
          </section>

          {/* Body content */}
          {category.body && (
            <section className="sectionpanel">
              <div className="container">
                <p className="category-body">{category.body}</p>
              </div>
            </section>
          )}

          {/* Products */}
          <section className="sectionpanel category-products">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-tag">Products</span>
                <h2 className="section-title">In this category</h2>
              </div>

              {category.products.length === 0 ? (
                <p className="text-center text-muted py-4">
                  Products for this category are coming soon.
                </p>
              ) : (
                <div className="row g-4 mt-1">
                  {category.products.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                      <div className="product-card h-100">
                        <div className="product-card-img">
                          <img src={product.image_url} alt={product.title} />
                        </div>
                        <div className="product-card-body">
                          <h5>{product.title}</h5>
                          {product.description && <p>{product.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}

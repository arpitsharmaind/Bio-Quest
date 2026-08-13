import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

export default function HomeCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    api
      .get('/categories')
      .then((res) => {
        if (active) setCategories(res.data)
      })
      .catch(() => {
        if (active) setError('Unable to load categories right now.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="products" className="sectionpanel HomeProduct">
      <div className="container-fluid">
        {loading && (
          <p className="text-center py-5 text-muted">Loading categories…</p>
        )}
        {error && <p className="text-center py-5 text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="row listHomeProd">
            {categories.map((category) => (
              <li className="col-lg-6 col-md-6 col-sm-12" key={category.id}>
                <div className="listPanel">
                  <img
                    src={category.image_url}
                    className="img-fluid"
                    alt={category.title}
                  />
                  <div className="overlay">
                    <div className="contDiv">
                      <h3 className="title">{category.title}</h3>
                      <Link
                        to={`/category/${category.slug}`}
                        className="btn btn-outline-default dss"
                      >
                        {' '}
                        Learn More!
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-body">
      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-2 col-md-3 admin-sidebar">
            <a href="/" className="footer-logo d-flex align-items-center gap-2 mb-4 text-decoration-none">
              <span className="logo-icon">
                <i className="fa-solid fa-leaf"></i>
              </span>
              <span className="logo-text" style={{ color: '#fff' }}>
                Bio<span style={{ color: '#66bb6a' }}>Quest</span>
              </span>
            </a>
            <nav>
              <NavLink to="/admin" end className="admin-nav-link">
                <i className="fa-solid fa-gauge"></i> Dashboard
              </NavLink>
              <NavLink to="/admin/slides" className="admin-nav-link">
                <i className="fa-solid fa-images"></i> Hero Slides
              </NavLink>
              <NavLink to="/admin/categories" className="admin-nav-link">
                <i className="fa-solid fa-layer-group"></i> Categories
              </NavLink>
              <NavLink to="/admin/products" className="admin-nav-link">
                <i className="fa-solid fa-box"></i> Products
              </NavLink>
              <NavLink to="/admin/contact-info" className="admin-nav-link">
                <i className="fa-solid fa-address-card"></i> Contact Info
              </NavLink>
              <NavLink to="/admin/contacts" className="admin-nav-link">
                <i className="fa-solid fa-envelope"></i> Contact Submissions
              </NavLink>
              <a href="/" className="admin-nav-link">
                <i className="fa-solid fa-globe"></i> View Site
              </a>
            </nav>
          </aside>

          <main className="col-lg-10 col-md-9 admin-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Admin Panel</h4>
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  {user?.name} ({user?.email})
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
                </button>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

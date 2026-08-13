import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Events', href: '#' },
  { label: 'Investor', href: '#' },
  { label: 'Enquiry', href: '#contactUs' },
  { label: 'Contact Us', href: '#contactUs' },
  { label: 'Blogs', href: '#' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="header">
      <nav
        className={`navbar navbar-expand-lg menubar fixed-top${
          scrolled ? ' scrolled' : ''
        }`}
      >
        <div className="container">
          <a className="navbar-brand logo" href="#top">
            <span className="logo-icon">
              <i className="fa-solid fa-leaf"></i>
            </span>
            <span className="logo-text">
              Bio<span className="logo-highlight">Quest</span>
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mainNav">
            <ul className="navbar-nav align-items-center">
              {NAV_ITEMS.map((item, i) => (
                <li className="nav-item" key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link${i === 0 ? ' active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="nav-item ms-lg-3">
                <button className="btn search-btn" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </li>
              <li className="nav-item ms-lg-2">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

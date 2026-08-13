import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    // Newsletter storage is not part of the current backend scope;
    // acknowledge the signup client-side.
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <a href="#top" className="footer-logo">
                  <span className="logo-icon">
                    <i className="fa-solid fa-leaf"></i>
                  </span>
                  <span className="logo-text">
                    Bio<span className="logo-highlight">Quest</span>
                  </span>
                </a>
                <p className="footer-about">
                  Leading manufacturer and exporter of high-quality biological
                  products, serving the global scientific community since 1992.
                </p>
                <div className="footer-socials">
                  <a href="#" aria-label="Facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" aria-label="YouTube">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="#top">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Blogs</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-heading">Our Products</h5>
              <ul className="footer-links">
                <li><a href="#products">Food Ingredients</a></li>
                <li><a href="#products">Collagen &amp; Proteins</a></li>
                <li><a href="#products">Pharmaceuticals</a></li>
                <li><a href="#products">Animal Nutrition</a></li>
                <li><a href="#products">Culture Media</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-heading">Newsletter</h5>
              <p className="footer-newsletter-text">
                Stay updated with our latest products and industry news.
              </p>
              <form className="footer-newsletter" onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-newsletter" type="submit">
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
              {subscribed && (
                <p className="footer-newsletter-text mt-2" style={{ color: '#66bb6a' }}>
                  Thanks for subscribing!
                </p>
              )}
              <div className="footer-certifications mt-3">
                <span className="cert-badge">ISO 9001:2015</span>
                <span className="cert-badge">ISO 13485:2016</span>
                <span className="cert-badge">GMP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="footer-copyright">
                &copy; 2026 BioQuest. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="footer-bottom-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

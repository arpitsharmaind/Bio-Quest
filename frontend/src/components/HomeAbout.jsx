import titanInfo from '../assets/titan-info.jpg'

export default function HomeAbout() {
  return (
    <section id="about" className="sectionpanel HomeAbout">
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img src={titanInfo} className="img-fluid" alt="Titan Biotech" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h2>Manufacturing Biological Products Since 1992</h2>
            <p>
              &ldquo;With the remarkable market presence of 30+ years in 100+
              countries worldwide, Titan Biotech aims to push boundaries of
              research and development to deliver the best biological
              products.&rdquo; All the biotechnology products are conducive to
              clinical diagnosis, vaccine production, antibiotics,
              agro-biotechnology, and animal feed.
            </p>
            <p>
              Our products are certified by{' '}
              <b>ISO 13485:2016 &amp; ISO 9001:2015</b>. Titan Biotech Limited is
              GMP facilitated and established to serve the scientific community
              and humanity by providing high-quality biological products.
            </p>
            <p>
              <a href="#products" className="btn btn-outline-default">
                Read More
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

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
            <h2>About Delight Industries & BioQuest</h2>
            <p>Established in 2024, Delight Industries is an ISO 9001, CE, and GMP-certified manufacturer dedicated to delivering world-class industrial and scientific solutions. Under our premier brand, BioQuest, we specialize in high-purity Analytical Reagent (AR) and Laboratory Reagent (LR) grade chemicals, premium borosilicate glassware, and advanced laboratory equipment. From individual precision instruments to complete, turnkey laboratory setups, we provide comprehensive, reliable infrastructure tailored for research, quality control, and industrial testing. Backed by state-of-the-art manufacturing and strict quality compliance, we empower the scientific community to innovate and discover with total confidence.</p>
            <p>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

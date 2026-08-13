import Navbar from '../components/Navbar.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import HomeAbout from '../components/HomeAbout.jsx'
import HomeCategories from '../components/HomeCategories.jsx'
import ContactSection from '../components/ContactSection.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div id="wrapper">
      <span id="top"></span>
      <Navbar />
      <HeroCarousel />
      <HomeAbout />
      <HomeCategories />
      <ContactSection />
      <Footer />
    </div>
  )
}

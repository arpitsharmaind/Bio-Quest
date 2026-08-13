import { useEffect, useRef, useState } from 'react'
import { Carousel } from 'bootstrap'
import api from '../api/client'

export default function HeroCarousel() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef(null)

  useEffect(() => {
    let active = true
    api
      .get('/slides')
      .then((res) => {
        if (active) setSlides(res.data)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // (Re)initialise the Bootstrap carousel once slides are rendered.
  useEffect(() => {
    if (!slides.length || !carouselRef.current) return
    const instance = Carousel.getOrCreateInstance(carouselRef.current, {
      interval: 4000,
      ride: 'carousel',
    })
    return () => instance.dispose()
  }, [slides])

  if (loading) {
    return (
      <section id="heroSlider">
        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: 550 }}
        >
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      </section>
    )
  }

  if (!slides.length) {
    return null
  }

  return (
    <section id="heroSlider">
      <div id="heroCarousel" className="carousel slide" ref={carouselRef}>
        <div className="carousel-indicators">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`carousel-item${i === 0 ? ' active' : ''}`}
            >
              <div className="slider-overlay"></div>
              <img
                src={slide.image_url}
                className="d-block w-100 slider-img"
                alt={slide.title || 'Slide'}
              />
              <div className="carousel-caption">
                {slide.title && <h1>{slide.title}</h1>}
                {slide.subtitle && <p>{slide.subtitle}</p>}
                {slide.button_text && (
                  <a
                    href={slide.button_link || '#'}
                    className="btn btn-warning btn-lg"
                  >
                    {slide.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

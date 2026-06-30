import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroCarousel({ hero }) {
  const slides = hero?.slides?.length ? hero.slides : []
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const autoplay = hero?.autoplay !== false
  const interval = (hero?.intervalSeconds || 6) * 1000

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [autoplay, interval, slides.length])

  const goTo = (i) => {
    clearInterval(timerRef.current)
    setActive(i)
  }
  const prev = () => goTo((active - 1 + slides.length) % slides.length)
  const next = () => goTo((active + 1) % slides.length)

  if (slides.length === 0) return null

  const slide = slides[active]
  const heroLines = (slide.title || '').split('\n')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id || i}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          style={{ backgroundImage: `url(${s.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-forest/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-forest/20 to-forest/85" />
        </div>
      ))}

      {/* Content */}
      <div key={active} className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 pt-20 animate-fade-up">
        <p className="font-accent text-sage text-lg tracking-wide">
          Welcome to Verdant Space
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-white leading-tight">
          {heroLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>
        <p className="font-sans text-warm-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {slide.tagline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/blog" className="btn-primary">
            Explore the Blog <ArrowRight size={16} />
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 border border-warm-white/40 text-warm-white px-6 py-3 rounded-sm font-sans font-medium text-sm tracking-wide hover:bg-warm-white/10 transition-all duration-300"
          >
            View Pictorial
          </Link>
        </div>
      </div>

      {/* Carousel controls — only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-warm-white/10 hover:bg-warm-white/20 items-center justify-center text-warm-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-warm-white/10 hover:bg-warm-white/20 items-center justify-center text-warm-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-sage' : 'w-1.5 bg-warm-white/40 hover:bg-warm-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={24} className="text-warm-white/40" />
      </div>
    </section>
  )
}

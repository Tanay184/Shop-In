import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    headline: 'Best Deals of the Season',
    sub: 'Up to 70% off on Electronics, Fashion & More',
    cta: 'Shop Now',
    ctaLink: '/products?featured=true',
    gradient: 'from-blue-900 via-indigo-900 to-purple-900',
    accent: 'from-amber-400 to-orange-500',
    emoji: '⚡',
    pattern: 'electronics',
  },
  {
    id: 2,
    headline: 'New Arrivals Just Dropped',
    sub: 'Latest gadgets, fashion & home essentials',
    cta: 'Explore New',
    ctaLink: '/products?sort=newest',
    gradient: 'from-emerald-900 via-teal-900 to-cyan-900',
    accent: 'from-emerald-400 to-teal-400',
    emoji: '✨',
    pattern: 'new',
  },
  {
    id: 3,
    headline: 'Premium Fashion Picks',
    sub: 'Curated collections from top brands',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=Fashion',
    gradient: 'from-rose-900 via-pink-900 to-fuchsia-900',
    accent: 'from-rose-400 to-pink-500',
    emoji: '👗',
    pattern: 'fashion',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = (idx) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => { setCurrent(idx); setTransitioning(false) }, 300)
  }

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((current + 1) % SLIDES.length)

  // Auto-advance every 5s
  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [current])

  const slide = SLIDES[current]

  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 h-64 sm:h-80 lg:h-96 shadow-xl">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`} />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute top-8 right-32 w-32 h-32 rounded-full bg-white/5" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-14 transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-4xl mb-3">{slide.emoji}</span>
        <span className={`text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${slide.accent} mb-2`}>
          Shop In Exclusive
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight max-w-lg">
          {slide.headline}
        </h2>
        <p className="text-white/70 text-sm sm:text-base mb-6 max-w-md">{slide.sub}</p>
        <Link
          to={slide.ctaLink}
          className={`btn-primary bg-gradient-to-r ${slide.accent} text-navy-900 font-bold px-8 py-3 text-sm`}
        >
          {slide.cta} →
        </Link>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  )
}

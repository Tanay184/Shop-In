import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Gift } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    headline: 'Summer Sale Spectacular',
    sub: 'Up to 70% off on Electronics, Fashion & More',
    cta: 'Shop Now',
    ctaLink: '/products?featured=true',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    overlay: 'from-black/40 via-black/20 to-transparent',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    headline: 'New Arrivals Just Dropped',
    sub: 'Latest gadgets, fashion & home essentials waiting for you',
    cta: 'Explore New',
    ctaLink: '/products?sort=newest',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    overlay: 'from-black/40 via-black/20 to-transparent',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    headline: 'Premium Fashion Collection',
    sub: 'Curated styles from top brands, delivered to your door',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=Fashion',
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
    overlay: 'from-black/40 via-black/20 to-transparent',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = (idx) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(idx)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((current + 1) % SLIDES.length)

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [current])

  const slide = SLIDES[current]
  const Icon = slide.icon

  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl group">
      {/* Aspect ratio container */}
      <div className="relative w-full" style={{ paddingBottom: '42%', minHeight: '320px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.headline}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} mix-blend-multiply opacity-70`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className={`absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-12 lg:px-16 transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          {/* Icon badge */}
          <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <Icon size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Exclusive Offer
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight max-w-2xl drop-shadow-2xl">
            {slide.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-white/95 text-base sm:text-lg lg:text-xl mb-8 max-w-xl font-medium drop-shadow-lg">
            {slide.sub}
          </p>

          {/* CTA Button */}
          <Link
            to={slide.ctaLink}
            className="group/cta inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-white hover:bg-amber-400 text-neutral-900 font-bold text-base
              shadow-2xl hover:shadow-amber-500/50
              transform hover:scale-105 hover:-translate-y-1 active:scale-100
              transition-all duration-200"
          >
            <span>{slide.cta}</span>
            <svg className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-white/20 backdrop-blur-md border border-white/30
            text-white hover:bg-white/30 hover:scale-110
            flex items-center justify-center
            transition-all duration-200 opacity-0 group-hover:opacity-100
            focus-visible:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-white/20 backdrop-blur-md border border-white/30
            text-white hover:bg-white/30 hover:scale-110
            flex items-center justify-center
            transition-all duration-200 opacity-0 group-hover:opacity-100
            focus-visible:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current 
                  ? 'w-8 h-2.5 bg-white shadow-lg' 
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

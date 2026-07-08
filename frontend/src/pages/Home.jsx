import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Star, TrendingUp, Zap, Shield, RefreshCw, Headphones } from 'lucide-react'
import api from '../api/client'
import HeroCarousel from '../components/HeroCarousel'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard'

const FEATURES = [
  { icon: Zap,        title: 'Lightning Fast',     desc: 'Same-day delivery in 50+ cities' },
  { icon: Shield,     title: 'Secure Payments',    desc: '100% buyer protection guaranteed' },
  { icon: RefreshCw,  title: 'Easy Returns',       desc: '30-day hassle-free returns' },
  { icon: Headphones, title: '24/7 Support',       desc: 'Always here when you need us' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [deals, setDeals]       = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [fRes, dRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/products?sort=popular&per_page=8'),
        ])
        setFeatured(fRes.data.products)
        setDeals(dRes.data.products)
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    load()
    document.title = 'Shop In – India\'s Premier Online Store'
  }, [])

  return (
    <main className="page-enter">
      {/* Hero */}
      <HeroCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Explore our wide range of products</p>
            </div>
          </div>
          <CategoryGrid />
        </section>

        {/* Feature tiles */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <f.icon size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-400 leading-tight">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <Star size={22} className="text-amber-400 fill-amber-400" />
                Featured Picks
              </h2>
              <p className="section-subtitle">Handpicked products loved by millions</p>
            </div>
            <Link to="/products?featured=true" className="btn-secondary text-sm py-2 px-4 hidden sm:flex">
              See All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
          <div className="sm:hidden mt-4 text-center">
            <Link to="/products?featured=true" className="btn-secondary text-sm">View All Featured</Link>
          </div>
        </section>

        {/* Deals Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <TrendingUp size={22} className="text-orange-500" />
                Today's Deals
              </h2>
              <p className="section-subtitle">Most popular products at great prices</p>
            </div>
            <Link to="/products?sort=popular" className="btn-secondary text-sm py-2 px-4 hidden sm:flex">
              See All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : deals.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </section>

        {/* CTA Banner */}
        <section>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 to-indigo-900 p-8 sm:p-12 text-white">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Sell on Shop In</h2>
                <p className="text-white/70 text-sm max-w-md">Reach millions of customers. Start your journey with zero listing fees today.</p>
              </div>
              <a href="#" className="btn-primary flex-shrink-0 px-8 py-3 text-base">
                Start Selling →
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

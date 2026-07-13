import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, X, Search, Zap } from 'lucide-react'
import api from '../api/client'
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard'

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'popular',   label: 'Most Popular' },
  { value: 'rating',    label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc',label: 'Price: High to Low' },
]

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Groceries', 'Toys']
const PRICE_RANGES = [
  { label: 'Under ₹500',       min: 0,      max: 500 },
  { label: '₹500 – ₹2,000',   min: 500,    max: 2000 },
  { label: '₹2,000 – ₹10,000',min: 2000,   max: 10000 },
  { label: '₹10,000 – ₹50,000',min: 10000,  max: 50000 },
  { label: 'Above ₹50,000',    min: 50000,  max: undefined },
]

export default function ProductListing() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts]   = useState([])
  const [total, setTotal]         = useState(0)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const category = params.get('category') || ''
  const search   = params.get('search')   || ''
  const sort     = params.get('sort')     || 'newest'
  const featured = params.get('featured') || ''
  const page     = parseInt(params.get('page') || '1')
  const minPrice = params.get('min_price') || ''
  const maxPrice = params.get('max_price') || ''

  const set = (key, val) => {
    const p = new URLSearchParams(params)
    if (val) p.set(key, val); else p.delete(key)
    p.delete('page')
    setParams(p)
  }

  const clearAll = () => setParams({})

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams()
      if (category) p.set('category', category)
      if (search)   p.set('search', search)
      if (sort)     p.set('sort', sort)
      if (featured) p.set('featured', featured)
      if (minPrice) p.set('min_price', minPrice)
      if (maxPrice) p.set('max_price', maxPrice)
      p.set('page', page)
      p.set('per_page', 20)

      const res = await api.get(`/products?${p.toString()}`)
      setProducts(res.data.products)
      setTotal(res.data.total)
      setPages(res.data.pages)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [category, search, sort, featured, page, minPrice, maxPrice])

  useEffect(() => {
    fetchProducts()
    const title = category ? `${category} – Shop In` : search ? `"${search}" – Shop In` : 'All Products – Shop In'
    document.title = title
  }, [fetchProducts])

  const activeFilters = [
    category && { label: category,     clear: () => set('category', '') },
    search   && { label: `"${search}"`,clear: () => set('search', '') },
    featured && { label: 'Featured',   clear: () => set('featured', '') },
    (minPrice || maxPrice) && { label: `₹${minPrice||0} – ${maxPrice ? '₹'+maxPrice : '∞'}`, clear: () => { set('min_price',''); set('max_price','') } },
  ].filter(Boolean)

  const Sidebar = () => (
    <aside className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-sm text-gray-800 mb-3">Department</h3>
        <div className="space-y-1">
          <button onClick={() => set('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => set('category', c)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="font-bold text-sm text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => {
            const active = minPrice == r.min && ((!r.max && !maxPrice) || maxPrice == r.max)
            return (
              <button key={r.label}
                onClick={() => { set('min_price', r.min || ''); set('max_price', r.max || '') }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured */}
      <div className="border-t border-gray-100 pt-5">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={featured === 'true'} onChange={(e) => set('featured', e.target.checked ? 'true' : '')}
            className="w-4 h-4 accent-amber-500 rounded" />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Zap size={13} className="text-amber-500 fill-amber-500" /> Featured Only
          </span>
        </label>
      </div>
    </aside>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 page-enter">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
        <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <ChevronDown size={14} className="-rotate-90" />
        <span className="text-gray-700 font-medium">{category || search ? (category || `Search: ${search}`) : 'All Products'}</span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar – desktop */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Mobile filter toggle */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn-secondary text-sm py-2 px-4">
              <SlidersHorizontal size={14} /> Filters
            </button>

            {/* Result count */}
            <span className="text-sm text-gray-500 flex-1">
              {loading ? '…' : `${total.toLocaleString()} result${total !== 1 ? 's' : ''}`}
              {(category || search) && <span className="ml-1">for <span className="font-semibold text-gray-800">{category || `"${search}"`}</span></span>}
            </span>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => set('sort', e.target.value)}
                className="appearance-none input py-2 pr-8 pl-4 text-sm cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeFilters.map((f) => (
                <span key={f.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                  {f.label}
                  <button onClick={f.clear} className="hover:text-red-600 transition-colors"><X size={12} /></button>
                </span>
              ))}
              <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2">Clear all</button>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search size={56} className="text-gray-200 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters or search terms</p>
              <button onClick={clearAll} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p}
                  onClick={() => { const np = new URLSearchParams(params); np.set('page', p); setParams(np) }}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200
                    ${p === page ? 'bg-amber-400 text-navy-900 shadow-btn' : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 overflow-y-auto p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="btn-icon"><X size={18} /></button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </main>
  )
}

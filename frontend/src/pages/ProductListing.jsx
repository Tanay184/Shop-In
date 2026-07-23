import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, ChevronRight, X, Search, Zap, Filter } from 'lucide-react'
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
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    featured: true,
  })

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

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
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
        >
          <h3 className="filter-section-title mb-0">Department</h3>
          <ChevronRight 
            size={16} 
            className={`text-neutral-500 transition-transform ${expandedSections.category ? 'rotate-90' : ''}`}
          />
        </button>
        
        {expandedSections.category && (
          <div className="p-2">
            <button onClick={() => set('category', '')}
              className={`filter-option ${!category ? 'filter-option-active' : ''}`}>
              All Categories
            </button>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => set('category', c)}
                className={`filter-option ${category === c ? 'filter-option-active' : ''}`}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
        >
          <h3 className="filter-section-title mb-0">Price Range</h3>
          <ChevronRight 
            size={16} 
            className={`text-neutral-500 transition-transform ${expandedSections.price ? 'rotate-90' : ''}`}
          />
        </button>
        
        {expandedSections.price && (
          <div className="p-2">
            {PRICE_RANGES.map((r) => {
              const active = minPrice == r.min && ((!r.max && !maxPrice) || maxPrice == r.max)
              return (
                <button key={r.label}
                  onClick={() => { set('min_price', r.min || ''); set('max_price', r.max || '') }}
                  className={`filter-option ${active ? 'filter-option-active' : ''}`}>
                  {r.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Featured */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <button
          onClick={() => toggleSection('featured')}
          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
        >
          <h3 className="filter-section-title mb-0">Special Offers</h3>
          <ChevronRight 
            size={16} 
            className={`text-neutral-500 transition-transform ${expandedSections.featured ? 'rotate-90' : ''}`}
          />
        </button>
        
        {expandedSections.featured && (
          <div className="p-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={featured === 'true'} 
                onChange={(e) => set('featured', e.target.checked ? 'true' : '')}
                className="checkbox-custom"
              />
              <span className="text-sm font-semibold text-neutral-700 group-hover:text-amber-700 flex items-center gap-2 transition-colors">
                <Zap size={14} className="text-amber-500 fill-amber-500" /> 
                Featured Deals Only
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Clear all button */}
      {activeFilters.length > 0 && (
        <button 
          onClick={clearAll}
          className="w-full py-3 px-4 rounded-xl border-2 border-neutral-200 
            text-sm font-bold text-neutral-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50
            transition-all duration-200"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 page-enter">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
        <Link to="/" className="hover:text-amber-600 transition-colors font-medium">Home</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-700 font-semibold">{category || search ? (category || `Search: ${search}`) : 'All Products'}</span>
      </div>

      <div className="flex gap-8">
        {/* Sidebar – desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
            {/* Mobile filter toggle */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn-secondary text-sm py-2.5 px-4 flex items-center gap-2">
              <Filter size={16} /> 
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Result count */}
            <div className="flex-1">
              <p className="text-sm text-neutral-500">
                {loading ? (
                  <span className="inline-block w-20 h-4 skeleton rounded" />
                ) : (
                  <>
                    <span className="font-bold text-neutral-900">{total.toLocaleString()}</span> 
                    {' '}result{total !== 1 ? 's' : ''}
                    {(category || search) && (
                      <span className="ml-1">
                        for <span className="font-bold text-neutral-900">{category || `"${search}"`}</span>
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Sort */}
            <div className="relative">
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1 block">Sort By</label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => set('sort', e.target.value)}
                  className="appearance-none input py-2.5 pr-10 pl-4 text-sm font-semibold text-neutral-900 cursor-pointer border-neutral-300 hover:border-amber-400 transition-colors"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Active Filters:</span>
              {activeFilters.map((f) => (
                <span key={f.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                  {f.label}
                  <button 
                    onClick={f.clear} 
                    className="hover:text-red-600 transition-colors hover:scale-110"
                    aria-label={`Remove ${f.label} filter`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button 
                onClick={clearAll} 
                className="text-xs text-neutral-500 hover:text-red-600 font-semibold transition-colors px-2 underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array(12).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <Search size={32} className="text-neutral-300" />
              </div>
              <h3 className="text-xl font-bold text-neutral-700 mb-2">No products found</h3>
              <p className="text-neutral-500 mb-6 max-w-md">
                Try adjusting your filters or search terms to find what you're looking for
              </p>
              <button onClick={clearAll} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p}
                  onClick={() => { const np = new URLSearchParams(params); np.set('page', p); setParams(np) }}
                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all duration-200
                    ${p === page 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-btn scale-110' 
                      : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-amber-400 hover:text-amber-600 hover:scale-105'
                    }`}
                  aria-label={`Go to page ${p}`}
                  aria-current={p === page ? 'page' : undefined}
                >
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
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-neutral-200 z-10">
              <div className="flex items-center justify-between p-4">
                <h2 className="font-black text-lg text-neutral-900 flex items-center gap-2">
                  <Filter size={20} className="text-amber-600" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                      {activeFilters.length}
                    </span>
                  )}
                </h2>
                <button 
                  onClick={() => setSidebarOpen(false)} 
                  className="btn-icon hover:bg-neutral-100"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <Sidebar />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="btn-primary w-full"
              >
                Show {total} Results
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

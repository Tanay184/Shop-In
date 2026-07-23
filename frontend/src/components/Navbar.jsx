import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, Menu, X, Zap, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Groceries', 'Toys']

export default function Navbar() {
  const { user, isAuth, logout } = useAuth()
  const { count, setOpen } = useCart()
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartHover, setCartHover] = useState(false)
  const userMenuRef = useRef(null)
  const cartHoverRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Sticky header effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (cartHoverRef.current && !cartHoverRef.current.contains(e.target)) {
        setCartHover(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <header className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        {/* Top bar */}
        <div className={`bg-navy-900 text-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-btn group-hover:shadow-btn-hover transition-all duration-200 group-hover:scale-105">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight">
                Shop<span className="text-gradient">In</span>
              </span>
            </Link>

            {/* Search bar with improved styling */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden sm:flex">
              <div className="flex w-full rounded-xl overflow-hidden shadow-md border-2 border-transparent focus-within:border-amber-400 focus-within:shadow-btn transition-all duration-200 bg-white">
                <div className="relative flex items-center pl-4">
                  <Search size={18} className="text-neutral-400" />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="flex-1 px-3 py-3 text-neutral-900 text-sm font-medium focus:outline-none"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="px-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold transition-all duration-200 flex items-center gap-2 shadow-inner"
                  aria-label="Submit search"
                >
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Account */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-150 text-sm group"
                  aria-label="Account menu"
                  aria-expanded={userMenuOpen}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAuth ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-white/10'} group-hover:scale-110 transition-transform`}>
                    <User size={16} className="text-white" />
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-[10px] text-white/60 font-medium leading-tight">
                      {isAuth ? 'Hello' : 'Sign In'}
                    </span>
                    <span className="text-sm text-white font-semibold leading-tight">
                      {isAuth ? user.name.split(' ')[0] : 'Account'}
                    </span>
                  </div>
                  <ChevronDown size={14} className={`text-white/60 transition-transform hidden md:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 animate-scale-in z-50 overflow-hidden">
                    {isAuth ? (
                      <>
                        <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
                          <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Signed in as</p>
                          <p className="font-bold text-neutral-900 truncate mt-0.5">{user.email}</p>
                        </div>
                        <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                          <Package size={16} /> My Orders
                        </Link>
                        <button onClick={() => { logout(); setUserMenuOpen(false) }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-t border-neutral-100">
                          <LogOut size={16} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3">
                          <p className="text-xs text-neutral-600 mb-3">Get access to your Orders, Wishlist and Recommendations</p>
                          <Link to="/login" onClick={() => setUserMenuOpen(false)}
                            className="btn-primary w-full text-sm py-2.5">
                            Sign In
                          </Link>
                        </div>
                        <Link to="/register" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                          New customer? Start here
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart with hover preview and count badge */}
              <div className="relative" ref={cartHoverRef}>
                <button
                  onClick={() => setOpen(true)}
                  onMouseEnter={() => count > 0 && setCartHover(true)}
                  onMouseLeave={() => setCartHover(false)}
                  className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-150 group"
                  aria-label={`Shopping cart with ${count} items`}
                >
                  <div className="relative">
                    <ShoppingCart size={22} className="text-white group-hover:scale-110 transition-transform" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-bounce-in ring-2 ring-navy-900">
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-[10px] text-white/60 font-medium leading-tight">Cart</span>
                    <span className="text-sm text-white font-semibold leading-tight">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </button>

                {/* Mini cart preview on hover */}
                {cartHover && count > 0 && (
                  <div 
                    className="mini-cart-preview"
                    onMouseEnter={() => setCartHover(true)}
                    onMouseLeave={() => setCartHover(false)}
                  >
                    <div className="p-4 border-b border-neutral-100 bg-neutral-50">
                      <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Cart Preview
                      </p>
                      <p className="text-sm text-neutral-600 mt-0.5">{count} items in your cart</p>
                    </div>
                    <div className="p-4">
                      <button 
                        onClick={() => { setOpen(true); setCartHover(false) }}
                        className="btn-primary w-full text-sm py-2.5"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="sm:hidden btn-icon text-white hover:bg-white/10"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category nav bar with improved active state */}
        <div className="bg-navy-800 text-white border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 h-11">
              <Link to="/products" className={`nav-link ${location.pathname === '/products' && !location.search ? 'nav-link-active' : ''}`}>
                All Products
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`nav-link ${location.search.includes(cat) ? 'nav-link-active' : ''}`}
                >
                  {cat}
                </Link>
              ))}
              <Link to="/products?featured=true" className="nav-link ml-auto bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 font-bold flex items-center gap-1.5 ring-1 ring-amber-400/30">
                <TrendingUp size={13} className="animate-pulse" /> Hot Deals
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search + Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[6.75rem] z-20 bg-navy-900 border-t border-white/10 p-4 animate-slide-up shadow-xl">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex rounded-xl overflow-hidden border-2 border-white/10 focus-within:border-amber-400 bg-white transition-all duration-200">
              <div className="flex items-center pl-3">
                <Search size={16} className="text-neutral-400" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-3 py-3 text-sm text-neutral-900 font-medium focus:outline-none"
              />
              <button type="submit" className="px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold">
                Go
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 text-sm py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-medium text-center"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

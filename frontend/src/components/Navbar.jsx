import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, Menu, X, Zap } from 'lucide-react'
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
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
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
      <header className={`sticky top-0 z-30 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Top bar */}
        <div className="bg-navy-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-btn group-hover:shadow-btn-hover transition-shadow">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Shop<span className="text-gradient">In</span>
              </span>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden sm:flex">
              <div className="flex w-full rounded-xl overflow-hidden shadow-sm border border-white/10 focus-within:border-amber-400 transition-colors">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Shop In..."
                  className="flex-1 px-4 py-2.5 text-gray-800 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold transition-colors flex items-center gap-1.5"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Account */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-150 text-sm"
                >
                  <User size={18} className={isAuth ? 'text-amber-400' : 'text-white/80'} />
                  <span className="hidden md:block text-white/90 font-medium">
                    {isAuth ? user.name.split(' ')[0] : 'Sign In'}
                  </span>
                  <ChevronDown size={14} className={`text-white/60 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-up z-50">
                    {isAuth ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Signed in as</p>
                          <p className="font-semibold text-gray-800 truncate">{user.email}</p>
                        </div>
                        <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                          <Package size={15} /> My Orders
                        </Link>
                        <button onClick={() => { logout(); setUserMenuOpen(false) }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                          Sign In
                        </Link>
                        <Link to="/register" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-150"
              >
                <ShoppingCart size={20} className="text-white/90" />
                <span className="hidden md:block text-white/90 text-sm font-medium">Cart</span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-400 text-navy-900 text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="sm:hidden btn-icon text-white"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category nav bar */}
        <div className="bg-navy-800 text-white border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 h-10">
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
              <Link to="/products?featured=true" className="nav-link ml-auto text-amber-400 font-semibold">
                ⚡ Deals
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search + Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 z-20 bg-navy-900 border-t border-white/10 p-4 animate-slide-up shadow-xl">
          <form onSubmit={handleSearch} className="flex rounded-xl overflow-hidden border border-white/10 mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-4 py-2.5 text-sm text-gray-800 focus:outline-none"
            />
            <button type="submit" className="px-4 bg-amber-400 text-navy-900 font-bold">
              <Search size={16} />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 text-sm py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
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

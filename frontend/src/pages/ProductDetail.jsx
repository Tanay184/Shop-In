import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, ChevronLeft, Shield, RefreshCw, Truck, Award, Plus, Minus } from 'lucide-react'
import api from '../api/client'
import { useCart } from '../context/CartContext'
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard'

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN')
}

function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size}
          className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct]   = useState(null)
  const [related, setRelated]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [qty, setQty]           = useState(1)
  const [adding, setAdding]     = useState(false)
  const [wished, setWished]     = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data.product)
        setRelated(res.data.related)
        document.title = `${res.data.product.name} – Shop In`
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    load()
    window.scrollTo(0, 0)
  }, [id])

  const handleAdd = async () => {
    setAdding(true)
    await addToCart(product.id, qty)
    setAdding(false)
  }

  if (loading) return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="skeleton rounded-2xl h-96" />
        <div className="space-y-4">
          <div className="skeleton h-6 w-1/3 rounded" />
          <div className="skeleton h-8 w-full rounded" />
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-10 w-32 rounded" />
          <div className="skeleton h-12 w-full rounded-xl" />
        </div>
      </div>
    </main>
  )

  if (!product) return (
    <main className="flex flex-col items-center justify-center py-32 text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-3">Product not found</h2>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </main>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-500 transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-96 md:h-auto">
            <img
              src={imgError ? 'https://via.placeholder.com/600x500?text=Product+Image' : product.image_url}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 badge badge-orange text-sm px-3 py-1">{product.badge}</span>
          )}
          <button
            onClick={() => setWished((w) => !w)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110
              ${wished ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-400'}`}
          >
            <Heart size={18} className={wished ? 'fill-white' : ''} />
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-1">{product.category} › {product.subcategory}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm font-semibold text-amber-600">{product.rating}</span>
            <span className="text-sm text-gray-400">{product.review_count?.toLocaleString()} ratings</span>
          </div>

          <div className="h-px bg-gray-100 mb-4" />

          {/* Price block */}
          <div className="mb-5">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.original_price)}</span>
              )}
            </div>
            {product.discount_percent > 0 && (
              <span className="badge badge-green text-sm px-3 py-1">You save {product.discount_percent}% ({formatPrice(product.original_price - product.price)})</span>
            )}
            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes. Free delivery on this item.</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-5">
            <span className={`w-2.5 h-2.5 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.in_stock ? 'text-green-600' : 'text-red-500'}`}>
              {product.in_stock ? `In Stock (${product.stock_count} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          {product.in_stock && (
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors active:scale-90">
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-base font-bold">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock_count, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors active:scale-90">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button onClick={handleAdd} disabled={!product.in_stock || adding}
              className={`flex-1 btn-primary py-3.5 text-base ${!product.in_stock ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {adding ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding…
                </span>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart</>
              )}
            </button>
            <button disabled={!product.in_stock}
              className={`flex-1 btn-dark py-3.5 text-base ${!product.in_stock ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck,    text: 'Free Delivery',     sub: 'On orders above ₹499' },
              { icon: RefreshCw,text: 'Easy Returns',      sub: '30-day return policy' },
              { icon: Shield,   text: 'Secure Checkout',   sub: '100% buyer protection' },
              { icon: Award,    text: 'Genuine Products',  sub: 'Verified by Shop In' },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <t.icon size={16} className="text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">{t.text}</p>
                  <p className="text-xs text-gray-400">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="section-title mb-5">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  )
}

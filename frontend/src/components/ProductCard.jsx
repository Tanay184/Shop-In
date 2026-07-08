import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [wished, setWished] = useState(false)
  const [adding, setAdding] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    await addToCart(product.id)
    setAdding(false)
  }

  const badgeColors = {
    'Best Seller': 'badge-orange',
    'New':         'badge-blue',
    'Deal':        'badge-red',
  }

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="card overflow-hidden flex flex-col h-full">
        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50 h-48">
          <img
            src={product.image_url || 'https://via.placeholder.com/400x300?text=Product'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWished((w) => !w) }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200 hover:scale-110
              ${wished ? 'bg-red-500 text-white shadow-md' : 'bg-white/90 text-gray-400 hover:text-red-400 shadow-sm'}`}
          >
            <Heart size={14} className={wished ? 'fill-white' : ''} />
          </button>

          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-2 left-2 badge ${badgeColors[product.badge] || 'badge-gold'}`}>
              {product.badge}
            </span>
          )}

          {/* Discount pill */}
          {product.discount_percent > 0 && (
            <span className="absolute bottom-2 left-2 badge badge-green text-xs">
              -{product.discount_percent}%
            </span>
          )}

          {/* Out of stock overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-500">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-amber-600 font-medium mb-1 uppercase tracking-wide">{product.category}</p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.review_count?.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || adding}
            className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-200 transform active:scale-95
              ${product.in_stock
                ? 'bg-amber-400 hover:bg-amber-500 text-navy-900 hover:shadow-btn hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {adding ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                Adding…
              </span>
            ) : (
              <>
                <ShoppingCart size={15} />
                {product.in_stock ? 'Add to Cart' : 'Sold Out'}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

// Skeleton loader
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-6 w-24 rounded" />
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        if (s <= fullStars) {
          return <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
        } else if (s === fullStars + 1 && hasHalfStar) {
          return (
            <div key={s} className="relative">
              <Star size={13} className="text-neutral-200 fill-neutral-200" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star size={13} className="fill-amber-400 text-amber-400" />
              </div>
            </div>
          )
        } else {
          return <Star key={s} size={13} className="text-neutral-200 fill-neutral-200" />
        }
      })}
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
  const [added, setAdded] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    await addToCart(product.id)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const badgeMap = {
    'Best Seller': { class: 'badge-bestseller', text: 'BEST SELLER' },
    'New': { class: 'badge-new', text: 'NEW' },
    'Deal': { class: 'badge-deal', text: 'DEAL' },
  }

  const badge = badgeMap[product.badge]

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="card overflow-hidden flex flex-col h-full relative">
        {/* Image container */}
        <div className="relative overflow-hidden bg-neutral-50 aspect-square">
          <img
            src={product.image_url || 'https://via.placeholder.com/400x400?text=Product'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Wishlist heart - improved interaction */}
          <button
            onClick={(e) => { e.preventDefault(); setWished((w) => !w) }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm
              transition-all duration-200 hover:scale-110 active:scale-95 shadow-md
              ${wished 
                ? 'bg-red-500 text-white' 
                : 'bg-white/95 text-neutral-400 hover:text-red-500 hover:bg-white'
              }`}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} className={`transition-all ${wished ? 'fill-white animate-wiggle' : ''}`} />
          </button>

          {/* Badge - improved styling */}
          {badge && (
            <span className={`absolute top-3 left-3 ${badge.class} shadow-md`}>
              {badge.text}
            </span>
          )}

          {/* Discount badge */}
          {product.discount_percent > 0 && (
            <span className="absolute bottom-3 left-3 badge-discount shadow-md">
              {product.discount_percent}% OFF
            </span>
          )}

          {/* Out of stock overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <span className="inline-block px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            </div>
          )}

          {/* Quick add overlay on hover (desktop only) */}
          {product.in_stock && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
              <div className="p-4">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || added}
                  className="w-full py-2.5 rounded-lg bg-white hover:bg-amber-400 text-neutral-900 font-bold text-sm
                    transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg
                    flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-green-600">Added!</span>
                    </>
                  ) : adding ? (
                    <>
                      <span className="spinner border-neutral-900/30 border-t-neutral-900" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Quick Add
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <p className="text-[10px] text-amber-700 font-bold mb-1.5 uppercase tracking-widest">{product.category}</p>
          
          {/* Product name with proper hierarchy */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating with improved visual */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-neutral-500 font-medium">
              {product.rating.toFixed(1)}
            </span>
            {product.review_count > 0 && (
              <span className="text-xs text-neutral-400">
                ({product.review_count?.toLocaleString()})
              </span>
            )}
          </div>

          {/* Price with improved hierarchy and spacing */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-black text-neutral-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <>
                <span className="text-sm text-neutral-400 line-through font-medium">
                  {formatPrice(product.original_price)}
                </span>
                {product.discount_percent > 0 && (
                  <span className="text-xs font-bold text-green-600">
                    ({product.discount_percent}% off)
                  </span>
                )}
              </>
            )}
          </div>

          {/* Add to cart button (mobile) */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || adding || added}
            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm
              transition-all duration-200 transform active:scale-95 shadow-sm hover:shadow-md sm:hidden
              ${product.in_stock
                ? added
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
          >
            {added ? (
              <>
                <Check size={16} />
                Added to Cart
              </>
            ) : adding ? (
              <>
                <span className="spinner border-white/30 border-t-white" />
                Adding…
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                {product.in_stock ? 'Add to Cart' : 'Sold Out'}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

// Enhanced skeleton loader
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden border border-neutral-100">
      <div className="skeleton aspect-square w-full rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="skeleton w-3 h-3 rounded-full" />
          ))}
        </div>
        <div className="skeleton h-6 w-28 rounded" />
        <div className="skeleton h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}

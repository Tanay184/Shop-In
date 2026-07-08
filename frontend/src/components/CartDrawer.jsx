import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function CartDrawer() {
  const { items, total, count, open, setOpen, updateQuantity, removeItem, placeOrder, loading } = useCart()
  const { isAuth } = useAuth()
  const [ordering, setOrdering] = useState(false)
  const navigate = useNavigate()

  const handleOrder = async () => {
    setOrdering(true)
    const order = await placeOrder('123 Main Street, Mumbai, MH 400001')
    setOrdering(false)
    if (order) { setOpen(false); navigate('/orders') }
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="drawer-panel">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
            {count > 0 && (
              <span className="badge badge-orange">{count} item{count !== 1 ? 's' : ''}</span>
            )}
          </div>
          <button onClick={() => setOpen(false)} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {!isAuth ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">Sign in to view cart</h3>
              <p className="text-sm text-gray-400 mb-6">Your cart items will be saved to your account</p>
              <Link to="/login" onClick={() => setOpen(false)} className="btn-primary">
                Sign In
              </Link>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-20 h-20 skeleton rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                    <div className="skeleton h-6 w-20 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={56} className="text-gray-200 mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-400 mb-6">Add some items to get started!</p>
              <Link to="/products" onClick={() => setOpen(false)} className="btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 animate-fade-in">
                <Link to={`/products/${item.product.id}`} onClick={() => setOpen(false)}
                  className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 hover:opacity-90 transition-opacity">
                  <img src={item.product.image_url} alt={item.product.name}
                    className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">{item.product.name}</p>
                  <p className="text-base font-bold text-gray-900 mb-2">
                    {formatPrice(item.product.price)}
                    <span className="text-xs font-normal text-gray-400 ml-1">each</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {/* Qty controls */}
                    <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-amber-600">{formatPrice(item.subtotal)}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-gray-300 hover:text-red-500 transition-colors hover:scale-110 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {isAuth && items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 bg-white space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Subtotal ({count} items)</span>
              <span className="font-semibold text-gray-700">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-gradient text-xl">{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={ordering}
              className="btn-primary w-full py-3 text-base"
            >
              {ordering ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Placing Order…
                </span>
              ) : (
                <>Place Order <ArrowRight size={16} /></>
              )}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="btn-secondary w-full py-2.5 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

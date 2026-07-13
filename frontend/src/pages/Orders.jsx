import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight, Clock, MapPin } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

function formatPrice(n) { return '₹' + n.toLocaleString('en-IN') }

const STATUS_COLORS = {
  Processing:  'badge-blue',
  Shipped:     'badge-orange',
  Delivered:   'badge-green',
  Cancelled:   'badge-red',
}

export default function Orders() {
  const { isAuth } = useAuth()
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'My Orders – Shop In'
    if (!isAuth) { setLoading(false); return }
    api.get('/orders').then((r) => { setOrders(r.data.orders); setLoading(false) }).catch(() => setLoading(false))
  }, [isAuth])

  if (!isAuth) return (
    <main className="flex flex-col items-center justify-center py-32 text-center">
      <Package size={56} className="text-gray-200 mb-4" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Sign in to view your orders</h2>
      <Link to="/login" className="btn-primary mt-4">Sign In</Link>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">My Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-5 animate-pulse space-y-3">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-4 w-48 rounded" />
              <div className="skeleton h-16 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={56} className="text-gray-200 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-2">No orders yet</h2>
          <p className="text-gray-400 text-sm mb-6">Start shopping to see your orders here</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">Order #{order.id}</span>
                    <span className={`badge ${STATUS_COLORS[order.status] || 'badge-gold'}`}>{order.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={11} />
                    {new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <span className="text-lg font-extrabold text-gradient">{formatPrice(order.total)}</span>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <img src={item.product.image_url} alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × {formatPrice(item.price_at_purchase)}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <MapPin size={11} className="text-amber-500 flex-shrink-0" />
                  {order.shipping_address}
                </span>
                <Link to={`/products`} className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium transition-colors">
                  Buy Again <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

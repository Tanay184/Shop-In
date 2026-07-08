import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/client'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { isAuth } = useAuth()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!isAuth) { setItems([]); setTotal(0); setCount(0); return }
    try {
      setLoading(true)
      const res = await api.get('/cart')
      setItems(res.data.items)
      setTotal(res.data.total)
      setCount(res.data.count)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [isAuth])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!isAuth) { toast.error('Please login to add items to cart'); return false }
    try {
      await api.post('/cart', { product_id: productId, quantity })
      await fetchCart()
      toast.success('Added to cart! 🛒')
      setOpen(true)
      return true
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add to cart')
      return false
    }
  }, [isAuth, fetchCart])

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      await api.put(`/cart/${itemId}`, { quantity })
      await fetchCart()
    } catch { /* silent */ }
  }, [fetchCart])

  const removeItem = useCallback(async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`)
      await fetchCart()
      toast.success('Item removed')
    } catch { /* silent */ }
  }, [fetchCart])

  const clearCart = useCallback(async () => {
    try {
      await api.delete('/cart/clear')
      setItems([]); setTotal(0); setCount(0)
    } catch { /* silent */ }
  }, [])

  const placeOrder = useCallback(async (address) => {
    try {
      const res = await api.post('/orders', { shipping_address: address })
      await fetchCart()
      toast.success('Order placed successfully! 🎉')
      return res.data.order
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order')
      return null
    }
  }, [fetchCart])

  return (
    <CartContext.Provider value={{
      items, total, count, loading, open,
      setOpen, addToCart, updateQuantity, removeItem, clearCart, placeOrder, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

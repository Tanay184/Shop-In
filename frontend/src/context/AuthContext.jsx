import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/client'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('shopin_token')
    const savedUser = localStorage.getItem('shopin_user')
    if (token && savedUser) {
      try { setUser(JSON.parse(savedUser)) }
      catch { /* ignore */ }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { user, access_token } = res.data
    localStorage.setItem('shopin_token', access_token)
    localStorage.setItem('shopin_user', JSON.stringify(user))
    setUser(user)
    toast.success(`Welcome back, ${user.name}! 👋`)
    return user
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    const { user, access_token } = res.data
    localStorage.setItem('shopin_token', access_token)
    localStorage.setItem('shopin_user', JSON.stringify(user))
    setUser(user)
    toast.success(`Welcome to Shop In, ${user.name}! 🎉`)
    return user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('shopin_token')
    localStorage.removeItem('shopin_user')
    setUser(null)
    toast.success('Logged out successfully')
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

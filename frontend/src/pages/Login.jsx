import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from = location.state?.from || '/'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-amber-50/30 page-enter">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-btn mb-3">
              <Zap size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your Shop In account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-bounce-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-11"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="input pl-11 pr-11"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" id="login-submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-base mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">New to Shop In?</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <Link to="/register" id="go-to-register"
            className="btn-secondary w-full py-3 text-sm justify-center">
            Create your account
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to Shop In's{' '}
          <a href="#" className="text-amber-600 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </main>
  )
}

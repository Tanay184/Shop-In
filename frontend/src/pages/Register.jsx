import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) { setError('All fields are required'); return }
    if (form.password !== form.confirm)               { setError('Passwords do not match'); return }
    if (form.password.length < 6)                    { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-amber-50/30 page-enter">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-btn mb-3">
              <Zap size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Create account</h1>
            <p className="text-sm text-gray-500 mt-1">Join millions of happy shoppers</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-bounce-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="reg-name" type="text" value={form.name} onChange={set('name')}
                  placeholder="John Doe" className="input pl-11" autoComplete="name" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="reg-email" type="email" value={form.email} onChange={set('email')}
                  placeholder="you@example.com" className="input pl-11" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="reg-password" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')}
                  placeholder="At least 6 characters" className="input pl-11 pr-11" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="reg-confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')}
                  placeholder="Repeat your password" className="input pl-11" autoComplete="new-password" />
              </div>
            </div>

            <button type="submit" id="reg-submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-base mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : 'Create Account 🎉'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">Already have an account?</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <Link to="/login" className="btn-secondary w-full py-3 text-sm justify-center">Sign In</Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By creating an account, you agree to Shop In's{' '}
          <a href="#" className="text-amber-600 hover:underline">Terms</a> and{' '}
          <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </main>
  )
}

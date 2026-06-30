import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 space-y-3">
          <div className="w-14 h-14 mx-auto">
            <img src="/logo.png" alt="Verdant Space" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-serif text-3xl text-warm-white">Verdant Admin</h1>
          <p className="font-sans text-sm text-warm-white/50">Restricted access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs text-warm-white/60 mb-2 uppercase tracking-wider">
              Email (optional for password-only login)
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@verdantspace.com"
              className="input-field bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/30 focus:border-sage"
            />
          </div>
          <div className="relative">
            <label className="block font-sans text-xs text-warm-white/60 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-white/40" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="input-field pl-9 pr-10 bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/30 focus:border-sage"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-white/40 hover:text-warm-white/70"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-sans text-sm text-red-300 bg-red-900/20 border border-red-500/20 rounded-sm px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage text-forest font-sans font-medium text-sm py-3 rounded-sm hover:bg-warm-white transition-colors duration-300"
          >
            {loading ? 'Verifying…' : 'Enter Admin Panel'}
          </button>
        </form>

        <p className="text-center font-sans text-xs text-warm-white/30 mt-8">
          Default password: <code className="text-sage">VerdantAdmin2024!</code>
          <br />(set VITE_ADMIN_PASSWORD in .env)
        </p>
      </div>
    </div>
  )
}

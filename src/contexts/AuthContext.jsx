import { createContext, useContext, useState, useEffect } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'

// We import supabase lazily to respect top-level await initialisation
let _sb = null
async function getSB() {
  if (_sb) return _sb
  const mod = await import('../lib/supabase')
  _sb = mod.supabase
  return _sb
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSupabaseConfigured) {
      getSB().then((sb) => {
        if (!sb) { setLoading(false); return }
        sb.auth.getSession().then(({ data }) => {
          setIsAuthenticated(!!data.session)
          setLoading(false)
        })
        const { data: { subscription } } = sb.auth.onAuthStateChange((_e, session) => {
          setIsAuthenticated(!!session)
        })
        return () => subscription.unsubscribe()
      })
    } else {
      const saved = sessionStorage.getItem('vs_admin_auth')
      setIsAuthenticated(saved === 'true')
      setLoading(false)
    }
  }, [])

  async function login(email, password) {
    if (isSupabaseConfigured) {
      const sb = await getSB()
      if (!sb) throw new Error('Supabase not initialised')
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) throw error
      setIsAuthenticated(true)
    } else {
      const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'VerdantAdmin2024!'
      if (password === adminPass) {
        sessionStorage.setItem('vs_admin_auth', 'true')
        setIsAuthenticated(true)
      } else {
        throw new Error('Invalid password')
      }
    }
  }

  async function logout() {
    if (isSupabaseConfigured) {
      const sb = await getSB()
      await sb?.auth.signOut()
    } else {
      sessionStorage.removeItem('vs_admin_auth')
    }
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore the session on first load if a token exists.
  useEffect(() => {
    const token = localStorage.getItem('bq_token')
    if (!token) {
      setLoading(false)
      return
    }

    api
      .get('/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('bq_token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await api.post('/login', { email, password })
    localStorage.setItem('bq_token', res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch {
      // Token may already be invalid; ignore.
    }
    localStorage.removeItem('bq_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useI18n()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="contact__form-wrap" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--white)' }}>Admin Login</h2>
        <p style={{ color: 'var(--white-70)', marginBottom: '32px' }}>Sign in to access your tracking dashboard.</p>
        
        {error && (
          <div style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', color: '#ff6b6b', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <input
              type="email"
              placeholder="Email address"
              className="contact__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <input
              type="password"
              placeholder="Password"
              className="contact__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

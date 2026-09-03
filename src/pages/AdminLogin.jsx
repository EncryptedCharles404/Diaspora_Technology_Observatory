import { useState } from 'react'
import { signIn } from '../lib/auth.js'

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault(); setError(null); setLoading(true)
    try { await signIn(email, password); onSuccess() }
    catch { setError('Invalid email or password.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.25)', borderRadius: 8, padding: '2.5rem', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 48, height: 48, background: 'var(--gold)', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 700, color: 'var(--navy)', margin: '0 auto 1rem' }}>DTO</div>
          <div className="eyebrow">Admin Access</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '.3rem' }}>DTO Dashboard</div>
          <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>Restricted to authorised researcher only</div>
        </div>
        <form onSubmit={submit}>
          <label className="cf-label">Email</label>
          <input className="cf-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@dtoportal.com" required autoComplete="email" />
          <label className="cf-label">Password</label>
          <input className="cf-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required autoComplete="current-password" />
          {error && <div className="notice notice-error" style={{ marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '.72rem', color: 'var(--g700)' }}>
          Public site: <a href="/#home" style={{ color: 'var(--gold)' }}>dtoportal.com</a>
        </div>
      </div>
    </div>
  )
}

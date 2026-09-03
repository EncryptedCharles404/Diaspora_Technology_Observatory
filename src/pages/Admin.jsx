import { useState, useEffect } from 'react'
import { getSession, onAuthChange } from '../lib/auth.js'
import AdminLogin from './AdminLogin.jsx'
import AdminDashboard from './AdminDashboard.jsx'

export default function Admin({ navigate }) {
  const [session, setSession] = useState(undefined) // undefined = still checking

  useEffect(() => {
    getSession().then(s => setSession(s))
    const { data: { subscription } } = onAuthChange(s => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', letterSpacing: '.15em', color: 'var(--g500)' }}>CHECKING AUTHENTICATION…</div>
    </div>
  )

  if (!session) return <AdminLogin onSuccess={() => getSession().then(s => setSession(s))} />

  return <AdminDashboard navigate={navigate} />
}

import { useState } from 'react'
import { subscribeNewsletter } from '../lib/supabase.js'

export default function WaitlistForm({ source = 'unknown', title = 'Join the DTO Intelligence List', desc = 'Get notified when new patent sectors are added. No spam — research updates only.' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'dup' | 'err'

  const submit = async () => {
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      await subscribeNewsletter(email, source)
      setEmail('')
      setStatus('ok')
    } catch (e) {
      setStatus(e.message === 'already_subscribed' ? 'dup' : 'err')
    }
  }

  return (
    <div className="waitlist-strip">
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '.3rem' }}>{title}</h4>
        <p style={{ fontSize: '.82rem', color: 'var(--g500)', lineHeight: 1.6 }}>{desc}</p>
      </div>
      <div style={{ flex: 1, minWidth: 240 }}>
        {status === 'ok' ? (
          <div className="notice notice-success">✓ You're on the list. We'll be in touch.</div>
        ) : status === 'dup' ? (
          <div className="notice notice-warning">You're already subscribed — thank you.</div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              <input className="waitlist-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
              <button className="btn btn-gold" onClick={submit} disabled={status === 'loading'} style={{ whiteSpace: 'nowrap', padding: '.7rem 1.2rem' }}>
                {status === 'loading' ? 'Joining…' : 'Join →'}
              </button>
            </div>
            {status === 'err' && <div className="notice notice-error" style={{ marginTop: '.5rem' }}>Something went wrong. Email hello@dtoportal.com directly.</div>}
          </>
        )}
      </div>
    </div>
  )
}

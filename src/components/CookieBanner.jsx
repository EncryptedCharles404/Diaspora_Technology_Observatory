import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('dto_cookie_consent')) setShow(true)
  }, [])

  const accept = () => { localStorage.setItem('dto_cookie_consent', '1'); setShow(false) }

  if (!show) return null
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 200, background: 'var(--navy-mid)', border: '1px solid rgba(200,168,75,.3)',
      borderRadius: 8, padding: '1.2rem 1.5rem', maxWidth: 600, width: 'calc(100% - 2rem)',
      display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap',
      boxShadow: '0 8px 32px rgba(0,0,0,.5)',
    }}>
      <div style={{ flex: 1, minWidth: 200, fontSize: '.82rem', color: 'var(--g300)', lineHeight: 1.6 }}>
        We use cookies for analytics (Google Analytics) to understand how people use DTO. No advertising cookies.
        <a href="#terms" style={{ color: 'var(--gold)', marginLeft: '.4rem' }}>Privacy policy →</a>
      </div>
      <div style={{ display: 'flex', gap: '.8rem' }}>
        <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', color: 'var(--g500)', cursor: 'pointer', fontSize: '.8rem', fontFamily: "'DM Sans', sans-serif" }}>Decline analytics</button>
        <button onClick={accept} className="btn btn-gold btn-sm">Accept</button>
      </div>
    </div>
  )
}

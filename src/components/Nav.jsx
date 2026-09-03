import { useState } from 'react'

const LINKS = [
  { key: 'home',        label: 'Home' },
  { key: 'library',     label: 'Patent Library' },
  { key: 'pricing',     label: 'Shop' },
  { key: 'contact',     label: 'Consult' },
  { key: 'methodology', label: 'Methodology' },
  { key: 'about',       label: 'About' },
]

export default function Nav({ currentPage, navigate }) {
  const [open, setOpen] = useState(false)
  const go = (k) => { navigate(k); setOpen(false) }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2.5rem',
        background: 'rgba(15,36,68,.97)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200,168,75,.2)',
      }}>
        <button onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: '.8rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, background: 'var(--gold)', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 700, color: 'var(--navy)', flexShrink: 0 }}>DTO</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '.9rem', lineHeight: 1.1, textAlign: 'left' }}>
            <span style={{ color: 'var(--white)', display: 'block' }}>Diaspora Technology Observatory</span>
            <span style={{ fontSize: '.6rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--gold)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Africa Industrial Intelligence Platform</span>
          </div>
        </button>

        {/* Desktop */}
        <div style={{ display: 'flex', gap: '.4rem' }} className="desktop-nav">
          {LINKS.map(({ key, label }) => (
            <button key={key} onClick={() => go(key)} style={{
              padding: '.45rem .9rem', borderRadius: 4, fontSize: '.82rem',
              cursor: 'pointer', border: 'none', background: 'transparent',
              fontFamily: "'DM Sans', sans-serif", transition: 'all .15s',
              color: currentPage === key ? 'var(--gold)' : 'var(--g300)',
              fontWeight: currentPage === key ? 600 : 400,
            }}>{label}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} className="hamburger" aria-label="Menu" style={{ display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: '.4rem', border: 'none', background: 'transparent' }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 2, background: 'var(--g300)', borderRadius: 2, display: 'block' }} />)}
        </button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, background: 'rgba(15,36,68,.99)', borderBottom: '1px solid rgba(200,168,75,.2)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
          {LINKS.map(({ key, label }) => (
            <button key={key} onClick={() => go(key)} style={{ textAlign: 'left', padding: '.75rem 1rem', borderRadius: 4, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: currentPage === key ? 'var(--gold)' : 'var(--g300)' }}>{label}</button>
          ))}
        </div>
      )}

      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:flex!important}nav{padding:.8rem 1.2rem!important}}`}</style>
    </>
  )
}

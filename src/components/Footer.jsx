export default function Footer({ navigate }) {
  const links = [
    ['library','Patent Library'],['pricing','Shop'],['contact','Consult'],
    ['updates','Updates'],['methodology','Methodology'],['about','About'],['terms','Terms'],
  ]
  return (
    <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(200,168,75,.1)', padding: '1.8rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '.75rem', color: 'var(--g500)' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '.88rem', color: 'var(--white)' }}>Diaspora Technology Observatory</div>
      <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {links.map(([k, l]) => (
          <button key={k} onClick={() => navigate(k)} style={{ background: 'none', border: 'none', color: 'var(--g500)', fontSize: '.75rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'color .15s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--g500)'}
          >{l}</button>
        ))}
      </div>
      <div style={{ textAlign: 'right' }}>
        © 2026 Uzoma Charles Njoku · United Kingdom<br />
        <a href="mailto:hello@dtoportal.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>hello@dtoportal.com</a>
        {' · '}
        <a href="https://www.linkedin.com/in/uzoma-charles-njoku" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g500)', textDecoration: 'none', transition: 'color .15s' }}
          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
          onMouseLeave={e => e.target.style.color = 'var(--g500)'}
        >LinkedIn</a>
        <br />
        <button
          onClick={() => navigate('admin')}
          title="Admin login"
          style={{
            marginTop: '.5rem',
            background: 'rgba(200,168,75,.08)',
            border: '1px solid rgba(200,168,75,.2)',
            borderRadius: 4,
            color: 'rgba(200,168,75,.5)',
            fontSize: '.65rem',
            cursor: 'pointer',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '.12em',
            padding: '.25rem .7rem',
            transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,168,75,.15)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(200,168,75,.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,168,75,.08)'; e.currentTarget.style.color = 'rgba(200,168,75,.5)'; e.currentTarget.style.borderColor = 'rgba(200,168,75,.2)' }}
        >🔒 ADMIN</button>
      </div>
    </footer>
  )
}

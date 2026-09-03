export default function ErrorPage({ navigate }) {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', paddingTop: 80 }}>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '6rem', fontWeight: 900, color: 'rgba(200,168,75,.15)', lineHeight: 1 }}>404</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '.8rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--g500)', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
        <button className="btn btn-gold" onClick={() => navigate('home')}>← Back to Home</button>
      </div>
    </div>
  )
}

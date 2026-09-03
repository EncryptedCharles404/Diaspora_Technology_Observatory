import WaitlistForm from '../components/WaitlistForm.jsx'

export default function About({ navigate }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div className="eyebrow">About the Observatory</div>
        <h2 className="serif-title">Who Is Behind This</h2>

        {/* Founder block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3rem', marginBottom: '3.5rem' }}>
          <div>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', marginBottom: '1rem', border: '1px solid rgba(200,168,75,.2)' }}>
              <img src="/uzoma.jpg" alt="Uzoma Charles Njoku — Founder, Diaspora Technology Observatory" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href="mailto:hello@dtoportal.com" className="btn btn-outline btn-sm" style={{ textDecoration: 'none', display: 'inline-block', width: '100%', marginBottom: '.4rem' }}>hello@dtoportal.com</a>
              <a href="https://www.linkedin.com/in/uzoma-charles-njoku" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ textDecoration: 'none', display: 'inline-block', width: '100%' }}>LinkedIn Profile →</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.65rem', letterSpacing: '.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '.6rem' }}>Lead Researcher</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: '.3rem' }}>Uzoma Charles Njoku</h3>
            <div style={{ fontSize: '.88rem', color: 'var(--g500)', marginBottom: '1.5rem' }}>Nigerian · Based in Rochdale, United Kingdom · BSc Cybersecurity (2:1 Hons), University of Bolton</div>

            <p style={{ fontSize: '.95rem', color: 'var(--g300)', lineHeight: 1.85, marginBottom: '1.2rem' }}>I am a UK-based Nigerian researcher who founded the Diaspora Technology Observatory because I believe Africa pays too much for technology it already legally owns. Every year, African businesses import billions in manufactured goods using processes whose patents have expired — yet most entrepreneurs and institutions are entirely unaware that the underlying technology is free.</p>
            <p style={{ fontSize: '.95rem', color: 'var(--g300)', lineHeight: 1.85, marginBottom: '1.2rem' }}>My academic background in cybersecurity — specifically in IP protection frameworks, including hands-on experience applying the NIST Cybersecurity Framework — gave me the forensic research skills to trace patent status through primary databases. I have applied those skills to industrial technologies across twelve sectors relevant to African economic development.</p>
            <p style={{ fontSize: '.95rem', color: 'var(--g300)', lineHeight: 1.85 }}>DTO is an independent, self-funded research project. I do not work for any government, corporation, or institution that could bias the research. The core library is and will remain free — because the information it contains should be available to every African entrepreneur, government minister, development banker, and researcher who needs it.</p>
          </div>
        </div>

        {/* Credentials grid */}
        <div className="eyebrow" style={{ marginBottom: '1.2rem' }}>Academic & Professional Background</div>
        <div className="cred-grid" style={{ marginBottom: '3rem' }}>
          {[
            { lbl: 'Academic Qualification', val: 'BSc Cybersecurity', sub: '2:1 Honours · University of Bolton, United Kingdom' },
            { lbl: 'Academic Focus', val: 'Digital Forensics & Cybersecurity', sub: 'NIST Framework implementation · IP protection systems' },
            { lbl: 'Nationality', val: 'Nigerian', sub: 'Based in Rochdale, United Kingdom' },
            { lbl: 'Research Domain', val: 'Industrial Patent Intelligence', sub: '12 sectors · 54 African nations · AfCFTA alignment' },
            { lbl: 'Research Start', val: '2025', sub: 'Self-funded independent research' },
            { lbl: 'Database Coverage', val: '80+ verified entries', sub: 'All verified against WIPO, USPTO & Espacenet' },
          ].map(({ lbl, val, sub }) => (
            <div key={lbl} className="cred-card">
              <div className="cred-lbl">{lbl}</div>
              <div className="cred-val">{val}</div>
              <div className="cred-sub">{sub}</div>
            </div>
          ))}
        </div>

        {/* Institutional engagement */}
        <div className="eyebrow" style={{ marginBottom: '1rem' }}>Institutional Engagement</div>
        <p style={{ color: 'var(--g500)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 640 }}>DTO research has been submitted to the following institutions for review and consideration. This does not imply endorsement.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { org: 'WIPO', full: 'World Intellectual Property Organization', detail: 'TISC Programme submission — Technology and Innovation Support Centre initiative' },
            { org: 'AfDB', full: 'African Development Bank', detail: '"Industrialize Africa" strategy initiative submission' },
            { org: 'Chatham House', full: 'Chatham House', detail: 'Africa Programme — submitted for academic review' },
            { org: 'TEF', full: 'Tony Elumelu Foundation', detail: 'Entrepreneurship Programme — submitted as a knowledge resource' },
          ].map(({ org, full, detail }) => (
            <div key={org} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.12)', borderRadius: 6, padding: '1.3rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.3rem' }}>{org}</div>
              <div style={{ fontSize: '.84rem', fontWeight: 500, color: 'var(--white)', marginBottom: '.4rem' }}>{full}</div>
              <div style={{ fontSize: '.76rem', color: 'var(--g500)', lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div style={{ background: 'rgba(200,168,75,.06)', border: '1px solid rgba(200,168,75,.25)', borderRadius: 8, padding: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: '1rem' }}>Mission Statement</div>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.75, color: 'var(--white)', maxWidth: 680, margin: '0 auto' }}>
            "To map, verify, and freely publish every industrial manufacturing technology that is legally accessible to African businesses — so that no African entrepreneur or institution ever pays a licensing fee for technology that is already theirs to use."
          </blockquote>
          <div style={{ marginTop: '1rem', fontSize: '.82rem', color: 'var(--g500)' }}>Uzoma Charles Njoku — Founder, Diaspora Technology Observatory</div>
        </div>

        <WaitlistForm source="about" title="Stay Connected" desc="Get notified when new sectors, technologies, or reports are added to the library." />

        <div className="cta-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn btn-gold" onClick={() => navigate('library')}>Browse the Library</button>
          <button className="btn btn-outline" onClick={() => navigate('contact')}>Request a Consultation</button>
        </div>
      </div>
    </div>
  )
}

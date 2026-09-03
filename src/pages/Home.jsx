import { useState, useEffect } from 'react'
import Ticker from '../components/Ticker.jsx'
import WaitlistForm from '../components/WaitlistForm.jsx'
import PatentCard from '../components/PatentCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { getLibraryStats, getRecentPatents } from '../lib/supabase.js'

export default function Home({ navigate }) {
  const [stats, setStats] = useState({ total: 80, sectors: 12, pd: 70, pool: 9, cl: 1 })
  const [recent, setRecent] = useState([])
  const [loadingRecent, setLoadingRecent] = useState(true)

  useEffect(() => {
    getLibraryStats().then(setStats).catch(() => {})
    getRecentPatents(3).then(d => { setRecent(d); setLoadingRecent(false) }).catch(() => setLoadingRecent(false))
  }, [])

  const S = ({ n, l }) => (
    <div className="stat">
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
      <div style={{ fontSize: '.7rem', color: 'var(--g500)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '.2rem' }}>{l}</div>
    </div>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <Ticker />

      {/* Pro banner */}
      <div style={{ background: 'linear-gradient(135deg,rgba(200,168,75,.12),rgba(200,168,75,.06))', borderBottom: '1px solid rgba(200,168,75,.25)', padding: '.7rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap', textAlign: 'center' }}>
        <div style={{ fontSize: '.82rem', color: 'var(--g300)' }}><strong style={{ color: 'var(--gold)' }}>DTO Intelligence Reports are live.</strong> Download verified sector reports — Pharmaceuticals, Agriculture, Energy, Mining &amp; Textiles — from £49.</div>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('pricing')}>Browse Reports →</button>
      </div>

      {/* Hero */}
      <div style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem 3rem' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.68rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
          <span style={{ display: 'block', width: 50, height: 1, background: 'var(--gold)', opacity: .4 }} />
          Diaspora Technology Observatory
          <span style={{ display: 'block', width: 50, height: 1, background: 'var(--gold)', opacity: .4 }} />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '.5rem' }}>
          Africa's <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Free</em> Technology Library
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,2vw,1.4rem)', color: 'var(--g300)', marginBottom: '1.5rem', maxWidth: 620 }}>
          Verified patent intelligence for African manufacturers, investors, and institutions — showing which technologies are already legally free to use.
        </p>
        <p style={{ fontSize: '.95rem', color: 'var(--g500)', maxWidth: 560, lineHeight: 1.75, marginBottom: '2.5rem' }}>
          When a patent expires, the underlying manufacturing technology enters the public domain. Any company, anywhere, can use it — no permission, no royalty, no gatekeeping. Africa imported US$542 billion in manufactured goods in 2023, a significant share using technology that is already free. <strong style={{ color: 'var(--white)' }}>DTO finds, verifies, and maps those technologies for you.</strong>
        </p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <button className="btn btn-gold" onClick={() => navigate('library')}>Browse the Patent Library</button>
          <button className="btn btn-outline" onClick={() => navigate('contact')}>Request a Free Consultation</button>
        </div>
        <div style={{ display: 'flex', gap: '3rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(200,168,75,.12)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <S n={stats.total + '+'} l="Patents Mapped" />
          <S n={stats.sectors} l="Sectors Covered" />
          <S n="54" l="African Nations" />
          <S n="£0" l="Licensing Cost" />
        </div>
      </div>

      <hr className="gold-line" />

      {/* Waitlist */}
      <div className="sec" style={{ paddingBottom: '1rem' }}>
        <WaitlistForm source="home" />
      </div>

      <hr className="gold-line" />

      {/* The opportunity */}
      <div className="sec">
        <div className="eyebrow">The Continent-Wide Opportunity</div>
        <h2 className="serif-title">Africa Pays Billions For Technology That Is Already Free</h2>
        <p className="sec-lead">The African Continental Free Trade Area (AfCFTA) covers all 54 African Union member states with a combined population of approximately 1.4 billion people. When a patent reaches the end of its 20-year term, the technology enters the public domain — meaning any company, anywhere, can use it without paying the original inventor. Most African businesses are unaware of how many technologies this applies to.</p>
        <div className="stats-band">
          <div className="sb-item"><div className="sb-num">US$542B</div><div className="sb-lbl">Manufactured goods imported by Africa in 2023</div><div className="sb-src">African Union Trade Report, 2024</div></div>
          <div className="sb-item"><div className="sb-num">2%</div><div className="sb-lbl">Africa's share of global manufacturing output</div><div className="sb-src">UNIDO Industrial Statistics, 2023</div></div>
          <div className="sb-item"><div className="sb-num">70%</div><div className="sb-lbl">African medicines imported — manufacturing technology largely public domain</div><div className="sb-src">Nigerian Ministry of Health / NAFDAC, 2023</div></div>
          <div className="sb-item"><div className="sb-num">30–40%</div><div className="sb-lbl">African food harvest lost to post-harvest spoilage annually</div><div className="sb-src">FAO Post-Harvest Losses in Africa, 2019</div></div>
          <div className="sb-item"><div className="sb-num">54%</div><div className="sb-lbl">Global cobalt reserves held by Africa — processed predominantly elsewhere</div><div className="sb-src">USGS Mineral Commodity Summaries, 2024</div></div>
        </div>
      </div>

      <hr className="gold-line" />

      {/* How it works */}
      <div className="sec">
        <div className="eyebrow">The Process</div>
        <h2 className="serif-title">From Patent Database to Your Factory Floor</h2>
        <p className="sec-lead">We do the patent research so your team does not have to. Every entry in the DTO library has been verified against public patent databases before it is published. See our <button className="btn-ghost" onClick={() => navigate('methodology')}>full methodology →</button></p>
        <div className="steps-grid">
          <div className="step-box"><div className="step-n">01</div><div className="step-t">We Find It</div><div className="step-d">We search WIPO PATENTSCOPE, the USPTO, Espacenet, and the Medicines Patent Pool for technologies in your sector whose patents have legally expired.</div></div>
          <div className="step-box"><div className="step-n">02</div><div className="step-t">We Verify It</div><div className="step-d">We confirm expiry against the original patent record and check whether alternative access routes exist — such as a free sublicence from the Medicines Patent Pool.</div></div>
          <div className="step-box"><div className="step-n">03</div><div className="step-t">We Map It</div><div className="step-d">We identify which specific technologies apply to your sector and country, with regulatory pathways, implementation notes, and source links.</div></div>
          <div className="step-box"><div className="step-n">04</div><div className="step-t">You Decide</div><div className="step-d">You review the verified information and decide whether to pursue the technology. Always confirm independently with your national regulatory authority.</div></div>
        </div>
      </div>

      <hr className="gold-line" />

      {/* Recently added */}
      <div className="sec">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="eyebrow">Recently Added</div>
            <h2 className="serif-title" style={{ marginBottom: 0 }}>Latest Library Entries</h2>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('library')}>View all {stats.total}+ entries →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.2rem' }}>
          {loadingRecent
            ? [0,1,2].map(i => <SkeletonCard key={i} />)
            : recent.map(p => <PatentCard key={p.id} patent={p} navigate={navigate} isNew />)
          }
        </div>
        {!loadingRecent && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-gold" onClick={() => navigate('library')}>Browse All {stats.total}+ Technologies →</button>
          </div>
        )}
      </div>

      <hr className="gold-line" />

      {/* About strip */}
      <div className="sec">
        <div className="eyebrow">About the Observatory</div>
        <h2 className="serif-title">Who Is Behind This</h2>
        <p className="sec-lead">The Diaspora Technology Observatory is an independent research platform led by Uzoma Charles Njoku — a UK-based Nigerian researcher mapping industrial technologies whose patents have expired or are otherwise freely accessible to African businesses, institutions, and governments.</p>
        <div className="cred-grid">
          <div className="cred-card"><div className="cred-lbl">Lead Researcher</div><div className="cred-val">Uzoma Charles Njoku</div><div className="cred-sub">Nigerian, based in the United Kingdom</div></div>
          <div className="cred-card"><div className="cred-lbl">Academic Qualification</div><div className="cred-val">BSc Cybersecurity — 2:1 Honours</div><div className="cred-sub">University of Bolton, United Kingdom</div></div>
          <div className="cred-card"><div className="cred-lbl">Research Submitted To</div><div className="cred-val">WIPO · AfDB · Chatham House</div><div className="cred-sub">Africa Programme — submitted for review</div></div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('about')}>Read the full researcher profile →</button>
        </div>
      </div>

      {/* CTA band */}
      <div style={{ textAlign: 'center', padding: '5rem 2rem', borderTop: '1px solid rgba(200,168,75,.1)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem,2.5vw,2rem)', marginBottom: '.8rem' }}>Ready to Stop Overpaying for Technology?</h2>
        <p style={{ color: 'var(--g500)', maxWidth: 480, margin: '0 auto 2rem', fontSize: '.9rem', lineHeight: 1.7 }}>Browse our verified sector reports — or request a free 48-hour consultation. We will identify which technologies in your sector are already freely available.</p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <button className="btn btn-gold" onClick={() => navigate('pricing')}>Browse Sector Reports</button>
          <button className="btn btn-outline" onClick={() => navigate('contact')}>Request Free Consultation</button>
        </div>
      </div>
    </div>
  )
}

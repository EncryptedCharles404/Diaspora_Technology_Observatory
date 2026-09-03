import { useState, useEffect } from 'react'
import { getRecentPatents } from '../lib/supabase.js'
import PatentCard from '../components/PatentCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import WaitlistForm from '../components/WaitlistForm.jsx'

export default function Updates({ navigate }) {
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecentPatents(12).then(d => { setRecent(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const CHANGELOG = [
    { date: 'August 2026', title: 'DTO Portal v3 launched', desc: 'Rebuilt on React + Supabase. Real-time database, admin dashboard, implementation difficulty ratings, tags, shareable links, and cookie consent.' },
    { date: 'June 2026', title: 'Methodology page published', desc: 'Full three-tier verification framework published. Every entry now carries a DTO Verified / Partially Verified / Legal Review Required confidence rating.' },
    { date: 'May 2026', title: 'All 80 entries verified', desc: 'Complete verification pass of all 80 database entries against WIPO PATENTSCOPE, USPTO, Espacenet, and the Medicines Patent Pool. Efavirenz reclassified to Legal Review Required.' },
    { date: 'May 2026', title: 'Sector reports launched', desc: '5 PDF sector reports published on Lemon Squeezy. Pharmaceuticals (£79), Agriculture (£59), Energy (£69), Mining (£79), Textiles (£49), and the complete bundle (£199).' },
    { date: 'April 2026', title: 'Submitted to Chatham House Africa Programme', desc: 'DTO research submitted to Chatham House Africa Programme for review.' },
    { date: 'March 2026', title: 'Submitted to African Development Bank', desc: 'DTO research submitted to the AfDB Industrialize Africa Strategy initiative.' },
    { date: 'February 2026', title: 'Submitted to WIPO TISC Programme', desc: 'DTO research submitted to the WIPO Technology and Innovation Support Centres (TISC) Programme.' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3rem 2rem' }}>
        <div className="eyebrow">What's New</div>
        <h2 className="serif-title">Updates & Changelog</h2>
        <p className="sec-lead">Track what's been added to the DTO library, new features, and research milestones. Subscribe below to get updates by email.</p>

        <WaitlistForm source="updates" title="Get Updates by Email" desc="Be notified when new patents are added, new sectors are covered, or new reports are published." />

        {/* Recently added entries */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--white)' }}>Recently Added to the Library</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.2rem' }}>
            {loading ? [0,1,2].map(i => <SkeletonCard key={i} />) : recent.map(p => <PatentCard key={p.id} patent={p} navigate={navigate} isNew />)}
          </div>
        </div>

        <hr className="gold-line" style={{ marginBottom: '3rem' }} />

        {/* Changelog */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem' }}>Platform & Research Changelog</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CHANGELOG.map(({ date, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: '1.5rem', padding: '1.2rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.68rem', color: 'var(--gold)', whiteSpace: 'nowrap', paddingTop: '.1rem', minWidth: 90 }}>{date}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--white)', marginBottom: '.3rem' }}>{title}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--g500)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

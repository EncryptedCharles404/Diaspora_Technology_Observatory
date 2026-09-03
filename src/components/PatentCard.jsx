import { useState } from 'react'
import { incrementViewCount } from '../lib/supabase.js'

const ACCESS_BADGE = {
  'Public Domain':     <span className="badge badge-pd">Public Domain</span>,
  'Patent Pool':       <span className="badge badge-pool">Patent Pool</span>,
  'Compulsory License':<span className="badge badge-cl">Compulsory License</span>,
}
const CONF_BADGE = {
  'DTO Verified':          <span className="badge badge-v">✓ DTO Verified</span>,
  'Partially Verified':    <span className="badge badge-p">◑ Partially Verified</span>,
  'Legal Review Required': <span className="badge badge-l">⚠ Legal Review Required</span>,
}
const DIFF_BADGE = {
  Low:    <span className="badge badge-easy">Easy to implement</span>,
  Medium: <span className="badge badge-med">Moderate complexity</span>,
  High:   <span className="badge badge-hard">High complexity</span>,
}

export default function PatentCard({ patent: p, navigate, isNew = false }) {
  const [expanded, setExpanded] = useState(false)
  const [viewed, setViewed] = useState(false)

  const handleExpand = () => {
    if (!expanded && !viewed) {
      incrementViewCount(p.id)
      setViewed(true)
    }
    setExpanded(e => !e)
  }

  // Shareable link
  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}#library?id=${p.id}`
    navigator.clipboard?.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => {})
  }

  return (
    <div className="card card-accent" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.7rem', gap: '.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--g500)' }}>{p.sector}</span>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
          {isNew && <span className="badge badge-new">New</span>}
          {ACCESS_BADGE[p.access_type]}
        </div>
      </div>

      {/* Confidence + date */}
      <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.7rem' }}>
        {CONF_BADGE[p.confidence]}
        <span className="badge badge-date" style={{ fontFamily: "'DM Mono', monospace" }}>Verified {p.verified_date}</span>
        {p.implementation_difficulty && DIFF_BADGE[p.implementation_difficulty]}
      </div>

      {/* Name */}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem', color: 'var(--white)' }}>{p.name}</div>

      {/* Description */}
      <div style={{ fontSize: '.82rem', color: 'var(--g500)', lineHeight: 1.6, marginBottom: '.8rem' }}>{p.description}</div>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.4rem .8rem', fontSize: '.75rem', marginBottom: '.7rem' }}>
        {p.holder && <div style={{ color: 'var(--g500)' }}>Original holder<span style={{ display: 'block', color: 'var(--g300)', fontSize: '.8rem', marginTop: '.1rem' }}>{p.holder}</span></div>}
        <div style={{ color: 'var(--g500)' }}>Available since<span style={{ display: 'block', color: 'var(--g300)', fontSize: '.8rem', marginTop: '.1rem' }}>{p.available_since}</span></div>
      </div>

      {/* Countries */}
      {p.countries && (
        <div style={{ fontSize: '.72rem', color: 'var(--g500)', marginBottom: '.7rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--gold)' }}>Most relevant: </strong>{p.countries}
        </div>
      )}

      {/* Saving */}
      {p.saving && <div style={{ fontSize: '.82rem', fontWeight: 600, color: '#81c784', marginBottom: '.8rem' }}>✓ {p.saving}</div>}

      {/* Tags */}
      {p.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: '.58rem', padding: '.15rem .55rem', borderRadius: '2rem', background: 'rgba(200,168,75,.07)', border: '1px solid rgba(200,168,75,.2)', color: 'var(--g500)', letterSpacing: '.04em' }}>{t}</span>
          ))}
        </div>
      )}

      {/* Expandable notes */}
      {p.notes && (
        <>
          <button onClick={handleExpand} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '.75rem', fontFamily: "'DM Sans', sans-serif", marginBottom: '.6rem', padding: 0 }}>
            {expanded ? '▲ Hide implementation notes' : '▼ Show implementation notes'}
          </button>
          {expanded && (
            <div style={{ fontSize: '.78rem', color: 'var(--g500)', background: 'rgba(255,255,255,.04)', borderRadius: 4, padding: '.7rem .9rem', lineHeight: 1.7, marginBottom: '.8rem' }}>
              <strong style={{ color: 'var(--g300)' }}>Implementation notes: </strong>{p.notes}
            </div>
          )}
          {expanded && p.jurisdiction_notes && (
            <div style={{ fontSize: '.78rem', color: 'var(--g500)', background: 'rgba(184,76,0,.05)', border: '1px solid rgba(184,76,0,.2)', borderRadius: 4, padding: '.7rem .9rem', lineHeight: 1.7, marginBottom: '.8rem' }}>
              <strong style={{ color: 'var(--amber-col)' }}>Jurisdiction notes: </strong>{p.jurisdiction_notes}
            </div>
          )}
        </>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '.4rem' }}>
        {p.source_link && (
          <a href={p.source_link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.72rem', color: 'var(--gold)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 3, padding: '.3rem .7rem', textDecoration: 'none' }}>
            View source →
          </a>
        )}
        <button onClick={() => navigate('contact')} style={{ fontSize: '.72rem', color: 'var(--gold)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 3, padding: '.3rem .7rem', background: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
          Request report
        </button>
        <button onClick={share} title="Copy shareable link" style={{ fontSize: '.72rem', color: 'var(--g500)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 3, padding: '.3rem .7rem', background: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
          Share ↗
        </button>
      </div>
    </div>
  )
}

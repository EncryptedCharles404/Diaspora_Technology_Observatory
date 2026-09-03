import { useState, useEffect, useCallback } from 'react'
import PatentCard from '../components/PatentCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { getLibraryStats } from '../lib/supabase.js'
import { supabase } from '../lib/supabase.js'

const SECTORS = ['Pharmaceuticals','Energy','Steel & Manufacturing','Agriculture & Food Processing','Textiles & Leather','Automotive','Digital Infrastructure','Water & Sanitation','Mining & Minerals','Cement & Construction','Chemicals & Plastics','Paper & Packaging']

// Client-side search — checks every field including tags
function matchesSearch(p, q) {
  if (!q) return true
  const s = q.toLowerCase()
  return (
    p.name?.toLowerCase().includes(s) ||
    p.sector?.toLowerCase().includes(s) ||
    p.description?.toLowerCase().includes(s) ||
    p.holder?.toLowerCase().includes(s) ||
    p.countries?.toLowerCase().includes(s) ||
    p.notes?.toLowerCase().includes(s) ||
    p.saving?.toLowerCase().includes(s) ||
    p.access_type?.toLowerCase().includes(s) ||
    p.available_since?.toLowerCase().includes(s) ||
    p.jurisdiction_notes?.toLowerCase().includes(s) ||
    (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(s)))
  )
}

export default function Library({ navigate }) {
  const [all,      setAll]      = useState([])   // full unfiltered list
  const [patents,  setPatents]  = useState([])   // filtered result
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [stats,    setStats]    = useState(null)
  const [search,   setSearch]   = useState('')
  const [sector,   setSector]   = useState('')
  const [access,   setAccess]   = useState('')
  const [conf,     setConf]     = useState('')
  const [diff,     setDiff]     = useState('')
  const [sort,     setSort]     = useState('newest') // newest | oldest | az | za

  // Read ?id= from hash for direct links
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('?id=')) {
      const id = hash.split('?id=')[1]
      setTimeout(() => {
        const el = document.getElementById('patent-' + id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 800)
    }
  }, [])

  // Load all patents once — then filter client-side for instant results
  useEffect(() => {
    setLoading(true)
    getLibraryStats().then(setStats).catch(() => {})
    supabase
      .from('patents')
      .select('*')
      .eq('is_published', true)
      .then(({ data, error }) => {
        if (error) { setError('Unable to load the patent library.'); setLoading(false); return }
        setAll(data || [])
        setLoading(false)
      })
  }, [])

  // Filter + sort whenever anything changes — instant, no network call
  useEffect(() => {
    let result = all

    // Search across ALL fields including tags
    if (search) result = result.filter(p => matchesSearch(p, search))

    // Dropdowns
    if (sector) result = result.filter(p => p.sector === sector)
    if (access) result = result.filter(p => p.access_type === access)
    if (conf)   result = result.filter(p => p.confidence === conf)
    if (diff)   result = result.filter(p => p.implementation_difficulty === diff)

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === 'newest') return new Date(b.created_at) - new Date(a.created_at)
      if (sort === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      if (sort === 'az')     return a.name.localeCompare(b.name)
      if (sort === 'za')     return b.name.localeCompare(a.name)
      return 0
    })

    setPatents(result)
  }, [all, search, sector, access, conf, diff, sort])

  const clear = () => { setSearch(''); setSector(''); setAccess(''); setConf(''); setDiff(''); setSort('newest') }
  const hasFilter = search || sector || access || conf || diff || sort !== 'newest'

  const sel = (val, set, opts) => (
    <select value={val} onChange={e => set(e.target.value === opts[0] ? '' : e.target.value)}
      style={{ padding: '.7rem 1rem', background: '#1a3566', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontSize: '.82rem', outline: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
      {opts.map(o => <option key={o} value={o === opts[0] ? '' : o} style={{ background: '#0f2444', color: '#fafaf8' }}>{o}</option>)}
    </select>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3rem 2rem 1rem' }}>
        <div className="eyebrow">Patent Intelligence Library</div>
        <h2 className="serif-title">Africa Technology Access Map</h2>
        <p style={{ color: 'var(--g300)', fontSize: '.95rem', lineHeight: 1.75, maxWidth: 660, marginBottom: '1rem' }}>
          Verified expired and accessible industrial patents for African manufacturers. Every entry carries a DTO confidence rating, verification date, and implementation difficulty indicator.{' '}
          <button className="btn-ghost" onClick={() => navigate('methodology')}>Learn how we verify →</button>
        </p>

        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 10, marginBottom: '1.5rem' }}>
            {[
              [stats.total, 'Total entries'],
              [stats.sectors, 'Sectors'],
              [stats.pd, 'Public domain'],
              [stats.pool, 'Patent pools'],
              [stats.cl, 'Compulsory lic.'],
              ['54', 'Countries served'],
            ].map(([n, l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                <div style={{ fontSize: '.65rem', color: 'var(--g500)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.2rem' }}>{l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '.8rem' }}>
          <input
            type="text"
            placeholder="Search by name, sector, country, tag, keyword — searches everything…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '.85rem 1.1rem .85rem 2.8rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(200,168,75,.25)', borderRadius: 6, color: 'var(--white)', fontFamily: "'DM Sans',sans-serif", fontSize: '.9rem', outline: 'none', transition: 'border-color .2s' }}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(200,168,75,.25)'}
          />
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--g500)', fontSize: '.9rem', pointerEvents: 'none' }}>🔍</span>
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--g500)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
          )}
        </div>

        {/* Filters + Sort row */}
        <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          {sel(sector, setSector, ['All sectors', ...SECTORS])}
          {sel(access, setAccess, ['All access types','Public Domain','Patent Pool','Compulsory License'])}
          {sel(conf, setConf, ['All confidence levels','DTO Verified','Partially Verified','Legal Review Required'])}
          {sel(diff, setDiff, ['All difficulties','Low','Medium','High'])}
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: '.7rem 1rem', background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 4, color: 'var(--gold)', fontSize: '.82rem', outline: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
            <option value="newest" style={{background:'#0f2444',color:'#fafaf8'}}>Newest first</option>
            <option value="oldest" style={{background:'#0f2444',color:'#fafaf8'}}>Oldest first</option>
            <option value="az"     style={{background:'#0f2444',color:'#fafaf8'}}>A → Z</option>
            <option value="za"     style={{background:'#0f2444',color:'#fafaf8'}}>Z → A</option>
          </select>
        </div>

        {/* Results count + active filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '.5rem' }}>
          <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>
            {loading ? 'Loading…' : (
              <>
                <strong style={{ color: 'var(--white)' }}>{patents.length}</strong>
                {' '}of {all.length} entr{all.length === 1 ? 'y' : 'ies'}
                {hasFilter && <span style={{ color: 'var(--gold)', marginLeft: '.4rem' }}>— filtered</span>}
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Active filter chips */}
            {sector && <span style={{ background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: '2rem', padding: '.15rem .7rem', fontSize: '.72rem', color: 'var(--gold)' }}>{sector} <button onClick={() => setSector('')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginLeft: '.2rem' }}>×</button></span>}
            {access && <span style={{ background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: '2rem', padding: '.15rem .7rem', fontSize: '.72rem', color: 'var(--gold)' }}>{access} <button onClick={() => setAccess('')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginLeft: '.2rem' }}>×</button></span>}
            {conf && <span style={{ background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: '2rem', padding: '.15rem .7rem', fontSize: '.72rem', color: 'var(--gold)' }}>{conf} <button onClick={() => setConf('')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginLeft: '.2rem' }}>×</button></span>}
            {diff && <span style={{ background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: '2rem', padding: '.15rem .7rem', fontSize: '.72rem', color: 'var(--gold)' }}>{diff} <button onClick={() => setDiff('')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginLeft: '.2rem' }}>×</button></span>}
            {hasFilter && <button className="btn-ghost" onClick={clear} style={{ fontSize: '.75rem' }}>Clear all</button>}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.2rem' }}>
        {loading && [0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
        {!loading && error && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="notice notice-error">{error}</div>
          </div>
        )}
        {!loading && !error && patents.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--g500)' }}>
            No results for <strong style={{ color: 'var(--white)' }}>"{search}"</strong>.{' '}
            <button className="btn-ghost" onClick={clear}>Clear filters</button>
          </div>
        )}
        {!loading && !error && patents.map(p => (
          <div key={p.id} id={`patent-${p.id}`}>
            <PatentCard patent={p} navigate={navigate} />
          </div>
        ))}
      </div>
    </div>
  )
}

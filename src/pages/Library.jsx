import { useState, useEffect, useCallback } from 'react'
import PatentCard from '../components/PatentCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { getPatents, getLibraryStats } from '../lib/supabase.js'

const SECTORS = ['Pharmaceuticals','Energy','Steel & Manufacturing','Agriculture & Food Processing','Textiles & Leather','Automotive','Digital Infrastructure','Water & Sanitation','Mining & Minerals','Cement & Construction','Chemicals & Plastics','Paper & Packaging']

export default function Library({ navigate }) {
  const [patents,  setPatents]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [stats,    setStats]    = useState(null)
  const [search,   setSearch]   = useState('')
  const [sector,   setSector]   = useState('')
  const [access,   setAccess]   = useState('')
  const [conf,     setConf]     = useState('')
  const [diff,     setDiff]     = useState('')

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

  useEffect(() => {
    getLibraryStats().then(setStats).catch(() => {})
  }, [])

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getPatents({
        sector: sector || null,
        accessType: access || null,
        confidence: conf || null,
        search: search || null,
      })
      // Client-side difficulty filter
      const filtered = diff ? data.filter(p => p.implementation_difficulty === diff) : data
      setPatents(filtered)
    } catch {
      setError('Unable to load the patent library. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [sector, access, conf, search, diff])

  useEffect(() => {
    const t = setTimeout(load, 300)
    return () => clearTimeout(t)
  }, [load])

  const clear = () => { setSearch(''); setSector(''); setAccess(''); setConf(''); setDiff('') }
  const hasFilter = search || sector || access || conf || diff

  const StatItem = ({ n, l }) => (
    <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6, padding: '1rem', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
      <div style={{ fontSize: '.65rem', color: 'var(--g500)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.2rem' }}>{l}</div>
    </div>
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
            <StatItem n={stats.total} l="Total entries" />
            <StatItem n={stats.sectors} l="Sectors" />
            <StatItem n={stats.pd} l="Public domain" />
            <StatItem n={stats.pool} l="Patent pools" />
            <StatItem n={stats.cl} l="Compulsory lic." />
            <StatItem n="54" l="Countries served" />
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          <input type="text" placeholder="Search technology, sector, country, keyword…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '.75rem 1.1rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontFamily: "'DM Sans',sans-serif", fontSize: '.88rem', outline: 'none' }} />
          {[
            { val: sector, set: setSector, opts: ['All sectors', ...SECTORS], key: 'sector' },
            { val: access, set: setAccess, opts: ['All access types','Public Domain','Patent Pool','Compulsory License'], key: 'access' },
            { val: conf, set: setConf, opts: ['All confidence levels','DTO Verified','Partially Verified','Legal Review Required'], key: 'conf' },
            { val: diff, set: setDiff, opts: ['All difficulties','Low','Medium','High'], key: 'diff' },
          ].map(({ val, set, opts, key }) => (
            <select key={key} value={val} onChange={e => set(e.target.value === opts[0] ? '' : e.target.value)}
              style={{ padding: '.75rem 1rem', background: '#1a3566', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontSize: '.85rem', outline: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
              {opts.map(o => <option key={o} value={o === opts[0] ? '' : o} style={{ background: '#0f2444', color: '#fafaf8' }}>{o}</option>)}
            </select>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>
            {loading ? 'Loading…' : `${patents.length} entr${patents.length === 1 ? 'y' : 'ies'}${hasFilter ? ' matching your filters' : ''}`}
          </div>
          {hasFilter && <button className="btn-ghost" onClick={clear}>Clear all filters</button>}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.2rem' }}>
        {loading && [0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
        {!loading && error && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="notice notice-error">{error}</div>
            <button className="btn btn-outline btn-sm" onClick={load} style={{ marginTop: '1rem' }}>Try again</button>
          </div>
        )}
        {!loading && !error && patents.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--g500)' }}>
            No results match your filters. <button className="btn-ghost" onClick={clear}>Clear filters</button>
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

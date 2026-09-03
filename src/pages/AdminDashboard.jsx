import { useState, useEffect } from 'react'
import { signOut } from '../lib/auth.js'
import {
  getAllPatents, addPatent, updatePatent, deletePatent,
  togglePublished, getAuditLog, getConsultations,
  updateConsultationStatus, getSubscribers, getTopViewed
} from '../lib/admin.js'
import PatentForm from '../components/PatentForm.jsx'

const CONF = {
  'DTO Verified':          { bg:'rgba(27,94,32,.25)', col:'#81c784', bdr:'rgba(27,94,32,.4)', ic:'✓' },
  'Partially Verified':    { bg:'rgba(184,76,0,.25)', col:'#ffb74d', bdr:'rgba(184,76,0,.4)', ic:'◑' },
  'Legal Review Required': { bg:'rgba(192,57,43,.2)',  col:'#ff8080', bdr:'rgba(192,57,43,.4)', ic:'⚠' },
}

export default function AdminDashboard({ navigate }) {
  const [tab,     setTab]     = useState('patents')   // 'patents'|'consult'|'subs'|'analytics'|'audit'
  const [view,    setView]    = useState('list')      // 'list'|'add'|'edit'
  const [patents, setPatents] = useState([])
  const [editing, setEditing] = useState(null)
  const [search,  setSearch]  = useState('')
  const [sector,  setSector]  = useState('')
  const [sort,    setSort]    = useState('newest') // newest | az
  const [loading, setLoading] = useState(true)
  const [toast,   setToast]   = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [consult, setConsult] = useState([])
  const [subs,    setSubs]    = useState([])
  const [topViewed, setTopViewed] = useState([])
  const [auditLog, setAuditLog]   = useState([])

  const load = async () => {
    setLoading(true)
    try { setPatents(await getAllPatents()) }
    catch { showToast('Failed to load patents','error') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (tab === 'consult') getConsultations().then(setConsult).catch(()=>{})
    if (tab === 'subs') getSubscribers().then(setSubs).catch(()=>{})
    if (tab === 'analytics') getTopViewed().then(setTopViewed).catch(()=>{})
    if (tab === 'audit') getAuditLog().then(setAuditLog).catch(()=>{})
  }, [tab])

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleAdd = async (entry) => {
    setSaving(true)
    try { const d = await addPatent(entry); setPatents(p => [...p, d]); setView('list'); showToast(`"${d.name}" added.`) }
    catch (e) { showToast('Add failed: ' + e.message, 'error') }
    finally { setSaving(false) }
  }

  const handleUpdate = async (entry) => {
    setSaving(true)
    try { const d = await updatePatent(editing.id, entry); setPatents(p => p.map(x => x.id === editing.id ? d : x)); setView('list'); setEditing(null); showToast(`"${d.name}" updated.`) }
    catch (e) { showToast('Update failed: ' + e.message, 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    setSaving(true)
    const name = patents.find(p => p.id === id)?.name
    try { await deletePatent(id, name); setPatents(p => p.filter(x => x.id !== id)); setConfirm(null); showToast(`"${name}" deleted.`) }
    catch (e) { showToast('Delete failed: ' + e.message, 'error') }
    finally { setSaving(false) }
  }

  const handleToggle = async (id, current) => {
    try { const d = await togglePublished(id, current); setPatents(p => p.map(x => x.id === id ? d : x)); showToast(d.is_published ? 'Published.' : 'Set to draft.') }
    catch (e) { showToast('Toggle failed: ' + e.message, 'error') }
  }

  const filtered = patents.filter(p => {
    const q = search.toLowerCase()
    return (!q || p.name.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q) || (p.countries||'').toLowerCase().includes(q) || (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q))))
        && (!sector || p.sector === sector)
  }).sort((a, b) => sort === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : a.name.localeCompare(b.name))
  const sectors = [...new Set(patents.map(p => p.sector))].sort()
  const stats = {
    total: patents.length,
    published: patents.filter(p => p.is_published).length,
    drafts: patents.filter(p => !p.is_published).length,
    pd: patents.filter(p => p.access_type === 'Public Domain').length,
    pool: patents.filter(p => p.access_type === 'Patent Pool').length,
    cl: patents.filter(p => p.access_type === 'Compulsory License').length,
  }

  const tabStyle = (t) => ({
    padding: '.55rem 1.2rem', borderRadius: 4, border: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans',sans-serif", fontSize: '.82rem', transition: 'all .15s',
    background: tab === t ? 'rgba(200,168,75,.15)' : 'transparent',
    color: tab === t ? 'var(--gold)' : 'var(--g500)',
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,36,68,.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(200,168,75,.2)', padding: '.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="eyebrow" style={{ marginBottom: 0 }}>Admin Dashboard</div>
          {view !== 'list' && <button onClick={() => { setView('list'); setEditing(null) }} style={{ background: 'none', border: 'none', color: 'var(--g300)', cursor: 'pointer', fontSize: '.82rem', fontFamily: "'DM Sans',sans-serif" }}>← Back to list</button>}
        </div>
        <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
          <button onClick={() => navigate('library')} style={{ background: 'none', border: 'none', color: 'var(--g500)', cursor: 'pointer', fontSize: '.8rem', fontFamily: "'DM Sans',sans-serif" }}>View public library →</button>
          <button onClick={() => { signOut(); navigate('home') }} className="btn btn-outline btn-sm">Sign Out</button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200, background: toast.type === 'error' ? 'rgba(192,57,43,.95)' : 'rgba(27,94,32,.95)', border: '1px solid transparent', borderRadius: 6, padding: '1rem 1.5rem', color: '#fff', fontSize: '.88rem', maxWidth: 380, boxShadow: '0 4px 20px rgba(0,0,0,.4)' }}>
          {toast.type === 'error' ? '✗ ' : '✓ '}{toast.msg}
        </div>
      )}

      {/* Delete confirm modal */}
      {confirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--navy-mid)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 8, padding: '2rem', maxWidth: 400, width: '100%', margin: '1rem' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', marginBottom: '.7rem' }}>Delete this entry?</div>
            <div style={{ fontSize: '.88rem', color: 'var(--g300)', marginBottom: '1.5rem', lineHeight: 1.6 }}><strong style={{ color: 'var(--white)' }}>{patents.find(p => p.id === confirm)?.name}</strong> will be permanently removed. This cannot be undone.</div>
            <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setConfirm(null)} disabled={saving}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(confirm)} disabled={saving}>{saving ? 'Deleting…' : 'Delete permanently'}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.8rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(200,168,75,.1)', paddingBottom: '.8rem' }}>
          {[['patents','Patents'],['consult','Consultations'],['subs','Subscribers'],['analytics','Analytics'],['audit','Audit Log']].map(([k, l]) => (
            <button key={k} style={tabStyle(k)} onClick={() => { setTab(k); setView('list') }}>{l}</button>
          ))}
        </div>

        {/* ── PATENTS TAB */}
        {tab === 'patents' && view === 'list' && (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[['Total',stats.total],['Published',stats.published],['Drafts',stats.drafts],['Public Domain',stats.pd],['Patent Pool',stats.pool],['Comp. Lic.',stats.cl]].map(([l,n]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6, padding: '1.1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                  <div style={{ fontSize: '.62rem', color: 'var(--g500)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.25rem' }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '.8rem', marginBottom: '.8rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Search name or sector…" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200, padding: '.75rem 1rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', outline: 'none' }} />
              <select value={sector} onChange={e => setSector(e.target.value)} style={{ padding: '.75rem 1rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', outline: 'none' }}>
                <option value="">All sectors</option>
                {sectors.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '.75rem 1rem', background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 4, color: 'var(--gold)', fontFamily: "'DM Sans',sans-serif", fontSize: '.85rem', outline: 'none', cursor: 'pointer' }}>
                <option value="newest" style={{background:'#0f2444',color:'#fafaf8'}}>Newest first</option>
                <option value="az" style={{background:'#0f2444',color:'#fafaf8'}}>A → Z</option>
              </select>
              <button className="btn btn-gold" onClick={() => setView('add')}>+ Add Entry</button>
            </div>

            <div style={{ fontSize: '.78rem', color: 'var(--g500)', marginBottom: '1rem' }}>{loading ? 'Loading…' : `${filtered.length} of ${patents.length} entries`}</div>

            {/* Table */}
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr .8fr auto', padding: '.7rem 1.2rem', background: 'rgba(200,168,75,.05)', borderBottom: '1px solid rgba(200,168,75,.15)' }}>
                {['Technology','Sector','Access Type','Status','Actions'].map(h => (
                  <div key={h} style={{ fontFamily: "'DM Mono',monospace", fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{h}</div>
                ))}
              </div>

              {loading && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--g500)' }}>Loading…</div>}
              {!loading && filtered.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--g500)' }}>No results.</div>}

              {!loading && filtered.map((p, i) => {
                const cs = CONF[p.confidence] || CONF['DTO Verified']
                return (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr .8fr auto', padding: '.85rem 1.2rem', alignItems: 'center', borderBottom: i < filtered.length-1 ? '1px solid rgba(200,168,75,.07)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '.88rem', color: 'var(--white)', marginBottom: '.1rem' }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', marginTop: '.15rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '.65rem', padding: '.15rem .55rem', borderRadius: '2rem', background: cs.bg, color: cs.col, border: `1px solid ${cs.bdr}`, fontFamily: "'DM Mono',monospace" }}>{cs.ic} {p.confidence}</span>
                        {p.view_count > 0 && <span style={{ fontSize: '.6rem', color: 'var(--g700)' }}>{p.view_count} views</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: '.78rem', color: 'var(--g300)' }}>{p.sector}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--g300)' }}>{p.access_type}</div>
                    <div>
                      <button onClick={() => handleToggle(p.id, p.is_published)} style={{ fontSize: '.68rem', padding: '.2rem .6rem', borderRadius: '2rem', border: '1px solid', cursor: 'pointer', fontFamily: "'DM Mono',monospace", background: p.is_published ? 'rgba(27,94,32,.2)' : 'rgba(138,128,112,.1)', color: p.is_published ? 'var(--green-col)' : 'var(--g500)', borderColor: p.is_published ? 'var(--green-bdr)' : 'rgba(138,128,112,.3)' }}>
                        {p.is_published ? 'Published' : 'Draft'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '.4rem' }}>
                      <button onClick={() => { setEditing(p); setView('edit') }} style={{ padding: '.3rem .75rem', background: 'rgba(200,168,75,.1)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 3, color: 'var(--gold)', cursor: 'pointer', fontSize: '.75rem', fontFamily: "'DM Sans',sans-serif" }}>Edit</button>
                      <button onClick={() => setConfirm(p.id)} className="btn-danger" style={{ padding: '.3rem .75rem', fontSize: '.75rem' }}>Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {tab === 'patents' && view === 'add' && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.4rem' }}>Add New Entry</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '1.8rem' }}>New Patent / Technology Entry</h3>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.15)', borderRadius: 8, padding: '2rem' }}>
              <PatentForm onSave={handleAdd} onCancel={() => setView('list')} saving={saving} />
            </div>
          </div>
        )}

        {tab === 'patents' && view === 'edit' && editing && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.4rem' }}>Edit Entry</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '.4rem' }}>{editing.name}</h3>
            <div style={{ fontSize: '.78rem', color: 'var(--g500)', marginBottom: '1.8rem' }}>ID #{editing.id} · {editing.sector} · Updated: {new Date(editing.updated_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.15)', borderRadius: 8, padding: '2rem' }}>
              <PatentForm initial={editing} onSave={handleUpdate} onCancel={() => { setView('list'); setEditing(null) }} saving={saving} />
            </div>
          </div>
        )}

        {/* ── CONSULTATIONS TAB */}
        {tab === 'consult' && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.8rem' }}>Consultation Requests</div>
            <div style={{ fontSize: '.82rem', color: 'var(--g500)', marginBottom: '1.5rem' }}>{consult.length} total request{consult.length !== 1 ? 's' : ''}</div>
            {consult.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--g500)' }}>No consultation requests yet.</div>
            ) : consult.map(c => (
              <div key={c.id} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6, padding: '1.3rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '.7rem' }}>
                  <div>
                    <strong style={{ fontSize: '.95rem', color: 'var(--white)', display: 'block' }}>{c.name} · {c.organisation}</strong>
                    <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>{c.country} · <a href={`mailto:${c.email}`} style={{ color: 'var(--gold)' }}>{c.email}</a></div>
                    {c.sector && <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>Sector: {c.sector}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '.65rem', padding: '.2rem .6rem', borderRadius: '2rem', fontFamily: "'DM Mono',monospace", background: c.status === 'new' ? 'rgba(200,168,75,.15)' : c.status === 'replied' ? 'rgba(27,94,32,.2)' : 'rgba(138,128,112,.1)', color: c.status === 'new' ? 'var(--gold)' : c.status === 'replied' ? 'var(--green-col)' : 'var(--g500)', border: '1px solid', borderColor: c.status === 'new' ? 'rgba(200,168,75,.4)' : c.status === 'replied' ? 'var(--green-bdr)' : 'rgba(138,128,112,.3)' }}>{c.status}</span>
                    <select value={c.status} onChange={e => { updateConsultationStatus(c.id, e.target.value); setConsult(cs => cs.map(x => x.id === c.id ? {...x, status: e.target.value} : x)) }} style={{ padding: '.3rem .6rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(200,168,75,.2)', borderRadius: 4, color: 'var(--white)', fontSize: '.75rem', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                      <option value="new">new</option>
                      <option value="replied">replied</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                </div>
                {c.message && <div style={{ fontSize: '.82rem', color: 'var(--g300)', lineHeight: 1.7, paddingTop: '.6rem', borderTop: '1px solid rgba(200,168,75,.08)' }}>{c.message}</div>}
                <div style={{ fontSize: '.68rem', color: 'var(--g700)', marginTop: '.6rem' }}>{new Date(c.created_at).toLocaleString('en-GB',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── SUBSCRIBERS TAB */}
        {tab === 'subs' && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.8rem' }}>Newsletter Subscribers</div>
            <div style={{ fontSize: '.82rem', color: 'var(--g500)', marginBottom: '1.5rem' }}>{subs.length} subscriber{subs.length !== 1 ? 's' : ''}</div>
            {subs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--g500)' }}>No subscribers yet.</div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 8, overflow: 'hidden' }}>
                {subs.map((s, i) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.8rem 1.2rem', borderBottom: i < subs.length-1 ? '1px solid rgba(200,168,75,.07)' : 'none', alignItems: 'center' }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '.82rem', color: 'var(--white)' }}>{s.email}</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--g500)' }}>{s.source} · {new Date(s.created_at).toLocaleDateString('en-GB')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.8rem' }}>Most Viewed Entries</div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 8, overflow: 'hidden' }}>
              {topViewed.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--g500)' }}>No view data yet.</div>
              ) : topViewed.map((p, i) => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '1rem', padding: '.9rem 1.2rem', borderBottom: i < topViewed.length-1 ? '1px solid rgba(200,168,75,.07)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: 'rgba(200,168,75,.25)', minWidth: 28, textAlign: 'center' }}>{i+1}</div>
                  <div><div style={{ fontSize: '.88rem', color: 'var(--white)', fontWeight: 500 }}>{p.name}</div><div style={{ fontSize: '.72rem', color: 'var(--g500)', marginTop: '.1rem' }}>{p.sector}</div></div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)' }}>{p.view_count}</div>
                  <div style={{ fontSize: '.68rem', color: 'var(--g500)' }}>views</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AUDIT LOG TAB */}
        {tab === 'audit' && (
          <div>
            <div className="eyebrow" style={{ marginBottom: '.8rem' }}>Audit Log</div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 8, overflow: 'hidden' }}>
              {auditLog.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--g500)' }}>No audit log entries yet.</div>
              ) : auditLog.map((a, i) => (
                <div key={a.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', padding: '.8rem 1.2rem', borderBottom: i < auditLog.length-1 ? '1px solid rgba(200,168,75,.07)' : 'none', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', padding: '.2rem .6rem', borderRadius: '2rem', background: a.action === 'INSERT' ? 'rgba(27,94,32,.2)' : a.action === 'DELETE' ? 'rgba(192,57,43,.2)' : 'rgba(27,58,107,.2)', color: a.action === 'INSERT' ? 'var(--green-col)' : a.action === 'DELETE' ? 'var(--red-col)' : 'var(--blue-col)', border: '1px solid', borderColor: a.action === 'INSERT' ? 'var(--green-bdr)' : a.action === 'DELETE' ? 'var(--red-bdr)' : 'var(--blue-bdr)' }}>{a.action}</span>
                  <div>
                    <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{a.patent_name || `Patent #${a.patent_id}`}</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--g500)' }}>by {a.changed_by}</div>
                  </div>
                  <div style={{ fontSize: '.68rem', color: 'var(--g700)', whiteSpace: 'nowrap' }}>{new Date(a.changed_at).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

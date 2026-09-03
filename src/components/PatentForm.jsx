import { useState, useCallback } from 'react'

const SECTORS = [
  'Pharmaceuticals','Energy','Steel & Manufacturing','Agriculture & Food Processing',
  'Textiles & Leather','Automotive','Digital Infrastructure','Water & Sanitation',
  'Mining & Minerals','Cement & Construction','Chemicals & Plastics','Paper & Packaging'
]

// Tags grouped by sector — shown when that sector is selected
const SECTOR_TAGS = {
  'Pharmaceuticals': ['HIV','ARV','antiretroviral','malaria','antibiotic','API','MPP','WHO prequalification','paediatric','chronic disease','tropical disease','NAFDAC','SAHPRA','hepatitis','antifungal','analgesic','OTC','vaccine'],
  'Agriculture & Food Processing': ['agro-processing','food security','post-harvest','cassava','palm oil','cocoa','coffee','dairy','sugar','fertiliser','food processing','shea','moringa','fish','cold chain','women','cooperative','smallholder'],
  'Energy': ['solar','renewable energy','off-grid','rural electrification','biogas','hydropower','wind energy','battery','biofuel','ethanol','CNG','gas','power generation','CCGT'],
  'Steel & Manufacturing': ['steel','iron','smelting','heavy industry','EAF','BOF','scrap metal','circular economy','CNC','precision manufacturing','aluminium','bauxite','petroleum','refining'],
  'Textiles & Leather': ['cotton','leather','textiles','AGOA','footwear','natural fibre','tanning','weaving','spinning','dyeing','sisal','sustainable','premium'],
  'Automotive': ['automotive','engine','assembly','CNG','clean transport','Innoson','bicycle','transport','manufacturing'],
  'Digital Infrastructure': ['open source','cybersecurity','NIST','telecoms','GSM','mobile network','Linux','government','digital sovereignty','fintech','IoT'],
  'Water & Sanitation': ['water','sanitation','filtration','borehole','hand pump','rural','WASH','desalination','public health','off-grid'],
  'Mining & Minerals': ['cobalt','copper','gold','mining','mineral processing','DRC','Zambia','diamond','phosphate','hydrometallurgy','flotation','electrowinning','SX-EW','value chain'],
  'Cement & Construction': ['cement','construction','housing','affordable housing','earth block','brick','Portland cement','kiln','building materials'],
  'Chemicals & Plastics': ['chemicals','chlorine','caustic soda','soap','detergent','plastics','packaging','polypropylene','sulphuric acid','activated carbon','industrial','agricultural waste'],
  'Paper & Packaging': ['paper','packaging','cardboard','glass','pulp','forestry','e-commerce','corrugated','Kraft','manufacturing'],
}

// Tags always available regardless of sector
const COMMON_TAGS = ['Pan-African','sub-saharan','West Africa','East Africa','Southern Africa','North Africa','Central Africa','AfCFTA','value chain','import substitution','women','cooperative','sustainable','low-cost','rural']

const EMPTY = {
  name:'', sector:'Pharmaceuticals', description:'', holder:'',
  access_type:'Public Domain', available_since:'', saving:'',
  countries:'', jurisdiction_notes:'', source_link:'', notes:'',
  confidence:'DTO Verified', verified_date:'',
  implementation_difficulty:'Medium', selectedTags:[], is_published:true,
}

const inp = { marginBottom: 0 }
const lbl = { fontSize: '.75rem', color: 'var(--g300)', display: 'block', marginBottom: '.3rem' }
const hnt = { fontSize: '.72rem', color: 'var(--g500)', marginTop: '.25rem' }
const err = { fontSize: '.72rem', color: '#ff8080', marginTop: '.25rem' }
const wrp = { marginBottom: '.9rem' }

export default function PatentForm({ initial = null, onSave, onCancel, saving }) {
  const initTags = initial?.tags
    ? (Array.isArray(initial.tags) ? initial.tags : initial.tags.split(',').map(t=>t.trim()).filter(Boolean))
    : []

  const [f, setF] = useState(initial ? { ...initial, selectedTags: initTags } : { ...EMPTY })
  const [errs, setErrs] = useState({})
  const [tagInput, setTagInput] = useState('')

  const set = useCallback((k, v) => {
    setF(prev => ({ ...prev, [k]: v }))
    setErrs(prev => ({ ...prev, [k]: null }))
  }, [])

  // When sector changes, keep tags that are still relevant
  const setSector = useCallback((sector) => {
    setF(prev => ({ ...prev, sector }))
  }, [])

  const toggleTag = useCallback((tag) => {
    setF(prev => {
      const has = prev.selectedTags.includes(tag)
      return { ...prev, selectedTags: has ? prev.selectedTags.filter(t => t !== tag) : [...prev.selectedTags, tag] }
    })
  }, [])

  const addCustomTag = useCallback(() => {
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean)
    if (!tags.length) return
    setF(prev => {
      const newTags = [...prev.selectedTags]
      tags.forEach(t => { if (!newTags.includes(t)) newTags.push(t) })
      return { ...prev, selectedTags: newTags }
    })
    setTagInput('')
  }, [tagInput])

  const removeTag = useCallback((tag) => {
    setF(prev => ({ ...prev, selectedTags: prev.selectedTags.filter(t => t !== tag) }))
  }, [])

  // Get suggestions for current sector, filtered by what's typed and not already selected
  const sectorTags = SECTOR_TAGS[f.sector] || []
  const allSuggestions = [...new Set([...sectorTags, ...COMMON_TAGS])]
  const filtered = tagInput
    ? allSuggestions.filter(t => t.toLowerCase().includes(tagInput.toLowerCase()) && !f.selectedTags.includes(t))
    : allSuggestions.filter(t => !f.selectedTags.includes(t))

  const validate = () => {
    const e = {}
    if (!f.name?.trim())        e.name = 'Required'
    if (!f.description?.trim()) e.description = 'Required'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    const today = new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    // Pass selectedTags as tags — admin.js strips selectedTags before sending to Supabase
    onSave({ ...f, tags: f.selectedTags, verified_date: f.verified_date || today })
  }

  return (
    <form onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>

        {/* Technology Name — full width */}
        <div style={{ ...wrp, gridColumn: '1 / -1' }}>
          <label style={lbl}>Technology Name <span style={{color:'var(--gold)'}}>*</span></label>
          <input className="cf-input" style={{...inp, borderColor: errs.name ? '#ff8080' : undefined}}
            value={f.name} onChange={e => set('name', e.target.value)} />
          {errs.name && <div style={err}>{errs.name}</div>}
        </div>

        {/* Sector */}
        <div style={wrp}>
          <label style={lbl}>Sector <span style={{color:'var(--gold)'}}>*</span></label>
          <select className="cf-select" style={inp} value={f.sector} onChange={e => setSector(e.target.value)}>
            {SECTORS.map(o => <option key={o} value={o} style={{background:'#0f2444',color:'#fafaf8'}}>{o}</option>)}
          </select>
        </div>

        {/* Access Type */}
        <div style={wrp}>
          <label style={lbl}>Access Type <span style={{color:'var(--gold)'}}>*</span></label>
          <select className="cf-select" style={inp} value={f.access_type} onChange={e => set('access_type', e.target.value)}>
            {['Public Domain','Patent Pool','Compulsory License'].map(o => <option key={o} value={o} style={{background:'#0f2444',color:'#fafaf8'}}>{o}</option>)}
          </select>
        </div>

        {/* Holder */}
        <div style={wrp}>
          <label style={lbl}>Original Patent Holder</label>
          <input className="cf-input" style={inp} value={f.holder} onChange={e => set('holder', e.target.value)} placeholder="e.g. Pfizer Inc., BASF, Various" />
        </div>

        {/* Available Since */}
        <div style={wrp}>
          <label style={lbl}>Available Since</label>
          <input className="cf-input" style={inp} value={f.available_since} onChange={e => set('available_since', e.target.value)} placeholder="e.g. 2007, Pre-1980" />
        </div>

        {/* Source Link */}
        <div style={wrp}>
          <label style={lbl}>Source Link</label>
          <input className="cf-input" style={inp} type="url" value={f.source_link} onChange={e => set('source_link', e.target.value)} placeholder="https://patents.google.com/..." />
          <div style={hnt}>WIPO, USPTO, Espacenet, or MPP link</div>
        </div>

        {/* Confidence */}
        <div style={wrp}>
          <label style={lbl}>Confidence Rating <span style={{color:'var(--gold)'}}>*</span></label>
          <select className="cf-select" style={inp} value={f.confidence} onChange={e => set('confidence', e.target.value)}>
            {['DTO Verified','Partially Verified','Legal Review Required'].map(o => <option key={o} value={o} style={{background:'#0f2444',color:'#fafaf8'}}>{o}</option>)}
          </select>
        </div>

        {/* Verified Date */}
        <div style={wrp}>
          <label style={lbl}>Verified Date</label>
          <input className="cf-input" style={inp} value={f.verified_date} onChange={e => set('verified_date', e.target.value)} placeholder="e.g. September 2026" />
          <div style={hnt}>Leave blank to auto-set to today</div>
        </div>

        {/* Implementation Difficulty */}
        <div style={wrp}>
          <label style={lbl}>Implementation Difficulty</label>
          <select className="cf-select" style={inp} value={f.implementation_difficulty} onChange={e => set('implementation_difficulty', e.target.value)}>
            {['Low','Medium','High'].map(o => <option key={o} value={o} style={{background:'#0f2444',color:'#fafaf8'}}>{o}</option>)}
          </select>
        </div>

        {/* Cost Saving */}
        <div style={wrp}>
          <label style={lbl}>Cost Saving / Value</label>
          <input className="cf-input" style={inp} value={f.saving} onChange={e => set('saving', e.target.value)} placeholder="e.g. 40–70% cost reduction" />
        </div>

        {/* Countries — full width */}
        <div style={{ ...wrp, gridColumn: '1 / -1' }}>
          <label style={lbl}>Most Relevant Countries</label>
          <input className="cf-input" style={inp} value={f.countries} onChange={e => set('countries', e.target.value)} placeholder="e.g. Pan-African, or Nigeria, Kenya, South Africa, Ghana" />
        </div>
      </div>

      {/* Description */}
      <div style={wrp}>
        <label style={lbl}>Description <span style={{color:'var(--gold)'}}>*</span></label>
        <textarea className="cf-textarea" style={{...inp, borderColor: errs.description ? '#ff8080' : undefined}}
          value={f.description} onChange={e => set('description', e.target.value)}
          placeholder="What this technology does and why it matters for African industry." />
        {errs.description && <div style={err}>{errs.description}</div>}
      </div>

      {/* Implementation Notes */}
      <div style={wrp}>
        <label style={lbl}>Implementation Notes</label>
        <textarea className="cf-textarea" style={inp} value={f.notes} onChange={e => set('notes', e.target.value)}
          placeholder="Regulatory pathways, WIPO programmes, NAFDAC/SON requirements, legal requirements, etc." />
      </div>

      {/* Jurisdiction Notes */}
      <div style={wrp}>
        <label style={lbl}>Jurisdiction Notes</label>
        <textarea className="cf-textarea" style={inp} value={f.jurisdiction_notes} onChange={e => set('jurisdiction_notes', e.target.value)}
          placeholder="Per-country status variations, e.g. 'Patent still active in South Africa until 2028.'" />
      </div>

      {/* Tags */}
      <div style={{ ...wrp, marginBottom: '1.2rem' }}>
        <label style={lbl}>Tags</label>

        {/* Selected tags as chips */}
        {f.selectedTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.7rem' }}>
            {f.selectedTags.map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '.3rem', background: 'rgba(200,168,75,.15)', border: '1px solid rgba(200,168,75,.4)', borderRadius: '2rem', padding: '.2rem .7rem', fontSize: '.75rem', color: 'var(--gold)' }}>
                {t}
                <button type="button" onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', color: 'rgba(200,168,75,.7)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 0 }}>×</button>
              </span>
            ))}
          </div>
        )}

        {/* Free text input */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.7rem' }}>
          <input
            className="cf-input"
            style={{ ...inp, flex: 1 }}
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag() } }}
            placeholder="Type any tag and press Enter — or pick from the list below…"
          />
          <button type="button" onClick={addCustomTag}
            style={{ padding: '.6rem 1rem', background: 'rgba(200,168,75,.12)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 4, color: 'var(--gold)', cursor: 'pointer', fontSize: '.82rem', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}>
            Add
          </button>
        </div>

        {/* Sector-specific suggestions */}
        <div style={{ marginBottom: '.4rem', fontSize: '.68rem', color: 'var(--g700)', fontFamily: "'DM Mono',monospace", letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {f.sector} tags — click to add:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
          {filtered.map(t => (
            <button type="button" key={t} onClick={() => toggleTag(t)}
              style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.15)', borderRadius: '2rem', padding: '.18rem .65rem', fontSize: '.7rem', color: 'var(--g500)', cursor: 'pointer', fontFamily: "'DM Mono',monospace", transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(200,168,75,.45)'; e.currentTarget.style.color='var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(200,168,75,.15)'; e.currentTarget.style.color='var(--g500)' }}
            >{t}</button>
          ))}
        </div>
        <div style={hnt}>Tags change based on the sector selected. Type anything in the box for custom tags not in the list.</div>
      </div>

      {/* Published */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', fontSize: '.88rem', color: 'var(--g300)' }}>
          <input type="checkbox" checked={f.is_published} onChange={e => set('is_published', e.target.checked)} />
          Published (visible to public)
        </label>
        {!f.is_published && <span className="badge badge-draft">Draft — not visible publicly</span>}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" className="btn btn-gold" disabled={saving}>
          {saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Entry'}
        </button>
      </div>
    </form>
  )
}

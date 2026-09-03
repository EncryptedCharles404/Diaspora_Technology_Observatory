import { useState } from 'react'
import { submitConsultation } from '../lib/supabase.js'

const SUBMITTED_KEY = 'dto_consultation_submitted'

export default function Contact({ navigate }) {
  const alreadyDone = localStorage.getItem(SUBMITTED_KEY) === '1'
  const [done, setDone] = useState(alreadyDone)
  const [form, setForm] = useState({ name:'', organisation:'', country:'', email:'', sector:'', message:'' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({...f, [k]: v}))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.organisation || !form.country) {
      setStatus('validation'); return
    }
    setLoading(true); setStatus(null)
    try {
      await submitConsultation(form)
      localStorage.setItem(SUBMITTED_KEY, '1')
      setDone(true)
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', paddingTop: 80 }}>
      <div style={{ background: 'rgba(200,168,75,.06)', border: '1px solid rgba(200,168,75,.3)', borderRadius: 8, padding: '3rem 2rem', textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '1rem' }}>Request Received</h3>
        <p style={{ fontSize: '.9rem', color: 'var(--g300)', lineHeight: 1.8, marginBottom: '1.5rem' }}>Uzoma Charles Njoku will respond within 48 hours with a tailored consultation identifying which public domain technologies are relevant to your sector and country.<br /><br />Check your inbox — and your spam folder.</p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <button className="btn btn-gold" onClick={() => navigate('pricing')}>Browse Sector Reports</button>
          <button className="btn btn-outline" onClick={() => navigate('library')}>Browse the Library</button>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '.75rem', color: 'var(--g700)' }}>
          Not you? <button onClick={() => { localStorage.removeItem(SUBMITTED_KEY); setDone(false) }} className="btn-ghost" style={{ fontSize: '.75rem' }}>Reset this device</button>
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div className="eyebrow">Get in Touch</div>
        <h2 className="serif-title" style={{ marginBottom: '.5rem' }}>Request a Free Consultation</h2>
        <p style={{ color: 'var(--g500)', fontSize: '.9rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>Tell us about your organisation, country, and sector. Uzoma Charles Njoku will respond within 48 hours with a tailored consultation identifying which public domain technologies are relevant to your specific situation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⏱', title: '48-hour response', body: 'Personal reply from the lead researcher' },
            { icon: '🔍', title: 'Tailored to your sector', body: 'Specific technologies for your country and industry' },
            { icon: '£0', title: 'Free — once per organisation', body: 'One consultation per organisation. Reports from £49.' },
            { icon: '📄', title: 'Sector reports from £49', body: 'Full analytical reports in our Shop' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ display: 'flex', gap: '.9rem', alignItems: 'flex-start', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.12)', borderRadius: 6, padding: '1rem' }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{icon}</span>
              <div><strong style={{ color: 'var(--white)', fontSize: '.84rem', display: 'block', marginBottom: '.2rem' }}>{title}</strong><span style={{ fontSize: '.78rem', color: 'var(--g500)' }}>{body}</span></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.15)', borderRadius: 8, padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '.4rem' }}>Submit a Request</h3>
            <p style={{ fontSize: '.82rem', color: 'var(--g500)', marginBottom: '1.5rem', lineHeight: 1.6 }}>Fields marked * are required. One free consultation per organisation.</p>
            <form onSubmit={submit}>
              <label className="cf-label">Full Name *</label>
              <input className="cf-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name" required />
              <label className="cf-label">Organisation *</label>
              <input className="cf-input" value={form.organisation} onChange={e=>set('organisation',e.target.value)} placeholder="Company or institution name" required />
              <label className="cf-label">Country *</label>
              <input className="cf-input" value={form.country} onChange={e=>set('country',e.target.value)} placeholder="Your country" required />
              <label className="cf-label">Email Address *</label>
              <input className="cf-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your@company.com" required />
              <label className="cf-label">Primary Sector</label>
              <select className="cf-select" value={form.sector} onChange={e=>set('sector',e.target.value)}>
                <option value="">Select your sector…</option>
                {['Pharmaceuticals & Healthcare','Energy & Power','Steel & Heavy Manufacturing','Agriculture & Food Processing','Textiles, Leather & Apparel','Automotive & Assembly','Digital Infrastructure & Cybersecurity','Water & Sanitation','Mining & Mineral Processing','Cement & Construction','Chemicals & Plastics','Paper & Packaging','Other'].map(s => <option key={s}>{s}</option>)}
              </select>
              <label className="cf-label">What technology costs concern you most?</label>
              <textarea className="cf-textarea" value={form.message} onChange={e=>set('message',e.target.value)} placeholder="e.g. We produce cotton in Ethiopia but import all spinning and weaving machinery designs…" />
              {status === 'validation' && <div className="notice notice-error">Please fill in all required fields.</div>}
              {status === 'error' && <div className="notice notice-error">Something went wrong. Please email <a href="mailto:hello@dtoportal.com" style={{color:'var(--gold)'}}>hello@dtoportal.com</a> directly.</div>}
              <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={loading}>{loading ? 'Sending…' : 'Request Free Consultation'}</button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { lbl: 'Direct Email', val: <a href="mailto:hello@dtoportal.com" style={{color:'var(--gold)',textDecoration:'none'}}>hello@dtoportal.com</a> },
              { lbl: 'LinkedIn', val: <a href="https://www.linkedin.com/in/uzoma-charles-njoku" target="_blank" rel="noopener noreferrer" style={{color:'var(--gold)',textDecoration:'none'}}>linkedin.com/in/uzoma-charles-njoku</a> },
              { lbl: 'Based In', val: 'United Kingdom — serving all 54 AfCFTA nations' },
              { lbl: 'Response Time', val: 'Within 48 hours — one free consultation per organisation' },
            ].map(({ lbl, val }) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 6, padding: '1.3rem' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.5rem' }}>{lbl}</div>
                <div style={{ fontSize: '.9rem', lineHeight: 1.7, color: 'var(--g300)' }}>{val}</div>
              </div>
            ))}
            <div style={{ background: 'rgba(200,168,75,.06)', border: '1px solid rgba(200,168,75,.25)', borderRadius: 6, padding: '1.3rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.5rem' }}>Want the Full Report?</div>
              <div style={{ fontSize: '.85rem', color: 'var(--g300)', marginBottom: '.8rem', lineHeight: 1.6 }}>Our sector reports — from £49 — include key statistics analysis, financing tables, regulatory pathways, and full implementation roadmaps for immediate download.</div>
              <button className="btn btn-outline" style={{ width: '100%', padding: '.6rem' }} onClick={() => navigate('pricing')}>Browse Reports →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

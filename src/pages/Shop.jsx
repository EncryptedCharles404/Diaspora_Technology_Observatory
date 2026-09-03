import { useState } from 'react'
import WaitlistForm from '../components/WaitlistForm.jsx'

const REPORTS = [
  { sector: 'Pharmaceuticals', title: 'Africa Pharmaceutical Patent Intelligence Report 2026', desc: '18 verified public domain drug patents — malaria, HIV, hypertension, diabetes, and infections. Includes NAFDAC pathways and WHO prequalification routes.', badges: ['18 patents','54 nations','NAFDAC pathways'], price: '£79', url: 'https://dtoportal.lemonsqueezy.com/checkout/buy/fb3c4a7c-ddbc-4bd8-895e-517fb87f35a4' },
  { sector: 'Agriculture & Food Processing', title: 'Africa Agriculture & Food Processing Technology Access Report 2026', desc: '13 verified public domain processing technologies — cassava, palm oil, cocoa, coffee, shea, rice, tomato, dairy, and more.', badges: ['13 technologies','54 nations','FAO verified'], price: '£59', url: 'https://dtoportal.lemonsqueezy.com/checkout/buy/29b01940-0e53-46ea-9a18-e92e02f32c77' },
  { sector: 'Energy', title: 'Africa Energy Technology Patent Access Report 2026', desc: '9 verified public domain energy technologies — CCGT, solar PV, small hydropower, biogas, wind turbines, and batteries.', badges: ['9 technologies','54 nations','IRENA verified'], price: '£69', url: 'https://dtoportal.lemonsqueezy.com/checkout/buy/9f8c920f-2a78-4eed-9352-d741f6adb6bf' },
  { sector: 'Mining & Minerals', title: 'Africa Mining & Minerals Technology Patent Access Report 2026', desc: '10 verified public domain mineral processing technologies — cobalt, copper, gold, phosphate, diamonds, aluminium, and steel.', badges: ['10 technologies','54 nations','USGS verified'], price: '£79', url: 'https://dtoportal.lemonsqueezy.com/checkout/buy/76bbdc16-ff4e-4460-862f-30492c739c40' },
  { sector: 'Textiles & Leather', title: 'Africa Textiles & Leather Technology Patent Access Report 2026', desc: '8 verified public domain textile and leather technologies — spinning, weaving, tanning, natural dyeing, and footwear manufacturing.', badges: ['8 technologies','54 nations','AGOA pathways'], price: '£49', url: 'https://dtoportal.lemonsqueezy.com/checkout/buy/b2c45afc-5e0f-423c-ac24-b676d4a43d3a' },
]

export default function Shop({ navigate }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div className="eyebrow" style={{ textAlign: 'center' }}>Intelligence Reports</div>
        <h2 className="serif-title" style={{ textAlign: 'center' }}>Download Your Sector Report</h2>
        <p style={{ color: 'var(--g500)', textAlign: 'center', maxWidth: 560, margin: '0 auto 3rem', fontSize: '.95rem', lineHeight: 1.7 }}>Verified public domain technology intelligence for African manufacturers, investors, and institutions. Instant download after purchase. The patent library remains free for everyone.</p>

        {/* Bundle hero */}
        <div style={{ background: 'linear-gradient(135deg,rgba(200,168,75,.12),rgba(200,168,75,.04))', border: '1px solid rgba(200,168,75,.4)', borderRadius: 8, padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '.25rem .7rem', borderRadius: '2rem', marginBottom: '.7rem' }}>Best Value</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '.4rem' }}>Complete Intelligence Bundle</div>
            <div style={{ fontSize: '.85rem', color: 'var(--g300)', marginBottom: '1rem' }}>All 5 Sector Reports — Pharmaceuticals, Agriculture, Energy, Mining & Minerals, Textiles & Leather</div>
            <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
              {['58 verified public domain technologies across 5 sectors','Key statistics analysis for every sector','NAFDAC, SON, and AfCFTA regulatory pathways','Financing routes and implementation roadmaps','Instant download — all 5 PDFs delivered immediately'].map(t => (
                <li key={t} style={{ fontSize: '.84rem', color: 'var(--g300)', padding: '.25rem 0', display: 'flex', gap: '.6rem' }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{t}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 700, color: 'var(--gold)' }}>£199</div>
                <div style={{ fontSize: '.78rem', color: 'var(--g500)' }}>Saves £136 vs buying separately</div>
              </div>
              <a href="https://dtoportal.lemonsqueezy.com/checkout/buy/b66a064b-441d-4938-bfd8-0c34a6abb1fd" className="btn btn-gold" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '.9rem 1.8rem' }}>Buy the Bundle →</a>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.2)', borderRadius: 6, padding: '1.4rem' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.5rem' }}>What's included</div>
            {[['Pharmaceuticals','£79'],['Agriculture & Food Processing','£59'],['Energy','£69'],['Mining & Minerals','£79'],['Textiles & Leather','£49']].map(([s, p]) => (
              <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0', borderBottom: '1px solid rgba(200,168,75,.1)', fontSize: '.84rem' }}>
                <span style={{ color: 'var(--g300)' }}>{s}</span><span style={{ color: 'var(--g500)', fontFamily: "'DM Mono', monospace" }}>{p}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', fontSize: '.84rem' }}><span>Total separately</span><span style={{ color: 'var(--g500)', textDecoration: 'line-through', fontFamily: "'DM Mono', monospace" }}>£335</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', borderTop: '1px solid rgba(200,168,75,.3)', color: 'var(--gold)', fontWeight: 600, fontSize: '.9rem' }}><span>Bundle price</span><span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem' }}>£199</span></div>
          </div>
        </div>

        {/* Individual reports */}
        <div className="eyebrow" style={{ marginBottom: '1rem' }}>Individual Sector Reports</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
          {REPORTS.map(r => (
            <div key={r.sector} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.15)', borderRadius: 6, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.5rem' }}>{r.sector}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '.98rem', fontWeight: 700, marginBottom: '.6rem', lineHeight: 1.3 }}>{r.title}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--g500)', lineHeight: 1.6, marginBottom: '.9rem', flex: 1 }}>{r.desc}</div>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {r.badges.map(b => <span key={b} className="badge badge-pd">{b}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)' }}>{r.price}</div>
                <a href={r.url} className="btn btn-gold btn-sm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Buy Now →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(200,168,75,.1)', borderRadius: 8, marginBottom: '3rem' }}>
          {['🔒 Secure checkout via Lemon Squeezy & Stripe','⚡ Instant PDF download after payment','✓ All data verified against primary sources','📧 Support: hello@dtoportal.com'].map(t => (
            <div key={t} style={{ fontSize: '.78rem', color: 'var(--g500)' }}>{t}</div>
          ))}
        </div>

        {/* Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { tier: 'Free', name: 'Explorer', amount: '£0', period: 'Forever free', desc: 'Full access to the public patent library plus a free 48-hour consultation.', features: ['Browse all 80+ patents in the library','Search by sector, country & access type','View full patent details & source links','Free 48-hour consultation','Coverage across all 54 AfCFTA nations'], disabled: ['Downloadable PDF sector reports','Priority turnaround','Email alerts'], cta: () => navigate('contact'), ctaLabel: 'Request Consultation', ctaClass: 'btn btn-outline' },
            { tier: 'Pro', name: 'Intelligence', amount: '£29', period: 'per month', desc: 'Priority custom reports, new patent alerts, and up to 3 sector requests per month.', badge: 'Coming Soon', features: ['Everything in Explorer','Priority 24-hour report turnaround','Email alerts — new patents in your sectors','Up to 3 custom sector report requests per month','Implementation notes & regulatory pathways'], disabled: ['Multi-user access','White-label reports'], cta: null, ctaLabel: 'Waitlist Only', ctaClass: 'btn btn-outline', featured: true },
            { tier: 'Institutional', name: 'Enterprise', amount: '£500', period: 'per year', desc: 'For universities, government agencies, development banks, incubators, and research institutions.', features: ['Everything in Pro','Multi-user access for your organisation','Unlimited sector report requests','Custom research on specific technologies','White-label reports with your branding','Quarterly intelligence briefing','Direct researcher access'], cta: () => navigate('contact'), ctaLabel: 'Enquire Now', ctaClass: 'btn btn-outline' },
          ].map(({ tier, name, amount, period, desc, badge, features, disabled, cta, ctaLabel, ctaClass, featured }) => (
            <div key={tier} style={{ background: featured ? 'rgba(200,168,75,.06)' : 'rgba(255,255,255,.04)', border: `1px solid ${featured ? 'rgba(200,168,75,.5)' : 'rgba(200,168,75,.12)'}`, borderRadius: 8, padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {badge && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--navy)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '.3rem .9rem', borderRadius: '0 0 4px 4px', whiteSpace: 'nowrap' }}>{badge}</div>}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.65rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.8rem' }}>{tier}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '.5rem' }}>{name}</div>
              <div style={{ margin: '1.2rem 0' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 700 }}>{amount}</span>
                <div style={{ fontSize: '.8rem', color: 'var(--g500)', marginTop: '.2rem' }}>{period}</div>
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--g500)', lineHeight: 1.6, marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(200,168,75,.1)' }}>{desc}</div>
              <ul style={{ listStyle: 'none', marginBottom: '1.8rem', flex: 1 }}>
                {features.map(f => <li key={f} style={{ fontSize: '.84rem', color: 'var(--g300)', padding: '.4rem 0', display: 'flex', gap: '.7rem', lineHeight: 1.5 }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{f}</li>)}
                {disabled?.map(f => <li key={f} style={{ fontSize: '.84rem', color: 'var(--g500)', padding: '.4rem 0', display: 'flex', gap: '.7rem', lineHeight: 1.5 }}><span style={{ color: 'var(--g700)' }}>—</span>{f}</li>)}
              </ul>
              <button className={ctaClass} style={{ width: '100%', padding: '.85rem', opacity: !cta ? .6 : 1, cursor: !cta ? 'default' : 'pointer' }} onClick={cta || undefined} disabled={!cta}>{ctaLabel}</button>
            </div>
          ))}
        </div>

        <WaitlistForm source="shop" title="Join the Pro Waitlist" desc="Be the first to know when Pro launches. Waitlist members get a discounted first month." />

        {/* FAQ */}
        <FAQ navigate={navigate} />
      </div>
    </div>
  )
}

function FAQ({ navigate }) {
  const [open, setOpen] = useState(null)
  const items = [
    { q: 'What format are the reports and how do I receive them?', a: 'All reports are professionally formatted PDF documents. After payment you receive an immediate download link by email and can access your files at any time through your Lemon Squeezy order page.' },
    { q: 'Is the patent library really free, permanently?', a: 'Yes. The core library — browsing all patents, viewing details, and requesting a free consultation — will always be free. The paid sector reports add five additional layers: key statistics analysis, regulatory pathways by country, financing tables, implementation roadmaps, and practical conditions tables.' },
    { q: 'Are the statistics and patent entries verified?', a: 'Yes. Every entry is verified against primary databases (WIPO PATENTSCOPE, USPTO, Espacenet, Medicines Patent Pool) and carries a DTO confidence rating and verification date. See the Methodology page for the full verification framework.' },
    { q: 'Can African universities or government agencies get institutional access?', a: 'Yes — the Institutional tier at £500 per year is specifically designed for universities, ministry departments, development finance institutions, and innovation hubs. Contact hello@dtoportal.com to discuss your organisation\'s needs.' },
    { q: 'Is this legal? Can organisations actually use these patents?', a: 'Yes. Expired patents are in the public domain — any company anywhere can use the technology without permission or payment. Patent Pool technologies require a free sublicence from the Medicines Patent Pool. Always consult your national regulatory authority before commencing manufacture.' },
  ]
  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="eyebrow" style={{ marginBottom: '1.2rem' }}>Common Questions</div>
      {items.map(({ q, a }, i) => (
        <div key={i} style={{ borderBottom: '1px solid rgba(200,168,75,.1)', padding: '1.2rem 0' }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'var(--g300)', fontSize: '.92rem', fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontFamily: "'DM Sans',sans-serif" }}>
            {q}<span style={{ color: 'var(--gold)', fontSize: '1.2rem', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div style={{ fontSize: '.84rem', color: 'var(--g500)', lineHeight: 1.7, paddingTop: '.8rem' }}>{a}</div>}
        </div>
      ))}
    </div>
  )
}

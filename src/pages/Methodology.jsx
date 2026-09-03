export default function Methodology({ navigate }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: 64 }}>
      <div className="sec narrow" style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="eyebrow">Research Standards</div>
        <h2 className="serif-title">Our Verification Methodology</h2>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.68rem', color: 'var(--gold)', letterSpacing: '.1em', marginBottom: '2.5rem' }}>Published: August 2026 · Lead Researcher: Uzoma Charles Njoku · dtoportal.com</div>

        <div className="terms-highlight">
          <p><strong style={{ color: 'var(--white)' }}>Every entry in the DTO library carries a confidence rating.</strong> This page explains exactly how we research, verify, and classify each technology — and what the limits of our research are. We provide research intelligence, not legal advice. Understanding the difference matters.</p>
        </div>

        <div className="terms-section">
          <h3>1. The Three-Tier Confidence System</h3>
          <p>Every technology entry in the DTO library is assigned one of three confidence ratings based on the depth and completeness of our verification. These ratings appear on every patent card in the library.</p>

          <div className="conf-box conf-box-v">
            <span className="conf-pill" style={{ background: 'rgba(27,94,32,.4)', border: '1px solid rgba(27,94,32,.6)', color: '#81c784' }}>DTO VERIFIED</span>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '.9rem', fontWeight: 500, marginBottom: '.4rem' }}>Full verification across all criteria</p>
              <p style={{ color: 'var(--g300)', fontSize: '.84rem', lineHeight: 1.7, marginBottom: 0 }}>Patent expiry confirmed against at least three primary databases (WIPO PATENTSCOPE, USPTO, Espacenet). Jurisdiction status checked for the primary African countries listed. No known remaining IP rights that would restrict access. At least one source of published technical documentation confirming implementation is feasible.</p>
            </div>
          </div>
          <div className="conf-box conf-box-p">
            <span className="conf-pill" style={{ background: 'rgba(184,76,0,.25)', border: '1px solid rgba(184,76,0,.5)', color: '#ffb74d' }}>PARTIALLY VERIFIED</span>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '.9rem', fontWeight: 500, marginBottom: '.4rem' }}>Primary verification complete, with noted limitations</p>
              <p style={{ color: 'var(--g300)', fontSize: '.84rem', lineHeight: 1.7, marginBottom: 0 }}>Patent expiry confirmed in primary databases. One or more African jurisdictions have not been individually checked. Some remaining IP risk identified — for example, an active trademark on the brand name for a drug whose API patent has expired.</p>
            </div>
          </div>
          <div className="conf-box conf-box-l">
            <span className="conf-pill" style={{ background: 'rgba(192,57,43,.2)', border: '1px solid rgba(192,57,43,.5)', color: '#ff8080' }}>LEGAL REVIEW REQUIRED</span>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '.9rem', fontWeight: 500, marginBottom: '.4rem' }}>Complex status — independent legal verification essential before use</p>
              <p style={{ color: 'var(--g300)', fontSize: '.84rem', lineHeight: 1.7, marginBottom: 0 }}>Patent status is complex — compulsory licensing would be required (meaning government action is needed, not just a manufacturer's decision), or jurisdiction coverage is genuinely unclear. This entry is provided for research and awareness purposes only. Do not act on it without qualified IP legal advice in your specific jurisdiction.</p>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <h3>2. Implementation Difficulty Ratings</h3>
          <p>In addition to the confidence rating, each entry carries an implementation difficulty indicator — reflecting the capital, technical expertise, and regulatory complexity typically required to manufacture this technology at commercial scale in Africa.</p>
          <ul>
            <li><strong style={{ color: 'var(--white)' }}>Low</strong> — Straightforward manufacturing process. Can be started at small-to-mid scale. Regulatory pathway well-established. Examples: Paracetamol API, Oral Rehydration Salts, Shea Butter Processing, Soap Manufacturing.</li>
            <li><strong style={{ color: 'var(--white)' }}>Medium</strong> — Moderate capital and technical requirements. Regulatory process requires dedicated attention. Examples: Cassava Processing, Dairy UHT, Chrome Leather Tanning, Biogas Digestion Systems.</li>
            <li><strong style={{ color: 'var(--white)' }}>High</strong> — Significant capital investment, specialised engineering knowledge, and complex regulatory engagement. Examples: CCGT Power Plants, Basic Oxygen Furnace Steelmaking, Gold CIP Processing, Kraft Pulping.</li>
          </ul>
          <p>Difficulty ratings are indicative, not definitive. Context matters enormously — a technology that is "High" difficulty for a first-time manufacturer may be "Low" for a company that already has the infrastructure.</p>
        </div>

        <div className="terms-section">
          <h3>3. Our Eight-Step Verification Process</h3>
          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1rem' }}>
            {[['01','Identify','We identify a specific manufacturing technology relevant to African industry — based on import data, sector research, and known gaps in African industrial capacity.'],['02','Find the Patent','We search WIPO PATENTSCOPE, the USPTO full-text database, and Espacenet for the original patent or patent family covering the core technology.'],['03','Confirm Status','We verify the expiry date against the original patent record. For Patent Pool entries, we verify current sublicence availability with the Medicines Patent Pool directly.'],['04','Map Africa Applicability','We identify which African countries the technology is most relevant to, based on industrial capacity, raw material availability, and AfCFTA trade opportunity.']].map(([n,t,d]) => (
              <div key={n} className="step-box" style={{ textAlign: 'left', padding: '1.5rem' }}><div className="step-n" style={{ fontSize: '2.5rem' }}>{n}</div><div className="step-t">{t}</div><div className="step-d">{d}</div></div>
            ))}
          </div>
          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', borderTop: 'none' }}>
            {[['05','Regulatory Pathways','We note the relevant national regulatory authority per country — NAFDAC (Nigeria), SAHPRA (South Africa), KEBS (Kenya), EDA (Egypt) — and international approval routes such as WHO prequalification.'],['06','Assess IP Risks','We check for any remaining intellectual property that could restrict access — active trademarks on brand names, trade secrets in know-how, regulatory data exclusivity, or other rights beyond the core patent.'],['07','Assign Rating','Based on all prior steps, we assign a confidence rating and implementation difficulty. The rating, difficulty, and verification date are published with every entry.'],['08','Publish & Review','We record the verification date and review entries periodically. If a legal status changes, the entry is updated and the confidence rating revised accordingly.']].map(([n,t,d]) => (
              <div key={n} className="step-box" style={{ textAlign: 'left', padding: '1.5rem' }}><div className="step-n" style={{ fontSize: '2.5rem' }}>{n}</div><div className="step-t">{t}</div><div className="step-d">{d}</div></div>
            ))}
          </div>
        </div>

        <div className="terms-section">
          <h3>4. What Patent Access Actually Means — and What It Does Not</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.2rem 0' }}>
            <div style={{ background: 'rgba(27,94,32,.1)', border: '1px solid rgba(27,94,32,.3)', borderRadius: 6, padding: '1.2rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.6rem', letterSpacing: '.15em', color: '#81c784', marginBottom: '.6rem' }}>WHAT EXPIRED PATENTS MEAN</div>
              <ul style={{ listStyle: 'none' }}>
                {['No licensing fee is required to use the manufacturing process','Any company in any country can legally use the technology','The technical specifications are in the public domain','No permission is needed from the original patent holder'].map(t => (
                  <li key={t} style={{ fontSize: '.82rem', color: 'var(--g300)', padding: '.2rem 0', display: 'flex', gap: '.6rem' }}><span style={{ color: '#81c784', flexShrink: 0 }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(184,76,0,.08)', border: '1px solid rgba(184,76,0,.25)', borderRadius: 6, padding: '1.2rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.6rem', letterSpacing: '.15em', color: '#ffb74d', marginBottom: '.6rem' }}>WHAT EXPIRED PATENTS DO NOT MEAN</div>
              <ul style={{ listStyle: 'none' }}>
                {['That regulatory approval is not required — it always is','That the brand name is free to use — trademarks are independent','That know-how and trade secrets are published — they may not be','That the patent has expired in every country — status varies by jurisdiction'].map(t => (
                  <li key={t} style={{ fontSize: '.82rem', color: 'var(--g300)', padding: '.2rem 0', display: 'flex', gap: '.6rem' }}><span style={{ color: '#ffb74d', flexShrink: 0 }}>—</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <h3>5. Primary Data Sources</h3>
          <ul>
            {[['WIPO PATENTSCOPE','patentscope.wipo.int','The World Intellectual Property Organization\'s primary international patent database'],['USPTO Full-Text Database','patents.google.com / USPTO.gov','The United States Patent and Trademark Office'],['Espacenet','epo.org','The European Patent Office\'s global patent database covering 150+ countries'],['Medicines Patent Pool','medicinespatentpool.org','For all Patent Pool entries — sublicence availability confirmed directly'],['WHO Prequalification Programme','extranet.who.int/pqweb','For pharmaceutical regulatory pathway verification'],['FAO TECA','teca.fao.org','For agricultural technology validation'],['IRENA','irena.org','For renewable energy technology verification'],['USGS Mineral Resources','usgs.gov','For mining technology and resource data']].map(([name, url, desc]) => (
              <li key={name}><strong style={{ color: 'var(--white)' }}>{name}</strong> — {url} — {desc}</li>
            ))}
          </ul>
        </div>

        <div className="terms-section">
          <h3>6. Disclaimer</h3>
          <div className="terms-highlight">
            <p style={{ color: 'var(--g300)', fontSize: '.88rem', lineHeight: 1.8, marginBottom: 0 }}>The Diaspora Technology Observatory provides <strong style={{ color: 'var(--white)' }}>research intelligence, not legal advice</strong>. Patent status and technology access rights are complex, jurisdiction-specific, and subject to change. Every entry represents our research findings as of the stated verification date. Manufacturers must conduct independent legal verification and obtain all required regulatory approvals from their national authority before manufacturing any product. DTO accepts no liability for decisions made on the basis of this research. Seek independent qualified IP legal advice in your specific country of manufacture before proceeding.</p>
          </div>
        </div>

        <div className="terms-section">
          <h3>7. Update and Review Cycle</h3>
          <ul>
            <li>Public Domain entries — reviewed annually, as expiry is permanent once confirmed</li>
            <li>Patent Pool entries — reviewed every 6 months, as sublicence terms can change</li>
            <li>Compulsory License entries — reviewed quarterly, as these depend on government policy</li>
            <li>To report an error in any entry: <a href="mailto:hello@dtoportal.com" style={{ color: 'var(--gold)' }}>hello@dtoportal.com</a> — we will investigate and update within 48 hours</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(200,168,75,.15)' }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('library')}>Browse the Library →</button>
          <button className="btn btn-gold btn-sm" onClick={() => navigate('contact')}>Request a Consultation</button>
        </div>
      </div>
    </div>
  )
}

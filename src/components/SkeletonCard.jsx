export default function SkeletonCard() {
  return (
    <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(200,168,75,.08)', borderRadius: 6, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
      <div className="skeleton" style={{ height: 12, width: '40%', borderRadius: 3 }} />
      <div className="skeleton" style={{ height: 20, width: '85%', borderRadius: 3 }} />
      <div className="skeleton" style={{ height: 12, width: '100%', borderRadius: 3 }} />
      <div className="skeleton" style={{ height: 12, width: '90%', borderRadius: 3 }} />
      <div className="skeleton" style={{ height: 12, width: '70%', borderRadius: 3 }} />
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.4rem' }}>
        <div className="skeleton" style={{ height: 28, width: 90, borderRadius: 3 }} />
        <div className="skeleton" style={{ height: 28, width: 110, borderRadius: 3 }} />
      </div>
    </div>
  )
}

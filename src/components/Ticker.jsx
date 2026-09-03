const ITEMS = [
  'PHARMACEUTICALS ◆ 70% OF NIGERIAN MEDICINES IMPORTED — MANUFACTURING TECH IS PUBLIC DOMAIN',
  'ENERGY ◆ NIGERIA DELIVERS 4,500 MW AGAINST 30,000 MW DEMAND — CCGT TECH IS FREE',
  'MINING ◆ AFRICA HOLDS 54% OF GLOBAL COBALT RESERVES — REFINED PREDOMINANTLY ELSEWHERE',
  'TEXTILES ◆ US$73.6 BILLION AFRICAN MARKET — ALL CORE MACHINERY PATENTS EXPIRED',
  'AGRICULTURE ◆ 30–40% OF AFRICAN HARVESTS LOST TO SPOILAGE — PROCESSING TECH IS FREE',
  'COCOA ◆ AFRICA PRODUCES 75% OF GLOBAL SUPPLY — RETAINS LESS THAN 10% OF VALUE',
  'STEEL ◆ AFRICA IMPORTED US$15 BILLION IN STEEL IN 2022 — BOF STEELMAKING IS PUBLIC DOMAIN',
  'LEATHER ◆ CHROME TANNING ADDS 3–8× RAW HIDE VALUE — ALL PATENTS EXPIRED',
  'PHOSPHATE ◆ MOROCCO HOLDS 75% OF GLOBAL RESERVES — AFRICA PAYS US$5B/YEAR FOR FERTILISER',
  'SOLAR ◆ AFRICA IMPORTED US$2 BILLION IN SOLAR PANELS IN 2023 — FIRST-GEN PV PATENTS EXPIRED',
  'SHEA ◆ US$2B+ GLOBAL MARKET — EXTRACTION TECH IS 100% PUBLIC DOMAIN',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ background: 'rgba(200,168,75,.08)', borderTop: '1px solid rgba(200,168,75,.15)', borderBottom: '1px solid rgba(200,168,75,.15)', padding: '.65rem 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', animation: 'ticker 60s linear infinite', width: 'max-content' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: '.68rem', letterSpacing: '.12em', color: 'var(--gold)' }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

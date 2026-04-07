import Link from 'next/link';

const features = [
  { num: '01', emoji: '🧮', title: 'Carbon Footprint Calculator', desc: 'Kira pelepasan karbon harian anda berdasarkan pengangkutan, elektrik, penerbangan dan diet. Dapatkan laporan peribadi dan cadangan.', href: '/calculator' },
  { num: '02', emoji: '🌾', title: 'Info Go Green Agriculture', desc: 'Pelajari cara pertanian moden boleh kurangkan karbon dan bantu alam sekitar Malaysia.', href: '/agriculture' },
  { num: '03', emoji: '💡', title: 'Tips Kurangkan Carbon', desc: 'Panduan praktikal — jimat elektrik, kitar semula, pengangkutan hijau dan banyak lagi.', href: '/tips' },
  { num: '04', emoji: '🧩', title: 'Quiz Kesedaran Karbon', desc: 'Uji pengetahuan anda tentang perubahan iklim dan jejak karbon dengan soalan interaktif.', href: '/quiz' },
  { num: '05', emoji: '📊', title: 'Infografik Climate Change', desc: 'Visual data perubahan iklim global yang mudah difahami oleh semua.', href: '/infografik' },
];

const miniCards = [
  { icon: '🚗', label: 'Pengangkutan', val: '2.8t', bg: '#e8f5e9', delay: '0.5s' },
  { icon: '⚡', label: 'Elektrik', val: '2.1t', bg: '#fff8e1', delay: '1s' },
  { icon: '🍽️', label: 'Makanan', val: '1.6t', bg: '#fce4ec', delay: '1.5s' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        {/* Left: text */}
        <div className="hero-text">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.2)',
            padding: '0.4rem 1rem', borderRadius: '2rem',
            fontSize: '0.8rem', color: '#2d6a4f', fontWeight: 500, marginBottom: '1.5rem',
          }}>
            🌿 Platform Kesedaran Iklim Malaysia
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: 1.05,
            color: '#1a3a2a', letterSpacing: '-2px', marginBottom: '1.2rem',
          }}>
            Jejak &amp; Kurangkan<br />
            <span style={{ color: '#2d6a4f', borderBottom: '3px solid #74c69d' }}>Karbon</span> Kita
          </h1>

          <p style={{ color: '#5a7a68', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 440, marginBottom: '2.5rem' }}>
            Platform interaktif untuk pelajar belajar tentang jejak karbon, pertanian lestari, dan cara hidup lebih mesra alam.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/calculator" style={{
              background: '#1a3a2a', color: '#b7e4c7',
              padding: '0.85rem 2rem', borderRadius: '3rem',
              textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
              display: 'inline-block',
            }}>
              Cuba Kalkulator →
            </Link>
            <Link href="/quiz" style={{
              background: 'transparent', color: '#1a3a2a',
              border: '1.5px solid #1a3a2a',
              padding: '0.85rem 2rem', borderRadius: '3rem',
              textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
              display: 'inline-block',
            }}>
              Ambil Quiz
            </Link>
          </div>
        </div>

        {/* Right: stat visual */}
        <div className="hero-visual">
          {/* Main stat card */}
          <div style={{
            background: 'white', borderRadius: 20, padding: '1.5rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
            border: '1px solid rgba(116,198,157,0.2)', width: 260,
            animation: 'float 4s ease-in-out infinite',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: '0.75rem', color: '#5a7a68', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Jejak Karbon Malaysia</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.8rem', fontWeight: 800, color: '#1a3a2a', lineHeight: 1 }}>8.0</div>
            <div style={{ fontSize: '0.85rem', color: '#5a7a68', marginBottom: '1rem' }}>tan CO₂ / tahun / orang</div>
            <div style={{ height: 8, background: 'rgba(116,198,157,0.2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #74c69d, #2d6a4f)', borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#5a7a68', marginTop: '0.5rem' }}>Sasaran dunia: 2.0 tan/tahun</div>
          </div>

          {/* Mini cards — hidden on mobile */}
          <div className="mini-cards">
            {miniCards.map(c => (
              <div key={c.label} style={{
                background: 'white', borderRadius: 14, padding: '0.8rem 1rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                border: '1px solid rgba(116,198,157,0.15)',
                animation: `float 4s ease-in-out infinite ${c.delay}`,
                whiteSpace: 'nowrap',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1a3a2a' }}>{c.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#5a7a68' }}>{c.val} CO₂/tahun</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ background: '#1a3a2a', padding: '3rem 1.5rem', color: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { val: '8.0t', label: 'CO₂ per kapita Malaysia/tahun' },
            { val: '2.0t', label: 'Sasaran global per orang' },
            { val: '30%', label: 'Boleh dikurang dengan tabiat harian' },
            { val: '5', label: 'Cara untuk mulakan sekarang' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#74c69d' }}>{s.val}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: '#0d1f17', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74c69d', fontWeight: 600, marginBottom: '1rem' }}>Ciri-ciri Utama</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', marginBottom: '3rem', maxWidth: 500 }}>
            5 Cara Kami Bantu Anda Faham Iklim
          </h2>

          <div className="features-grid">
            {features.map((f, i) => (
              <Link key={f.num} href={f.href} className={`feature-card${i === 0 ? ' feature-card--wide' : ''}`}>
                <div style={{ fontSize: '0.7rem', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#74c69d', opacity: 0.6, marginBottom: '1rem', letterSpacing: '0.1em' }}>{f.num}</div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.emoji}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
                <div style={{
                  position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(116,198,157,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#74c69d', fontSize: '0.9rem',
                }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0d1f17', color: 'rgba(255,255,255,0.5)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: 28, height: 28, background: '#1a3a2a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(116,198,157,0.3)' }}>
              <Leaf size={14} color="#74c69d" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#74c69d', fontSize: '1.1rem' }}>EkoKarbon</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>Platform kesedaran iklim untuk pelajar Malaysia. Jejak, faham, dan kurangkan karbon kita bersama.</p>
        </div>

        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>Ciri-ciri</h4>
          {[
            { href: '/calculator', label: 'Kalkulator Karbon' },
            { href: '/agriculture', label: 'Info Pertanian Hijau' },
            { href: '/tips', label: 'Tips Kurangkan Karbon' },
            { href: '/quiz', label: 'Quiz Kesedaran' },
            { href: '/infografik', label: 'Infografik Iklim' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ display: 'block', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>Rujukan Data</h4>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
            Faktor emisi berdasarkan data Suruhanjaya Tenaga Malaysia, MESTECC, dan metodologi carbonfootprint.com.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '0.8rem' }}>
        © 2025 EkoKarbon — Dibina untuk masa depan yang lebih hijau 🌿
      </div>
    </footer>
  );
}

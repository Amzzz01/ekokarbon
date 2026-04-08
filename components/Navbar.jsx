'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShieldCheck } from 'lucide-react';

const links = [
  { href: '/', label: 'Utama' },
  { href: '/calculator', label: 'Kalkulator' },
  { href: '/agriculture', label: 'Pertanian' },
  { href: '/tips', label: 'Tips' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/infografik', label: 'Infografik' },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(248,244,239,0.9)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(45,106,79,0.12)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo — always visible */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#1a3a2a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#74c69d" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#1a3a2a', letterSpacing: '-0.5px' }}>
            Eko<span style={{ color: '#74c69d' }}>Karbon</span>
          </span>
        </Link>

        {/* Desktop links + admin icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="navbar-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: path === l.href ? '#1a3a2a' : '#5a7a68',
                background: path === l.href ? 'rgba(116,198,157,0.2)' : 'transparent',
                transition: 'all 0.2s',
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Admin icon — visible on all screen sizes */}
          <Link href="/admin/login" title="Admin Panel" style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: '#1a3a2a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <ShieldCheck size={17} color="#74c69d" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { login } from '@/lib/adminAuth';

const inputWrap = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: '#f0f7f4', border: '1px solid rgba(45,106,79,0.18)',
  borderRadius: 12, padding: '11px 14px',
};
const inputBase = {
  flex: 1, background: 'transparent', border: 'none', outline: 'none',
  fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: '#1a3a2a',
};
const label = {
  fontSize: 11, fontWeight: 500, color: '#5a7a68',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'block',
};
const ctaBtn = (disabled) => ({
  background: '#1a3a2a', color: '#b7e4c7', border: 'none',
  borderRadius: 16, padding: 15, fontSize: 15, fontWeight: 500,
  width: '100%', cursor: disabled ? 'not-allowed' : 'pointer',
  fontFamily: 'DM Sans, sans-serif', opacity: disabled ? 0.7 : 1,
});

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(45,106,79,0.12)' }} />
      <span style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>atau</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(45,106,79,0.12)' }} />
    </div>
  );
}

function LeafBadge({ size = 56 }) {
  return (
    <div style={{
      width: size, height: size, background: '#1a3a2a', borderRadius: size * 0.28,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Leaf size={size * 0.45} color="#74c69d" />
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch {
      setError('Email atau kata laluan tidak sah.');
    } finally {
      setLoading(false);
    }
  }

  const formFields = (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
          {error}
        </div>
      )}
      <div>
        <span style={label}>Email</span>
        <div style={inputWrap}>
          <Mail size={16} color="#5a7a68" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@ekokarbon.my" style={inputBase} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ ...label, marginBottom: 0 }}>Kata Laluan</span>
          <Link href="#" style={{ fontSize: 12, color: '#5a7a68', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>Lupa kata laluan?</Link>
        </div>
        <div style={inputWrap}>
          <Lock size={16} color="#5a7a68" />
          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={inputBase} />
          <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#5a7a68', display: 'flex' }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={loading} style={ctaBtn(loading)}>
        {loading ? 'Sedang log masuk...' : 'Log Masuk'}
      </button>
    </form>
  );

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="admin-mobile" style={{ minHeight: '100vh', background: '#1a3a2a', position: 'relative', overflow: 'hidden' }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px 0', color: '#b7e4c7', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span>▲▲▲</span><span>WiFi</span><span>🔋</span>
          </div>
        </div>

        {/* Back pill */}
        <div style={{ padding: '12px 20px' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.1)', borderRadius: '3rem',
            padding: '7px 14px', color: '#b7e4c7', fontSize: 13,
            textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
          }}>← Laman Utama</Link>
        </div>

        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 1rem 7rem' }}>
          <div style={{
            width: 72, height: 72, background: 'rgba(255,255,255,0.1)',
            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
          }}>
            <Leaf size={32} color="#74c69d" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: '#fff' }}>EkoKarbon</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#74c69d', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>Admin Panel</span>
        </div>

        {/* White bottom sheet */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#fff', borderRadius: '32px 32px 0 0',
          padding: '28px 24px 40px',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#5a7a68', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
            Log masuk untuk meneruskan
          </p>
          {formFields}
          <Divider />
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>
            Belum ada akaun?{' '}
            <Link href="/admin/register" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Daftar</Link>
          </p>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="admin-desktop" style={{
        minHeight: '100vh', background: '#1a3a2a',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: 24, padding: '40px',
          width: '100%', maxWidth: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}>
          {/* Back link */}
          <Link href="/" style={{ display: 'block', fontSize: 13, color: '#5a7a68', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', marginBottom: 28 }}>
            ← Laman Utama
          </Link>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <LeafBadge size={56} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#1a3a2a', marginTop: 12 }}>EkoKarbon</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#74c69d', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>Admin Panel</span>
          </div>

          {formFields}
          <Divider />
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>
            Belum ada akaun?{' '}
            <Link href="/admin/register" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Daftar</Link>
          </p>
        </div>
      </div>
    </>
  );
}

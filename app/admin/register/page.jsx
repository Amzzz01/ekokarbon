'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Leaf, Check } from 'lucide-react';
import { register } from '@/lib/adminAuth';

const mobileInputWrap = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: '#f0f7f4', border: '1px solid rgba(45,106,79,0.18)',
  borderRadius: 12, padding: '11px 14px',
};
const mobileInputBase = {
  flex: 1, background: 'transparent', border: 'none', outline: 'none',
  fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: '#1a3a2a',
};
const mobileLabel = {
  fontSize: 11, fontWeight: 500, color: '#5a7a68',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'block',
};
const desktopInputStyle = {
  width: '100%', padding: '10px 14px',
  border: '1px solid rgba(45,106,79,0.2)', borderRadius: 8,
  fontSize: 14, outline: 'none', boxSizing: 'border-box',
  fontFamily: 'DM Sans, sans-serif',
};

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
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
      await register(name, email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  }

  const errorBox = error && (
    <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
      {error}
    </div>
  );

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="admin-mobile" style={{ minHeight: '100vh', background: '#1a3a2a', position: 'relative', overflow: 'hidden' }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px 0', color: '#b7e4c7', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6 }}><span>▲▲▲</span><span>WiFi</span><span>🔋</span></div>
        </div>

        {/* Back pill */}
        <div style={{ padding: '12px 20px' }}>
          <Link href="/admin/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.1)', borderRadius: '3rem',
            padding: '7px 14px', color: '#b7e4c7', fontSize: 13,
            textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
          }}>← Log Masuk</Link>
        </div>

        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 1rem 7rem' }}>
          <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.1)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Leaf size={32} color="#74c69d" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: '#fff' }}>Cipta Akaun</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>Daftar sebagai admin baru</span>
        </div>

        {/* White bottom sheet */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '32px 32px 0 0', padding: '28px 24px 40px', maxHeight: '72vh', overflowY: 'auto' }}>
          {errorBox}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <span style={mobileLabel}>Nama</span>
              <div style={mobileInputWrap}>
                <User size={15} color="#5a7a68" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Nama penuh" style={mobileInputBase} />
              </div>
            </div>
            <div>
              <span style={mobileLabel}>Email</span>
              <div style={mobileInputWrap}>
                <Mail size={15} color="#5a7a68" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@ekokarbon.my" style={mobileInputBase} />
              </div>
            </div>
            <div>
              <span style={mobileLabel}>Kata Laluan</span>
              <div style={mobileInputWrap}>
                <Lock size={15} color="#5a7a68" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 aksara" style={mobileInputBase} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#5a7a68', display: 'flex' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ background: '#1a3a2a', color: '#b7e4c7', border: 'none', borderRadius: 16, padding: 15, fontSize: 15, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
              {loading ? 'Sedang mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>
          <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}>
            Sudah ada akaun?{' '}
            <Link href="/admin/login" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Log Masuk</Link>
          </p>
        </div>
      </div>

      {/* ── DESKTOP (original design) ── */}
      <div className="admin-desktop" style={{ minHeight: '100vh', background: '#1a3a2a', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)', width: '100%', maxWidth: 400, boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#1a3a2a', marginBottom: 4 }}>Daftar Akaun</h1>
          <p style={{ color: '#5a7a68', fontSize: 14, marginBottom: 28 }}>Cipta akaun admin baru</p>
          {errorBox}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Nama</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required style={desktopInputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={desktopInputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Kata Laluan</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={desktopInputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ background: '#1a3a2a', color: '#74c69d', border: 'none', borderRadius: '3rem', padding: '12px', fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
              {loading ? 'Sedang mendaftar...' : 'Daftar'}
            </button>
          </form>
          <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center' }}>
            Sudah ada akaun?{' '}
            <a href="/admin/login" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Log Masuk</a>
          </p>
        </div>
      </div>
    </>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Leaf, Check } from 'lucide-react';
import { register } from '@/lib/adminAuth';

const inputWrap = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: '#f0f7f4', border: '1px solid rgba(45,106,79,0.18)',
  borderRadius: 12, padding: '11px 14px',
};
const inputBase = {
  flex: 1, background: 'transparent', border: 'none', outline: 'none',
  fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: '#1a3a2a',
};
const labelStyle = {
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

export default function AdminRegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Kata laluan tidak sepadan.'); return; }
    setError('');
    setLoading(true);
    try {
      await register(`${firstName} ${lastName}`.trim(), email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  }

  const formFields = (isMobile = false) => (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
          {error}
        </div>
      )}

      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <span style={labelStyle}>Nama Pertama</span>
          <div style={inputWrap}>
            <User size={15} color="#5a7a68" />
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="Ali" style={inputBase} />
          </div>
        </div>
        <div>
          <span style={labelStyle}>Nama Akhir</span>
          <div style={inputWrap}>
            <User size={15} color="#5a7a68" />
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Ahmad" style={inputBase} />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <span style={labelStyle}>Email</span>
        <div style={inputWrap}>
          <Mail size={15} color="#5a7a68" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@ekokarbon.my" style={inputBase} />
        </div>
      </div>

      {/* Password */}
      <div>
        <span style={labelStyle}>Kata Laluan</span>
        <div style={inputWrap}>
          <Lock size={15} color="#5a7a68" />
          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 aksara" style={inputBase} />
          <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#5a7a68', display: 'flex' }}>
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Confirm password */}
      <div>
        <span style={labelStyle}>Sahkan Kata Laluan</span>
        <div style={{ ...inputWrap, borderColor: confirm && confirm === password ? '#74c69d' : 'rgba(45,106,79,0.18)' }}>
          <Lock size={15} color="#5a7a68" />
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Taip semula" style={inputBase} />
          {confirm && confirm === password && <Check size={15} color="#74c69d" />}
        </div>
      </div>

      {/* Terms */}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2, accentColor: '#1a3a2a', width: 15, height: 15, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.5 }}>
          Saya bersetuju dengan{' '}
          <Link href="#" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Terma Perkhidmatan</Link>
          {' '}dan{' '}
          <Link href="#" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Dasar Privasi</Link>
        </span>
      </label>

      <button type="submit" disabled={loading || !agreed} style={ctaBtn(loading || !agreed)}>
        {loading ? 'Sedang mendaftar...' : 'Daftar Sekarang'}
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
          <Link href="/admin/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.1)', borderRadius: '3rem',
            padding: '7px 14px', color: '#b7e4c7', fontSize: 13,
            textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
          }}>← Log Masuk</Link>
        </div>

        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 1rem 7rem' }}>
          <div style={{
            width: 72, height: 72, background: 'rgba(255,255,255,0.1)',
            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
          }}>
            <Leaf size={32} color="#74c69d" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: '#fff' }}>Cipta Akaun</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>Daftar sebagai admin baru</span>
        </div>

        {/* White bottom sheet */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#fff', borderRadius: '32px 32px 0 0',
          padding: '28px 24px 40px',
          maxHeight: '78vh', overflowY: 'auto',
        }}>
          {formFields(true)}
          <Divider />
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>
            Sudah ada akaun?{' '}
            <Link href="/admin/login" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Log Masuk</Link>
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
          <Link href="/admin/login" style={{ display: 'block', fontSize: 13, color: '#5a7a68', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', marginBottom: 28 }}>
            ← Log Masuk
          </Link>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <LeafBadge size={56} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#1a3a2a', marginTop: 12 }}>Cipta Akaun</span>
            <span style={{ fontSize: 13, color: '#5a7a68', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>Daftar sebagai admin baru</span>
          </div>

          {formFields(false)}
          <Divider />
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>
            Sudah ada akaun?{' '}
            <Link href="/admin/login" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Log Masuk</Link>
          </p>
        </div>
      </div>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { login, checkEmailVerified } from '@/lib/adminAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

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

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(null); // { uid, email, name }
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('verified');
    if (v === '1') setVerifiedSuccess(true);
    if (v === 'error') setError('Pautan pengesahan tidak sah.');
    if (v === 'expired') setError('Pautan pengesahan telah tamat tempoh. Daftar semula.');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      const verified = await checkEmailVerified(user.uid);
      if (!verified) {
        setUnverifiedUser({ uid: user.uid, email: user.email, name: user.displayName });
        await signOut(auth);
        setError('Sila sahkan emel anda dahulu. Semak peti masuk anda.');
        return;
      }
      router.push('/admin/dashboard');
    } catch {
      setError('Email atau kata laluan tidak sah.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!unverifiedUser || resending) return;
    setResending(true);
    setResendSuccess(false);
    try {
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unverifiedUser),
      });
      if (res.ok) setResendSuccess(true);
      else setError('Gagal menghantar semula. Sila cuba lagi.');
    } catch {
      setError('Gagal menghantar semula. Sila cuba lagi.');
    } finally {
      setResending(false);
    }
  }

  const errorBox = error && (
    <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
      {error}
    </div>
  );

  const successBox = verifiedSuccess && (
    <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
      Emel berjaya disahkan! Sila log masuk.
    </div>
  );

  const resendBox = unverifiedUser && (
    <div style={{ marginBottom: 16 }}>
      {resendSuccess ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
          Emel pengesahan baharu telah dihantar ke <strong>{unverifiedUser.email}</strong>.
        </div>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          style={{
            width: '100%', background: 'transparent', border: '1.5px solid #1a3a2a',
            borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600,
            color: '#1a3a2a', fontFamily: 'DM Sans, sans-serif',
            cursor: resending ? 'not-allowed' : 'pointer', opacity: resending ? 0.6 : 1,
          }}
        >
          {resending ? 'Menghantar...' : 'Hantar Semula Emel Pengesahan'}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="admin-mobile" style={{ minHeight: '100vh', background: '#1a3a2a', position: 'relative', overflow: 'hidden' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 1rem 8rem' }}>
          <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.1)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Leaf size={32} color="#74c69d" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: '#fff' }}>EkoKarbon</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#74c69d', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>Admin Panel</span>
        </div>

        {/* White bottom sheet */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '32px 32px 0 0', padding: '28px 24px 40px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#5a7a68', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>Log masuk untuk meneruskan</p>
          {successBox}
          {errorBox}
          {resendBox}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={mobileLabel}>Email</span>
              <div style={mobileInputWrap}>
                <Mail size={16} color="#5a7a68" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@ekokarbon.my" style={mobileInputBase} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ ...mobileLabel, marginBottom: 0 }}>Kata Laluan</span>
                <Link href="#" style={{ fontSize: 12, color: '#5a7a68', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>Lupa?</Link>
              </div>
              <div style={mobileInputWrap}>
                <Lock size={16} color="#5a7a68" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={mobileInputBase} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#5a7a68', display: 'flex' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ background: '#1a3a2a', color: '#b7e4c7', border: 'none', borderRadius: 16, padding: 15, fontSize: 15, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Sedang log masuk...' : 'Log Masuk'}
            </button>
          </form>
          <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}>
            Belum ada akaun?{' '}
            <Link href="/admin/register" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Daftar</Link>
          </p>
        </div>
      </div>

      {/* ── DESKTOP (original design) ── */}
      <div className="admin-desktop" style={{ minHeight: '100vh', background: '#1a3a2a', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)', width: '100%', maxWidth: 400, boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#1a3a2a', margin: 0 }}>EkoKarbon Admin</h1>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#5a7a68', textDecoration: 'none', background: '#f8f4ef', border: '1px solid rgba(45,106,79,0.15)', borderRadius: '3rem', padding: '5px 12px', fontFamily: 'DM Sans, sans-serif' }}>
              ← Laman Utama
            </a>
          </div>
          <p style={{ color: '#5a7a68', fontSize: 14, marginBottom: 28 }}>Log masuk untuk meneruskan</p>
          {successBox}
          {errorBox}
          {resendBox}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={desktopInputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Kata Laluan</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={desktopInputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ background: '#1a3a2a', color: '#74c69d', border: 'none', borderRadius: '3rem', padding: '12px', fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
              {loading ? 'Sedang log masuk...' : 'Log Masuk'}
            </button>
          </form>
          <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center' }}>
            Belum ada akaun?{' '}
            <a href="/admin/register" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Daftar</a>
          </p>
        </div>
      </div>
    </>
  );
}

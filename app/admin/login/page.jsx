'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/adminAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Email atau kata laluan tidak sah.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a3a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      padding: '1.5rem 1rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#1a3a2a', margin: 0 }}>
            EkoKarbon Admin
          </h1>
          <a href="/" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: '#5a7a68', textDecoration: 'none',
            background: '#f8f4ef', border: '1px solid rgba(45,106,79,0.15)',
            borderRadius: '3rem', padding: '5px 12px',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            ← Laman Utama
          </a>
        </div>
        <p style={{ color: '#5a7a68', fontSize: 14, marginBottom: 28 }}>Log masuk untuk meneruskan</p>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid rgba(45,106,79,0.2)',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'DM Sans, sans-serif',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Kata Laluan</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid rgba(45,106,79,0.2)',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'DM Sans, sans-serif',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#1a3a2a',
              color: '#74c69d',
              border: 'none',
              borderRadius: '3rem',
              padding: '12px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: 4,
            }}
          >
            {loading ? 'Sedang log masuk...' : 'Log Masuk'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center' }}>
          Belum ada akaun?{' '}
          <a href="/admin/register" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Daftar</a>
        </p>
      </div>
    </div>
  );
}

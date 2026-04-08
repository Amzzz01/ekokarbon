'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/adminAuth';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid rgba(45,106,79,0.2)',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a3a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#1a3a2a', marginBottom: 4 }}>
          Daftar Akaun
        </h1>
        <p style={{ color: '#5a7a68', fontSize: 14, marginBottom: 28 }}>Cipta akaun admin baru</p>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Nama</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a3a2a', marginBottom: 6 }}>Kata Laluan</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={inputStyle} />
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
            {loading ? 'Sedang mendaftar...' : 'Daftar'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: '#5a7a68', textAlign: 'center' }}>
          Sudah ada akaun?{' '}
          <a href="/admin/login" style={{ color: '#1a3a2a', fontWeight: 600, textDecoration: 'none' }}>Log Masuk</a>
        </p>
      </div>
    </div>
  );
}

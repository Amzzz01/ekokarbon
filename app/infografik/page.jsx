'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend, PieChart, Pie } from 'recharts';
import { getInfografik } from '@/lib/adminData';

function InfografikCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const item = items[index];
  const total = items.length;

  function prev(e) { e?.stopPropagation(); setIndex((i) => (i - 1 + total) % total); }
  function next(e) { e?.stopPropagation(); setIndex((i) => (i + 1) % total); }

  return (
    <>
      {/* Lightbox — fullscreen on mobile tap */}
      {lightbox && item.imageUrl && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', borderRadius: 8, display: 'block' }}
          />
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: '50%', width: 40, height: 40,
              color: '#fff', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
          {/* Lightbox prev/next */}
          {total > 1 && (
            <>
              <button onClick={(e) => prev(e)} style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: 44, height: 44, color: '#fff', fontSize: 22,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>‹</button>
              <button onClick={(e) => next(e)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: 44, height: 44, color: '#fff', fontSize: 22,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>›</button>
            </>
          )}
        </div>
      )}

      <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(116,198,157,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        {/* Image area */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f7f4' }}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              onClick={() => setLightbox(true)}
              style={{
                maxWidth: '100%', maxHeight: 'min(480px, 60vw)',
                width: 'auto', height: 'auto', display: 'block', margin: '0 auto',
                cursor: 'zoom-in',
              }}
            />
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🖼</div>
          )}

          {/* Prev button */}
          {total > 1 && (
            <button onClick={prev} style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,58,42,0.75)', border: 'none', borderRadius: '50%',
              width: 44, height: 44, color: '#74c69d', fontSize: 20,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            }}>‹</button>
          )}

          {/* Next button */}
          {total > 1 && (
            <button onClick={next} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,58,42,0.75)', border: 'none', borderRadius: '50%',
              width: 44, height: 44, color: '#74c69d', fontSize: 20,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            }}>›</button>
          )}

          {/* Tap hint for mobile */}
          {item.imageUrl && (
            <div style={{
              position: 'absolute', bottom: 8, right: 10,
              background: 'rgba(0,0,0,0.45)', color: '#fff',
              fontSize: 10, padding: '3px 8px', borderRadius: '2rem',
              fontFamily: 'DM Sans, sans-serif', pointerEvents: 'none',
            }}>
              ketik untuk besar
            </div>
          )}
        </div>

        {/* Info + dots */}
        <div style={{ padding: '1rem 1.4rem 1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              {item.category && (
                <span style={{ fontSize: 11, fontWeight: 600, color: '#74c69d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</span>
              )}
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1rem', margin: '0.3rem 0 0.3rem' }}>{item.title}</h3>
              {item.description && (
                <p style={{ fontSize: '0.83rem', color: '#5a7a68', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
              )}
            </div>
            {total > 1 && (
              <span style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', marginTop: 4 }}>
                {index + 1} / {total}
              </span>
            )}
          </div>

          {/* Dot indicators */}
          {total > 1 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {items.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} style={{
                  width: i === index ? 20 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === index ? '#1a3a2a' : 'rgba(45,106,79,0.2)',
                  transition: 'all 0.2s', padding: 0,
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const globalEmitters = [
  { country: 'China', tonnes: 10.1, color: '#ef4444' },
  { country: 'USA', tonnes: 14.2, color: '#f97316' },
  { country: 'Australia', tonnes: 15.1, color: '#f59e0b' },
  { country: 'Malaysia', tonnes: 8.0, color: '#74c69d' },
  { country: 'Germany', tonnes: 7.7, color: '#60a5fa' },
  { country: 'UK', tonnes: 5.5, color: '#a78bfa' },
  { country: 'India', tonnes: 1.9, color: '#34d399' },
  { country: 'Sasaran', tonnes: 2.0, color: '#22c55e' },
];

const tempData = [
  { year: '1900', temp: 0 },
  { year: '1920', temp: 0.1 },
  { year: '1940', temp: 0.2 },
  { year: '1960', temp: 0.1 },
  { year: '1980', temp: 0.3 },
  { year: '2000', temp: 0.6 },
  { year: '2010', temp: 0.8 },
  { year: '2020', temp: 1.1 },
  { year: '2024', temp: 1.3 },
];

const myBreakdown = [
  { name: 'Tenaga & Industri', value: 72, color: '#ef4444' },
  { name: 'Pengangkutan', value: 15, color: '#f97316' },
  { name: 'Pertanian', value: 8, color: '#74c69d' },
  { name: 'Sisa', value: 5, color: '#60a5fa' },
];

const gasBreakdown = [
  { name: 'CO₂', value: 76, color: '#1a3a2a' },
  { name: 'Metana (CH₄)', value: 16, color: '#2d6a4f' },
  { name: 'N₂O', value: 6, color: '#74c69d' },
  { name: 'Lain-lain', value: 2, color: '#b7e4c7' },
];

const impacts = [
  { icon: '🌡️', title: 'Suhu Naik +1.3°C', desc: 'Sejak era pra-industri. Dijangka capai +1.5°C sebelum 2030.' },
  { icon: '🌊', title: 'Paras Laut +20cm', desc: 'Sejak 1900. Malaysia berisiko tinggi kerana kawasan pantai yang luas.' },
  { icon: '🌪️', title: 'Ribut Lebih Kuat', desc: 'Frekuensi dan intensiti ribut tropika semakin meningkat di Asia Tenggara.' },
  { icon: '🐠', title: '50% Karang Musnah', desc: 'Pemutihan karang akibat laut yang lebih panas mengancam ekosistem marin.' },
  { icon: '🌧️', title: 'Banjir Lebih Kerap', desc: 'Malaysia sudah alami peningkatan episod banjir besar dalam dekad lepas.' },
  { icon: '🔥', title: 'Kemarau Lebih Panjang', desc: 'El Niño semakin kuat dan kerap, mengancam bekalan air dan pertanian.' },
];

export default function InfografikPage() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    getInfografik().then(setUploads).catch(() => {});
  }, []);

  return (
    <div className="page-body" style={{ minHeight: '100vh', background: '#f8f4ef' }}>
      {/* Header */}
      <div style={{ background: '#1a3a2a', padding: '5rem 2rem 4rem', color: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74c69d', fontWeight: 600, marginBottom: '1rem' }}>Infografik</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-2px', lineHeight: 1.05 }}>
            Data Perubahan Iklim 📊
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, lineHeight: 1.7, marginTop: '1rem' }}>
            Fakta dan angka tentang perubahan iklim global dan kesan kepada Malaysia, dalam visual yang mudah difahami.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Admin-uploaded infografik carousel — shown first */}
        {uploads.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
              🖼 Infografik Terkini
            </h2>
            <InfografikCarousel items={uploads} />
          </div>
        )}

        {/* Section 1: CO2 per capita comparison */}
        <div style={{ background: 'white', borderRadius: 24, padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.15)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '0.5rem' }}>🌍 CO₂ Per Kapita Mengikut Negara (tan/tahun)</h2>
          <p style={{ fontSize: '0.85rem', color: '#5a7a68', marginBottom: '1.5rem' }}>Malaysia pada 8.0 tan — 4x melebihi sasaran dunia 2.0 tan per orang.</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={globalEmitters} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <XAxis dataKey="country" tick={{ fontSize: 11, fill: '#5a7a68' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5a7a68' }} />
              <Tooltip formatter={(v) => [`${v} tan CO₂`, 'Per kapita']} contentStyle={{ borderRadius: 8, fontFamily: 'DM Sans, sans-serif' }} />
              <Bar dataKey="tonnes" radius={[6, 6, 0, 0]}>
                {globalEmitters.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Section 2: Temperature rise */}
        <div style={{ background: 'white', borderRadius: 24, padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.15)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '0.5rem' }}>🌡️ Kenaikan Suhu Global (°C) Sejak 1900</h2>
          <p style={{ fontSize: '0.85rem', color: '#5a7a68', marginBottom: '1.5rem' }}>Suhu global telah meningkat 1.3°C sejak era pra-industri dan terus meningkat.</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={tempData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,106,79,0.1)" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#5a7a68' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5a7a68' }} />
              <Tooltip formatter={(v) => [`+${v}°C`, 'Kenaikan suhu']} contentStyle={{ borderRadius: 8, fontFamily: 'DM Sans, sans-serif' }} />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Section 3: Malaysia breakdown + Gas breakdown side by side */}
        <div className="pie-grid" style={{ marginBottom: '2rem' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.15)' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1rem', marginBottom: '0.5rem' }}>🇲🇾 Sumber Emisi Malaysia</h2>
            <p style={{ fontSize: '0.8rem', color: '#5a7a68', marginBottom: '1rem' }}>% daripada jumlah emisi negara</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={myBreakdown} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false} fontSize={11}>
                  {myBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
              {myBreakdown.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#5a7a68' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 24, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.15)' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1rem', marginBottom: '0.5rem' }}>💨 Komposisi Gas Rumah Hijau Global</h2>
            <p style={{ fontSize: '0.8rem', color: '#5a7a68', marginBottom: '1rem' }}>% daripada jumlah gas rumah hijau</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={gasBreakdown} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false} fontSize={11}>
                  {gasBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
              {gasBreakdown.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#5a7a68' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Impacts */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1.4rem', marginBottom: '1.2rem' }}>⚠️ Kesan Perubahan Iklim di Malaysia</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {impacts.map(imp => (
              <div key={imp.title} style={{ background: 'white', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(116,198,157,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{imp.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{imp.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#5a7a68', lineHeight: 1.6 }}>{imp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facts strip */}
        <div style={{ background: '#1a3a2a', borderRadius: 20, padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {[
            { val: '412 ppm', label: 'Kepekatan CO₂ atmosfera sekarang' },
            { val: '280 ppm', label: 'Kepekatan CO₂ era pra-industri' },
            { val: '8 tahun', label: 'Masa untuk hadkan pemanasan +1.5°C' },
            { val: '45%', label: 'Sasaran pengurangan emisi Malaysia 2030' },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#74c69d' }}>{f.val}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem', lineHeight: 1.5 }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

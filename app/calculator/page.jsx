'use client';
import { useState } from 'react';
import { FACTORS, getRating, getTips, MY_AVERAGE, WORLD_TARGET } from '@/lib/carbonFactors';
import { saveCalcResult, getCalcHistory } from '@/lib/storage';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const STEPS = ['Rumah', 'Pengangkutan', 'Penerbangan', 'Makanan & Gaya Hidup', 'Keputusan'];

const inputStyle = {
  width: '100%', padding: '0.75rem 1rem',
  border: '1.5px solid rgba(45,106,79,0.2)',
  borderRadius: 12, fontSize: '0.95rem',
  background: 'white', color: '#1b2e22',
  outline: 'none', fontFamily: 'DM Sans, sans-serif',
};

const selectStyle = { ...inputStyle, cursor: 'pointer' };

const labelStyle = {
  display: 'block', fontSize: '0.85rem',
  fontWeight: 500, color: '#1b2e22', marginBottom: '0.5rem',
};

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={labelStyle}>{label}</label>
      {hint && <div style={{ fontSize: '0.75rem', color: '#5a7a68', marginBottom: '0.5rem' }}>{hint}</div>}
      {children}
    </div>
  );
}

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  // Form state
  const [form, setForm] = useState({
    // Rumah
    electricity_kwh: 300,
    occupants: 4,
    // Transport
    car_type: 'petrol_medium',
    car_km_day: 30,
    use_public: false,
    public_km_day: 0,
    // Flights
    flight_short: 0,
    flight_medium: 0,
    flight_long: 0,
    // Diet & lifestyle
    diet: 'mixed',
    shopping: 'medium',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Calculate emissions (kg CO2/year)
  function calculate() {
    const elec = (form.electricity_kwh * FACTORS.electricity * 12) / form.occupants;
    const transport =
      (form.car_km_day * 365 * FACTORS.car[form.car_type]) +
      (form.use_public ? form.public_km_day * 365 * 0.04 : 0);
    const flights =
      (form.flight_short * 2 * 500 * FACTORS.flight.short) +
      (form.flight_medium * 2 * 2500 * FACTORS.flight.medium) +
      (form.flight_long * 2 * 7000 * FACTORS.flight.long);
    const diet = FACTORS.diet[form.diet] * 365;
    const shopping = FACTORS.shopping[form.shopping] * 12;

    return { electricity: elec, transport, flights, diet, shopping };
  }

  const breakdown = calculate();
  const totalKg = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const totalTonnes = totalKg / 1000;
  const rating = getRating(totalTonnes);
  const tips = getTips(breakdown);

  const chartData = [
    { name: 'Elektrik', value: +(breakdown.electricity / 1000).toFixed(2), fill: '#74c69d' },
    { name: 'Pengangkutan', value: +(breakdown.transport / 1000).toFixed(2), fill: '#2d6a4f' },
    { name: 'Penerbangan', value: +(breakdown.flights / 1000).toFixed(2), fill: '#1a3a2a' },
    { name: 'Makanan', value: +(breakdown.diet / 1000).toFixed(2), fill: '#d4a373' },
    { name: 'Beli-belah', value: +(breakdown.shopping / 1000).toFixed(2), fill: '#b7e4c7' },
  ];

  function handleSave() {
    saveCalcResult({ totalTonnes: +totalTonnes.toFixed(2), breakdown, form });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

const btnPrimary = {
    background: '#1a3a2a', color: '#b7e4c7',
    border: 'none', padding: '0.85rem 1.5rem',
    borderRadius: '3rem', fontSize: '0.95rem',
    fontWeight: 500, cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
  };

  const btnSecondary = {
    background: 'transparent', color: '#1a3a2a',
    border: '1.5px solid #1a3a2a',
    padding: '0.85rem 1.5rem',
    borderRadius: '3rem',
    fontSize: '0.95rem', fontWeight: 500,
    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div className="page-body calc-page">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74c69d', fontWeight: 600, marginBottom: '0.5rem', background: '#1a3a2a', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '2rem' }}>Kalkulator</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1a3a2a', letterSpacing: '-1.5px', marginTop: '0.5rem' }}>
            Jejak Karbon Anda 🧮
          </h1>
          <p style={{ color: '#5a7a68', marginTop: '0.5rem' }}>Isi maklumat di bawah untuk kira pelepasan karbon tahunan anda.</p>
        </div>

        {/* Progress — desktop: step labels, mobile: dots + current label */}
        <div className="calc-progress-desktop">
          {STEPS.slice(0, -1).map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: i < step ? '#2d6a4f' : i === step ? '#1a3a2a' : 'rgba(45,106,79,0.15)',
                color: i <= step ? 'white' : '#5a7a68',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
              }}>{i < step ? '✓' : i + 1}</div>
              <div style={{ fontSize: '0.7rem', color: i === step ? '#1a3a2a' : '#5a7a68', marginLeft: '0.4rem', fontWeight: i === step ? 600 : 400, whiteSpace: 'nowrap' }}>{s}</div>
              {i < STEPS.length - 2 && <div style={{ flex: 1, height: 2, background: i < step ? '#2d6a4f' : 'rgba(45,106,79,0.15)', margin: '0 0.5rem' }} />}
            </div>
          ))}
        </div>
        {/* Mobile progress — compact dots */}
        <div className="calc-progress-mobile" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '0.6rem' }}>
            {STEPS.slice(0, -1).map((s, i) => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? '#2d6a4f' : i === step ? '#74c69d' : 'rgba(45,106,79,0.15)' }} />
            ))}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#5a7a68' }}>
            Langkah <strong style={{ color: '#1a3a2a' }}>{step + 1}</strong> daripada {STEPS.length - 1} — <strong style={{ color: '#1a3a2a' }}>{STEPS[step]}</strong>
          </div>
        </div>

        {/* STEP 0 — Rumah */}
        {step === 0 && (
          <div className="calc-card">
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a3a2a', marginBottom: '1.5rem' }}>🏠 Rumah & Elektrik</h2>

            <Field label="Penggunaan elektrik bulanan (kWh)" hint="Semak bil TNB anda. Purata rumah Malaysia: 250-400 kWh/bulan">
              <input type="number" style={inputStyle} value={form.electricity_kwh} min={0} max={2000}
                onChange={e => set('electricity_kwh', +e.target.value)} />
            </Field>

            <Field label="Bilangan penghuni rumah" hint="Digunakan untuk bahagi jejak karbon rumah secara adil">
              <select style={selectStyle} value={form.occupants} onChange={e => set('occupants', +e.target.value)}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} orang</option>)}
              </select>
            </Field>

            {/* Live mini preview */}
            <div style={{ background: 'rgba(116,198,157,0.1)', borderRadius: 12, padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#5a7a68' }}>Anggaran dari elektrik:</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#2d6a4f' }}>
                {((form.electricity_kwh * FACTORS.electricity * 12) / form.occupants / 1000).toFixed(2)} tan CO₂/tahun
              </span>
            </div>
          </div>
        )}

        {/* STEP 1 — Pengangkutan */}
        {step === 1 && (
          <div className="calc-card">
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a3a2a', marginBottom: '1.5rem' }}>🚗 Pengangkutan</h2>

            <Field label="Jenis kenderaan peribadi">
              <select style={selectStyle} value={form.car_type} onChange={e => set('car_type', e.target.value)}>
                <option value="petrol_small">Kereta Petrol Kecil (&lt;1400cc)</option>
                <option value="petrol_medium">Kereta Petrol Sederhana (1400-2000cc)</option>
                <option value="petrol_large">Kereta Petrol Besar (&gt;2000cc)</option>
                <option value="diesel">Kereta Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Elektrik (EV)</option>
                <option value="motorcycle">Motosikal</option>
              </select>
            </Field>

            <Field label="Jarak memandu sehari (km)" hint="Purata perjalanan ke tempat kerja + aktiviti harian">
              <input type="number" style={inputStyle} value={form.car_km_day} min={0} max={500}
                onChange={e => set('car_km_day', +e.target.value)} />
            </Field>

            <Field label="Guna pengangkutan awam juga?">
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[{ val: true, label: 'Ya' }, { val: false, label: 'Tidak' }].map(opt => (
                  <button key={String(opt.val)} onClick={() => set('use_public', opt.val)} style={{
                    flex: 1, padding: '0.75rem',
                    borderRadius: 12, border: '1.5px solid',
                    borderColor: form.use_public === opt.val ? '#2d6a4f' : 'rgba(45,106,79,0.2)',
                    background: form.use_public === opt.val ? 'rgba(45,106,79,0.08)' : 'white',
                    color: '#1a3a2a', cursor: 'pointer', fontWeight: 500,
                    fontFamily: 'DM Sans, sans-serif',
                  }}>{opt.label}</button>
                ))}
              </div>
            </Field>

            {form.use_public && (
              <Field label="Jarak pengangkutan awam sehari (km)">
                <input type="number" style={inputStyle} value={form.public_km_day} min={0} max={200}
                  onChange={e => set('public_km_day', +e.target.value)} />
              </Field>
            )}

            <div style={{ background: 'rgba(116,198,157,0.1)', borderRadius: 12, padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: '#5a7a68' }}>Anggaran dari pengangkutan:</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#2d6a4f' }}>
                {(breakdown.transport / 1000).toFixed(2)} tan CO₂/tahun
              </span>
            </div>
          </div>
        )}

        {/* STEP 2 — Penerbangan */}
        {step === 2 && (
          <div className="calc-card">
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a3a2a', marginBottom: '1.5rem' }}>✈️ Penerbangan (setahun)</h2>
            <p style={{ fontSize: '0.85rem', color: '#5a7a68', marginBottom: '1.5rem' }}>Kiraan termasuk perjalanan pergi-balik. Radiative forcing (kesan ketinggian) telah diambil kira.</p>

            {[
              { key: 'flight_short', label: 'Penerbangan Jarak Dekat', hint: 'Contoh: KL-Penang, KL-Singapura, KL-Bangkok (<3 jam)' },
              { key: 'flight_medium', label: 'Penerbangan Jarak Sederhana', hint: 'Contoh: KL-Hong Kong, KL-Seoul (3-6 jam)' },
              { key: 'flight_long', label: 'Penerbangan Jarak Jauh', hint: 'Contoh: KL-London, KL-Sydney (>6 jam)' },
            ].map(f => (
              <Field key={f.key} label={f.label} hint={f.hint}>
                <select style={selectStyle} value={form[f.key]} onChange={e => set(f.key, +e.target.value)}>
                  {[0,1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} kali</option>)}
                </select>
              </Field>
            ))}

            <div style={{ background: 'rgba(116,198,157,0.1)', borderRadius: 12, padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: '#5a7a68' }}>Anggaran dari penerbangan:</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#2d6a4f' }}>
                {(breakdown.flights / 1000).toFixed(2)} tan CO₂/tahun
              </span>
            </div>
          </div>
        )}

        {/* STEP 3 — Diet & Lifestyle */}
        {step === 3 && (
          <div className="calc-card">
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a3a2a', marginBottom: '1.5rem' }}>🍽️ Makanan &amp; Gaya Hidup</h2>

            <Field label="Jenis diet harian anda">
              {[
                { val: 'vegan', label: '🌱 Vegan', sub: 'Tiada produk haiwan' },
                { val: 'vegetarian', label: '🥦 Vegetarian', sub: 'Boleh susu/telur, tiada daging' },
                { val: 'mixed', label: '🍛 Campuran', sub: 'Daging sekali-sekala (biasa Malaysia)' },
                { val: 'meat_heavy', label: '🥩 Banyak Daging', sub: 'Daging setiap hari' },
              ].map(opt => (
                <button key={opt.val} onClick={() => set('diet', opt.val)}
                  className="calc-diet-btn"
                  style={{
                    width: '100%', padding: '0.85rem 1rem', marginBottom: '0.6rem',
                    borderRadius: 12, border: '1.5px solid',
                    borderColor: form.diet === opt.val ? '#2d6a4f' : 'rgba(45,106,79,0.2)',
                    background: form.diet === opt.val ? 'rgba(45,106,79,0.06)' : 'white',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'DM Sans, sans-serif',
                  }}>
                  <span style={{ fontWeight: 500, color: '#1a3a2a' }}>{opt.label}</span>
                  <span style={{ fontSize: '0.8rem', color: '#5a7a68' }}>{opt.sub}</span>
                </button>
              ))}
            </Field>

            <Field label="Tabiat membeli-belah bulanan" hint="Anggaran perbelanjaan pada pakaian, elektronik, dll">
              <div className="calc-shopping-row">
                {[
                  { val: 'low', label: 'Rendah', sub: '<RM200/bulan' },
                  { val: 'medium', label: 'Sederhana', sub: 'RM200-500/bulan' },
                  { val: 'high', label: 'Tinggi', sub: '>RM500/bulan' },
                ].map(opt => (
                  <button key={opt.val} onClick={() => set('shopping', opt.val)} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '0.75rem 0.5rem',
                    borderRadius: 12, border: '1.5px solid',
                    borderColor: form.shopping === opt.val ? '#2d6a4f' : 'rgba(45,106,79,0.2)',
                    background: form.shopping === opt.val ? 'rgba(45,106,79,0.06)' : 'white',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  }}>
                    <span style={{ fontWeight: 500, color: '#1a3a2a' }}>{opt.label}</span>
                    <span style={{ fontSize: '0.72rem', color: '#5a7a68', textAlign: 'center', marginTop: 2 }}>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* STEP 4 — Results */}
        {step === 4 && (
          <div>
            {/* Main result card */}
            <div className="calc-result-card">
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Jumlah Jejak Karbon Tahunan Anda</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, color: rating?.color || '#74c69d', lineHeight: 1 }}>
                {totalTonnes.toFixed(1)}
              </div>
              <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>tan CO₂ / tahun</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '2rem', padding: '0.5rem 1.2rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{rating?.emoji}</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{rating?.label}</span>
              </div>

              {/* Comparison bar */}
              <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                {[
                  { label: 'Anda', val: totalTonnes, max: 15, color: rating?.color || '#74c69d' },
                  { label: 'Purata Malaysia', val: MY_AVERAGE, max: 15, color: '#f59e0b' },
                  { label: 'Sasaran Dunia', val: WORLD_TARGET, max: 15, color: '#22c55e' },
                ].map(b => (
                  <div key={b.label} style={{ marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.3rem' }}>
                      <span>{b.label}</span><span>{b.val} tan</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min((b.val / b.max) * 100, 100)}%`, background: b.color, borderRadius: 4, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown chart */}
            <div className="calc-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '1.5rem' }}>📊 Pecahan Mengikut Kategori</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5a7a68' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#5a7a68' }} />
                  <Tooltip formatter={(v) => [`${v} tan CO₂`, '']} contentStyle={{ borderRadius: 8, border: '1px solid rgba(45,106,79,0.2)', fontFamily: 'DM Sans, sans-serif' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.8rem', marginTop: '1rem' }}>
                {chartData.map(d => (
                  <div key={d.name} style={{ background: 'rgba(116,198,157,0.08)', borderRadius: 10, padding: '0.75rem', border: '1px solid rgba(116,198,157,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#5a7a68' }}>{d.name}</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', fontSize: '1.1rem' }}>{d.value} tan</div>
                    <div style={{ fontSize: '0.7rem', color: '#5a7a68' }}>{((d.value / totalTonnes) * 100).toFixed(0)}% daripada jumlah</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="calc-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '1rem' }}>💡 Tips Untuk Anda</h3>
              {tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.8rem', padding: '0.75rem 0', borderBottom: i < tips.length - 1 ? '1px solid rgba(45,106,79,0.08)' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(116,198,157,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#2d6a4f', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: '0.9rem', color: '#1b2e22', lineHeight: 1.6 }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Save & actions */}
            <div className="calc-actions">
              <button onClick={handleSave} style={{ ...btnPrimary, opacity: saved ? 0.7 : 1 }}>
                {saved ? '✓ Disimpan!' : '💾 Simpan Keputusan'}
              </button>
              <button onClick={() => { setStep(0); setSaved(false); }} style={btnSecondary}>
                🔄 Kira Semula
              </button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="calc-nav">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ ...btnSecondary, visibility: step === 0 ? 'hidden' : 'visible' }}>
              ← Sebelum
            </button>
            <button onClick={() => setStep(s => s + 1)} style={btnPrimary}>
              {step === 3 ? '🧮 Lihat Keputusan' : 'Seterusnya →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

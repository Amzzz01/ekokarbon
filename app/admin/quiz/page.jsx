'use client';
import { useEffect, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import { getQuiz, addQuiz, updateQuiz, deleteQuiz } from '@/lib/adminData';

const emptyForm = { question: '', options: ['', '', '', ''], answer: 0, explain: '' };

export default function QuizPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  async function load() { setItems(await getQuiz()); }
  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setShowForm(true); }
  function openEdit(item) {
    setForm({ question: item.question, options: item.options || ['', '', '', ''], answer: item.answer ?? 0, explain: item.explain || '' });
    setEditId(item.id);
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditId(null); setForm(emptyForm); }
  function setOption(i, val) { const opts = [...form.options]; opts[i] = val; setForm({ ...form, options: opts }); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateQuiz(editId, form);
      else await addQuiz(form);
      await load();
      cancel();
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Padam soalan ini?')) return;
    await deleteQuiz(id);
    await load();
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px',
    border: '1px solid rgba(45,106,79,0.2)', borderRadius: 8,
    fontSize: 13, fontFamily: 'DM Sans, sans-serif',
    outline: 'none', boxSizing: 'border-box',
  };

  const btnPrimary = {
    background: '#1a3a2a', color: '#74c69d', border: 'none',
    borderRadius: '3rem', padding: '9px 20px', fontSize: 13,
    fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
  };

  const btnSecondary = {
    background: '#f8f4ef', color: '#5a7a68',
    border: '1px solid rgba(45,106,79,0.15)', borderRadius: '3rem',
    padding: '9px 20px', fontSize: 13, cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: isMobile ? 17 : 20, color: '#1a3a2a' }}>
            Senarai Quiz
          </span>
          <button onClick={openAdd} style={{ ...btnPrimary, padding: isMobile ? '8px 16px' : '10px 22px', fontSize: isMobile ? 13 : 14 }}>
            + Tambah
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, padding: isMobile ? 16 : 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, color: '#1a3a2a', marginBottom: 14 }}>
              {editId ? 'Edit Soalan' : 'Tambah Soalan Baru'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Soalan</label>
                <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i}>
                    <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Pilihan {i + 1}</label>
                    <input style={inputStyle} value={form.options[i]} onChange={(e) => setOption(i, e.target.value)} required />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Jawapan Betul</label>
                  <select style={inputStyle} value={form.answer} onChange={(e) => setForm({ ...form, answer: Number(e.target.value) })}>
                    {[0, 1, 2, 3].map((i) => <option key={i} value={i}>Pilihan {i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Penjelasan</label>
                  <input style={inputStyle} value={form.explain} onChange={(e) => setForm({ ...form, explain: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                <button type="button" onClick={cancel} style={btnSecondary}>Batal</button>
                <button type="submit" disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile: cards */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.length === 0 && (
              <div style={{ textAlign: 'center', color: '#5a7a68', padding: 32, fontFamily: 'DM Sans, sans-serif', fontSize: 14 }}>Tiada data</div>
            )}
            {items.map((item) => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#1a3a2a', marginBottom: 6 }}>
                  {item.question}
                </div>
                <div style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', marginBottom: 10 }}>
                  Jawapan: Pilihan {(item.answer ?? 0) + 1} · {item.createdAt?.toDate?.()?.toLocaleDateString('ms-MY') || '—'}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(item)} style={{ ...btnSecondary, padding: '6px 16px', fontSize: 12, flex: 1 }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '3rem', padding: '6px 16px', fontSize: 12, cursor: 'pointer', color: '#cc0000', fontFamily: 'DM Sans, sans-serif', flex: 1 }}>Padam</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: table */
          <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
              <thead>
                <tr style={{ background: '#f8f4ef' }}>
                  {['Soalan', 'Jawapan Betul', 'Tarikh', 'Tindakan'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#5a7a68', fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#5a7a68' }}>Tiada data</td></tr>
                )}
                {items.map((item, i) => (
                  <tr key={item.id} style={{ borderTop: '1px solid rgba(45,106,79,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={{ padding: '12px 16px', color: '#1a3a2a', maxWidth: 300 }}>{item.question}</td>
                    <td style={{ padding: '12px 16px', color: '#5a7a68' }}>Pilihan {(item.answer ?? 0) + 1}</td>
                    <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{item.createdAt?.toDate?.()?.toLocaleDateString('ms-MY') || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEdit(item)} style={{ ...btnSecondary, padding: '5px 14px', fontSize: 12 }}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '3rem', padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: '#cc0000' }}>Padam</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
}

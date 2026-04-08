'use client';
import { useEffect, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import { getTips, addTip, updateTip, deleteTip } from '@/lib/adminData';

const empty = { title: '', content: '', category: '', icon: '', status: 'published' };

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid rgba(45,106,79,0.2)',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
};

export default function TipsPage() {
  const [tips, setTips] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await getTips();
    setTips(data);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(tip) { setForm({ title: tip.title, content: tip.content, category: tip.category, icon: tip.icon || '', status: tip.status }); setEditId(tip.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); setForm(empty); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateTip(editId, form);
      else await addTip(form);
      await load();
      cancel();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Padam tip ini?')) return;
    await deleteTip(id);
    await load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#1a3a2a' }}>Senarai Tips</span>
          <button onClick={openAdd} style={{ background: '#1a3a2a', color: '#74c69d', border: 'none', borderRadius: '3rem', padding: '10px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            + Tambah Tip
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, color: '#1a3a2a', marginBottom: 16 }}>{editId ? 'Edit Tip' : 'Tambah Tip Baru'}</h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Tajuk</label>
                <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Kandungan</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Kategori</label>
                <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Ikon (emoji)</label>
                <input style={inputStyle} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Status</label>
                <select style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" onClick={cancel} style={{ background: '#f8f4ef', color: '#5a7a68', border: '1px solid rgba(45,106,79,0.15)', borderRadius: '3rem', padding: '9px 20px', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Batal</button>
                <button type="submit" disabled={saving} style={{ background: '#1a3a2a', color: '#74c69d', border: 'none', borderRadius: '3rem', padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
            <thead>
              <tr style={{ background: '#f8f4ef' }}>
                {['Tajuk', 'Kategori', 'Status', 'Tarikh', 'Tindakan'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#5a7a68', fontWeight: 600, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tips.length === 0 && (
                <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#5a7a68' }}>Tiada data</td></tr>
              )}
              {tips.map((tip, i) => (
                <tr key={tip.id} style={{ borderTop: '1px solid rgba(45,106,79,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                  <td style={{ padding: '12px 16px', color: '#1a3a2a', fontWeight: 500 }}>{tip.icon} {tip.title}</td>
                  <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{tip.category}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: tip.status === 'published' ? 'rgba(116,198,157,0.15)' : 'rgba(90,122,104,0.1)', color: tip.status === 'published' ? '#1a3a2a' : '#5a7a68', borderRadius: '3rem', padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                      {tip.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{tip.createdAt?.toDate?.()?.toLocaleDateString('ms-MY') || '—'}</td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(tip)} style={{ background: '#f8f4ef', border: '1px solid rgba(45,106,79,0.15)', borderRadius: '3rem', padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: '#1a3a2a' }}>Edit</button>
                    <button onClick={() => handleDelete(tip.id)} style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '3rem', padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: '#cc0000' }}>Padam</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}

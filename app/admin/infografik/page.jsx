'use client';
import { useEffect, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import { getInfografik, addInfografik, updateInfografik, deleteInfografik } from '@/lib/adminData';

const emptyForm = { title: '', description: '', imageUrl: '', category: '' };

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

export default function InfografikPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await getInfografik();
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setShowForm(true); }
  function openEdit(item) {
    setForm({ title: item.title, description: item.description || '', imageUrl: item.imageUrl || '', category: item.category || '' });
    setEditId(item.id);
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditId(null); setForm(emptyForm); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateInfografik(editId, form);
      else await addInfografik(form);
      await load();
      cancel();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Padam infografik ini?')) return;
    await deleteInfografik(id);
    await load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#1a3a2a' }}>Senarai Infografik</span>
          <button onClick={openAdd} style={{ background: '#1a3a2a', color: '#74c69d', border: 'none', borderRadius: '3rem', padding: '10px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            + Tambah Infografik
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, color: '#1a3a2a', marginBottom: 16 }}>{editId ? 'Edit Infografik' : 'Tambah Infografik Baru'}</h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Tajuk</label>
                <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Kategori</label>
                <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>URL Imej</label>
                <input style={inputStyle} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Penerangan</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
                {['Tajuk', 'Kategori', 'URL Imej', 'Tarikh', 'Tindakan'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#5a7a68', fontWeight: 600, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#5a7a68' }}>Tiada data</td></tr>
              )}
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderTop: '1px solid rgba(45,106,79,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                  <td style={{ padding: '12px 16px', color: '#1a3a2a', fontWeight: 500 }}>{item.title}</td>
                  <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{item.category}</td>
                  <td style={{ padding: '12px 16px', color: '#5a7a68', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.imageUrl || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{item.createdAt?.toDate?.()?.toLocaleDateString('ms-MY') || '—'}</td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(item)} style={{ background: '#f8f4ef', border: '1px solid rgba(45,106,79,0.15)', borderRadius: '3rem', padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: '#1a3a2a' }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '3rem', padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: '#cc0000' }}>Padam</button>
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

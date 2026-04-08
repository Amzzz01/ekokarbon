'use client';
import { useEffect, useRef, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import { getInfografik, addInfografik, updateInfografik, deleteInfografik, uploadImage } from '@/lib/adminData';

const emptyForm = { title: '', description: '', imageUrl: '', category: '' };

export default function InfografikPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  async function load() { setItems(await getInfografik()); }
  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({ title: item.title, description: item.description || '', imageUrl: item.imageUrl || '', category: item.category || '' });
    setEditId(item.id);
    setImageFile(null);
    setImagePreview(item.imageUrl || null);
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((f) => ({ ...f, imageUrl: '' })); // clear manual URL when file chosen
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let finalForm = { ...form };

      // Upload file if one was selected
      if (imageFile) {
        setUploading(true);
        const url = await uploadImage(imageFile, 'infografik');
        setUploading(false);
        finalForm.imageUrl = url;
      }

      if (editId) await updateInfografik(editId, finalForm);
      else await addInfografik(finalForm);

      await load();
      cancel();
    } catch (err) {
      setUploading(false);
      alert('Ralat semasa menyimpan: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Padam infografik ini?')) return;
    await deleteInfografik(id);
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

  const isBusy = saving || uploading;

  return (
    <AdminGuard>
      <AdminLayout>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: isMobile ? 17 : 20, color: '#1a3a2a' }}>
            Senarai Infografik
          </span>
          <button onClick={openAdd} style={{ ...btnPrimary, padding: isMobile ? '8px 16px' : '10px 22px', fontSize: isMobile ? 13 : 14 }}>
            + Tambah
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#fff', border: '1px solid rgba(45,106,79,0.1)', borderRadius: 12, padding: isMobile ? 16 : 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, color: '#1a3a2a', marginBottom: 14 }}>
              {editId ? 'Edit Infografik' : 'Tambah Infografik Baru'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Title + Category */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Tajuk</label>
                  <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Kategori</label>
                  <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 8 }}>Imej</label>

                {/* Preview */}
                {imagePreview && (
                  <div style={{ position: 'relative', marginBottom: 10, display: 'inline-block' }}>
                    <img
                      src={imagePreview}
                      alt="preview"
                      style={{ width: '100%', maxWidth: 320, height: 180, objectFit: 'cover', borderRadius: 8, display: 'block', border: '1px solid rgba(45,106,79,0.15)' }}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      style={{
                        position: 'absolute', top: 6, right: 6,
                        background: 'rgba(0,0,0,0.55)', color: '#fff',
                        border: 'none', borderRadius: '50%',
                        width: 26, height: 26, fontSize: 13,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >✕</button>
                  </div>
                )}

                {/* Upload button */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      background: '#f8f4ef', color: '#1a3a2a',
                      border: '1px dashed rgba(45,106,79,0.35)', borderRadius: 8,
                      padding: '9px 18px', fontSize: 13, cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                    }}
                  >
                    📁 {imageFile ? imageFile.name : 'Pilih Gambar'}
                  </button>
                  <span style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>
                    JPG, PNG, WEBP — maks 5MB
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* OR manual URL */}
                {!imageFile && (
                  <div style={{ marginTop: 10 }}>
                    <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>atau tampal URL imej</label>
                    <input
                      style={inputStyle}
                      placeholder="https://..."
                      value={form.imageUrl}
                      onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImagePreview(e.target.value || null); }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: 12, color: '#5a7a68', display: 'block', marginBottom: 4 }}>Penerangan</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Upload progress indicator */}
              {uploading && (
                <div style={{ fontSize: 13, color: '#74c69d', fontFamily: 'DM Sans, sans-serif' }}>
                  ⏳ Sedang memuat naik gambar...
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                <button type="button" onClick={cancel} style={btnSecondary}>Batal</button>
                <button type="submit" disabled={isBusy} style={{ ...btnPrimary, opacity: isBusy ? 0.7 : 1 }}>
                  {uploading ? 'Memuat naik...' : saving ? 'Menyimpan...' : 'Simpan'}
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
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />
                )}
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#1a3a2a', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', marginBottom: 10 }}>
                  {item.category} · {item.createdAt?.toDate?.()?.toLocaleDateString('ms-MY') || '—'}
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
                  {['Imej', 'Tajuk', 'Kategori', 'Tarikh', 'Tindakan'].map((h) => (
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
                    <td style={{ padding: '10px 16px' }}>
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.title} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, display: 'block' }} />
                        : <div style={{ width: 56, height: 40, background: '#f8f4ef', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🖼</div>
                      }
                    </td>
                    <td style={{ padding: '12px 16px', color: '#1a3a2a', fontWeight: 500 }}>{item.title}</td>
                    <td style={{ padding: '12px 16px', color: '#5a7a68' }}>{item.category}</td>
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

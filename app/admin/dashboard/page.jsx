'use client';
import { useEffect, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import { getCounts } from '@/lib/adminData';

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(45,106,79,0.1)',
      borderRadius: 12,
      padding: '28px 32px',
      flex: 1,
      minWidth: 180,
    }}>
      <div style={{ fontSize: 13, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 40, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: color || '#1a3a2a' }}>{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [counts, setCounts] = useState({ tips: 0, quiz: 0, infografik: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCounts().then((c) => { setCounts(c); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <AdminGuard>
      <AdminLayout>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <StatCard label="Jumlah Tips" value={loading ? '—' : counts.tips} color="#1a3a2a" />
          <StatCard label="Soalan Quiz" value={loading ? '—' : counts.quiz} color="#74c69d" />
          <StatCard label="Infografik" value={loading ? '—' : counts.infografik} color="#5a7a68" />
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}

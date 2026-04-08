'use client';
import AdminSidebar from './AdminSidebar';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/tips': 'Tips',
  '/admin/quiz': 'Quiz',
  '/admin/infografik': 'Infografik',
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Admin';
  const [initials, setInitials] = useState('A');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        const parts = user.displayName.trim().split(' ');
        setInitials(parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2));
      } else if (user?.email) {
        setInitials(user.email[0].toUpperCase());
      }
    });
    return unsub;
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f4ef' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 200, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{
          height: 64,
          background: '#fff',
          borderBottom: '1px solid rgba(45,106,79,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#1a3a2a' }}>
            {title}
          </span>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#1a3a2a',
            color: '#74c69d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 14,
          }}>
            {initials}
          </div>
        </div>
        {/* Content */}
        <main style={{ padding: 32, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

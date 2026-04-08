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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

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
      {/* Sidebar — always visible on desktop, drawer on mobile */}
      <AdminSidebar
        isOpen={isMobile ? sidebarOpen : true}
        onClose={isMobile ? () => setSidebarOpen(false) : undefined}
      />

      {/* Main content */}
      <div style={{
        marginLeft: isMobile ? 0 : 220,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}>
        {/* Topbar */}
        <div style={{
          height: 64,
          background: '#fff',
          borderBottom: '1px solid rgba(45,106,79,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Open menu"
              >
                <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
                <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
                <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
              </button>
            )}
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: isMobile ? 16 : 18, color: '#1a3a2a' }}>
              {title}
            </span>
          </div>

          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#1a3a2a', color: '#74c69d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
            flexShrink: 0,
          }}>
            {initials}
          </div>
        </div>

        {/* Page content */}
        <main style={{ padding: isMobile ? 16 : 32, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

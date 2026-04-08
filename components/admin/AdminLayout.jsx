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

function HamburgerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        flexShrink: 0,
      }}
      aria-label="Toggle menu"
    >
      <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
      <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
      <span style={{ display: 'block', width: 22, height: 2, background: '#1a3a2a', borderRadius: 2 }} />
    </button>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Admin';
  const [initials, setInitials] = useState('A');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile default closed, desktop default open
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [pathname]);

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

  const sidebarWidth = 220;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f4ef' }}>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Main content */}
      <div style={{
        marginLeft: !isMobile && sidebarOpen ? sidebarWidth : 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left 0.25s ease',
      }}>
        {/* Topbar */}
        <div style={{
          height: 64,
          background: '#fff',
          borderBottom: '1px solid rgba(45,106,79,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Hamburger — always visible, toggles open/close */}
            <HamburgerButton onClick={() => setSidebarOpen((v) => !v)} />
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

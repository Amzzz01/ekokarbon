'use client';
import AdminSidebar from './AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { logout } from '@/lib/adminAuth';
import { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { LogOut, User } from 'lucide-react';

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
  const router = useRouter();
  const title = pageTitles[pathname] || 'Admin';
  const [initials, setInitials] = useState('A');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

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
        setDisplayName(user.displayName);
      } else if (user?.email) {
        setInitials(user.email[0].toUpperCase());
      }
      if (user?.email) setEmail(user.email);
    });
    return unsub;
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    }
    if (popupOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupOpen]);

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

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

          {/* Avatar + popup */}
          <div ref={popupRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setPopupOpen(v => !v)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#1a3a2a', color: '#74c69d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
                outline: popupOpen ? '2px solid #74c69d' : 'none',
                outlineOffset: 2,
              }}
              aria-label="Profile menu"
            >
              {initials}
            </button>

            {popupOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                background: '#fff', borderRadius: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                border: '1px solid rgba(45,106,79,0.12)',
                width: 220, zIndex: 200,
                overflow: 'hidden',
              }}>
                {/* User info */}
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(45,106,79,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1a3a2a', color: '#74c69d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    {displayName && <div style={{ fontWeight: 600, fontSize: 14, color: '#1a3a2a', fontFamily: 'DM Sans, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</div>}
                    <div style={{ fontSize: 12, color: '#5a7a68', fontFamily: 'DM Sans, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</div>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '13px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14, color: '#cc2200', fontWeight: 500,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fff0ee'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <LogOut size={16} />
                  Log Keluar
                </button>
              </div>
            )}
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

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/adminAuth';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '▦' },
  { label: 'Tips', href: '/admin/tips', icon: '💡' },
  { label: 'Quiz', href: '/admin/quiz', icon: '❓' },
  { label: 'Infografik', href: '/admin/infografik', icon: '🖼' },
];

export default function AdminSidebar({ isOpen, onClose, isMobile }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

  function handleNavClick() {
    if (onClose) onClose();
  }

  return (
    <>
      {/* Backdrop — mobile only */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 98,
          }}
        />
      )}

      <aside style={{
        width: 220,
        minHeight: '100vh',
        background: '#1a3a2a',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99,
        transform: isOpen === false ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.25s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 20px 16px',
          borderBottom: '1px solid rgba(116,198,157,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#74c69d' }}>
              EkoKarbon
            </span>
            <div style={{ fontSize: 11, color: '#5a7a68', marginTop: 2 }}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={handleNavClick} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 20px',
                color: active ? '#74c69d' : '#b7e4c7',
                textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                background: active ? 'rgba(116,198,157,0.1)' : 'transparent',
                borderLeft: active ? '3px solid #74c69d' : '3px solid transparent',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 0', borderTop: '1px solid rgba(116,198,157,0.15)' }}>
          <button onClick={handleLogout} style={{
            width: '100%',
            padding: '11px 20px',
            background: 'transparent',
            border: 'none',
            color: '#5a7a68',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            textAlign: 'left',
            cursor: 'pointer',
            borderLeft: '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span>⎋</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

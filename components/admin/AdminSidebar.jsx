'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/adminAuth';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Tips', href: '/admin/tips' },
  { label: 'Quiz', href: '/admin/quiz' },
  { label: 'Infografik', href: '/admin/infografik' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

  return (
    <aside style={{
      width: 200,
      minHeight: '100vh',
      background: '#1a3a2a',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(116,198,157,0.15)' }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#74c69d' }}>
          EkoKarbon
        </span>
        <div style={{ fontSize: 11, color: '#5a7a68', marginTop: 2 }}>Admin Panel</div>
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              color: active ? '#74c69d' : '#b7e4c7',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: active ? 600 : 400,
              background: active ? 'rgba(116,198,157,0.1)' : 'transparent',
              borderLeft: active ? '3px solid #74c69d' : '3px solid transparent',
              transition: 'all 0.15s',
            }}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '16px 0', borderTop: '1px solid rgba(116,198,157,0.15)' }}>
        <button onClick={handleLogout} style={{
          width: '100%',
          padding: '10px 20px',
          background: 'transparent',
          border: 'none',
          color: '#5a7a68',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          textAlign: 'left',
          cursor: 'pointer',
          borderLeft: '3px solid transparent',
        }}>
          Logout
        </button>
      </div>
    </aside>
  );
}

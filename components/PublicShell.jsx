'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="page-main">
        {children}
      </main>
      <div className="desktop-footer">
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}

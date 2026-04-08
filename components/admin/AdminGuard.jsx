'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/admin/login');
      } else {
        setChecking(false);
      }
    });
    return unsub;
  }, [router]);

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f4ef',
        fontFamily: 'DM Sans, sans-serif',
        color: '#5a7a68',
      }}>
        Loading...
      </div>
    );
  }

  return children;
}

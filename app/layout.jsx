import './globals.css';
import PublicShell from '@/components/PublicShell';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'EkoKarbon — Jejak Karbon Kita',
  description: 'Platform kesedaran iklim untuk pelajar Malaysia. Kira, faham, dan kurangkan jejak karbon anda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PublicShell>{children}</PublicShell>
        <Analytics />
      </body>
    </html>
  );
}

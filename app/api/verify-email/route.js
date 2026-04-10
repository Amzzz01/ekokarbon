import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/admin/login?verified=error`);
  }

  try {
    const tokenRef = doc(db, 'emailVerifications', token);
    const tokenDoc = await getDoc(tokenRef);

    if (!tokenDoc.exists()) {
      return NextResponse.redirect(`${baseUrl}/admin/login?verified=error`);
    }

    const { uid, used, expiresAt } = tokenDoc.data();

    if (used || new Date(expiresAt) < new Date()) {
      return NextResponse.redirect(`${baseUrl}/admin/login?verified=expired`);
    }

    await setDoc(doc(db, 'users', uid), { emailVerified: true }, { merge: true });
    await updateDoc(tokenRef, { used: true });

    return NextResponse.redirect(`${baseUrl}/admin/login?verified=1`);
  } catch (err) {
    console.error('verify-email error:', err);
    return NextResponse.redirect(`${baseUrl}/admin/login?verified=error`);
  }
}

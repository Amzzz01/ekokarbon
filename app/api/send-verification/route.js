import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { uid, email, name } = await request.json();

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await setDoc(doc(db, 'emailVerifications', token), {
      uid,
      email,
      used: false,
      expiresAt,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/api/verify-email?token=${token}`;

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Sahkan Emel Anda — EkoKarbon',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8f4ef;border-radius:16px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="background:#1a3a2a;display:inline-block;border-radius:16px;padding:16px 24px;">
              <span style="color:#74c69d;font-size:22px;font-weight:800;">EkoKarbon</span>
            </div>
          </div>
          <div style="background:white;border-radius:12px;padding:28px 24px;">
            <h2 style="color:#1a3a2a;margin:0 0 8px;">Hai, ${name || 'Admin'}!</h2>
            <p style="color:#5a7a68;line-height:1.65;margin:0 0 24px;">
              Terima kasih mendaftar sebagai admin EkoKarbon. Sila klik butang di bawah untuk mengesahkan emel anda dan mengaktifkan akaun.
            </p>
            <a href="${verifyUrl}"
              style="display:block;background:#1a3a2a;color:#74c69d;text-decoration:none;text-align:center;padding:14px;border-radius:10px;font-weight:600;font-size:15px;">
              Sahkan Emel Saya
            </a>
            <p style="color:#bbb;font-size:12px;margin:20px 0 0;text-align:center;line-height:1.5;">
              Pautan ini akan tamat tempoh dalam 24 jam.<br/>Jika anda tidak mendaftar, abaikan emel ini.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('EMAIL SENT to:', email);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('send-verification error:', err.code, err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

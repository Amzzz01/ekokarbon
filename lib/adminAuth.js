import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function register(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });

  const res = await fetch('/api/send-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid: credential.user.uid, email, name }),
  });
  if (!res.ok) {
    const data = await res.json();
    console.error('send-verification failed:', data.error);
  }

  return credential.user;
}

export async function checkEmailVerified(uid) {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() && userDoc.data().emailVerified === true;
}

export async function logout() {
  await signOut(auth);
}

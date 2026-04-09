import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from './firebase';

export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function register(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await credential.user.reload();
  try {
    await sendEmailVerification(credential.user);
  } catch (err) {
    console.error('sendEmailVerification failed:', err);
  }
  return credential.user;
}

export async function logout() {
  await signOut(auth);
}

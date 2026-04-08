import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Upload image to Firebase Storage, returns download URL
export async function uploadImage(file, folder = 'infografik') {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Generic helpers
async function getAll(col) {
  const q = query(collection(db, col), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function add(col, data) {
  return addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
}

async function update(col, id, data) {
  return updateDoc(doc(db, col, id), data);
}

async function remove(col, id) {
  return deleteDoc(doc(db, col, id));
}

// Tips
export const getTips = () => getAll('tips');
export const addTip = (data) => add('tips', data);
export const updateTip = (id, data) => update('tips', id, data);
export const deleteTip = (id) => remove('tips', id);

// Quiz
export const getQuiz = () => getAll('quiz');
export const addQuiz = (data) => add('quiz', data);
export const updateQuiz = (id, data) => update('quiz', id, data);
export const deleteQuiz = (id) => remove('quiz', id);

// Infografik
export const getInfografik = () => getAll('infografik');
export const addInfografik = (data) => add('infografik', data);
export const updateInfografik = (id, data) => update('infografik', id, data);
export const deleteInfografik = (id) => remove('infografik', id);

// Counts for dashboard
export async function getCounts() {
  const [tips, quiz, infografik] = await Promise.all([
    getDocs(collection(db, 'tips')),
    getDocs(collection(db, 'quiz')),
    getDocs(collection(db, 'infografik')),
  ]);
  return {
    tips: tips.size,
    quiz: quiz.size,
    infografik: infografik.size,
  };
}

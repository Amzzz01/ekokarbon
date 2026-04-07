// Storage abstraction layer
// Currently uses localStorage. To upgrade to Firebase:
// 1. Install firebase: npm install firebase
// 2. Replace the functions below with Firestore calls
// 3. No changes needed in any page/component files

const KEYS = {
  CALC_HISTORY: 'ekokarbon_calc_history',
  QUIZ_SCORES: 'ekokarbon_quiz_scores',
  USER_PREFS: 'ekokarbon_user_prefs',
};

// ── Calculator History ──────────────────────────────────────────
export function saveCalcResult(result) {
  try {
    const history = getCalcHistory();
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...result,
    };
    history.unshift(entry); // newest first
    const trimmed = history.slice(0, 10); // keep last 10
    localStorage.setItem(KEYS.CALC_HISTORY, JSON.stringify(trimmed));
    return entry;
  } catch (e) {
    console.error('Save failed:', e);
    return null;
  }
}

export function getCalcHistory() {
  try {
    const raw = localStorage.getItem(KEYS.CALC_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearCalcHistory() {
  localStorage.removeItem(KEYS.CALC_HISTORY);
}

// ── Quiz Scores ─────────────────────────────────────────────────
export function saveQuizScore(score, total) {
  try {
    const scores = getQuizScores();
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      score,
      total,
      percent: Math.round((score / total) * 100),
    };
    scores.unshift(entry);
    const trimmed = scores.slice(0, 20);
    localStorage.setItem(KEYS.QUIZ_SCORES, JSON.stringify(trimmed));
    return entry;
  } catch (e) {
    console.error('Save failed:', e);
    return null;
  }
}

export function getQuizScores() {
  try {
    const raw = localStorage.getItem(KEYS.QUIZ_SCORES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ── User Preferences ────────────────────────────────────────────
export function saveUserPrefs(prefs) {
  try {
    localStorage.setItem(KEYS.USER_PREFS, JSON.stringify(prefs));
  } catch (e) {
    console.error('Save failed:', e);
  }
}

export function getUserPrefs() {
  try {
    const raw = localStorage.getItem(KEYS.USER_PREFS);
    return raw ? JSON.parse(raw) : { name: '' };
  } catch {
    return { name: '' };
  }
}

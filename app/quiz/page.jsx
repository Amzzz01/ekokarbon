'use client';
import { useState, useEffect } from 'react';
import { saveQuizScore } from '@/lib/storage';
import { getQuiz } from '@/lib/adminData';

const QUESTIONS = [
  {
    q: 'Apakah gas utama yang menyebabkan kesan rumah hijau?',
    options: ['Oksigen (O₂)', 'Karbon Dioksida (CO₂)', 'Nitrogen (N₂)', 'Hidrogen (H₂)'],
    answer: 1,
    explain: 'CO₂ adalah gas rumah hijau utama yang dihasilkan oleh aktiviti manusia seperti pembakaran bahan api fosil.',
  },
  {
    q: 'Berapa tan CO₂ purata rakyat Malaysia hasilkan setiap tahun?',
    options: ['2 tan', '5 tan', '8 tan', '15 tan'],
    answer: 2,
    explain: 'Malaysia mempunyai jejak karbon per kapita sekitar 8 tan CO₂ setahun, jauh melebihi sasaran global 2 tan.',
  },
  {
    q: 'Antara berikut, manakah yang menghasilkan PALING BANYAK karbon?',
    options: ['Guna beg plastik', 'Penerbangan jarak jauh', 'Letak lampu on semalaman', 'Mandi 15 minit'],
    answer: 1,
    explain: 'Satu penerbangan KL-London boleh hasilkan sehingga 3 tan CO₂ — bersamaan dengan berbulan-bulan penggunaan elektrik.',
  },
  {
    q: 'Faktor emisi elektrik grid Malaysia ialah lebih kurang:',
    options: ['0.1 kg CO₂/kWh', '0.3 kg CO₂/kWh', '0.57 kg CO₂/kWh', '1.2 kg CO₂/kWh'],
    answer: 2,
    explain: 'Grid elektrik Malaysia menghasilkan sekitar 0.571 kg CO₂ bagi setiap kWh kerana masih bergantung kepada bahan api fosil.',
  },
  {
    q: 'Cara terbaik individu kurangkan jejak karbon dari makanan?',
    options: ['Makan lebih banyak seafood', 'Kurangkan pengambilan daging merah', 'Makan makanan sejuk beku', 'Minum lebih air'],
    answer: 1,
    explain: 'Penternakan lembu menghasilkan gas metana yang sangat kuat. Kurangkan daging merah adalah antara langkah diet yang paling berkesan.',
  },
  {
    q: 'Apakah "carbon neutral" bermaksud?',
    options: ['Tiada karbon langsung dihasilkan', 'Karbon dihasilkan = karbon diserap/diimbangi', 'Guna elektrik solar sahaja', 'Tidak memandu kereta'],
    answer: 1,
    explain: 'Carbon neutral bermakna jumlah karbon yang dilepaskan diimbangi sepenuhnya melalui offset seperti penanaman pokok atau tenaga boleh diperbaharui.',
  },
  {
    q: 'Apakah sasaran suhu global Perjanjian Paris?',
    options: ['Di bawah 1°C', 'Di bawah 1.5-2°C', 'Di bawah 3°C', 'Di bawah 5°C'],
    answer: 1,
    explain: 'Perjanjian Paris 2015 menetapkan sasaran mengehadkan pemanasan global kepada 1.5-2°C berbanding aras pra-industri.',
  },
  {
    q: 'Aktiviti pertanian yang PALING membantu kurangkan karbon ialah:',
    options: ['Pertanian tanpa tanah (biarkan terbiar)', 'Pertanian organik dan penutup tanah', 'Guna baja kimia berlebihan', 'Tebang hutan untuk tanaman baru'],
    answer: 1,
    explain: 'Pertanian organik dengan penutup tanah membantu menyerap karbon ke dalam tanah dan mengurangkan keperluan baja nitrogen.',
  },
  {
    q: 'Sektor manakah penyumbang TERBESAR emisi karbon di Malaysia?',
    options: ['Pertanian', 'Perbandaran', 'Tenaga & perindustrian', 'Pengangkutan'],
    answer: 2,
    explain: 'Sektor tenaga dan perindustrian menyumbang lebih 70% emisi Malaysia kerana pergantungan pada arang batu dan gas untuk janakuasa.',
  },
  {
    q: 'Berapa lama masa CO₂ tinggal dalam atmosfera selepas dilepaskan?',
    options: ['Beberapa hari', 'Beberapa bulan', 'Beberapa tahun', 'Ratusan tahun'],
    answer: 3,
    explain: 'CO₂ boleh kekal dalam atmosfera sehingga 1,000 tahun, menjadikan tindakan pengurangan sekarang sangat kritikal untuk generasi akan datang.',
  },
];

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [questions, setQuestions] = useState(QUESTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuiz()
      .then((data) => {
        if (data.length > 0) {
          // Map Firestore format → quiz format
          setQuestions(data.map((d) => ({
            q: d.question,
            options: d.options,
            answer: d.answer,
            explain: d.explain || '',
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplain(false);
    if (current + 1 >= questions.length) {
      setFinished(true);
      saveQuizScore(newAnswers.filter((a, i) => a === questions[i].answer).length, questions.length);
    } else {
      setCurrent(c => c + 1);
    }
  }

  function restart() {
    setStarted(false); setCurrent(0); setSelected(null);
    setAnswers([]); setFinished(false); setShowExplain(false);
  }

  const finalScore = answers.filter((a, i) => a === questions[i].answer).length;
  const pct = Math.round((finalScore / questions.length) * 100);

  const getGrade = () => {
    if (pct >= 90) return { label: 'Cemerlang! 🌟', color: '#22c55e' };
    if (pct >= 70) return { label: 'Bagus! 🟢', color: '#74c69d' };
    if (pct >= 50) return { label: 'Boleh Improve 🟡', color: '#f59e0b' };
    return { label: 'Cuba Lagi 🔴', color: '#ef4444' };
  };

  const btnPrimary = {
    background: '#1a3a2a', color: '#b7e4c7', border: 'none',
    padding: '0.85rem 2rem', borderRadius: '3rem', fontSize: '0.95rem',
    fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
  };

  if (loading) return (
    <div className="page-body quiz-page">
      <div style={{ color: '#5a7a68', fontFamily: 'DM Sans, sans-serif' }}>Memuatkan soalan...</div>
    </div>
  );

  if (!started) return (
    <div className="page-body quiz-page">
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧩</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#1a3a2a', letterSpacing: '-1.5px', marginBottom: '1rem' }}>Quiz Kesedaran Karbon</h1>
        <p style={{ color: '#5a7a68', lineHeight: 1.7, marginBottom: '2rem' }}>
          {questions.length} soalan tentang jejak karbon, iklim, dan cara hidup lestari. Uji pengetahuan anda sekarang!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[`${questions.length} soalan`, '~5 minit', 'Skor disimpan'].map(t => (
            <div key={t} style={{ background: 'rgba(45,106,79,0.1)', borderRadius: '2rem', padding: '0.4rem 1rem', fontSize: '0.85rem', color: '#2d6a4f', fontWeight: 500 }}>{t}</div>
          ))}
        </div>
        <button onClick={() => setStarted(true)} style={btnPrimary}>Mula Quiz →</button>
      </div>
    </div>
  );

  if (finished) {
    const grade = getGrade();
    return (
      <div className="page-body quiz-page">
        <div style={{ maxWidth: 600, width: '100%' }}>
          <div style={{ background: '#1a3a2a', borderRadius: 24, padding: '2.5rem', textAlign: 'center', color: 'white', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '5rem', fontWeight: 800, color: grade.color, lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: '1.5rem', fontFamily: 'Syne, sans-serif', marginTop: '0.5rem' }}>{grade.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>{finalScore} / {questions.length} betul</div>
          </div>

          <div style={{ background: 'white', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.2)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '1rem' }}>Semakan Jawapan</h3>
            {questions.map((q, i) => (
              <div key={i} style={{ padding: '0.75rem 0', borderBottom: i < questions.length - 1 ? '1px solid rgba(45,106,79,0.08)' : 'none', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem' }}>{answers[i] === q.answer ? '✅' : '❌'}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a3a2a', marginBottom: '0.2rem' }}>{q.q}</div>
                  <div style={{ fontSize: '0.8rem', color: '#2d6a4f' }}>✓ {q.options[q.answer]}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={restart} style={btnPrimary}>Cuba Lagi 🔄</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body quiz-page">
      <div style={{ maxWidth: 600, width: '100%' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '2rem' }}>
          {questions.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < current ? '#2d6a4f' : i === current ? '#74c69d' : 'rgba(45,106,79,0.15)' }} />
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: '2rem', boxShadow: '0 4px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#5a7a68', marginBottom: '1rem', fontWeight: 500 }}>Soalan {current + 1} daripada {questions.length}</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#1a3a2a', marginBottom: '1.5rem', lineHeight: 1.4 }}>{q.q}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {q.options.map((opt, i) => {
              let bg = 'white', border = 'rgba(45,106,79,0.2)', color = '#1a3a2a';
              if (selected !== null) {
                if (i === q.answer) { bg = 'rgba(34,197,94,0.08)'; border = '#22c55e'; }
                else if (i === selected && selected !== q.answer) { bg = 'rgba(239,68,68,0.08)'; border = '#ef4444'; }
              } else if (selected === i) { bg = 'rgba(45,106,79,0.06)'; border = '#2d6a4f'; }

              return (
                <button key={i} onClick={() => handleSelect(i)} style={{
                  padding: '0.9rem 1.2rem', borderRadius: 12,
                  border: `1.5px solid ${border}`, background: bg,
                  color, textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', border: `1.5px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, color: border }}>
                    {selected !== null && i === q.answer ? '✓' : selected === i && i !== q.answer ? '✗' : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {showExplain && (
            <div style={{ background: 'rgba(116,198,157,0.1)', border: '1px solid rgba(116,198,157,0.3)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2d6a4f', marginBottom: '0.3rem' }}>💡 Penerangan</div>
              <p style={{ fontSize: '0.85rem', color: '#1b2e22', lineHeight: 1.6 }}>{q.explain}</p>
            </div>
          )}

          {selected !== null && (
            <button onClick={handleNext} style={{ width: '100%', background: '#1a3a2a', color: '#b7e4c7', border: 'none', padding: '0.9rem', borderRadius: '3rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem' }}>
              {current + 1 >= questions.length ? '🏁 Lihat Keputusan' : 'Soalan Seterusnya →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const practices = [
  {
    icon: '🌱', title: 'Pertanian Organik',
    desc: 'Pertanian organik menghapuskan penggunaan baja nitrogen sintetik — penyumbang utama N₂O, gas rumah hijau yang 300x lebih kuat daripada CO₂.',
    stats: [{ val: '50%', label: 'Kurang N₂O' }, { val: '30%', label: 'Lebih serapan karbon' }],
    detail: 'Tanah organik mengandungi lebih banyak bahan organik, menjadikannya penyerap karbon yang lebih baik. Amalan seperti penanaman penutup tanah dan kompos membantu mengikat karbon dalam tanah.',
  },
  {
    icon: '💧', title: 'Pertanian Padi SRI',
    desc: 'Kaedah System of Rice Intensification (SRI) mengurangkan air dan emisi metana dari sawah padi secara drastik.',
    stats: [{ val: '50%', label: 'Kurang air' }, { val: '40%', label: 'Kurang metana' }],
    detail: 'Malaysia menghasilkan berjuta tan metana dari sawah padi setiap tahun. SRI menggunakan teknik pengairan berselang yang mengurangkan pembebasan metana sambil mengekalkan hasil padi.',
  },
  {
    icon: '🌳', title: 'Agroforestri',
    desc: 'Gabungkan tanaman dengan pokok untuk menyerap lebih banyak karbon, memperbaiki ekosistem, dan meningkatkan hasil jangka panjang.',
    stats: [{ val: '3x', label: 'Lebih karbon diserap' }, { val: '40%', label: 'Kurang hakisan tanah' }],
    detail: 'Sistem agroforestri seperti tanaman kopi di bawah pohon teduhan bukan sahaja menyerap lebih banyak CO₂ tetapi juga melindungi biodiversiti dan menstabilkan ekosistem tempatan.',
  },
  {
    icon: '🏭', title: 'Pertanian Tepat (Precision Farming)',
    desc: 'Teknologi sensor dan data membolehkan petani guna input (baja, air, racun perosak) dengan lebih tepat, mengurangkan pembaziran dan emisi.',
    stats: [{ val: '20%', label: 'Kurang baja kimia' }, { val: '15%', label: 'Kurang emisi keseluruhan' }],
    detail: 'Dron, sensor tanah, dan AI kini digunakan oleh petani moden Malaysia untuk memantau keadaan tanaman secara real-time, mengurangkan penggunaan input yang tidak perlu.',
  },
  {
    icon: '🐄', title: 'Penternakan Lestari',
    desc: 'Kaedah penternakan yang lebih baik boleh mengurangkan emisi metana dari haiwan ternakan secara signifikan.',
    stats: [{ val: '30%', label: 'Kurang metana' }, { val: '25%', label: 'Lebih cekap' }],
    detail: 'Penambahan suplemen tertentu dalam makanan ternakan, pengurusan tinja yang lebih baik, dan sistem padang ragut berputar membantu mengurangkan emisi dari sektor penternakan.',
  },
  {
    icon: '☀️', title: 'Agrovoltaik',
    desc: 'Pasang panel solar di atas ladang — hasilkan elektrik bersih sambil bertani. Tanaman mendapat teduhan, panel solar lebih cekap.',
    stats: [{ val: '60%', label: 'Kurang penggunaan air' }, { val: '35%', label: 'Panel lebih sejuk, cekap' }],
    detail: 'Malaysia mempunyai potensi solar yang luar biasa. Sistem agrovoltaik membolehkan ladang menghasilkan makanan DAN tenaga bersih serentak, memaksimumkan penggunaan tanah.',
  },
];

// const timeline = [
//   { year: '2015', event: 'Malaysia komited kepada Perjanjian Paris, sasarkan kurang 45% intensiti karbon menjelang 2030' },
//   { year: '2019', event: 'Program Ladang Organik Negara diperluaskan kepada 30,000 hektar' },
//   { year: '2021', event: 'Inisiatif Net Zero Carbon Cities dilancarkan di Putrajaya dan Iskandar Malaysia' },
//   { year: '2023', event: 'Malaysia sasarkan 40% tenaga boleh diperbaharui dalam campuran elektrik menjelang 2035' },
//   { year: '2025', event: 'Program carbon credit untuk petani Malaysia mula diperkenalkan' },
// ];

export default function AgriculturePage() {
  return (
    <div className="page-body" style={{ minHeight: '100vh', background: '#f8f4ef' }}>
      {/* Hero */}
      <div style={{ background: '#1a3a2a', padding: '5rem 2rem 4rem', color: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74c69d', fontWeight: 600, marginBottom: '1rem' }}>Info Pertanian</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '1.2rem' }}>
            Go Green Agriculture 🌾
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.7, fontSize: '1.05rem' }}>
            Pertanian adalah penyumbang kepada pelepasan karbon, tetapi ia juga boleh menjadi sebahagian besar penyelesaian. Ketahui bagaimana pertanian moden Malaysia boleh membantu.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {[
              { val: '24%', label: 'Emisi global dari pertanian & penggunaan tanah' },
              { val: '11M', label: 'Hektar tanah pertanian di Malaysia' },
              { val: '30%', label: 'Potensi pengurangan karbon dari pertanian lestari' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(116,198,157,0.15)' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#74c69d' }}>{s.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practices */}
      <div style={{ padding: '4rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#1a3a2a', letterSpacing: '-1px', marginBottom: '0.5rem' }}>Amalan Pertanian Mesra Iklim</h2>
        <p style={{ color: '#5a7a68', marginBottom: '2.5rem' }}>6 pendekatan yang telah terbukti secara saintifik membantu kurangkan karbon dalam sektor pertanian.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {practices.map(p => (
            <div key={p.title} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(116,198,157,0.15)' }}>
              <div style={{ background: 'rgba(116,198,157,0.1)', padding: '1.5rem', borderBottom: '1px solid rgba(116,198,157,0.1)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1a3a2a', marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#5a7a68', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  {p.stats.map(s => (
                    <div key={s.label} style={{ flex: 1, background: 'rgba(116,198,157,0.08)', borderRadius: 10, padding: '0.75rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#2d6a4f' }}>{s.val}</div>
                      <div style={{ fontSize: '0.7rem', color: '#5a7a68', lineHeight: 1.3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#5a7a68', lineHeight: 1.6 }}>{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {/* <div style={{ background: '#f0faf4', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#1a3a2a', letterSpacing: '-1px', marginBottom: '2rem' }}>Perjalanan Malaysia Menuju Pertanian Lestari</h2>
          {timeline.map((t, i) => (
            <div key={t.year} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a3a2a', color: '#74c69d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>{t.year}</div>
                {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(45,106,79,0.2)', margin: '0.4rem 0' }} />}
              </div>
              <div style={{ paddingTop: '0.8rem', paddingBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#1b2e22', lineHeight: 1.6 }}>{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

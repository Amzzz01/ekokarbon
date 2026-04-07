const categories = [
  {
    icon: '⚡', title: 'Jimat Elektrik', color: '#fff8e1', accent: '#f59e0b',
    tips: [
      { title: 'Tetapkan suhu aircond 24-26°C', impact: 'Tinggi', desc: 'Setiap 1°C lebih sejuk tambah 6% penggunaan elektrik. Guna kipas angin bila boleh.' },
      { title: 'Tukar kepada lampu LED', impact: 'Sederhana', desc: 'LED guna 75% kurang elektrik berbanding mentol pijar biasa dan tahan 25x lebih lama.' },
      { title: 'Cabut plug bila tidak digunakan', impact: 'Rendah', desc: 'Peralatan dalam mod standby masih guna elektrik. "Vampire power" boleh tambah 10% bil.' },
      { title: 'Guna mesin basuh air sejuk', impact: 'Sederhana', desc: '90% tenaga mesin basuh digunakan untuk panaskan air. Air sejuk cukup untuk kebanyakan cucian.' },
      { title: 'Selenggara peti sejuk dengan betul', impact: 'Rendah', desc: 'Pastikan gelung belakang peti sejuk bersih dan ada ruang udara yang cukup untuk sirkulasi.' },
    ],
  },
  {
    icon: '🚗', title: 'Pengangkutan Hijau', color: '#e8f5e9', accent: '#2d6a4f',
    tips: [
      { title: 'Carpool ke tempat kerja', impact: 'Tinggi', desc: 'Kongsi kereta dengan 3 rakan sekerja bermakna anda hanya bertanggungjawab atas ¼ emisi perjalanan.' },
      { title: 'Guna LRT/MRT untuk jarak jauh', impact: 'Tinggi', desc: 'Kereta api menghasilkan 70% kurang karbon per penumpang berbanding kereta persendirian.' },
      { title: 'Selenggara tayar pada tekanan betul', impact: 'Rendah', desc: 'Tayar yang kurang angin boleh meningkatkan penggunaan minyak sehingga 3%.' },
      { title: 'Elakkan memandu secara agresif', impact: 'Sederhana', desc: 'Pecutkan dan brek mendadak meningkatkan penggunaan bahan api sehingga 40%. Pandu lancar.' },
      { title: 'Jalan kaki/basikal untuk <3km', impact: 'Tinggi', desc: 'Perjalanan pendek dengan kereta adalah yang paling tidak cekap dari segi emisi per km.' },
    ],
  },
  {
    icon: '🥗', title: 'Pilihan Makanan', color: '#fce4ec', accent: '#e91e63',
    tips: [
      { title: 'Kurangkan daging merah 2x seminggu', impact: 'Tinggi', desc: 'Pengeluaran 1kg daging lembu hasilkan sehingga 27kg CO₂ — bersamaan memandu 120km.' },
      { title: 'Beli produk tempatan & bermusim', impact: 'Sederhana', desc: 'Makanan diimport dari jauh memerlukan pengangkutan berkarbon tinggi. Sokong petani tempatan.' },
      { title: 'Kurangkan pembaziran makanan', impact: 'Tinggi', desc: 'Malaysia buang RM3.8 billion makanan setahun. Rancang pembelian dan guna sisa makanan.' },
      { title: 'Cuba "Meatless Monday"', impact: 'Sederhana', desc: 'Satu hari tanpa daging seminggu mengurangkan jejak karbon diet anda sebanyak 15%.' },
      { title: 'Kompos sisa makanan', impact: 'Rendah', desc: 'Kompos mengelak sisa makanan dari tapak pelupusan di mana ia hasilkan gas metana berbahaya.' },
    ],
  },
  {
    icon: '♻️', title: 'Kitar Semula & Sisa', color: '#e3f2fd', accent: '#1976d2',
    tips: [
      { title: 'Asingkan sisa kitar semula', impact: 'Sederhana', desc: 'Kertas, plastik, kaca, dan aluminium — setiap satu perlu diasingkan untuk kitar semula berkesan.' },
      { title: 'Guna beg sendiri', impact: 'Rendah', desc: 'Beg plastik ambil 500 tahun untuk reput. Beg kain boleh guna ribuan kali.' },
      { title: 'Baiki sebelum buang', impact: 'Sederhana', desc: 'Industri fesyen cepat adalah pencemar besar. Baiki pakaian rosak dan beli barang terpakai.' },
      { title: 'Elak produk pakai-buang', impact: 'Sederhana', desc: 'Guna botol air, cawan, dan peralatan makan sendiri untuk kurangkan plastik sekali guna.' },
      { title: 'Buang e-waste dengan betul', impact: 'Rendah', desc: 'Telefon dan elektronik lama mengandungi bahan toksik. Hantar ke pusat e-waste yang bertauliah.' },
    ],
  },
  {
    icon: '🏠', title: 'Rumah Lestari', color: '#f3e5f5', accent: '#7b1fa2',
    tips: [
      { title: 'Tanam pokok di rumah', impact: 'Sederhana', desc: 'Pokok memberikan teduhan, kurangkan keperluan aircond, dan menyerap CO₂ secara semula jadi.' },
      { title: 'Gunakan pemanas air solar', impact: 'Tinggi', desc: 'Pemanas air solar boleh menjimatkan sehingga RM100/bulan dan bayar balik pelaburan dalam 5 tahun.' },
      { title: 'Kumpul air hujan', impact: 'Rendah', desc: 'Air hujan sesuai untuk siram tanaman dan cuci kereta, mengurangkan penggunaan air paip.' },
      { title: 'Ventilasi semula jadi', impact: 'Sederhana', desc: 'Reka bentuk rumah yang betul dengan cross-ventilation boleh mengurangkan keperluan aircond.' },
    ],
  },
];

const impactColor = { Tinggi: '#22c55e', Sederhana: '#f59e0b', Rendah: '#94a3b8' };

export default function TipsPage() {
  return (
    <div className="page-body" style={{ minHeight: '100vh', background: '#f8f4ef', padding: '3rem 1.25rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#74c69d', fontWeight: 600, marginBottom: '0.5rem', background: '#1a3a2a', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '2rem' }}>Tips</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1a3a2a', letterSpacing: '-1.5px', marginTop: '0.5rem' }}>
            Cara Kurangkan Karbon 💡
          </h1>
          <p style={{ color: '#5a7a68', marginTop: '0.5rem', maxWidth: 560, lineHeight: 1.7 }}>
            Tips praktikal yang boleh anda amalkan hari ini. Setiap tindakan kecil memberi impak besar apabila dilakukan bersama.
          </p>

          {/* Impact legend */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {Object.entries(impactColor).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: v }} />
                <span style={{ fontSize: '0.8rem', color: '#5a7a68' }}>Impak {k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.map(cat => (
          <div key={cat.title} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{cat.icon}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#1a3a2a' }}>{cat.title}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {cat.tips.map(tip => (
                <div key={tip.title} style={{ background: 'white', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(116,198,157,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderLeft: `3px solid ${cat.accent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', gap: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1a3a2a', lineHeight: 1.3 }}>{tip.title}</h3>
                    <span style={{ background: impactColor[tip.impact], color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '2rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{tip.impact}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: '#5a7a68', lineHeight: 1.6 }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: '#1a3a2a', borderRadius: 20, padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.8rem' }}>Sudah bersedia untuk ubah?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>Kira jejak karbon anda sekarang dan lihat di mana anda boleh mula.</p>
          <a href="/calculator" style={{ background: '#74c69d', color: '#1a3a2a', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: '3rem', fontWeight: 600, display: 'inline-block' }}>
            Cuba Kalkulator →
          </a>
        </div>
      </div>
    </div>
  );
}

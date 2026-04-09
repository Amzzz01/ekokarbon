// Malaysia-specific emission factors
// Sources: Suruhanjaya Tenaga Malaysia, MESTECC, carbonfootprint.com methodology

export const FACTORS = {
  // Electricity - Malaysia grid (kg CO2 per kWh)
  electricity: 0.571,

  // Transport (kg CO2 per km)
  car: {
    petrol_small: 0.142,   // <1400cc
    petrol_medium: 0.192,  // 1400-2000cc
    petrol_large: 0.282,   // >2000cc
    diesel: 0.171,
    hybrid: 0.105,
    electric: 0.058,       // based on MY grid
    motorcycle: 0.073,
  },

  // Flights (kg CO2 per km per passenger, includes radiative forcing x1.9)
  flight: {
    short: 0.255,   // <3 hours
    medium: 0.195,  // 3-6 hours
    long: 0.165,    // >6 hours
  },

  // Diet (kg CO2 per day)
  diet: {
    vegan: 1.5,
    vegetarian: 2.5,
    mixed: 4.5,
    meat_heavy: 7.0,
  },

  // Shopping / Secondary footprint (kg CO2 per MYR spent per month)
  shopping: {
    low: 0.8,      // <RM200/month
    medium: 1.8,   // RM200-500/month
    high: 3.5,     // >RM500/month
  },

  // Agriculture (kg CO2 per head per year for livestock; kg CO2 per kg for fertiliser)
  agriculture: {
    livestock: { cattle: 2500, goat: 165, poultry: 7 },
    fertiliser: 5.7,
  },
};

// Average distances for common MY flight routes (km one way)
export const FLIGHT_ROUTES = {
  'KUL-PEN': { distance: 330, type: 'short' },
  'KUL-JHB': { distance: 280, type: 'short' },
  'KUL-SIN': { distance: 350, type: 'short' },
  'KUL-BKK': { distance: 1200, type: 'short' },
  'KUL-CGK': { distance: 1180, type: 'short' },
  'KUL-HKG': { distance: 2600, type: 'medium' },
  'KUL-NRT': { distance: 5300, type: 'long' },
  'KUL-LHR': { distance: 10500, type: 'long' },
  'KUL-SYD': { distance: 6600, type: 'long' },
};

// Malaysia national average for comparison (tonnes CO2/year)
export const MY_AVERAGE = 8.0;
export const WORLD_TARGET = 2.0;

// Rating thresholds (tonnes CO2/year)
export const RATINGS = [
  { max: 4, label: 'Sangat Rendah', color: '#22c55e', emoji: '🌟' },
  { max: 6, label: 'Rendah', color: '#74c69d', emoji: '🟢' },
  { max: 9, label: 'Sederhana', color: '#f59e0b', emoji: '🟡' },
  { max: 14, label: 'Tinggi', color: '#f97316', emoji: '🟠' },
  { max: Infinity, label: 'Sangat Tinggi', color: '#ef4444', emoji: '🔴' },
];

export function getRating(tonnesCO2PerYear) {
  return RATINGS.find(r => tonnesCO2PerYear <= r.max);
}

export function getTips(breakdown) {
  const tips = [];
  const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const highest = sorted[0]?.[0];

  if (highest === 'electricity') {
    tips.push('Gunakan kipas angin sebagai ganti penghawa dingin bila boleh');
    tips.push('Tukar kepada lampu LED di seluruh rumah');
    tips.push('Cabut plug peralatan elektrik bila tidak digunakan');
  } else if (highest === 'transport') {
    tips.push('Pertimbangkan carpooling atau pengangkutan awam');
    tips.push('Kurangkan perjalanan dengan kereta untuk jarak pendek — guna basikal atau jalan kaki');
    tips.push('Selenggara tayar kereta pada tekanan yang betul untuk jimat minyak');
  } else if (highest === 'flights') {
    tips.push('Gantikan penerbangan jarak pendek dengan pengangkutan darat');
    tips.push('Pilih penerbangan langsung — takeoff & landing hasilkan lebih karbon');
    tips.push('Offset karbon penerbangan anda melalui program penanaman pokok');
  } else if (highest === 'diet') {
    tips.push('Cuba kurangkan pengambilan daging merah sekurang-kurangnya 2 hari seminggu');
    tips.push('Pilih produk tempatan untuk kurangkan carbon dari penghantaran');
    tips.push('Kurangkan pembaziran makanan — plan meals anda dengan teliti');
  } else if (highest === 'agriculture') {
    tips.push('Kurangkan bilangan ternakan atau guna sistem pengurusan najis yang lebih baik');
    tips.push('Guna baja organik sebagai ganti baja nitrogen sintetik');
    tips.push('Amalkan pertanian karbon rendah seperti penanaman semula hutan');
  }

  // Always add general tips
  tips.push('Gunakan beg sendiri ketika membeli-belah');
  tips.push('Kitar semula kertas, plastik, dan aluminium');

  return tips;
}

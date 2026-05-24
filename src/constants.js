export const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbwKslMs9aDpgKq2WqZBluIr-R45DICAzuWbgkHJc2snuJHMguvjYtbXkRN5oI5piE_B/exec';

export const PRODUCTS = [
  'Woven Labels','Hang Tags','Heat Transfer Labels','PVC Patches',
  'Wash Care Labels','Barcode Labels','Satin Labels','Embroidered Badges','Leather Patches'
];

export const DEMO_DATA = [
  {timestamp:'24/05/2026, 09:15:00',name:'Rahul Sharma',company:'Urban Threads Co.',phone:'9876543210',email:'rahul@urbanthreads.com',product:'Woven Labels',message:'Need 10,000 woven labels for our new collection.'},
  {timestamp:'24/05/2026, 10:32:00',name:'Priya Mehta',company:'Denim House India',phone:'9123456789',email:'priya@denimhouse.in',product:'PVC Patches',message:'Looking for 3D PVC patches for our denim jackets.'},
  {timestamp:'24/05/2026, 11:45:00',name:'Arjun Kapoor',company:'SportFit Brands',phone:'8765432109',email:'arjun@sportfit.com',product:'Heat Transfer Labels',message:'Activewear brand - need heat transfers for 50,000 pieces monthly.'},
  {timestamp:'23/05/2026, 14:20:00',name:'Sneha Patel',company:'Luxe Lingerie',phone:'9012345678',email:'sneha@luxelingerie.com',product:'Satin Labels',message:'High-end lingerie brand seeking ultra-soft satin labels.'},
  {timestamp:'23/05/2026, 16:05:00',name:'Vikram Singh',company:'Export House Mumbai',phone:'8901234567',email:'vikram@exporthousemumbai.com',product:'Wash Care Labels',message:'EU export compliance labels required.'},
  {timestamp:'22/05/2026, 09:30:00',name:'Ananya Gupta',company:'Streetwear Republic',phone:'7890123456',email:'ananya@streetwearrepublic.com',product:'Embroidered Badges',message:'Custom embroidered patches for streetwear collection launch.'},
  {timestamp:'22/05/2026, 13:15:00',name:'Ravi Kumar',company:'Fashion Forward',phone:'8012345678',email:'ravi@fashionforward.in',product:'Hang Tags',message:'Premium gold foil hang tags for luxury RTW collection.'},
  {timestamp:'21/05/2026, 11:00:00',name:'Meera Joshi',company:'Kids Wear Planet',phone:'9123456780',email:'meera@kidsplanewear.com',product:'Barcode Labels',message:'GS1 barcode labels for retail chain. Need 1 lakh pieces.'},
];

// ── DATE PARSE — Handles Indian format DD/MM/YYYY, HH:MM:SS ──
export function parseDate(str) {
  if (!str) return null;
  try {
    // Handle "24/05/2026, 09:15:00" format
    const match = str.match(/(\d{2})\/(\d{2})\/(\d{4}),?\s*(\d{2}):(\d{2}):?(\d{2})?/);
    if (match) {
      const [,dd,mm,yyyy,hh,min,ss='00'] = match;
      return new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`);
    }
    return new Date(str);
  } catch { return null; }
}

export function formatTime(d) {
  if (!d || isNaN(d)) return '—';
  const now = new Date(), diff = now - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
  return d.toLocaleDateString('en-IN');
}

export function esc(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

export function whatsapp(phone, name) {
  const clean = phone.replace(/\D/g, '');
  const num = clean.startsWith('91') ? clean : '91' + clean;
  const msg = encodeURIComponent(`Hello ${name}, Thank you for your inquiry at Shree Krishna Labels. We'll get back to you shortly with details.`);
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

export function exportCSV(data) {
  const headers = ['Timestamp','Name','Company','Phone','Email','Product','Message'];
  const rows = data.map(r =>
    [r.timestamp,r.name,r.company,r.phone,r.email,r.product,r.message]
      .map(v => `"${(v||'').replace(/"/g,'""')}"`).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'SKL_Inquiries_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}

// ── FETCH DATA FROM GOOGLE SHEET ──────────────────────────────
// CORS fix: use a proxy approach via Apps Script published as web app
export async function fetchSheetData() {
  try {
    const res = await fetch(
      SHEET_API_URL + '?action=getData&t=' + Date.now(),
      {
        method: 'GET',
        mode: 'cors',
      }
    );
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      return { data: json.data, source: 'live' };
    }
    throw new Error('No data');
  } catch (err) {
    return { data: DEMO_DATA, source: 'demo' };
  }
}

// ── POST FORM DATA TO SHEET ───────────────────────────────────
export async function postToSheet(formData) {
  try {
    await fetch(SHEET_API_URL, {
      method: 'POST',
      mode: 'no-cors', // no-cors to avoid CORS block
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return true;
  } catch {
    return false;
  }
}

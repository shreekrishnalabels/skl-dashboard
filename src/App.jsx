import React from 'react';
import Orbs from './components/Orbs.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import StatCards from './components/StatCards.jsx';
import InquiryTable from './components/InquiryTable.jsx';
import { ProductChart, ActivityPanel } from './components/SidePanels.jsx';
import Modal from './components/Modal.jsx';
import Toast from './components/Toast.jsx';
import Analytics from './components/Analytics.jsx';
import { SHEET_API_URL, DEMO_DATA } from './constants.js';

export default function App() {
  const [activeSection, setActiveSection] = React.useState('inquiries');
  const [allData, setAllData] = React.useState([]);
  const [filteredData, setFiltered] = React.useState([]);
  const [modalRow, setModalRow] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [usingDemo, setUsingDemo] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const [showBanner, setShowBanner] = React.useState(true);
  const toastTimer = React.useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3000);
  }

  async function loadData() {
    setLoading(true);
    showToast('⟳ Syncing data...');
    try {
      const res = await fetch(SHEET_API_URL + '?action=get', { method: 'GET' });
      const json = await res.json();
      if (json && json.data && json.data.length > 0) {
        setAllData(json.data);
        setFiltered(json.data);
        setUsingDemo(false);
        setShowBanner(false);
        showToast('✅ Synced successfully');
      } else throw new Error('No data');
    } catch {
      setAllData(DEMO_DATA);
      setFiltered(DEMO_DATA);
      setUsingDemo(true);
      showToast('📊 Demo data loaded');
    }
    setLoading(false);
  }

  React.useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Orbs />

      {/* Sidebar */}
      <Sidebar active={activeSection} setActive={setActiveSection} />

      {/* Main */}
      <div style={{ marginLeft:220, minHeight:'100vh', position:'relative', zIndex:1 }}>
        <Topbar filteredData={filteredData} onRefresh={loadData} loading={loading} />

        <div style={{ padding:28 }}>

          {/* Config Banner */}
          {showBanner && usingDemo && (
            <div style={{
              background:'linear-gradient(135deg,rgba(212,168,71,0.08),rgba(10,132,255,0.05))',
              border:'1px solid rgba(212,168,71,0.22)',
              borderRadius:14, padding:'14px 18px',
              marginBottom:20, display:'flex', gap:12, alignItems:'flex-start',
              animation:'fadeInUp 0.4s ease',
            }}>
              <span style={{ fontSize:18, flexShrink:0 }}>⚙️</span>
              <p style={{ fontSize:12, color:'var(--tp)', lineHeight:1.6 }}>
                <strong style={{ color:'var(--gold)' }}>Demo mode:</strong> Google Sheet se connect nahi ho paya.{' '}
                <code style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:4, padding:'2px 6px', fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--gold2)' }}>SHEET_API_URL</code>{' '}
                check karo in <code style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:4, padding:'2px 6px', fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--gold2)' }}>src/constants.js</code>.{' '}
                <span
                  onClick={() => setShowBanner(false)}
                  style={{ color:'var(--gold)', cursor:'pointer', marginLeft:8, fontSize:11 }}
                >
                  Dismiss ✕
                </span>
              </p>
            </div>
          )}

          {/* STATS always visible */}
          <StatCards data={allData} usingDemo={usingDemo} />

          {/* INQUIRIES VIEW */}
          {activeSection === 'inquiries' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 310px', gap:18 }}>
              <InquiryTable
                allData={allData}
                filteredData={filteredData}
                setFiltered={setFiltered}
                onRowClick={idx => setModalRow(allData[idx])}
              />
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <ProductChart data={allData} />
                <ActivityPanel data={allData} />
              </div>
            </div>
          )}

          {/* BY PRODUCT VIEW */}
          {activeSection === 'products' && (
            <div style={{ animation:'fadeInUp 0.4s ease' }}>
              <ProductChart data={allData} />
            </div>
          )}

          {/* ANALYTICS VIEW */}
          {activeSection === 'analytics' && (
            <Analytics data={allData} />
          )}

        </div>
      </div>

      {/* Modal */}
      {modalRow && <Modal row={modalRow} onClose={() => setModalRow(null)} />}

      {/* Toast */}
      <Toast message={toast} />
    </>
  );
}
